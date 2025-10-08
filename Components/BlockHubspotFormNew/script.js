(function () {
  // Debug: indicate new HubSpot form (developer embed) script loaded
  window.addEventListener('load', function () {
    try { console.log('[HubSpot] New form (developer embed) loaded'); } catch (_) {}
  });

  // HubSpot global events for developer embed
  window.addEventListener('hs-form-event:on-ready', function (event) {
    try {
      var d = (event && event.detail) || {};
      console.log('[HubSpot] on-ready', { formId: d.formId, instanceId: d.instanceId });
    } catch (_) {}
  });

  window.addEventListener('hs-form-event:on-submission:success', function (event) {
    try {
      var d = (event && event.detail) || {};
      console.log('User successfully submitted the form!', { formId: d.formId, instanceId: d.instanceId });
      // Try to log values from the corresponding form
      var portalId = d.portalId || '21666517';
      var container = document.querySelector('.hs-form-html[data-form-id="' + d.formId + '"][data-portal-id="' + portalId + '"]');
      var form = container ? container.querySelector('form') : null;
      if (form) logForm(form);
    } catch (_) {}
  });

  function logForm(form) {
    var values = {};
    var elements = form && form.elements ? form.elements : [];
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (!el || !el.name) continue;
      if ((el.type === 'checkbox' || el.type === 'radio')) {
        if (!el.checked) continue;
      }
      if (el.tagName === 'SELECT' && el.multiple) {
        var arr = [];
        for (var j = 0; j < el.options.length; j++) {
          if (el.options[j].selected) arr.push(el.options[j].value);
        }
        values[el.name] = arr;
      } else {
        values[el.name] = el.value;
      }
    }
    try { console.log('[HubSpot] Form submit values:', values); } catch (_) {}
  }
})();
