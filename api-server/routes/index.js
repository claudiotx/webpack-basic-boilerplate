const express = require ('express');
const router = express.Router();

// API Methods
router.get('/', (req, res, next) => {
  return res.json({number: getRandomInt(1, 1000)});
});

const getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// export default router;
module.exports = router;
