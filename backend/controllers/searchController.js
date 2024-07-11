import express from 'express';  
const { MongoClient } = require('mongodb');

const app = express();

// ... MongoDB connection setup ...

app.get('/api/search', async (req, res) => {
  const searchTerm = req.query.name;

  try {
    const results = await db.collection('movies').find({
      name: { $regex: new RegExp(searchTerm, 'i') } // Case-insensitive search
    }).toArray();

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error searching users');
  }
});