const express = require('express')
const bodyParser =  require('body-parser')
const app = express()

//Middleware
app.use(express.json())

//DB Connection
const connectDB = require('./db')
connectDB();

//Import Routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

//Routes Middleware & Prefix
app.use('/api/user', authRoute)
app.use('/api/users', userRoute)

// app.use(bodyParser.json());
app.listen(3000,()=>console.log('Server started at localhost:3000'))


