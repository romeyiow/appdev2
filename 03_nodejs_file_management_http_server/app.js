const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('fileOperation', (operation, filename) => {
    console.log(`${filename} has been ${operation}.`);
});

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const route = parsedUrl.pathname;
    const query = parsedUrl.query;
    const filename = query.filename;
    let filePath = "";

    const filenameIsOk = () => {
        if (!filename) {
            res.statusCode = 400;
            res.write('Error: filename query parameter is required');
            return false;
        }
        filePath = path.join(__dirname, filename);
        return true;
    };

    const errorFound = (operation, err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.write(`Error: File not found`);
                return true;
            }
            res.statusCode = 500;
            res.write(`Error ${operation} file: ${err.message}`);
            return true;
        }
        return false;
    };

    const createFile = () => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            var operation = 'created'
            if (!err) {
                res.write("File already exist; content will be overwritten...\n")
                operation = "overwritten"
            }
            fs.writeFile(filePath, query.content || "This is the default content.", (err) => {
                if (errorFound('creating', err)) return res.end();
                res.statusCode = 200;
                emitter.emit('fileOperation', 'overwritten', filename);
                return res.end(`File ${operation} successfully.`);
            });
        })
    }
    res.setHeader('Content-type', 'text/plain');

    switch (route) {
        case '/':
            res.statusCode = 200;
            res.end("Welcome to this simple file management app!");
            return;

        case '/read':
            if (!filenameIsOk()) return res.end();
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (errorFound('reading', err)) return res.end();
                res.statusCode = 200;
                emitter.emit('fileOperation', 'read', filename);
                res.end(`Content of ${filename}:\n${data}`);
            });
            break;

        case '/create':
            if (!filenameIsOk()) return res.end();
            createFile();
            break;

        case '/update':
            if (!filenameIsOk()) return res.end();
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    res.write("Note: File specified does not exist..instead of updating, it will be created.\n")
                    createFile();
                    return
                } else {
                    fs.appendFile(filePath, "\n" + (query.content || "default text to append"), (err) => {
                        if (errorFound('updating', err)) return res.end();
                        res.statusCode = 200;
                        emitter.emit('fileOperation', 'updated', filename);
                        res.end('File updated successfully.');
                    });
                }

            })

            break;

        case '/delete':
            if (!filenameIsOk()) return res.end();
            fs.unlink(filePath, (err) => {
                if (errorFound('deleting', err)) return res.end();
                res.statusCode = 200;
                emitter.emit('fileOperation', 'deleted', filename);
                res.end('File deleted successfully.');
            });
            break;

        default:
            res.statusCode = 404;
            res.end('Error: unexpected route');
    }
});

server.listen(3000, 'localhost', () => {
    console.log("Server running at http://localhost:3000");
});
