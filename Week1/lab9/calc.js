const express = require('express');
const path = require('path');
const app = express();

app.use(express.json()); // For JSON body parsing
app.use(express.static(path.join(__dirname, 'static'))); // Serve static files
app.use(express.urlencoded({ extended: true }));// for hanlding HTML form data

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'calc.html'));
});

// API route for calculation
app.post('/calculate', (req, res) => {
  const { inputA, inputB, calculation } = req.body;

  let result;
  if (calculation === 'add') {
    result = Number(inputA) + Number(inputB);
  } 

  else if (calculation =="subtract"){
    result = Number(inputA) - Number(inputB);
  }
     else {
    return res.status(400).json({ error: 'Invalid calculation type' });
  }


  res.json({ inputA, inputB, calculation, result});// can send as HTML message, can send a server-side rendered page
});

// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });

module.exports = app;