var googleChart,
  googleChartData,
  googleChartOptions,
  lookup = {};

var calculation_inputs = [];

var setupHelpIcons = function () {
  jQuery(".input-inline-help .gfield_description").click(function () {
    console.log(this);

    jQuery(".inline-help").hide();

    jQuery(this).parent().next().show();
  });

  jQuery(".help-modal").click(function () {
    if (event.target.className == "help-modal") {
      jQuery(".inline-help").hide();
    }
  });

  jQuery(".help-close").click(function () {
    jQuery(".inline-help").hide();
  });
};

// Set up Google chart
var createGoogleChart = function () {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  googleChartOptions = {
    pieHole: 0.4,
    colors: ["#ff6384", "#36a2eb", "#ffcd56"],
    pieSliceText: "label",
    chartArea: { left: 10, top: 20, width: "100%", height: "100%" },
    legend: { position: "top" },
    tooltip: { trigger: "none" }
  };

  function drawChart() {
    googleChartData = google.visualization.arrayToDataTable([
      ["Component", "$"],
      ["Overhead", 0],
      ["Hard Cost", 0],
      ["Profit", 0],
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

  googleChartData.insertRows(0, [
    ["Overhead", Number(data.overhead_recovered.toFixed(2))],
  ]);
  googleChartData.insertRows(1, [
    ["Hard Cost", Number(data.manhour_cost.toFixed(2))],
  ]);
  googleChartData.insertRows(2, [["Profit", Number(data.profit.toFixed(2))]]);

  var formatter = new google.visualization.NumberFormat({
    prefix: "$",
  });

  formatter.format(googleChartData, 1);
  googleChart.draw(googleChartData, googleChartOptions);
}

// Calculate the results of the calculator
function calculateOutput() {
  manhour_cost =
    calculation_inputs[lookup.labour_cost] /
    calculation_inputs[lookup.labour_hours];

  annual_overhead_calc =
    calculation_inputs[lookup.unbillable_hours] * manhour_cost +
    calculation_inputs[lookup.overhead_cost];

  var labour_hours = calculation_inputs[lookup.labour_hours]
  var billable_man_hours = calculation_inputs[lookup.labour_hours] - calculation_inputs[lookup.unbillable_hours]
  var unbillable_cost = calculation_inputs[lookup.unbillable_hours] * manhour_cost

  var billable_breakeven = (calculation_inputs[lookup.labour_cost] + calculation_inputs[lookup.overhead_cost]) / billable_man_hours

  //Outputs
  overhead_recovered = billable_breakeven - manhour_cost;
  overhead_markup = (overhead_recovered / manhour_cost)

  profit =
    (manhour_cost + overhead_recovered) /
    (1 - calculation_inputs[lookup.net_profit] / 100) -
    (manhour_cost + overhead_recovered);
  manhour_price = manhour_cost + overhead_recovered + profit;

  jQuery("#" + lookup.manhour_cost)
    .eq(0)
    .val("$" + (isFinite(manhour_cost) ? manhour_cost.toFixed(2) : ""));
  jQuery("#" + lookup.overhead_recovered)
    .eq(0)
    .val(
      "$" + (isFinite(overhead_recovered) ? overhead_recovered.toFixed(2) : "")
    );
  jQuery("#" + lookup.overhead_markup)
    .eq(0)
    .val(
      (isFinite(overhead_markup) ? (overhead_markup * 100).toFixed(2) + "%" : "")
    );
  jQuery("#" + lookup.profit)
    .eq(0)
    .val("$" + (isFinite(profit) ? profit.toFixed(2) : ""));
  jQuery("#" + lookup.manhour_price)
    .eq(0)
    .val("$" + (isFinite(manhour_price) ? manhour_price.toFixed(2) : ""));

  // Hide values for lite version
  jQuery("#" + lookup.overhead_recovered)
    .eq(0)
    .val("");
  jQuery("#" + lookup.profit)
    .eq(0)
    .val("");
  jQuery("#" + lookup.manhour_price)
    .eq(0)
    .val("");
  jQuery("#" + lookup.manhour_difference)
    .eq(0)
    .val("");

  if (labour_hours > 1) {
    jQuery("#" + lookup.unbillable_hours_description)
      .eq(0)
      .html("Now, how many of these " + labour_hours + " hours were UNBILLABLE?");
  }

  // Update Google Chart
  if (overhead_recovered && manhour_cost && profit) {
    jQuery(".chart-placeholder").hide();
    jQuery("#donutchart").show();
    jQuery(".gform_page:last-of-type .gform_page_footer").show();
    jQuery(".conversion-block").show();
    updateChart({
      manhour_cost: manhour_cost,
      overhead_recovered: overhead_recovered,
      profit: profit,
    });
  } else {
    jQuery(".chart-placeholder").show();
    jQuery("#donutchart").hide();
    jQuery(".gform_page:last-of-type .gform_page_footer").hide();
    jQuery(".conversion-block").hide();
    updateChart({
      manhour_cost: 0,
      overhead_recovered: 0,
      profit: 0,
    });
  }
}

// Move to page two on initial load so the submit button works well
jQuery(document).on(
  "gform_post_render",
  function (event, form_id, current_page) {
    // code to trigger on form or form page render
    if (current_page == 1 && location.host != "localhost:8000") {
      jQuery(".gform_next_button").eq(0).trigger("click");
    }
    jQuery(".gform_next_button").css("visibility", "hidden");
  }
);

jQuery(document).ready(function () {
  console.log("Synkedup ready!");

  jQuery(".gform_footer").hide();
  jQuery(".gform_page:first-of-type .gform_page_footer").css("visibility", "hidden")
  jQuery(".gform_page").show();
  jQuery("#donutchart").hide();
  jQuery(".conversion-block").hide();

  createGoogleChart();
  setupHelpIcons();

  lookup = {
    labour_cost: "input_96_6",
    labour_hours: "input_96_7",
    unbillable_hours: "input_96_8",
    unbillable_hours_description: "gfield_description_96_8",
    overhead_cost: "input_96_9",
    net_profit: "input_96_10",
    manhour_cost: "input_96_4",
    overhead_recovered: "input_96_11",
    profit: "input_96_12",
    manhour_price: "input_96_13",
    overhead_markup: "input_96_23",
    manhour_current: "input_96_24",
    manhour_difference: "input_96_25",
  };

  // Set default values
  for (const key in lookup) {
    const element = lookup[key];
    calculation_inputs[element] = Number(
      jQuery("#" + element)
        .val()
        .replace(/[^0-9.-]+/g, "")
    );
  }

  const lockIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-icon lucide-lock lock-icon"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'

  // Hide values for lite version
  jQuery("#" + lookup.overhead_markup).hide();
  jQuery("#" + lookup.overhead_recovered).after(lockIcon)
  jQuery("#" + lookup.profit).after(lockIcon)
  jQuery("#" + lookup.manhour_price).after(lockIcon)
  jQuery("#" + lookup.manhour_difference).after(lockIcon)

  gform.addAction(
    "gform_input_change",
    function (elem, formId, fieldId) {
      // Store entered value
      calculation_inputs[elem.id] = Number(
        elem.value.replace(/[^0-9.-]+/g, "")
      );

      calculateOutput();
    },
    10,
    3
  );
});
