const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, 'tasks.json');

app.use(express.json());
app.use(express.static('public')); // serve frontend

// 🔹 Read tasks
app.get('/api/tasks', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Read error' });

        const tasks = data ? JSON.parse(data) : [];
        res.json(tasks);
    });
});

// 🔹 Add task
app.post('/api/tasks', (req, res) => {
    const newTask = req.body;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        let tasks = data ? JSON.parse(data) : [];

        newTask.id = Date.now();
        newTask.completed = false;

        tasks.push(newTask);

        fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), () => {
            res.json(newTask);
        });
    });
});

// 🔹 Update task (text or completed)
app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        let tasks = data ? JSON.parse(data) : [];

        tasks = tasks.map(task =>
            task.id === id ? { ...task, ...req.body } : task
        );

        fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), () => {
            res.json({ message: "Updated" });
        });
    });
});

// 🔹 Delete task
app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        let tasks = data ? JSON.parse(data) : [];

        tasks = tasks.filter(task => task.id !== id);

        fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), () => {
            res.json({ message: "Deleted" });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});