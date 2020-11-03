const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`MongoDB Connected....`))
.catch(err => console.log(err))

//Load Idea Model
require('../models/Idea')
const Idea = mongoose.model('ideas')

//User login route
router.get('/login', (req, res) => {
    res.render('users/login')
})

//User register route
router.get('/register', (req, res) => {
    res.render('users/register')
})

module.exports = router