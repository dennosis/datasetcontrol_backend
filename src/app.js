if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(routes)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

module.exports = app