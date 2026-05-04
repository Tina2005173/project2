const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/music1")
.then(()=>console.log("connected"))
.catch((err)=>console.log(err));

const songSchema = new mongoose.Schema({
    songname:String,
    film:String,
    music_director:String,
    singer:String
});

const song = mongoose.model('songdetail',songSchema);

app.get('/insert',async(req , res)=>{
    await song.deleteMany();

    await song.insertMany([
        {songname:"aaaa",film:"aaaa",music_director:"aaaa",singer:"aaa"},
        {songname:"Song1", film:"Film1", music_director:"AR Rahman", singer:"Sonu"},
        {songname:"Song2", film:"Film2", music_director:"Pritam", singer:"Arijit"},
        {songname:"Song3", film:"Film3", music_director:"Vishal", singer:"Shreya"},
        {songname:"Song4", film:"Film4", music_director:"Anu Malik", singer:"KK"}
        ]); 

        res.send("inserted record ");
});

app.get('/song',async (req , res )=>{
    let data = await song.find();
    res.json(data);
});

app.delete('/songs/:name',async(req , res)=>{
    await song.deleteOne({
        songname:{$regex:req.params.name , $options:"i"}
    });

    res.send("deleted successfully");
});

app.put('/songs/:name',async(req , res)=>{
    await song.updateOne({
        songname:{$regex:req.params.name , $options:"i"}
    },
    req.body
);
res.send("update done ");
});

app.put('/update-actor/:name',async(req ,res)=>{
    let {film ,singer}=req.body;
    await song.updateOne(
        {songname:{$regex:req.params.name,$options:"i"}},
        {film:film, singer:singer}
    );
    res.send("film and singer updated ");
});

app.post('/add', async(req , res)=>{
    await song.create(req.body);
    res.send("song added");
});

app.listen(3000 , ()=>{
    console.log("start at http://localhost:3000");
});

//app.get('/');


