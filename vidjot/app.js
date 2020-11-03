const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')

//Load Routes
const ideas = require('./routes/ideas')
const users = require('./routes/users')

const app = express();

//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`MongoDB Connected....`))
.catch(err => console.log(err))

//Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Handlebars middleware
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Method override middleware
app.use(methodOverride('_method'))

//Express Session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//Flash Message middleware
app.use(flash())

//Global variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    
    next()
})

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

//Use routes
app.use('/ideas', ideas)
app.use('/users', users)

const port = 3000;

app.listen(port, () => {
    console.log(`Server running on PORT ${port}`);
});