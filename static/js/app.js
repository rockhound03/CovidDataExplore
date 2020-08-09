// create global variables for sharing between functions.
var stateIDInfo;
var selectedState;
var stateCases;
var stateDeath;
var selectedStateCases;
var selectedStateTransport;
var selectedStateDeaths;
var stateTransport;
var currentTransport = "gps_away_from_home";
var currentCaseDeath = "case_rate";
var caseDeathDateArray;
var caseArray;


//Data load calls from json files. --------------------------------
d3.json("./data/GeoIDs - State.json").then((data) => {
  stateIDInfo = Object.values(data);
  var stNames = stateIDInfo.map(buildStates);
  buildMenu(stNames);
  updateInfo
});

d3.json("./data/COVID Cases - State - Daily.json").then((data) => {
  stateCases = Object.values(data);
});

d3.json("./data/Google Mobility - State - Daily.json").then((data) => {
  stateTransport = Object.values(data);
});

d3.json("./data/COVID Deaths - State - Daily.json").then((data) => {
  stateDeath = Object.values(data);
});

// ------------------------------------------------------------
function statCollect(stateData, localState){
  var statereturn;
  stateData.forEach(oneState =>{
    if(localState === oneState.statename){
      statereturn =oneState;
    }
  });
  return statereturn;
};

function caseCollect(caseData, stateID){
  var filteredStateCases = caseData.filter(cases => cases.statefips == stateID);
  return filteredStateCases;
};

d3.selectAll("#selDataset").on("change", updateInfo);

var trainButton = d3.select(".button1");
var groceryButton = d3.select(".button2");
var recreationButton = d3.select(".button3");
var parksButton = d3.select(".button4");
var workButton = d3.select(".button5");
var residentialButton = d3.select(".button6");
var awayButton = d3.select(".button7");
var casesButton = d3.select(".button8");
var newCaseButton = d3.select(".button9");
var deathButton = d3.select(".button10");
var newDeathButton = d3.select(".button11");

trainButton.on("click",function() {
  currentTransport = "gps_transit_stations";
  updateInfo();
  });

groceryButton.on("click", function() {
  currentTransport = "gps_grocery_and_pharmacy";
  updateInfo();
});

recreationButton.on("click", function() {
  currentTransport = "gps_retail_and_recreation";
  updateInfo();
});

parksButton.on("click", function() {
  currentTransport = "gps_parks";
  updateInfo();
});

workButton.on("click", function() {
  currentTransport = "gps_workplaces";
  updateInfo();
});

residentialButton.on("click", function() {
  currentTransport = "gps_residential";
  updateInfo();
});

awayButton.on("click", function() {
  currentTransport = "gps_away_from_home";
  updateInfo();
});

casesButton.on("click", function() {
  currentCaseDeath = "case_rate";
  updateInfo();
});

newCaseButton.on("click", function() {
  currentCaseDeath = "new_case_rate";
  updateInfo();
});

deathButton.on("click", function() {
  currentCaseDeath = "death_rate";
  updateInfo();
});

newDeathButton.on("click", function() {
  currentCaseDeath = "new_death_rate";
  updateInfo();
})
function buildStates(sinf){
  return sinf.statename;
};

function buildStats(stateStuff){
  if(selectedState === stateStuff.statename){
    return stateStuff;
  }
};

function buildMenu(ids){
var menu = d3.select("#selDataset");
var options = menu.selectAll("option")
  .data(ids)
  .enter()
  .append("option");
options.text(function(d) {
  return d;
   })
     .attr("value", function(d) {
  return d;
  });
};

function button1Update(){
  var buttonValue = d3.select(".button");
  currentTransport = "gps_transit_stations";
  updateInfo;
}

// Update info call
function updateInfo(){
  if(currentTransport === "gps_retail_and_recreation"){
    var mobilityTitle = "\"Retail and Recreation\" Mobility Data Bubble Plot";
  } else if (currentTransport === "gps_grocery_and_pharmacy"){
    var mobilityTitle = "\"Grocery and Pharmacy\" Mobility Data Bubble Plot";
  } else if (currentTransport === "gps_parks"){
    var mobilityTitle = "\"Parks\" Mobility Data Bubble Plot";
  } else if (currentTransport === "gps_transit_stations"){
    var mobilityTitle = "\"Transit Station\" Mobility Data Bubble Plot";
  } else if (currentTransport === "gps_workplaces"){
    var mobilityTitle = "\"Workplace\" Mobility Data Bubble Plot";
  } else if (currentTransport === "gps_residential"){
    var mobilityTitle = "\"Residential\" Mobility Data Bubble Plot";
  } else if (currentTransport === "gps_away_from_home"){
    var mobilityTitle = "\"Away from Home\" Mobility Data Bubble Plot";
  }
var dropdownMenu = d3.select("#selDataset");
selectedState = dropdownMenu.property("value");

var justStats = statCollect(stateIDInfo,selectedState);
selectedStateCases = caseCollect(stateCases, justStats.statefips);
selectedStateTransport = caseCollect(stateTransport,justStats.statefips);
selectedStateDeaths = caseCollect(stateDeath, justStats.statefips);
// Transport - Mobility Plot Data -------------------------------------------------------
var mobileDateArray = selectedStateTransport.map((localDate) => {
  return (localDate.month.toString() + "-" + localDate.day.toString() + "-" + localDate.year.toString());
});

var mobileArray = selectedStateTransport.map((mData) =>{
  console.log("plotting from: " + currentTransport);
  return mData[currentTransport];
});

var bubbleSizeMobile = mobileArray.map((sample) => {
  return sample;
});

var mobileSize = mobileArray.length / 20;

var bubbleColorMobile = mobileArray.map((dataset) =>{
  return d3.interpolateSinebow((dataset + 1)/ mobileSize);
});

var trace_mobile = {
  x: mobileDateArray,
  y: mobileArray,
  text: mobileDateArray,
  mode: 'markers',
  marker: {
    color:bubbleColorMobile,
    size: mobileSize
  }
};

var data_mobile = [trace_mobile];

var layout_mobile = {
  title: mobilityTitle,
  showlegend: false,
  height: 630,
  width: 1200,
  xaxis: {
    title: {
      text: 'Date'}},
  yaxis:{
    title:{
      text: 'Mobility Ratio'
    }
  }
};

Plotly.newPlot('bubble_alt', data_mobile, layout_mobile);
// Cases Plot data ----------------------------------------------------------------------
if(currentCaseDeath === "case_rate"){
  caseDeathDateArray = selectedStateCases.map((ldDate) => {
    return (ldDate.month.toString() + "-" + ldDate.day.toString() + "-" + ldDate.year.toString());
  });
  caseArray = selectedStateCases.map((cData) => {
    return cData[currentCaseDeath];
  });
  var bubbleSize = caseArray.map((sample) => {
    return 7.5;
  });
  var casesPlotTitle = "Total Cases";
} else if (currentCaseDeath === "new_case_rate"){
  caseDeathDateArray = selectedStateCases.map((ldDate) => {
    return (ldDate.month.toString() + "-" + ldDate.day.toString() + "-" + ldDate.year.toString());
  });
  caseArray = selectedStateCases.map((cData) => {
    return cData[currentCaseDeath];
  });
  var bubbleSize = caseArray.map((sample) => {
    return sample;
  });
  var casesPlotTitle = "New Cases";
} else if (currentCaseDeath === "death_rate"){
  caseDeathDateArray = selectedStateDeaths.map((ldDate) => {
    return (ldDate.month.toString() + "-" + ldDate.day.toString() + "-" + ldDate.year.toString());
  }); 
  caseArray = selectedStateDeaths.map((cData) => {
    return cData[currentCaseDeath];
  });
  var bubbleSize = caseArray.map((sample) => {
    return 7.5;
  });
  var casesPlotTitle = "Total Deaths";
} else if (currentCaseDeath === "new_death_rate"){
  caseDeathDateArray = selectedStateDeaths.map((ldDate) => {
    return (ldDate.month.toString() + "-" + ldDate.day.toString() + "-" + ldDate.year.toString());
  });
  caseArray = selectedStateDeaths.map((cData) => {
    return cData[currentCaseDeath];
  });
  var bubbleSize = caseArray.map((sample) => {
    return sample * 100;
  });
  var casesPlotTitle = "Rate of Deaths";
}

var sampleSize = caseArray.length;
var bubbleColors = caseArray.map((sample) =>{
  return d3.interpolateSinebow((sample + 1)/ sampleSize);
});


var trace1 = {
  x: caseDeathDateArray,
  y: caseArray,
  text: caseDeathDateArray,
  mode: 'markers',
  marker: {
    color:bubbleColors,
    size: bubbleSize
  }
};

var data = [trace1];

var layout = {
  title: casesPlotTitle + ' Bubble Plot',
  showlegend: false,
  height: 600,
  width: 1200,
  xaxis: {
    title: {
      text: 'Case Date'}},
  yaxis:{
    title:{
      text: 'Rate of New Cases'
    }
  }
};

Plotly.newPlot('bubble', data, layout);


var columns = {
  year:'interval',
  month:'interval',
  day:'interval',
  statefips:'interval',
  case_rate:'metric',
  new_case_rate:'metric'
};

var settings = {excludeColumns: ["year", "month", "day", "statefips"]};
var stats = new Statistics(selectedStateCases,columns,settings);
var stateMean = stats.arithmeticMean("case_rate");
//console.log(stateMean);
//"year": 2020,
//"month": 1,
//"day": 21,
//"statefips": 1,
//"case_rate": 0,
//"new_case_rate": "."

//var currentStateData = stateCases.filter(allcases => allcases.id == selectedOption);

var stateMetaBin = [];

stateMetaBin.push(`State Name: ${justStats.statename}`);
stateMetaBin.push(`State ID: ${justStats.statefips}`);
stateMetaBin.push(`State Abbrev: ${justStats.stateabbrev}`);
stateMetaBin.push(`State Pop. (2019): ${justStats.state_pop2019}`);
stateMetaBin.push(`Mean New Cases: ${stateMean.toFixed(2)}`);
fillMetaData(stateMetaBin);
console.log(currentTransport);
}

function fillMetaData(pData){
  var metaPanel = d3.select("#state-metadata");
  var panel = metaPanel.selectAll("p").remove();
  var newPanel = metaPanel.selectAll("p")
    .data(pData)
    .enter()
    .append("p");
  newPanel.text(function(d){
    return d;
  })

}