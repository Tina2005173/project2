const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/music')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    singer: String,
    actor: String,
    actress: String
});

const Song = mongoose.model('songdetails', songSchema);

// Insert Data
app.get('/insert', async (req, res) => {
    await Song.deleteMany(); // clear old data (optional)

    await Song.insertMany([
        { Songname: "ABC", Film: "DEF", Music_director: "GHI", singer: "JKL" },
        { Songname: "Song2", Film: "Film2", Music_director: "AR Rahman", singer: "Sonu" },
        { Songname: "Song3", Film: "Film3", Music_director: "GHI", singer: "KK" },
        { Songname: "Song4", Film: "Film4", Music_director: "AR Rahman", singer: "Shreya" },
        { Songname: "Song5", Film: "Film5", Music_director: "Pritam", singer: "Arijit" }
    ]);

    res.send("5 Songs Inserted");
});

// View All
app.get('/songs', async (req, res) => {
    let data = await Song.find();
    res.json(data);
});

// Search by Director
app.get('/director/:name', async (req, res) => {
    let data = await Song.find({
        Music_director: { $regex: req.params.name, $options: 'i' }
    });
    res.json(data);
});

// Search Director + Singer
app.get('/director-singer', async (req, res) => {
    let { director, singer } = req.query;

    let data = await Song.find({
        Music_director: { $regex: director, $options: 'i' },
        singer: { $regex: singer, $options: 'i' }
    });

    res.json(data);
});

// Delete
app.delete('/songs/:name', async (req, res) => {
    await Song.deleteOne({
        Songname: { $regex: req.params.name, $options: 'i' }
    });
    res.send("Deleted (REST)");
});

// Add Song
app.post('/add', async (req, res) => {
    await Song.create(req.body);
    res.send("Song Added");
});

// Update
app.put('/songs/:name', async (req, res) => {
    await Song.updateOne(
        { Songname: { $regex: req.params.name, $options: 'i' } },
        req.body
    );
    res.send("Updated (REST)");
});

//Count + Display
app.get('/songs-count', async (req, res) => {
    let data = await Song.find();
    let count = await Song.countDocuments();

    res.json({ count, data });
});

//Songs by Singer + Film
app.get('/singer-film', async (req, res) => {
    let { singer, film } = req.query;

    let data = await Song.find({
        singer: { $regex: singer, $options: 'i' },
        Film: { $regex: film, $options: 'i' }
    });

    res.json(data);
});

//Update Actor & Actress (already present but better version)
// Update Actor & Actress (PUT - REST) 
app.put('/update-actor/:name', async (req, res) => 
    { 
        let { actor, actress } = req.body; 
        await Song.updateOne( 
            { Songname: { $regex: req.params.name, $options: 'i' } },
            { actor: actor, actress: actress } 
            );
        res.send("Actor & Actress Updated (PUT)"); 
    });

// Start Server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});