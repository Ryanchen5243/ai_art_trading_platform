// git bash cmd to start server ->  mongod --dbpath /c/data/db
// seed file for mongodb instance

import {MongoClient} from "mongodb";
import validateUser from "./models/user.js"

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

async function run() {
    try {
        const db = client.db('artium_exchange_db');
        await db.dropCollection("users");
        await db.createCollection("users");
        const users = db.collection('users');
        // await database.listCollections().toArray()).map(col => col.name)
        // todo later -> validate input
        // const isValidUser = validateUser({foo: 6,bar: "boo"});
        // console.log(isValidUser);
        await users.insertMany([
            {
              username: "user123",
              password: "$2b$10$KbQiJ3gPvT.FcIqjsJ.NFeJXMYkJmKldg3d4Nm6.kUoK5E5hU9ZuG",
              date_joined: "2024-03-01T12:00:00Z",
              account_value: 105000,
              stocks: [
                ["ALNX-001", 10.5],
                ["FOX-X7", 4.2]
              ]
            },
            {
              username: "investor_99",
              password: "$2b$10$eGv9Q0vLZ5m7kVV9H3O0Y.Xx5T4Gf5ZNvcOMqU1vP0/l3RfOp5J1K",
              date_joined: "2023-11-15T08:30:00Z",
              account_value: 250000,
              stocks: [
                ["PNGN-03", 3.0],
                ["BSHE-01", 7.25]
              ]
            },
            {
              username: "traderX",
              password: "$2b$10$T/7MIwZBw3kPCXG/UYoCQ.JhyHf1lTVmTp5YoVblK/1CpIY2Dq3nW",
              date_joined: "2022-07-20T15:45:00Z",
              account_value: 560000,
              stocks: [
                ["ROBOT-X9", 12.7],
                ["SOLD-42", 2.3]
              ]
            }
          ]);
        
        await db.dropCollection("ArtStocks")
        await db.createCollection("ArtStocks")
        const artStocks = db.collection("ArtStocks")
        await artStocks.insertMany([
              {
                "ticker": "ALNX-001",
                "name": "Alien X-Class",
                "description": "An extraterrestrial being with advanced intelligence and unknown origins. Often associated with intergalactic exploration and mysterious powers.",
                "curr_stock_price": 1023.45,
                "market_cap": 500000000.00,
                "volume": 1200000
              },
              {
                "ticker": "FOX-X7",
                "name": "Felis X-Class",
                "description": "A sleek, agile creature known for its cunning and adaptability. The Fox-X7 is the pinnacle of survival in diverse environments, making it highly prized in both wild and urban settings.",
                "curr_stock_price": 756.32,
                "market_cap": 320000000.00,
                "volume": 850000
              },
              {
                "ticker": "PNGN-03",
                "name": "Penguin N-Class",
                "description": "A cold-weather dweller from the frozen regions. The Penguin N-Class is well-known for its resilience and charm, making it a popular asset among nature and aquatic-themed collections.",
                "curr_stock_price": 342.67,
                "market_cap": 150000000.00,
                "volume": 430000
              },
              {
                "ticker": "BSHE-01",
                "name": "Banshee E-Class",
                "description": "A spectral being whose mournful wail is said to foretell death. The Banshee E-Class represents the eerie and mystical side of mythology, often considered a harbinger of doom.",
                "curr_stock_price": 978.12,
                "market_cap": 410000000.00,
                "volume": 910000
              },
              {
                "ticker": "GRF-TC",
                "name": "Griffin T-Class",
                "description": "A majestic creature with the body of a lion and the wings of an eagle. The Griffin T-Class symbolizes strength and wisdom, with an aura of regal power.",
                "curr_stock_price": 1345.89,
                "market_cap": 680000000.00,
                "volume": 1250000
              },
              {
                "ticker": "ROBOT-X9",
                "name": "Artificial Intelligence X-Class",
                "description": "A cutting-edge humanoid robot created for exploration, research, and security. The ROBOT-X9 is a top-tier asset with unmatched intelligence and mechanical precision.",
                "curr_stock_price": 1123.50,
                "market_cap": 540000000.00,
                "volume": 1300000
              },
              {
                "ticker": "BF-TT",
                "name": "Big Foot Tracker",
                "description": "A legendary ape-like creature thought to inhabit remote forests. The BF-TT is elusive, making it a rare find and a prime asset for those in search of hidden mysteries.",
                "curr_stock_price": 890.25,
                "market_cap": 390000000.00,
                "volume": 870000
              },
              {
                "ticker": "HYD-89",
                "name": "Hydra 89",
                "description": "A multi-headed serpent-like creature that regenerates when wounded. The Hydra 89 is an asset prized for its regenerative abilities and its association with ancient myths of immortality.",
                "curr_stock_price": 1420.75,
                "market_cap": 750000000.00,
                "volume": 1400000
              },
              {
                "ticker": "SKLL-01",
                "name": "Skull Collector",
                "description": "A mysterious entity whose skull collection signifies power and dominion over life and death. The SKLL-01 represents darkness and the unknown in the mythical creature world.",
                "curr_stock_price": 1100.10,
                "market_cap": 520000000.00,
                "volume": 990000
              },
              {
                "ticker": "BRD-11",
                "name": "Bird 11",
                "description": "A highly adaptable creature, the Bird 11 is symbolic of freedom and transcendence. Often seen as a messenger between worlds, this asset carries the promise of new beginnings.",
                "curr_stock_price": 580.45,
                "market_cap": 270000000.00,
                "volume": 700000
              },
              {
                "ticker": "KRK-77",
                "name": "Kraken 77",
                "description": "A gigantic, legendary sea monster known to dwell beneath the ocean’s depths. The Kraken 77 is an asset that evokes fear and awe in equal measure, with untapped potential beneath the waves.",
                "curr_stock_price": 1680.95,
                "market_cap": 890000000.00,
                "volume": 1500000
              },
              {
                "ticker": "SOLD-42",
                "name": "Soldier-42",
                "description": "A battle-hardened warrior, the Soldier-42 is built for strength, discipline, and tactical prowess. A highly sought-after asset in the world of combat and military-themed collections.",
                "curr_stock_price": 980.30,
                "market_cap": 450000000.00,
                "volume": 920000
              },
              {
                "ticker": "CT-23",
                "name": "Cat 23",
                "description": "A sleek, graceful predator known for its agility and independence. The Cat 23 is a beloved companion and a symbol of mystery and elegance.",
                "curr_stock_price": 615.20,
                "market_cap": 290000000.00,
                "volume": 780000
              },
              {
                "ticker": "MNT-33",
                "name": "Minotaur 33",
                "description": "A half-man, half-bull creature dwelling in labyrinths. The Minotaur 33 is a symbol of primal strength and complexity, revered in ancient myths as a formidable foe.",
                "curr_stock_price": 1245.80,
                "market_cap": 640000000.00,
                "volume": 1180000
              },
              {
                "ticker": "SPX-01",
                "name": "Sphinx 01",
                "description": "A mystical creature with the body of a lion and the head of a human. The Sphinx 01 is known for its riddles and wisdom, often seen as a guardian of ancient secrets.",
                "curr_stock_price": 1090.55,
                "market_cap": 500000000.00,
                "volume": 1050000
              },
              {
                "ticker": "CYC-77",
                "name": "Cyclops 77",
                "description": "A one-eyed giant known for its brute strength and raw power. The Cyclops 77 is a rare and formidable asset, capable of overwhelming foes with its sheer force.",
                "curr_stock_price": 1580.75,
                "market_cap": 630000000.00,
                "volume": 850000
              },
              {
                "ticker": "OWL-X4",
                "name": "Owl X-Class",
                "description": "A nocturnal bird symbolizing wisdom and mystery. The Owl-X4 is revered for its sharp instincts and connection to the unseen world, making it a valuable asset for those who seek knowledge.",
                "curr_stock_price": 1375.40,
                "market_cap": 410000000.00,
                "volume": 1200000
              },
              {
                "ticker": "UNIC-88",
                "name": "Unicorn 88",
                "description": "A majestic horse with a spiral horn on its forehead, symbolizing purity and grace. The Unicorn 88 is considered an asset of unmatched rarity and beauty in mythical collections.",
                "curr_stock_price": 2450.30,
                "market_cap": 720000000.00,
                "volume": 450000
              },
              {
                "ticker": "DRGN-88",
                "name": "Dragon 88",
                "description": "A powerful, fire-breathing creature often linked to treasure and ancient lore. The Dragon 88 is one of the most sought-after assets, embodying power, wealth, and eternal legend.",
                "curr_stock_price": 3100.65,
                "market_cap": 950000000.00,
                "volume": 600000
              },
              {
                "ticker": "PND-06",
                "name": "Panda 06",
                "description": "A peaceful and gentle bear native to bamboo forests. The Panda 06 is a symbol of harmony and conservation, prized for its beauty and rare status in the wild.",
                "curr_stock_price": 860.20,
                "market_cap": 340000000.00,
                "volume": 800000
              },
              {
                "ticker": "YET-56",
                "name": "Yeti 56",
                "description": "A large, ape-like creature said to live in the Himalayan mountains. The Yeti 56 is an elusive asset with untold strength, representing mystery and the unexplored corners of the Earth.",
                "curr_stock_price": 1210.45,
                "market_cap": 480000000.00,
                "volume": 600000
              },
              {
                "ticker": "FRY-99",
                "name": "Fairy 99",
                "description": "A small, magical creature known for its ability to manipulate nature and grant wishes. The Fairy 99 is an asset prized for its connection to the enchanting realms of fantasy.",
                "curr_stock_price": 1150.10,
                "market_cap": 390000000.00,
                "volume": 1100000
              },
              {
                "ticker": "PEG-90",
                "name": "Pegasus 90",
                "description": "A winged horse, symbolizing freedom and divine power. The Pegasus 90 is a rare and highly sought-after asset, often linked to heroic quests and celestial forces.",
                "curr_stock_price": 3200.50,
                "market_cap": 880000000.00,
                "volume": 550000
              }
              
            ])
        

    } finally {
        await client.close()
    }
}

run().catch(console.dir);