const express = require('express');
const { createCanvas, loadImage } = require('canvas');

const app = express();
const port = 3000;

app.get('/generate-image', (req, res) => {
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext('2d');

  // Example: drawing a red rectangle
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Example: drawing text
  ctx.fillStyle = 'white';
  ctx.font = '30px Arial';
  ctx.fillText('Hello, World!', 50, 100);

  // Convert canvas to image and send it in the response
  res.set('Content-Type', 'image/png');
  canvas.createPNGStream().pipe(res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
