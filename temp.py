import json

# Function to calculate quantiles
def calculate_quantiles(data, num_quantiles):
    data.sort()
    quantiles = []
    for i in range(num_quantiles + 1):
        index = int(len(data) * i / num_quantiles)
        # Ensure the index is within bounds
        if index >= len(data):
            index = len(data) - 1
        quantiles.append(data[index])
    return quantiles

# Function to assign levels based on quantiles
def assign_levels(features, quantiles):
    for feature in features:
        population = feature['properties']['population']
        for i in range(len(quantiles) - 1):
            if quantiles[i] <= population <= quantiles[i + 1]:
                feature['properties']['heatmap_level'] = i + 1
                break
    return features

# Load and process the states.geojson file
with open('states.geojson', 'r') as f:
    states_data = json.load(f)

state_populations = [feature['properties']['population'] for feature in states_data['features']]
state_quantiles = calculate_quantiles(state_populations, 7)
states_data['features'] = assign_levels(states_data['features'], state_quantiles)

with open('states_with_heatmap_levels.geojson', 'w') as f:
    json.dump(states_data, f, indent=2)

# Load and process the wa_counties.geojson file
with open('wa_counties.geojson', 'r') as f:
    wa_counties_data = json.load(f)

wa_populations = [feature['properties']['population'] for feature in wa_counties_data['features']]
wa_quantiles = calculate_quantiles(wa_populations, 7)
wa_counties_data['features'] = assign_levels(wa_counties_data['features'], wa_quantiles)

with open('wa_counties_with_heatmap_levels.geojson', 'w') as f:
    json.dump(wa_counties_data, f, indent=2)
