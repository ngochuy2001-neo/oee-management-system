const express = require('express');
const router = express.Router();

const returnPercent = () => {
  const percent = [32, 55, 60, 75, 80, 83, 85, 87, 90, 91, 93, 95, 96, 98, 99];

  return percent[Math.floor(Math.random() * percent.length)];
};

router.get('/', (req, res) => {
  res.send("Everything is ok");
});

router.get('/generaloee', (req, res) => {
  let generalOEEData = {
    availability: returnPercent(),
    performance: returnPercent(),
    quality: returnPercent(),
    workedTime: '2h30',
    producedProduct: Math.floor(Math.random() * 100000),
    productPerMinute: Math.floor(Math.random() * 52)
  };

  res.json(generalOEEData);
});

router.get('/deviceoee/:id', (req, res) => {
  let deviceOEE = {
    availability: returnPercent(),
    performance: returnPercent(),
    quality: returnPercent(),
    workedTime: '1h47',
    producedProduct: Math.floor(Math.random() * 1000),
    productPerMinute: Math.floor(Math.random() * 30)
  };

  res.json(deviceOEE);
});

module.exports = router;