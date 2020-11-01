const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express();

//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`MongoDB Connected....`))
.catch(err => console.log(err))

//Load Idea Model
require('./models/Idea')
const Idea = mongoose.model('ideas')


//Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Handlebars middleware
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

//Index Route
app.get('/', (req, res) => {
    const title = 'Welcome'
    res.render('index', {
        title: title
    })
})

//About Route
app.get('/about', (req, res) => {
    res.render('about')
})

//Add Idea form
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add')
})

//Process Form
app.post('/ideas', (req, res) => {
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
        res.send('passed')
    }
})

const port = 3000;

app.listen(port, () => {
    console.log(`Server running on PORT ${port}`);
});