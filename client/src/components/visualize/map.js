import React, {Component} from 'react'
import { VectorMap } from "react-jvectormap"
import { getCode, getName, getData } from "country-list";

class Map extends Component {
  state = {
    mapData: {}
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.data !== null && this.props.data !== prevProps.data) {
      let temp = {};
      this.props.data.forEach((item) => {
        //Convert country name to code name
        let codeName = getCode(item.name);
        //Add country code name and value to mapData object
        temp[codeName] = item.value;
        this.setState(() => ({
          mapData: temp
        }));
      });
    }
  }

  componentDidMount = () => {
    if (this.props.data !== null) {
      let temp = {};
      this.props.data.forEach((item) => {
        //Convert country name to code name
        let codeName = getCode(item.name);
        //Add country code name and value to mapData object
        temp[codeName] = item.value;
        this.setState(() => ({
          mapData: temp
        }));
      });
    }
  }

  handleToolTipShow = (e, el, code) => {
    if (this.state.mapData[code] !== undefined) {
      return el.html(el.html() + ' - ' + this.state.mapData[code] + ' initiatives');
    }
  }

  render() {
    console.log(this.props.data)
    console.log(this.state.mapData);
    return (
      <div style = {{width: this.props.width, height: this.props.height, float: "left", marginLeft: this.props.margin}}>
        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent"
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "450px",
            align: "top"
          }}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#dedede",
              "fill-opacity": 1.0,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: "pointer"
            },
            selected: {},
            selectedHover: {}
          }}
          onRegionTipShow = {this.handleToolTipShow}
          regionsSelectable={true}
          series={{
            regions: [
              {
                values: this.state.mapData, //data
                scale: ["#d8ede9", "#00C49F"], //color scheme
                normalizeFunction: "polynomial"
              }
            ]
          }}
        />
      </div>
    );
  }
}

export default Map
