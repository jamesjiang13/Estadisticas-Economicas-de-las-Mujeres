const express = require('express');

const app = express();
const path = require('path');
const fetch = require('node-fetch');

const PORT = process.env.PORT || 8000;

app.use(express.static('public'));

app.get('/countriesData', (request, response) => {
  console.log(request.query);
  fetch(`http://api.worldbank.org/v2/country/arg;bol;bra;chl;col;cri;ecu;gtm;hnd;mex;nic;pan;pry;per;ury;ven/indicator/${request.query.string}?format=json&date=2001:2018&per_page=300`)
    .then((response) => response.text())
    .then((body) => {
      const results = JSON.parse(body);
      response.send(results);
    });
});

// // create a search route
// app.get('/search', (request, response) => {
//   console.log(request)
//   fetch(`http://openlibrary.org/search.json?q=${request.query.string}`)
//     .then((response) => response.text()).then((body) => {
//       const results = JSON.parse(body);
//       console.log(results);
//       response.send(results);
//     });
// });


app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
