const express = require('express');
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const UserModel = require("../models/User.js");
const TodoModel = require("../models/Todo.js");
require("dotenv").config();


const corsConfig = {
    origin: "*",
    credential: true,
    methods: ["GET", "POST, PUT", "DELETE"]
}


const app = express();
const port = process.env.PORT || 5000;

app.options("", cors(corsConfig));
app.use(cors(corsConfig));


// Middleware
app.use(cors());
app.use(express.json());

// File upload folder
const fs = require('fs');
const UPLOAD_FOLDER = "../uploads/";

if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_FOLDER);
    },
    filename: function (req, file, cb) {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
        cb(null, fileName + fileExt);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20 // 20MB
    }
});

// MongoDB connection using Mongoose
mongoose.connect(`mongodb+srv://mamunbdcontact:vxiU36aC5NFvx6oc@jobinterview.vky0v.mongodb.net/todoList?retryWrites=true&w=majority`)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.error("Failed to connect to MongoDB:", err));


// Route to upload file
app.post('/upload', upload.single("file"), (req, res) => {
    UserModel.create({ image: req.file.filename })  // Corrected to req.file
        .then(result => res.json(result))
        .catch(err => {
            console.error(err);
            res.status(500).send("Error saving file information");
        });
});

//Get attachements from api
app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();  // Fetch all users from the UserModel collection
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Failed to fetch users" });
    }
});

// get todos from api

app.get('/todos', async (req, res) => {
    try {
        const users = await TodoModel.find();  // Fetch all users from the UserModel collection
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Failed to fetch users" });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// some changes due to node issue

app.get('/mamun', (req, res) => {
    res.send('Hello, World!');
});