import pandas as pd
# source average income https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83932NED/table?ts=1547401773625

# global standards
INPUT ='2018_jaarboek_114.xlsx'
averageIncome2015 = 271

# read input and put in dataframe
df = pd.read_excel(INPUT, header=1) 

# drop NaN values
df = df.dropna()

# drop irrelevant columns
df = df.drop(columns=['verandering 2015 t.o.v. 2012 (%)'])
# df.columns != ['stadsdeel']:
# df = df.applymap(lambda x: float(x.replace(',','.')))

# df[2012] = df[2012].astype(float)
# df[2012] = [x.replace(',', '.') for x in df[2012]]



df[2015]  = df[2015] * averageIncome2015

# turn into JSON file
# df.set_index('stadsdeel').to_json('Income.json', orient='index')

with pd.option_context('display.max_rows', None, 'display.max_columns', None):
    print(df)