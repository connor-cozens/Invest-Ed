import React, { Component } from 'react';
import {Label, PieChart, Pie, Sector, Cell } from 'recharts';
import BarGraph from './bar';
import List from './list';
import Map from './map';

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
  const font = payload.name !== null ? (payload.name.length < 16 ? "30px" : (payload.name.length < 26 ? "20px" : "8px")) : null

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fontSize = {font} fill={fill}>{payload.name}</text>
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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={5} fontSize = "20px" textAnchor={textAnchor} fill="#999">
        {value + ' (' + (percent * 100).toFixed(2) + '%)'}
      </text>
    </g>
  );
};

class Chart extends Component {
  state = {
    activeIndex: 0,

    map: null,
    mapData: this.props.data.main,
    subMapData: null,
    subMapFill: null,

    bar: null,
    barData: null,
    barFill: null,

    list: null,
    listData: null, //For initiative list
    listHeading: null, //Heading name for initiative list

    pie: null,
    setMainPie: true,
    pieData: this.props.data.main,
    subPieData: null,
    subPieFill: null
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.data !== prevProps.data) {
      this.state.pieData = this.props.data.main;
      this.state.mapData = this.props.data.main;
    }
  }

  //On hover of pie chart
  onPieEnter = (data, index) => {
    //Set up data for bar chart to appear on hover
    if (data !== null){
      if (this.state.setMainPie) {
        //If set to comparing with initiatives and sub2 data passed in
        if (this.props.toggleCompare && this.props.data.sub2) {
          //If map is toggled
          if (this.props.toggleMap) {
            if (this.props.data.sub2 !== undefined) {
              this.props.data.sub2.forEach((item) => {
                if (item.id == data.name) {
                  this.setState({
                    subMapData: item.data
                  });
                }
              });
            }
          }
          //If map is not toggled
          else {
            if (this.props.data.sub2 !== undefined) {
              this.props.data.sub2.forEach((item) => {
                if (item.id == data.name) {
                  this.setState({
                    barData: item.data,
                    barFill: data.fill
                  });
                }
              });
            }
          }
        //If not set to comparing with initiatives and sub2 data passed in
        } else {
          if (!this.props.toggleCompare && this.props.data.sub2) {
            //If initiative data pushed in, set list data to view all initiative names
            if (this.props.data.initiative) {
              if (this.props.data.sub2 !== undefined) {
                this.props.data.sub2.forEach((item) => {
                  if (item.name == data.name) {
                    this.setState({
                      listHeading: item.name,
                      listData: item.value
                    });
                  }
                });
              }
            }
          }
        }
      }
      else {
        if (this.props.toggleCompare && this.props.data.sub3) {
          //If map is toggled
          if (this.props.toggleMap) {
            if (this.props.data.sub3 !== undefined) {
              this.props.data.sub3.forEach((item) => {
                if (item.id == data.name) {
                  this.setState({
                    subMapData: item.data
                  });
                }
              });
            }
          }
          //If map is not toggled
          else {
            if (this.props.data.sub3 !== undefined) {
              this.props.data.sub3.forEach((item) => {
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
      }
    }

    //Set state index
    this.setState({
      activeIndex: index
    });
  };

  //Add secondary pie chart onclick of main pie chart
  addSubPie = (data, index) => {
    if (this.props.data.sub !== '') {
      this.setState({
        setMainPie: false,
        subPieFill: data.fill
      });

      if (this.props.data.sub !== undefined) {
        this.props.data.sub.forEach((item) => {
          if (item.id == data.name) {
            this.setState({
              subPieData: item.data
            });
          }
        })
        this.props.toggleBreakDown(true)
      }
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
    const xPieLocation = !this.props.data.initiative ? (!this.props.toggleMap && this.props.toggleCompare && this.props.data.sub2 !== '' && this.props.data.sub3 !== '') ? 425 : (this.props.toggleMap ? 300 : 550) : 375
    const yPieLocation = this.props.toggleMap ? 200 : 300
    const xPieChartWidth = !this.props.data.initiative ? (!this.props.toggleMap && this.props.toggleCompare && this.props.data.sub2 !== '' && this.props.data.sub3 !== '') ? 825 : (this.props.toggleMap ? 600 : 1000) : 750

    const pieOuterRadius = this.props.toggleMap ? 80 : 0
    const pieInnerRadius = this.props.toggleMap ? 20 : 0

    const title = !this.props.data.initiative ? (
      (this.props.toggleCompare && this.props.data.sub2 !== '' && this.props.data.sub3 !== '') ?
        <h3 style = {{marginTop: "50px", marginLeft: "30px" }}> {this.props.data.header1} </h3>
        :
        <h3 style = {{marginTop: "50px", marginLeft: "100px" }}> {this.props.data.header1} </h3>
      ) : (
        this.props.toggleMap ? <h3 style = {{marginTop: "50px", marginLeft: "150px"}}> {this.props.data.header1} </h3>
        :
        <h3 style = {{marginTop: "50px"}}> {this.props.data.header1} </h3>
      )

    const subTitle = this.state.setMainPie ?
    (
     this.props.toggleMap ?
        <h4 style = {{marginTop: "20px", marginLeft: "200px" }}> {this.props.data.subHeader} </h4>
        :
        (
          (this.props.toggleCompare && this.props.data.sub2 !== '' && this.props.data.sub3 !== '') ?
          <h4 style = {{marginTop: "20px", marginLeft: "325px" }}> {this.props.data.subHeader} </h4>
          :
          <h4 style = {{marginTop: "20px", marginLeft: "440px" }}> {this.props.data.subHeader} </h4>
        )
      ) :
      this.props.toggleMap ? (
          this.props.data.funder ? <h5 style = {{float: 'left', width: "500px", marginTop: "20px", marginLeft: "140px" }}> Number of Initiatives Funded by each Funder</h5>
          : <h5 style = {{float: 'left', width: "500px", marginTop: "20px", marginLeft: "70px" }}> Number of Initiatives Implemented by each Implementer</h5>
         )
         :
         (
           (this.props.toggleCompare && this.props.data.sub2 !== '' && this.props.data.sub3 !== '') ?
              (
               this.props.data.funder ? <h5 style = {{float: 'left', width: "500px", marginTop: "20px", marginLeft: "240px" }}> Number of Initiatives Funded by each Funder</h5>
               : <h5 style = {{float: 'left', width: "500px", marginTop: "20px", marginLeft: "190px" }}> Number of Initiatives Implemented by each Implementer</h5>
              )
           :
              (
               this.props.data.funder ? <h5 style = {{float: 'left', width: "500px", marginTop: "20px", marginLeft: "360px" }}> Number of Initiatives Funded by each Funder</h5>
               : <h5 style = {{float: 'left', width: "500px", marginTop: "20px", marginLeft: "310px" }}> Number of Initiatives Implemented by each Implementer</h5>
              )
         )

    const secondaryTitle = <h4 style = {{marginTop: "100px"}}> {this.props.data.header2} </h4>

    //Choose whether to show main pie or secondary pie depending on state
    this.state.pie = this.state.setMainPie && !(this.props.toggleMap && !this.props.toggleCompare) ?
    <PieChart width={xPieChartWidth} height={700} onMouseEnter={this.onPieEnter}>
      <Pie
        activeIndex={this.state.activeIndex}
        activeShape={renderActiveShape}
        data={this.state.pieData}
        cx={xPieLocation}
        cy={yPieLocation}
        innerRadius={130 - pieInnerRadius}
        outerRadius={210 - pieOuterRadius}
        fill="#8884d8"
        paddingAngle={0.5}
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
    </PieChart>
  :
    (
      !this.state.setMainPie && !(this.props.toggleMap && !this.props.toggleCompare) ?
      <PieChart width={xPieChartWidth} height={700} onMouseEnter={this.onPieEnter}>
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={this.state.subPieData}
          cx={xPieLocation}
          cy={yPieLocation}
          innerRadius={140 - pieInnerRadius}
          outerRadius={210 - pieOuterRadius}
          fill={this.state.subPieFill}
          paddingAngle={0.5}
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
      </PieChart>
      : null
    )

    //Choose whether to display bar chart depending on toggle state
    this.state.bar = !this.props.toggleMap && this.props.toggleCompare ?
      <BarGraph data = {this.state.barData} fill = {this.state.barFill} isFunder = {this.props.data.funder}/>
      : null

    //Choose whether to display map depending on toggle state
    this.state.map = this.props.toggleMap && this.props.toggleCompare ?
      <Map data = {this.state.subMapData} width = {600} height = {500} margin = {0}/> :
      (
        this.props.toggleMap && !this.props.toggleCompare ?
          <Map data = {this.state.mapData} width = {1000} height = {500} margin = {100}/>
          : null
      )

    this.state.list = this.props.data.initiative ? (
      !this.props.toggleMap ? <List heading = {this.state.listHeading} data = {this.state.listData} />
      : null
    ) : null


    return (
      <div>
        <div style = {{float: "left", margin: 'auto'}} >
          {title}
          {subTitle}
          {this.state.pie}
        </div>
        <div style = {{float: "left"}}>
          {secondaryTitle}
          {this.state.bar}
          {this.state.map}
          {this.state.list}
        </div>
      </div>
    );
  }
}

export default Chart
