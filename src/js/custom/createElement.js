const d = document;
const head = d.head || d.getElementsByTagName('head')[0];

const createElement = element => d.createElement(element);

export const createTagLink = (href, media = 'all') => {
  const link = createElement('link');
  link.href = href;
  link.rel = 'stylesheet';
  link.media = media;
  head.appendChild(link);
};

export const createTagScript = (src, async = false) => {
  const script = createElement('script');
  script.src = src;
  script.async = async;
  head.appendChild(script);
};

export const createTagStyle = text => {
  const style = createElement('style');
  style.type = 'text/css';
  style.textContent = text;
  head.appendChild(style);
};

/**
 * localStorageCSS
 * @param {string} src - url to css
 */
export const loadLocalStorageCSS = src => {
  try {
    if (localStorage.critical) {
      createTagStyle(localStorage.critical);
    } else {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', src, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          localStorage.critical = xhr.responseText;
          createTagStyle(localStorage.critical);
        }
      };
      xhr.send();
    }
  } catch (ex) {
    console.warn('Error!');
  }
};