// Assume the input data is coming from the previous step and is a giant string
let inputString = inputData.lineItems;  // this variable will hold your giant incoming string

// Split the string into an array of individual items using double line breaks to separate each entry
let items = inputString.split("\n\n");

// To be safe, just making sure your rowsAmount is an integer. Otherwise default to 350
let rowsAmount = parseInt(inputData.rowsAmount, 10) || 350;

// Calculate the total number of sets needed
let totalSets = Math.ceil(items.length / rowsAmount); // also rounded up to ensure full coverage

// Return only the total sets count
return {
  setsTotal: totalSets
};
