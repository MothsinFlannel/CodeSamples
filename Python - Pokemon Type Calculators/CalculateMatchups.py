import json

with open("TypeData.json", "r") as file:
    data = json.load(file)

# Extract type matchups
types = data["types"]

def calculate_weaknesses_and_strengths(type1, type2=None):
    # Initialize effectiveness for all types
    all_types = types.keys()
    effectiveness = {t: 1 for t in all_types}  # Start with neutral effectiveness (1.0)
    
    # Helper function to apply defense multipliers
    def apply_defense_multipliers(target_type, current_effectiveness):
        defense = types[target_type]["defense"]
        for attacking_type in defense.get("weakAgainst", []):
            current_effectiveness[attacking_type] *= 2
        for attacking_type in defense.get("strongAgainst", []):
            current_effectiveness[attacking_type] *= 0.5
        for attacking_type in defense.get("immuneTo", []):
            current_effectiveness[attacking_type] = 0
        return current_effectiveness
    
    # Apply multipliers for the first type, then do the second type if it exists
    effectiveness = apply_defense_multipliers(type1, effectiveness)
    
    if type2:
        effectiveness = apply_defense_multipliers(type2, effectiveness)
    
    # Classify effectiveness levels
    results = {"x4 Weakness": [], "x2 Weakness": [], "x0.5 Resistance": [], "x0.25 Resistance": [], "Immunity": []}
    for t, multiplier in effectiveness.items():
        if multiplier == 4:
            results["x4 Weakness"].append(t)
        elif multiplier == 2:
            results["x2 Weakness"].append(t)
        elif multiplier == 0.5:
            results["x0.5 Resistance"].append(t)
        elif multiplier == 0.25:
            results["x0.25 Resistance"].append(t)
        elif multiplier == 0:
            results["Immunity"].append(t)
    
    return results

while True:

    # get user input
    type1 = input("Enter Type 1 (or 'Exit' to quit): ").capitalize()
    if type1.lower() == "exit":
        break
    type2 = input("Enter Type 2 (or leave blank, or 'Exit' to quit): ").capitalize()
    if type2.lower() == "exit":
        break
    if type2 == "":
        type2 = None

    # input validation
    if type1 not in types:
        print(f"Invalid type: {type1}. Please try again.")
        continue
    if type2 and type2 not in types:
        print(f"Invalid type: {type2}. Please try again.")
        continue

    # calculate and display results
    result = calculate_weaknesses_and_strengths(type1, type2)
    print(f"\nWeaknesses and Resistances for {type1}/{type2 if type2 else ''}:")
    for key, values in result.items():
        print(f"{key}: {', '.join(values) if values else 'None'}")
    print("-" * 40)

print("Goodbye!")
