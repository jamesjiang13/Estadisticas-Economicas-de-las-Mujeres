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
        if (!totalData[row.country.value]) {
          totalData[row.country.value] = {};
          totalData[row.country.value][row.date] = row.value || 'No Data';
        } else {
          totalData[row.country.value][row.date] = row.value || 'No Data';
        }
      });
    })
    .catch((err) => console.log(err));
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('categories-container').addEventListener('click', (e) => {
    getData(e.target.value);
    console.log(totalData);
  });

  const slider = document.getElementById('slider');
  const output = document.getElementById('display-year');

  slider.onchange = () => {
    const year = slider.value;
    output.innerHTML = year;
    currentYearData(year);
  };

  const currentYearData = (year) => {
    let dataSet = {};
    dataSet = Object.keys(totalData).map((country) => {
      dataSet[totalData.country] = totalData.country.year;
      // dataSet[country] = country.year;
    });
    console.log(dataSet);
    return dataSet;
  };
});
