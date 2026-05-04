const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    // ✅ Serve HTML
    if (req.url === "/") {
        fs.readFile("index.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading HTML");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }

    // ✅ API route
    else if (req.url === "/api/employees") {
        fs.readFile("employees.json", "utf8", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error reading JSON");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(data);
        });
    }

    else {
        res.writeHead(404);
        res.end("Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});