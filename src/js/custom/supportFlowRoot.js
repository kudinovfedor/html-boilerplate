const supportsCSS = !!((window.CSS && window.CSS.supports) || window.supportsCSS || false);
/**
 * Support display: flow-root
 *
 * @example
 * supportFlowRoot();
 * @author Fedor Kudinov <brothersrabbits@mail.ru>
 */
const supportFlowRoot = () => {

  if (supportsCSS) {

    const html = $('html'), isSupport = CSS.supports('(display: flow-root)');

    if (isSupport) {

      html.addClass('flow-root');

    } else {

      html.addClass('no-flow-root');

    }

  }

};

export default supportFlowRoot;
