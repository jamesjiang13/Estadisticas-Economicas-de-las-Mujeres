import BarGraph from './chart/bar';

const axios = require('axios');

window.onload = () => {
  const modal = document.getElementById('my-modal');
  const description = document.getElementById('project-description');
  description.innerHTML = `This project was inspired by my time living in Latin America 
    and hearing first hand accounts from my friends on what the "Ni Una Mas" movement meant to them.
    Women in Latin America face many  obstacles, and I want to show that 
    visually using data from the World Bank. While the heart of "Ni Una Mas" started in 
    response to the extremely high femicide rate across Latin America, that metric is 
    not currnetly available in the World Bank. In its stead, I am choosing to focus on 
    some other socio-economic factors that could possibly contribute to a femicide rate 
    that is one of the highest in the world.`;
  modal.style.display = 'block';

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  };
};

document.addEventListener('DOMContentLoaded', () => {
  const totalData = {};

  function getData(worldBankDatabase) {
    return axios.get(`/countriesData?string=${worldBankDatabase}`)
      .then((response) => {
        response.data[1].forEach((row) => {
          const countryName = row.country.value.split(',')[0];
          if (!totalData[countryName]) {
            totalData[countryName] = {};
            totalData[countryName][row.date] = row.value;
            totalData[countryName].abbrev = row.countryiso3code;
          } else {
            totalData[countryName][row.date] = row.value;
          }
        });

        return totalData;
      });
  }

  function createGraph(data, yr) {
    const graph = new BarGraph(data, yr);
    graph.draw();
  }

  const slider = document.getElementById('slider');
  const output = document.getElementById('display-year');
  let year = slider.value;

  document.getElementById('categories-container').addEventListener('click', (e) => {
    getData(e.target.value)
      .then((resData) => createGraph(resData, year));
  });

  slider.onchange = () => {
    year = slider.value;
    output.innerHTML = year;
    if (totalData.length) {
      createGraph(totalData, year);
    }
  };

  const latamMap = document.getElementById('latam-map');

  latamMap.addEventListener('mouseover', (e) => {
    if (e.target.__data__) {
      const country = e.target.__data__.properties.brk_name;
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

  const barGraph = document.getElementById('bar-graph');

  barGraph.addEventListener('mouseover', (e) => {
    const data = e.target.__data__;
    if (data) {
      const label = document.getElementById('hover-tooltip');
      label.innerHTML = `${data.country}: ${data.value.toFixed(2)}`;
      label.style.opacity = 1;
    }
  });

  barGraph.addEventListener('mouseout', () => {
    const label = document.getElementById('hover-tooltip');
    label.innerHTML = '';
    label.style.opacity = 0;
  });

  document.getElementById('nav-title').addEventListener('mouseover', () => {
    const ele = document.getElementById('hover-tooltip');
    ele.innerHTML = 'Economic statistics for women across Latin America';
    ele.style.opacity = 1;
  });

  document.getElementById('nav-title').addEventListener('mouseout', () => {
    const ele = document.getElementById('hover-tooltip');
    ele.innerHTML = '';
    ele.style.opacity = 0;
  });
});
