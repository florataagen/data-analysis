import define1 from "./a33468b95d0b15b0@808.js";

function _1(md){return(
md`# Distance to Nearest Abortion Provider 

Data from every county in the United States from 2009-2022. Data: [OSF](https://osf.io/8dg7r/)`
)}

function _2(md){return(
md`Simple fork of mbostock's main chloropeth (https://observablehq.com/@d3/choropleth). 

`
)}

function _year(Inputs){return(
Inputs.select(["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"], {label: "Year"})
)}

function _chart(d3,legend,color,title,legendAttributes,topojson,us,dataFipsAndValueMap,path,states,format)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, 975, 610]);

  svg.append("g")
      .attr("transform", "translate(610,20)")
      .append(() => legend(Object.assign({color, title, width: 260},legendAttributes)));

  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .join("path")
      .attr("fill", d => color(dataFipsAndValueMap.get(d.id)))
      .attr("d", path)
    .append("title")
      .text(d => `${d.properties.name}, ${states.get(d.id.slice(0, 2)).name}
${ (dataFipsAndValueMap.get(d.id)==undefined) ?
            "No Data" :
            format(dataFipsAndValueMap.get(d.id))}`);

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  return svg.node();
}


function _legendAttributes(){return(
{ tickFormat: ".1f" }
)}

function _data(alldata,year){return(
alldata.filter(d => d.year === parseInt(year))
)}

function _dataFipsAndValueArray(data){return(
new Map(data.map(({id, distance_origintodest}) => [id, distance_origintodest]))
)}

function _dataFipsAndValueMap(dataFipsAndValueArray){return(
new Map(dataFipsAndValueArray)
)}

function _title(){return(
"Distance to Abortion Provider (Miles)"
)}

function _color(d3){return(
d3.scaleQuantize([1, 800], d3.schemePurples[9])
)}

function _path(d3){return(
d3.geoPath()
)}

function _format(){return(
d => `${d}%`
)}

function _states(us){return(
new Map(us.objects.states.geometries.map(d => [d.id, d.properties]))
)}

function _us(FileAttachment){return(
FileAttachment("counties-albers-10m.json").json()
)}

function _topojson(require){return(
require("topojson-client@3")
)}

function _d3(require){return(
require("d3@6")
)}

function _alldata(__query,FileAttachment,invalidation){return(
__query(FileAttachment("allData.csv"),{from:{table:"allData"},sort:[],slice:{to:null,from:null},types:[{name:"id",type:"string"}],filter:[],select:{columns:null}},invalidation)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["counties-albers-10m.json", {url: new URL("./files/6b1776f5a0a0e76e6428805c0074a8f262e3f34b1b50944da27903e014b409958dc29b03a1c9cc331949d6a2a404c19dfd0d9d36d9c32274e6ffbc07c11350ee.json", import.meta.url), mimeType: "application/json", toString}],
    ["allData.csv", {url: new URL("./files/5c68b7be6d94b0d661c4c97d81f65416b6a495f00c3a18a3ff7368ac99edd995cf01ac5e70d89d6e4b1e1663456ea047c79f3869ad3928e2f90aef99f93902a8.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof year")).define("viewof year", ["Inputs"], _year);
  main.variable(observer("year")).define("year", ["Generators", "viewof year"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","legend","color","title","legendAttributes","topojson","us","dataFipsAndValueMap","path","states","format"], _chart);
  main.variable(observer("legendAttributes")).define("legendAttributes", _legendAttributes);
  main.variable(observer("data")).define("data", ["alldata","year"], _data);
  main.variable(observer("dataFipsAndValueArray")).define("dataFipsAndValueArray", ["data"], _dataFipsAndValueArray);
  main.variable(observer("dataFipsAndValueMap")).define("dataFipsAndValueMap", ["dataFipsAndValueArray"], _dataFipsAndValueMap);
  main.variable(observer("title")).define("title", _title);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer("path")).define("path", ["d3"], _path);
  main.variable(observer("format")).define("format", _format);
  main.variable(observer("states")).define("states", ["us"], _states);
  main.variable(observer("us")).define("us", ["FileAttachment"], _us);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  main.variable(observer("alldata")).define("alldata", ["__query","FileAttachment","invalidation"], _alldata);
  return main;
}
