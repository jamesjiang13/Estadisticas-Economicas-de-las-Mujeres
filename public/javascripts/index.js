const axios = require('axios');

// const educationAttainmentFemale = 'SE.SEC.CUAT.LO.FE.ZS';
// const educationAttainmentMale = 'SE.SEC.CUAT.LO.MA.ZS'; // source = 2
// const lowerSecondaryCompletionFemale = 'SE.SEC.CMPT.LO.FE.ZS'; // source = 2
// const lowerSecondaryCompletionMale = 'SE.SEC.CMPT.LO.MA.ZS'; // source = 2
// const adolescentFertilityRate = 'SP.ADO.TFRT'; // source = 15
// const gdpPerCapita = 'NY.GDP.PCAP.CD'; // source = 2
// const wageAndSalaryWorkersFemale = 'SL.EMP.WORK.FE.ZS';
// const vulnurableEmploymentFemale = 'SL.EMP.VULN.FE.ZS';
// const laborForceParticipationRate = 'SL.TLF.CACT.FE.ZS';
// const ratioLaborForceParticipation = 'SL.TLF.CACT.FM.ZS';
const totalData = {};

const getData = (worldBankDatabase) => {
  axios.get(`/countriesData?string=${worldBankDatabase}`)
    .then((response) => {
      response.data[1].forEach((row) => {
        // console.log(row);
        const countryName = row.country.value.split(',')[0];
        if (!totalData[countryName]) {
          totalData[countryName] = {};
          totalData[countryName][row.date] = row.value;
        } else {
          totalData[countryName][row.date] = row.value;
        }
      })
      console.log(response);
    })
    .catch((err) => console.log(err));
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('categories-container').addEventListener('click', (e) => {
    getData(e.target.value);
  });

  // const currentYearData = (year) => {
  //   let dataSet = {};
  //   dataSet = Object.keys(totalData).map((country) => {
  //     console.log(country);
  //     debugger;
  //     dataSet[totalData.country] = totalData.country.year;
  //     // dataSet[country] = country.year;
  //   });
  //   console.log(dataSet);
  //   return dataSet;
  // };

  const slider = document.getElementById('slider');
  const output = document.getElementById('display-year');

  slider.onchange = () => {
    const year = slider.value;
    output.innerHTML = year;
    // currentYearData(year);
  };

  const latamMap = document.getElementById('latam-map');

  latamMap.addEventListener('mouseover', (e) => {
    // console.log(e.target.__data__.properties.brk_name);
    let country = e.target.__data__.properties.brk_name;
    if (country) {
      const label = document.getElementById('hover-tooltip');
      const selectedYear = document.getElementById('slider').value;
      // console.log(totalData);
      // console.log(selectedYear);
      const countryValue = totalData[country][selectedYear];
      // console.log(countryValue);
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
