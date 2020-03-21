import React, { Component } from 'react';
import {Label, PieChart, Pie, Sector, Cell } from 'recharts';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

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
    bar: null,
    barData: null,
    barFill: null,

    activeIndex: 0,
    pie: null,
    setMainPie: true,
    pieData: this.props.data().main,
    subPieData: null,
    subPieFill: null
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.data() !== prevProps.data()) {
      this.state.pieData = this.props.data().main;
    }
  }

  //On hover of pie chart
  onPieEnter = (data, index) => {
    //Set up data for bar chart to appear on hover
    if (data !== null){
      if (this.state.setMainPie) {
        if (this.props.toggleCompare && this.props.data().sub2) {
          this.props.data().sub2.forEach((item) => {
            if (item.id == data.name) {
              this.setState({
                barData: item.data,
                barFill: data.fill
              });
            }
          });
        }
      }
      else {
        if (this.props.toggleCompare && this.props.data().sub3) {
          this.props.data().sub3.forEach((item) => {
            if (item.id == data.name) {
              this.setState({
                barData: item.data,
                barFill: data.fill
              });
            }
          });
        }
      }
    }

    //Set state index
    this.setState({
      activeIndex: index
    });
  };

  //Add secondary pie chart onclick of main pie chart
  addSubPie = (data, index) => {
    if (this.props.data().sub !== '') {
      this.setState({
        setMainPie: false,
        subPieFill: data.fill
      });

      this.props.data().sub.forEach((item) => {
        if (item.id == data.name) {
          this.setState({
            subPieData: item.data
          });
        }
      })
      this.props.toggleBreakDown(true)
    }
  };

  //Remove secondary pie chart onclick of secondary pie chart, such that main pie chart appears again
  removeSubPie = () => {
    this.setState({
      setMainPie: true
    });
    this.props.toggleBreakDown(false)
  };

  render() {
    const xPieLocation = (this.props.toggleCompare && this.props.data().sub2 !== '' && this.props.data().sub3 !== '') ? 425 : 550
    const xPieChartWidth = (this.props.toggleCompare && this.props.data().sub2 !== '' && this.props.data().sub3 !== '') ? 825 : 1000
    const pieTitle = (this.props.toggleCompare && this.props.data().sub2 !== '' && this.props.data().sub3 !== '') ?
      <h3 style = {{marginTop: "50px", marginLeft: "30px" }}> {this.props.data().header1} </h3>
      :
      <h3 style = {{marginTop: "50px", marginLeft: "100px" }}> {this.props.data().header1} </h3>

    const barTitle = <h4 style = {{marginTop: "200px"}}> {this.props.data().header2} </h4>

    //Choose whether to show main pie or secondary pie depending on state
    this.state.pie = this.state.setMainPie ?
    <Pie
      activeIndex={this.state.activeIndex}
      activeShape={renderActiveShape}
      data={this.state.pieData}
      cx={xPieLocation}
      cy={300}
      innerRadius={130}
      outerRadius={210}
      fill="#8884d8"
      paddingAngle={2}
      dataKey="value"
      onMouseOver={this.onPieEnter}
      onClick = {this.addSubPie}
    >
    {
      this.state.pieData.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={COLORS[index % COLORS.length]} />
    ))}
    </Pie>
  :
    <Pie
      activeIndex={this.state.activeIndex}
      activeShape={renderActiveShape}
      data={this.state.subPieData}
      cx={xPieLocation}
      cy={300}
      innerRadius={150}
      outerRadius={210}
      fill={this.state.subPieFill}
      paddingAngle={2}
      dataKey="value"
      onMouseOver={this.onPieEnter}
      onClick={this.removeSubPie}
    >
    {
      this.state.pieData.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={this.state.subPieFill} />
    ))}
    </Pie>

    //Choose whether to display bar chart depending on state
    this.state.bar = (this.props.toggleCompare && this.props.data().sub2 !== '' && this.props.data().sub3 !== '') ?
      <BarChart
        width={400}
        height={300}
        data={this.state.barData}
        layout="vertical"
        margin={{top: 20, right: 60, left: 30}}
        >
        <XAxis type="number"/>
        <YAxis type="category" dataKey="name" />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Bar dataKey="value" fill={this.state.barFill} />
      </BarChart> : null

    return (
      <div>
        <div style = {{float: "left", margin: 'auto'}} >
          {pieTitle}
          <PieChart width={xPieChartWidth} height={700} onMouseEnter={this.onPieEnter}>
            {this.state.pie}
          </PieChart>
        </div>
        <div style = {{float: "left"}}>
          {barTitle}
          {this.state.bar}
        </div>
      </div>
    );
  }
}

export default Chart
