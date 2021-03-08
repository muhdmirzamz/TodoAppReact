const express = require('express')

// imported as documented from Firebase
const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/database')

// var bodyParser = require('body-parser')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 9000



var firebaseConfig = {
    
};

firebase.initializeApp(firebaseConfig)


app.get("/test", (req, res) => {
    res.send('Hello World')
});

app.get("/check", (req, res) => {
    if (Object.keys(firebaseConfig).length === 0) {
        // this appears in the client's catch block
        res.status(500).send('Dont forget your API key');
    }
});

app.post("/register", (req, res) => {
    console.log('/register Got body:', req.body);

    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode + " " + errorMessage)
    })

    res.send('Got a post')
})



app.post("/signin", (req, res) => {
    console.log('/signin Got body:', req.body);

    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch((error) => {
        if (error) {
            console.log(error.message)
        }
    })


    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          console.log(user.email)

          res.send('hello there')
        } else {
          // No user is signed in.
        }
    });
})

app.post("/addList", (req, res) => {
    console.log("Got body: " + req.body)

    // might wanna add a check for valid user here
    var user = firebase.auth().currentUser

    var database = firebase.database();

    // get the new key
    const newItemRef = database.ref().child("lists").child(user.uid).push()

    // set the new item
    newItemRef.set({
        listName: req.body.listName
    });

    // push the new key so that frontend will be able to append to new object
    res.status(200).send(newItemRef.path.pieces_[1])
})


// you need to send over the userId
app.get("/getLists", (req, res) => {
    console.log("getting items")

    var userId = firebase.auth().currentUser.uid;
    
    firebase.database().ref("lists/" + userId).once('value').then(function(snapshot) {
        console.log("Got items")
        console.log(snapshot.val())

        res.send(snapshot.val())
    });
})

// you need to send over 2 properties:
// listId
// todoItem
app.post("/addTodo", (req, res) => {
    console.log("ADD TODO==== Got body: " + req.body)

    var database = firebase.database();

    var listId = req.body.listId
    var timestamp = req.body.timestamp

    // get the new key
    const newItemRef = database.ref().child("todos").child(listId).push()

    // set the new item
    newItemRef.set({
        todoItem: req.body.todoItem,
        timestamp: timestamp
    });

    // push the new key so that frontend will be able to append to new object
    res.status(200).send(newItemRef.path.pieces_[1])
    res.status(200)
})

app.delete("/deleteItem", (req, res) => {
    console.log("Got body: ")

    // https://github.com/axios/axios/issues/736#issuecomment-307209067
    console.log(req.query.item)

    // might wanna add a check for valid user here
    var user = firebase.auth().currentUser

    var database = firebase.database();

    // get the new key
    const newItemRef = database.ref().child(user.uid).child(req.query.item).remove()

    res.send('Got a DELETE')
})

app.get("/signout", (req, res) => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("Sign out successful")

        res.send('SUCCESS')
    }).catch((error) => {
        // An error happened.
    });
})

app.listen(port, () => console.log("App listening at https://localhost:${" + port + "}"))