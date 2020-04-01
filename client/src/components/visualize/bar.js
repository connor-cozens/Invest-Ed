import React, {Component} from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

class BarGraph extends Component {
  render() {
    return (
      <BarChart
        width={400}
        height={600}
        data={this.props.data}
        layout="vertical"
        margin={{top: 30, right: 90, left: 90}}
        >
        <XAxis type="number"/>
        <YAxis type="category" dataKey="name" tick={{fontSize: 8}}/>
        <CartesianGrid strokeDasharray="4 3"/>
        <Tooltip/>
        <Legend />
        <Bar dataKey="value" fill={this.props.fill} />
      </BarChart>
    )
  }
}

export default BarGraph
