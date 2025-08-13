import { media_thumbnail_generate_wrapper, media_thumbnail_initialize, media_thumbnail_fetch } from '../components/media-thumbnail.js';
import { createElementFromHTML } from '../utils.js';

const gallery_element = document.querySelector("#gallery");

let total_inserted_thumbnails = 0;
let last_inserted_media_thumbnail_ID;

let sorted_media_IDs = await fetch("/api/media?start=0&length=all");
sorted_media_IDs = await sorted_media_IDs.json();

for(let i in sorted_media_IDs) {
  let mediaID = sorted_media_IDs[i];

  let media_thumbnail_wrapper_html = media_thumbnail_generate_wrapper(mediaID);  

  let media_thumbnail_wrapper_element = gallery_element.appendChild(media_thumbnail_wrapper_html);

  media_thumbnail_fetch(mediaID)
    .then(media_thumbnail_html => {
      let media_thumbnail_element = createElementFromHTML(media_thumbnail_html);
      media_thumbnail_wrapper_element.appendChild(media_thumbnail_element);
      media_thumbnail_initialize(mediaID);
    });
}