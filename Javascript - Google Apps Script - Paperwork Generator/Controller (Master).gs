// -------------------------- VARIABLE DECLARATIONS --------------------------
// The Template Paperwork file
var templateFile = DriveApp.getFileById('FOOBAR_FILE_ID_A');

// The folder the new Paperwork file will generate to
var destinationFolder = DriveApp.getFolderById('FOOBAR_FOLDER_ID_A');

function doPost(e) {
  try {

// -------------------------- MAKE INCOMING DATA USEABLE --------------------------

    // Parse JSON payload (make the incoming data readable)
    const jsonData = JSON.parse(e.postData.contents);

    // Assign the JSON data to variables so we can use them
    const submissionData = jsonData;

// -------------------------- CREATE PAPERWORK --------------------------

    // Create and populate new paperwork based on template
    var fileData = populateSheetTemplate(templateFile, destinationFolder, submissionData);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        fileData: fileData
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } 
// -------------------------- IF THERE'S AN ERROR, RETURN THAT INSTEAD OF NORMAL DATA --------------------------
  catch (error) {
    Logger.log("Error processing POST request: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}