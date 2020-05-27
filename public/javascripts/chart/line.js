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

    const svg = d3.select('#data-graphic');
    svg.selectAll('*').remove();

    const margin = 30;
    const width = 550;
    const height = 300;

    const lineChart = svg.append('g')
      .attr('height', height - (margin * 2))
      .attr('width', width - (margin * 2))
      .attr('transform', `translate(${margin}, ${margin})`);

    const xRange = d3.scaleLinear()
      .range([0, width])
      .domain([2001, 2018]);

    let yRange;
    if (maxValue > 200) {
      yRange = d3.scaleLinear()
        .range([height, 0])
        .domain([0, maxValue + 10]);
    } else {
      yRange = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 105]);
    }

    lineChart.append('g')
      .call(d3.axisLeft(yRange));

    lineChart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xRange).tickFormat(d3.format('d')));

    const line = d3.line()
      .x((d) => xRange(d.year))
      .y((d) => yRange(d.value))
      .defined((d) => d.value);

    lineChart.selectAll()
      .data([currentCountryData])
      .enter()
      .append('g')
      .append('path')
      .style('fill', 'none')
      .attr('d', line)
      .style('stroke', '#08b300')
      .style('stroke-width', 2);

    lineChart.selectAll('.dot')
      .data(currentCountryData.filter((d) => d.value !== null))
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', line.x())
      .attr('cy', line.y())
      .attr('r', 3.5)
      .style('fill', '#08b300')
      .filter((d, i) => d.close !== null && i > 1
        && data[i - 1].close === null
        && data[i + 1].close === null);
  }
}
