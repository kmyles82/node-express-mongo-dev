const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

//Load Idea Model
require('../models/Idea')
const Idea = mongoose.model('ideas')

//Idea Index Page
router.get('/', (req, res) => {
    Idea.find({})
    .sort({date: 'desc'}).lean()
    .then(ideas => {
        // console.log(ideas)
        res.render('ideas/index', {
            ideas
        })
    })
})

//Add Idea form
router.get('/add', (req, res) => {
    res.render('ideas/add')
})

//Edit Idea form
router.get('/edit/:id', (req, res) => {
    Idea.findOne({ 
        _id: req.params.id
    })
    .lean()
    .then(idea => {
        // console.log(idea)
        res.render('ideas/edit', {
            idea
        })
    })
})

//Process Form
router.post('/', (req, res) => {
    let errors = []

    if(!req.body.title){
        errors.push({text: 'Please add a title'})
    }

    if(!req.body.details){
        errors.push({text: 'Please add some details'})
    }

    if(errors.length > 0){
        
        res.render('ideas/add', {
            errors,
            title: req.body.title,
            details: req.body.details
        })
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }

        new Idea(newUser)
        .save()
        .then((idea) => {
            req.flash('success_msg', 'Video added')
            res.redirect('/ideas')
        })
        .catch(err => console.log(err))
    }
})

//Edit From process
router.put('/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        //new values
        idea.title = req.body.title,
        idea.details = req.body.details

        idea.save()
        .then(idea => {
            req.flash('success_msg', 'Video idea updated')
            res.redirect('/ideas')
        })
    })
})

//Delete Idea
router.delete('/:id', (req, res) => {
    Idea.remove({
        _id: req.params.id
    })
    .then(() => {
        req.flash('success_msg', 'Video idea removed')
        res.redirect('/ideas')
    })
    
})

module.exports = router