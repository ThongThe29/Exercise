const express = require('express');
const app = express();
const port = 3002;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require('mongodb');

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection
const client = new MongoClient("mongodb://127.0.0.1:27017");

async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB successfully");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
    }
}
connectDB();

const database = client.db("FashionData");
const fashionCollection = database.collection("Fashion");

app.listen(port, () => {
    console.log(`My Server listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("This Web server is processed for MongoDB");
});

app.get("/fashions", cors(), async (req, res) => {
    try {
        const result = await fashionCollection.find({}).toArray();
        res.send(result);
    } catch (err) {
        console.error("❌ Error fetching fashions:", err.message);
        res.status(500).send({ error: err.message });
    }
});