export function media_thumbnail_generate_wrapper(mediaID) {
  let media_thumbnail_wrapper = document.createElement("div");
  media_thumbnail_wrapper.setAttribute("id", "media-thumbnail-wrapper-" + mediaID);
  media_thumbnail_wrapper.classList.add("media-thumbnail-wrapper");
  media_thumbnail_wrapper.classList.add("clearfix");
  return media_thumbnail_wrapper;
}

export async function media_thumbnail_fetch(mediaID) {
  let res = await fetch("/components/media-thumbnail/" + mediaID);
  let media_thumbnail_html = await res.text(); // or response.json() if it's JSON
  return media_thumbnail_html;
}

export async function media_thumbnail_initialize(mediaID) {
  
}