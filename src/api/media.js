import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { get_media_data, validate_mediaID_format, get_media_length, get_sorted_media_block } from '../private/media.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, "public");

const rootPath = process.cwd();

const router = express.Router();

// query individual media object
router.get(['/media/:mediaID'], (req, res) => {
  let mediaID = req.params.mediaID;

  if(mediaID && mediaID != undefined && mediaID != null) {
      if(validate_mediaID_format(mediaID)) {
        let return_media_obj = get_media_data(mediaID);

        // TODO: strip private information

        res.json(return_media_obj);
      }
  }
});

/*

query media block

param "start" = start index
param "length" = block size

returns array of timestamp sorted mediaIDs

*/
router.get(['/media'], (req, res) => {
  let start = req.query.start;
  let length = req.query.length;

  if(start == undefined || start == null) {
    start = 0;
  }

  if(length == "full" || length == "all" || length == "*") {
    length = get_media_length();
  }

  
  let result = new Array();

  if(start && start != undefined && start != null && length && length != undefined && length != null) {
    res.json(get_sorted_media_block(start, length));
  } else {
    res.send(JSON.stringify(result));
  }
});

export default router;