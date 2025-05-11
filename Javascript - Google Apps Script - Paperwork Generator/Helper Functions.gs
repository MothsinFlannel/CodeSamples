/* -------------------------- NORMALIZE ARRAYS --------------------------

Takes incoming data and makes sure it's an array.

If the incoming data is a string, it will parse it as JSON (pretend it's JSON instead). If that result is an Array, it returns it as an actual array instead of a string.

If it's not a parse-able string or an array, it will return an empty array to keep things from breaking completely.

Examples:
Input: console.log(normalizeArray('["apple", "banana"]')); // Output: ["apple", "banana"]
Input: console.log(normalizeArray('{"fruit": "apple"}'));  // Output: []
Input: console.log(normalizeArray(["apple", "banana"]));   // Output: ["apple", "banana"]
Input: console.log(normalizeArray(123));                   // Output: []

*/

function normalizeArray(data) {
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }
  return Array.isArray(data) ? data : [];
}

/* -------------------------- NORMALIZE KEYS --------------------------

Each Addition, Removal, and Swap Request comes in as an array of objects. For instance, your Addition Request could be...

[
  { "Quantity": 5, "Cabinet Type": "Type A", "Additional Details": "None" },    // Object 1
  { "Quantity": 3, "Cabinet Type": "Type B" },                                  // Object 2
  { "Quantity": 7, "Cabinet Type": "Type C", "Additional Details": "Foo-bar" }  // Object 3
]

The problem is, the key names "Quantity", "Cabinet Type", etc aren't exactly how we write them in the script. Our script uses things like "quantity", "cabinetType", etc.

To remedy this, we create a Key Map which tells our code "Quantity" should be changed to "quantity", "Additional Details" should be "additionalDetails", etc.

We then use this function below to take the original Array (represented as "array") and the custom Key Map we made (represented as keyMap), and have the function adjust the array's key names to reflect that Key Map.

*/

function normalizeKeys(array, keyMap) {
  return array.map(entry => {
    const normalized = {};
    for (let key in entry) {
      const cleanKey = keyMap[key] || key; // fallback to original if not mapped
      normalized[cleanKey] = entry[key];
    }
    return normalized;
  });
}
