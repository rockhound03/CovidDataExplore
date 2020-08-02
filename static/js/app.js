// create global variables for sharing between functions.
var metaData;
var allSampleData;
var stateIDInfo;
var currentOtuIds;
var currentSampleValues;
var currentOtuLabels;

d3.json("./data/GeoIDs - State.json").then((data) => {
  stateIDInfo = Object.values(data);
  //stateNameID = Object.values(data.statename);
  var stNames = stateIDInfo.map(buildStates);
  console.log(stNames);
  
  buildMenu(stNames);
  updateInfo
})
//console.log(stateIDInfo);
//d3.json("./data/covid_data.json").then((data) => {
  //var stateNameID = Object.values(data.statename);
  //buildMenu(stateNameID);
  //console.log(sampleData);
 // updateInfo
//})

d3.selectAll("#selDataset").on("change", updateInfo);

function buildStates(sinf){
  return sinf.statename;
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
var selectedState = dropdownMenu.property("value");
console.log(selectedState);
//console.log(metaData);
//var patientData = metaData.filter(patient => patient.id == selectedOption);
//console.log(patientData);
//var patientSample = allSampleData.filter(sample => sample.id == selectedOption);
//var patientSorted = patientSample.sort(function sortFunction(a, b){
  //return b.sample_values - a.sample_values;
//});
// Bar Plot **************************
// get top 10 samples, change order for descending bar chart.

// Bubble Plot ***************************
//var largestSampleSize = Math.max(patientSorted[0].sample_values);


//console.log(currentOtuIds);
//console.log(barLabels);
//sample-metadata


}

function fillMetaData(pData){
  console.log(pData);
  var metaPanel = d3.select("#sample-metadata");
  var panel = metaPanel.selectAll("p").remove();
  var newPanel = metaPanel.selectAll("p")
    .data(pData)
    .enter()
    .append("p");
  newPanel.text(function(d){
    return d;
  })

}