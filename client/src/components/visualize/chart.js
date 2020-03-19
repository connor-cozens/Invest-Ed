import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fontSize = "30px" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={5} fontSize = "25px" textAnchor={textAnchor} fill="#999">
        {value + ' (' + (percent * 100).toFixed(2) + '%)'}
      </text>
    </g>
  );
};

class Chart extends Component {
  state = {
    activeIndex: 0,
    pie: null,
    setMainPie: true,
    data: this.props.data().main,
    subData: null,
    subFill: null
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.data() !== prevProps.data()) {
      this.state.data = this.props.data().main;
    }
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  addSubPie = (data, index) => {

    console.log(data);
    this.setState({
      setMainPie: false,
      subFill: data.fill
    });

    this.props.data().sub.forEach((item) => {
      if (item.id == data.name) {
        this.setState({
          subData: item.data
        });
      }
    })
  };

  removeSubPie = () => {
    this.setState({
      setMainPie: true
    });
  };

  render() {
    this.state.pie = this.state.setMainPie ? <Pie
      activeIndex={this.state.activeIndex}
      activeShape={renderActiveShape}
      data={this.state.data}
      cx={450}
      cy={250}
      innerRadius={150}
      outerRadius={230}
      fill="#8884d8"
      paddingAngle={2}
      dataKey="value"
      onMouseOver={this.onPieEnter}
      onClick = {this.addSubPie}
    >
    {
      this.state.data.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={COLORS[index % COLORS.length]} />
    ))}
    </Pie> :
    <Pie
      activeIndex={this.state.activeIndex}
      activeShape={renderActiveShape}
      data={this.state.subData}
      cx={450}
      cy={250}
      innerRadius={170}
      outerRadius={230}
      fill={this.state.subFill}
      paddingAngle={2}
      dataKey="value"
      onMouseOver={this.onPieEnter}
      onClick={this.removeSubPie}
    >
    {
      this.state.data.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={this.state.subFill} />
    ))}
    </Pie>

    return (
      <div style = {{float: "left"}} >
        <PieChart style = {{marginTop: "80px"}} width={900} height={500} onMouseEnter={this.onPieEnter}>
          {this.state.pie}
        </PieChart>
      </div>
    );
  }
}

export default Chart
