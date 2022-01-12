const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb atlas database server connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.budis.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('database connected successfully');

        app.get('/get_matches', async (req, res) => {
            await client.connect();
            console.log('database connected successfully');
            const database = client.db('cheap_tickets_football_db');
            const productsCollection = database.collection('matches');
            const result = await productsCollection.find().toArray();
            res.send(result);
        })
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('running cheap-tickets-football server');
});

app.listen(port, () => {
    console.log(`cheap-tickets-football listening at http://localhost:${port}`);
});