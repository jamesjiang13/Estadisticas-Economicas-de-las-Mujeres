// bar graph shows every country's result for that year
export default class BarGraph {
  constructor(dataset, year) {
    this.dataset = dataset;
    this.year = year;
  }

  draw() {
    const currentYearData = [];
    let maxValue = 0;

    Object.keys(this.dataset).map((country) => {
      const data = {};
      data.country = country;
      data.value = this.dataset[country][this.year];
      if (data.value > maxValue) maxValue = data.value;
      currentYearData.push(data);
    });

    const svg = d3.select('#bar-graph');
    svg.selectAll("*").remove();

    const margin = 30;
    const width = 550;
    const height = 300;
    // const width = svg.attr('width') - margin;
    // const height = svg.attr('height') - margin;

    const barGraph = svg.append('g')
      .attr('height', height - (margin * 2))
      .attr('width', width - (margin * 2))
      .attr('transform', `translate(${margin}, ${margin})`);

    // this builds the x-axis, countries for me
    const xScale = d3.scaleBand()
      .range([0, width]) // range of band is width of svg
      .padding(0.1)
      .domain(Object.keys(this.dataset)); // add each country as a vertical column

    const yScale = d3.scaleLinear()
      .range([height, 0])
      // .domain([0, 100]);
      .domain([0, maxValue + 10]);

    barGraph.append('g')
      .call(d3.axisLeft(yScale));

    barGraph.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    barGraph.selectAll()
      .data(currentYearData)
      .enter()
      .append('g')
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.country))
      .attr('y', (g) => yScale(g.value))
      .attr('height', (g) => height - yScale(g.value))
      .attr('width', xScale.bandwidth())
      .on('mouseover', function(d,i) {
        d3.select(this).style('fill', '#efefef');
      })
      .on('mouseout', function(d,i) {
        d3.select(this).style('fill', '#BABABA');
      });
  }
};
