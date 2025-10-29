export default function (el) {
  function buildUrl(base) {
    try {
      var u = new URL(base, window.location.origin);
      u.searchParams.set('hide_event_type_details', '1');
      u.searchParams.set('hide_gdpr_banner', '1');
      u.searchParams.set('text_color', '1d0000');
      u.searchParams.set('primary_color', 'ff5c35');
      return u.toString();
    } catch (e) {
      return base + (base.indexOf('?') === -1 ? '?' : '&') + 'hide_event_type_details=1&hide_gdpr_banner=1&text_color=1d0000&primary_color=ff5c35';
    }
  }

  function getPrefill() {
    var q = new URLSearchParams(window.location.search);
    var obj = {};
    q.forEach(function (v, k) {
      if (v == null || v === '') return;
      // Transform keys for Calendly compatibility
      if (k === 'firstname') k = 'firstName';
      if (k === 'lastname') k = 'lastName';
      // If duplicate keys exist, last one wins
      obj[k] = v;
    });
    return obj;
  }

  function hasCalendly() {
    return !!(window.Calendly && typeof window.Calendly.initInlineWidget === 'function');
  }

  function initCalendlyWidget(el) {
    if (!el || el.dataset.calInit === '1') return;
    var url = el.getAttribute('data-url');
    if (!url || !hasCalendly()) return;
    var allow = el.dataset.allowPrefill !== '0';
    var prefill = getPrefill();
    try {
      Calendly.initInlineWidget({
        url: buildUrl(url),
        parentElement: el,
        prefill: allow ? prefill : undefined
      });
      el.dataset.calInit = '1';
    } catch (e) {}
  }

  function init() {
    var containers = document.querySelectorAll('.calendly-container, #calendly-container');
    if (!containers.length || !hasCalendly()) return;
    
    containers.forEach(function(container) {
      initCalendlyWidget(container);
    });
  }

  function initWhenReady() {
    if (!hasCalendly()) {
      var tries = 0, max = 100; // ~5s
      var iv = setInterval(function () {
        tries++;
        if (hasCalendly()) {
          clearInterval(iv);
          init();
        } else if (tries >= max) {
          clearInterval(iv);
        }
      }, 50);
    } else {
      init();
    }
  }

  if (document.readyState === 'complete') initWhenReady();
  else window.addEventListener('load', initWhenReady);
}
