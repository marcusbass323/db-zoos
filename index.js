const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

const port = 3300;

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  console.log('zoo info', zoo)
  db('zoo').insert(zoo)
      .then(ids => {
          res.status(201).json(ids);
      })
      .catch(err => {
          res.status(500).json({
              err: 'Failed to insert zoo'
          });
      });
});



server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
