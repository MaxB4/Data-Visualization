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
    
    // console.log(data)
    // console.log(rentprice)
    // console.log(income)
    // console.log(objects.data.buurten.geometries["0"])

  var stadsdelen = topojson.feature(data, data.objects.buurten).features;
  // console.log(stadsdelen)

  CodeDeelgemeente = []
  incomeList = []
  codeDeelgemeente = {}
  incomeList.push(codeDeelgemeente)
    var i = 2015

    codeDeelgemeente["A  Centrum"] = income["A  Centrum"][i]
    codeDeelgemeente["E  West"] = income["E  West"][i]
    codeDeelgemeente["F  Nieuw-West"] = income["F  Nieuw-West"][i]
    codeDeelgemeente["K  Zuid"] = income["K  Zuid"][i]
    codeDeelgemeente["M  Oost"] = income["M  Oost"][i]
    codeDeelgemeente["N  Noord"] = income["N  Noord"][i]
    codeDeelgemeente["T  Zuidoost"] = income["T  Zuidoost"][i]
    codeDeelgemeente["Amsterdam"] = income["Amsterdam"][i]

  CodeDeelgemeente.push(income)
  // }
  var income2015 = incomeList[0]
  console.log(income2015)
  

// Set tooltips
  var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                if(CodeDeelgemeente.includes(d.properties.Stadsdeel_code)){
                    var location = CodeDeelgemeente.indexOf(d.properties.Stadsdeel_code)
                    var newIncome2015 = income2015[location];
                }
            return "<strong>Deelgemeente: </strong><span class='details'>" + d.properties.Stadsdeel_code + "<br></span>" + "<strong>Income (euro): </strong><span class='details'>" + newIncome2015 +"<br></span>";
            })


var svg = d3.select("#map")
width = +svg.attr("width"),
height = +svg.attr("height")

      svg.append("svg")
         .append('g')
         .attr('class', 'map');


// properties of map visualization
var projection = d3.geoAlbers() 
  .center([4.9, 52.366667])
  .rotate(120)
  .scale(250000)
  .translate([width / 2, height / 2]);

// color scale
var color = d3.scaleThreshold()
.domain([400,500,600,700,800,900])
.range(["rgb(255,255,178)", "rgb(254,217,118)", "rgb(254,178,76)", "rgb(253,141,60)","rgb(252,78,42)","rgb(227,26,28)","rgb(177,0,38)","rgb(37,37,37)"]);
            
var path = d3.geoPath()
  .projection(projection);

var stadsdeel = {"A Centrum": "Centrum","B Westpoort": "Westpoort", "E West": "West", "M Oost": "Oost", "K Zuid": "Zuid", "F Nieuw west": "Nieuw west", "N Noord": "Noord", "T Zuidoost": "Zuidoost"}



// constant variables
var y0 = 30;
var spacingy = 45;
var x0 = 0;
var spacingx = 55;
var legendhight = 15;

// legend
svg.append("text")
  .attr("x", x0)
  .attr("y", legendhight)
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

        svg.call(tip);
        ready(data, income2015);
        function ready(data, income2015) {


// // Draw the deelgemeenten
//   svg.selectAll(".buurt")
//      .data(stadsdelen)
//      .enter().insert("g")
//      .append("path")
//      .attr("class", "buurt")
//      .attr("d", path)
//      .attr("fill", function(d) { console.log(d.properties.Stadsdeel_code); return color(d.properties.Stadsdeel_code[0]) })
//      .on("mouseover", function (d)
//      {
//       console.log(d.properties.Stadsdeel_code)
//      })
     
//      .append("title")
//      .text(function(d) { return stadsdeel[d.properties.Stadsdeel_code] + ": " + d.properties.Income})
  

     svg.append("g")
     .attr("class", "buurt")
     .selectAll("path")
     .data(stadsdelen)
     .enter()
     .append("path")
     .attr("d", path)
     .style("fill", function(d) {
        if(CodeDeelgemeente.includes(d.properties.Stadsdeel_code)){
            var location = CodeDeelgemeente.indexOf(d.properties.Stadsdeel_code)
            var newIncome2015 = income2015[location];
            return color(newIncome2015); 
         }
     })
     .style('stroke-width', 1.5)
     .style("opacity",0.8)
     
     // tooltips
     .style('stroke-width', 0.3)
     .on('mouseover',function(d){
         tip.show(d);

         d3.select(this)
         .style("opacity", 1)
         .style("stroke","white")
         .style("stroke-width",3);
     })
     .on('mouseout', function(d){
         tip.hide(d);

         d3.select(this)
         .style("opacity", 0.8)
         .style("stroke","white")
         .style("stroke-width",0.3);
     })

  // Draw borders around stadsdelen
  svg.append("path")
      .attr("class", "stadsdeel-borders")
      .attr("d", path(topojson.mesh(data, data.objects.buurten, function(a, b) { return stadsdeel[a.properties.Stadsdeel_code] !== stadsdeel[b.properties.Stadsdeel_code]; })));

// }
  };
  
//   function createLinechart(data) {
    
//     // use standard margins
//     var margin = {top: 50, right: 50, bottom: 50, left: 50}
//     , width = window.innerWidth - margin.left - margin.right 
//     , height = window.innerHeight - margin.top - margin.bottom; 
//     padding = 20;

//     // add SVG 
//     var svg = d3.select("#chart")
//                 .append("svg")
//                 .attr("width", width + margin.left + margin.right)
//                 .attr("height", height + margin.top + margin.bottom)
//                 .append("g")
//                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     // X scale
//     var xScale = d3.scaleLinear()
//         .domain([2013, 2015])
//         .range([0, width]);
   
//     // Y scale 
//     var yScale = d3.scaleLinear()
//         .domain([0, data[5].rent]) // data[5] is from old visualization
//         .range([height, 0]);

//     // X axis
//     svg.append("g")
//        .attr("class", "x axis")
//        .attr("transform", "translate(0," + height + ")")
//        .call(d3.axisBottom(xScale));
            
//     // title x axis
//     svg.append("text")
//         .attr("transform", "translate(" + (width / 2) + " ," + (height + padding + 20) + ")")
//         .attr("class", "x axis", margin.top)
//         .style("text-anchor", "middle")
//         .text("Year");

//     // Y axis
//     svg.append("g")
//         .attr("class", "y axis")
//         .call(d3.axisLeft(yScale));
    
//     // title y axis
//     svg.append("text")
//     .attr("dy", "-1.2em")
//     .style("text-anchor", "middle")
//     .text("Rent (Euro)");

//     // create line
//     const line = d3.line()
//     .x(d => xScale(d.year))
//     .y(d => yScale(d.rent))
//     .curve(d3.curveMonotoneX);
   
//     svg.append('path')
//       .datum(data)
//       .style('stroke','#D073BA')
//       .style('stroke-width', 2)
//       .style('fill', 'none')
//       .attr('d', line)

//     svg.selectAll('circle')
//         .data(data)
//         .enter()
//         .append('circle')
//         .attr('class', 'circle')
//         .attr('cx', d => xScale(d.year))
//         .attr('cy', d => yScale(d.gdp))
//         .attr('r', 3)
//         .on("mouseover", function(a, b, c) { 
//                 console.log(a) 
//             this.attr('class', 'focus')
//             })
//         .on("mouseout", function() {  })
//     }
  }
