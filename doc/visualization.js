window.onload = function() {

    var data = "world_countries.json"
    var GDP = "GDPcountries.json"
    var requests = [d3.json(data), d3.json(GDP)];
    
    Promise.all(requests).then(function(response) {
        main(response);
    }).catch(function(e){
    throw(e);   
    });
}
function main (response){
    var data = response[0];
    // var GDP = response[1];

    // get gdp data and put in list
    Country_GDP = []
    Country = [];
    GDP_2017 = [];
    historicGDP = [];
    var i;
    var j;
    
    // for (i = 0; i < 263; i++) {
    //     country = []
    //     historicGDP.push(country)
    //     for (j = 0; j < 1; j++){ 
    //         country.push((GDP[i]["1967"])/1000000000)
    //         country.push((GDP[i]["1977"])/1000000000)
    //         country.push((GDP[i]["1987"])/1000000000)
    //         country.push((GDP[i]["1997"])/1000000000)
    //         country.push((GDP[i]["2007"])/1000000000)
    //         country.push((GDP[i]["2017"])/1000000000)
    //         }
    //     Country.push(GDP[i]["Country Name"])
    //     GDP_2017.push(((GDP[i]["2017"])/1000000000).toFixed(2));
    // }
    
    // // Set tooltips and put gdp data in map
    // var tip = d3.tip()
    //             .attr('class', 'd3-tip')
    //             .offset([-10, 0])
    //             .html(function(d) {
    //                 if(Country.includes(d.properties.name)){
    //                     var location = Country.indexOf(d.properties.name)
    //                     var NewGDP2017 = GDP_2017[location];
    //                 }
    //             return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>GDP(billions): </strong><span class='details'>" + NewGDP2017 +"<br></span>";
    //             })

var margin = {top: -50, right: 50, bottom: 50, left: 50}
    , width = window.innerWidth - margin.left - margin.right 
    , height = window.innerHeight - margin.top - margin.bottom; 

var svg = d3.select("#map")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

}