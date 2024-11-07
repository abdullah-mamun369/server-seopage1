const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config()
const port = process.env.PORT || 5000;
const multer = require("multer")
const path = require("path")


//File upload folder

const UPLOAD_FOLDER = "./uploads/";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_FOLDER);
    },
    filename: function (req, file, cb) {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
        cb(null, fileName + fileExt);
    }
})


var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20 // 20MB
    }
})

app.post('/upload', upload.single("file"), (req, res) => {
    res.send("Helo World")
})



//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@jobinterview.vky0v.mongodb.net/?retryWrites=true&w=majority&appName=jobInterview`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const todoCollections = client.db('todoList').collection('todos');


        app.get('/todos', async (req, res) => {
            try {
                const cursor = todoCollections.find();
                const result = await cursor.toArray();
                res.send(result);
            }
            catch (error) {
                console.error("Error fetching todos:", error);
                res.status(500).send({ message: "Failed to fetch todos" });
            }
        });


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. Successfully connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}
run().catch(console.dir);



app.listen(port, (err, res) => {
    console.log(`Simple operation on port ${port}`);

})