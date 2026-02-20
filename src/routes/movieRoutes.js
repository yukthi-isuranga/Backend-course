import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'List of movies......' });
});

router.get('/yukthi', (req, res) => {
  res.json({ message: 'GET Yukthi Isuranga' });
});

router.put('/yukthi', (req, res) => {
  res.json({ message: 'PUT Yukthi Isuranga' });
});

export default router;
