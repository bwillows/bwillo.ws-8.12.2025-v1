import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { exists_post, get_post } from './private/posts.js';
import { generate_post } from './template/post.js';

const router = express.Router();

// Setup __filename and __dirname for ESM in this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get(['/', "/index", "/index.html", "/feed", "feed.html"], (req, res) => {
  let template_data = {
  };

  const filePath = path.join(__dirname, 'public', 'pages', 'feed.ejs');

  fs.readFile(filePath, 'utf8', (err, template) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error loading page');
    }

    const html = ejs.render(template, template_data);
    res.send(html);
  });
});

router.get(['/gallery', "/gallery.html", "/images", "/images.html"], (req, res) => {
  let template_data = {
  };

  const filePath = path.join(__dirname, 'public', 'pages', 'gallery.ejs');

  fs.readFile(filePath, 'utf8', (err, template) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error loading page');
    }

    const html = ejs.render(template, template_data);
    res.send(html);
  });
});

router.get(["/post/:postID"], (req, res, next) => {
  let postID = req.params.postID;
  if(!exists_post(postID)) {
    res.redirect("/");
    return;
  }

  let template_data = {
  };

  const filePath = path.join(__dirname, 'public', 'pages', 'post.ejs');

  fs.readFile(filePath, 'utf8', (err, template) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error loading page');
    }

    const html = ejs.render(template, template_data);
    res.send(html);
  });
});

router.get(['/components/post/:postID'], (req, res) => {
  let postID = req.params.postID;
  if(!exists_post(postID)) {
    return res.status(500).send("Invalid post ID");
  }

  let userID;
  let token;

  // validate user

  res.send(generate_post(postID));
});

router.get(['/login', "/login.html"], (req, res) => {
  res.redirect("/auth/login");
});

router.get(['/signup', "/signup.html"], (req, res) => {
  res.redirect("/auth/signup");
});


router.get(['/auth/login', "/auth/login.html"], (req, res) => {
  let template_data = {

  };

  const filePath = path.join(__dirname, 'public', 'pages', 'auth', 'login.ejs');

  fs.readFile(filePath, 'utf8', (err, template) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error loading page');
    }

    const html = ejs.render(template, template_data);
    res.send(html);
  });
});

router.get(['/auth/signup', "/auth/signup.html"], (req, res) => {
  let template_data = {

  };

  const filePath = path.join(__dirname, 'public', 'pages', 'auth', 'signup.ejs');

  fs.readFile(filePath, 'utf8', (err, template) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error loading page');
    }

    const html = ejs.render(template, template_data);
    res.send(html);
  });
});


export default router;