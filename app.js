const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const postController = require('./controllers/postControllers');
const pageController = require('./controllers/pageController');

const app = express();

// Connect DB
const connectDb = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://canankorkut1:3BSDag0cly0S3J9c@cleanblog.5psk2.mongodb.net/cleanblog?retryWrites=true&w=majority&appName=cleanblog'
    );
  } catch (error) {
    console.log('Connect failed ' + error.message);
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

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`The server is started on port ${port}.`);
});
