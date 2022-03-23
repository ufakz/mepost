const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary').v2

const routes = require('./routes/index')

const app = express()
const router = express.Router()
const url = process.env.MONGO_DB_URI || "mongodb://localhost:27017/medium"

cloudinary.config({
    cloud_name: 'farouqu',
    api_key: '324883857256786',
    api_secret: 'Bf_2jBAafb5whIiwrDR_oTvSuTU'
});

try {
    mongoose.connect(url)
} catch (error) {
    console.log(error)
}

const PORT = 5000 || process.env.PORT

//Set up middleware
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())

app.use('/api', router)

//Set up routes
routes(router)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})