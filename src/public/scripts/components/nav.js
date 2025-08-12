let nav_element;

export function navJS() {
  if(nav_element == null || nav_element == undefined) {
    nav_element = document.querySelector("#nav");
  }

  nav_element.querySelector("#nav-link-feed").addEventListener("click", () => {
    window.location.href = "/";
  });
  nav_element.querySelector("#nav-link-gallery").addEventListener("click", () => {
    window.location.href = "/gallery";
  });
  nav_element.querySelector("#nav-link-back").addEventListener("click", () => {
    window.location.href = "/";
  });

  if(document.body.hasAttribute("data-page")) {
    if(document.body.getAttribute("data-page") == "gallery" || document.body.getAttribute("data-page") == "feed") {
      nav_element.querySelector(".inner").classList.remove("hidden");
      nav_element.querySelector("#nav-pagegroup-feed-gallery").classList.remove("hidden");
      if(document.body.getAttribute("data-page") == "feed") {
        nav_element.querySelector("#nav-pagegroup-feed-gallery").querySelector("#nav-link-feed").classList.add("active");
      }
      if(document.body.getAttribute("data-page") == "gallery") {
        nav_element.querySelector("#nav-pagegroup-feed-gallery").querySelector("#nav-link-gallery").classList.add("active");
      }
    }
    if(document.body.getAttribute("data-page") == "login" || document.body.getAttribute("data-page") == "signup" || document.body.getAttribute("data-page") == "post") {
      nav_element.querySelector(".inner").classList.remove("hidden");
      
      nav_element.querySelector("#nav-pagegroup-login-signup-post").classList.remove("hidden");
    }

  }
  
  
  // needs to be at the very end of applying nav data/transformations
  //document.querySelector("main").style.paddingTop = window.getComputedStyle(nav_element).height;

  //const navHeight = parseInt(window.getComputedStyle(nav_element).height, 10);
  //document.querySelector("main").style.paddingTop = (navHeight + 16) + "px";
}