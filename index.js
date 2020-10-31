const express = require('express')
const app = express()
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const dotenv = require('dotenv')
dotenv.config();

//Enable CORS
const cors = require('cors')
app.use(cors())

// Init Middleware
app.use(express.json({ extended: false }));

//DB Connection
const connectDB = require('./config/db')
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

    apis: ['./routes/auth.js', './routes/user.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(process.env.PORT || 4000,()=>console.log('Server started at port :' + process.env.PORT))

app.get('/', (req, res) => {
    res.send('Welcome to Take Home Assignment')
})



