// express server logic
// npx nodemon server.js

import express from "express";
import {MongoClient} from "mongodb";
import cors from "cors";

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json())

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

app.get('/',(req,res) => {
    res.send({foo: "bar"});
});
app.get('/fetchStockData',async (req,res) => {
    try {
        await client.connect()
        const db = client.db('artium_exchange_db');
        const artStocks = db.collection('ArtStocks');
        const allStocks = await artStocks.find().toArray();
        res.send(allStocks);
    } catch (err) {
        console.log(err)
    }
});

app.get('/fetchTopStocks', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('artium_exchange_db');
        const artStocks = db.collection('ArtStocks');
        const topStocks = await artStocks.aggregate([
            {
                $sort: { market_cap: -1 }
            },
            {
                $limit: 5
            }
        ]).toArray();
        res.json(topStocks);
    } catch (err) {
        res.status(500).send('Error fetching top stocks');
    }
});


app.get('/fetchCurrPrice',async (req,res) => {
    console.log("fetch request for ...",req.body)
})

const randomNormal = (mean = 0, stdDev = 1) => {
    let u = 1 - Math.random(); // Uniform(0,1] random value
    let v = Math.random();
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return mean + z * stdDev;
};

const generateOHLC = (prevClose, totalShares, volatility = 0.02) => {
    const randomNormal = (mean = 0, stdDev = 1) => {
        let u = 1 - Math.random();
        let v = Math.random();
        let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        return mean + z * stdDev;
    };

    const open = prevClose; // Open is last close price
    const drift = 0.0005; // Small upward drift to simulate market trends
    const change = randomNormal(0, volatility); // Random price change

    const close = open * (1 + change + drift); // Close price movement
    const high = Math.max(open, close) * (1 + Math.abs(randomNormal(0, volatility / 2)));
    const low = Math.min(open, close) * (1 - Math.abs(randomNormal(0, volatility / 2)));

    // Simulate volume (random but proportional to price movement)
    const baseVolume = 5000; // Minimum volume
    const volumeFluctuation = Math.abs(change) * 1000000; // Higher change = higher volume
    const volume = Math.round(baseVolume + volumeFluctuation + Math.random() * 5000);

    // Calculate market cap (stock price × total shares)
    const marketCap = close * totalShares;

    return {
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume,
        marketCap: parseFloat(marketCap.toFixed(2))
    };
};



const randomWalkPrice = (initialPrice, volatility = 0.01) => {
    const step = (Math.random() * 2 - 1) * volatility;
    const updatedPrice = initialPrice  + step;
    return updatedPrice > 0 ? updatedPrice : 0;
}
const updateStockPrices = async () => {
    try {
        await client.connect();
        const db = client.db('artium_exchange_db');
        const artStocks = db.collection('ArtStocks');

        const stocks = await artStocks.find({}).toArray();

        for (const stock of stocks) {
            const prevClose = stock.curr_stock_price;
            const totalShares = stock.total_shares || 100000000; // Default total shares
            const { open, high, low, close, volume, marketCap } = generateOHLC(prevClose, totalShares);

            await artStocks.updateOne(
                { ticker: stock.ticker },
                { 
                    $set: { 
                        curr_stock_price: close,
                        volume: volume,
                        market_cap: marketCap
                    },
                    $push: { 
                        ohlc_history: { 
                            $each: [{ open, high, low, close, volume, marketCap, timestamp: new Date() }], 
                            $slice: -200 // Keep only last 200 records
                        } 
                    }
                }
            );
        }
        console.log('Updated OHLC, volume, and market cap for stocks');
    } catch (err) {
        console.error('Error updating stock prices:', err);
    }
};

// Run stock price updates every 2 seconds
setInterval(updateStockPrices, 2000);


app.listen(port,() => {
    console.log(`app listening on port ${port}`);
});