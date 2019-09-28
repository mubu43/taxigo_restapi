const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Mubashir:muburoot43";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect();*/

const app = express();

mongoose.connect('mongodb://localhost/taxigo');
//mongoose's promise is deprectaed so set it to node js's global object's promise
mongoose.Promise = global.Promise;

app.listen(4000, function(){
    console.log('Now listening for requests');
});

//body parser attaches the json data sent by the request to the request object's body so that we have access to it in our api.js's req object
app.use(bodyParser.json());

//initialize routes
app.use('/api',require('./routes/api'));

//error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message});
});