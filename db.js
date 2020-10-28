
const mongoose = require('mongoose');

const URI = "mongodb+srv://rezzadanial:root@digi-assessment.va2ma.mongodb.net/digi-user?retryWrites=true&w=majority"

const connectDB = async()=>{
    await mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('db connected...')
}

module.exports = connectDB