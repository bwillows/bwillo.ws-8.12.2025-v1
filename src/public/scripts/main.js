import { createElementFromHTML } from './utils.js';
import { navJS } from './components/nav.js';

// Fetch and append to <head>
// added script execution
fetch('/components/head.html')
  .then(response => response.text())
  .then(headHtml => {
    if (!headHtml.trim() || headHtml.toLowerCase().includes('not found')) return;

    const head = document.getElementsByTagName('head')[0];
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headHtml;

    // Append all non-script nodes to head
    [...tempDiv.childNodes].forEach(node => {
      if (node.tagName !== 'SCRIPT') {
        head.appendChild(node);
      }
    });

    // Handle scripts separately to trigger them
    const scripts = tempDiv.querySelectorAll('script');
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      if (oldScript.src) {
        newScript.src = oldScript.src;
        newScript.async = oldScript.async;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      head.appendChild(newScript);
    });
  })
  .catch(err => console.error('Failed to load /components/head:', err));

// Fetch and prepend navbar to <body>
fetch('/components/nav.html')
  .then(response => response.text())
  .then(navHtml => {
    if (!navHtml.trim() || navHtml.toLowerCase().includes('not found')) return;
    document.getElementsByTagName('body')[0].prepend(createElementFromHTML(navHtml));
    navJS();
  })
  .catch(err => console.error('Failed to load /components/nav:', err));

// Fetch and append footer to <body>
fetch('/components/footer.html')
  .then(response => response.text())
  .then(footerHtml => {
    if (!footerHtml.trim() || footerHtml.toLowerCase().includes('not found')) return;
    document.getElementsByTagName('body')[0].append(createElementFromHTML(footerHtml));
  })
  .catch(err => console.error('Failed to load /components/footer:', err));