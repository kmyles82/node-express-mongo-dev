if(process.env.NODE_ENV == 'production'){
    module.exports = { mongoURI: 'mongodb+srv://kmyles:vidjotpassword@cluster0.hahko.mongodb.net/test'}
} else {
    module.exports = { mongoURI: 'mongodb://localhost/vidjot-dev'}
}