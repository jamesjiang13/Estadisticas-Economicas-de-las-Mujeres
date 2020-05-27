import BarGraph from './chart/bar';
import LineChart from './chart/line';

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
  document.onmousemove = (e) => {
    document.getElementById('hover-tooltip').style.left = `${e.pageX + 10}px`;
    document.getElementById('hover-tooltip').style.top = `${e.pageY + 10}px`;
  };

  document.getElementById('NY.GDP.PCAP.CD').addEventListener('mouseover', (e) => {
    const hoverbox = document.getElementById('hover-tooltip');
    hoverbox.innerHTML = `GDP per capita is a measure of a country's economic output that accounts for its number of people. It's a good measurement of a country's standard of living; it tells you how prosperous a country feels to each of its citizens.`;
    hoverbox.style.opacity = 1;
  });

  document.getElementById('SL.EMP.WORK.FE.ZS').addEventListener('mouseover', (e) => {
    const hoverbox = document.getElementById('hover-tooltip');
    hoverbox.innerHTML = `Each social group faces different economic risks, and workers who are non-wage and non-salary are the most vulnerable - and therefore the most likely to fall into poverty. They are the least likely to have formal work arrangements, are the least likely to have social protection and safety nets to guard against economic shocks, and often are incapable of generating sufficient savings to offset these shocks.`;
    hoverbox.style.opacity = 1;
  });

  document.getElementById('SL.TLF.CACT.FE.ZS').addEventListener('mouseover', (e) => {
    const hoverbox = document.getElementById('hover-tooltip');
    hoverbox.innerHTML = `This is the proportion of women, ages 15 and over, who supply labor to the economy. In many low-income countries, women often work on farms or in other family enterprises without pay, and others work in or near their homes, mixing work and family activities during the day.`;
    hoverbox.style.opacity = 1;
  });

  document.getElementById('SL.TLF.CACT.FM.ZS').addEventListener('mouseover', (e) => {
    const hoverbox = document.getElementById('hover-tooltip');
    hoverbox.innerHTML = `In many high-income economies, women have been increasingly acquiring higher education that has led to better-compensated, longer-term careers rather than lower-skilled, shorter-term jobs. However, access to good-paying occupations for women remains unequal in many occupations and countries around the world.`;
    hoverbox.style.opacity = 1;
  });

  document.getElementById('SL.EMP.VULN.FE.ZS').addEventListener('mouseover', (e) => {
    const hoverbox = document.getElementById('hover-tooltip');
    hoverbox.innerHTML = `A vulnerable employee is one defined as a family/household-worker or an own-account worker (self-employed without additional hired employees). If the proportion of vulnerable workers is sizeable, it may be an indication of a large agriculture sector and low growth in the formal economy.`;
    hoverbox.style.opacity = 1;
  });

  document.getElementById('SE.SEC.CMPT.LO.FE.ZS').addEventListener('mouseover', (e) => {
    const hoverbox = document.getElementById('hover-tooltip');
    hoverbox.innerHTML = `Lower-secondary education is the final stage of compulsory schooling, taken generally between the ages 12–15. The completion rate is measured as the ratio of students started compared to those who completed their last grade of lower-secondary education.`;
    hoverbox.style.opacity = 1;
  });

  document.getElementById('SE.SEC.CUAT.LO.FE.ZS').addEventListener('mouseover', (e) => {
    const hoverbox = document.getElementById('hover-tooltip');
    hoverbox.innerHTML = `This is the percentage of women, age 25 and over, who have attained or completed lower secondary education. Educational attainment is closely related to the skills and competencies of a country's population, and can be seen as a proxy of both the quantitative and qualitative aspects of the stock of human capital.`;
    hoverbox.style.opacity = 1;
  });

  document.getElementById('SP.ADO.TFRT').addEventListener('mouseover', (e) => {
    const hoverbox = document.getElementById('hover-tooltip');
    hoverbox.innerHTML = `Having children this early in life exposes adolescent women to unnecessary risks. Their chance of dying is twice as high as that of a woman who waited until her 20s to begin childbearing.`;
    hoverbox.style.opacity = 1;
  });

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

  getData('NY.GDP.PCAP.CD').then((resData) => createGraph(resData, year));

  document.getElementById('categories-container').addEventListener('click', (e) => {
    getData(e.target.value)
      .then((resData) => createGraph(resData, year));
  });

  slider.onchange = () => {
    year = slider.value;
    output.innerHTML = year;
    createGraph(totalData, year);
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

  latamMap.addEventListener('click', (e) => {
    if (e.target.__data__) {
      const country = e.target.__data__.properties.brk_name;
      const line = new LineChart(totalData[country], country);
      line.draw();
    }
  });

  const dataGraphic = document.getElementById('data-graphic');

  dataGraphic.addEventListener('mouseover', (e) => {
    const data = e.target.__data__;
    if (data) {
      const label = document.getElementById('hover-tooltip');
      const xAxis = data.country || data.year;
      label.innerHTML = `${xAxis}: ${data.value.toFixed(2)}`;
      label.style.opacity = 1;
    }
  });

  document.getElementById('nav-title').addEventListener('mouseover', () => {
    const ele = document.getElementById('hover-tooltip');
    ele.innerHTML = 'Economic statistics for women across Latin America';
    ele.style.opacity = 1;
  });

  document.addEventListener('mouseout', () => {
    const ele = document.getElementById('hover-tooltip');
    ele.innerHTML = '';
    ele.style.opacity = 0;
  });
});
