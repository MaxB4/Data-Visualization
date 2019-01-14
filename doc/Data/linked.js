var margin = {top: 40, right: 40, bottom: 40, left: 40};

var svg = d3.select("#map")
width = +svg.attr("width"),
height = +svg.attr("height");            

// Should really change this to 'clipExtent' instead of center
var projection = d3.geoAlbers() 
  .center([4.9, 52.366667])
  .rotate(120)
  .scale(250000)
  .translate([width / 2, height / 2]);

var path = d3.geoPath()
  .projection(projection);

var stadsdeel = {"A": "A Centrum","B": "B Westpoort", "E": "E West", "M": "M Oost", "K": "K Zuid", "F": "F Nieuw west", "N": "N Noord", "T": "T Zuidoost"}

// color scale
color= d3.scaleThreshold()
.domain([400,500,600,700,800,900])
.range(["rgb(255,255,178)", "rgb(254,217,118)", "rgb(254,178,76)", "rgb(253,141,60)","rgb(252,78,42)","rgb(227,26,28)","rgb(177,0,38)","rgb(37,37,37)"]);

// standard variables
var y0 = 30;
var spacingy = 45
var x0 = 0
var spacingx = 55

// legend
svg.append("text")
  .attr("x", x0)
  .attr("y", 15)
  .attr("font-size", "large")
  .attr("font-weight", "bold")
  .text("Legenda");

legend = svg.selectAll("#map")
            .data([400,500,600,700,800,900])
            .enter()
            .append("g")
            .attr("class", ".legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; 
          });

// create boxes
legend.append("rect")
    .attr("y", y0)
    .attr("x", x0)
    .attr("width", 32)
    .attr("height", 20)
    .style("fill", color);

// add text to legend
legend.append("text")
        .attr("x", spacingx)
        .attr("y", spacingy)
        .text(function(d){
        return d;
        })

window.onload = function() {

  var data = "buurten.json"
  var rentprice = "RentPrice.json"
  var income = "Income.json"
  var requests = [d3.json(data), d3.json(rentprice), d3.json(income)];

  Promise.all(requests).then(function(response) {
      main(response);
  }).catch(function(e){
  throw(e);   
  });
}
  function main (response){
      var data = response[0];
      var rentprice = response[1];
      var income = response [2];
  
      Country = [];

    console.log(data)
    console.log(rentprice)
    console.log(income)
  var stadsdelen = topojson.feature(data, data.objects.buurten).features;
  console.log(stadsdelen)

  var deelgemeenten = (data, data.objects.buurten.geometries).object;
  console.log(stadsdelen["0"])

  // console.log(stadsdeel[d.properties.Stadsdeel_code])




  // Set tooltips and put rent data in map
  var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                if(deelgemeenten.includes(d.properties.Stadsdeel_code)){
                    var location = deelgemeenten.indexOf(d.properties.Stadsdeel_code)
                    var NewRent2015 = Rent_2015[location];
                }
            return "<strong>Deelgemeente: </strong><span class='details'>" + d.properties.Stadsdeel_code + "<br></span>" + "<strong>GDP(billions): </strong><span class='details'>" + NewRent2015 +"<br></span>";
            })

  svg.call(tip);
  // ready(data, rentprice, income);
  // function ready(data, rentprice, income){
    
// svg.append("text")
//     .attr("x", (width / 2))             
//     .attr("y", 0 - (margin.top / 2))
//     .attr("text-anchor", "middle")  
//     .style("font-size", "25px") 
//     .text("Rent Price");
  
// svg.append("g")
//   .attr("class", "deelgemeenten")
//   .selectAll("path")
//   .data(data.features)
//   .enter()
//   .append("path")
//   .attr("d", path)
//   .style("fill", function(d) {
//       if(Country.includes(d.properties.Stadsdeel_code)){
//           var location = Country.indexOf(d.properties.name)
//           var NewGDP2017 = GDP_2017[location]
//           return color(NewGDP2017); 
//       }
//   })
//   .style('stroke-width', 1.5)
//   .style("opacity",0.8)
  
//   // tooltips
//   .style('stroke-width', 0.3)
//   .on('mouseover',function(d){
//       tip.show(d);

//       d3.select(this)
//       .style("opacity", 1)
//       .style("stroke","white")
//       .style("stroke-width",3);
//   })
//   .on('mouseout', function(d){
//       tip.hide(d);

//       d3.select(this)
//       .style("opacity", 0.8)
//       .style("stroke","white")
//       .style("stroke-width",0.3);
//   })
























  // Draw the deelgemeenten
  svg.selectAll(".buurt")
     .data(stadsdelen)
     .enter().insert("g")
     .append("path")
     .attr("class", "buurt")
     .attr("d", path)
     .attr("fill", function(d) { return color(d.properties.Stadsdeel_code[0]) })
     .append("title")
     .text(function(d) { return stadsdeel[d.properties.Stadsdeel_code] + ": " + d.properties.Buurtcombinatie });

  // // Draw borders around buurten
  // svg.append("path")
  //     .attr("class", "buurt-borders")
  //     .attr("d", path(topojson.mesh(data, data.objects.buurten, function(a, b) { return a !== b; })));

  // Draw borders around stadsdelen
  svg.append("path")
      .attr("class", "stadsdeel-borders")
      .attr("d", path(topojson.mesh(data, data.objects.buurten, function(a, b) { return stadsdeel[a.properties.Stadsdeel_code] !== stadsdeel[b.properties.Stadsdeel_code]; })));
  
  };