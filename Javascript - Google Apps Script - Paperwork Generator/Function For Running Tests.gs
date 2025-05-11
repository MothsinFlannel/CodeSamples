// -------------------------- TEST FUNCTION - RUNS THE doPost() FUNCTION WITH FAKE DATA --------------------------
function test_doPost() {

// -------------------------- DECLARE ALL OF YOUR FAKE INPUT DATA --------------------------
  const testPayload = {
    submissionTitle: "2025-05-01-John Doe-Arcade Express-(Game Request-New Location, Upgrade, Removal, Swap)",
    formTypeTagsString: "New Location, Addition, Removal, Swap",
    collectorName: "John Doe",
    legalName: "Arcade Express LLC",
    tradeName: "Arcade Express",
    address: "123 Main St",
    city: "Exampleville",
    state: "CA",
    zip: "90210",
    ownersName: "Jane Smith",
    ownersEmail: "jane@example.com",
    requestDate: "2025-05-01",
    targetDate: "2025-05-10",
    storePhone: "555-123-4567",
    split: "50/50",
    county: "Example County",
    ownersCell: "555-987-6543",
    contactCell: "555-222-1111",
    requestNotes: "Please install ASAP",
    vCardConfig: "Some config",
    printers: "Pyramid",
    creditMethod: "Fills",
    isInternetAvailable: "Yes",
    internetAvailableDate: "2025-05-05",
    standupsStartingGameNumber: 1001,
    standupsMinBet: 1,
    standupsMaxBet: 10,
    standupsJackpot: 1000,
    fishStartingGameNumber: 2001,
    fishMinBet: 0.5,
    fishMaxBet: 5,
    fishBetInterval: 0.5,
    isRemoveAll: "Yes",
    additionalTerminals: [
      { cabinetType: "CM", boardGameName: "BoardA", billAcceptor: "Spectral", printer: "Pyramid", quantity: 20, other: "GPS", additionalDetails: "Details for the first add" },
      { cabinetType: "Wood", boardGameName: "GameB", billAcceptor: "Spectral", printer: "", quantity: 13, other: "", additionalDetails: "" }
    ],
    removalTerminals: [
      { position: 13, cabinetType: "Kiosk", cabinetAssetNumber: "41541", boardGameName: "GameA", boardAssetNumber: "f728419", additionalDetails: "remove dis right now!!!" },
      { position: 16, cabinetType: "Kiosk", cabinetAssetNumber: "61364", boardGameName: "BoardA", boardAssetNumber: "h123424", additionalDetails: "this too?" },
      { position: 99, cabinetType: "Kiosk", cabinetAssetNumber: "85475", boardGameName: "BoardB", boardAssetNumber: "a28419", additionalDetails: "hate this one!" }
    ],
    swapTerminals: [
      { position: 18, swapType: "Board Swap", cabinetAssetNumberOld: "172829", boardAssetNumberOld: "734320", cabinetAssetNumberNew: "172829", boardAssetNumberNew: "111111", additionalDetails: "this board is stupid!" },
      { position: 12, swapType: "Cabinet Swap", cabinetAssetNumberOld: "623345", boardAssetNumberOld: "555555", cabinetAssetNumberNew: "939393", boardAssetNumberNew: "555555", additionalDetails: "this cabinet is stupid!" },
    ]
  };

// -------------------------- MAKE THE FAKE DATA INTO AN OBJECT SO IT WILL LOOK EXACTLY LIKE THE REAL DATA'S FORMAT --------------------------
  const fakeEvent = {
    postData: {
      contents: JSON.stringify(testPayload)
    }
  };

// -------------------------- RUN OUR NEW FAKE EVENT --------------------------
  doPost(fakeEvent);
}
