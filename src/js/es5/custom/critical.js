'use strict';

(function () {
  var createTagLink = function createTagLink(href) {
    var link = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';
    //link.type = 'text/css';
    link.media = 'all';
    document.getElementsByTagName('head')[0].appendChild(link);
  };

  var createTagScript = function createTagScript(src) {
    var script = document.createElement('script');
    //script.type = 'text/javascript';
    script.src = src;
    //script.async = true;
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  var createTagStyle = function createTagStyle(text) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = text;
    document.getElementsByTagName('head')[0].appendChild(style);
  };

  /**
   * localStorageCSS
   * @param {string} src - url to css
   */
  var loadLocalStorageCSS = function loadLocalStorageCSS(src) {
    try {
      if (localStorage.critical) {
        createTagStyle(localStorage.critical);
      } else {
        var xhr = new XMLHttpRequest();
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