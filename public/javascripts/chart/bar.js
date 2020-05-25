// bar graph shows every country's result for that year

export default class BarGraph {
  constructor(dataset, year) {
    this.dataset = dataset;
    this.year = year;
  }

  draw() {
    const svg = d3.select('#bar-graph');

    const margin = 20;
    const width = 800;
    const height = 500;

    const barGraph = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    // this builds the x-axis, countries for me
    const xScale = d3.scaleBand()
      .range([0, width]) // range of band is width of svg
      .padding(0.2)
      .domain(Object.keys(this.dataset)); // add each country as a vertical column

    const yScale = d3.scaleLinear()
      .range([0, height])
      // .domain([0, 100]);
      .domain(Object.keys(this.dataset).map((country) => this.dataset[country][this.year]));

    barGraph.append('g')
      .call(d3.axisLeft(yScale));

    barGraph.append('g')
      .call(d3.axisBottom(xScale));

    const currentYearData = {};
    currentYearData = Object.keys(this.dataset).map((country) => {
      let pair = { country: this.dataset[country][this.year] };
      debugger
      
    });
    debugger

    // const barGroups =
    barGraph.selectAll()
      .data(currentYearData) // need to fix data format to {country1: value1, country2: value2 }
      .enter()
      .append('g')
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(Object.keys(this.dataset).map((country) => country)))
      .attr('y', (g) => yScale(Object.keys(this.dataset).map((country) => this.dataset[country][this.year])))
      .attr('height', (g) => yScale(Object.keys(this.dataset).map((country) => this.dataset[country][this.year])))
      .attr('width', xScale.bandwidth());
  }
}
