(function ($) {

  var STORAGE_KEY = "saved_budget1"
  // TEMPORARY DISABLE ONBOARDING
  var onboardingEnabled = false
  var googleChart,
    googleChart1,
    googleChart2,
    googleChartData,
    googleChartData1,
    googleChartData2,
    googleChartOptions,
    lup = {},
    reverseLup = {};

  var calcObj = {};
  var formats = {};
  var outlookTabs = ['production_outlook_total', 'production_outlook_labor', 'production_outlook_materials', 'production_outlook_equipment', 'production_outlook_subcontractor'];
  var outlookTabsIndex = 0;

  var summaryTables = {
    production_outlook_labor: [
      { id: 'title', head: 'Production Outlook', name: 'Labor', cols: ['Billable hours needed', 'Unbillable hrs allocated', 'Your Cost', 'Total Revenue Needed'], tabs: 'outlookTab' },
      {
        id: 'perSeason', name: 'per season', cols: [
          {
            id: "perSeasonLaborHours", format: "number", calculation: function (obj, fields) {
              return obj.laborHours
            }
          },
          {
            id: "perSeasonLaborUnbillable", format: "number", calculation: function (obj, fields) {
              return obj.laborUnbillable
            }
          },
          {
            id: "perSeasonLaborCost", format: "currency", calculation: function (obj, fields) {
              return obj.perSeasonLaborHours * obj.ratioLaborHours
            }
          },
          {
            id: "perSeasonLaborRevenue", format: "currency", calculation: function (obj, fields) {
              var l63 = obj.perSeasonLaborCost * (obj.laborRecovery / 100)
              var m63 = (obj.perSeasonLaborCost + l63) / (1 - (obj.profitMargin / 100)) - (obj.perSeasonLaborCost + l63)
              obj.perSeasonLaborProfit = m63
              return obj.perSeasonLaborCost + l63 + m63
            }
          },
        ]
      },
      {
        id: 'perMonth', name: 'per month', cols: [
          {
            id: "perMonthLaborHours", format: "number", calculation: function (obj, fields) {
              return (obj.perSeasonLaborHours / obj.productionDays) * 20
            }
          },
          {
            id: "perMonthLaborUnbillable", format: "number", calculation: function (obj, fields) {
              return (obj.perSeasonLaborUnbillable / obj.productionDays) * 20
            }
          },
          {
            id: "perMonthLaborCost", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonLaborCost / obj.productionDays) * 20
            }
          },
          {
            id: "perMonthLaborRevenue", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonLaborRevenue / obj.productionDays) * 20
            }
          },
        ]
      },
      {
        id: 'perWeek', name: 'per week', cols: [
          {
            id: "perWeekLaborHours", format: "number", calculation: function (obj, fields) {
              return (obj.perSeasonLaborHours / obj.productionDays) * 5
            }
          },
          {
            id: "perWeekLaborUnbillable", format: "number", calculation: function (obj, fields) {
              return (obj.perSeasonLaborUnbillable / obj.productionDays) * 5
            }
          },
          {
            id: "perWeekLaborCost", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonLaborCost / obj.productionDays) * 5
            }
          },
          {
            id: "perWeekLaborRevenue", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonLaborRevenue / obj.productionDays) * 5
            }
          },
        ]
      },
      {
        id: 'perDay', name: 'per day', cols: [
          {
            id: "perDayLaborHours", format: "number", calculation: function (obj, fields) {
              return obj.perSeasonLaborHours / obj.productionDays
            }
          },
          {
            id: "perDayLaborUnbillable", format: "number", calculation: function (obj, fields) {
              return obj.perSeasonLaborUnbillable / obj.productionDays
            }
          },
          {
            id: "perDayLaborCost", format: "currency", calculation: function (obj, fields) {
              return obj.perSeasonLaborCost / obj.productionDays
            }
          },
          {
            id: "perDayLaborRevenue", format: "currency", calculation: function (obj, fields) {
              return obj.perSeasonLaborRevenue / obj.productionDays
            }
          },
        ]
      },
    ],
    production_outlook_materials: [
      { id: 'title', head: 'Production Outlook', name: 'Materials', cols: ['Your Cost', 'Total Revenue Needed'], tabs: 'outlookTab' },
      {
        id: 'perSeason', name: 'per season', cols: [
          {
            id: "perSeasonMaterialCost", format: "currency", calculation: function (obj, fields) {
              return obj.materialCosts
            }
          },
          {
            id: "perSeasonMaterialRevenue", format: "currency", calculation: function (obj, fields) {
              var l70 = obj.perSeasonMaterialCost * (obj.materialRecovery / 100)
              var m70 = (obj.perSeasonMaterialCost + l70) / (1 - (obj.profitMargin / 100)) - (obj.perSeasonMaterialCost + l70)
              obj.perSeasonMaterialProfit = m70
              return obj.perSeasonMaterialCost + l70 + m70
            }
          },
        ]
      },
      {
        id: 'perMonth', name: 'per month', cols: [
          {
            id: "perMonthMaterialCost", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonMaterialCost / obj.productionDays) * 20
            }
          },
          {
            id: "perMonthMaterialRevenue", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonMaterialRevenue / obj.productionDays) * 20
            }
          },
        ]
      },
      {
        id: 'perWeek', name: 'per week', cols: [
          {
            id: "perWeekMaterialCost", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonMaterialCost / obj.productionDays) * 5
            }
          },
          {
            id: "perWeekMaterialRevenue", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonMaterialRevenue / obj.productionDays) * 5
            }
          },
        ]
      },
      {
        id: 'perDay', name: 'per day', cols: [
          {
            id: "perDayMaterialCost", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonMaterialCost / obj.productionDays)
            }
          },
          {
            id: "perDayMaterialRevenue", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonMaterialRevenue / obj.productionDays)
            }
          },
        ]
      },
    ],
    production_outlook_equipment: [
      { id: 'title', head: 'Production Outlook', name: 'Equipment', cols: ['Your Cost', 'Total Revenue Needed'], tabs: 'outlookTab' },
      {
        id: 'perSeason', name: 'per season', cols: [
          {
            id: "perSeasonEquipmentCost", format: "currency", calculation: function (obj, fields) {
              return obj.equipmentBillable
            }
          },
          {
            id: "perSeasonEquipmentRevenue", format: "currency", calculation: function (obj, fields) {
              var l77 = obj.perSeasonEquipmentCost * (obj.equipmentRecovery / 100)
              var m77 = (obj.perSeasonEquipmentCost + l77) / (1 - (obj.profitMargin / 100)) - (obj.perSeasonEquipmentCost + l77)
              obj.perSeasonEquipmentProfit = m77
              return obj.perSeasonEquipmentCost + l77 + m77
            }
          },
        ]
      },
      {
        id: 'perMonth', name: 'per month', cols: [
          {
            id: "perMonthEquipmentCost", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonEquipmentCost / obj.productionDays) * 20
            }
          },
          {
            id: "perMonthEquipmentRevenue", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonEquipmentRevenue / obj.productionDays) * 20
            }
          },
        ]
      },
      {
        id: 'perWeek', name: 'per week', cols: [
          {
            id: "perWeekEquipmentCost", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonEquipmentCost / obj.productionDays) * 5
            }
          },
          {
            id: "perWeekEquipmentRevenue", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonEquipmentRevenue / obj.productionDays) * 5
            }
          },
        ]
      },
      {
        id: 'perDay', name: 'per day', cols: [
          {
            id: "perDayEquipmentCost", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonEquipmentCost / obj.productionDays)
            }
          },
          {
            id: "perDayEquipmentRevenue", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonEquipmentRevenue / obj.productionDays)
            }
          },
        ]
      },
    ],
    production_outlook_subcontractor: [
      { id: 'title', head: 'Production Outlook', name: 'Subcontractor', cols: ['Your Cost', 'Total Revenue Needed'], tabs: 'outlookTab' },
      {
        id: 'perSeason', name: 'per season', cols: [
          {
            id: "perSeasonSubcontractorCost", format: "currency", calculation: function (obj, fields) {
              return obj.subcontractorCosts
            }
          },
          {
            id: "perSeasonSubcontractorRevenue", format: "currency", calculation: function (obj, fields) {
              var l84 = obj.perSeasonSubcontractorCost * (obj.subcontractorRecovery / 100)
              var m84 = (obj.perSeasonSubcontractorCost + l84) / (1 - (obj.profitMargin / 100)) - (obj.perSeasonSubcontractorCost + l84)
              obj.perSeasonSubcontractorProfit = m84
              return obj.perSeasonSubcontractorCost + l84 + m84
            }
          },
        ]
      },
      {
        id: 'perMonth', name: 'per month', cols: [
          {
            id: "perMonthSubcontractorCost", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonSubcontractorCost / obj.productionDays) * 20
            }
          },
          {
            id: "perMonthSubcontractorRevenue", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonSubcontractorRevenue / obj.productionDays) * 20
            }
          },
        ]
      },
      {
        id: 'perWeek', name: 'per week', cols: [
          {
            id: "perWeekSubcontractorCost", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonSubcontractorCost / obj.productionDays) * 5
            }
          },
          {
            id: "perWeekSubcontractorRevenue", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonSubcontractorRevenue / obj.productionDays) * 5
            }
          },
        ]
      },
      {
        id: 'perDay', name: 'per day', cols: [
          {
            id: "perDaySubcontractorCost", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonSubcontractorCost / obj.productionDays)
            }
          },
          {
            id: "perDaySubcontractorRevenue", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonSubcontractorRevenue / obj.productionDays)
            }
          },
        ]
      },
    ],
    production_outlook_total: [
      { id: 'title', head: 'Production Outlook', name: 'Total overhead that needs recovered', cols: ['Total', 'Labor', 'Materials', 'Equip', 'Subs'], tabs: 'outlookTab' },
      {
        id: 'perSeason', name: 'per season', cols: [
          {
            id: "perSeasonTotalCost", format: "currency", calculation: function (obj, fields) {
              return obj.totalOverhead
            }
          },
          {
            id: "perSeasonTotalLabor", format: "currency", calculation: function (obj, fields) {
              var manHourRecovery = obj.ratioLaborHours * (obj.laborRecovery / 100)
              return obj.perSeasonLaborHours * manHourRecovery
            }
          },
          {
            id: "perSeasonTotalMaterial", format: "currency", calculation: function (obj, fields) {
              return obj.perSeasonMaterialCost * (obj.materialRecovery / 100)
            }
          },
          {
            id: "perSeasonTotalEquipment", format: "currency", calculation: function (obj, fields) {
              return obj.perSeasonEquipmentCost * (obj.equipmentRecovery / 100)
            }
          },
          {
            id: "perSeasonTotalSubcontractor", format: "currency", calculation: function (obj, fields) {
              return obj.perSeasonSubcontractorCost * (obj.subcontractorRecovery / 100)
            }
          }
        ]
      },
      {
        id: 'perMonth', name: 'per month', cols: [
          {
            id: "perMonthTotalCost", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonTotalCost / obj.productionDays) * 20
            }
          },
          {
            id: "perMonthTotalLabor", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonTotalLabor / obj.productionDays) * 20
            }
          },
          {
            id: "perMonthTotalMaterial", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonTotalMaterial / obj.productionDays) * 20
            }
          },
          {
            id: "perMonthTotalEquipment", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonTotalEquipment / obj.productionDays) * 20
            }
          },
          {
            id: "perMonthTotalSubcontractor", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonTotalSubcontractor / obj.productionDays) * 20
            }
          }
        ]
      },
      {
        id: 'perWeek', name: 'per week', cols: [
          {
            id: "perWeekTotalCost", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonTotalCost / obj.productionDays) * 5
            }
          },
          {
            id: "perWeekTotalLabor", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonTotalLabor / obj.productionDays) * 5
            }
          },
          {
            id: "perWeekTotalMaterial", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonTotalMaterial / obj.productionDays) * 5
            }
          },
          {
            id: "perWeekTotalEquipment", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonTotalEquipment / obj.productionDays) * 5
            }
          },
          {
            id: "perWeekTotalSubcontractor", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonTotalSubcontractor / obj.productionDays) * 5
            }
          }
        ]
      },
      {
        id: 'perDay', name: 'per day', cols: [
          {
            id: "perDayTotalCost", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonTotalCost / obj.productionDays)
            }
          },
          {
            id: "perDayTotalLabor", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonTotalLabor / obj.productionDays)
            }
          },
          {
            id: "perDayTotalMaterial", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonTotalMaterial / obj.productionDays)
            }
          },
          {
            id: "perDayTotalEquipment", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonTotalEquipment / obj.productionDays)
            }
          },
          {
            id: "perDayTotalSubcontractor", format: "currency", calculation: function (obj, fields) {
              return (obj.perSeasonTotalSubcontractor / obj.productionDays)
            }
          }
        ]
      },
    ],
    breakeven_insights: [
      { id: 'title', name: 'Breakeven Insights', isSingle: true, cols: ['Breakeven Amount', 'Revenue per day needed to hit sales goal', 'Production Days needed to breakeven', 'Estimated Breakeven date	'] },
      {
        id: 'breakeven', name: 'Materials', cols: [
          {
            id: "breakevenAmount", format: "currency", calculation: function (obj, fields) {
              return obj.breakevenAmount
            }
          },
          {
            id: "perDayRevenueGoal", format: "currency", calculation: function (obj, fields) {
              return obj.salesGoal / obj.productionDays
            }
          },
          {
            id: "breakevenDays", format: "number", calculation: function (obj, fields) {
              return Math.round(obj.breakevenAmount / obj.perDayRevenueGoal)
            }
          },
          {
            id: "breakevenDate", format: "datetime", calculation: function (obj, fields) {
              var startDate = new Date(obj.startDate);
              var breakDate = addWorkingDays(startDate, obj.breakevenDays, calcObj.daysInWeek)
              return breakDate.getTime()
            }
          }
        ]
      }
    ],
    budget_insights: [
      { id: 'title', name: 'Budget Insights', cols: ['Overhead Recovered', 'Profit Generated', 'Total Revenue'] },
      {
        id: 'materials', name: 'Materials', cols: [
          {
            id: "materialRecovered", format: "currency", calculation: function (obj, fields) {
              return obj.materialCosts * (obj.materialRecovery / 100)
            }
          },
          {
            id: "materialRecoveredPerc", format: "percent", calculation: function (obj, fields) {
              return (obj.materialRecovered / obj.totalOverhead) * 100
            }
          },
          {
            id: "materialProfit", format: "currency", calculation: function (obj, fields) {
              return ((obj.materialCosts + obj.materialRecovered) / (1 - (obj.profitMargin / 100))) - (obj.materialCosts + obj.materialRecovered)
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
              return (obj.materialSales / obj.salesGoal) * 100
            }
          },
        ]
      },
      {
        id: 'equipment', name: 'Equipment', cols: [
          {
            id: "equipmentRecovered", format: "currency", calculation: function (obj, fields) {
              return obj.equipmentBillable * (obj.equipmentRecovery / 100)
            }
          },
          {
            id: "equipmentRecoveredPerc", format: "percent", calculation: function (obj, fields) {
              return (obj.equipmentRecovered / obj.totalOverhead) * 100
            }
          },
          {
            id: "equipmentProfit", format: "currency", calculation: function (obj, fields) {
              return ((obj.equipmentBillable + obj.equipmentRecovered) / (1 - (obj.profitMargin / 100))) - (obj.equipmentBillable + obj.equipmentRecovered)
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
              return (obj.equipmentSales / obj.salesGoal) * 100
            }
          },
        ]
      },
      {
        id: 'subcontractor', name: 'Subcontractor', cols: [
          {
            id: "subcontractorRecovered", format: "currency", calculation: function (obj, fields) {
              return obj.subcontractorCosts * (obj.subcontractorRecovery / 100)
            }
          },
          {
            id: "subcontractorRecoveredPerc", format: "percent", calculation: function (obj, fields) {
              return (obj.subcontractorRecovered / obj.totalOverhead) * 100
            }
          },
          {
            id: "subcontractorProfit", format: "currency", calculation: function (obj, fields) {
              return ((obj.subcontractorCosts + obj.subcontractorRecovered) / (1 - (obj.profitMargin / 100))) - (obj.subcontractorCosts + obj.subcontractorRecovered)
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
              return (obj.subcontractorSales / obj.salesGoal) * 100
            }
          },
        ]
      },
      {
        id: 'Labor', name: 'Labor', cols: [
          {
            id: "laborRecovered", format: "currency", calculation: function (obj, fields) {
              return obj.totalOverhead - (obj.materialRecovered + obj.equipmentRecovered + obj.subcontractorRecovered)
            }
          },
          {
            id: "laborRecoveredPerc", format: "percent", calculation: function (obj, fields) {
              return (obj.laborRecovered / obj.totalOverhead) * 100
            }
          },
          {
            id: "laborProfit", format: "currency", calculation: function (obj, fields) {
              return ((obj.laborCosts + obj.laborRecovered) / (1 - (obj.profitMargin / 100))) - (obj.laborCosts + obj.laborRecovered)
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
              return (obj.laborSales / obj.salesGoal) * 100
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
              return ((obj.manHourCost + obj.manHourRecovery) / (1 - (obj.profitMargin / 100))) - (obj.manHourCost + obj.manHourRecovery)
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
              return ((obj.materialItemCost + obj.materialItemRecovery) / (1 - (obj.profitMargin / 100))) - (obj.materialItemCost + obj.materialItemRecovery)
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

  var outlookTabPrev = function () {
    $(".outlookTab").hide();
    outlookTabsIndex--
    if (outlookTabsIndex < 0) {
      outlookTabsIndex = outlookTabs.length - 1
    }

    $("." + outlookTabs[outlookTabsIndex]).show();
  }

  var outlookTabNext = function () {
    $(".outlookTab").hide();
    outlookTabsIndex++
    if (outlookTabsIndex >= outlookTabs.length) {
      outlookTabsIndex = 0
    }
    $("." + outlookTabs[outlookTabsIndex]).show();
  }

  var setupButtonEvents = function () {
    $(".clear-values").click(function () {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
      location.reload();
    });
    $(".import-button").click(function () {
      var importStr = $(".import-field").val() || "{}*"
      importStr = importStr.slice(0, -1);
      importObj(JSON.parse(importStr))

      saveData();
      location.reload();
    });

    $(".import-toggle").click(function () {
      $(".import-container").toggle();
    });

    $(".export-toggle").click(function () {
      $(".export-summary-json").toggle();
    });
    $(document).on('keypress', '.gform_wrapper', function (e) {
      var code = e.keyCode || e.which;
      if (code == 13) {
        e.preventDefault();
        return false;
      }
    });
  }; 1

  var setupDatepickers = function () {
    gform.addFilter('gform_datepicker_options_pre_init', function (optionsObj, formId, fieldId) {
      optionsObj.onSelect = function (value, elem) {
        calcObj[reverseLup[elem.id]] = value;
        calculateOutput();
      }

      return optionsObj;
    });
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
    $(".link-small a").click(function (e) {
      e.preventDefault();
      var email = getParameterByName('email') || ''
      var dest = $(this).attr('href') + "&email=" + email;
      window.setTimeout(function () {
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
    google.charts.setOnLoadCallback(drawChart1);
    google.charts.setOnLoadCallback(drawChart2);

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

      calculateOutput()

    }

    function drawChart1() {
      googleChartData1 = google.visualization.arrayToDataTable([
        ["Component", "$"],
        ["Labor", 0],
        ["Materials", 0],
        ["Equipment", 0],
        ["Subcontractor", 0],
      ]);
      var formatter = new google.visualization.NumberFormat({
        prefix: "$",
      });

      formatter.format(googleChartData1, 1);

      googleChart1 = new google.visualization.PieChart(
        document.getElementById("donutchart1")
      );
      googleChart1.draw(googleChartData1, googleChartOptions);

      calculateOutput()

    }

    function drawChart2() {
      googleChartData2 = google.visualization.arrayToDataTable([
        ["Component", "$"],
        ["Labor", 0],
        ["Materials", 0],
        ["Equipment", 0],
        ["Subcontractor", 0],
      ]);
      var formatter = new google.visualization.NumberFormat({
        prefix: "$",
      });

      formatter.format(googleChartData2, 1);

      googleChart2 = new google.visualization.PieChart(
        document.getElementById("donutchart2")
      );
      googleChart2.draw(googleChartData2, googleChartOptions);

      calculateOutput()

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

  function updateChart1(data) {
    if (!googleChartData1) {
      return
    }
    //Remove data from datatable
    googleChartData1.removeRow(0);
    googleChartData1.removeRow(0);
    googleChartData1.removeRow(0);
    googleChartData1.removeRow(0);

    googleChartData1.insertRows(0, [
      ["Labor", Number(data.labor.toFixed(2))],
    ]);
    googleChartData1.insertRows(1, [
      ["Materials", Number(data.material.toFixed(2))]
    ]);
    googleChartData1.insertRows(2, [
      ["Equipment", Number(data.equipment.toFixed(2))]
    ]);
    googleChartData1.insertRows(3, [
      ["Subcontractor", Number(data.subcontractor.toFixed(2))]
    ]);

    var formatter = new google.visualization.NumberFormat({
      prefix: "$",
    });

    formatter.format(googleChartData1, 1);
    googleChart1.draw(googleChartData1, googleChartOptions);
  }

  function updateChart2(data) {
    if (!googleChartData2) {
      return
    }
    //Remove data from datatable
    googleChartData2.removeRow(0);
    googleChartData2.removeRow(0);
    googleChartData2.removeRow(0);
    googleChartData2.removeRow(0);

    googleChartData2.insertRows(0, [
      ["Labor", Number(data.labor.toFixed(2))],
    ]);
    googleChartData2.insertRows(1, [
      ["Materials", Number(data.material.toFixed(2))]
    ]);
    googleChartData2.insertRows(2, [
      ["Equipment", Number(data.equipment.toFixed(2))]
    ]);
    googleChartData2.insertRows(3, [
      ["Subcontractor", Number(data.subcontractor.toFixed(2))]
    ]);

    var formatter = new google.visualization.NumberFormat({
      prefix: "$",
    });

    formatter.format(googleChartData2, 1);
    googleChart2.draw(googleChartData2, googleChartOptions);
  }

  function isDate(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
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

  function addWorkingDays(start, days, daysInWeek) {
    var startDate = new Date(start);
    var count = 0;
    var maxDayOfWeek = daysInWeek - 1;
    const curDate = new Date(startDate.getTime());
    while (count <= days) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek <= maxDayOfWeek) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return curDate;
  }

  createSummaryTables = function () {
    $("#summary-table").empty();

    var container = $("#summary-table");

    var sumObj = JSON.parse(JSON.stringify(calcObj))

    Object.keys(summaryTables).forEach(function (key, index) {
      var item = summaryTables[key]
      var tableClass = key
      if (item[0].tabs) {
        tableClass += ' ' + item[0].tabs
      }
      var table = $("<table class='" + tableClass + "' data-index='" + index + "' >");
      var tr1 = $("<tr class='row-title'>");
      if (item[0].name == 'Budget Insights') {
        tr1.append("<th colspan='" + ((item[0].cols.length + 1) * 2) + "'>" + item[0].name + "</th>");
      } else {
        tr1.append("<th colspan='" + (item[0].cols.length + 1) + "'>" + item[0].name + "</th>");
      }

      if (item[0].tabs) {
        var tr0 = $("<tr class='row-title'>");
        tr0.append("<th colspan='" + (item[0].cols.length + 1) + "'>" +
          "<i class='tab-arrow tab-prev' onclick='" + item[0].tabs + "Prev()'></i><div class='tab-row-title'>" + item[0].head + "</div><i class='tab-arrow tab-next' onclick='" + item[0].tabs + "Next()'></i></th>");
        table.append(tr0);
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

    $("." + outlookTabs[outlookTabsIndex]).show();

    return sumObj
  }

  // Calculate the results of the calculator
  function calculateOutput() {

    if (!isDate(calcObj.startDate) || !isDate(calcObj.endDate)) {
      return
    }

    calcObj.productionDays = calcWorkingDays(calcObj.startDate, calcObj.endDate, calcObj.daysInWeek);

    //Outputs
    calcObj.ratioLaborHours = calcObj.laborCosts / (calcObj.laborHours);
    // calcObj.billableHours = calcObj.laborHours - calcObj.laborUnbillable
    // calcObj.ratioBillableHours = (calcObj.laborCosts / calcObj.billableHours);

    calcObj.totalOverhead = (calcObj.ratioLaborHours * calcObj.laborUnbillable) + calcObj.overheadCosts;
    calcObj.totalUnbillableLaborOverhead = calcObj.totalOverhead - calcObj.overheadCosts;

    calcObj.materialRecovered = calcObj.materialCosts * (calcObj.materialRecovery / 100);
    calcObj.equipmentRecovered = calcObj.equipmentBillable * (calcObj.equipmentRecovery / 100);
    calcObj.subcontractorRecovered = calcObj.subcontractorCosts * (calcObj.subcontractorRecovery / 100);
    calcObj.laborRecovered = calcObj.totalOverhead - (calcObj.materialRecovered + calcObj.equipmentRecovered + calcObj.subcontractorRecovered);

    calcObj.laborRecovery = (calcObj.totalOverhead / (calcObj.laborCosts - calcObj.totalUnbillableLaborOverhead)) * 100;

    calcObj.totalCOGs = calcObj.laborCosts + calcObj.materialCosts + calcObj.subcontractorCosts + (calcObj.equipmentBillable - calcObj.totalUnbillableLaborOverhead);

    calcObj.salesGoal = calcObj.desiredProfit < 100 ? (calcObj.totalCOGs + calcObj.totalOverhead) / (1 - (calcObj.desiredProfit / 100)) : 0;
    calcObj.totalCOGsPerc = (calcObj.totalCOGs / calcObj.salesGoal) * 100;

    calcObj.grossProfit = calcObj.salesGoal - calcObj.totalCOGs;
    calcObj.grossProfitPerc = (calcObj.grossProfit / calcObj.salesGoal) * 100;

    calcObj.netProfit = calcObj.grossProfit - calcObj.totalOverhead;
    calcObj.netProfitPerc = (calcObj.netProfit / calcObj.salesGoal) * 100;

    calcObj.profitMargin = calcObj.netProfitPerc;

    calcObj.ratioUnbillable = (calcObj.laborUnbillable / calcObj.laborHours) * 100;

    calcObj.contribution = calcObj.salesGoal - calcObj.totalCOGs
    calcObj.contributionRatio = calcObj.contribution / calcObj.salesGoal
    calcObj.breakevenAmount = calcObj.totalOverhead / calcObj.contributionRatio

    $(".ratio-unbillable .ratio-value").text(formatVal(calcObj.ratioUnbillable, 'percent'));
    $(".ratio-labor-hours .ratio-value").text(formatVal(calcObj.ratioLaborHours, 'currency'));
    $("#" + lup.productionDays.id).eq(0).val(formatVal(calcObj.productionDays, lup.productionDays.format));
    $("#" + lup.breakevenAmount.id).eq(0).val(formatVal(calcObj.breakevenAmount, lup.breakevenAmount.format));
    $("#" + lup.totalCOGs.id).eq(0).val(formatVal(calcObj.totalCOGs, lup.totalCOGs.format));
    $("#" + lup.profitMargin.id).eq(0).val(formatVal(calcObj.profitMargin, lup.profitMargin.format));
    $("#" + lup.grossProfit.id).eq(0).val(formatVal(calcObj.grossProfit, lup.grossProfit.format) + ' (' + formatVal(calcObj.grossProfitPerc, 'percent') + ')');
    $("#" + lup.netProfit.id).eq(0).val(formatVal(calcObj.netProfit, lup.netProfit.format) + ' (' + formatVal(calcObj.netProfitPerc, 'percent') + ')');
    $("#" + lup.laborRecovery.id).eq(0).val(formatVal(calcObj.laborRecovery, lup.laborRecovery.format));
    $("#" + lup.salesGoal.id).eq(0).val(formatVal(calcObj.salesGoal, lup.salesGoal.format));

    const sumObj = createSummaryTables();

    calcObj.manHourPrice = sumObj.manHourPrice
    $("#" + lup.manHourPrice.id).eq(0).val(formatVal(calcObj.manHourPrice, lup.manHourPrice.format));

    saveData();

    // Update Google Chart
    if (calcObj.netProfit) {
      $(".chart-placeholder").hide();
      $("#donutchart").show();
      $("#donutchart1").show();
      $("#donutchart2").show();
      $(".gform_page:last-of-type .gform_page_footer").show();
      $(".conversion-block").show();
    } else {
      $(".chart-placeholder").show();
      $("#donutchart").hide();
      $("#donutchart1").hide();
      $("#donutchart2").hide();
      $(".gform_page:last-of-type .gform_page_footer").hide();
      $(".conversion-block").hide();
    }

    updateChart({
      laborCosts: calcObj.laborCosts,
      materialCosts: calcObj.materialCosts,
      equipmentBillable: calcObj.equipmentBillable,
      subcontractorCosts: calcObj.subcontractorCosts,
      overheadCosts: calcObj.totalOverhead,
      netProfit: calcObj.netProfit,
    });
    updateChart1({
      labor: sumObj.perSeasonTotalLabor,
      material: sumObj.perSeasonTotalMaterial,
      equipment: sumObj.perSeasonTotalEquipment,
      subcontractor: sumObj.perSeasonTotalSubcontractor,
    });
    updateChart2({
      labor: sumObj.perSeasonLaborProfit,
      material: sumObj.perSeasonMaterialProfit,
      equipment: sumObj.perSeasonEquipmentProfit,
      subcontractor: sumObj.perSeasonSubcontractorProfit,
    });
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(calcObj));
    saveToGravityFormField();
  }

  function saveToGravityFormField() {
    var text = "";

    for (const key in lup) {
      const item = lup[key];
      text = text + item.name + ": " + formatVal(calcObj[key], item.format) + "\n";
    }

    $(".export-summary-json textarea").val(
      JSON.stringify(calcObj) + '*'
    );

    $(".export-summary textarea").val(text);
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
  $(document).on(
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
    $("#donutchart1").hide();
    $("#donutchart2").hide();
    $(".conversion-block").hide();

    if (/[?&]onboarding=true/.test(location.search) && onboardingEnabled) {
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
      breakevenAmount: {
        id: "input_60_56",
        name: 'Breakeven Amount',
        format: 'currency'
      },
      desiredProfit: {
        id: "input_60_57",
        name: 'Desired Net Profit',
        format: 'number'
      },
      salesGoal: {
        id: "input_60_58",
        name: 'Sales Goal',
        format: 'currency'
      },
    };

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
          // see also setupDatepickers
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
})(jQuery);