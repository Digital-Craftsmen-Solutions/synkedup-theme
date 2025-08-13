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

function setUrlParam(uri, key, value) {
  var uri = window.location.href
  var i = uri.indexOf('#');
  var hash = i === -1 ? ''  : uri.substr(i);
       uri = i === -1 ? uri : uri.substr(0, i);

  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
      uri = uri.replace(re, '$1' + key + "=" + value + '$2');
  } else {
      uri = uri + separator + key + "=" + value;
  }
  var final = uri + hash
}

function getUrlParam(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
  return false;
};