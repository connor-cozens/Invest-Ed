import React, {Component} from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

class BarGraph extends Component {
  render() {
    return (
      <BarChart
        width={400}
        height={300}
        data={this.props.data}
        layout="vertical"
        margin={{top: 20, right: 60, left: 30}}
        >
        <XAxis type="number"/>
        <YAxis type="category" dataKey="name" />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Bar dataKey="value" fill={this.props.fill} />
      </BarChart>
    )
  }
}

export default BarGraph
