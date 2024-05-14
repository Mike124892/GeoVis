import json
import pandas as pd

# Load the JSON file with country information, specify UTF-8 encoding
with open('countries.json', 'r', encoding='utf-8') as f:
    country_data = json.load(f)

# Create a DataFrame from the country data
country_df = pd.DataFrame(country_data)
# Filter the necessary columns for latitude, longitude, and the country name
country_df = country_df[['iso3', 'name', 'latitude', 'longitude']]

# Load the CSV file containing population data
csv_data = pd.read_csv('API_SP.POP.TOTL_DS2_en_csv_v2_280275.csv', skiprows=4)
# Keep only the relevant columns, which include the country code and the most recent year's population data
csv_data = csv_data[['Country Code', '2022']]

# Merging the country data with the CSV to get latitude, longitude, and population for the country codes
merged_data = pd.merge(csv_data, country_df, left_on='Country Code', right_on='iso3', how='inner')

# Creating an array for each country with the required format
formatted_data = []
for _, row in merged_data.iterrows():
    # Ensure all numbers are floats. The country name remains a string.
    latitude = float(row['latitude'])
    longitude = float(row['longitude'])
    population = float(row['2022'])  # Make sure population data is converted to float
    formatted_data.append({
        "name": row['name'],
        "latitude": latitude,
        "longitude": longitude,
        "population": population
    })

# JSON structure in the desired format
result_json = formatted_data

# Write the JSON data to a file
with open('countryPop.json', 'w') as json_file:
    json.dump(result_json, json_file, indent=4)