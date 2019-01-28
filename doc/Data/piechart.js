function buildPieChart(socialrentdata) {


    // var keys = ["A Centrum", "E West", "F Nieuw-West", "K Zuid", "M Oost", "N Noord", "T Zuidoost", "Amsterdam"];
    // dataset for piechart

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

    var g = svg.append("g")
        .attr("transform", "translate(" + width / 3.75 + "," + height / 2 + ")")

    var arc = d3.arc()
        .outerRadius(radius - 200)
        .innerRadius(0);


    g.selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("fill", function (d, i) {
            return colors(i);
        })
        .attr("d", arc)
        .append("title")
        // .text(d => {
        //     d.data.socialrent
        // })

        pielegend = svg.selectAll("#piechart")
                    .data(["% Social housing", "% Private housing"])
                    .enter()
                    .append("g")
                    .attr("class", "legend")
                    .attr("transform", function(d, i) { return "translate(0," + i * 30 + ")"; })

       
                    // title piechart
                    svg.append("text")
                    .attr("text-anchor", "middle")    
                    .attr("x", width/4)             
                    .attr("y", height - 150)
                    .style("font-size", "16px")
                    .style("font-family", "sans-serif")
                    .text("Social and private housing percentage (2015)");
                    
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
        .text(function(d){
        return d;
        }); 

    // pie chart legend
    var text = g.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)

    text.append("tspan")
        .style("opacity", 1)
        .style("stroke", "white")
        .text(d => d.data.socialrent);

    // var pielegends = svg.append("g")
    // .attr("transform", "translate(500, 100)")
    //     .selectAll(".pielegends")
    //     .data(data);

    // var pielegend = pielegends.enter()
    // .append("g")
    // .classed("pielegends", true)
    // .attr("transform", function (d, i) {
    //     return "translate(200," + (i + 1) * 50 + ")";
    // });

    // // boxes
    // pielegend.append("rect")
    //          .attr("width", 40)
    //          .attr("height", 40)
    //          .attr("fill", function (d, i) {
    //     return colors(i);
    // });

    // pielegend.append("text")
    //          .text(function (d) {
    //         return d.data.socialrent;
    //     })
    //     .attr("fill", function (d) {
    //         return colors(d.data.socialrent);
    //     })
    //     .attr("x", 50)
    //     .attr("y", 25)

    // pie transition
    // function transition() {

    // }
    // arctween
    function arcTween(a) {
        const i = d3.interpolate(this._current, a);
        this._current = i(1);
        return (t) => arc(i(t));
    }

    // update data --> https://bl.ocks.org/rshaker/225c6df494811f46f6ea53eba63da817

    // $(function() {
    //     $('a[href*=#]').on('click', function(e) {
    //       e.preventDefault();
    //       $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
    //     });
    //   });

}
// function updatePieChart() {
//     const path = svg.selectAll("path")
//     .data((data[val]));

//      path.transition().duration(200).attrTween("d", arcTween);
// }