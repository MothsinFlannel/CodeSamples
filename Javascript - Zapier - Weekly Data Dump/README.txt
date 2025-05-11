This script runs twice a week to update one of our Google Sheets with a list of Active Locations we service.

Zapier has a limit on the amount of Google Sheets Rows it can update at once before crashing the Zap. As a result, we have to split the Zap into chunks and process each chunk separately.

1. TRIGGER - Schedule by Zapier - The Zap begins with a scheduled Trigger which runs twice a week.

2. PostgreSQL Action is used to connect directly to the Read-Only instance of our internal database. A simple SQL Query is ran to pull appropriate data from our "locations" table.

3. Code by Zapier - Before Loop.js - Takes the PostgreSQL response data and divides it into chunks of 350 rows each (or, if inputData.rowsAmount was set, use that value for the Max Rows in each chunk). More specifically, it's calculating how many chunks of 350 there are so we know how many times to iterate our upcoming loop.

    LOOP START

4. Looping by Zapier - Begin looping. Loop iteration counter starts at 1, and ends at the "setsTotal" value we defined in step 3.

4a. Code by Zapier - Start each instance of the loop by pulling the rows from the current chunk (data chunk is calculated based on the Loop iteration counter).

4b. Google Sheets Update Spreadsheet Rows - Import the pulled rows from step 4a to the corresponding rows in Google Sheets.

    LOOP END