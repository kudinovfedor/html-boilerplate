'use strict';

(() => {
  const createTagLink = (href) => {
    let link = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';
    //link.type = 'text/css';
    link.media = 'all';
    document.getElementsByTagName('head')[0].appendChild(link);
  };

  const createTagScript = (src) => {
    let script = document.createElement('script');
    //script.type = 'text/javascript';
    script.src = src;
    //script.async = true;
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  const createTagStyle = (text) => {
    let style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = text;
    document.getElementsByTagName('head')[0].appendChild(style);
  };

  /**
   * localStorageCSS
   * @param {string} src - url to css
   */
  const loadLocalStorageCSS = (src) => {
    try {
      if (localStorage.critical) {
        createTagStyle(localStorage.critical);
      } else {
        let xhr = new XMLHttpRequest();
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

  loadLocalStorageCSS('css/critical.min.css');

})();