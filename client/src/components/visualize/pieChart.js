import React, {Component} from 'react';
import * as d3 from 'd3';

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.id == 1 ? "one" : "two";
    this.ref = React.createRef();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.data !== prevProps.data) {
      d3.select("#" + this.id).remove();
      this.drawPie(this.props.data);
    }
  }

  drawPie = (obj) => {
    // set the dimensions and margins of the graph
    var width = 450;
    var height = 450;
    var margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select(this.ref.current)
      .append("svg")
        .attr("id", this.id)
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    var data = obj;

    // set the color scale
    var color = d3.scaleOrdinal()
      .domain(data)
      .range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('mySlices')
      .data(data_ready.filter(function(d) { return d.value > 0}))
      .enter()
      .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "white")
        .style("stroke-width", "4px")
        .style("opacity", 0.7)

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
      .selectAll('mySlices')
      .data(data_ready.filter(function(d) { return d.value > 0}))
      .enter()
      .append('text')
      .text(function(d){ return d.data.key})
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
      .style("text-anchor", "middle")
      .style("font-size", 15)
      .style("fill", "white")

    svg
      .selectAll('mySlices')
      .data(data_ready.filter(function(d) { return d.value > 0}))
      .enter()
      .append('text')
      .text(function(d){ return d.data.value})
      .attr("transform", function(d) {
        var centroid = arcGenerator.centroid(d);
        return "translate(" + centroid[0] + "," + (centroid[1] + 30) + ")";  })
      .style("text-anchor", "middle")
      .style("font-size", 25)
      .style("fill", "white")
  }

  render() {
      return (
        <div style = {{float: "left"}} ref = {this.ref}></div>
      );
  }
}

export default PieChart
