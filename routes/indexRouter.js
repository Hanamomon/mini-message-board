const { Router } = require('express');

const indexRouter = Router();

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

indexRouter.get('/', (req, res) => {
  res.render('index', { messages: messages });
});

indexRouter.get('/new', (req, res) => {
  res.render('form');
})

indexRouter.post('/new', (req, res) => {
  const messageText = req.body.message;
  const messageAuthor = req.body.author;

  messages.push({ id: messages.length + 1 ,text: messageText, user: messageAuthor, added: new Date() });

  res.redirect("/");
})

indexRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const message = messages.find(message => message.id === id);
  res.render('post', { message: message });
})

module.exports = indexRouter;