import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { exists_post, get_post } from '../private/posts.js';
import { formatTimestamp, formatTimestampExpanded, formatTimestampWithTimezoneExpanded, toDate } from '../public/scripts/utils.js'
import { get_media_data } from '../private/media.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define public and pages paths relative to /src
const publicPath = path.join(__dirname, "public");

const rootPath = process.cwd();

export function generate_post(postID, userID) {
  if(!exists_post(postID)) {
    return null;
  }

  let post_obj = get_post(postID);

  let template_data = {
    postID: postID,
    pinned: post_obj.pinned,
    created: {
      timestamp: post_obj.created,
      date: toDate(post_obj.created),
      formatted: formatTimestamp(post_obj.created),
      formatted_expanded: formatTimestampWithTimezoneExpanded(post_obj.created, "America/Los_Angeles")
    }
  }

  if(post_obj.visibility == "public") {
    template_data.body = generate_content(postID, post_obj);
  } else if(post_obj.visibility == "paid") {
    if(userID) {
      template_data.body = generate_paywall(postID, post_obj);
    } else {
      template_data.body = generate_loginwall(postID, post_obj);
    }
  } else if(post_obj.visibility == "user") {
    template_data.body = generate_loginwall(postID, post_obj);
  }

  let post_template = fs.readFileSync(path.join(rootPath, "src", "public", "components", "post", "primary.ejs"), 'utf8');

  let post_html = ejs.render(post_template, template_data);

  return post_html;
}

function generate_content(postID, post_obj) {
  let content_template_data = new Object();

  if (post_obj.media && Array.isArray(post_obj.media) && post_obj.media.length >= 1) {
    // post_obj.media is defined, not null, and has at least one item
    if(content_template_data.media == null || content_template_data.media == undefined) {
      content_template_data.media = new Array();
    }
    for(let media_element_ID of post_obj.media) {
      let media_object = get_media_data(media_element_ID);

      let media_element_template_data_obj = {
        id: media_element_ID,
      }

      if(media_object != undefined && media_object != null) {
        media_element_template_data_obj.type = media_object.type;
      }

      let media_element_data = get_media_data(media_element_ID);

      content_template_data.media.push(media_element_template_data_obj);

    }
  }
  if(post_obj.text != null && post_obj.text != undefined) {
    if (typeof post_obj.text.content === 'string' && post_obj.text.content.length >= 1) {
      // post_obj.text is a non-empty string
      content_template_data.text = new Object();
      content_template_data.text.raw = post_obj.text.content;

      // TODO: parse text? if/as needed? support formatting/styles embedded directly in text content?
      content_template_data.text.full = post_obj.text.content;

      if(post_obj.text.content.length > 180 && (post_obj.text.show_snippet == true || (post_obj.text.show_snippet == null || post_obj.text.show_snippet == undefined))) {
        content_template_data.text.snippet = post_obj.text.content.trim().substring(0, 180);
      }
    }
  }

  let content_template = fs.readFileSync(path.join(rootPath, "src", "public", "components", "post", "body", "content.ejs"), 'utf8');
  return ejs.render(content_template, content_template_data);
}

function generate_paywall(postID, post_obj) {
  let paywall_template_data = {

  }
  let paywall_template = fs.readFileSync(path.join(rootPath, "src", "public", "components", "post", "body", "paywall.ejs"), 'utf8');
  return ejs.render(paywall_template, paywall_template_data);
}

function generate_loginwall(postID, post_obj) {
  let loginwall_template_data = {

    }
    let loginwall_template = fs.readFileSync(path.join(rootPath, "src", "public", "components", "post", "body", "loginwall.ejs"), 'utf8');
    return ejs.render(loginwall_template, loginwall_template_data);
}