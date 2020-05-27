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
      data.abbrev = this.dataset[country].abbrev;
      if (data.value > maxValue) maxValue = data.value;
      currentYearData.push(data);
    });

    const svg = d3.select('#data-graphic');
    svg.selectAll('*').remove();

    const margin = 30;
    const width = 550;
    const height = 300;

    const barGraph = svg.append('g')
      .attr('height', height - (margin * 2))
      .attr('width', width - (margin * 2))
      .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(Object.values(this.dataset).map((country) => country.abbrev));

    let yScale;
    if (maxValue > 105) {
      yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, maxValue + 10]);
    } else {
      yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 105]);
    }

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
      .attr('x', (g) => xScale(g.abbrev))
      .attr('y', (g) => yScale(g.value))
      .attr('height', (g) => height - yScale(g.value))
      .attr('width', xScale.bandwidth())
      .style('fill', '#98eb94')
      .on('mouseover', function (d, i) {
        d3.select(this).style('fill', '#08b300');
      })
      .on('mouseout', function (d, i) {
        d3.select(this).style('fill', '#98eb94');
      });
  }
}
