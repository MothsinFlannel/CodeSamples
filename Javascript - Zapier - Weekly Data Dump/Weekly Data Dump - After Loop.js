// Assume the input data is coming from the previous step and is a giant string
let inputString = inputData.lineItems;  // this variable will hold your giant incoming string

/* 
We need to turn the giant string into something structured to map each value to the correct row and cell. To do this, we split our giant string into an Array of Objects.

This one gets complicated, so I'll use examples of how our data will look before an after. I can't break this one down step by step without making it look atrocious, but if you plug it into ChatGPT it can go line-by-line for you.

To start, it will just be a big string that looks like this...

    Name: Foo
    Address: 121 Water St
    Route: 1

    Name: Bar
    Address: 122 Water St
    Route: 2

    Name: Jimbob
    Address: 123 Water St
    Route: 3

... and it should come out looking like this...

    [
        {
            Name: "Foo",
            Address: "121 Water St",
            Route: "1"
        },
        {
            Name: "Bar",
            Address: "122 Water St",
            Route: "2"
        },
        {
            Name: "Jimbob",
            Address: "123 Water St",
            Route: "3"
        }
    ]
*/

let items = inputString.split("\n\n").map(item => {
  let obj = {};
  item.split("\n").forEach(line => {
    let [key, value] = line.split(":").map(str => str.trim());
    obj[key] = value;
  });
  return obj;
});

// Get the rowsAmount and current loop iteration (current loop iteration referred to as the Set ID)
let rowsAmount = parseInt(inputData.rowsAmount, 10) || 350; // Default to 350 if no rowsAmount provided
let currentSetID = parseInt(inputData.setID, 10) || 1; // Current iteration from Zapier loop

// Splits the full list of items into chunks. The amount of resulting chunks will depend on the specified Size each chunk can be. This results in an array of smaller array chunks.
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

// Run that function we just made on our data
let chunkedItems = chunkArray(items, rowsAmount);

// Count how many Chunks (or Sets) we made just now
let totalSets = chunkedItems.length;

// Get the current set based on the loop iteration we're on
let selectedSet = chunkedItems[currentSetID - 1] || [];  // Adjusting for zero-based index

// Map data for the current set
let setData = selectedSet.map((item, index) => {
  return {
    rowNumber: index + 2 + ((currentSetID - 1) * rowsAmount), // Start from row 2 for each chunk
    id: item.id,
    name: item.name,
    foobarTableHeaderA: item.foobarTableHeaderA,
    foobarTableHeaderB: item.foobarTableHeaderB,
    foobarTableHeaderC: item.foobarTableHeaderC,
    foobarTableHeaderD: item.foobarTableHeaderD
    // etc...
  };
});

// Return only the required set for the current loop iteration
return {
  setID: currentSetID, // Current loop iteration
  setsTotal: totalSets, // Total number of sets (for Zapier to determine loop count)
  setData: setData // Data for the current set
};
