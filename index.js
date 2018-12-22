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
  const name = req.body;
  console.log('name info', name)
  db('zoos').insert(name)
      .then(ids => {
          res.status(201).json(ids);
      })
      .catch(err => {
          res.status(500).json({
              err: 'Failed to insert name'
          });
      });
});

server.get('/api/zoos', (req, res) => {
  db('zoos').then(rows => {
    res.json(rows);
  }).catch(err => {
    res.status(500).json({ err: 'Failed to get names' })
  });
});




server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
