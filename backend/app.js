const express = require('express')

// imported as documented from Firebase
const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/database')

var bodyParser = require('body-parser')

const app = express()
const port = 9000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var firebaseConfig = {

};

firebase.initializeApp(firebaseConfig)

app.get("/", (req, res) => {
    res.send('Hello World')
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

    // test@gmail.com
    // password
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

app.post("/addItem", (req, res) => {
    console.log("Got body: " + req.body)

    // might wanna add a check for valid user here
    var user = firebase.auth().currentUser

    var database = firebase.database();

    // get the new key
    const newItemRef = database.ref().child(user.uid).push()

    // set the new item
    newItemRef.set({
        todoItem: req.body.item
    });

    // push the new key so that frontend will be able to append to new object
    res.status(200).send(newItemRef.path.pieces_[1])
})

app.get("/getItems", (req, res) => {
    console.log("getting items")

    var userId = firebase.auth().currentUser.uid;
    
    firebase.database().ref(userId).once('value').then(function(snapshot) {
        console.log("Got items")
        console.log(snapshot.val())

        res.send(snapshot.val())
    });
})

app.listen(port, () => console.log("App listening at https://localhost:${port}"))