const fs = require('fs');

console.log("Reading the file...");
fs.readFile('reflection.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log("\n========FILE CONTENT========\n", data);
});
console.log("Done reading the file.");