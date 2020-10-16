const router = require('express').Router();
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');
const config = require('../api/config');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, config.bcryptSalt);
  db('users')
  .insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.post('/login', (req, res) => {
  db('users')
  .where('username', '=', req.body.username)
  .then(user => {
    if(!user.length) {
      return res.status(400).json({ message: 'Invalid login credentials.' });
    }

    if(!bcrypt.compareSync(req.body.password, user[0].password)) {
      return res.status(400).json({ message: 'Invalid login credentials.' });
    }

    const token = jwt.sign(user[0], config.jwtSecret, { expiresIn: '1h' });

    res.status(202).json({ token });
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;
