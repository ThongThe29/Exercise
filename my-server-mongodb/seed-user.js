const { MongoClient } = require('mongodb');

async function seedPrices() {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    try {
        await client.connect();
        const db = client.db("FashionData");
        const col = db.collection("Fashion");

        const fashions = await col.find({}).toArray();
        const samplePrices = [399.99, 529.00, 159.00, 289.00, 289.00, 229.00, 199.00, 349.00, 449.00];

        for (let i = 0; i < fashions.length; i++) {
            const price = samplePrices[i % samplePrices.length];
            if (!fashions[i].fashion_price) {
                await col.updateOne(
                    { _id: fashions[i]._id },
                    { $set: { fashion_price: price } }
                );
                console.log(`✅ Set price $${price} for: ${fashions[i].fashion_subject}`);
            } else {
                console.log(`ℹ️ Already has price: ${fashions[i].fashion_subject}`);
            }
        }
        console.log('Done!');
    } catch (err) {
        console.error("❌ Error:", err.message);
    } finally {
        await client.close();
    }
}

seedPrices();
