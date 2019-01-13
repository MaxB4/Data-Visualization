import pandas as pd

# global standards
INPUT ='2018_jaarboek_10212.xlsx'

# read input and put in dataframe
df = pd.read_excel(INPUT, header=4) 

# drop NaN values
df = df.dropna()

# turn into JSON file
df.set_index('stadsdeel').to_json('JSON_file.json', orient='index')
with pd.option_context('display.max_rows', None, 'display.max_columns', None):
    print(df)