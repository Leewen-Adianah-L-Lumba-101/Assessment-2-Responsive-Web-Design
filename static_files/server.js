const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('./static_files')); 
// Back-end includes static content such as HTML, CSS or images
//"static_files" is the name of the subdirectory that includes all the back-end content

// Whatever is requested from the port will be shown to the user
app.listen(port, () => {
    console.log(`Server running at http://localHost:${port} `);
});