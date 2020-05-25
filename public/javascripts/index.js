import BarGraph from './chart/bar';

const axios = require('axios');

const totalData = {};

const getData = (worldBankDatabase) => {
  axios.get(`/countriesData?string=${worldBankDatabase}`)
    .then((response) => {
      response.data[1].forEach((row) => {
        const countryName = row.country.value.split(',')[0];
        if (!totalData[countryName]) {
          totalData[countryName] = {};
          totalData[countryName][row.date] = row.value;
        } else {
          totalData[countryName][row.date] = row.value;
        }
      });
    })
    .catch((err) => console.log(err));
};

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const output = document.getElementById('display-year');
  const year = slider.value;

  document.getElementById('categories-container').addEventListener('click', (e) => {
    getData(e.target.value)
      .then((data) => {
        const graph = new BarGraph(data, year);
        graph.draw();
      });
  });

  // const currentYearData = (year) => {
  //   let dataSet = {};
  //   dataSet = Object.keys(totalData).map((country) => {
  //     console.log(country);
  //     dataSet[totalData.country] = totalData.country.year;
  //     // dataSet[country] = country.year;
  //   });
  //   console.log(dataSet);
  //   return dataSet;
  // };

  slider.onchange = () => {
    const year = slider.value;
    output.innerHTML = year;
    const graph = new BarGraph(totalData, year);
    graph.draw();
  };

  const latamMap = document.getElementById('latam-map');

  latamMap.addEventListener('mouseover', (e) => {
    let country = e.target.__data__.properties.brk_name;
    if (country) {
      const label = document.getElementById('hover-tooltip');
      const selectedYear = document.getElementById('slider').value;
      const countryValue = totalData[country][selectedYear];
      label.innerHTML = country.concat(`: ${(countryValue) ? countryValue.toFixed(2) : 'No Data'}`);
      label.style.opacity = 1;
    }
  });

  latamMap.addEventListener('mouseout', () => {
    const label = document.getElementById('hover-tooltip');
    label.innerHTML = '';
    label.style.opacity = 0;
  });
});
