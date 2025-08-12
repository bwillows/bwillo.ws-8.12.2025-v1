import { post_create, post_init } from '../components/post.js';
import { createElementFromHTML } from '../utils.js';

const parent_element = document.querySelector("main").querySelector(".inner");

const url = new URL(window.location.href);

// Extract postID from the pathname
// "/post/12345" → ["", "post", "12345"]
const pathParts = url.pathname.split('/');
const postID = pathParts[2];

let post_element = await post_create(postID);
post_element = createElementFromHTML(post_element);
parent_element.appendChild(post_element);
post_init(postID);