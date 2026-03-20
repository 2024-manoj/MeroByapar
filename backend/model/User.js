// const { default: mongoose, mongo } = require("mongoose");

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name halnei parxa']
    },
    email:{
        type: String,
        required: [true, 'Email halnei parxa'],
        unique:true,
        lowercase:true,
    },
    password:{
        type: String,
        required: [true, "pasword nahalikana ta ka hunxa nih "],
        minlength : [6, 'password kamti ma 6 ota ta hunei paronih']
    },

    role: {
        type:String,
        enum:['admin','cashier', 'manager'],
        default:'cashier'


    },

    store_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
        
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    isActive : {
        type: Boolean,
        default:true,
    },

   

    
},{
    timestamps : true
});


module.exports = mongoose.model('User', userSchema);