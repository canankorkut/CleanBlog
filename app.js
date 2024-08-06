const express = require('express');
const ejs = require('ejs');

const app = express();

// Template engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/add', (req, res) => {
    res.render('add');
});

const port = 3000;
app.listen(port, () => {
    console.log(`The server is started on port ${port}.`);
});
