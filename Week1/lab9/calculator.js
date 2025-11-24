// calculator_server.js

// use express
// serve static files
const http = require('http');
const url = require('url');

// Function to perform arithmetic operations
function calculate(op, a, b) {
    switch (op) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0) throw new Error("Division by zero is not allowed");
            return a / b;
        default:
            throw new Error("Invalid operation. Use add, subtract, multiply, or divide.");
    }
}

// Create HTTP server
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // Parse query parameters
    const query = url.parse(req.url, true).query;
    const op = query.op;
    const num1 = parseFloat(query.a);
    const num2 = parseFloat(query.b);

    try {
        // Input validation
        if (!op || isNaN(num1) || isNaN(num2)) {
            throw new Error("Invalid input. Example: /?op=add&a=5&b=3");
        }

        const result = calculate(op, num1, num2);

        res.writeHead(200);
        res.end(JSON.stringify({
            operation: op,
            a: num1,
            b: num2,
            result: result
        }));
    } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: err.message }));
    }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Calculator server running at http://localhost:${PORT}`);
});
