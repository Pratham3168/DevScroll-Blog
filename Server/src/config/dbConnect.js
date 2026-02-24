const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect =async ()=>{

    try{
       await mongoose.connect(process.env.CONNECTION_STRING);
       console.log("MongoDB connected Successfully");
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }

}

module.exports = dbConnect;