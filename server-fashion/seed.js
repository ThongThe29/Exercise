const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/FashionData', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB database: FashionData");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

// Define Schema and Model
const fashionSchema = new mongoose.Schema({
    fashion_title: { type: String, required: true },
    fashion_details: { type: String, required: true },
    thumbnail: { type: String },
    fashion_style: { type: String, required: true },
    creation_date: { type: Date, default: Date.now }
}, {
    collection: 'Fashion_Ex58'
});

const Fashion = mongoose.model('Fashion', fashionSchema);

const seedData = [
    // Casual Style
    {
        fashion_title: "Classic Denim Jacket",
        fashion_details: "A timeless denim jacket perfect for layering over any casual outfit.",
        thumbnail: "https://images.unsplash.com/photo-1549557613-263a2cf5d654?auto=format&fit=crop&q=80&w=300&h=300",
        fashion_style: "Casual"
    },
    {
        fashion_title: "White Cotton T-Shirt",
        fashion_details: "Premium weight cotton t-shirt with a relaxed fit.",
        thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=300&h=300",
        fashion_style: "Casual"
    },
    {
        fashion_title: "Comfortable Cargo Pants",
        fashion_details: "Durable and practical cargo pants with multiple pockets.",
        thumbnail: "https://images.unsplash.com/photo-1624378439575-d1ead6bb24b7?auto=format&fit=crop&q=80&w=300&h=300",
        fashion_style: "Casual"
    },
    // Formal Style
    {
        fashion_title: "Navy Blue Tailored Suit",
        fashion_details: "Elegant two-piece tailored suit in a classic navy blue finish.",
        thumbnail: "https://images.unsplash.com/photo-1594938298596-70f594f620e1?auto=format&fit=crop&q=80&w=300&h=300",
        fashion_style: "Formal"
    },
    {
        fashion_title: "Silk Bow Tie",
        fashion_details: "Black silk bow tie, the perfect accessory for evening wear.",
        thumbnail: "https://images.unsplash.com/photo-1582845347206-8dce28d844c8?auto=format&fit=crop&q=80&w=300&h=300",
        fashion_style: "Formal"
    },
    {
        fashion_title: "Oxford Leather Shoes",
        fashion_details: "Genuine leather Oxford shoes with a high-shine finish.",
        thumbnail: "https://images.unsplash.com/photo-1614252235316-8a02a4bf73b0?auto=format&fit=crop&q=80&w=300&h=300",
        fashion_style: "Formal"
    },
    {
        fashion_title: "Crisp White Dress Shirt",
        fashion_details: "A perfectly tailored white dress shirt for all formal occasions.",
        thumbnail: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=300&h=300",
        fashion_style: "Formal"
    },
    // Sportswear Style
    {
        fashion_title: "Breathable Running Tank",
        fashion_details: "Moisture-wicking fabric tank top for intense workouts.",
        thumbnail: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&q=80&w=300&h=300",
        fashion_style: "Sportswear"
    },
    {
        fashion_title: "Compression Leggings",
        fashion_details: "High-waisted compression leggings for maximum support and flexibility.",
        thumbnail: "https://images.unsplash.com/photo-1506629082955-559bd6b000ef?auto=format&fit=crop&q=80&w=300&h=300",
        fashion_style: "Sportswear"
    },
    {
        fashion_title: "Lightweight Windbreaker",
        fashion_details: "Water-resistant and windproof jacket for outdoor activities.",
        thumbnail: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=300&h=300",
        fashion_style: "Sportswear"
    }
];

const seedDatabase = async () => {
    try {
        await Fashion.deleteMany({});
        console.log("Cleared existing Fashion collection.");

        await Fashion.insertMany(seedData);
        console.log("Successfully seeded Fashion data!");
    } catch (err) {
        console.error("Error seeding data:", err);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
