
function main(response) {
    var data = response[0];
    var rent = response[1];
    var income = response[2];
    var socialrent = response[3];
    var stadsdeel = {
        "A Centrum": "Centrum",
        "B Westpoort": "Westpoort",
        "E West": "West",
        "M Oost": "Oost",
        "K Zuid": "Zuid",
        "F Nieuw-West": "Nieuw West",
        "N Noord": "Noord",
        "T Zuidoost": "Zuidoost"
    }
    var stadsdelen = topojson.feature(data, data.objects.buurten).features;
    incomeListYears = []
    rentListYears = []
    socialRentList = []
    nonsocialRentList = []

    // two lists because of dataset with extra space
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
        // default data is Amsterdam 
    var location = 7;

        var rent2013 = rentListYears[0][location]
        var rent2015 = rentListYears[1][location]
        var rent2014 = (((rentListYears[0][location]) + rent2015) / 2)
        var rent2012 = (rentListYears[0][location]) - (rent2014 - rentListYears[0][location])

        var year = [2012, 2013, 2014, 2015]

        var testdata = [{
                year: year[0],
                income: incomeListYears[0][location],
                rent: rent2012
            },
            {
                year: year[1],
                income: incomeListYears[1][location],
                rent: rent2013
            },
            {
                year: year[2],
                income: incomeListYears[2][location],
                rent: rent2014
            },
            {
                year: year[3],
                income: incomeListYears[3][location],
                rent: rent2015
            }
        ]





    socialrentlist = []
    nonsocialrentlist = []

    // sort social rent lists
    for (j = 0; j < 8; j++) {
        socialRentList.push(socialrent[DeelGemeenteList1[j]])
        nonsocialRentList.push(100 - socialrent[DeelGemeenteList1[j]])
    }

    // create rent lists
    for (i = 0; i < 8; i++) {
        socialrentlist.push(socialRentList[i][2015])
        nonsocialrentlist.push(100 - socialRentList[i][2015])
    }
    
    var socialrentdata = [{
        socialrent: socialrentlist[location]
    }, {
        socialrent: nonsocialrentlist[location]
    }]
  
    income2015 = incomeListYears[3]

    
    // Set tooltips
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            if (DeelGemeenteList1.includes(d.properties.Stadsdeel_code)) {
                var location = DeelGemeenteList1.indexOf(d.properties.Stadsdeel_code);
                var newIncome2015 = income2015[location];
            }
            // give message when data is missing
            else {
                var newIncome2015 = "No data for location";
            }
            return "<strong>Submunicipality: </strong><span class='details'>" + stadsdeel[d.properties.Stadsdeel_code] + "<br></span>" + "<strong>Income (euro): </strong><span class='details'>" + newIncome2015 + "<br></span>";
        })



    
    var svg = d3.select("#map");
    width = +svg.attr("width"),
        height = +svg.attr("height");

    svg.append("svg")
        .append('g')
        .attr('class', 'map')

    // properties of map visualization
    var projection = d3.geoAlbers()
        .center([4.9, 52.366667])
        .rotate(120)
        .scale(250000)
        .translate([width / 2, height / 2.1]);

    // color scale
    var datascale = [20000, 22000, 24000, 26000, 28000, 34000, "No data"];
    var color = d3.scaleThreshold()
        .domain(datascale)
        .range(["rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,69,148)", "rgb(37,37,37)"]);

    var path = d3.geoPath()
        .projection(projection);

    // draw borders around stadsdelen
    svg.append("path")
        .attr("class", "stadsdeel-borders")
        .attr("d", path(topojson.mesh(data, data.objects.buurten, function (a, b) {
            return stadsdeel[a.properties.Stadsdeel_code] !== stadsdeel[b.properties.Stadsdeel_code];
        })));

    // variables
    var y0 = height - 180;
    var x0 = 10;
    var spacingx = 55;
    var legendhight = height - 200;
    var titlehight = 20

    // append a title to the chart
    svg.append("text")
    .attr("text-anchor", "middle")    
    .attr("x", width/2)             
    .attr("y", titlehight)
    .style("font-size", "20px")
    .style("font-family", "sans-serif")
    .text("Average income per submunicipality of Amsterdam in 2015");

    // legend
    svg.append("text")
        .attr("x", x0)
        .attr("y", legendhight)
        .attr("font-size", "large")
        .attr("font-weight", "bold")
        .text("Income Legenda");

    legend = svg.selectAll("#map")
        .data(datascale)
        .enter()
        .append("g")
        .attr("class", ".legend")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    // create boxes
    legend.append("rect")
        .attr("y", y0)
        .attr("x", x0)
        .attr("width", 40)
        .attr("height", 20)
        .style("fill", color);

    // add text to legend
    legend.append("text")
        .attr("x", spacingx)
        .attr("y", y0 + 18)
     
        .text(function (d) {
            return d;
        })

    svg.call(tip);
    ready(data, income2015, testdata);

    function ready(data, income2015, testdata) {

        // Draw the deelgemeenten
        svg.selectAll(".buurt")
            .data(stadsdelen)
            .enter().insert("g")
            .append("path");

        svg.append("g")
            .attr("class", "buurt")
            .selectAll("path")
            .data(stadsdelen)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function (d) {
                if (DeelGemeenteList1.includes(d.properties.Stadsdeel_code)) {
                    var location = DeelGemeenteList1.indexOf(d.properties.Stadsdeel_code)
                    var newIncome2015 = income2015[location];
                    return color(newIncome2015);

                }
            })
            .style("opacity", 0.8)

            // tooltips
            .style('stroke-width', 0.3)
            .on('mouseover', function (d) {
                tip.show(d);

                d3.select(this)
                    .style("opacity", 1)
                    // .style("stroke", "rgb(,0,0)")
                    .style("stroke-width", 1);
            })
            .on('mouseout', function (d) {
                tip.hide(d);

                d3.select(this)
                    .style("opacity", 0.8)
                    .style("stroke", "white")
                    .style("stroke-width", 0.3);
            })

            // load line chart of deelgemeente when clicked on
            .on('click', function (d) {

                getSelectValue1(d)

                // if (DeelGemeenteList1.includes(d.properties.Stadsdeel_code)) {
                    
                //     d3.select("#chart > *").remove()
                //     d3.selectAll("#piechart > *").remove()

                //     var location = DeelGemeenteList1.indexOf(d.properties.Stadsdeel_code);
        
               

                //     var data = testdata

                //     var socialrentdata = [{
                //         socialrent: socialrentlist[location]
                //     }, {
                //         socialrent: nonsocialrentlist[location]
                //     }]
                                  
                //     buildPieChart(socialrentdata)
                //     createLinechart(data)
                    
                //     // updatePieChart()
                            
                // // change dropdown menu to current'deelgemeente'
                //   document.getElementById("dropdown").value = location;
                    
                //   return (socialrentdata)
                // }
                // else{
                //     console.log("geen data")
                // }
             });
            console.log(testdata)
             var data = testdata;

             createLinechart(data)
             buildPieChart(socialrentdata)
             document.getElementById("dropdown").value = location;
            }
};