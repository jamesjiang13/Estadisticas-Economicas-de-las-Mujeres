const express = require('express');

const app = express();
const path = require('path');
const fetch = require('node-fetch');

const PORT = process.env.PORT || 8000;

app.use(express.static('public'));

app.get('/', (request, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/countriesData', (request, response) => {
  fetch(`https://api.worldbank.org/v2/country/arg;blz;bol;bra;chl;col;cri;cub;ecu;slv;gtm;hti;hnd;jam;mex;nic;pan;pry;per;ury;usa;ven/indicator/${request.query.string}?format=json&date=2001:2018&per_page=500`)
    .then((res) => res.text())
    .then((body) => {
      const results = JSON.parse(body);
      response.send(results);
    });
});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
