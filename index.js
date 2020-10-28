const express = require('express')
const bodyParser =  require('body-parser')
const connectDB = require('./db')

var app = express()
connectDB();
app.use(bodyParser.json())
app.listen(4000,()=>console.log('Server started at localhost:4000'))