## Diagram

![Diagram](/doc/diagram.png)

### D3 plugins
The following D3 plugins are examples of plugins that are likely to be used:
- d3-legend
- d3-scale-chromatic
- d3-tile
- d3-zoom
- d3-scale-interactive

### Data sources
The following files are all csv files and will be converted to JSON. The files are located in the data map (doc --> data).
Gemeente Amsterdam
Publicatie: Amsterdam in cijfers 2018
- 10.2.12 Gemiddelde huurprijs voor particuliere en corporatie huursector per stadsdeel, 2013-2017
- 10.2.6 Woningvoorraad naar stadsdelen en waarde van de woning, 1 januari 2018 (procenten)
- 5.4.2 Kerncijfers inkomen stadsdelen, 2015
- 1.1.4 Index gestandaardiseerd inkomen huishoudens naar stadsdelen, 2012-2015
- (5.4.1 Kerncijfers inkomen, 2011-2015 (x 1.000 euro)  --> Amsterdam inkomen verschillende bevolkingsgroepen)
- (10.2.10 Verkochte bestaande woningen naar soort en gemiddelde prijs, 2013-2017)
CBS
- Gemiddelde huis verkoopprijzen, meerdere steden (https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83625NED/table?ts=1546961144215)
- Gemiddelde inkomen, meerdere steden (https://opendata.cbs.nl/statline/#/CBS/nl/dataset/84341ned/table?ts=1546961566335)

()Optional datasets

The data from the CBS for comparing Amsterdan to other Dutch cities cannot be downloaded in one sheet for multiple years. Therefore, 
the data will maybe, depending on what works best, be brought together in one dataframe (using a program such as Pandas).
