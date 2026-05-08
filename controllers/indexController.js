const db = require('../db/queries');

const { body, param, validationResult, matchedData } = require('express-validator');

const requiredErr = 'is required.';
const alphanumErr = 'must consist of solely alphanumeric characters.';
const authorErr = 'must be between 1 and 10 characters.';
const messageErr = 'must be between 1 and 200 characters.';

const validateId = [
  param('id').trim()
    .exists({ values: "falsy" })
    .isInt(),
]

const validateMessage = [
  body('author').trim()
    .exists({ values: "falsy" }).withMessage(`Author name ${requiredErr}`).bail()
    .isAlphanumeric().withMessage(`Author name ${alphanumErr}`).bail()
    .isLength({ min: 1, max: 10 }).withMessage(`Author name ${authorErr}`),
  body('message').trim()
    .exists({ values: "falsy" }).withMessage(`Message text ${requiredErr}`).bail()
    .isLength({ min: 1, max: 200 }).withMessage(`Message ${messageErr}`),
]

exports.indexGetMessages = async (req, res) => {
  const messages = await db.getAllMessages();
  res.render('index', { messages: messages });
}

exports.indexGetNew = (req, res) => {
  res.render('form');
}

exports.indexPostNewMessage = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('form', {
        errors: errors.array(),
      });
    }
    const { author, message } = matchedData(req);

    await db.insertMessage(message, author);

    res.redirect("/");  
  }
]

exports.indexGetNewMessage = [
  validateId,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.redirect('/');
    }

    const id = req.params.id;
    const message = await db.getMessage(id);
    res.render('post', { message: message });  
  }
]