var equipment_fields = {
  hourly_employees: [
    {
      id: 'role',
      name: 'Role',
      input: true,
      type: 'text',
    },
    {
      id: 'name',
      name: 'Name',
      input: true,
      type: 'text',
    },
    {
      id: 'hourly_wage',
      name: 'Hourly wage',
      input: true,
      type: 'number',
      format: 'currency'
    },
    {
      id: 'hours_worked',
      name: 'Total hours worked per year',
      input: true,
      type: 'number',
    },
    {
      id: 'unbillable_hours',
      name: 'Unbillable hours per year',
      input: true,
      type: 'number',
    },
    {
      id: 'overtime_hours',
      name: 'Overtime hours',
      input: true,
      type: 'number',
    },
    {
      id: 'overtime_multiplier',
      name: 'Overtime multiplier',
      input: true,
      type: 'number',
    },
    {
      id: 'bonuses',
      name: 'Bonuses',
      input: true,
      type: 'number',
      format: 'currency'
    },
    {
      id: 'total_compensation',
      name: 'Total compensation',
      format: "currency",
      calculation: function (input) {
        return (
          (Number(input["Hourly wage"]) * ( Number(input["Total hours worked per year"]) -  Number(input["Overtime hours"]) )) +
          (Number(input["Hourly wage"]) * (Number(input["Overtime hours"])) * (Number(input["Overtime multiplier"] || 1))) + Number(input["Bonuses"])
        )
      }
    }
  ],
  salary_employees: [
    {
      id: 'role',
      name: 'Role',
      input: true,
      type: 'text',
    },
    {
      id: 'name',
      name: 'Name',
      input: true,
      type: 'text',
    },
    {
      id: 'annual_salary',
      name: 'Annual salary',
      input: true,
      type: 'number',
      format: 'currency'
    },
    {
      id: 'hours_worked',
      name: 'Total hours worked per year',
      input: true,
      type: 'number',
    },
    {
      id: 'unbillable_hours',
      name: 'Unbillable hours per year',
      input: true,
      type: 'number',
    },
    {
      id: 'overtime_hours',
      name: 'Overtime hours',
      input: true,
      type: 'number',
    },
    {
      id: 'bonuses',
      name: 'Bonuses',
      input: true,
      type: 'number',
      format: 'currency'
    },
    {
      id: 'total_compensation',
      name: 'Total compensation',
      format: "currency",
      calculation: function (input) {
        return (
          Number(input["Annual salary"]) + Number(input["Bonuses"])
        )
      }
    }
  ]
};

var sections = [
  { id: "hourly_employees", name: "Hourly Employees" },
  { id: "salary_employees", name: "Salary Employees" },
];

var equipment = {
  hourly_employees: [],
  salary_employees: [],
};

createTable = function (section_name) {
  jQuery("#summary-table").empty();

  var container = $("#summary-table"),
    table = $("<table>");

  //Header
  var tr = $("<tr>");
  equipment_fields[section_name].forEach(function (attr) {
    tr.append("<th>" + attr.name + "</th>");
  });
  table.append(tr);

  // Rows
  equipment[section_name].forEach(function (item, index) {
    var tr = $("<tr data-index='" + index + "' >");
    equipment_fields[section_name].forEach(function (attr) {
      tr.append(
        "<td format='" + attr.format + "'>" + item[attr.name] + "</td>"
      );
    });
    table.append(tr);
  });

  container.append(table);
  createAddButton(section_name);
  formatCurrencyDisplayFields();
};

createAddButton = function (section_name) {
  jQuery("#summary-table").append(
    '<a class="add-button" data-toggle="modal" data-target="#addDetailForm">Add</a>'
  );

  jQuery(".add-button").click(function () {
    var form = $(this).parent();

    createEditPopup(section_name);
  });
};

createTableClickEvents = function (section_name) {
  jQuery("#summary-table tr").click(function () {
    var selectedIndex = $(this).attr("data-index");
    createEditPopup(section_name, selectedIndex);
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
};

createEditPopup = function (section_name, selectedIndex) {
  jQuery("#item-edit-popup").empty();

  var container = $("#item-edit-popup");
  var form = $("<" + "form>");

  //Fields
  var input_fields = equipment_fields[section_name].filter(function (item) {
    return item.input;
  });

  var calculated_fields = equipment_fields[section_name].filter(function (
    item
  ) {
    return item.calculation;
  });

  input_fields.forEach(function (item) {
    var val = ((equipment[section_name][selectedIndex] || {})[item.name] || "")
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
      val +
      '" type="' +
      item.type +
      '" name="' +
      item.name +
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
  $("#addDetailForm").modal("show");

  //save handlers
  jQuery(".submit-button").click(function () {
    var form = $(this).parent();
    var data = getFormData(form);

    //Save calculated Values
    calculated_fields.forEach(function (item) {
      data[item.name] = item.calculation(data);
    });

    if (selectedIndex) {
      equipment[section_name][selectedIndex] = data;
    } else {
      equipment[section_name].push(data);
    }

    saveData();
    updateTotalCost();

    createTable(section_name);
    createTableClickEvents(section_name);
    jQuery("#addDetailForm").modal("hide");

    console.log(data);
  });

  //delete handlers
  jQuery(".delete-button").click(function () {
    equipment[section_name].splice(selectedIndex, 1);

    saveData();
    updateTotalCost();

    createTable(section_name);
    createTableClickEvents(section_name);
    jQuery("#addDetailForm").modal("hide");
  });

  //cancel handlers
  jQuery(".cancel-button").click(function () {
    createTable(section_name);
    createTableClickEvents(section_name);
    jQuery("#addDetailForm").modal("hide");
  });
};

saveData = function () {
  saveToGravityFormField();
  //Store to browser
  localStorage.setItem("saved_labor", JSON.stringify(equipment));
};

saveToGravityFormField = function () {
  var text = "";

  Object.keys(equipment).forEach(function (section) {
    text = text + section.replace("_", " ") + "\n";
    equipment[section].forEach(function (item) {
      Object.keys(item).forEach(function (property) {
        text = text + property + ": " + item[property] + "\n";
      });
      text = text + "\n";
    });
    text = text + "\n";
  });

  jQuery(".export-summary-json textarea").val(
    JSON.stringify(equipment) + '*'
  );

  jQuery(".export-summary textarea").val(text);
};

updateTotalCost = function () {
  var total = 0;
  var totalHourly = 0;
  var totalSalary = 0;
  var hours = 0;
  var hoursHourly = 0;
  var hoursSalary = 0;
  var unbillable = 0;
  var unbillableHourly = 0;
  var unbillableSalary = 0;
  var unbillablePerc = 0;
  var overtimeHours = 0;
  var overtime = 0;
  var avgCostHourly = 0;
  var avgCostSalary = 0;
  var avgCost = 0;

  Object.keys(equipment).forEach(function (section) {
    equipment[section].forEach(function (item) {
      if (section == 'hourly_employees') {
        totalHourly += Number(item["Total compensation"]);
        hoursHourly += Number(item["Total hours worked per year"]);
        unbillableHourly += Number(item["Unbillable hours per year"]);
        overtimeHours += Number(item["Overtime hours"]);
      } else {
        totalSalary += Number(item["Total compensation"]);
        hoursSalary += Number(item["Total hours worked per year"]);
        unbillableSalary += Number(item["Unbillable hours per year"]);
        overtimeHours += Number(item["Overtime hours"]);
      }
    });
  });

  total = totalHourly + totalSalary
  hours = hoursHourly + hoursSalary
  unbillable = unbillableHourly + unbillableSalary

  unbillablePerc = hours ? (unbillable / hours) * 100 : 0
  unbillablePerc = Math.round(unbillablePerc * 10) / 10

  overtime = hoursHourly ? (overtimeHours / hoursHourly) * 100 : 0
  overtime = Math.round(overtime * 10) / 10

  avgCost = hours ? (total / hours) : 0

  jQuery(".total-labor-cost input").val(total);
  formatCurrency(jQuery(".total-labor-cost input"));
  jQuery(".total-labor-hours input").val(hours);
  jQuery(".total-labor-unbillable input").val(unbillable);
  jQuery(".total-labor-unbillable-perc input").val(unbillablePerc + '%');
  jQuery(".total-labor-overtime input").val(overtime + '%');
  jQuery(".total-labor-avg-cost-hr input").val(avgCost);
  formatCurrency(jQuery(".total-labor-avg-cost-hr input"));

  var budget = localStorage.getItem("saved_budget1") ? JSON.parse(localStorage.getItem("saved_budget1")) : {}
  budget.laborCosts = total
  budget.laborHours = hours
  budget.laborUnbillable = unbillable
  localStorage.setItem("saved_budget1", JSON.stringify(budget));
};

createSectionTabs = function () {
  jQuery("#section-tabs").empty();

  var container = $("#section-tabs");

  var div = $("<div>");
  sections.forEach(function (section) {
    div.append("<div data-id='" + section.id + "' >" + section.name + "</div>");
  });
  container.append(div);

  jQuery("#section-tabs div div").click(function () {
    var selectedSectionID = jQuery(this).attr("data-id");
    jQuery("#section-tabs div div").removeClass("active");
    jQuery(this).addClass("active");
    createTable(selectedSectionID);
    createTableClickEvents(selectedSectionID);
  });
};

var setupButtonEvents = function () {
  jQuery(".clear-values").click(function () {
    localStorage.setItem("saved_labor", JSON.stringify({}));
    location.reload();
  });
  jQuery(".import-button").click(function () {
    var importStr = jQuery(".import-field").val() || "{}*"
    importStr = importStr.slice(0, -1);
    equipment = Object.assign(
      equipment,
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
};

$(document).ready(function () {
  console.log("Synkedup ready!");

  equipment = Object.assign(
    equipment,
    JSON.parse(localStorage.getItem("saved_labor") || "{}")
  );

  if (/[?&]onboarding=true/.test(location.search)) {
    console.log('onboarding')
    $(".email-field-block .gfield_label").hide();
    $("#gform_submit_button_59").val('Next');
  } else if (/[?&]return=budget/.test(location.search)) {
    console.log('return budget')
    $(".email-field-block .gfield_label").hide();
    $("#gform_submit_button_59").val('Finish and return to Budgeting Calculator');
  }

  setupButtonEvents();

  saveToGravityFormField();

  console.log(equipment);

  createSectionTabs();

  createTable("hourly_employees");
  jQuery("#section-tabs div div[data-id='hourly_employees']").addClass("active");
  createTableClickEvents("hourly_employees");
  updateTotalCost();
});

function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function (n, i) {
    indexed_array[n["name"]] = n["value"];
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
