export default class LineChart {
  constructor(dataset, country) {
    this.dataset = dataset;
    this.country = country;
  }

  draw() {
    const currentCountryData = [];
    let maxValue = 0;

    Object.keys(this.dataset).map((year) => {
      const data = {};
      if (year !== 'abbrev') {
        data.year = year;
        data.value = this.dataset[year];
        if (data.value > maxValue) maxValue = data.value;
        currentCountryData.push(data);
      }
    });

    const svg = d3.select('#bar-graph');
    svg.selectAll('*').remove();

    const margin = 30;
    const width = 550;
    const height = 300;

    const chart = svg.append('g')
      .attr('height', height - (margin * 2))
      .attr('width', width - (margin * 2))
      .attr('transform', `translate(${margin}, ${margin})`);

    const xRange = d3.scaleLinear()
      .range([0, width])
      .domain([2001, 2018]);

    const yRange = d3.scaleLinear()
      .range([height, 0])
      .domain([0, maxValue + 10]);

    chart.append('g')
      .call(d3.axisLeft(yRange));

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xRange).tickFormat(d3.format('d')));

    const line = d3.line()
      .x(function(d) { return xRange(d.year)})
      .y(function(d) { return yRange(d.value)});

    const lineChart = chart.selectAll()
      .data([currentCountryData])
      .enter()
      .append('g');

    lineChart.append('path')
      .style('fill', 'none')
      .attr('d', line)
      .style('stroke', '#08b300')
      .style('stroke-width', 3);
  }
};
