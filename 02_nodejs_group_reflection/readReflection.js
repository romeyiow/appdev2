const fs = require('fs');

console.log("Reading the file...");

fs.readFile('reflection.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log("\nFile content:\n", data);
});

console.log("\nDone reading the file.");