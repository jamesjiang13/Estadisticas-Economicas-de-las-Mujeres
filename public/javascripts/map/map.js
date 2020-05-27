const latamMap = d3.select('#latam-map');

const projection = d3.geoMercator().scale(330).center([-40, -5]);
const pathGenerator = d3.geoPath().projection(projection);

const color = d3.scaleLog()
  .domain([0, 100])
  .range(d3.schemeBlues[4]);

d3.json('/javascripts/map/latinamerica.json')
  .then((topo) => {
    const noFill = ["GUY", "DOM", "SUR", "FRA", "TTO"];
    latamMap.selectAll('path')
      .data(topo.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .attr('fill', (d) => {
        return (noFill.includes(d.properties.adm0_a3) ? '#c0c0c0' : '#98eb94');
      })
      .on('mouseover', function (d) {
        d3.select(this).style('fill', (country) => {
          return (noFill.includes(country.properties.adm0_a3) ? '#c0c0c0' : '#08b300');
        });
      })
      .on('mouseout', function (d) {
        d3.select(this).style('fill', (country) => {
          return (noFill.includes(country.properties.adm0_a3) ? '#c0c0c0' : '#98eb94');
        });
      });
  });

// d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
//   .then((topo) => {
//     // console.log(topo)
//     const countries = topojson.feature(topo, topo.objects.countries);
//     // console.log(countries);
//     console.log(countries.features)
//     svg.selectAll('path')
//       .data(countries.features)
//       .enter()
//       .append('path')
//       .attr('d', pathGenerator);
//   });
