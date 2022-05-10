import express from 'express';
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const { EXPRESS_PORT } = process.env;

const app = express();

// Small in-memory cache
const cacheMap = new Map();

app.get('/users', (req, res) => {
  if (!req.query.q) { // TODO: throw error here and add error catching
    res.status(422);
    return res.json({ errorMessage: "Need a query to search", errorCode: 'NO_QUERY' });
  }
  const dataFromCache = cacheMap.get(req.query.q);
  if (dataFromCache) {
    return res.json(dataFromCache);
  }
  axios.get('https://api.github.com/search/users',  { params: { q: req.query.q } })
    .then(githubRes => {
      cacheMap.set(req.query.q, githubRes.data);
      res.json(githubRes.data);
    })
});

app.listen(EXPRESS_PORT, () => {
  console.log(`server started at http://localhost:${EXPRESS_PORT}`);
});
