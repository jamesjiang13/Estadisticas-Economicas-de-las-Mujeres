export default class LineChart {
  constructor(dataset, year) {
    this.dataset = dataset;
    this.year = year;
  }

  draw() {
    const currentCountryData = [];
    let maxValue = 0;

    Object.keys(this.dataset).map((country) => {
      const data = {};
      data.country = country;
      data.value = this.dataset[country][this.year];
      data.abbrev = this.dataset[country].abbrev;
      if (data.value > maxValue) maxValue = data.value;
      currentCountryData.push(data);
    });

    const svg = d3.select('#bar-graph');
    svg.selectAll('*').remove();

    const margin = 30;
    const width = 550;
    const height = 300;

    const lineChart = svg.append('g')
      .attr('height', height - (margin * 2))
      .attr('width', width - (margin * 2))
      .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleTime()
      .range([0, width])
      .domain(Object.values(this.dataset).map((country) => country.abbrev)); // need to return year

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, maxValue + 10]);

    lineChart.append('g')
      .call(d3.axisLeft(yScale));

    lineChart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    lineChart.selectAll()
      .data(currentCountryData)
      .attr('fill', none)
      .attr('stroke', '#08b300')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        )


      // .enter()
      // .append('g')
      // .append('rect')
      // .attr('class', 'bar')
      // .attr('x', (g) => xScale(g.abbrev))
      // .attr('y', (g) => yScale(g.value))
      // .attr('height', (g) => height - yScale(g.value))
      // .attr('width', xScale.bandwidth())
      // .style('fill', '#98eb94')
      // .on('mouseover', function (d, i) {
      //   d3.select(this).style('fill', '#08b300');
      // })
      // .on('mouseout', function (d, i) {
      //   d3.select(this).style('fill', '#98eb94');
      // });
  }
}