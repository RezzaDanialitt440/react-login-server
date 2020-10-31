
const mongoose = require('mongoose');

//will hide later
const db = 'mongodb+srv://rezzadanial:root@digi-assessment.va2ma.mongodb.net/digi-user?retryWrites=true&w=majority'

const connectDB = async()=>{
    await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    console.log('db connected...')
}

module.exports = connectDB