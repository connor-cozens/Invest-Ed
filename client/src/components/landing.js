import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser} from '../store/actions/dataActions';

import PieIcon from '../images/visualization.PNG'
import BarIcon from '../images/barChart.PNG'
import FormIcon from '../images/forms.png'
import MapIcon from '../images/map.PNG'

class Landing extends Component{
  componentDidMount(){
      this.props.getUser()
  }

  render() {
    const {authorized, userData, accessError} = this.props;
    const showAuthStatus = authorized ? (accessError ? <h4 style = {{paddingTop: '50px', textAlign: "left"}}>There was an error retrieving your information</h4> : (userData ? <h4 style = {{paddingTop: '50px', textAlign: "left"}}>Welcome, {userData.firstname}</h4>: <h4>Loading</h4>)) : null
    return (
      <div className = "container">
        {showAuthStatus}
        <br></br><br></br>
        <div>
          <div style = {{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img src = {PieIcon} height = {250} width = {295} style = {{display: "inline-block"}}/>
            <img src = {BarIcon} height = {200} width = {235} style = {{display: "inline-block"}}/>
          </div>
          <br></br>
          <h2 style = {{textAlign: "center", paddingLeft: "200px", paddingRight: "200px"}}>Visualize Data Pertaining to Actors in Girls' Education Initiatives</h2>
        </div>
        <br></br><br></br><br></br><br></br>
        <div>
          <div style = {{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img src = {FormIcon} height = {200} width = {200} style = {{display: "inline-block"}}/>
          </div>
          <br></br>
          <h2 style = {{textAlign: "center", paddingLeft: "200px", paddingRight: "200px"}}>Submit New Data and Make Modification to Existing Data</h2>
        </div>
        <br></br><br></br><br></br><br></br>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth,
    userData: state.data.userInformation,
    accessError: state.data.accessError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
