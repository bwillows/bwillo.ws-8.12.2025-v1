import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { get_media_data } from '../private/media.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define public and pages paths relative to /src
const publicPath = path.join(__dirname, "public");

const rootPath = process.cwd();

export function generate_media_thumbnail(userID, mediaID) {
  let media_obj = get_media_data(mediaID);

  // authenticate 

  let template_data = {
    mediaID: mediaID,
    visibility: media_obj.visibility,
    type: media_obj.type
  }
  
  let media_thumbnail_template = fs.readFileSync(path.join(rootPath, "src", "public", "components", "media-thumbnail.ejs"), 'utf8');
  
  let media_thumbnail_html = ejs.render(media_thumbnail_template, template_data);
  
  return media_thumbnail_html;

}