const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// DB
mongoose.connect('mongodb://127.0.0.1:27017/student')
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_Marks: Number
});

const Student = mongoose.model('studentmarks', studentSchema);


// INSERT (POST)
app.post('/students', async (req, res) => {
    await Student.create(req.body);
    res.send("Student Added");
});


// INSERT MULTIPLE
app.get('/insert', async (req, res) => {
    await Student.deleteMany();

    await Student.insertMany([
        { Name: "ABC", Roll_No: 111, WAD_Marks: 25, CC_Marks: 25, DSBDA_Marks: 25, CNS_Marks: 25, AI_Marks: 25 },
        { Name: "XYZ", Roll_No: 112, WAD_Marks: 30, CC_Marks: 28, DSBDA_Marks: 22, CNS_Marks: 21, AI_Marks: 27 },
        { Name: "PQR", Roll_No: 113, WAD_Marks: 10, CC_Marks: 15, DSBDA_Marks: 18, CNS_Marks: 12, AI_Marks: 20 },
        { Name: "LMN", Roll_No: 114, WAD_Marks: 40, CC_Marks: 42, DSBDA_Marks: 38, CNS_Marks: 35, AI_Marks: 41 }
    ]);

    res.send("Inserted");
});


// GET ALL + COUNT
app.get('/students', async (req, res) => {
    let data = await Student.find();
    let count = await Student.countDocuments();
    res.json({ count, data });
});


// FILTER DSBDA > 20
app.get('/students/dsbda20', async (req, res) => {
    let data = await Student.find({ DSBDA_Marks: { $gt: 20 } });
    res.json(data);
});


// UPDATE (+10)
app.put('/students/:name', async (req, res) => {
    await Student.updateOne(
        { Name: req.params.name },
        { $inc: { DSBDA_Marks: 10 } }
    );
    res.send("Updated");
});


// >25 ALL SUBJECTS
app.get('/students/above25', async (req, res) => {
    let data = await Student.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_Marks: { $gt: 25 }
    });
    res.json(data);
});


// <40 (WAD & CNS)
app.get('/students/less40', async (req, res) => {
    let data = await Student.find({
        WAD_Marks: { $lt: 40 },
        CNS_Marks: { $lt: 40 }
    });
    res.json(data);
});


// DELETE
app.delete('/students/:name', async (req, res) => {
    await Student.deleteOne({ Name: req.params.name });
    res.send("Deleted");
});


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});