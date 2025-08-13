import { post_fetch, post_generate_wrapper, post_initialize } from '../components/post.js';
import { createElementFromHTML } from '../utils.js';

const feed_element = document.querySelector("#feed");

let total_inserted_posts = 0;
let last_inserted_post_ID;

let sorted_post_IDs = await fetch("/api/posts?start=0&length=all");
sorted_post_IDs = await sorted_post_IDs.json();

for(let i in sorted_post_IDs) {
  let postID = sorted_post_IDs[i];

  let post_wrapper_html = post_generate_wrapper(postID);  

  let post_wrapper_element = feed_element.appendChild(post_wrapper_html);

  post_fetch(postID)
    .then(post_html => {
      let post_element = createElementFromHTML(post_html);
      post_wrapper_element.appendChild(post_element);
      post_initialize(postID);
    });
}

/*

async function insert_post(postID) {
  let post_element = await post_create(postID);
  post_element = createElementFromHTML(post_element);
  feed_element.appendChild(post_element);
  post_init(postID);
  total_inserted_posts++;
  last_inserted_post_ID = postID;
}

let all_posts = new Array();

// all pinned posts load at page load
let pinned_posts = new Array();
// next 5 posts load at page load
let initial_posts = new Array();

let pinned_posts_response = await fetch("/api/posts/pinned");
pinned_posts = await pinned_posts_response.json();
for(let pinned_post_ID of pinned_posts) {
  insert_post(pinned_post_ID);
}

let initial_posts_response = await fetch("/api/posts?start=0&length=10");
initial_posts = await initial_posts_response.json();
for(let initial_post_ID of initial_posts) {
  insert_post(initial_post_ID);
}
insert_index += 10;

window.addEventListener("scroll", () => {
  if(last_inserted_post_ID) {
    let last_inserted_post = document.querySelector("#post-" + last_inserted_post_ID);

    let rect = last_inserted_post.getBoundingClientRect();

    // distance from bottom of viewport to top of element:
    let distance_from_bottom = rect.top - window.innerHeight;

    console.log(distance_from_bottom);
  }
});
*/