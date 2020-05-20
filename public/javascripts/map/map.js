const svg = d3.select('svg');

const projection = d3.geoMercator().scale(150);
const pathGenerator = d3.geoPath().projection(projection);

d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
  .then((topo) => {
    const countries = topojson.feature(topo, topo.objects.countries);
    console.log(countries);
    svg.selectAll('path')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator);
  });
