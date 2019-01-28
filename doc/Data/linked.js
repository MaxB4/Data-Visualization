window.onload = function () {

    var data = "buurten.json"
    var rentprice = "RentPrice.json"
    var income = "Income.json"
    var socialrent = "Socialrent.json"
    var requests = [d3.json(data), d3.json(rentprice), d3.json(income), d3.json(socialrent)];

    Promise.all(requests).then(function (response) {
        main(response);
    }).catch(function (e) {
        throw (e);
    });
}

// when the user clicks on the button, scroll to the first visualization
// function downFunction() {
//     document.documentElement.scrollTop = 770;
// }

function getSelectValue() {
    d3.select("#chart > *").remove()
    d3.selectAll("#piechart > *").remove()
    var location = document.getElementById("dropdown").value;

    var rent2013 = rentListYears[0][location]
    var rent2015 = rentListYears[1][location]
    var rent2014 = (((rentListYears[0][location]) + rent2015) / 2)
    var rent2012 = (rentListYears[0][location]) - (rent2014 - rentListYears[0][location])
    var year = ['2012', '2013', '2014', '2015']

    var data = [{
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

    var socialrentdata = [{
        socialrent: socialrentlist[location]
    }, {
        socialrent: nonsocialrentlist[location]
    }]
    buildPieChart(socialrentdata)
    createLinechart(data)
}