import { post_fetch, post_generate_wrapper, post_initialize } from '../components/post.js';
import { createElementFromHTML } from '../utils.js';

const parent_element = document.querySelector("main").querySelector(".inner");

const url = new URL(window.location.href);

// Extract postID from the pathname
// "/post/12345" → ["", "post", "12345"]
const pathParts = url.pathname.split('/');
const postID = pathParts[2];

let post_wrapper_html = post_generate_wrapper(postID);  

let post_wrapper_element = parent_element.appendChild(post_wrapper_html);

post_fetch(postID)
  .then(post_html => {
    let post_element = createElementFromHTML(post_html);
    post_wrapper_element.appendChild(post_element);
    post_initialize(postID);
  });