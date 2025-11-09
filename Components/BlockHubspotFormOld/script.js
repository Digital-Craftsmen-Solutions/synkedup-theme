export default function (el) {
  
  function init() {
    var containers = document.querySelectorAll('.js-hubspotForm');
    for (var i = 0; i < containers.length; i++) {
      setupContainer(containers[i]);
    }
  }

  function setupContainer(container) {
    if (!container || container.dataset.hsInit === '1') return;

    var portalId = container.getAttribute('data-portal-id');
    var formId = container.getAttribute('data-form-id');
    if (!portalId || !formId) return;
    if (!window.hbspt || !window.hbspt.forms) return;

    ensureId(container);

    var formOptions = {
      portalId: portalId,
      formId: formId,
      target: '#' + container.id,
      onFormReady: function ($form) {
        var formElement = $form && $form.get ? $form.get(0) : container.querySelector('form');
        attachSubmitInterceptor(container, formElement);
      }
    };

    if (container.hasAttribute('data-raw')) {
      formOptions.css = `
    .hs-form-field label {
      display: none;
    }
  `;
    }

    try {
      window.hbspt.forms.create(formOptions);
      container.dataset.hsInit = '1';
    } catch (e) {
      // Fail silently – HubSpot script might not be ready yet
    }
  }

  function ensureId(el) {
    if (!el.id) {
      el.id = 'hsf-' + Math.random().toString(36).slice(2, 9);
    }
  }

  function attachSubmitInterceptor(container, form) {
    if (!form || form.dataset.hsIntercept === '1') return;
    form.dataset.hsIntercept = '1';

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      var formData = new FormData(form);
      var action = form.getAttribute('action');
      if (!action) return;

      // Submit via fetch, then evaluate redirect rules
      fetch(action, { method: 'POST', body: formData })
        .then(function (response) { return response.text().then(function () { return response.ok; }); })
        .then(function (ok) {
          if (ok) {
            handleRedirect(container, formData);
          }
        })
        .catch(function () { /* swallow network errors silently */ });
    }, true); // capture to override HubSpot default
  }

  function handleRedirect(container, formData) {
    var values = formDataToObject(formData);
    var destination = findMatchingRedirect(container, values);
    if (!destination) return;

    var params = collectRedirectParams(values);
    var finalUrl = buildUrl(destination, params);
    window.location.href = finalUrl;
  }

  function formDataToObject(fd) {
    var out = {};
    fd.forEach(function (value, key) {
      if (!(key in out)) {
        out[key] = value;
      }
    });
    return out;
  }

  function findMatchingRedirect(container, values) {
    var raw = container.getAttribute('data-redirect-rules');
    if (!raw) return null;

    var rules;
    try {
      rules = JSON.parse(raw);
    } catch (e) {
      return null;
    }
    if (!Array.isArray(rules)) return null;

    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i] || {};
      var field = (rule.field || 'email').trim();
      var matchValue = (rule.value || '').toString().trim();
      var url = (rule.url || '').trim();
      if (!field || !matchValue || !url) continue;

      var submitted = (values[field] || '').toString().trim();
      if (submitted && (matchValue === '*' || submitted.toLowerCase() === matchValue.toLowerCase())) {
        return url;
      }
    }
    return null;
  }

  function collectRedirectParams(values) {
    // Start with UTM params from current page
    var params = getUtmParams();

    // Add all form values (stripped) except hs_context
    Object.keys(values).forEach(function (key) {
      if (key === 'hs_context') return;
      var value = values[key];
      if (value == null || value === '') return;
      params[key] = value;
    });

    return params;
  }

  function getUtmParams() {
    var out = {};
    var qs = new URLSearchParams(window.location.search);
    qs.forEach(function (value, key) {
      if (/^utm_/i.test(key) && value) {
        out[key] = value;
      }
    });
    return out;
  }

  function buildUrl(base, params) {
    try {
      var url = new URL(base, window.location.origin);
      Object.keys(params || {}).forEach(function (key) {
        var value = params[key];
        if (value != null && value !== '') {
          url.searchParams.set(key, value);
        }
      });
      return url.toString();
    } catch (e) {
      return base; // Fallback if URL constructor fails
    }
  }

  init()
}
