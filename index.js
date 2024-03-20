const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const dotenv = require('dotenv');
const canvafy = require('canvafy');
const { WelcomeLeave } = canvafy;

dotenv.config();

const app = express();
const port = 3000;

const checkPassword = (req, res, next) => {
  const password = req.headers['x-password'];
  if (password === process.env.PASSWORD) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/generate-image', checkPassword, async (req, res) => {
  const welcome = await new WelcomeLeave()
    .setAvatar(req.query.avatar)
    .setBackground("image", req.query.background)
    .setTitle(req.query.title)
    .setDescription(req.query.description)
    .setBorder(req.query.border)
    .setAvatarBorder(req.query.border)
    .setOverlayOpacity(0.3)
    .build();

  res.set('Content-Type', 'image/png');
  res.send(welcome);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
