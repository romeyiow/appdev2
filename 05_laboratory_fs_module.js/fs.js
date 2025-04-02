const fs = require('fs')

const filename = 'sample.txt';
const characterEncoding = 'utf8'

fs.readFile(filename, characterEncoding, (err, data) => {
    if (err) {
        console.error(`Error occured: ${err.message}`);
    } else {
        console.log(`
            \n============Content of sample file================
            \n${data}
            \n==============End of content==============
            `)
    }
});

const appendedContent = `\nAppended content.`;
fs.appendFile(filename, appendedContent, (err) => {
    if (err) {
        console.error(`Error: ${err.message}`)
    } else {
        console.log("Append operation was successful!");
    }
});

const content = "This is a new file created by Node.js!";
fs.writeFile('newfile.txt', content, (err) => {
    if (err) {
        console.error(`Error: ${err.message}`)
    } else {
        console.log("newfile.txt created successfully!");
    }

    fs.unlink('newfile.txt', (err) => {
        if (err) {
            console.error(`Error: ${err.message}`)
        } else {
            console.log("newfile.txt deleted successfully!");
        }
    });

});

