const express = require('express');
const router = express.Router();
const Cab = require('../models/cab');


router.get('/cabs', function(req, res, next){
    //get a list of cabs from the datatabase within 100000 m from parameters specified in lng and lat in the
    //query string
    //res.send({type: "GET"});
    /* Cab.geoSearch(
        {type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true}
    ).then(function(cabs){
        res.send(cabs);
    }); */
    //mongodb native driver
    /*const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://Mubashir:muburoot43";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("taxigo").collection("cabs");

    const mycabs = collection.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
                maxDistance: 100000,
                spherical: true
            }
        }
    ]);
    // perform actions on the collection object
    client.close();
    });
    res.send(mycabs);*/
    Cab.find({}).then(function(cabs){
        res.send(cabs);
    });
    /*Cab.find({
        geometry: {
        $geoWithin: {
            $geometry: {type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
            //{maxDistance: 100000, spherical: true}
        }
    }
    }).then(function(cabs){
        res.send(cabs);
    });*/  
});

router.post('/cabs', function(req, res, next){
    //add a cab to the datatabase

    //create a local instance of the model based on the Cab model based on the Cab Schema and save itr to the database
    /*
    var cab = new Cab(req.body);
    cab.save();
    */
   //use a different mongoose method to do the same thing as in the above comment
    // Cab.create(req.body);
    //above method returns a promise. once it complkete, use then methjod for acknowledgement etc whatever u wanna do
    Cab.create(req.body).then(function(cab){
        res.send(cab);
    }).catch(next);
});

router.put('/cabs/:id', function(req, res, next){
    //update a cab in the datatabase
    Cab.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
        // findbyidandupdate sends us the outdated object and not the updated one therefore we 
        // dont work with the old 'cab' object and find the new one for ourselves
        //using the find one mongoose method
        Cab.findOne({_id:req.params.id}).then(function(cab){
            res.send(cab);
        });
    });
});

router.delete('/cabs/:id', function(req, res, next){
    //delete cabs from the datatabase
    Cab.findByIdAndRemove({_id:req.params.id}).then(function(cab){
        res.send(cab);   
    });
    //console.log(req.params.id);
    //res.send({type: "DELETE"});
});

module.exports = router;