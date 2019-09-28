const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create geolocation schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

const cabSchema = new Schema({
    driver: {
        type: String,
        required: [true, 'Driver is required']
    },
    car: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false
    },
    //add geolocationinfo
    geometry: GeoSchema
});

const Cab=mongoose.model('cab', cabSchema);

module.exports = Cab;