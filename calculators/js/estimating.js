var STORAGE_KEY = "saved_estimating1"
var sectionName = 'estimate'
var calcFields = {
  estimate: [
    { id: 'title', name: '', cols: ['Estimated Costs', 'Overhead recovered', 'Breakeven Cost', 'Profit', 'Final Cost to Customer'] },
    {
      id: 'materialCosts', name: 'Materials Costs', cols: [
        { id: "materialHardCosts", name: 'Material Estimated Costs', input: true, type: "text", format: "currency" },
        {
          id: "materialRecovered", format: "currency", calculation: function (obj, fields) {
            return obj.materialHardCosts * (fields.materialRecovery / 100)
          }
        },
        {
          id: "materialBreakeven", format: "currency", calculation: function (obj, fields) {
            return obj.materialHardCosts + obj.materialRecovered
          }
        },
        {
          id: "materialProfit", format: "currency", calculation: function (obj, fields) {
            return (obj.materialBreakeven / (1 - (fields.profitMargin / 100))) - obj.materialBreakeven
          }
        },
        {
          id: "materialFinal", format: "currency", calculation: function (obj, fields) {
            return obj.materialHardCosts + obj.materialRecovered + obj.materialProfit
          }
        },
      ]
    },
    {
      id: 'laborCosts', name: 'Labor Manhours', cols: [
        { id: "laborManHours", name: 'Labor Man Hours', input: true, type: "number", format: "number" },
        {
          id: "laborRecovered", format: "currency", calculation: function (obj, fields) {
            obj.laborHardCosts = Math.round(obj.laborManHours * fields.ratioLaborHours * 100) / 100
            return obj.laborHardCosts * (fields.laborRecovery / 100)
          }
        },
        {
          id: "laborBreakeven", format: "currency", calculation: function (obj, fields) {
            return obj.laborHardCosts + obj.laborRecovered
          }
        },
        {
          id: "laborProfit", format: "currency", calculation: function (obj, fields) {
            return (obj.laborBreakeven / (1 - (fields.profitMargin / 100))) - obj.laborBreakeven
          }
        },
        {
          id: "laborFinal", format: "currency", calculation: function (obj, fields) {
            return obj.laborHardCosts + obj.laborRecovered + obj.laborProfit
          }
        },
      ]
    },
    {
      id: 'equipmentCosts', name: 'Equipment Costs', cols: [
        { id: "equipmentHardCosts", name: 'Equipment Estimated Costs', input: true, type: "text", format: "currency" },
        {
          id: "equipmentRecovered", format: "currency", calculation: function (obj, fields) {
            return obj.equipmentHardCosts * (fields.equipmentRecovery / 100)
          }
        },
        {
          id: "equipmentBreakeven", format: "currency", calculation: function (obj, fields) {
            return obj.equipmentHardCosts + obj.equipmentRecovered
          }
        },
        {
          id: "equipmentProfit", format: "currency", calculation: function (obj, fields) {
            return (obj.equipmentBreakeven / (1 - (fields.profitMargin / 100))) - obj.equipmentBreakeven
          }
        },
        {
          id: "equipmentFinal", format: "currency", calculation: function (obj, fields) {
            return obj.equipmentHardCosts + obj.equipmentRecovered + obj.equipmentProfit
          }
        },
      ]
    },
    {
      id: 'subcontractorCosts', name: 'Subcontractor Costs', cols: [
        { id: "subcontractorHardCosts", name: 'Subcontractor Estimated Costs', input: true, type: "text", format: "currency" },
        {
          id: "subcontractorRecovered", format: "currency", calculation: function (obj, fields) {
            return obj.subcontractorHardCosts * (fields.subcontractorRecovery / 100)
          }
        },
        {
          id: "subcontractorBreakeven", format: "currency", calculation: function (obj, fields) {
            return obj.subcontractorHardCosts + obj.subcontractorRecovered
          }
        },
        {
          id: "subcontractorProfit", format: "currency", calculation: function (obj, fields) {
            return (obj.subcontractorBreakeven / (1 - (fields.profitMargin / 100))) - obj.subcontractorBreakeven
          }
        },
        {
          id: "subcontractorFinal", format: "currency", calculation: function (obj, fields) {
            return obj.subcontractorHardCosts + obj.subcontractorRecovered + obj.subcontractorProfit
          }
        },
      ]
    },
    {
      id: 'totalCosts', name: 'TOTAL', cols: [
        {
          id: "totalHardCosts", format: "currency", calculation: function (obj, fields) {
            return obj.materialHardCosts + obj.equipmentHardCosts + obj.subcontractorHardCosts + obj.laborHardCosts
          }
        },
        {
          id: "totalRecovered", format: "currency", calculation: function (obj, fields) {
            return obj.materialRecovered + obj.laborRecovered + obj.equipmentRecovered + obj.subcontractorRecovered
          }
        },
        {
          id: "totalBreakeven", format: "currency", calculation: function (obj, fields) {
            return obj.materialBreakeven + obj.laborBreakeven + obj.equipmentBreakeven + obj.subcontractorBreakeven
          }
        },
        {
          id: "totalProfit", format: "number", calculation: function (obj, fields) {
            return '';
          }
        },
        {
          id: "totalFinal", format: "currency", calculation: function (obj, fields) {
            return obj.materialFinal + obj.laborFinal + obj.equipmentFinal + obj.subcontractorFinal
          }
        },
      ]
    },
  ],
  actual: [
    { id: 'title', name: '', cols: ['Estimated Costs', 'Actual Costs', 'Percentage', 'Final Price to Customer'] },
    {
      id: 'materialCosts', name: 'Materials Costs', cols: [
        { id: "materialHardCosts", format: "currency", calculation: function (obj, fields) { return obj.materialHardCosts } },
        { id: "materialActualCosts", name: "Material Actual Costs", input: true, type: "text", format: "currency" },
        {
          id: "materialActualPerc", format: "percent", shade: function (value) {
            if (!value) { return '' }
            return value > 0 ? 'red' : 'green'
          }, calculation: function (obj, fields) {
            return Math.round((1 - (obj.materialActualCosts / obj.materialHardCosts)) * -10000) / 100
          }
        },
        {
          id: "materialFinal1", format: "number", calculation: function (obj, fields) {
            return ''
          }
        },
        {
          id: "materialActualRecovered", hidden: true, format: "currency", calculation: function (obj, fields) {
            return obj.materialActualCosts * (fields.materialRecovery / 100)
          }
        },
        {
          id: "materialActualBreakeven", hidden: true, format: "currency", calculation: function (obj, fields) {
            return obj.materialActualCosts + obj.materialActualRecovered
          }
        },
        {
          id: "materialActualProfit", hidden: true, format: "currency", calculation: function (obj, fields) {
            return (obj.materialActualBreakeven / (1 - (fields.profitMargin / 100))) - obj.materialActualBreakeven
          }
        },
      ]
    },
    {
      id: 'laborManhours', name: 'Labor Manhours', cols: [

        { id: "laborManHours", format: "number", calculation: function (obj, fields) { return obj.laborManHours } },
        { id: "laborActualHours", name: "Labor Actual Hours", input: true, type: "number", format: "number" },
        {
          id: "laborActualPerc", format: "percent", shade: function (value) {
            if (!value) { return '' }
            return value > 0 ? 'red' : 'green'
          }, calculation: function (obj, fields) {
            obj.laborActualCosts = Math.round(obj.laborActualHours * fields.ratioLaborHours * 100) / 100
            return Math.round((1 - (obj.laborActualCosts / obj.laborHardCosts)) * -10000) / 100
          }
        },
        {
          id: "laborFinal1", format: "number", calculation: function (obj, fields) {
            return ''
          }
        },
        {
          id: "laborActualRecovered", hidden: true, format: "currency", calculation: function (obj, fields) {
            return obj.laborActualCosts * (fields.laborRecovery / 100)
          }
        },
        {
          id: "laborActualBreakeven", hidden: true, format: "currency", calculation: function (obj, fields) {
            return obj.laborActualCosts + obj.laborActualRecovered
          }
        },
        {
          id: "laborActualProfit", hidden: true, format: "currency", calculation: function (obj, fields) {
            return (obj.laborActualBreakeven / (1 - (fields.profitMargin / 100))) - obj.laborActualBreakeven
          }
        },
      ]
    },
    {
      id: 'equipmentCosts', name: 'Equipment Costs', cols: [
        { id: "equipmentHardCosts", format: "currency", calculation: function (obj, fields) { return obj.equipmentHardCosts } },
        { id: "equipmentActualCosts", name: "Equipment Actual Costs", input: true, type: "text", format: "currency" },
        {
          id: "equipmentActualPerc", format: "percent", shade: function (value) {
            if (!value) { return '' }
            return value > 0 ? 'red' : 'green'
          }, calculation: function (obj, fields) {
            return Math.round((1 - (obj.equipmentActualCosts / obj.equipmentHardCosts)) * -10000) / 100
          }
        },
        {
          id: "equipmentFinal1", format: "number", calculation: function (obj, fields) {
            return ''
          }
        },
        {
          id: "equipmentActualRecovered", format: "currency", hidden: true, calculation: function (obj, fields) {
            return obj.equipmentActualCosts * (fields.equipmentRecovery / 100)
          }
        },
        {
          id: "equipmentActualBreakeven", hidden: true, format: "currency", calculation: function (obj, fields) {
            return obj.equipmentActualCosts + obj.equipmentActualRecovered
          }
        },
        {
          id: "equipmentActualProfit", hidden: true, format: "currency", calculation: function (obj, fields) {
            return (obj.equipmentActualBreakeven / (1 - (fields.profitMargin / 100))) - obj.equipmentActualBreakeven
          }
        },
      ]
    },
    {
      id: 'subcontractorCosts', name: 'Subcontractor Costs', cols: [
        { id: "subcontractorHardCosts", format: "currency", calculation: function (obj, fields) { return obj.subcontractorHardCosts } },
        { id: "subcontractorActualCosts", name: "Subcontractor Actual Costs", input: true, type: "text", format: "currency" },
        {
          id: "subcontractorActualPerc", format: "percent", shade: function (value) {
            if (!value) { return '' }
            return value > 0 ? 'red' : 'green'
          }, calculation: function (obj, fields) {
            return Math.round((1 - (obj.subcontractorActualCosts / obj.subcontractorHardCosts)) * -10000) / 100
          }
        },
        {
          id: "subcontractorFinal1", format: "number", calculation: function (obj, fields) {
            return ''
          }
        },
        {
          id: "subcontractorActualRecovered", hidden: true, format: "currency", calculation: function (obj, fields) {
            return obj.subcontractorActualCosts * (fields.subcontractorRecovery / 100)
          }
        },
        {
          id: "subcontractorActualBreakeven", hidden: true, format: "currency", calculation: function (obj, fields) {
            return obj.subcontractorActualCosts + obj.subcontractorActualRecovered
          }
        },
        {
          id: "subcontractorActualProfit", hidden: true, format: "currency", calculation: function (obj, fields) {
            return (obj.subcontractorActualBreakeven / (1 - (fields.profitMargin / 100))) - obj.subcontractorActualBreakeven
          }
        },
      ]
    },
    {
      id: 'totalCosts', name: 'TOTAL', cols: [
        {
          id: "totalHardCosts", format: "currency", calculation: function (obj, fields) {
            obj.laborHardCosts = obj.laborManHours * fields.ratioLaborHours
            return obj.materialHardCosts + obj.equipmentHardCosts + obj.subcontractorHardCosts + obj.laborHardCosts
          }
        },
        {
          id: "totalActualCosts", name: "totalActualCosts", format: "currency", calculation: function (obj, fields) {
            return obj.materialActualCosts + obj.equipmentActualCosts + obj.subcontractorActualCosts + obj.laborActualCosts
          }
        },
        {
          id: "totalActualPerc", format: "number", calculation: function (obj, fields) {
            return '';
          }
        },
        {
          id: "totalFinal", format: "currency", calculation: function (obj, fields) {
            return obj.materialFinal + obj.laborFinal + obj.equipmentFinal + obj.subcontractorFinal
          }
        },
        {
          id: "totalActualRecovered", format: "currency", hidden: true, calculation: function (obj, fields) {
            return obj.materialActualRecovered + obj.laborActualRecovered + obj.equipmentActualRecovered + obj.subcontractorActualRecovered
          }
        },
        {
          id: "totalActualBreakeven", format: "currency", hidden: true, calculation: function (obj, fields) {
            return obj.materialActualBreakeven + obj.laborActualBreakeven + obj.equipmentActualBreakeven + obj.subcontractorActualBreakeven
          }
        },
        {
          id: "totalActualProfit", format: "number", hidden: true, calculation: function (obj, fields) {
            return '';
          }
        },
      ]
    },
  ]
};

var sections = [
  { id: "estimate", name: "Estimate", description: 'Build Estimate here on this tab' },
  { id: "actual", name: "Actual", description: 'After the job is complete, enter "Actual" values here to see your job cost report' }
];

var calcObj = {
  fields: {},
  values: []
};

var lup = {};

createTable = function () {
  jQuery("#summary-table").empty();

  var container = $("#summary-table");

  // calculate all values
  calcObj.values.forEach(function (obj) {
    Object.keys(calcFields).forEach(function (section) {
      calcFields[section].forEach(function (row) {
        row.cols.forEach(function (col) {
          if (row.id != 'title') {
            var calcValue = col.input ? obj[col.id] : col.calculation(obj, calcObj.fields)
            if (calcValue !== '') {
              calcValue = Math.round(calcValue * 100) / 100
              obj[col.id] = calcValue
            }
          }
        });
      })
    })
  })

  // create current section tables
  calcObj.values.forEach(function (obj, index) {
    var table = $("<table class='clickable' data-index='" + index + "' >");
    var tr1 = $("<tr class='row-title'>");
    tr1.append("<th colspan='6'>" + obj.name + "</th>");
    table.append(tr1);
    calcFields[sectionName].forEach(function (row) {
      var tr = $("<tr class='" + row.id + "'>");
      if (row.id == 'title') {
        tr.append("<th></th>");
      } else {
        tr.append("<td>" + row.name + "</td>");
      }
      row.cols.forEach(function (col) {
        if (col.hidden) {
          return
        }
        if (row.id == 'title') {
          tr.append("<th>" + col + "</th>");
        } else {
          var val = obj[col.id] !== undefined && !isNaN(obj[col.id]) ? obj[col.id] : ''
          var shade = col.shade && col.shade(val)
          tr.append("<td class='" + (shade || '') + "' format='" + col.format + "'>" + val + "</td>");
        }
        table.append(tr);
      });
    })
    container.append(table);
  })

  createOutputTables()

  createAddButton();
  createTableClickEvents();
  formatCurrencyDisplayFields();
  saveData();
  updateTotalCost();

};

function createOutputTables() {
  var profitTableCols = ['jobPrice', 'grossProfit', 'grossProfitPerc', 'netProfit', 'netProfitPerc']
  var costTableCols = ['Labor', 'Materials', 'Equipment', 'Subcontracting', 'Overhead', 'Breakeven']

  var obj = JSON.parse(JSON.stringify(calcObj.fields))

  obj.jobPriceEstimated = obj.finalPrice;
  obj.jobPriceActual = obj.finalPrice;

  obj.grossProfitEstimated = obj.finalPrice - obj.totalEstimatedCosts;
  obj.grossProfitPercEstimated = (obj.grossProfitEstimated / obj.finalPrice) * 100;

  obj.grossProfitActual = obj.finalPrice - obj.totalActualCosts;
  obj.grossProfitPercActual = (obj.grossProfitActual / obj.finalPrice) * 100;

  obj.LaborEstimated = 0;
  obj.LaborActual = 0;
  obj.MaterialsEstimated = 0;
  obj.MaterialsActual = 0;
  obj.EquipmentEstimated = 0;
  obj.EquipmentActual = 0;
  obj.SubcontractingEstimated = 0;
  obj.SubcontractingActual = 0;
  obj.OverheadEstimated = 0;
  obj.OverheadActual = 0;
  obj.BreakevenEstimated = 0;
  obj.BreakevenActual = 0;

  calcObj.values.forEach(function (item) {
    obj.LaborEstimated += item.laborHardCosts;
    obj.LaborActual += item.laborActualCosts;
    obj.MaterialsEstimated += item.materialHardCosts;
    obj.MaterialsActual += item.materialActualCosts;
    obj.EquipmentEstimated += item.equipmentHardCosts;
    obj.EquipmentActual += item.equipmentActualCosts;
    obj.SubcontractingEstimated += item.subcontractorHardCosts;
    obj.SubcontractingActual += item.subcontractorActualCosts;
    obj.OverheadEstimated += item.totalRecovered;
    obj.OverheadActual += item.totalActualRecovered;
    obj.BreakevenEstimated += item.totalBreakeven;
    obj.BreakevenActual += item.totalActualBreakeven;
  });

  jQuery("#output-table").empty();

  if (sectionName !== 'actual') {
    return
  }
  var container = $("#output-table");

  //calc values

  // create profit output table
  var profitTable = $("<table>");
  var tr1 = $("<tr>");
  tr1.append("<th></th>");
  tr1.append("<th>Job Price</th>");
  tr1.append("<th colspan='2'>Gross Profit</th>");
  tr1.append("<th colspan='2'>Net Profit</th>");
  profitTable.append(tr1);
  ['Estimated', 'Actual'].forEach(function (type) {
    var tr = $("<tr>");
    tr.append("<td>" + type + "</td>");
    profitTableCols.forEach(function (key) {
      var val = obj[key + type] !== undefined ? obj[key + type] : ''
      var shade = type == 'Actual' ? (val >= obj[key + 'Estimated'] ? 'green' : 'red') : ''
      var format = key.includes('Perc') ? 'percent' : 'currency'
      tr.append("<td class='" + (shade || '') + "' format='" + format + "'>" + val + "</td>");
      profitTable.append(tr);
    });
  })
  container.append(profitTable);

  // create profit output table
  var costTable = $("<table>");
  var tr2 = $("<tr>");
  tr2.append("<th></th>");
  costTableCols.forEach(function (key) {
    tr2.append("<th>" + key + "</th>");
  })
  costTable.append(tr2);
  ['Estimated', 'Actual'].forEach(function (type) {
    var tr = $("<tr>");
    tr.append("<td>" + type + "</td>");
    costTableCols.forEach(function (key) {
      var val = obj[key + type] !== undefined ? obj[key + type] : ''
      var shade = type == 'Actual' ? (val >= obj[key + 'Estimated'] ? 'red' : 'green') : ''
      var format = 'currency'
      tr.append("<td class='" + (shade || '') + "' format='" + format + "'>" + val + "</td>");
      costTable.append(tr);
    });
  })
  container.append(costTable);
}

createAddButton = function () {
  jQuery("#summary-table").append(
    '<a class="add-button" data-toggle="modal" data-target="#addDetailForm">Add workarea</a>'
  );

  jQuery(".add-button").click(function () {
    var form = $(this).parent();

    createEditPopup();
  });
};

createTableClickEvents = function () {
  jQuery("#summary-table table").click(function () {
    var selectedIndex = $(this).attr("data-index");
    createEditPopup(selectedIndex);
  });
};

formatCurrencyInputFields = function () {
  formatCurrency(jQuery("input[format='currency']"));
};

formatCurrencyDisplayFields = function () {
  jQuery("td[format='currency']").each((index, element) => {
    var value = jQuery(element).text();
    jQuery(element).text(displayCurrency(value));
  });
  jQuery("td[format='percent']").each((index, element) => {
    var value = jQuery(element).text();
    jQuery(element).text(displayPercent(value));
  });
};

createEditPopup = function (selectedIndex) {
  jQuery("#item-edit-popup").empty();

  var container = $("#item-edit-popup");
  var form = $("<" + "form>");

  //Fields
  var input_fields = [{ id: "name", name: 'Name', input: true, type: 'text', format: "text" }]
  var dyn_fields = []
  calcFields[sectionName].forEach(function (row) {
    var inputs = row.cols.filter(function (item) {
      return item.input;
    });
    dyn_fields = dyn_fields.concat(inputs)
  })

  input_fields = input_fields.concat(dyn_fields)

  input_fields.forEach(function (item) {
    var val = (calcObj.values[selectedIndex] || {})[item.id]
    if (val === undefined) {
      val = ''
    } else if (item.type === 'text' && item.format === 'currency') {
      val = formatNumber(val.toString())
    }
    form.append(
      "<label>" +
      item.name +
      ' </label><input id="' +
      item.id +
      '" value="' +
      (val) +
      '" type="' +
      item.type +
      '" name="' +
      item.id +
      '" format="' +
      item.format +
      '"> ' +
      " </input>"
    );
  });

  //save button
  form.append('<a class="submit-button">Save</a>');

  //cancel button
  form.append('<a class="cancel-button">Cancel</a>');

  //Delete button
  if (selectedIndex) {
    form.append('<a class="delete-button">Delete</a>');
  }

  container.append(form);
  jQuery("#addDetailForm").modal("show");

  //save handlers
  jQuery(".submit-button").click(function () {
    var form = $(this).parent();
    var data = getFormData(form);

    if (selectedIndex) {
      calcObj.values[selectedIndex] = Object.assign(calcObj.values[selectedIndex], data)
    } else {
      calcObj.values.push(data);
    }

    createTable();
    jQuery("#addDetailForm").modal("hide");

  });

  //delete handlers
  jQuery(".delete-button").click(function () {
    calcObj.values.splice(selectedIndex, 1);

    createTable();
    jQuery("#addDetailForm").modal("hide");
  });

  //cancel handlers
  jQuery(".cancel-button").click(function () {
    createTable();
    jQuery("#addDetailForm").modal("hide");
  });
};

saveData = function () {
  saveToGravityFormField();
  //Store to browser
  localStorage.setItem(STORAGE_KEY, JSON.stringify(calcObj));
  console.log(calcObj)
};

saveToGravityFormField = function () {
  var text = "";
  var dyn_fields = []
  Object.keys(calcFields).forEach(function (section) {
    dyn_fields = dyn_fields.concat(calcFields[section][1].cols.filter(function (item) {
      return item.input;
    }));
  })

  calcObj.values.forEach(function (obj) {
    text = text + obj.name + "\n";
    dyn_fields.forEach(function (item) {
      text = text + item.name + ": " + obj[item.id] + "\n";
    });
    text = text + "\n";
  });

  jQuery(".export-summary-json textarea").val(
    JSON.stringify(calcObj) + '*'
  );

  jQuery(".export-summary textarea").val(text);
};

updateTotalCost = function () {

  var totalEstimatedCosts = 0
  var totalBreakevenCosts = 0
  var finalPrice = 0
  var totalActualCosts = 0
  var totalActualBreakevenCosts = 0
  var netProfitEstimated = 0
  var netProfitPercEstimated = 0
  var netProfitActual = 0
  var netProfitPercActual = 0

  calcObj.values.forEach(function (obj) {
    totalEstimatedCosts += obj.totalHardCosts
    totalBreakevenCosts += obj.totalBreakeven
    finalPrice += obj.totalFinal

    totalActualCosts += obj.totalActualCosts
    totalActualBreakevenCosts += obj.totalActualBreakeven
  });

  netProfitEstimated = finalPrice - totalBreakevenCosts;
  netProfitPercEstimated = (netProfitEstimated / finalPrice) * 100;
  netProfitActual = finalPrice - totalActualBreakevenCosts;
  netProfitPercActual = (netProfitActual / finalPrice) * 100;

  calcObj.fields.totalEstimatedCosts = totalEstimatedCosts
  calcObj.fields.totalBreakevenCosts = totalBreakevenCosts
  calcObj.fields.finalPrice = finalPrice
  calcObj.fields.totalActualCosts = totalActualCosts
  calcObj.fields.totalActualBreakevenCosts = totalActualBreakevenCosts
  calcObj.fields.netProfitEstimated = netProfitEstimated
  calcObj.fields.netProfitPercEstimated = netProfitPercEstimated
  calcObj.fields.netProfitActual = netProfitActual
  calcObj.fields.netProfitPercActual = netProfitPercActual

  $("#" + lup.totalEstimatedCosts.id).eq(0).val(displayCurrency(totalEstimatedCosts));
  $("#" + lup.totalBreakevenCosts.id).eq(0).val(displayCurrency(totalBreakevenCosts));
  $("#" + lup.totalActualCosts.id).eq(0).val(displayCurrency(totalActualCosts));
  $("#" + lup.finalPrice.id).eq(0).val(displayCurrency(finalPrice));
  $("#" + lup.estimatedNetProfit.id).eq(0).val(displayCurrency(netProfitEstimated) + ' (' + displayPercent(netProfitPercEstimated) + ')');
  $("#" + lup.actualNetProfit.id).eq(0).val(displayCurrency(netProfitActual) + ' (' + displayPercent(netProfitPercActual) + ')');

};

createSectionTabs = function () {
  jQuery("#section-tabs").empty();

  var container = $("#section-tabs");

  var div = $("<div>");
  sections.forEach(function (section) {
    var tab = $("<div class='section-container' data-id='" + section.id + "'>");
    tab.append("<div class='section-tab'>" + section.name + "</div>");
    tab.append("<div class='section-description'>" + section.description + "</div>")
    div.append(tab)
  });
  container.append(div);

  jQuery("#section-tabs div.section-container").click(function () {
    sectionName = jQuery(this).attr("data-id");
    jQuery("#section-tabs div.section-container").removeClass("active");
    jQuery(this).addClass("active");
    jQuery(".calc_block").addClass("active");
    createTable();
    jQuery("#gform_fields_61").removeClass("estimate-active");
    jQuery("#gform_fields_61").removeClass("actual-active");
    jQuery("#gform_fields_61").addClass(sectionName + "-active");
  });
};

var setupButtonEvents = function () {
  jQuery(".clear-values").click(function () {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
    location.reload();
  });
  jQuery(".import-button").click(function () {
    var importStr = jQuery(".import-field").val() || "{}*"
    importStr = importStr.slice(0, -1);
    calcObj = Object.assign(
      calcObj,
      JSON.parse(importStr)
    );

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

  jQuery(".budget-values-toggle").click(function () {
    jQuery(".budget-values-toggle").toggleClass('open')
    jQuery(".budget-value").toggle();
  });
};

function setupFormInputs() {

  var budget = JSON.parse(localStorage.getItem("saved_budget1") || "{}");
  var overFields = ['materialRecovery', 'equipmentRecovery', 'subcontractorRecovery', 'laborRecovery', 'profitMargin', 'ratioLaborHours']
  overFields.forEach(function (field) {
    if (!calcObj.fields[field] && calcObj.fields[field] !== 0) {
      calcObj.fields[field] = budget[field]
    }
  })

  lup = {
    materialRecovery: {
      id: "input_61_29",
      format: 'percent'
    },
    equipmentRecovery: {
      id: "input_61_30",
      format: 'percent'
    },
    subcontractorRecovery: {
      id: "input_61_31",
      format: 'percent'
    },
    laborRecovery: {
      id: "input_61_28",
      format: 'percent'
    },
    profitMargin: {
      id: "input_61_32",
      format: 'percent'
    },
    ratioLaborHours: {
      id: "input_61_33",
      format: 'currency'
    },
    totalEstimatedCosts: {
      id: "input_61_13",
      format: 'currency'
    },
    totalBreakevenCosts: {
      id: "input_61_34",
      format: 'currency'
    },
    finalPrice: {
      id: "input_61_37",
      format: 'currency'
    },
    totalActualCosts: {
      id: "input_61_36",
      format: 'currency'
    },
    estimatedNetProfit: {
      id: "input_61_40",
      format: 'currency'
    },
    actualNetProfit: {
      id: "input_61_41",
      format: 'currency'
    },
    jobName: {
      id: "input_61_43",
      format: 'text'
    }
  };

  var reverseLup = {};

  // Set default values
  for (const key in lup) {
    const element = lup[key];
    if (calcObj.fields[key] || calcObj.fields[key] === 0) {
      $("#" + element.id).val(formatVal(calcObj.fields[key], lup[key].format));
    }
    reverseLup[element.id] = key;
  }

  gform.addAction(
    "gform_input_change",
    function (elem, formId, fieldId) {
      // Store entered value
      var field = reverseLup[elem.id]
      if (lup[field].format == 'text') {
        calcObj.fields[field] = elem.value
      } else {
        calcObj.fields[field] = Number(
          elem.value.replace(/[^0-9.-]+/g, "")
        );
      }

      createTable();
    }, 10, 3
  );
}

$(document).ready(function () {
  console.log("Synkedup ready!");

  calcObj = Object.assign(
    calcObj,
    JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
  );

  setupFormInputs()

  if (/[?&]onboarding=true/.test(location.search)) {
    console.log('onboarding')
    $(".email-field-block .gfield_label").hide();
    $("#gform_submit_button_53").val('Next');
  } else if (/[?&]return=budget/.test(location.search)) {
    console.log('return budget')
    $(".email-field-block .gfield_label").hide();
    $("#gform_submit_button_57").val('Finish and return to Budgeting Calculator');
  }

  setupButtonEvents();

  saveToGravityFormField();

  createSectionTabs();

  createTable("estimate");
  jQuery("#section-tabs div div[data-id='estimate']").addClass("active");
  jQuery("#gform_fields_61").addClass("estimate-active");
});

function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function (n, i) {
    var val = n["value"];
    if ((!val || val == '')) {
      val = '0'
    }
    if (val && val.length) {
      val = val.replace(/,/g, '')
    }
    indexed_array[n["name"]] = val
  });

  return indexed_array;
}

function displayCurrency(value) {
  if (value === undefined || value === null || isNaN(value) || value == '') {
    return ''
  }
  return (
    "$" +
    parseFloat(value, 10)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
      .toString()
  );
}

function displayPercent(value) {
  if (value === undefined || value === null || isNaN(value) || value == '') {
    return ''
  }
  return (
    parseFloat(value, 10)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
      .toString() + '%'
  );
}

function formatVal(value, type) {
  if (value === null || value === undefined) {
    return ''
  }
  if (type == 'currency') {
    return "$" + (isFinite(value) ? value.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : "")
  } else if (type == 'percent') {
    return (isFinite(value) ? value.toFixed(2) : "");
  } else if (type == 'date') {
    return value || "";
  } else {
    return value;
  }
}

function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.

  // get input value
  var input_val = input.val();

  // don't validate empty input
  if (input_val === "" || input_val === undefined) {
    return;
  }

  // original length
  var original_len = input_val.length;

  // initial caret position
  var caret_pos = input.prop("selectionStart");

  // check for decimal
  if (input_val.indexOf(".") >= 0) {
    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);

    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }

    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "$" + left_side + "." + right_side;
  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;

    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }

  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}
