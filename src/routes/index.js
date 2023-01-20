const express = require('express');
const router = express.Router();

const usersRouter = require('./users.routes');
router.use('/users', usersRouter);

// const ordersRouter = require('./orders.routes');
// router.use('/orders', ordersRouter);

module.exports = router;