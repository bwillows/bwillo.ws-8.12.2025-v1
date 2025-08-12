import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { get_pinned_posts, get_post, get_sorted_posts_block, validate_postID_format } from '../private/posts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, "public");

const rootPath = process.cwd();

const router = express.Router();

// query individual post object
router.get(['/post/:postID'], (req, res) => {
  let postID = req.params.postID;

  if(postID && postID != undefined && postID != null) {
      if(validate_postID_format(postID)) {
        let return_post_obj = get_post(postID);

        // TODO: strip private information

        res.json(return_post_obj);
      }
  }
});

/*

query post block

param "start" = start index
param "length" = block size

returns array of timestamp sorted post IDs

*/
router.get(['/posts'], (req, res) => {
  let start = req.query.start;
  let length = req.query.length;
  

  let result = new Array();

  if(start && start != undefined && start != null && length && length != undefined && length != null) {
    res.json(get_sorted_posts_block(start, length));
  } else {
    res.send(JSON.stringify(result));
  }
});

router.get(['/posts/pinned'], (req, res) => {
  res.json(get_pinned_posts());
});

export default router;