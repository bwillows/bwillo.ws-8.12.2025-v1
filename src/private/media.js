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

let media_timestamp_sorted = new Array();

export function load_all_media_data() {
  media_data = JSON.parse(fs.readFileSync(path.join(rootPath, "data", "media.json")));
  for(let media_ID in media_data) {
    media_timestamp_sorted.push(media_ID);
  }
  media_timestamp_sorted.sort((a, b) => media_data[b].created - media_data[a].created);
  /* b.created - a.created */
}

export function save_all_media_data() {

}

export function get_media_data(mediaID) {
  if(media_data == null || media_data == undefined) {
    load_all_media_data();
  }
  return media_data[mediaID];
}

export function validate_mediaID_format(str) {
  if (typeof str !== "string" || str.length !== 7) return false;
  
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    const isNumber = code >= 48 && code <= 57;        // 0-9
    const isUpper  = code >= 65 && code <= 90;        // A-Z
    const isLower  = code >= 97 && code <= 122;       // a-z
    
    if (!isNumber && !isUpper && !isLower) {
      return false;
    }
  }
  return true;
}

export function get_media_length() {
  if(media_data == null || media_data == undefined) {
    load_all_media_data();
  }
  return media_timestamp_sorted.length;
}

export function get_sorted_media_block(start, length) {
  if(media_data == null || media_data == undefined) {
    load_all_media_data();
  }
  return media_timestamp_sorted.slice(start, start + length);  
}


export function exists_media(mediaID) {
  if(media_data == null || media_data == undefined) {
    load_all_media_data();
  }
  if(!(media_data[mediaID] == undefined || media_data[mediaID] == null)) {
    return media_data[mediaID];
  }
  return null;
}