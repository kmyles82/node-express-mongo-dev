const express = require('express');

const app = express();

//Index Route
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>')
})

const port = 3000;

app.listen(port, () => {
    console.log(`Server running on PORT ${port}`);
});