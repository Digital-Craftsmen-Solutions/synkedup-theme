 var googleChart,
  googleChartData,
  googleChartOptions,
  lookup = {};

var calculation_inputs = [];

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

// Set up Google chart
var createGoogleChart = function () {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  googleChartOptions = {
    pieHole: 0.4,
    colors: ["#ff6384", "#36a2eb", "#ffcd56"],
    pieSliceText: "value",
    chartArea: { left: 10, top: 20, width: "100%", height: "100%" },
    legend: { position: "top" },
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

  overhead_markup =
    annual_overhead_calc / calculation_inputs[lookup.labour_cost];

  //Outputs
  overhead_recovered = manhour_cost * overhead_markup;
  profit =
    (manhour_cost + overhead_recovered) /
      (1 - calculation_inputs[lookup.net_profit] / 100) -
    (manhour_cost + overhead_recovered);
  manhour_price = manhour_cost + overhead_recovered + profit;

  $("#" + lookup.manhour_cost)
    .eq(0)
    .val("$" + (isFinite(manhour_cost) ? manhour_cost.toFixed(2) : ""));
  $("#" + lookup.overhead_recovered)
    .eq(0)
    .val(
      "$" + (isFinite(overhead_recovered) ? overhead_recovered.toFixed(2) : "")
    );
  $("#" + lookup.profit)
    .eq(0)
    .val("$" + (isFinite(profit) ? profit.toFixed(2) : ""));
  $("#" + lookup.manhour_price)
    .eq(0)
    .val("$" + (isFinite(manhour_price) ? manhour_price.toFixed(2) : ""));

  // Update Google Chart
  if (overhead_recovered && manhour_cost && profit) {
    $(".chart-placeholder").hide();
    $("#donutchart").show();
    $(".gform_page:last-of-type .gform_page_footer").show();
    $(".conversion-block").show();
    updateChart({
      manhour_cost: manhour_cost,
      overhead_recovered: overhead_recovered,
      profit: profit,
    });
  } else {
    $(".chart-placeholder").show();
    $("#donutchart").hide();
    $(".gform_page:last-of-type .gform_page_footer").hide();
    $(".conversion-block").hide();
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
      $(".gform_next_button").eq(0).trigger("click");
    }
    $(".gform_next_button").hide();
  }
);

$(document).ready(function () {
  console.log("Synkedup ready!");

  $(".gform_footer").hide();
  $(".gform_page_footer").hide();
  $(".gform_page").show();
  $("#donutchart").hide();
  $(".conversion-block").hide();

  createGoogleChart();
  setupHelpIcons();

  lookup = {
    labour_cost: "input_46_6",
    labour_hours: "input_46_7",
    unbillable_hours: "input_46_8",
    overhead_cost: "input_46_9",
    net_profit: "input_46_10",
    manhour_cost: "input_46_4",
    overhead_recovered: "input_46_11",
    profit: "input_46_12",
    manhour_price: "input_46_13",
  };

  // Set default values
  for (const key in lookup) {
    const element = lookup[key];
    calculation_inputs[element] = Number(
      $("#" + element)
        .val()
        .replace(/[^0-9.-]+/g, "")
    );
  }

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
