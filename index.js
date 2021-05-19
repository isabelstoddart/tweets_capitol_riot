// set the dimensions and margins of the graph
var width = 1200
var height = 1200

// append the svg object to the body of the page
var svg = d3.select("body")
  .append("svg")
    .attr("width", width)
    .attr("height", height)

// Read data
d3.json('02.json', function(data) {


  // Size scale for countries
  var size = d3.scaleLinear()
    .domain([0, d3.max(data, function(d){return d.actor.followers_count})])
    .range([7,55])  // circle will be between 7 and 55 px wide

  // create a tooltip
  var Tooltip = d3.select("body")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("width","200px")

  // Initialize the circle: all located at the center of the svg area
  var node = svg.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", "node")
      .attr("r", function(d){ return size(d.actor.followers_count)})
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", "#006ee6")
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)

    node
      .on("mouseover", function(d) {
        Tooltip
          .style("opacity", 1)
          .html(d.body)
          .style('transform', `translate(${d3.event.layerX}px, ${d3.event.layerY-1200}px)`)
      })
      .on("mouseout", function(d) {
        Tooltip
          .style("opacity", 0)})


      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));

  // Features of the forces applied to the nodes:
  var simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.actor.followers_count)+3) }).iterations(1)) // Force that avoids circle overlapping

  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; })
      });

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

})