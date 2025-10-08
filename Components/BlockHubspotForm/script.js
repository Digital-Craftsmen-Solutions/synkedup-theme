(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function ensureId(el) {
    if (!el.id) el.id = 'hsf-' + Math.random().toString(36).slice(2, 9);
    return el.id;
  }

  function tryCreate(el) {
    if (!el || el.dataset.hsInit === '1') return true;

    const portalId = el.dataset.portalId;
    const formId = el.dataset.formId;
    if (!portalId || !formId) return true; // nothing to do

    if (window.hbspt && window.hbspt.forms && typeof window.hbspt.forms.create === 'function') {
      const targetId = ensureId(el);
      try {
        window.hbspt.forms.create({ portalId, formId, target: '#' + targetId });
        el.dataset.hsInit = '1';
        return true;
      } catch (e) {}
    }
    return false;
  }

  function initAll(context) {
    (context || document).querySelectorAll('.js-hubspotForm').forEach(function (el) {
      if (tryCreate(el)) return;
      var tries = 0;
      var max = 100; // ~5s
      var iv = setInterval(function () {
        if (tryCreate(el) || ++tries >= max) clearInterval(iv);
      }, 50);
    });
  }

  function observe() {
    var obs = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes && m.addedNodes.forEach(function (node) {
          if (node && node.nodeType === 1) {
            if (node.matches && node.matches('.js-hubspotForm')) tryCreate(node);
            else initAll(node);
          }
        });
      });
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  ready(function () { initAll(document); observe(); });
})();
