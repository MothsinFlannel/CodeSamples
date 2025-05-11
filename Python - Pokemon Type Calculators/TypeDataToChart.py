import json
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

pd.set_option('display.max_rows', None)  # Show all rows
pd.set_option('display.max_columns', None)  # Show all columns

with open("TypeData.json", "r") as file:
    data = json.load(file)

# Extract type matchups
types = data["types"]
type_names = list(types.keys())

# Need to make a dataframe for the type matchups
# start by making the data that will go into the dataframe
chart_data = []

for type_name, type_info in types.items():
    offense = type_info["offense"]
    for strong in offense["strongAgainst"]:
        chart_data.append({"Attacker": type_name, "Defender": strong, "Effectiveness": 2})
    for weak in offense["weakAgainst"]:
        chart_data.append({"Attacker": type_name, "Defender": weak, "Effectiveness": 0.5})
    for immune in offense["immuneTo"]:
        chart_data.append({"Attacker": type_name, "Defender": immune, "Effectiveness": 0})

    # Since Balance has no matchups to loop over by design, nothing gets added to chart data normally. We include this to work around that and manually add it.
    if type_name == "Balance":
        for defender in type_names:
            chart_data.append({"Attacker": type_name, "Defender": defender, "Effectiveness": 1.0})

# Convert to a DataFrame
df = pd.DataFrame(chart_data)

# Map the rows (attacker) column (defender) and values to show between them (effectiveness)
# Also run fillna(1) to place a 1 in all the Neutral (unspecified) cells
pivot_df = df.pivot(index="Attacker", columns="Defender", values="Effectiveness").fillna(1)

# Sort by type names as they appear in the original data
pivot_df = pivot_df.reindex(index=type_names, columns=type_names)

# Plot the type chart onto an actual visual output instead of just data
plt.figure(figsize=(10, 8))
sns.heatmap(pivot_df, annot=True, cmap="coolwarm", cbar=False, fmt=".1f")

# labels and title
plt.title("Type Effectiveness Chart")
plt.xlabel("Defender")
plt.ylabel("Attacker")
plt.xticks(rotation=45)
plt.yticks(rotation=0)
plt.tight_layout()

# Show the chart
plt.show()
