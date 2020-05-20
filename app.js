const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));

app.get('/', (request, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// app.get('/licCountries', (req, res) => {
//   fetch('http://api.worldbank.org/V2/country?incomeLevel=LIC?format=JSON')
//   .then((response) => res.json(response));
//   .then((body) => {
//     let results = JSON.parse(body);
//     console.log(results);  // logs to server
//     response.send(results); // sends to frontend
//   });
// });

// create a search route
// app.get('/search', (request, response) => {
//   fetch(`http://openlibrary.org/search.json?q=${request.query.string}`)
//   .then((response) => {
//       return response.text();
//   }).then((body) => {
//       let results = JSON.parse(body)
//       console.log(results)
//       response.send(results)
//     });
// });


app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
