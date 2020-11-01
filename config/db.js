
const mongoose = require('mongoose');
require('dotenv').config();

const db = process.env.BD_CONNECT

const connectDB = async()=>{
    await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    console.log('db connected...')
}

module.exports = connectDB