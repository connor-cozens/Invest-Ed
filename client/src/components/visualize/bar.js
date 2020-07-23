import React, {Component} from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

class BarGraph extends Component {
  render() {
    let xAxisLabel = this.props.isFunder ? "Number of initiatives funded by the highlighted funder or funder category" : "Number of initiatives implemented by the highlighted implementer or implementer category";
    return (
      <BarChart
        width={400}
        height={600}
        data={this.props.data}
        layout="vertical"
        margin={{top: 10, right: 90, left: 40}}
        >
        <XAxis type="number"/>
        <YAxis type="category" dataKey="name" tick={{fontSize: 8}}/>
        <CartesianGrid strokeDasharray="4 3"/>
        <Tooltip/>
        <Legend />
        <Bar dataKey= "value" name = {xAxisLabel} fill={this.props.fill} />
      </BarChart>
    )
  }
}

export default BarGraph
