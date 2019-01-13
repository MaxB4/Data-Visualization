var margin = {top: 40, right: 40, bottom: 40, left: 40};

var svg = d3.select("#map")
width = +svg.attr("width"),
height = +svg.attr("height");            

// .append("svg")
//             .attr("width", width)
//             .attr("height", height)
//             .append('g')
//             .attr('class', 'map');

// Should really change this to 'clipExtent' instead of center
var projection = d3.geoAlbers() 
  .center([4.9, 52.366667])
  // .parallels([51.5, 51.49])
  .rotate(120)
  .scale(250000)
  .translate([width / 2, height / 2]);

var path = d3.geoPath()
  .projection(projection);

var stadsdeel = {"A": "Centrum","B": "Westpoort", "E": "West", "M": "Oost", "K": "Zuid", "F": "Nieuw west", "N": "Noord", "T": "Zuidoost"}

var colorScale = d3.scaleOrdinal(d3.schemeCategory20)
    colorStadsdelen = d3.scaleOrdinal(d3.schemeCategory20); 
    // colorLines = d3.scaleSequential(d3.schemeCategory20);

svg.append("text")
  .attr("x", 0)
  .attr("y", 15)
  .attr("font-size", "large")
  .attr("font-weight", "bold")
  .text("Legenda");

var y0 = 30;
var spacingy = 20
var x0 = 5
var spacingx = 55

/*Legenda*/
svg.append("circle")                                                
  .attr("stroke", "black")
  .attr("class", "Deelgemeente")
  .attr("stroke", colorScale(1))
  .attr("stroke-width", 7)
  .attr("y1", y0)
  .attr("y2", y0)
  .attr("x1", x0)
  .attr("x2", spacingx);
svg.append("text")
  .attr("x", spacingx + 5)
  .attr("y", y0 + 5)
  .attr("class", "label")
  .text("Deelgemeente");

// svg.append("line")
//   .attr("class", "metro")
//   .attr("stroke", colorScale())
//   .attr("stroke-width", 7)
//   .attr("y1", y0 + spacingy )
//   .attr("y2", y0 + spacingy )
//   .attr("x1", x0)
//   .attr("x2", spacingx);
// svg.append("text")
//   .attr("x", spacingx + 5)
//   .attr("y", y0 + spacingy + 5)
//   .attr("class", "label")
//   .text("Metrolijn");

// svg.append("line")
//   .attr("class", "train")
//   .attr("y1", y0 + spacingy * 2)
//   .attr("y2", y0 + spacingy * 2)
//   .attr("x1", x0)
//   .attr("x2", 50);
// svg.append("text")
//   .attr("x", spacingx + 5)
//   .attr("y", y0 + spacingy * 2+ 5)
//   .attr("class", "label")
//   .text("Treinspoor");

// svg.append("circle")
//   .attr("class", "station")
//   .attr("cx", x0 + 22)
//   .attr("cy", y0 + spacingy * 3);
// svg.append("text")
//   .attr("class", "label")
//   .attr("x", spacingx + 5)
//   .attr("y", y0 + spacingy * 3 + 5)
//   .text("Treinstation");

// svg.append("circle")
//   .attr("fill", "white")
//   .attr("stroke", "black")
//   .attr("r", "1.5")
//   .attr("cx", x0 + 22)
//   .attr("cy", y0 + spacingy * 4);
// svg.append("text")
//   .attr("class", "label")
//   .attr("x", spacingx + 5)
//   .attr("y", y0 + spacingy * 4 + 5)
//   .text("Tram/metro halte");


d3.queue()
    .defer(d3.json, "buurten.json")
    // .defer(d3.json, "trammetro.json")
    // .defer(d3.json, "trammetrostations.geojson")
    // .defer(d3.json, "spoor.geojson")
    // .defer(d3.csv,  "treinstations.csv")
    .await(ready);

function ready(error, data) {
  if (error) throw error;
  console.log(data)
  
  var stadsdelen = topojson.feature(data, data.objects.buurten).features;
  
  var deelgemeenten = (data, data.objects.buurten.geometries);
  console.log(deelgemeenten)

  // // Set tooltips and put rent data in map
  // var tip = d3.tip()
  //           .attr('class', 'd3-tip')
  //           .offset([-10, 0])
  //           .html(function(d) {
  //               if(Country.includes(d.properties.name)){
  //                   var location = Country.indexOf(d.properties.name)
  //                   var NewGDP2017 = GDP_2017[location];
  //               }
  //           return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>GDP(billions): </strong><span class='details'>" + NewGDP2017 +"<br></span>";
  //           })

  // Draw the deelgemeenten
  svg.selectAll(".buurt")
     .data(stadsdelen)
     .enter().insert("g")
     .append("path")
     .attr("class", "buurt")
     .attr("d", path)
     .attr("fill", function(d) { return colorStadsdelen(d.properties.Stadsdeel_code[0]) })
     .append("title")
     .text(function(d) { return stadsdeel[d.properties.Stadsdeel_code] + ": " + d.properties.Buurtcombinatie });

  // Draw borders around buurten
  svg.append("path")
      .attr("class", "buurt-borders")
      .attr("d", path(topojson.mesh(data, data.objects.buurten, function(a, b) { return a !== b; })));

  // Draw borders around stadsdelen
  svg.append("path")
      .attr("class", "stadsdeel-borders")
      .attr("d", path(topojson.mesh(data, data.objects.buurten, function(a, b) { return stadsdeel[a.properties.Stadsdeel_code] !== stadsdeel[b.properties.Stadsdeel_code]; })));

//   /* Lines */
//   // Draw the tram/metro tracks
//   var trammetro = topojson.feature(trammetrotopo, trammetrotopo.objects.trammetro);

//   // Get the number of tracks for each line
//   trammetro.features.forEach(function(d) { d.properties.tracks = d.properties.Lijn.split(/ \| /g).length; });

//   colorLines.domain([0, d3.max(trammetro.features, function(d) { return d.properties.tracks; })]);

//   var railLine = svg.append('g').attr('class', 'rail-lines')
//           .selectAll('.rail-line').data(trammetro.features)
//       .enter().append('g')
//           .attr('class', 'spoor');
      
//   railLine
//       .selectAll('.track')
//       .data(function(lineString) {
//           // Duplicate the lineString feature based on the number of tracks
//           return d3.range(0, lineString.properties.tracks)
//               .map(function() { return lineString; }); 
//       })
//       .enter().append('path')
//         .attr("class", function(d) { return "spoor " + d.properties.Modaliteit.toLowerCase() })
//         .attr('d', function(lineString, i) {
//             // Offset each lineString by 50 meters
//             var lineStringOffset = turf.lineOffset(lineString.geometry, i * 60,  {units: "meters"});
//             return path(lineStringOffset);
//         })
//         .attr("stroke", function(d, i) { return (colorScale(d.properties.Lijn.split(/ \| /g)[i]) ) })
//       .append("title")
//         .text(function(d) { return ((d.properties.Lijn).length !== 1 ? "Lijnen: " : "Lijn: ") + d.properties.Lijn }); 

};