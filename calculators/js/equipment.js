var equipment_fields = {
  Owned_Overhead: [
    { id: "name", name: "Name", input: true, type: "text" },
    {
      id: "quantity",
      formName: "Quantity",
      name: "Quantity",
      input: true,
      type: "number",
      format: "number",
    },
    {
      id: "purchase_price",
      formName: "Purchase price (Must factor in interest, taxes and inflation)",
      name: "Purchase price",
      input: true,
      type: "text",
      format: "currency",
    },
    {
      id: "years_used",
      formName: "How many years will you own this piece of equipment",
      name: "Years used",
      input: true,
      type: "number",
      format: "number",
    },
    {
      id: "sell_price",
      formName: "Selling price/value when you are done with it",
      name: "Sell price",
      input: true,
      type: "text",
      format: "currency",
    },
    {
      id: "annual_cost",
      name: "Annual cost to own",
      format: "currency",
      calculation: function (input) {
        return (
          (Number(input["Purchase price"]) - Number(input["Sell price"])) /
          input["Years used"]
        );
      },
    },
    {
      id: "total_cost",
      name: "Total Annual cost",
      format: "currency",
      calculation: function (input) {
        return (
          input["Quantity"] *
          ((Number(input["Purchase price"]) - Number(input["Sell price"])) /
            input["Years used"])
        );
      },
    },
  ],
  Owned_Hourly: [
    { id: "name", name: "Name", input: true, type: "text" },
    {
      id: "quantity",
      name: "Quantity",
      input: true,
      type: "number",
      format: "number",
    },
    {
      id: "purchase_price",
      formName: "Purchase price (Must factor in interest, taxes and inflation)",
      name: "Purchase price",
      input: true,
      type: "text",
      format: "currency",
    },
    {
      id: "years_used",
      formName: "How many years will you own this piece of equipment",
      name: "Years used",
      input: true,
      type: "number",
      format: "number",
    },
    {
      id: "sell_price",
      formName: "Selling price/value when you are done with it",
      name: "Sell price",
      input: true,
      type: "text",
      format: "currency",
    },
    {
      id: "billable_hours",
      name: "Total Billable hours per year",
      input: true,
      type: "number",
      format: "number",
    },
    {
      id: "annual_cost",
      name: "Annual cost to own",
      format: "currency",
      calculation: function (input) {
        return (
          (Number(input["Purchase price"]) - Number(input["Sell price"])) /
          input["Years used"]
        );
      },
    },
    {
      id: "total_cost",
      name: "Total Annual cost",
      format: "currency",
      calculation: function (input) {
        return (
          input["Quantity"] *
          ((Number(input["Purchase price"]) - Number(input["Sell price"])) /
            input["Years used"])
        );
      },
    },
    {
      id: "hourly_cost",
      name: "Hourly cost to run",
      format: "currency",
      calculation: function (input) {
        return (
          (Number(input["Purchase price"]) - Number(input["Sell price"])) /
          input["Years used"] /
          input["Total Billable hours per year"]
        );
      },
    },
  ],
  Leased_Overhead: [
    { id: "name", name: "Name", input: true, type: "text" },
    {
      id: "quantity",
      name: "Quantity",
      input: true,
      type: "number",
      format: "number",
    },
    {
      id: "monthly_payment",
      name: "Monthly payment",
      input: true,
      type: "text",
      format: "currency",
    },

    {
      id: "annual_cost",
      name: "Annual cost to own",
      format: "currency",
      calculation: function (input) {
        return Number(input["Monthly payment"]) * 12;
      },
    },
    {
      id: "total_cost",
      name: "Total Annual cost",
      format: "currency",
      calculation: function (input) {
        return input["Quantity"] * Number(input["Monthly payment"]) * 12;
      },
    },
  ],
  Leased_Hourly: [
    { id: "name", name: "Name", input: true, type: "text" },
    {
      id: "quantity",
      name: "Quantity",
      input: true,
      type: "number",
      format: "number",
    },
    {
      id: "monthly_payment",
      name: "Monthly payment",
      input: true,
      type: "text",
      format: "currency",
    },
    {
      id: "billable_hours",
      name: "Total Billable hours per year",
      input: true,
      type: "number",
      format: "number",
    },
    {
      id: "annual_cost",
      name: "Annual cost to own",
      format: "currency",
      calculation: function (input) {
        return Number(input["Monthly payment"]) * 12;
      },
    },
    {
      id: "total_cost",
      name: "Total Annual cost",
      format: "currency",
      calculation: function (input) {
        return input["Quantity"] * Number(input["Monthly payment"]) * 12;
      },
    },
    {
      id: "hourly_cost",
      name: "Hourly cost to run",
      format: "currency",
      calculation: function (input) {
        return (
          (Number(input["Monthly payment"]) * 12) /
          input["Total Billable hours per year"]
        );
      },
    },
  ],
  Misc_Tools: [
    { id: "name", name: "Name", input: true, type: "text" },
    {
      id: "total_cost",
      name: "Total Annual cost",
      input: true,
      type: "text",
      format: "currency",
    },
  ],
};

var sections = [
  { id: "Owned_Overhead", description: 'Equipment Recovered as Overhead Expense', name: "Owned Equipment Recovered in Overhead" },
  { id: "Leased_Overhead", description: '', name: "Leased Equipment Recovered in Overhead" },
  { id: "Misc_Tools", hasBorder: true, description: '', name: "Miscellaneous Tools" },
  { id: "Owned_Hourly", description: 'Billed-by-the-Unit Equipment - ie hourly or daily', name: "Owned Equipment Billed Hourly" },
  { id: "Leased_Hourly", description: '', name: "Leased Equipment Billed Hourly" },
  
];

var equipment = {
  Owned_Overhead: [],
  Owned_Hourly: [],
  Leased_Overhead: [],
  Leased_Hourly: [],
  Misc_Tools: [],
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

// formatCurrencyInputFields = function () {
//   formatCurrencyInput(jQuery("input[format='currency']"));
// };

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
      val = formatValCurrency(parseVal(val, 'currency'))
    }
    form.append(
      "<label>" +
      (item.formName || item.name) +
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

    //parse fields
    input_fields.forEach(function (item) {
      data[item.name] = parseVal(data[item.name], item.format)
    });

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
  localStorage.setItem("equipment", JSON.stringify(equipment));
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
  var totalOverhead = 0;
  var totalBillable = 0;

  Object.keys(equipment).forEach(function (section) {
    equipment[section].forEach(function (item) {
      if (section == 'Owned_Overhead' || section == 'Leased_Overhead' || section == 'Misc_Tools') {
        totalOverhead += Number(item["Total Annual cost"]);
      } else {
        totalBillable += Number(item["Total Annual cost"]);
      }
    });
  });

  jQuery(".total-equipment input").val(formatValCurrency(totalOverhead));
  jQuery(".total-equipment-billable input").val(formatValCurrency(totalBillable));

  var budget = localStorage.getItem("saved_budget1") ? JSON.parse(localStorage.getItem("saved_budget1")) : {}
  budget.equipmentOverhead = totalOverhead
  budget.equipmentBillable = totalBillable
  localStorage.setItem("saved_budget1", JSON.stringify(budget));

};

createSectionTabs = function () {
  jQuery("#section-tabs").empty();

  var container = $("#section-tabs");

  var div = $("<div>");
  sections.forEach(function (section) {
    var tab = $("<div class='section-container " + (section.hasBorder ? "section-border" : "") + "' data-id='" + section.id + "'>");
    section.description && tab.append("<div class='section-description'>" + section.description + "</div>")
    tab.append("<div class='section-tab'>" + section.name + "</div>");
    div.append(tab)
  });
  container.append(div);

  jQuery("#section-tabs div.section-container").click(function () {
    var selectedSectionID = jQuery(this).attr("data-id");
    jQuery("#section-tabs div.section-container").removeClass("active");
    jQuery(this).addClass("active");
    createTable(selectedSectionID);
    createTableClickEvents(selectedSectionID);
  });
};

var setupButtonEvents = function () {
  jQuery(".clear-values").click(function () {
    localStorage.setItem("equipment", JSON.stringify({}));
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
    JSON.parse(localStorage.getItem("equipment") || "{}")
  );

  if (/[?&]onboarding=true/.test(location.search)) {
    console.log('onboarding')
    $(".email-field-block .gfield_label").hide();
    $("#gform_submit_button_53").val('Next');
  } else if (/[?&]return=budget/.test(location.search)) {
    console.log('return budget')
    $(".email-field-block .gfield_label").hide();
    $("#gform_submit_button_53").val('Finish and return to Budgeting Calculator');
  }

  setupButtonEvents();

  saveToGravityFormField();

  console.log(equipment);

  createSectionTabs();

  createTable("Owned_Overhead");
  jQuery("#section-tabs div div[data-id='Owned_Overhead']").addClass("active");
  createTableClickEvents("Owned_Overhead");
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
