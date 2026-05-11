// server.js

const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/api/status") {

        res.writeHead(200, { "Content-Type": "application/json" });

        res.end(JSON.stringify({
            message: "SecureOps-Monitor Backend Running"
        }));

    } else {

        res.writeHead(404);
        res.end("Not Found");
    }

});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});