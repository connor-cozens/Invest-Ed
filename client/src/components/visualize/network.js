import React, {Component} from 'react';
import * as d3 from 'd3';
import PieChart from './pieChart'

class Network extends Component {
  constructor(props) {
    super(props);
    // this.ref = React.createRef();
  }

  render() {
    return (
      <div>
        <PieChart id = {1} data = {this.props.dataFoundations} />
        <PieChart id = {2} data = {this.props.dataInitiatives} />
      </div>
    );
  }
}

export default Network
