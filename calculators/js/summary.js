var STORAGE_KEYS = {
  'sales': 'saved_sales1',
  'labor': 'saved_labor',
  'materials': 'saved_materials1',
  'equipment': 'equipment',
  'subcontractor': 'saved_subcontractor1',
  'overhead': 'saved_overhead1',
  'budget': 'saved_budget1',
}

// TEMPORARY DISABLE ONBOARDING
var onboardingEnabled = false

var submit = false

function openTab(tabName) {

  if (!$("#" + tabName).hasClass('active')) {
    $('#ctabs li a').removeClass('active');
    $("#" + tabName).addClass('active');

    $('.tabcontent').hide();
    $('#' + tabName + 'Tab').show()
  }
}

function loadTab(view) {
  var tabName = 'calc-' + view;
  if ($("#" + tabName).length && !$("#" + tabName).hasClass('active')) {
    $('#ctabs li a').removeClass('active');
    $("#" + tabName).addClass('active');

    $('#ctabsContent').hide();
    $('#ctabsContent').removeClass('active');
    $('#ctabsContent').empty();
    $('#ctabsContent').load("/wp-content/themes/synkedup-theme/calculators/combined/" + tabName + ".html?v=3", function () {
      $('#ctabsContent').show()
      setTimeout(() => {
        $('#ctabsContent').addClass('active');
      }, 200);

    });

    updateTabFigures()

    if (view == 'budget') {
      $('body').removeClass('onboarding')
    }
  }
}

function setupSummaryEvents() {
  $(window).on('hashchange', function () {
    var view = (window.location.hash.split('?')[0]).substr(1);
    loadTab(view)
  });
  $(window).bind('beforeunload', function () {
    if (!submit) {
      return 'Are you sure you want to leave? You have unsaved changes.';
    }

  });
  $('#gform_submit_button_66').click(function (e) {
    e.preventDefault();
    saveSummaryToGravityFormField()
    $("#gform_66").trigger("submit", [true]);
  })
  $('#gform_submit_button_66').on('keypress', function (e) {
    e.preventDefault();
    if (e.keyCode == 13) {
      saveSummaryToGravityFormField()
    }
  })
  $('#ctabs li a').click(function (e) {
    e.preventDefault();
    var tabName = $(this).attr('id');
    var view = tabName.substr(5)
    window.location.hash = view;
  });
  $('.next-button').click(function (e) {
    e.preventDefault();
    var view = (window.location.hash.split('?')[0]).substr(1);
    console.log(view)
    var nextView = 'budget'
    if (view == 'sales') {
      nextView = 'labor'
    } else if (view == 'labor') {
      nextView = 'materials'
    } else if (view == 'materials') {
      nextView = 'equipment'
    } else if (view == 'equipment') {
      nextView = 'subcontractor'
    } else if (view == 'subcontractor') {
      nextView = 'overhead'
    } else if (view == 'overhead') {
      nextView = 'budget'
    }

    window.location.hash = nextView;
  });
  jQuery(".clear-values-summary").click(function () {
    saveDataFull(false)
    location.reload();
  });
  jQuery(".import-button-summary").click(function () {
    var importStr = jQuery("#importSummary .import-field").val() || "{}*"
    importStr = importStr.slice(0, -1);

    var fullCalcObj = saveDataFull(JSON.parse(importStr));
    if ((!fullCalcObj || !fullCalcObj.budget || !fullCalcObj.budget.laborCosts) && onboardingEnabled) {
      window.location.hash = 'labor'
      setUrlParam('onboarding', 'true')
    }
    setTimeout(function () {
      location.reload();
    }, 1000)

  });

  jQuery(".import-toggle-summary").click(function () {
    jQuery("#importSummary .import-container").toggle();
  });

  jQuery(".export-toggle-summary").click(function () {
    saveSummaryToGravityFormField();
    jQuery(".export-summary-json-full").toggle();
  });
}

function saveDataFull(fullCalcObj) {
  for (const item in STORAGE_KEYS) {
    const key = STORAGE_KEYS[item];
    if (fullCalcObj[item] && !jQuery.isEmptyObject(fullCalcObj[item])) {
      localStorage.setItem(key, JSON.stringify(fullCalcObj[item]));
    } else {
      localStorage.removeItem(key);
    }
  }
  saveSummaryToGravityFormField();
  return fullCalcObj
}

function saveSummaryToGravityFormField() {
  submit = true;
  var exportData = {};
  for (const item in STORAGE_KEYS) {
    const key = STORAGE_KEYS[item];
    var d = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : {}
    exportData[item] = d
  }
  console.log(exportData)

  jQuery(".export-summary-json-full textarea").val(
    JSON.stringify(exportData) + '*'
  );

  var budgetData = exportData.budget || {}
  $('.materialRecovery-value input').eq(0).val(formatVal(budgetData.materialRecovery, 'percent'));
  $('.laborRecovery-value input').eq(0).val(formatVal(budgetData.laborRecovery, 'percent'));
  $('.equipmentRecovery-value input').eq(0).val(formatVal(budgetData.equipmentRecovery, 'percent'));
  $('.subcontractorRecovery-value input').eq(0).val(formatVal(budgetData.subcontractorRecovery, 'percent'));

}

function updateTabFigures() {
  var savedObj = JSON.parse(localStorage.getItem("saved_budget1") || "{}");
  var figures = {
    // salesGoal: 'sales',
    laborCosts: 'labor',
    materialCosts: 'materials',
    equipmentBillable: 'equipment',
    subcontractorCosts: 'subcontractor',
    overheadCosts: 'overhead',
    netProfit: 'budget',
  }
  for (const key in figures) {
    const view = figures[key];
    val = '&nbsp;'
    if (savedObj[key] || savedObj[key] === 0) {
      val = formatVal(savedObj[key], 'currency')
    }
    $("#calc-" + view + ' .sub-fig').html(val);
  }

}

function onboard(view) {
  console.log('onboard')
  $('body').addClass('onboarding')
}

function run() {
  console.log('summary run')
  var view = (window.location.hash.split('?')[0]).substr(1);
  var params = new URLSearchParams(window.location.search)
  var isOnboarding = params.get('onboarding') == 'true'
  var hasSaved = localStorage.getItem("saved_budget1") || false;

  if (!$("#calc-" + view).length) {
    if (!isOnboarding && (!hasSaved || !hasSaved.length)) {
      isOnboarding = true
      // setUrlParam('onboarding', 'true')
    }
    if (!onboardingEnabled) {
      isOnboarding = false
    }
    view = isOnboarding ? 'sales' : 'budget'
    window.location.hash = view;
  } else {
    if (view == 'budget') {
      isOnboarding = false
    }
    loadTab(view);
  }

  if (isOnboarding && onboardingEnabled) {
    onboard(view)
  }

  setupSummaryEvents()
}

$(document).ready(function () {
  run()
});