import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootPath = process.cwd();

export let posts;

let posts_sorted = new Array();
let posts_timestamp_sorted = new Array();
let posts_pinned = new Array();


export function load_all_posts() {
  posts = JSON.parse(fs.readFileSync(path.join(rootPath, "data", "posts.json")));
  let intermediate_posts_sorted = new Array();

  for(let post_key in posts) {
    let post_obj = posts[post_key];
    post_obj.id = post_key;
    if(post_obj.pinned != undefined && post_obj.pinned != null && post_obj.pinned == true) {
      posts_pinned.push(post_key);
    }
    intermediate_posts_sorted.push(post_obj);
  }
  intermediate_posts_sorted.sort((a, b) => b.created - a.created);
  for(let post_obj of intermediate_posts_sorted) {
    posts_timestamp_sorted.push(post_obj.id);
  }
  for(let pinned_post_ID of posts_pinned) {
    posts_sorted.push(pinned_post_ID);
  }
  for(let postID of posts_timestamp_sorted) {
    if(posts[postID].pinned != undefined && posts[postID].pinned == true) {
      // skip ( already added )
    } else {  
      posts_sorted.push(postID);
    }
  }
}

export function save_all_posts() {
  
}

export function get_post(postID) {
  if(posts == null || posts == undefined) {
    load_all_posts();
  }
  return posts[postID];
}

export function exists_post(postID) {
  if(posts == null || posts == undefined) {
    load_all_posts();
  }
  if(!(posts[postID] == undefined || posts[postID] == null)) {
    return posts[postID];
  }
  return null;
}

export function get_sorted_posts_block(start, length) {
  if(posts == null || posts == undefined) {
    load_all_posts();
  }
  return posts_sorted.slice(start, start + length);  
}

export function get_pinned_posts() {
  if(posts == null || posts == undefined) {
    load_all_posts();
  }
  return posts_pinned;
}

export function validate_postID_format(str) {
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

export function get_posts_length() {
  if(posts == null || posts == undefined) {
    load_all_posts();
  }
  return posts_sorted.length;
}