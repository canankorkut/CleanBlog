const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const postController = require('./controllers/postControllers');
const pageController = require('./controllers/pageController');

const app = express();

// Connect DB
mongoose.connect('mongodb+srv://canankorkut1:HxqavI5ORBcxww3k@cluster0.qxy2w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Template engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods:['POST', 'GET']
}));

// Routes
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);

const port = 3000;
app.listen(port, () => {
    console.log(`The server is started on port ${port}.`);
});
