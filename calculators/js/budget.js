var STORAGE_KEY = "saved_budget1"
var googleChart,
  googleChartData,
  googleChartOptions,
  lup = {};

var calcObj = {};
var formats = {};

var summaryTables = {
  budget_insights: [
    { id: 'title', name: 'Budget Insights', cols: ['Overhead Recovered', 'Profit Generated', 'Portion of Total Sales'] },
    {
      id: 'materials', name: 'Materials', cols: [
        {
          id: "materialRecovered", format: "currency", calculation: function (obj, fields) {
            return obj.materialCosts * (obj.materialRecovery  / 100)
          }
        },
        {
          id: "materialRecoveredPerc", format: "percent", calculation: function (obj, fields) {
            return (obj.materialRecovered / obj.overheadCosts) * 100
          }
        },
        {
          id: "materialProfit", format: "currency", calculation: function (obj, fields) {
            return ((obj.materialCosts + obj.materialRecovered) /  (1 - (obj.profitMargin / 100))) - (obj.materialCosts + obj.materialRecovered)
          }
        },
        {
          id: "materialProfitPerc", format: "percent", calculation: function (obj, fields) {
            return (obj.materialProfit / obj.netProfit) * 100
          }
        },
        {
          id: "materialSales", format: "currency", calculation: function (obj, fields) {
            return obj.materialRecovered + obj.materialProfit + obj.materialCosts
          }
        },
        {
          id: "materialSalesPerc", format: "percent", calculation: function (obj, fields) {
            return (obj.materialSales / obj.salesGoal)  * 100
          }
        },
      ]
    },
    {
      id: 'equipment', name: 'Equipment', cols: [
        {
          id: "equipmentRecovered", format: "currency", calculation: function (obj, fields) {
            return obj.equipmentBillable * (obj.equipmentRecovery  / 100)
          }
        },
        {
          id: "equipmentRecoveredPerc", format: "percent", calculation: function (obj, fields) {
            return (obj.equipmentRecovered / obj.overheadCosts) * 100
          }
        },
        {
          id: "equipmentProfit", format: "currency", calculation: function (obj, fields) {
            return ((obj.equipmentBillable + obj.equipmentRecovered) /  (1 - (obj.profitMargin / 100))) - (obj.equipmentBillable + obj.equipmentRecovered)
          }
        },
        {
          id: "equipmentProfitPerc", format: "percent", calculation: function (obj, fields) {
            return (obj.equipmentProfit / obj.netProfit) * 100
          }
        },
        {
          id: "equipmentSales", format: "currency", calculation: function (obj, fields) {
            return obj.equipmentRecovered + obj.equipmentProfit + obj.equipmentBillable
          }
        },
        {
          id: "equipmentSalesPerc", format: "percent", calculation: function (obj, fields) {
            return (obj.equipmentSales / obj.salesGoal)  * 100
          }
        },
      ]
    },
    {
      id: 'subcontractor', name: 'Subcontractor', cols: [
        {
          id: "subcontractorRecovered", format: "currency", calculation: function (obj, fields) {
            return obj.subcontractorCosts * (obj.subcontractorRecovery  / 100)
          }
        },
        {
          id: "subcontractorRecoveredPerc", format: "percent", calculation: function (obj, fields) {
            return (obj.subcontractorRecovered / obj.overheadCosts) * 100
          }
        },
        {
          id: "subcontractorProfit", format: "currency", calculation: function (obj, fields) {
            return ((obj.subcontractorCosts + obj.subcontractorRecovered) /  (1 - (obj.profitMargin / 100))) - (obj.subcontractorCosts + obj.subcontractorRecovered)
          }
        },
        {
          id: "subcontractorProfitPerc", format: "percent", calculation: function (obj, fields) {
            return (obj.subcontractorProfit / obj.netProfit) * 100
          }
        },
        {
          id: "subcontractorSales", format: "currency", calculation: function (obj, fields) {
            return obj.subcontractorRecovered + obj.subcontractorProfit + obj.subcontractorCosts
          }
        },
        {
          id: "subcontractorSalesPerc", format: "percent", calculation: function (obj, fields) {
            return (obj.subcontractorSales / obj.salesGoal)  * 100
          }
        },
      ]
    },
    {
      id: 'Labor', name: 'Labor', cols: [
        {
          id: "laborRecovered", format: "currency", calculation: function (obj, fields) {
            return obj.totalOverhead - (obj.materialRecovered + obj.equipmentRecovered +  obj.subcontractorRecovered)
          }
        },
        {
          id: "laborRecoveredPerc", format: "percent", calculation: function (obj, fields) {
            return (obj.laborRecovered / obj.overheadCosts) * 100
          }
        },
        {
          id: "laborProfit", format: "currency", calculation: function (obj, fields) {
            return ((obj.laborCosts + obj.laborRecovered) /  (1 - (obj.profitMargin / 100))) - (obj.laborCosts + obj.laborRecovered)
          }
        },
        {
          id: "laborProfitPerc", format: "percent", calculation: function (obj, fields) {
            return (obj.laborProfit / obj.netProfit) * 100
          }
        },
        {
          id: "laborSales", format: "currency", calculation: function (obj, fields) {
            return obj.laborRecovered + obj.laborProfit + obj.laborCosts
          }
        },
        {
          id: "laborSalesPerc", format: "percent", calculation: function (obj, fields) {
            return (obj.laborSales / obj.salesGoal)  * 100
          }
        },
      ]
    },
  ],
  production_outlook: [
    { id: 'title', name: 'Production Outlook', cols: ['Overhead Recovery Needed', 'Billable Hours Needed'] },
    {
      id: 'perDay', name: 'per Day', cols: [
        {
          id: "perDayRecovery", format: "currency", calculation: function (obj, fields) {
            return obj.overheadCosts / obj.productionDays
          }
        },
        {
          id: "perDayHours", format: "number", calculation: function (obj, fields) {
            return obj.laborHours / obj.productionDays
          }
        },
      ]
    },
    {
      id: 'perWeek', name: 'per Week', cols: [
        {
          id: "perWeekRecovery", format: "currency", calculation: function (obj, fields) {
            return obj.perDayRecovery * 5
          }
        },
        {
          id: "perWeekHours", format: "number", calculation: function (obj, fields) {
            return obj.perDayHours * 5
          }
        },
      ]
    },
    {
      id: 'perMonth', name: 'per Month', cols: [
        {
          id: "perMonthRecovery", format: "currency", calculation: function (obj, fields) {
            return obj.perDayRecovery * 20
          }
        },
        {
          id: "perMonthHours", format: "number", calculation: function (obj, fields) {
            return obj.perDayHours * 20
          }
        },
      ]
    },
  ],
  man_hour_breakdown: [
    { id: 'title', name: 'Man Hour Price Breakdown', isSingle: true, cols: ['Your cost (avg)', 'Overhead Recovery', 'Profit Generated', 'Customer\'s Price'] },
    {
      id: 'manHour', name: '', cols: [
        {
          id: "manHourCost", format: "currency", calculation: function (obj, fields) {
            return obj.ratioLaborHours
          }
        },
        {
          id: "manHourRecovery", format: "currency", calculation: function (obj, fields) {
            return obj.ratioLaborHours * (obj.laborRecovery / 100)
          }
        },
        {
          id: "manHourProfit", format: "currency", calculation: function (obj, fields) {
            return ((obj.manHourCost + obj.manHourRecovery) /  (1 - (obj.profitMargin / 100))) - (obj.manHourCost + obj.manHourRecovery)
          }
        },
        {
          id: "manHourPrice", format: "currency", calculation: function (obj, fields) {
            return obj.manHourCost + obj.manHourRecovery + obj.manHourProfit
          }
        },
      ]
    },
  ],
  material_item_breakdown: [
    { id: 'title', name: 'Example Material Item Price Breakdown', isSingle: true, cols: ['Your cost', 'Overhead Recovery', 'Profit Generated', 'Customer\'s Price'] },
    {
      id: 'materialItem', name: '', cols: [
        {
          id: "materialItemCost", format: "currency", calculation: function (obj, fields) {
            return obj.materialItemCost
          }
        },
        {
          id: "materialItemRecovery", format: "currency", calculation: function (obj, fields) {
            return obj.materialItemCost * (obj.materialRecovery / 100)
          }
        },
        {
          id: "materialItemProfit", format: "currency", calculation: function (obj, fields) {
            return ((obj.materialItemCost + obj.materialItemRecovery) /  (1 - (obj.profitMargin / 100))) - (obj.materialItemCost + obj.materialItemRecovery)
          }
        },
        {
          id: "materialItemPrice", format: "currency", calculation: function (obj, fields) {
            return obj.materialItemCost + obj.materialItemRecovery + obj.materialItemProfit
          }
        },
      ]
    },
  ]
}

var setupButtonEvents = function () {
  jQuery(".clear-values").click(function () {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
    location.reload();
  });
  jQuery(".import-button").click(function () {
    var importStr = jQuery(".import-field").val() || "{}*"
    importStr = importStr.slice(0, -1);
    importObj(JSON.parse(importStr))

    saveData();
    location.reload();
  });

  jQuery(".import-toggle").click(function () {
    jQuery(".import-container").toggle();
  });

  jQuery(".export-toggle").click(function () {
    jQuery(".export-summary-json").toggle();
  });
  jQuery(document).on('keypress', '.gform_wrapper', function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      e.preventDefault();
      return false;
    }
  });
};1

var setupDatepickers = function () {
  if (window['gformInitDatepicker']) { gformInitDatepicker(); }
}
var setupHelpIcons = function () {
  $(".input-inline-help .gfield_description").click(function () {
    console.log(this);

    $(".inline-help").hide();

    $(this).parent().next().show();
  });

  $(".help-modal").click(function () {
    if (event.target.className == "help-modal") {
      $(".inline-help").hide();
    }
  });

  $(".help-close").click(function () {
    $(".inline-help").hide();
  });
};

function setupReturnLinks() {
  $(".link-small a").click(function(e) {
    e.preventDefault();
    var email = getParameterByName('email') || ''
    var dest = jQuery(this).attr('href') + "&email=" + email;
    window.setTimeout(function() {
        window.location.href = dest;
    }, 100);
  })
}

// Set up Google chart
var createGoogleChart = function () {
  google.charts.load("current", {
    packages: ["corechart"]
  });
  google.charts.setOnLoadCallback(drawChart);

  googleChartOptions = {
    pieHole: 0.4,
    colors: ["#ff6384", "#36a2eb", "#ffcd56", "#8DCB56", "#775D98", "#FC590F"],
    pieSliceText: "value",
    chartArea: {
      left: 10,
      top: 20,
      width: "100%",
      height: "100%"
    },
    legend: {
      position: "right"
    },
  };

  function drawChart() {
    googleChartData = google.visualization.arrayToDataTable([
      ["Component", "$"],
      ["Field Labor Costs", 0],
      ["Material Costs", 0],
      ["Billable-by-the-unit Equipment Costs", 0],
      ["Subcontractor Costs", 0],
      ["Overhead Costs", 0],
      ["Net Profit", 0],
    ]);
    var formatter = new google.visualization.NumberFormat({
      prefix: "$",
    });

    formatter.format(googleChartData, 1);

    googleChart = new google.visualization.PieChart(
      document.getElementById("donutchart")
    );
    googleChart.draw(googleChartData, googleChartOptions);

    calculateOutput(); // Load any prepopulated values
  }
};
// Update existing Google chart with new values
function updateChart(data) {
  //Remove data from datatable
  googleChartData.removeRow(0);
  googleChartData.removeRow(0);
  googleChartData.removeRow(0);
  googleChartData.removeRow(0);
  googleChartData.removeRow(0);
  googleChartData.removeRow(0);

  googleChartData.insertRows(0, [
    ["Field Labor Costs", Number(data.laborCosts.toFixed(2))],
  ]);
  googleChartData.insertRows(1, [
    ["Material Costs", Number(data.materialCosts.toFixed(2))],
  ]);
  googleChartData.insertRows(2, [
    ["Billable-by-the-unit Equipment Costs", Number(data.equipmentBillable.toFixed(2))]
  ]);
  googleChartData.insertRows(3, [
    ["Subcontractor Costs", Number(data.subcontractorCosts.toFixed(2))]
  ]);
  googleChartData.insertRows(4, [
    ["Overhead Costs", Number(data.overheadCosts.toFixed(2))]
  ]);
  googleChartData.insertRows(5, [
    ["Net Profit", Number(data.netProfit.toFixed(2))]
  ]);

  var formatter = new google.visualization.NumberFormat({
    prefix: "$",
  });

  formatter.format(googleChartData, 1);
  googleChart.draw(googleChartData, googleChartOptions);
}


function calcWorkingDays(start, end, daysInWeek) {
  var startDate = new Date(start);
  var endDate = new Date(end);
  var count = 0;
  var maxDayOfWeek = daysInWeek - 1;
  const curDate = new Date(startDate.getTime());
  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();
    if (dayOfWeek <= maxDayOfWeek) count++;
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
}

createSummaryTables = function () {
  jQuery("#summary-table").empty();

  var container = $("#summary-table");

  var sumObj = JSON.parse(JSON.stringify(calcObj))

  Object.keys(summaryTables).forEach(function (key, index) {
    var item = summaryTables[key]
    var table = $("<table data-index='" + index + "' >");
    var tr1 = $("<tr class='row-title'>");
    if (item[0].name == 'Budget Insights') {
      tr1.append("<th colspan='" + ((item[0].cols.length + 1)*2) + "'>" + item[0].name + "</th>");
    } else {
      tr1.append("<th colspan='" + (item[0].cols.length + 1) + "'>" + item[0].name + "</th>");
    }
    
    table.append(tr1);
    item.forEach(function (row) {
      var tr = $("<tr class='" + row.id + "'>");
      if (!item[0].isSingle) {
        if (row.id == 'title') {
          tr.append("<th></th>");
        } else {
          tr.append("<td>" + row.name + "</td>");
        }
      }
      row.cols.forEach(function (col) {
        if (row.id == 'title') {
          if (item[0].name == 'Budget Insights') {
            tr.append("<th colspan='2'>" + col + "</th>");
          } else {
            tr.append("<th>" + col + "</th>");
          }
        } else {
          var calcValue = col.calculation(sumObj)
          if (calcValue !== '') {
            calcValue = Math.round(calcValue * 100) / 100
            sumObj[col.id] = calcValue
          }
          var val = sumObj[col.id] !== undefined ? sumObj[col.id] : ''
          tr.append("<td format='" + col.format + "'>" + formatVal(val, col.format) + "</td>");
        }
        table.append(tr);
      });
    })
    container.append(table);
  })

  return sumObj
}

// Calculate the results of the calculator
function calculateOutput() {

  if (calcObj.startDate && calcObj.endDate) {
    calcObj.productionDays = calcWorkingDays(calcObj.startDate, calcObj.endDate, calcObj.daysInWeek);
  }

  //Outputs
  calcObj.ratioLaborHours = calcObj.laborCosts / (calcObj.laborHours);

  calcObj.totalOverhead = (calcObj.ratioLaborHours * calcObj.laborUnbillable) + calcObj.overheadCosts;

  calcObj.materialRecovered = calcObj.materialCosts * (calcObj.materialRecovery / 100);
  calcObj.equipmentRecovered = calcObj.equipmentBillable * (calcObj.equipmentRecovery / 100);
  calcObj.subcontractorRecovered = calcObj.subcontractorCosts * (calcObj.subcontractorRecovery / 100);
  calcObj.laborRecovered = calcObj.totalOverhead - (calcObj.materialRecovered + calcObj.equipmentRecovered + calcObj.subcontractorRecovered);

  calcObj.laborRecovery = (calcObj.laborRecovered / calcObj.laborCosts) * 100;

  calcObj.totalCOGs = calcObj.laborCosts + calcObj.materialCosts + calcObj.subcontractorCosts + calcObj.equipmentBillable;
  calcObj.totalCOGsPerc = (calcObj.totalCOGs / calcObj.salesGoal) * 100;

  calcObj.grossProfit = calcObj.salesGoal - calcObj.totalCOGs;
  calcObj.grossProfitPerc = (calcObj.grossProfit / calcObj.salesGoal) * 100;

  calcObj.netProfit = calcObj.grossProfit - calcObj.totalOverhead;
  calcObj.netProfitPerc = (calcObj.netProfit / calcObj.salesGoal) * 100;

  calcObj.profitMargin = calcObj.netProfitPerc;

  calcObj.ratioUnbillable = (calcObj.laborUnbillable / calcObj.laborHours) * 100;

  $(".ratio-unbillable .ratio-value").text(formatVal(calcObj.ratioUnbillable, 'percent'));
  $(".ratio-labor-hours .ratio-value").text(formatVal(calcObj.ratioLaborHours, 'currency'));
  $("#" + lup.productionDays.id).eq(0).val(formatVal(calcObj.productionDays, lup.productionDays.format));
  $("#" + lup.totalCOGs.id).eq(0).val(formatVal(calcObj.totalCOGs, lup.totalCOGs.format));
  $("#" + lup.profitMargin.id).eq(0).val(formatVal(calcObj.profitMargin, lup.profitMargin.format));
  $("#" + lup.grossProfit.id).eq(0).val(formatVal(calcObj.grossProfit, lup.grossProfit.format) + ' (' + formatVal(calcObj.grossProfitPerc, 'percent') + ')');
  $("#" + lup.netProfit.id).eq(0).val(formatVal(calcObj.netProfit, lup.netProfit.format) + ' (' + formatVal(calcObj.netProfitPerc, 'percent') + ')');
  $("#" + lup.laborRecovery.id).eq(0).val(formatVal(calcObj.laborRecovery, lup.laborRecovery.format));
 
  const sumObj = createSummaryTables();

  $("#" + lup.manHourPrice.id).eq(0).val(formatVal(sumObj.manHourPrice, lup.manHourPrice.format));

  saveData();

  // Update Google Chart
  if (calcObj.netProfit) {
    $(".chart-placeholder").hide();
    $("#donutchart").show();
    $(".gform_page:last-of-type .gform_page_footer").show();
    $(".conversion-block").show();
    updateChart({
      laborCosts: calcObj.laborCosts,
      materialCosts: calcObj.materialCosts,
      equipmentBillable: calcObj.equipmentBillable,
      subcontractorCosts: calcObj.subcontractorCosts,
      overheadCosts: calcObj.overheadCosts,
      netProfit: calcObj.netProfit,
    });
  } else {
    $(".chart-placeholder").show();
    $("#donutchart").hide();
    $(".gform_page:last-of-type .gform_page_footer").hide();
    $(".conversion-block").hide();
    updateChart({
      laborCosts: calcObj.laborCosts,
      materialCosts: calcObj.materialCosts,
      equipmentBillable: calcObj.equipmentBillable,
      subcontractorCosts: calcObj.subcontractorCosts,
      overheadCosts: calcObj.overheadCosts,
      netProfit: calcObj.netProfit,
    });
  }
}

function saveData () {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(calcObj));
  saveToGravityFormField();
}

function saveToGravityFormField () {
  var text = "";

  for (const key in lup) {
    const item = lup[key];
    text = text + item.name + ": " + calcObj[key] + "\n";
  }

  jQuery(".export-summary-json textarea").val(
    JSON.stringify(calcObj) + '*'
  );

  jQuery(".export-summary textarea").val(text);
};

function importObj(savedObj) {
    // Set default values
    for (const key in lup) {
      const element = lup[key];
      if (savedObj[key] || savedObj[key] === 0) {
        calcObj[key] = savedObj[key];
        $("#" + element.id).val(formatVal(calcObj[key], lup[key].format));
      } else {
        calcObj[key] = Number($("#" + element.id).val().replace(/[^0-9.-]+/g, ""));
      }
    }
    if (savedObj['equipmentOverhead']) {
      calcObj['equipmentOverhead'] = savedObj['equipmentOverhead']
    }
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Move to page two on initial load so the submit button works well
jQuery(document).on(
  "gform_post_render",
  function (event, form_id, current_page) {
    // code to trigger on form or form page render
    if (current_page == 1 && location.host != "localhost:8000") {
      $(".gform_next_button").eq(0).trigger("click");
    }
    $(".gform_next_button").hide();
  }
);

$(document).ready(function () {
  console.log("Synkedup ready!");

  $(".gform_footer").hide();
  // $(".gform_page_footer").hide();
  $(".gform_page").show();
  $(".tab_page").show();
  $("#donutchart").hide();
  $(".conversion-block").hide();

  if (/[?&]onboarding=true/.test(location.search)) {
    console.log('onboarding')
    $("#field_60_17 label").text('Thank you, hit the button below to complete this marathon');
    $("#gform_submit_button_60").val('Submit and finish onboarding');
  } else if (/[?&]return=estimating/.test(location.search)) {
    console.log('return budget')
    $(".email-field-block .gfield_label").hide();
    $("#gform_submit_button_60").val('Finish and return to Job Estimating Calculator');
  }

  createGoogleChart();
  setupHelpIcons();
  setupReturnLinks();
  setupButtonEvents();
  setupDatepickers();

  lup = {
    startDate: {
      id: "input_60_39",
      name: 'Start Date',
      format: 'date'
    },
    endDate: {
      id: "input_60_40",
      name: 'End Date',
      format: 'date'
    },
    daysInWeek: {
      id: "input_60_41",
      name: 'Days In Week',
      format: 'none'
    },
    salesGoal: {
      id: "input_60_6",
      name: 'Sales Goal',
      format: 'currency'
    },
    laborCosts: {
      id: "input_60_7",
      name: 'Labor Costs',
      format: 'currency'
    },
    laborHours: {
      id: "input_60_23",
      name: 'Labor Hours',
      format: 'number'
    },
    laborUnbillable: {
      id: "input_60_8",
      name: 'Labor Unbillable',
      format: 'number'
    },
    materialCosts: {
      id: "input_60_9",
      name: 'Material Costs',
      format: 'currency'
    },
    equipmentBillable: {
      id: "input_60_27",
      name: 'Equipment Billable',
      format: 'currency'
    },
    subcontractorCosts: {
      id: "input_60_29",
      name: 'Subcontractor Costs',
      format: 'currency'
    },
    overheadCosts: {
      id: "input_60_30",
      name: 'Overhead Costs',
      format: 'currency'
    },
    materialItemCost: {
      id: "input_60_32",
      name: 'Material Item Cost',
      format: 'currency'
    },
    materialRecovery: {
      id: "input_60_37",
      name: 'Material Recovery',
      format: 'number'
    },
    equipmentRecovery: {
      id: "input_60_33",
      name: 'Equipment Recovery',
      format: 'number'
    },
    subcontractorRecovery: {
      id: "input_60_34",
      name: 'Subcontractor Recovery',
      format: 'number'
    },
    productionDays: {
      id: "input_60_35",
      name: 'Production Days',
      format: 'number'
    },
    laborRecovery: {
      id: "input_60_38",
      name: 'Labor Recovery',
      format: 'percent'
    },
    profitMargin: {
      id: "input_60_36",
      name: 'Profit Margin',
      format: 'percent'
    },
    totalCOGs: {
      id: "input_60_4",
      name: 'Total COGs',
      format: 'currency'
    },
    grossProfit: {
      id: "input_60_11",
      name: 'Gross Profit',
      format: 'currency'
    },
    netProfit: {
      id: "input_60_13",
      name: 'Net Profit',
      format: 'currency'
    },
    manHourPrice: {
      id: "input_60_47",
      name: 'Your Man Hour Price',
      format: 'currency'
    },
  };

  var reverseLup = {};

  for (const key in lup) {
    const element = lup[key];
    reverseLup[element.id] = key;
  }

  var savedObj = JSON.parse(localStorage.getItem("saved_budget1") || "{}");
  importObj(savedObj)

  gform.addAction(
    "gform_input_change",
    function (elem, formId, fieldId) {
      // Store entered value
      if (fieldId == '39' || fieldId == '40') {
        calcObj[reverseLup[elem.id]] = elem.value;
      } else {
        calcObj[reverseLup[elem.id]] = Number(
          elem.value.replace(/[^0-9.-]+/g, "")
        );
      }

      calculateOutput();
    },
    10,
    3
  );
});