import pandas as pd

# global standards
INPUT ='2018_jaarboek_10212.csv'

# read input and put in dataframe
df = pd.read_csv(INPUT)

# turn into JSON file
df.set_index("stadsdeel").to_json('JSON_file.json', orient='index')