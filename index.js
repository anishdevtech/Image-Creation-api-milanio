const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const dotenv = require('dotenv');
const canvafy = require('canvafy'); // Import the canvafy library
const { WelcomeLeave } = canvafy; // Destructure WelcomeLeave from canvafy

dotenv.config();

const app = express();
const port = 3000;

// Middleware to check password in header
const checkPassword = (req, res, next) => {
  const password = req.headers['x-password'];
  if (password === process.env.PASSWORD) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

app.get('/generate-image', checkPassword, async (req, res) => {
  // Use canvafy to generate the image
  const welcome = await new WelcomeLeave()
    .setAvatar(req.query.avatar)
    .setBackground("image", req.query.background)
    .setTitle(req.query.title)
    .setDescription(req.query.description)
    .setBorder(req.query.border)
    .setAvatarBorder(req.query.border)
    .setOverlayOpacity(0.3)
    .build();

  // Send the generated image
  res.set('Content-Type', 'image/png');
  res.send(welcome);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
