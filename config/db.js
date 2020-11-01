
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async()=>{
    await mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    console.log('db connected...')
}

module.exports = connectDB