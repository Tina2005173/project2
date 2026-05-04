const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
.then(() => console.log("Book DB Connected"))
.catch(err => console.log(err));

// Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    genre: String
});

const Book = mongoose.model('books', bookSchema);

// ➕ Add Book (POST)
app.post('/books', async (req, res) => {
    await Book.create(req.body);
    res.send("Book Added");
});

// 📄 Get All Books (GET)
app.get('/books', async (req, res) => {
    let data = await Book.find();
    res.json(data);
});

// ✏️ Update Book (PUT)
app.put('/books/:title', async (req, res) => {
    await Book.updateOne(
        { title: req.params.title },
        req.body
    );
    res.send("Book Updated");
});

// ❌ Delete Book (DELETE)
app.delete('/books/:title', async (req, res) => {
    await Book.deleteOne({ title: req.params.title });
    res.send("Book Deleted");
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});