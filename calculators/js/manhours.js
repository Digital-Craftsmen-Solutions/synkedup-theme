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
  manhour_difference = calculation_inputs[lookup.manhour_current] - manhour_price
  underCharge = manhour_difference < 0
  manhour_season = manhour_difference * calculation_inputs[lookup.labour_hours]

  var priceText = calculation_inputs[lookup.manhour_current]
  var chargeText = underCharge ? 'At $' + priceText.toFixed(2) + ', you are currently undercharging per hour' : 'At $' + priceText.toFixed(2) + ',you are currently higher than your goal per hour';

  jQuery("#" + lookup.manhour_cost).eq(0)
    .val("$" + (isFinite(manhour_cost) ? manhour_cost.toFixed(2) : ""));

  jQuery("#" + lookup.overhead_recovered).eq(0)
    .val("$" + (isFinite(overhead_recovered) ? overhead_recovered.toFixed(2) : ""))
    ;
  jQuery("#" + lookup.overhead_markup).eq(0)
    .val((isFinite(overhead_markup) ? (overhead_markup * 100).toFixed(2) + "%" : ""));

  jQuery("#" + lookup.profit).eq(0)
    .val("$" + (isFinite(profit) ? profit.toFixed(2) : ""));

  jQuery("#" + lookup.manhour_price).eq(0)
    .val("$" + (isFinite(manhour_price) ? manhour_price.toFixed(2) : ""));

  jQuery("#" + lookup.manhour_difference).eq(0)
    .val("$" + (isFinite(manhour_difference) ? manhour_difference.toFixed(2) : ""));

  jQuery("#" + lookup.manhour_difference).eq(0).removeClass('output-red');
  jQuery("#" + lookup.manhour_difference).eq(0).removeClass('output-green');
  jQuery("#" + lookup.manhour_difference).eq(0).addClass(underCharge ? 'output-red' : 'output-green');
  jQuery("#field_46_25 > label").text(chargeText);

  jQuery("#" + lookup.manhour_season).eq(0).val("$" + (isFinite(manhour_season) ? manhour_season.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : ""));
  jQuery("#" + lookup.manhour_season).eq(0).addClass('output-red');
  if (!underCharge) {
    jQuery("#field_46_26").addClass('hidden')
  }

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
    jQuery(".conversion-block").removeClass('hidden')
    if (underCharge) {
      jQuery("#field_46_26").removeClass('hidden')
    } else {
      jQuery("#field_46_26").addClass('hidden')
    }
    updateChart({
      manhour_cost: manhour_cost,
      overhead_recovered: overhead_recovered,
      profit: profit,
    });
  } else {
    jQuery(".chart-placeholder").show();
    jQuery("#donutchart").hide();
    jQuery(".gform_page:last-of-type .gform_page_footer").hide();
    jQuery(".conversion-block").addClass('hidden')
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
  jQuery(".conversion-block").addClass('hidden')

  createGoogleChart();
  setupHelpIcons();

  lookup = {
    labour_cost: "input_46_6",
    labour_hours: "input_46_7",
    unbillable_hours: "input_46_8",
    unbillable_hours_description: "gfield_description_46_8",
    overhead_cost: "input_46_9",
    net_profit: "input_46_10",
    manhour_cost: "input_46_4",
    overhead_recovered: "input_46_11",
    profit: "input_46_12",
    manhour_price: "input_46_13",
    overhead_markup: "input_46_23",
    manhour_current: "input_46_24",
    manhour_difference: "input_46_25",
    manhour_season: "input_46_26"
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