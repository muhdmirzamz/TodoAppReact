const express = require('express')

// imported as documented from Firebase
const firebase = require('firebase/app')
require('firebase/auth')
// require('firebase/database')

var bodyParser = require('body-parser')

const app = express()
const port = 9000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var firebaseConfig = {
    
};

firebase.initializeApp(firebaseConfig)

app.get("/", (req, res) => {
    // const firebaseConfig = {

    // };
    
    // var defaultapp = firebase.initializeApp(firebaseConfig)

    // console.log(defaultapp.name)

    res.send('Hello World')
});

// app.get("/register", (req, res) => {
//     const firebaseConfig = {
//     };
    
//     var defaultapp = firebase.initializeApp(firebaseConfig)

//     console.log(defaultapp.name)

//     firebase.auth().createUserWithEmailAndPassword("test@gmail.com", "password").catch((error) => {
//         var errorCode = error.code;
//         var errorMessage = error.message;

//         console.log(errorCode + " " + errorMessage)
//     })

//     res.send('Got a post')
// })



app.post("/signin", (req, res) => {
    console.log('Got body:', req.body);

    firebase.auth().signInWithEmailAndPassword('test@gmail.com', 'password').catch((error) => {
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

app.listen(port, () => console.log("App listening at https://localhost:${port}"))