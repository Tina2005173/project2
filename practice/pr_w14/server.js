const express = require("express");
const fs=require("fs");
const path = require("path");
const cors = require("cors");
const app=express();
const PORT =3000;

app.use(cors());

app.get("/api" , (req,res)=>{
    const filepath = path.join(__dirname,"users.json");
    fs.readFile(filepath,"utf8",(err,data)=>{
        if(err)
        {
            return res.status(500).send("error in file reading ");
        }
        res.json(JSON.parse(data));
    });
});

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});

app.listen(PORT,()=>{
    console.log(`server at http://localhost:${PORT}`);
})