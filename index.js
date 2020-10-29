const express = require('express')
const bodyParser =  require('body-parser')
const app = express()
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

//Middleware
app.use(express.json())

//DB Connection
const connectDB = require('./db')
connectDB();

//Import Routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

//Routes Middleware & Prefix
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Digi Assessment API',
            description: 'This API will allow user to Register new user, Login and Retrieve List of Members Name',
               version: '1.0.1',
            contact: {
                name:'Rezza Danial'
            },
            servers: ["http://localhost:4000"]
        }
    },

    apis: ['./routes/auth.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(4000,()=>console.log('Server started at localhost:4000'))



