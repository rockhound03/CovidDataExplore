// create global variables for sharing between functions.
var stateIDInfo;
var selectedState;
var stateCases;
var selectedStateCases;
//var Statistics = require('./node_modules/statistics.js/statistics.js');
d3.json("./data/GeoIDs - State.json").then((data) => {
  stateIDInfo = Object.values(data);
  var stNames = stateIDInfo.map(buildStates);
  buildMenu(stNames);
  updateInfo
})

d3.json("./data/COVID Cases - State - Daily.json").then((data) => {
  stateCases = Object.values(data);
})

function statCollect(stateData, localState){
  var statereturn;
  stateData.forEach(oneState =>{
    if(localState === oneState.statename){
      statereturn =oneState;
    }
  });
  return statereturn;
}

function caseCollect(caseData, stateID){
  var filteredStateCases = caseData.filter(cases => cases.statefips == stateID);
  return filteredStateCases;
}

d3.selectAll("#selDataset").on("change", updateInfo);

function buildStates(sinf){
  return sinf.statename;
}

function buildStats(stateStuff){
  if(selectedState === stateStuff.statename){
    return stateStuff;
  }
}

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

}
// On change to the DOM, call getData()

function updateInfo(){
var dropdownMenu = d3.select("#selDataset");
selectedState = dropdownMenu.property("value");
console.log(selectedState);
console.log(stateIDInfo);
var justStats = statCollect(stateIDInfo,selectedState);
selectedStateCases = caseCollect(stateCases, justStats.statefips);
console.log(selectedStateCases);
var columns = {
  year:'interval',
  month:'interval',
  day:'interval',
  statefips:'interval',
  case_rate:'metric',
  new_case_rate:'metric'
};

var settings = {excludeColumns: ["year", "month", "day", "statefips"]};
//var stats = new Statistics(selectedStateCases,columns,settings);
//var stateMean = stats.arithmeticMean("case_rate");
//console.log(stateMean);
//"year": 2020,
//"month": 1,
//"day": 21,
//"statefips": 1,
//"case_rate": 0,
//"new_case_rate": "."

//var patientData = metaData.filter(patient => patient.id == selectedOption);
//console.log(patientData);
//var patientSample = allSampleData.filter(sample => sample.id == selectedOption);
//var patientSorted = patientSample.sort(function sortFunction(a, b){
  //return b.sample_values - a.sample_values;
//});

var stateMetaBin = [];
//console.log(patientData);
//console.log("temp array launched.")
stateMetaBin.push(`State Name: ${justStats.statename}`);
stateMetaBin.push(`State ID: ${justStats.statefips}`);
stateMetaBin.push(`State Abbrev: ${justStats.stateabbrev}`);
stateMetaBin.push(`State Pop. (2019): ${justStats.state_pop2019}`);
//stateMetaBin.push(`Mean New Cases: ${stateMean.toFixed(2)}`);
fillMetaData(stateMetaBin);
//console.log(currentOtuIds);
//console.log(barLabels);
//state-metadata
}

function fillMetaData(pData){
  console.log(pData);
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