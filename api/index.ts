const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const dotenv = require('dotenv');
const canvafy = require('canvafy');
const { WelcomeLeave } = canvafy;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.PASSWORD;

// Middleware to check the password in the request headers
const checkPassword = (req, res, next) => {
  const password = req.query.password;
  if (password === PASSWORD) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

app.get('/generate-image', checkPassword, async (req, res) => {
  try {
    const avatarUrl = req.query.avatar;
    const backgroundUrl = req.query.background;
    const title = req.query.title || "Welcome";
    const description = req.query.description || "Welcome to this server, go read the rules please!";
    const borderColor = req.query.border || "#2a2e35";
    const avatarBorderColor = req.query.avatarBorder || "#2a2e35";
    const overlayOpacity = req.query.overlayOpacity || 0.3;

    const welcome = await new WelcomeLeave()
      .setAvatar(avatarUrl)
      .setBackground("image", backgroundUrl)
      .setTitle(title)
      .setDescription(description)
      .setBorder(borderColor)
      .setAvatarBorder(avatarBorderColor)
      .setOverlayOpacity(overlayOpacity)
      .build();

    // Send the generated image
    res.set('Content-Type', 'image/png');
    res.send(welcome);
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
