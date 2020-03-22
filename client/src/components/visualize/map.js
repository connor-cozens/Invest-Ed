import React, {Component} from 'react'
import { VectorMap } from "react-jvectormap"
import { getCode, getName, getData } from "country-list";

const handleClick = (e, countryCode) => {
  console.log(countryCode);
};

class Map extends Component {
  state = {
    mapData: {}
  };
  componentDidMount = () => {
    this.props.data.forEach((item) => {
      //Convert country name to code name
      var codeName = getCode(item.name);
      //Add country code name and value to mapData object
      this.setState(prevState => {
        let mapDataTemp = {...prevState.mapData}
      })
      // this.state.mapData[codeName] = item.value;
      console.log(this.state.mapData)
    });

    console.log(mapData);
  }
  render() {
    return (
      <div style = {{width: 800, height: 800}}>
        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent" //change it to ocean blue: #0077be
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "620px"
          }}
          onRegionClick={handleClick} //gets the country code
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#e4e4e4",
              "fill-opacity": 0.9,
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
          regionsSelectable={true}
          series={{
            regions: [
              {
                values: mapData, //this is your data
                scale: ["#d8ede9", "#00C49F"], //your color game's here
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
