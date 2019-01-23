window.onload = function() {

  var data = "buurten.json"
  var rentprice = "RentPrice.json"
  var income = "Income.json"
  var socialrent = "Socialrent.json"
  var requests = [d3.json(data), d3.json(rentprice), d3.json(income), d3.json(socialrent)];

  Promise.all(requests).then(function(response) {
      main(response);
  }).catch(function(e){
  throw(e);   
  });
}
  function main (response){
      var data = response[0];
      var rent = response[1];
      var income = response [2];
      var socialrent = response [3];
      var stadsdeel = {"A Centrum": "Centrum","B Westpoort": "Westpoort", "E West": "West", "M Oost": "Oost", "K Zuid": "Zuid", "F Nieuw west": "Nieuw west", "N Noord": "Noord", "T Zuidoost": "Zuidoost"}

    

  
  var stadsdelen = topojson.feature(data, data.objects.buurten).features;
  incomeListYears = []
  rentListYears = []
  socialRentList = []
  nonsocialRentList = []
  emptyList = Array(8).fill(0)

  DeelGemeenteList = ["A  Centrum", "E  West", "F  Nieuw-West", "K  Zuid", "M  Oost", "N  Noord", "T  Zuidoost", "Amsterdam"];
  DeelGemeenteList1 = ["A Centrum", "E West", "F Nieuw-West", "K Zuid", "M Oost", "N Noord", "T Zuidoost", "Amsterdam"];
  

// income list
  for (i = 2012; i < 2016; i++) {
    incomeList = []
    incomeListYears.push(incomeList)
    for (j = 0; j < 8; j++) {
      incomeList.push(income[DeelGemeenteList[j]][i])
      }
    }

    rentListYears = []
    years = [2013, 2015]

    
// rent list
    for (i = 0; i < 2; i++) {
        rentList = []
        for (j = 0; j < 8; j++) {
            rentList.push(rent[DeelGemeenteList1[j]][years[i]])
            
        }
        rentListYears.push(rentList)
    }
    socialrentlist = []
nonsocialrentlist = []


// sort social rent list
    for (j = 0; j < 8; j++) {
        socialRentList.push(socialrent[DeelGemeenteList1[j]]) 
        nonsocialRentList.push(100 - socialrent[DeelGemeenteList1[j]])    
    }
    
    // console.log(100 - socialRentList[0][2015]);
    for (i = 0; i < 8; i++) {
      socialrentlist.push(socialRentList[i][2015])
      nonsocialrentlist.push(100 - socialRentList[i][2015]) 
  }
  // console.log(nonsocialrentlist)

  // console.log(Testlist);
        // rentListSocial = []
        // rentListSocial.push(rent[DeelGemeenteList1[j]][2013.1])
        // rentListSocial.push(rent[DeelGemeenteList1[j]][2015.1])
        // rentListYears.push(rentListSocial)  



  income2015 = incomeListYears[3]
// console.log(incomeListYears)

// Set tooltips
  var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                if(DeelGemeenteList1.includes(d.properties.Stadsdeel_code)){
                    var location = DeelGemeenteList1.indexOf(d.properties.Stadsdeel_code)
                    var newIncome2015 = income2015[location];
                }
            return "<strong>Deelgemeente: </strong><span class='details'>" + stadsdeel[d.properties.Stadsdeel_code] + "<br></span>" + "<strong>Income (euro): </strong><span class='details'>" + newIncome2015 +"<br></span>";
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
.domain([20000,22000,24000,26000,28000,34000])
.range(["rgb(254,240,217)", "rgb(253,212,158)", "rgb(253,187,132)", "rgb(252,141,89)","rgb(239,101,72)","rgb(215,48,31)","rgb(153,0,0)","rgb(37,37,37)"]);
            
var path = d3.geoPath()
  .projection(projection);

// draw borders around stadsdelen
svg.append("path")
.attr("class", "stadsdeel-borders")
.attr("d", path(topojson.mesh(data, data.objects.buurten, function(a, b) { return stadsdeel[a.properties.Stadsdeel_code] !== stadsdeel[b.properties.Stadsdeel_code]; })));

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
            .data([20000,22000,24000,26000,28000,34000 +"+"])
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


// Draw the deelgemeenten
  svg.selectAll(".buurt")
     .data(stadsdelen)
     .enter().insert("g")
     .append("path")
    //  .attr("class", "buurt")
    //  .attr("d", path)



svg.append("g")
     .attr("class", "buurt")
     .selectAll("path")
     .data(stadsdelen)
     .enter()
     .append("path")
     .attr("d", path)
     .style("fill", function(d) {
        if(DeelGemeenteList1.includes(d.properties.Stadsdeel_code)){
            var location = DeelGemeenteList1.indexOf(d.properties.Stadsdeel_code)
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
    
     // load line chart of deelgemeente when clicked on
    .on('click', function(d){
        d3.select("#chart > *").remove()
        d3.select("#piechart > *").remove()
        
        if(DeelGemeenteList1.includes(d.properties.Stadsdeel_code)){
            var location = DeelGemeenteList1.indexOf(d.properties.Stadsdeel_code);
        
            var rent2013 = rentListYears[0][location]
            var rent2015 = rentListYears[1][location]
            var rent2014 = (((rentListYears[0][location]) + rent2015)/2)
            var rent2012 = (rentListYears[0][location]) - (rent2014-rentListYears[0][location])

            var year = [2012, 2013, 2014, 2015]
            
            var data = [{year: year[0], income: incomeListYears[0][location], rent: rent2012},
                        {year: year[1], income: incomeListYears[1][location], rent: rent2013},
                        {year: year[2], income: incomeListYears[2][location], rent: rent2014},
                        {year: year[3], income: incomeListYears[3][location], rent: rent2015}]
            
            var socialrentdata = [{socialrent: socialrentlist[location]}, {socialrent: nonsocialrentlist[location]}]
            console.log(socialrentdata)
            
            buildPieChart(socialrentdata)
            createLinechart(data)


            
      //line   
            // var canvas = document.getElementById('chart1');
            // var TestChart = new Chart(canvas, {
            //   type: 'line',
            //   data: {
            //     labels: [year[0], year[1], year[2], year[3]],
            //     datasets: [{
            //       label: 'Income',
            //       yAxisID: 'Income',
            //       data: [incomeListYears[0][location], incomeListYears[1][location], incomeListYears[2][location], incomeListYears[3][location]],        
            //       backgroundColor: [
            //           'rgba(105, 0, 132, .2)',
            //         ],
            //         borderColor: [
            //           'rgba(200, 99, 132, .7)',
            //         ],
            //         borderWidth: 2
                 
            //     }, {
            //       label: 'Rent',
            //       yAxisID: 'Rent',
            //       data: [rent2013, rent2013, rent2014, rent2015], 
            //         backgroundColor: [
            //           'rgba(0, 137, 132, .2)',
            //         ],
            //         borderColor: [
            //           'rgba(0, 10, 130, .7)',
            //         ],
            //         borderWidth: 2
            //     }]
            //   },
            //   options: {
            //     scales: {
            //       yAxes: [{
            //         id: 'Income',
            //         type: 'linear',
            //         position: 'left',
            //       }, {
            //         id: 'Rent',
            //         type: 'linear',
            //         position: 'right',
            //       }]
            //     }
            //   }
            // });
        
            
            // scroll down
            document.documentElement.scrollTop = 1630;
            
            return(data)
        
        
        
        
        }
    });
}
  };

  function createLinechart(data) {
   
    // use standard margins
    var margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = window.innerWidth - margin.left - margin.right 
    , height = window.innerHeight - margin.top - margin.bottom; 
    padding = 20;

    // add SVG 
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X scale
    var xScale = d3.scaleLinear()
        .domain([2012, 2015])
        .range([0, width]);
   
    // Y scale 
    var yScale = d3.scaleLinear()
        .domain([20000, 35000])
        .range([height, 0]);

    var yScale2 = d3.scaleLinear()
    .domain([0, width])
    .range([height, 0]);

    // X axis
    svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(xScale)
       .ticks(4));
            
    // title x axis
    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + padding + 20) + ")")
        .attr("class", "x axis", margin.top)
        .style("text-anchor", "middle")
        .text("Year");

    // left Y axis 
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale));
    
    // title left y axis
    svg.append("text")
    .attr("dy", "-1.2em")
    .style("text-anchor", "middle")
    .text("Income (Euro)");

    // right Y axis 
    svg.append("g")
    .attr("class", "right y axis")
    .attr("transform", "translate( " + width + ", 0 )")
    .call(d3.axisRight(yScale2));
    
    // title right y axis
    svg.append("text")
    .attr("dy", "-1.2em")
    .attr("transform", "translate( " + width + ", 0 )")
    .style("text-anchor", "middle")
    .text("Rent");


    createrentline(data, svg, xScale, yScale2)
    createincomeline(data, svg, xScale, yScale)
    
  }
    function createincomeline(data, svg, xScale, yScale) {
    
    // income line
    var incomeline = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.income))
    .curve(d3.curveMonotoneX);
   
    // define the area
    var area = d3.area()
    .x(function(d) { return xScale(d.year); })
    .y0(height-147)
    .y1(function(d) { return yScale(d.income); })
    .curve(d3.curveMonotoneX);

    // add the area
    svg.append("path")
       .data([data])
       .attr("class", "area1")
       .attr("d", area);
    
    svg.append('path')
      .datum(data)
      .style('stroke','#D073BA')
      .style('stroke-width', 2)
      .style('fill', 'none')
      .attr('d', incomeline)
      .call(transition);
    
    //  circles income line
    svg.selectAll(".buurt")
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'circle')
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale(d.income))
        .attr('r', 5)
        
        // tooltips
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){ 
            tip.show(d);
            
            d3.select(this)
            .style("opacity", 0.9)
            .style("stroke","pink")
            .style("stroke-width",3);
            })
            .on('mouseout', function(d){
            tip.hide(d);
            })
            // tooltip income
           var tip = d3.tip()
           .attr('class', 'd3-tip')
           .offset([-10, 0])
           .html(function(d) {
return "<strong>Year: </strong><span class='details'>" + d.year + "<br></span>" + "<strong>Income (euro): </strong><span class='details'>" + d.income +"<br></span>";
})
svg.call(tip);
    }
// end function income line

function createrentline(data, svg, xScale, yScale2) {

    // rent line
    var rentline = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale2(d.rent))
    .curve(d3.curveMonotoneX);

    // define the area
    var area = d3.area()
    .x(function(d) { return xScale(d.year); })
    .y0(height-147)
    .y1(function(d) { return yScale2(d.rent); })
    .curve(d3.curveMonotoneX);

    // add the area
    svg.append("path")
    .data([data])
    .attr("class", "area2")
    .attr("d", area);

    svg.append('path')
    .datum(data)
    .style('stroke','rgba(0, 10, 130, .7)')
    .style('stroke-width', 2)
    .style('fill', 'none')
    .attr('d', rentline)
    .call(transition);
       
    // circles rent line 
    svg.selectAll(".buurt")
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'circle')
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale2(d.rent))
        .attr('r', 5)
        
        // tooltips
        .style('stroke-width', 0.9)
        .on('mouseover',function(d){ 
            tip1.show(d);
        
         d3.select(this)
         .style("opacity", 0.5)
         .style("stroke","darkblue")
         .style("stroke-width",3);
         })
         .on('mouseout', function(d){
         tip1.hide(d);
         })  
            
        // tooltip rent
        var tip1 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
        return "<strong>Year: </strong><span class='details'>" + d.year + "<br></span>" + "<strong>Rent (euro): </strong><span class='details'>" + d.rent +"<br></span>";
        })
        svg.call(tip1);
        }

        function transition(path) {
            path.transition()
                .duration(4000)
                .attrTween("stroke-dasharray", tweenDash);
        }

        function tweenDash() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t); };

        
        }   
        // function readFunction() {
        //     var dots = document.getElementById("dots");
        //     var moreText = document.getElementById("more");
        //     var btnText = document.getElementById("readButton");
          
        //     if (dots.style.display === "none") {
        //       dots.style.display = "inline";
        //       btnText.innerHTML = "Read more"; 
        //       moreText.style.display = "none";
        //     } else {
        //       dots.style.display = "none";
        //       btnText.innerHTML = "Read less"; 
        //       moreText.style.display = "inline";
        //     }
        //   }

        // when the user clicks on the button, scroll to the first visualization
        function downFunction() {
            document.documentElement.scrollTop = 770;
        }    
        function getSelectValue() {
            d3.select("#chart > *").remove()
            d3.select("#piechart > *").remove()
            var selectedValue = document.getElementById("list").value;
            var location = selectedValue
            
            var rent2013 = rentListYears[0][location]
            var rent2015 = rentListYears[1][location]
            var rent2014 = (((rentListYears[0][location]) + rent2015)/2)
            var rent2012 = (rentListYears[0][location]) - (rent2014-rentListYears[0][location])
            var year = ['2012', '2013', '2014', '2015']
            
            var data = [{year: year[0], income: incomeListYears[0][location], rent: rent2012},
                        {year: year[1], income: incomeListYears[1][location], rent: rent2013},
                        {year: year[2], income: incomeListYears[2][location], rent: rent2014},
                        {year: year[3], income: incomeListYears[3][location], rent: rent2015}]

            var socialrentdata = [{socialrent: socialrentlist[location]}, {socialrent: nonsocialrentlist[location]}]
            buildPieChart(socialrentdata)
            createLinechart(data)  
        }        
        
        function buildPieChart(socialrentdata) {
          
          
          radius = Math.min(width, height) / 2;

// color
var colors = d3.scaleThreshold()
// .domain([1, 10, 14])
.range(["rgb(253,212,158)", "rgb(153,0,0)"]);

            var details = socialrentdata

            var data = d3.pie()
            .value(function(d){return d.socialrent;})(details);

            
    const svg = d3.select("#piechart")
    .attr("text-anchor", "middle")
    .style("font", "12px sans-serif");

    const g = svg.append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`)
    // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                  
    var segments = d3.arc()
    .outerRadius(radius - 200)
    .innerRadius(0);

          g.selectAll("path")
          .data(data)
          .enter()
          .append("path")
          .attr("fill", function(d, i) { return colors(i); }
          )
          .attr("d", segments)
          .append("title")
          .text(d => {d.data.socialrent})
          

                
          const text = g.selectAll("text")
          .data(data)
          .enter().append("text")
            .attr("transform", d => `translate(${segments.centroid(d)})`)
            // .attr("dy", "0.35em");

            text.append("tspan")
            // .attr("x", 10)
            // .attr("y", "-0.7em")
            // .style("font-weight", "bold")
            .style("opacity", 1)
            .style("stroke","black")
            // .style("stroke-width",1)
            .text(d => d.data.socialrent);

            
            


    

    

   



                 
  
    
   

       

        // sections.append("text")
        //         .attr("transform", function(d){
        //         d.innerRadius = 0;
        //         d.outerRadius = radius - 200;
        //         return "translate(" + segments.centroid(d) + ")"
        //         })
        //         .attr("text-anchor", "middle")
        //         .text(function (d, i){
        //           return "test";
        //         })
      
        // var content = d3.select("g")
        //               .selectAll("text")
        //               .data(data);

      //  g.enter()
      //         .append("text")
      //         .each(function(d)
      //         {
      //         var center = labelArc.centroid(d);
      //         console.log(center)
      //         d3.select(this)
      //           .attr("x", center[0])
      //                        .attr("y", center[1])
      //                        .text(function(d){
      //                          console.log(d.value)
      //                         return d.value;
      //                         })
      //         })







  // var path = svg.datum(data).selectAll("path")
  //     .data(data)
  //   .enter().append("path")
  //     .attr("fill", function(d, i) { return color(i); })
  //     .attr("d", segments)
  //     .each(function(d) { this._current = d; }); // store the initial angles

  // d3.selectAll("input")
  //     .on("change", change);

  // var timeout = setTimeout(function() {
  //   d3.select("input[value=\"socialrent\"]").property("checked", true).each(change);
  // }, 2000);

  // function change() {
  //   var value = this.value;
  //   clearTimeout(timeout);
  //   pie.value(function(d) { return d[value]; }); // change the value function
  //   path = path.data(data); // compute the new angles
  //   path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
  // };

// function type(d) {
// //   d.rent = +d.value;
//   d.income = +d.income;
//   return d;
// }

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
// function arcTween(a) {
//   var i = d3.interpolate(this._current, a);
//   this._current = i(0);
//   return function(t) {
//     return arc(i(t));
//   };
// }
}
       