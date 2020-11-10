const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const passPort = require('passport')

//Load User model
require('../models/User')
const User = mongoose.model('users')


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

// Register Form post
router.post('/register', (req, res) => {
    let errors = []
    
    if(req.body.password != req.body.password2){
        errors.push({
            text: 'Passwords do not match'
        })
    }

    if(req.body.password.length < 4){
        errors.push({
            text: 'Passwords must be at least 4 characters'
        })
    }

    if(errors.length > 0){
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        })
    } else {

        User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                req.flash('error_msg', 'Email already registered')
                res.redirect('/users/register')
            }else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
        
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
        
                        newUser.password = hash;
        
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered and can login')
                            res.redirect('/users/login')
                        })
                        .catch(err => {
                            console.log(err)
                            return
                        }) 
                    })
                });
            }
        })
        .catch(err => {
            console.log(err)
        }) 

        

        // console.log(newUser)
    }

    // console.log(errors)
})

module.exports = router