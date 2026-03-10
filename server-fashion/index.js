const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/FashionData').then(() => {
    console.log("Connected to MongoDB database: FashionData");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

const fashionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    thumbnail: { type: String },
    style: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
}, {
    collection: 'Fashion'
});

const Fashion = mongoose.model('Fashion', fashionSchema);

// APIs

// 1. Return the entire Fashion, sorted by creation date descending
app.get('/api/fashions', async (req, res) => {
    try {
        const fashions = await Fashion.find().sort({ created_at: -1 });
        res.json(fashions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Filter the list of Fashions according to a certain Style
app.get('/api/fashions/style/:style', async (req, res) => {
    try {
        const style = req.params.style;
        const fashions = await Fashion.find({ style: style }).sort({ created_at: -1 });
        res.json(fashions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Return a Fashion based on ObjectId
app.get('/api/fashions/:id', async (req, res) => {
    try {
        const fashion = await Fashion.findById(req.params.id);
        if (!fashion) return res.status(404).json({ message: 'Fashion not found' });
        res.json(fashion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Add a new Fashion
app.post('/api/fashions', async (req, res) => {
    try {
        const newFashion = new Fashion(req.body);
        const savedFashion = await newFashion.save();
        res.status(201).json(savedFashion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Edit a Fashion
app.put('/api/fashions/:id', async (req, res) => {
    try {
        const updatedFashion = await Fashion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedFashion) return res.status(404).json({ message: 'Fashion not found' });
        res.json(updatedFashion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Delete a Fashion based on id
app.delete('/api/fashions/:id', async (req, res) => {
    try {
        const deletedFashion = await Fashion.findByIdAndDelete(req.params.id);
        if (!deletedFashion) return res.status(404).json({ message: 'Fashion not found' });
        res.json({ message: 'Fashion deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
