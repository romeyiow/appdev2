const http = require('http')

const server = http.createServer((req, res) => {
    const url = req.url;
    // console.log (url)
    if (url === "/greet") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("Hello, welcome to Node.js!");
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end("Page not found!")
    }
});


server.listen(3000, 'localhost', () => {
    console.log("Server running at port 3000 ...")
});