const express = require('express')

// imported as documented from Firebase
const firebase = require('firebase/app')
require('firebase/auth')
// const firebaseDatabase = require('firebase/database')

const app = express()
const port = 9000

const randArr = [1, 2, 3, 4]

app.get("/", (req, res) => {
    const firebaseConfig = {
        apiKey: "AIzaSyCG6_Oh8dOzt21flBDelf0eh4sRq9Fuo1k",
        authDomain: "todoapp-id.firebaseapp.com",
        databaseURL: "https://todoapp-id.firebaseio.com",
        projectId: "todoapp-id",
        storageBucket: "todoapp-id.appspot.com",
        messagingSenderId: "953077094877",
        appId: "1:953077094877:web:3a4d99d569a2c4655dfe34"
    };
    
    var defaultapp = firebase.initializeApp(firebaseConfig)

    console.log(defaultapp.name)

    res.send('Hello World')
});

app.get("/newEndpoint", (req, res) => res.send("This is my new endpoint"));

app.get("/randArr", (req, res) => (res.send(randArr)))

app.get("/register", (req, res) => {
    const firebaseConfig = {
        apiKey: "AIzaSyCG6_Oh8dOzt21flBDelf0eh4sRq9Fuo1k",
        authDomain: "todoapp-id.firebaseapp.com",
        databaseURL: "https://todoapp-id.firebaseio.com",
        projectId: "todoapp-id",
        storageBucket: "todoapp-id.appspot.com",
        messagingSenderId: "953077094877",
        appId: "1:953077094877:web:3a4d99d569a2c4655dfe34"
    };
    
    var defaultapp = firebase.initializeApp(firebaseConfig)

    console.log(defaultapp.name)

    firebase.auth().createUserWithEmailAndPassword("test@gmail.com", "password").catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode + " " + errorMessage)
    })

    res.send('Got a post')
})

app.listen(port, () => console.log("App listening at https://localhost:${port}"))