// bar graph shows every country's result for that year

const svg = d3.select('#bar-graph');

const margin = {
  top: 20, right: 20, bottom: 30, left: 40,
};

const width = 600;
const height = 300;

// this builds the x-axis, countries for me
const xScale = d3.scaleBand()
  .range([0, width]) // range of band is width of svg
  .padding(0.2)
  .domain(this.results.country); // add each country as a vertical column

const yScale = d3.scaleLinear()
  .range([0, height])
  .domain(this.results[country][year]);

const g = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

