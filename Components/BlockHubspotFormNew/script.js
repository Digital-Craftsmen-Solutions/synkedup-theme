export default function (el) {
  // New HubSpot (Forms V4) redirect handler
  // Listens for the HubSpot global success event, extracts submitted field values,
  // normalizes field names (removes numeric prefixes like 0-1/), applies redirect rules,
  // and builds a redirect URL including UTM params + all submitted fields.

  window.addEventListener('hs-form-event:on-submission:success', function (event) {
    var detail = (event && event.detail) || {};
    var portalId = detail.portalId || '21666517';
    var formId = detail.formId;
    if (!formId) return;

    var container = document.querySelector(
      '.hs-form-html[data-form-id="' + formId + '"][data-portal-id="' + portalId + '"]'
    );
    if (!container) return;

    fetchSubmittedValues(event).then(function (rawValues) {
      var normalized = normalizeKeys(rawValues || {});  // contains both original + stripped keys
      var strippedOnly = toStrippedKeyMap(normalized);  // final map with stripped keys only
      var destination = findMatchingRedirect(container, strippedOnly);
      if (!destination) return;
      var params = mergeParamsWithUtms(strippedOnly);
      window.location.href = buildUrl(destination, params);
    });
  });

  // Retrieve submitted values using HubSpot Forms V4 API helpers.
  function fetchSubmittedValues(evt) {
    return new Promise(function (resolve) {
      try {
        if (window.HubSpotFormsV4 && typeof HubSpotFormsV4.getFormFromEvent === 'function') {
          return HubSpotFormsV4.getFormFromEvent(evt)
            .getFormFieldValues()
            .then(arrayToObject)
            .then(resolve)
            .catch(function () { resolve({}); });
        }
        if (window.HubSpotFormsV4 && typeof HubSpotFormsV4.getForms === 'function') {
          var forms = HubSpotFormsV4.getForms();
          if (forms && forms[0] && typeof forms[0].getFormFieldValues === 'function') {
            return forms[0]
              .getFormFieldValues()
              .then(arrayToObject)
              .then(resolve)
              .catch(function () { resolve({}); });
          }
        }
      } catch (e) {
        // ignore
      }
      resolve({});
    });
  }

  // Convert HubSpot value array [{name,value}, ...] to object.
  function arrayToObject(arr) {
    if (!Array.isArray(arr)) return arr || {};
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i] || {};
      var k = item.name;
      if (!k) continue;
      obj[k] = item.value;
    }
    return obj;
  }

  // Keep original keys + add stripped version (0-1/firstname -> firstname).
  function normalizeKeys(map) {
    var out = {};
    Object.keys(map).forEach(function (k) {
      out[k] = map[k];
      var stripped = stripPrefix(k);
      if (!(stripped in out)) out[stripped] = map[k];
    });
    return out;
  }

  // Create a final map with only stripped keys, skipping empties and hs_context.
  function toStrippedKeyMap(map) {
    var out = {};
    Object.keys(map).forEach(function (k) {
      var val = map[k];
      if (val == null || val === '' || k === 'hs_context') return;
      if (Array.isArray(val)) val = val.join(',');
      var stripped = stripPrefix(k);
      if (stripped === 'hs_context') return;
      out[stripped] = val;
    });
    return out;
  }

  function stripPrefix(key) {
    return typeof key === 'string' ? key.replace(/^\d+-\d+\//, '') : key;
  }

  function findMatchingRedirect(container, values) {
    var raw = container.getAttribute('data-redirect-rules');
    if (!raw) return null;
    var rules;
    try { rules = JSON.parse(raw); } catch (e) { return null; }
    if (!Array.isArray(rules)) return null;

    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i] || {};
      var field = (rule.field || 'email').trim();
      var matchValue = (rule.value || '').toString().trim();
      var url = (rule.url || '').trim();
      if (!field || !matchValue || !url) continue;
      var submitted = (values[field] || '').toString().trim();
      if (submitted && submitted.toLowerCase() === matchValue.toLowerCase()) return url;
    }
    return null;
  }

  function mergeParamsWithUtms(values) {
    var params = getUtmParams();
    Object.keys(values).forEach(function (k) {
      var v = values[k];
      if (v != null && v !== '') params[k] = v;
    });
    return params;
  }

  function getUtmParams() {
    var out = {};
    var qs = new URLSearchParams(window.location.search);
    qs.forEach(function (value, key) {
      if (/^utm_/i.test(key) && value) out[key] = value;
    });
    return out;
  }

  function buildUrl(base, params) {
    try {
      var url = new URL(base, window.location.origin);
      Object.keys(params || {}).forEach(function (k) {
        var v = params[k];
        if (v != null && v !== '') url.searchParams.set(k, v);
      });
      return url.toString();
    } catch (e) {
      return base;
    }
  }
}
