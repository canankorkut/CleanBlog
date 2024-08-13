const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const postController = require('./controllers/postControllers');
const pageController = require('./controllers/pageController');
require('dotenv').config();

const app = express();

// Connect DB
const connectDb = async () => {
  try {
    const uri = process.env.MONGODB_CONNECT_URI;
    if (!uri) {
      throw new Error('MONGODB_CONNECT_URI is not defined');
    }
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.log('Connect failed: ' + error.message);
  }
};

connectDb();

// Template engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// Routes
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is started on port ${PORT}.`);
});
