
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

const connectDB = async()=>{
    await mongoose.connect(process.env.BD_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('db connected...')
}

module.exports = connectDB