import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

let users;
let user_emails = new Map();
let user_tokens = new Map();


export function load_all_users() {
  users = JSON.parse(fs.readFileSync(path.join(rootPath, "data", "users.json")));

}

export function save_all_users() {

}

export const query_type = Object.freeze({
  EMAIL: 'email',
  USERNAME: 'username',
  USER_ID: 'userID',
});

export function query_user(query_type, query) {

}