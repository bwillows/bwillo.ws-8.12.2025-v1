import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootPath = process.cwd();

let media_data;

export function load_all_media_data() {
  media_data = JSON.parse(fs.readFileSync(path.join(rootPath, "data", "media.json")));
}

export function save_all_media_data() {

}

export function get_media_data(mediaID) {
  if(media_data == null || media_data == undefined) {
    load_all_media_data();
  }
  return media_data[mediaID];
}