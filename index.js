const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

const port = 3300;


// ZOO PUT REQUEST
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

//GET ZOO NAMES

server.get('/api/zoos', (req, res) => {
  db('zoos').then(rows => {
    res.json(rows);
  }).catch(err => {
    res.status(500).json({ err: 'Failed to get names' })
  });
});

//GET ZOO NAMES BY ID
server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos').where('id', id)
    .then(rows => {
      res.json(rows);
    }).catch(err => {
      res.status(500),json({err: 'Failed to find zoo names'})
  })
})

// UPDATE ZOO NAME]
server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const name = req.body;
  db('zoos').where('id', id).update(name)
    .then(rows => {
    res.status(201).json({message: 'Update Successful'})
    }).catch(err => {
    res.status(500).json({err: "Failed to update name"})
  })
})

//DELETE ZOO BY ID
server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const name = req.body;
  db('zoos').where('id', id).delete(name)
    .then(rows => {
      res.json(rows);
    }).catch(err => {
      res.status(201).json({ err: 'Failed to delete zoo' })
    });
});


server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
