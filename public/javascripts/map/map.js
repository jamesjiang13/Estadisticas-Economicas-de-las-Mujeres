const latamMap = d3.select('#latam-map');

const projection = d3.geoMercator().scale(330).center([-40, -5]);
const pathGenerator = d3.geoPath().projection(projection);

const color = d3.scaleLog()
  .domain([0, 100])
  .range(d3.schemeBlues[4]);

d3.json('/javascripts/map/latinamerica.json')
  .then((topo) => {
    latamMap.selectAll('path')
      .data(topo.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .style('fill', '#98eb94')
      .on('mouseover', function (d,i) {
        d3.select(this).style('fill', '#08b300'); // #4f9ff0
      })
      .on('mouseout', function(d,i) {
        d3.select(this).style('fill', '#98eb94'); // #BABABA
      });
  });

// document.onmousemove = (e) => {
//   document.getElementById('hover-tooltip').style.left = e.pageX + 10 + 'px';
//   document.getElementById('hover-tooltip').style.top = e.pageY + 10 + 'px';
// };

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
