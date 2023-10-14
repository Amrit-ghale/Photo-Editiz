const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const mongoURI = 'mongodb+srv://amritghale:amritghale@photoeditizcluster.xzmiqge.mongodb.net/?retryWrites=true&w=majority';
const port = 5000;


app.use(cors());

// Connect to MongoDB
MongoClient.connect(mongoURI, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    const db = client.db('photoEditiz'); 

    app.use(express.json()); 

    
    app.post('/login', (req, res) => {
      const { username, password } = req.body;

      // Check user credentials in the database
      db.collection('users').findOne({ username, password }, (err, user) => {
        if (err) {
          console.error('Error checking credentials:', err);
          res.status(500).send('Internal Server Error');
        } else if (user) {
          res.json({ message: 'Authentication successful' });
        } else {
          res.status(401).json({ message: 'Authentication failed' });
        }
      });
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
