// Student Name: Max Baneke
// Student Number: 10797564

window.onload = function () {
    
    // open data files
    var data = "../../Data/buurten.json"
    var rentprice = "../../Data/RentPrice.json"
    var income = "../../Data/Income.json"
    var socialrent = "../../Data/Socialrent.json"
    var requests = [d3.json(data), d3.json(rentprice), d3.json(income), d3.json(socialrent)];

    Promise.all(requests).then(function (response) {
        main(response);
    }).catch(function (e) {
        throw (e);
    });
}

// get data and create new charts
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

    var socialRentData = [{
        socialrent: socialrentlist[location]
    }, {
        socialrent: nonsocialrentlist[location]
    }]
    buildPieChart(socialRentData)
    createLineChart(data)
}

// get data and create new charts
function buildCharts(d) {
    if (deelGemeenteList1.includes(d.properties.Stadsdeel_code)) {
        d3.select("#chart > *").remove()
        d3.selectAll("#piechart > *").remove()

        var location = deelGemeenteList1.indexOf(d.properties.Stadsdeel_code);

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
        var socialRentData = [{
            socialrent: socialrentlist[location]
        }, {
            socialrent: nonsocialrentlist[location]
        }]
        buildPieChart(socialRentData)
        createLineChart(data)

        // change dropdown menu to current'deelgemeente'
        document.getElementById("dropdown").value = location;

        return (socialRentData)
    } 
    // if there is no data
    else {
        return alert("No data for this submunicipality");
    }
}