function dailyTransaction(data) {
  // set the dimensions and margins of the graph
  let margin = { top: 10, right: 30, bottom: 30, left: 60 };
  let width = 1150 - margin.left - margin.right;
  let height = 300 - margin.top - margin.bottom;

  // Parse the date / time
  const parseDate = d3.timeParse("%m/%d/%Y");

  // Set the ranges
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // Define the line
  const valueline = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.transactionNumber));

  // Add the SVG canvas
  const svg = d3
    .select(".daily-transaction-graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Get the data
  data.forEach((d) => {
    d.date = parseDate(d.date);
    d.transactionNumber = +d.transactionNumber;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, (d) => d.date));
  y.domain([0, d3.max(data, (d) => d.transactionNumber)]);

  // Add the valueline path
  svg
    .append("path")
    .attr("class", "line")
    .attr("d", valueline(data))
    .style("fill", "none") // <-- set the fill color
    .style("stroke", "blue") // <-- set the stroke color
    .style("stroke-width", "2px") // <-- set the stroke width
    .style("opacity", 0.5); // <-- set the opacity

  // Add the X Axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  // Add the Y Axis
  svg.append("g").call(d3.axisLeft(y));

  // Add the data point dots
  svg
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 2)
    .attr("cx", (d) => x(d.date))
    .attr("cy", (d) => y(d.transactionNumber))
    .attr("class", "data-dot")
    .style("fill", "white");

  // Add the data labels
  svg
    .selectAll("label")
    .data(data)
    .enter()
    .append("text")
    .text((d) => d.transactionNumber)
    .attr("x", (d) => x(d.date))
    .attr("y", (d) => y(d.transactionNumber))
    .attr("dy", "-0.5em")
    .attr("class", "data-label")
    .style("text-anchor", "middle")
    .style("font-size", "13px")
    .style("font-weight", "bold")
    .style("fill", "green");
}

export default { dailyTransaction };
