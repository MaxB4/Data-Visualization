function buildPieChart(socialrentdata) {

    var data = d3.pie()
        .sort(null)
        .value(function (d) {
            return d.socialrent;
            })(socialrentdata)

    radius = Math.min(width, height) / 2;

    // color
    var colors = d3.scaleThreshold()
        .range(["rgb(49,130,189)", "rgb(153,0,0)"]);

    var svg = d3.select("#piechart")
        .attr("text-anchor", "middle")
        .style("font", "12px sans-serif");

    // location of pie chart
    var g = svg.append("g")
        .attr("transform", "translate(" + width / 3.75 + "," + height / 2 + ")")

    // radius size
    var arc = d3.arc()
        .outerRadius(radius - 200)
        .innerRadius(0);

    // add color to slices
    g.selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("fill", function (d, i) {
            return colors(i);
        })
        .attr("d", arc)
        .append("title")

    // title piechart
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 4)
        .attr("y", height - 150)
        .style("font-size", "16px")
        .style("font-family", "sans-serif")
        .text("Social and private housing percentage (2015)");

    // pie legend
    pielegend = svg.selectAll("#piechart")
        .data(["% Social housing", "% Private housing"])
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 30 + ")";
        })

    // boxes
    pielegend.append("rect")
        .attr("x", width - 900)
        .attr("y", height - 120)
        .attr("width", 60)
        .attr("height", 30)
        .attr("fill", function (d, i) {
            return colors(i);
        });

    // add text to legend
    pielegend.append("text")
        .attr("x", width - 770)
        .attr("y", height - 100)
        .text(function (d) {
            return d;
        });

    // pie chart data
    var text = g.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)

    text.append("tspan")
        .style("opacity", 1)
        .style("stroke", "white")
        .text(d => d.data.socialrent);
}