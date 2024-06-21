const mongoose = require('mongoose');
const propertySchema = new mongoose.Schema({
    images: [
        {
            fileName: {
                type: String,
                required: true,
            },
        },
    ],
    propertyType: {
        type: String,
        required: true,
        enum: ['sell', 'rent', 'commercial'],
    },
    buildingName: {
        type: String,
        required: true,
    },
    facing: {
        type: String,
        required: true,
        enum: ['east', 'west', 'north', 'south', 'northeast', 'northwest', 'southeast', 'southwest'],
    },
    contactNo: {
        type: String, // Store phone numbers as strings
        required: true,
        ref: 'User', // Reference to the User collection
    },
    squareFeet: {
        type: String,
        required: true,
    },
    securityDeposit: {
        type: Number,
        required: true,
    },
    furnishing: {
        type: String,
        required: true,
        enum: ['furnished', 'semi-furnished', 'unfurnished'],
    },
    flooring: {
        type: String,
        required: true,
    },
    ageOfConstruction: {
        type: Number,
        required: true,
    },
    waterAvailability: {
        type: String,
        required: true,
    },
    numberOfLifts: {
        type: Number,
        required: true,
    },
    electricityStatus: {
        type: String,
        required: true,
    },
    landmark:{
        type:String
    },
    noOfBedroom:{
        type:Number,
        required:true,
    },
    noOfBathroom:{
        type:Number,
        required:true,
    },
    floor:{
        type:String
    },
    rentalValue:{
        type:Number,
        required:true
    },
    description:{
        type:String,
    },
    availableFor:{
        type:String,
        required:true,
        enum:['married','student','man','woman','bachelor','family','couple']
    },
    availableFrom:{
        type:String,
        required:true
    },
    noOfBalconies:{
        type:Number
    },
    address: {
        street: {
            type: String,
        },
        area: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        postalCode: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    Link:{
        type:String
    },
    likes:[
        {
        name:{
            required:true,
            type:String
        }
        }
    ],
    comments:[
        {
            name:{
                required:true,
                type:String
            },
            comment:{
                required:true,
                type:String
            }
        }
    ],
    views:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
