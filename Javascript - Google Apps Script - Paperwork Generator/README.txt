I knew going into this project that we would need a solution built in code instead of solely relying on another service.

On top of this, I wanted to make sure my team could follow the code and make edits in the future if I leave the company for another job.

As a result, I went a little overboard with comments and trying to simplify things in this project.

Since it's made in Google Apps Script, each ".gs" file merges. This allowed me to separate functions in an organized way without having to add extra import/export statements. Keep this in mind when tracing functions that are called but don't appear to be in the file you're currently inspecting.