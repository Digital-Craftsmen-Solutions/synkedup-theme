function displayCurrency(value) {
  value = parseVal(value, 'currency')

  if (value === null) {
    return ''
  }

  return formatValCurrency(value)
}

function formatValCurrency(value) {
  return formatVal(value, 'currency')
}

function formatVal(value, type) {
  if (value === null || value === undefined) {
    return ''
  }

  if (type == 'currency') {
    return "$" + (isFinite(value) ? value.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : "")
  } else if (type == 'percent') {
    return (isFinite(value) ? value.toFixed(2) : "") + '%';
  } else if (type == 'number') {
    return (isFinite(value) ? value.toFixed(2) : "");
  } else if (type == 'datetime') {
    var d = new Date(value)
    return value ? d.toISOString().split('T')[0] : "";
  } else if (type == 'date') {
    return value || "";
  } else {
    return value;
  }
}

function parseVal (value, type) {
  if (value === undefined || value === null || value == '') {
    return null
  }

  if (type == 'currency' || type == 'percent' || type == 'number') {
    if (isNaN(value)) {
      return Number(value.replace(/[^0-9.-]+/g,""));
    } else {
      return parseFloat(value)
    }
    
  } else {
    return value;
  }
}

function setUrlParam(key, value) {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(key, value);
  window.location.search = urlParams;
}

function getUrlParam(key) {
  var params = new URLSearchParams(window.location.search)
  return params.get(key) 
};

function delay(callback, ms) {
  var timer = 0;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}