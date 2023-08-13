import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = 3000;
const IEX_TOKEN = process.env.IEX_TOKEN;

// Serve static files from the "frontend" directory
app.use(express.static(path.resolve(path.dirname(import.meta.url), 'frontend')));

app.get('/search', async (req, res) => {
  const query = req.query.query;
  const url = `https://cloud.iexapis.com/stable/ref-data/symbols?token=${IEX_TOKEN}`;
  // Perform other necessary logic such as filtering based on query

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
