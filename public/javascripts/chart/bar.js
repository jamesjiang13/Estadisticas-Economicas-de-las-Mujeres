// bar graph shows every country's result for that year
class BarGraph {
  constructor(dataset, year) {
    this.dataset = dataset;
    this.year = year;
  }

  draw() {
    const svg = d3.select('#bar-graph');

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600;
    const height = 300;

    const barGraph = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // this builds the x-axis, countries for me
    const xScale = d3.scaleBand()
      .range([0, width]) // range of band is width of svg
      .padding(0.2)
      .domain(Object.keys(this.dataset)); // add each country as a vertical column

    const yScale = d3.scaleLinear()
      .range([0, height])
      .domain(Object.keys.map((country) => {
        return this.dataset[country][this.year];
      }));

    // const barGroups =
    barGraph.selectAll()
      .data(this.dataset)
      .enter()
      .append('g')
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => console.log(g))
      // .attr('x', (g) => xScale(g.language))
      // .attr('y', (g) => yScale(g.value))
      .attr('height', (g) => height - yScale(g.value))
      .attr('width', xScale.bandwidth());
  }
}
