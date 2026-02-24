const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.CONNECTION_STRING;
    
    if (!mongoURI) {
      console.error("❌ CRITICAL: MongoDB URI not configured");
      console.error("   Set either MONGODB_URI or CONNECTION_STRING environment variable");
      process.exit(1);
    }

    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = dbConnect;