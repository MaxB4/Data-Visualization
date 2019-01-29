function createLinechart(data) {

    // variables
        var y0 = height - 180;
        var x0 = 10;
        // var spacingx = 55;
        // var legendhight = height - 200;
        var titlehight = 0;

    // use standard margins
    var margin = {
            top: 50,
            right: 50,
            bottom: 150,
            left: 75
        },

        width = window.innerWidth - margin.left - margin.right - 20,
        height = window.innerHeight - margin.top - margin.bottom;
    padding = 20;

    // add SVG 
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add title to line chart
    svg.append("text")
    .attr("text-anchor", "middle")    
    .attr("x", width/2)             
    .attr("y", titlehight)
    .style("font-size", "20px")
    .style("font-family", "sans-serif")
    .text("Average income and rent price per submunicipality of Amsterdam between 2012 and 2015"); 

    
    var legendcolor = d3.scaleThreshold()
    .range(["rgb(49,130,189)", "rgb(153,0,0)"]);

 
    
    chartlegend = svg.selectAll("#chart")
        .data(["Rent", "Income"])
        .enter()
        .append("g")
        .attr("class", ".legend")

    .attr("transform", function(d, i) { return "translate(0," + i * 50 + ")"; })



          // boxes
         chartlegend.append("rect")
          .attr("x", margin.left + 60)
          .attr("y", height + 15)
          .attr("width", 60)
          .attr("height", 30)
          .attr("fill", function (d, i) {
  return legendcolor(i);
});

      // add text to legend
    chartlegend.append("text")
        .attr("x", margin.left)
        .attr("y", height + margin.bottom/4)
     
        .text(function (d) {
            return d;
        })
    
        // clickable legend
        svg.selectAll("rect")
        .style("opacity", 0.5)
        .on('mouseover', function (d) {
            d3.select(this)
                .style("opacity", 1)
        })
        .on('mouseout', function (d) {
            d3.select(this)
            .style("opacity", 0.5)
   
          
        })
        .on('click', function (d) {
    //   d3.select("rentpath").remove()
      d3.select("path.rentline").remove()
      d3.select("path.area2").remove()
      d3.select("circle").remove()
      console.log("test")
    //   d3.select(rentlinepath).remove()
        // d3.selectAll("#piechart > *").remove();
        })

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

    // order of plotting
    // console.log(data[2].income)
    // console.log(data)
    var linecompare = 40
    if ((data[2].income/data[2].rent) > linecompare)
    {
        createincomeline(data, svg, xScale, yScale)
        createrentline(data, svg, xScale, yScale2)
    } 
    else {
        createrentline(data, svg, xScale, yScale2)
        createincomeline(data, svg, xScale, yScale)
    }
    

}

function createincomeline(data, svg, xScale, yScale) {
    var margin = {
        top: 50,
        right: 50,
        bottom: 150,
        left: 75
    }

    // income line
    var incomeline = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.income))
        .curve(d3.curveMonotoneX);

    // define the area
    var area = d3.area()
        .x(function (d) {
            return xScale(d.year);
        })
        .y0(height - margin.bottom - 45)
        .y1(function (d) {
            return yScale(d.income);
        })
        .curve(d3.curveMonotoneX);

    // add the area
    svg.append("path")
        .data([data])
        .attr("class", "area1")
        .attr("d", area);

    svg.append('path')
        .datum(data)
        .attr("class", "incomeline")
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
        .style('stroke-width', 2)
        .style("opacity", 0.5)
        .style("stroke", "red")

        .on('mouseover', function (d) {
            tip.show(d);

            d3.select(this)
                .style("opacity", 1)
                .style("stroke", "red")
                .style("stroke-width", 2);
        })
        .on('mouseout', function (d) {
            tip.hide(d);

            d3.select(this)
            .style("opacity", 0.5)
            .style("stroke", "red")
            .style("stroke-width", 2);
        })
    // tooltip income
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            return "<strong>Year: </strong><span class='details'>" + d.year + "<br></span>" + "<strong>Income (euro): </strong><span class='details'>" + d.income + "<br></span>";
        })
    svg.call(tip);
}

function createrentline(data, svg, xScale, yScale2) {
    
    var margin = {
        top: 50,
        right: 50,
        bottom: 150,
        left: 75
    }

    // rent line
    var rentline = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale2(d.rent))
        .curve(d3.curveMonotoneX);

    // define the area
    var area = d3.area()
        .x(function (d) {
            return xScale(d.year);
        })
        .y0(height - margin.bottom - 45)
        .y1(function (d) {
            return yScale2(d.rent);
        })
        .curve(d3.curveMonotoneX);

    // add the area
    svg.append("path")
        .data([data])
        .attr("class", "area2")
        .attr("d", area);

       svg.append("path")
        .datum(data)
        .attr("class", "rentline")
        // .style('stroke', 'rgba(0, 10, 130, .7)')
        // .style('stroke-width', 2)
        // .style('fill', 'none')
        .attr('d', rentline)
        .call(transition);

    // circles rent line 
    svg.selectAll(".buurt")
        .data(data)
        .enter()
        .append('circle')
        // .attr('class', 'circle')
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale2(d.rent))
        .attr('r', 5)
        .style("stroke-width", 2)
        .style("stroke", "blue")
        .style("opacity", 0.5)
        .on('mouseover', function (d) {
            tip1.show(d);

            d3.select(this)
                .style("opacity", 1)
                .style("stroke", "blue")
                .style("stroke-width", 2);
        })
        .on('mouseout', function (d) {
            tip1.hide(d);
            
            d3.select(this)
            .style("opacity", 0.5)
        })

    // tooltip rent
    var tip1 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            return "<strong>Year: </strong><span class='details'>" + d.year + "<br></span>" + "<strong>Rent (euro): </strong><span class='details'>" + d.rent + "<br></span>";
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
    return function (t) {
        return i(t);
    };


}