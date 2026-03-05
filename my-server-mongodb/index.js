const express = require('express');
const app = express();
const port = 3002;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
var cookieParser = require('cookie-parser');
var session = require('express-session');
const { MongoClient } = require('mongodb');

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: function (origin, callback) {
        // Allow any localhost origin (any port)
        if (!origin || origin.startsWith('http://localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));

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

app.get("/fashions", async (req, res) => {
    try {
        const result = await fashionCollection.find({}).toArray();
        res.send(result);
    } catch (err) {
        console.error("❌ Error fetching fashions:", err.message);
        res.status(500).send({ error: err.message });
    }
});

const { ObjectId } = require('mongodb');

app.get("/fashions/:id", async (req, res) => {
    var o_id = new ObjectId(req.params["id"]);
    const result = await fashionCollection.find({ _id: o_id }).toArray();
    res.send(result[0])
})

// Exercise 61: Programming Cookies - Save login information
const userCollection = database.collection("User");

// Login API - POST method
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userCollection.findOne({ username: username, password: password });
        if (user) {
            res.cookie("username", username);
            res.cookie("password", password);
            res.json({ success: true, message: "Login successful", user: user });
        } else {
            res.json({ success: false, message: "Invalid username or password" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get login cookie API
app.get("/get-login-cookie", (req, res) => {
    const username = req.cookies.username || "";
    const password = req.cookies.password || "";
    res.json({ username: username, password: password });
});

// Exercise 60: Cookies Programming

// Step 3: Create Cookies - single data and JsonObject data
app.get("/create-cookie", (req, res) => {
    res.cookie("username", "tranduythanh")
    res.cookie("password", "123456")
    account = {
        "username": "tranduythanh",
        "password": "123456"
    }
    res.cookie("account", account)
    res.send("cookies are created")
})

// Step 4 & 5: Read Cookies
app.get("/read-cookie", (req, res) => {
    //cookie is stored in client, so we use req
    username = req.cookies.username
    password = req.cookies.password
    account = req.cookies.account
    infor = "username = " + username + "<br/>"
    infor += "password = " + password + "<br/>"
    if (account != null) {
        infor += "account.username = " + account.username + "<br/>"
        infor += "account.password = " + account.password + "<br/>"
    }
    res.send(infor)
})

// Step 6: Clear Cookies
app.get("/clear-cookie", (req, res) => {
    res.clearCookie("account")
    res.send("[account] Cookie is removed")
})

// Exercise 62: Session Programming

// Step 3: Session visited counter
app.get("/contact", cors(), (req, res) => {
    if (req.session.visited != null) {
        req.session.visited++
        res.send("You visited this page " + req.session.visited + " times")
    } else {
        req.session.visited = 1
        res.send("Welcome to this page for the first time!")
    }
})

// Exercise 63: Shopping Cart with Session

// Get all products (using Fashion collection as products)
app.get("/products", async (req, res) => {
    try {
        const result = await fashionCollection.find({}).toArray();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add product to cart (stored in session)
app.get("/add-to-cart/:id", async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        const o_id = new ObjectId(req.params.id);
        const product = await fashionCollection.findOne({ _id: o_id });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        // Initialize cart if not exists
        if (!req.session.cart) {
            req.session.cart = [];
        }
        // Check if product already in cart
        const existingItem = req.session.cart.find(item => item._id === req.params.id);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            req.session.cart.push({
                _id: req.params.id,
                name: product.fashion_subject,
                image: product.fashion_image,
                price: product.fashion_price || 0,
                qty: 1
            });
        }
        res.json({ success: true, message: "Added to cart", cartCount: req.session.cart.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// View cart
app.get("/cart", (req, res) => {
    const cart = req.session.cart || [];
    res.json(cart);
});

// Update cart: remove checked items or update quantities
app.post("/update-cart", (req, res) => {
    const { removeIds, quantities } = req.body;
    if (!req.session.cart) {
        req.session.cart = [];
    }
    // Remove checked items
    if (removeIds && removeIds.length > 0) {
        req.session.cart = req.session.cart.filter(item => !removeIds.includes(item._id));
    }
    // Update quantities
    if (quantities) {
        req.session.cart.forEach(item => {
            if (quantities[item._id] !== undefined) {
                item.qty = parseInt(quantities[item._id]) || 1;
            }
        });
    }
    res.json({ success: true, cart: req.session.cart });
});