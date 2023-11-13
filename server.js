const express = require('express');
const next = require('next');
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Use compression middleware
  server.use(compression());

  // Add Expires headers middleware
  server.use((req, res, next) => {
    // Set Expires header to one year in the future (adjust as needed)
    res.header('Expires', new Date(Date.now() + 31536000000).toUTCString());
    next();
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
