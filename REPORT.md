### Description
![single screen shot](/doc/section1.png)
Data is visualized for the submunicipalities of Amsterdam on rent prices, social versus private rent, and income versus rent prices between 2012 and 2015 to provide insights in the Amsterdam housing market and to find out if a difference is developing in income and housing prices.

### Technical design
#### General overview
The design consists of three sections which are linked by buttons:
- Section 1: shows main page with a background which is a picture of Amsterdam and a bridge I cross every day when I cycle to Science Park (very esthetical, I know). On the main page a background story about the visualization can be read.
- Section 2: consists of an interactive map of Amsterdam and a pie chart with a drop down menu. The interactive map has a hover function showing the average income and name of each submunicipality. When a submunicipality in the map is clicked the other two visualizations changes their data to that submunicipality. The same function is used for the dropdown menu of the piechart.
- Section 3: a line chart is shown here with a double y axis providing both information on rent and income changes between 2012-2015 per submunicipality. The legend is clickable and can be used to decide what the user wants to see: income data, rent data, or both. The  line chart makes use of a tooltip which shows the income and rent data when hovering over the circles.

Every section is linked by buttons so you can easily go back and forth between the visualization.
#### Further into detail
The code needed for the visualization is saved in different maps:
- The data map holds all data used for the visualization: the original Excel files, Python files to convert the data, and JSON files which are actually used when loading the data.
- The data is loaded in the data map which is split into a CSS map, HTML map, and JavaScript map. 
    - In the Javascript map linked.js is the main file that loads the JSON files.
    - Every visualization has its own file: map.js, piechart.js, and linechart.js.
    - A fifth file: d3-tip.js is used for the tooltip and is not build by me.

    - The HTML file is used to create a general structure in the website for which "sections" are used.
    - The CSS file is used for the layout of the visualizations and website.
- The most important functions in the files are: getSelectValue(), which gets the data needed, createLineChart(), which creates the line chart, createRentLine(), which loads the rent line, createIncomeLine(), which loads the income line, and buildPieChart(), which loads the pie chart.

### Challenges
#### Differences with original design
- Originaly the plan was to make two line charts however this was not allowed. Therefore the second line chart, which would give the option to compare Amsterdam to other Dutch cities, was replaced by a pie chart. Because the data used wasn't the best fit for visualizing it using a pie chart the dataset was replaced by social vs private rent in Amsterdam.

#### Technical challenges
The following challenges were experienced during the building of the website:
- One of the main challenges was to find a Topo JSON file that shows Amsterdam and its submunicipalities. This was solved by taking a map of Amsterdam (http://bl.ocks.org/JulesBlm/918e2987805c7189f568d95a4e8855b4) and modify the map using mapsharer (https://mapshaper.org/).
- A second challenge was to find recent data for the submunicipalities. There are no good datasets available on house prices per submunicipality over a number of years. Therefore the decision was made to use rent data instead of buy prices.
- When the map was finally loaded the tooltip did not work. This was finally solved by creating two lists of submunicipalities in which one list used double spaces as in the data files.
- The legend of the map was a big challenge because of the need to show "no data" for the submunicipality: Westpoort. To do this d3 color threshold was changed to d3 color ordinal and several configurations were tried. However, even with help the problem was not solved. Therefore the trade-off was made to keep the "no data" out of the legend.
- The double line chart shows two lines that have areas under the line. When the area of a line covered the other line the tooltip was not working. This was solved by putting the lines in two different functions and writing code that always first plot to highest line and than the lower one so both tooltips are working.
- The legend of the double line chart is clickable but both legend blocks execute different functions. Therefore the legend blocks were seperately written instead building both at once.
- The dropdown menu under the pie chart has the option to make the visualizations show data for every submunicipality. But if the dropdown was not used to show data of a submunicipality the dropdown did not change with it. This was solved by adding code to each function that loads data to change the dropdown menu with the last loaded data.

### An ideal world
In an ideal world a tranform function would be added instead of removing and adding. However after trying to build the function a couple of times too many errors kept appearing and therefore the decision was made to not use a transformation function. Further it would have been nice if more recent data was availabe, however, this was not the case.