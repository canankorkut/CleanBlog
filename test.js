const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create schema
const PostSchema = new Schema({
    title: String,
    detail: String,
    dateCreated: Date
});

const Post = mongoose.model('Post', PostSchema);

// Create a post
Post.create({
    title: 'Post 1',
    detail: 'Post description 1',
    dateCreated: Date
});

// Read a post
Post.find({}, (err, data) => {
    console.log(data);
});