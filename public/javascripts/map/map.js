const latamMap = d3.select('#latam-map');

const projection = d3.geoMercator().scale(330).center([-40, -5]);
const pathGenerator = d3.geoPath().projection(projection);

// const tooltip = d3.tip()
//   .attr('class', 'd3-tip')
//   .offset([-5, 0])
//   .html((d) => {
//     const dataRow = e.target.__data__;
//     if (dataRow) {
//       console.log(dataRow);
//       return `${dataRow.states}: ${dataRow.mortality}`;
//     }
//     console.log('no dataRow', d);
//     return `${d.properties.name}: No data.`;
//   });

// svg.call(tooltip);

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
      .on('mouseover', function(d,i) {
        d3.select(this).style('fill', '#efefef');
      })
      .on('mouseout', function(d,i) {
        d3.select(this).style('fill', '#BABABA');
      });
      
      // .on('mouseover', tooltip.show)
      // .on('mouseout', tooltip.hide);
  });

// const latamMap = document.getElementById('latam-map');

document.onmousemove = (e) => {
  document.getElementById('hover-tooltip').style.left = e.pageX + 10 + 'px';
  document.getElementById('hover-tooltip').style.top = e.pageY + 10 + 'px';
};

// svg.select("Guyana").style("fill", function(d) {return '#efefef'});

// latamMap.addEventListener('mouseover', (e) => {
//   country = e.target.__data__.properties.brk_name;
//   if (country) {
//     const label = document.getElementById('hover-tooltip');
//     // const selectedYear = document.getElementById('slider').value;
//     // const countryValue = dataSet.country[selectedYear];
//     // console.log(selectedYear);
//     // console.log(countryValue);

//     label.innerHTML = country;
//     label.style.opacity = 1;
//   }
// });

// latamMap.addEventListener('mouseout', (e) => {
//   const label = document.getElementById('hover-tooltip');
//   label.innerHTML = '';
//   label.style.opacity = 0;
// });


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
