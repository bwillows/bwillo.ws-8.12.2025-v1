export function post_generate_wrapper(postID) {
  let post_wrapper = document.createElement("div");
  post_wrapper.setAttribute("id", "post-wrapper-" + postID);
  post_wrapper.setAttribute("class", "post-wrapper");
  

  return post_wrapper;
}

// returns a post html element given it's postID
export async function post_fetch(postID) {
  let res = await fetch("/components/post/" + postID);
  let post_html = await res.text(); // or response.json() if it's JSON
  return post_html;
}

// attatches event handlers and creates media sliders for a given post element's associated postID
export function post_initialize(postID) {
  let post_element = document.querySelector("#post-" + postID);

  let post_loginwall = post_element.querySelector(".post-loginwall");
  if(post_loginwall && post_loginwall != undefined && post_loginwall != null) {
    let post_body = post_element.querySelector(".post-body");
    if(post_body && post_body != undefined && post_body != null) {
      post_body.addEventListener("click", () => {
        window.location.href = "/auth/login";
      });
    }
  }
  
  if(document.body.hasAttribute("data-page")) {
    if(document.body.getAttribute("data-page") == "feed") {
      let post_header_left = post_element.querySelector(".post-header-left");
      if(post_header_left && post_header_left != undefined && post_header_left != null) {
        post_header_left.addEventListener("click", () => {
          if(post_loginwall == undefined) {
            window.location.href = "/post/" + postID;
          } else {
            window.location.href = "/auth/login";
          }
        });
      }

      let post_header_center_fill = post_element.querySelector(".post-header-center-fill");
      if(post_header_center_fill && post_header_center_fill != undefined && post_header_center_fill != null) {
        post_header_center_fill.addEventListener("click", () => {
          if(post_loginwall == undefined) {
            window.location.href = "/post/" + postID;
          } else {
            window.location.href = "/auth/login";
          }
        });
      }

      /*
      let post_pin = post_element.querySelector(".post-pin");
      if(post_pin && post_pin != undefined && post_pin != null) {
        post_pin.addEventListener("click", () => {
          if(post_loginwall == undefined) {
            window.location.href = "/post/" + postID;
          } else {
            window.location.href = "/auth/login";
          }
        });
      }
      */

      let post_text = post_element.querySelector(".post-text");
      if(post_text && post_text != undefined && post_text != null) {
        post_text.addEventListener("click", () => {
          window.location.href = "/post/" + postID;
        });
      }
    }
  }

  let post_text_snippet_expand = post_element.querySelector(".post-text-snippet-expand");
  if(post_text_snippet_expand && post_text_snippet_expand != undefined && post_text_snippet_expand != null) {
    post_text_snippet_expand.addEventListener("click", () => {

      post_element.querySelector(".post-text-full").classList.remove("hidden");
      post_element.querySelector(".post-text-snippet").classList.add("hidden");
    });
  }

  let post_loginwall_login_button = post_element.querySelector(".post-loginwall-login-button");
  if(post_loginwall_login_button && post_loginwall_login_button != undefined && post_loginwall_login_button != null) {
      post_loginwall_login_button.addEventListener("click", () => {
      window.location.href = "/auth/login";
    });
  }

  let post_media_element = post_element.querySelector(".post-media");
  if(post_media_element && post_media_element != undefined && post_media_element != null) {
    
    let swiper_slide_elements = post_element.querySelectorAll(".swiper-slide");

    if(swiper_slide_elements.length > 1) {
      var media_swiper = new Swiper(post_element.querySelector(".post-media"), {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        lazy: true,
        navigation: {
          nextEl: post_element.querySelector(".post-media-manual-control-right-hitbox"),
          prevEl: post_element.querySelector(".post-media-manual-control-left-hitbox"),
        },
        on: {
          slideChange: function () {
            if(!post_element.querySelector(".post-media-type-image").classList.contains("hidden")) {
              post_element.querySelector(".post-media-type-image").classList.add("hidden");
            }
            if(!post_element.querySelector(".post-media-type-video").classList.contains("hidden")) {
              post_element.querySelector(".post-media-type-video").classList.add("hidden");
            }

            let new_slide = this.slides[this.activeIndex];

            if(new_slide.classList.contains("media-type-image")) {
              post_element.querySelector(".post-media-type-image").classList.remove("hidden");
            }

            if(new_slide.classList.contains("media-type-video")) {
              post_element.querySelector(".post-media-type-video").classList.remove("hidden");
            }

            post_element.querySelector(".post-media-active-slide").innerText = this.activeIndex + 1;

            // hide right control on maximum
            if(this.activeIndex == this.slides.length - 1) {
              let control_right_hitbox_element = post_element.querySelector(".post-media-manual-control-right-hitbox");
              if(!control_right_hitbox_element.classList.contains("hidden")) {
                control_right_hitbox_element.classList.add("hidden");
              }
            }

            // hide left control on minimum
            if(this.activeIndex == 0) {
              let control_left_hitbox_element = post_element.querySelector(".post-media-manual-control-left-hitbox");
              if(!control_left_hitbox_element.classList.contains("hidden")) {
                control_left_hitbox_element.classList.add("hidden");
              }
            }

            // add left control if not on first slide
            if(this.activeIndex > 0) {
              let control_left_hitbox_element = post_element.querySelector(".post-media-manual-control-left-hitbox");
              if(control_left_hitbox_element.classList.contains("hidden")) {
                control_left_hitbox_element.classList.remove("hidden");
              }
            }

            // add right control if not on maximum
            if(this.activeIndex < this.slides.length - 1) {
              let control_right_hitbox_element = post_element.querySelector(".post-media-manual-control-right-hitbox");
              if(control_right_hitbox_element.classList.contains("hidden")) {
                control_right_hitbox_element.classList.remove("hidden");
              }
            }
          }
        }
      });
    }
  }
}

/*
window.post_expand_text_snippet = post_expand_text_snippet;

function post_expand_text_snippet(element) {
  let text_element = element.closest('.post-text');

  text_element.querySelector(".post-text-full").classList.remove('hidden');
  text_element.querySelector(".post-text-snippet").classList.add('hidden');
}
*/