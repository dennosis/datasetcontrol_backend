const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlainSchema = new Schema({
    name:{
        type: String, 
        required: true,
        unique: true
    },
    isValid: {
        type: Boolean, 
    },
    path: {
        type: String, 
        required: true
    },
    width: {
        type: Number, 
        required: true
    },
    height: {
        type: Number, 
        required: true
    },
    width_px: {
        type: Number, 
        required: true
    },
    height_px: {
        type: Number, 
        required: true
    },
    imgWidth_px: {
        type: Number, 
        required: true
    },
    imgHeight_px: {
        type: Number, 
        required: true
    },
    imgX_px: {
        type: Number, 
        required: true
    },
    imgX_px: {
        type: Number, 
        required: true
    },
    svg: {
        type: String, 
        required: true
    },
    spaces : [
        {
            class: {
                type: String, 
                required: true
            },
            name: {
                type: String, 
                required: true
            },
            index: {
                type: Number, 
                required: true
            },
            width: {
                type: Number, 
                required: true
            },
            height: {
                type: Number, 
                required: true
            },
            rcx: {
                type: Number, 
                required: true
            },
            rcy: {
                type: Number, 
                required: true
            },
            horizontally: {
                type: String, 
                required: true
            },
            vertically: {
                type: String, 
                required: true
            },
            area: {
                type: Number, 
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Plain', PlainSchema);