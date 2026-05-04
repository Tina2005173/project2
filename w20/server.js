const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB')
.then(() => console.log("Employee DB Connected"))
.catch(err => console.log(err));

// Schema
const employeeSchema = new mongoose.Schema({
    name: String,
    department: String,
    designation: String,
    salary: Number,
    joining_date: Date
});

const Employee = mongoose.model('employees', employeeSchema);

// ➕ Add Employee (POST)
app.post('/employees', async (req, res) => {
    await Employee.create(req.body);
    res.send("Employee Added");
});

// 📄 View All Employees (GET)
app.get('/employees', async (req, res) => {
    let data = await Employee.find();
    res.json(data);
});

// ✏️ Update Employee (PUT)
app.put('/employees/:name', async (req, res) => {
    await Employee.updateOne(
        { name: req.params.name },
        req.body
    );
    res.send("Employee Updated");
});

// ❌ Delete Employee (DELETE)
app.delete('/employees/:name', async (req, res) => {
    await Employee.deleteOne({ name: req.params.name });
    res.send("Employee Deleted");
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});