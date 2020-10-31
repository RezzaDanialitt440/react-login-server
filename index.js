const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs');

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

const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>console.log('Server started at port : ' + PORT))

app.get('/', (req, res) => {
    res.send('Welcome to Take Home Assignment')
})



