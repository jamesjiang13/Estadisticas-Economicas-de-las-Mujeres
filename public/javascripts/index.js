const d3 = require('d3');
const topojson = require('topojson');

// const svg = d3.select('body')
//   .append('svg')
//   .attr('width', width)
// 	.attr('height', height);
	
const svg = d3.select('svg');

const projection = d3.geoMercator().scale(150);
const pathGenerator = d3.geoPath().projection(projection);

// d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
//   .then((topo) => {
//     // console.log(topo);
//     const countries = topojson.feature(topo, topo.objects.countries);
//     console.log(countries);
//     svg.selectAll('path')
//       .data(countries.features)
//       .enter()
//       .append('path')
//       .attr('d', pathGenerator);
//   });

// let query = "grace hopper";
// axios.get(`/search?string=${query}`)
//     .then((response) => {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

// axios.get('/licCountries')
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((err) => console.log(err));
// });
