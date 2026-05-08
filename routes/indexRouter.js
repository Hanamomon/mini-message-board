const { Router } = require('express');

const indexRouter = Router();
const indexController = require('../controllers/indexController');

indexRouter.get('/', indexController.indexGetMessages);

indexRouter.get('/new', indexController.indexGetNew);

indexRouter.post('/new', indexController.indexPostNewMessage);

indexRouter.get('/:id', indexController.indexGetNewMessage);

module.exports = indexRouter;