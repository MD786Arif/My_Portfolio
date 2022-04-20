const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

dotenv.config( { path: "./config.env"});

require('./db/conn');  // Database Connected
// const User = require('./models/userSchema');

app.use(express.json());
// We linked the router files
app.use(require('./Router/auth'));

const PORT = process.env.PORT;



// Middle Ware 

const middleWare = (req, res, next) => {
    console.log("Hello my middle ware ");
    next();
}



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}` );
});


// Mongoose connection
// Url = mongodb+srv://arif123:arif1234@cluster0.tbmb9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


// app.get("/", (req, res) => {
//     res.send("Hello World from the server");
// });