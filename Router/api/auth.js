const express = require('express');
const router = express.Router();




router.get('/', (req,res)=> res.send('user auth'));

module.exports = router;