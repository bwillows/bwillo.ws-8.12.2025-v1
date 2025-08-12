import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes.js';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

import api_postsRouter from './api/posts.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(morgan('dev'));

// Setup __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define public and pages paths relative to /src
const publicPath = path.join(__dirname, 'public');
const pagesDir = path.join(publicPath, 'pages');

app.use('/api', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Robots-Tag', 'noindex');
    next();
});
app.use("/api", api_postsRouter);


app.use('/script', (req, res, next) => {
    res.setHeader('Content-Type', 'text/javascript');
    next();
});
app.use('/styles', (req, res, next) => {
    res.setHeader('Content-Type', 'text/css');
    next();
});

// Static file serving from /src/public
app.use(express.static(publicPath)); // root-level public files (index.html, etc.)
app.use('/scripts', express.static(path.join(publicPath, 'scripts')));
app.use('/styles', express.static(path.join(publicPath, 'styles')));
app.use('/assets', express.static(path.join(publicPath, 'assets')));

app.get([
  "/components/head.html",
  "/components/nav.html"
], (req, res) => {

  let file_path = path.join(publicPath, 'components', req.path);
  fs.access(file_path, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.sendFile(file_path);
  });
});

// Attach your routes
app.use('/', routes);

// Handle /pagename and /pagename.html for pages in /src/public/pages
app.get('/:page', (req, res, next) => {
  let requestedPage = req.params.page;

  // Remove .html extension if present
  if (requestedPage.endsWith('.html')) {
    requestedPage = requestedPage.slice(0, -5);
  }

  const filePath = path.join(pagesDir, requestedPage + '.html');

  res.sendFile(filePath, err => {
    if (err) {
      next(); // pass to next middleware (404)
    }
  });
});

// 404 fallback
app.use((req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
