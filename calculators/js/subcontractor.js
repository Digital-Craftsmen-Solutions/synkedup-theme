var defaultExpenses = [
  { name: "Description", heading: true },
  { name: "Subcontractor 1", value: 0 },
  { name: "Subcontractor 2", value: 0 },
  { name: "Subcontractor 3", value: 0 },
  { name: "Subcontractor 4", value: 0 },
  { name: "Subcontractor 5", value: 0 },
  { name: "Subcontractor 6", value: 0 },
];

var expenses = JSON.parse(JSON.stringify(defaultExpenses))

var sections = [
  "Description"
];

var overheadSum = 0;

// Move to page two on initial load so the submit button works well
jQuery(document).on(
  "gform_post_render",
  function (event, form_id, current_page) {
    // code to trigger on form or form page render
    console.log(location.host)
    if (current_page == 1 && location.host != "localhost:8000") {
      $(".gform_next_button").eq(0).trigger("click");
    }
    $(".gform_next_button").hide();
  }
);

//format currency on input change and calc output
var refreshInputEventhandlers = function () {
  jQuery(".overhead-table td input").on("change", function () {
    calculateOutput();
  });

  jQuery(".overhead-table td:nth-child(3) input").on({
    keyup: function () {
      formatCurrency($(this));
    },
    blur: function () {
      formatCurrency($(this), "blur");
    },
  });

  // if update monthly, calc annual value
  jQuery(".overhead-table td:nth-child(2) input").on("change", function () {
    var annualField = $(this).parent().next().find("input");

    annualField.val(
      Number(
        $(this)
          .val()
          .replace(/[^0-9.-]+/g, "")
      ) * 12
    );
    formatCurrency(annualField);
    calculateOutput();
  });

  jQuery(".overhead-table td:nth-child(2) input").on({
    keyup: function () {
      formatCurrency($(this));
    },
    blur: function () {
      formatCurrency($(this), "blur");
    },
  });
};

var addToObject = function (obj, key, value, previous) {
  // Create a temp object and index variable
  var index = Object.keys(obj).indexOf(previous)
  var temp = {};
  var i = 0;

  // Loop through the original object
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {

      // Add the current item in the loop to the temp obj
      temp[prop] = obj[prop];

      // If the indexes match, add the new item
      if (i === index && key && value !== undefined) {
        temp[key] = value;
      }
      // Increase the count
      i++;

    }
  }

  // If no index, add to the end
  if (!index && key && value) {
    temp[key] = value;
  }

  return temp;
};

var addToArray = function (arr, key, value, previous) {
  for (var i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.name === key) {
      return arr
    }
  }

  if (sections.includes(key)) {
    arr.push({ name: key, heading: true })
    return arr
  }

  var newItem = { name: key, value: value }
  var found = false

  for (var i = 0; i < arr.length - 1; i++) {
    const item = arr[i];
    if (previous && item.name === previous) {
      arr.splice(i + 1, 0, newitem)
      found = true
      break
    }
  }

  if (!found) {
    arr.push(newItem)
  }

  return arr;
};

var calculateOutput = function () {
  overheadSum = 0;
  expenses = [];
  var previous_name = null;
  jQuery(".overhead-table td:nth-child(3) input").each(function (index, element) {
    expense_name = $(element).closest("tr").find("td:nth-child(1) input").val();

    expense_value = Number(
      $(element)
        .val()
        .replace(/[^0-9.-]+/g, "")
    );
    overheadSum = overheadSum + expense_value;

    expenses = addToArray(expenses, expense_name, expense_value, previous_name)
    previous_name = expense_name

  });

  jQuery(".overhead-total input").val(overheadSum);
  formatCurrency(jQuery(".overhead-total input"));

  if (overheadSum > 0) {
    // $(".gform_page:last-of-type .gform_page_footer").show();
    // $(".conversion-block").show();
  } else {
    // $(".gform_page:last-of-type .gform_page_footer").hide();
    // $(".conversion-block").hide();
  }

  var budget = localStorage.getItem("saved_budget1") ? JSON.parse(localStorage.getItem("saved_budget1")) : {}
  budget.subcontractorCosts = overheadSum
  localStorage.setItem("saved_budget1", JSON.stringify(budget));

  //Store to browser
  saveData();
};

var setupDefault = function () {
  // Get stored from localstroage

  expenses = localStorage.getItem("saved_subcontractor1") ? JSON.parse(localStorage.getItem("saved_subcontractor1")) : expenses

  for (let index = 0; index <= expenses.length - 2; index++) {
    jQuery(".add_list_item").eq(0).click();
  }

  refreshInputEventhandlers();

  jQuery(".overhead-table tbody tr").each(function (index, element) {
    var expense = expenses[index];

    $(element).find("td:nth-child(1) input").val(expense.name);

    // if section row, hide inputs
    if (expense.heading) {
      $(element).addClass("section-heading");
    } else {
      $(element)
        .find("td:nth-child(3) input")
        .val(expense.value == 0 ? "" : expense.value);

      formatCurrency($(element).find("td:nth-child(3) input"));
    }
  });
};

var setupTotal = function () {
  formatCurrency(jQuery(".overhead-total input"));
};

var setupButtonEvents = function () {
  jQuery(".clear-values").click(function () {
    localStorage.setItem("saved_subcontractor1", JSON.stringify(defaultExpenses));
    location.reload();
  });
  jQuery(".import-button").click(function () {
    var importStr = jQuery(".import-field").val() || "{}*"
    importStr = importStr.slice(0, -1);
    expenses = jQuery(".import-field").val() ? JSON.parse(importStr) : expenses

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

saveData = function () {
  saveToGravityFormField();
  //Store to browser
  if (expenses && expenses.length > 0) {
  localStorage.setItem("saved_subcontractor1", JSON.stringify(expenses));
  }
};

saveToGravityFormField = function () {
  var text = "";

  expenses.forEach(function (item) {
    if (item.heading) {
      text = text + "\n" + item.name + "\n";
    } else {
      text = text + item.name + ": " + item.value + "\n";
    }
  });

  jQuery(".export-summary-json textarea").val(
    JSON.stringify(expenses) + '*'
  );

  jQuery(".export-summary textarea").val(text);
};

$(document).ready(function () {
  console.log("Synkedup ready!");

  $(".gform_footer").hide();
  // $(".gform_page_footer").hide();
  $(".gform_page").show();
  $(".tab_page").show();
  $("#donutchart").hide();
  // $(".conversion-block").hide();

  if (/[?&]onboarding=true/.test(location.search)) {
    console.log('onboarding')
    $(".email-field-block .gfield_label").hide();
    $("#gform_submit_button_58").val('Next');
  } else if (/[?&]return=budget/.test(location.search)) {
    console.log('return budget')
    $(".email-field-block .gfield_label").hide();
    $("#gform_submit_button_58").val('Finish and return to Budgeting Calculator');
  }

  setupDefault();
  calculateOutput();

  setupTotal();
  setupButtonEvents();
  saveToGravityFormField();

  gform.addAction("gform_list_post_item_delete", function (container) {
    calculateOutput();
  });

  gform.addAction("gform_list_post_item_add", function (item, container) {
    // do stuff
    refreshInputEventhandlers();
  });
});

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
