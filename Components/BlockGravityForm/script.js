export default function (el) {
  var UTM_KEYS = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];

  function prefill(scope){
    scope = scope || document;
    var params = new URLSearchParams(window.location.search);
    UTM_KEYS.forEach(function(p){
      var val = params.get(p);
      if(!val) return;
      var pretty = p.replace('utm_','UTM ').replace('_',' ');
      var labels = scope.querySelectorAll('.gfield_label');
      var targetLower = pretty.toLowerCase();
      for(var i=0;i<labels.length;i++){
        var label = labels[i];
        var labelText = label.textContent.trim();
        if(labelText.toLowerCase() === targetLower){
          var field = label.closest('.gfield');
          if(!field) break;
          var input = field.querySelector('input,textarea,select');
          if(!input) break;
          if(!input.value){
            input.value = val;
            try { input.dispatchEvent(new Event('change',{bubbles:true})); } catch(_){}
          }
          break;
        }
      }
    });
  }

  prefill(document);
}
