import pandas as pd
# source average income https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83932NED/table?ts=1547401773625

# global standards
INPUT ='2018_jaarboek_10211.xlsx'

# read input and put in dataframe
df = pd.read_excel(INPUT, header=4, decimal=",") 

# drop NaN values
df = df.dropna()

# drop irrelevant columns
df1 = df.iloc[:,0:2]

# turn into JSON file
df1.set_index('stadsdeel').to_json('Socialrent.json', orient='index')

with pd.option_context('display.max_rows', None, 'display.max_columns', None):
    print(df1)