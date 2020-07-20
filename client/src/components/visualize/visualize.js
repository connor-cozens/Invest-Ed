import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from './chart'
import Switch from "react-switch";
import Map from './map';

import {getFunderData, getImplementerData, getInitiativeData, getInitiativeFundersByAttr, getInitiativeImplementersByAttr} from '../../store/actions/dataActions';

import WorldIcon from '../../images/world.png'

class Visualize extends Component {
  state = {
      entitySelection: 'select',
      attributeSelection: 'select',
      secondaryAttributeSelection: 'select',
      dataSelected: false,
      breakDownChecked: false,
      compareChecked: false,
      mapViewChecked: false,

      TargetFunderData: null,
      ImplementerData: null,
      InititativeData: null,
      FunderAttributes: null,
      ImplementerAttributes: null,

      FunderTypeInitiative: null,
      ImplementerTypeInitiative: null,
      FunderInitiative: null,
      ImplementerInitiative: null
  }

  //Trigger get request to retrieve data for visualization
  componentDidMount = () => {
    this.props.getFunderData();
    this.props.getImplementerData();
    this.props.getInitiativeData();
    this.props.getInitiativeFundersByAttr();
    this.props.getInitiativeImplementersByAttr();
  }

  //Set retrieved visualized data passed into component via next props to the state
  static getDerivedStateFromProps = (props, state) => {
    const {FunderData, ImplementerData, InititativeData, FunderAttributes, ImplementerAttributes, FunderTypeInitiative, ImplementerTypeInitiative, FunderInitiative, ImplementerInitiative} = props;
    return {
      TargetFunderData: FunderData,
      ImplementerData: ImplementerData,
      InititativeData: InititativeData,
      FunderAttributes: FunderAttributes,
      ImplementerAttributes: ImplementerAttributes,

      FunderTypeInitiative: FunderTypeInitiative,
      ImplementerTypeInitiative: ImplementerTypeInitiative,
      FunderInitiative: FunderInitiative,
      ImplementerInitiative: ImplementerInitiative
    };
  }

  dataSelection = () => {
    if (this.state.TargetFunderData !== null && this.state.ImplementerData !== null && this.state.InititativeData !== null && this.state.FunderAttributes !== null && this.state.ImplementerAttributes !== null
    && this.state.FunderTypeInitiative !== null && this.state.ImplementerTypeInitiative !== null && this.state.FunderInitiative !== null && this.state.ImplementerInitiative !== null) {
      if (this.state.entitySelection == "funders" && this.state.attributeSelection == "profitMotive") {
        if (this.state.secondaryAttributeSelection == "mainProgramActivity") {
          return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: this.state.FunderTypeInitiative[0].ProfitMotiveInitiative.mainProgramActivity, sub3: this.state.FunderInitiative[0].ProfitMotiveFunderInitiative.mainProgramActivity, header1: 'Funders - Profit Motives', header2: 'Initiatives - Main Programming Activity', subHeader: 'Number of Funders', initiative: false}
        }

        if (this.state.secondaryAttributeSelection == "countryOfOperation") {
          return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: this.state.FunderTypeInitiative[0].ProfitMotiveInitiative.countryOfOperation, sub3: this.state.FunderInitiative[0].ProfitMotiveFunderInitiative.countryOfOperation, header1: 'Funders - Profit Motives', header2: 'Initiatives - Country of Operation', subHeader: 'Number of Funders', initiative: false}
        }

        return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: '', sub3: '', header1: 'Funders - Profit Motives', header2: '', subHeader: 'Number of Funders', initiative: false}
      }

      if (this.state.entitySelection == "funders" && this.state.attributeSelection == "organizationForm") {
        if (this.state.secondaryAttributeSelection == "mainProgramActivity") {
          return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: this.state.FunderTypeInitiative[0].OrgFormInitiative.mainProgramActivity, sub3: this.state.FunderInitiative[0].OrgFormFunderInitiative.mainProgramActivity, header1: 'Funders - Organization Form', header2: 'Initiatives - Main Programming Activity', subHeader: 'Number of Funders', initiative: false}
        }

        if (this.state.secondaryAttributeSelection == "countryOfOperation") {
          return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: this.state.FunderTypeInitiative[0].OrgFormInitiative.countryOfOperation, sub3: this.state.FunderInitiative[0].OrgFormFunderInitiative.countryOfOperation, header1: 'Funders - Organization Form', header2: 'Initiatives - Country of Operation', subHeader: 'Number of Funders', initiative: false }
        }

        return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: '', sub3: '', header1: 'Funders - Organization Form', header2: '', subHeader: 'Number of Funders', initiative: false }
      }

      if (this.state.entitySelection == "funders" && this.state.attributeSelection == "impactInvestor") {
        if (this.state.secondaryAttributeSelection == "mainProgramActivity") {
          return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: this.state.FunderTypeInitiative[0].ImpactInvestorInitiative.mainProgramActivity, sub3: this.state.FunderInitiative[0].ImpactInvestorFunderInitiative.mainProgramActivity, header1: 'Funders - Impacting Investing', header2: 'Initiatives - Main Programming Activity', subHeader: 'Number of Funders', initiative: false}
        }

        if (this.state.secondaryAttributeSelection == "countryOfOperation") {
          return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: this.state.FunderTypeInitiative[0].ImpactInvestorInitiative.countryOfOperation, sub3: this.state.FunderInitiative[0].ImpactInvestorFunderInitiative.countryOfOperation, header1: 'Funders - Impacting Investing', header2: 'Initiatives - Country of Operation', subHeader: 'Number of Funders', initiative: false}
        }

        return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: '', sub3: '', header1: 'Funders - Impacting Investing', header2: '', subHeader: 'Number of Funders', initiative: false }
      }

      if (this.state.entitySelection == "funders" && this.state.attributeSelection == "eSubsectors") {
        if (this.state.secondaryAttributeSelection == "mainProgramActivity") {
          return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: this.state.FunderTypeInitiative[0].ESubsectorInitiative.mainProgramActivity, sub3: this.state.FunderInitiative[0].ESubsectorFunderInitiative.mainProgramActivity, header1: 'Funders - Education Subsectors', header2: 'Initiatives - Main Programming Activity', subHeader: 'Number of Funders', initiative: false}
        }

        if (this.state.secondaryAttributeSelection == "countryOfOperation") {
          return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: this.state.FunderTypeInitiative[0].ESubsectorInitiative.countryOfOperation, sub3: this.state.FunderInitiative[0].ESubsectorFunderInitiative.countryOfOperation, header1: 'Funders - Education Subsectors', header2: 'Initiatives - Country of Operation', subHeader: 'Number of Funders', initiative: false}
        }

        return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: '', sub3: '', header1: 'Funders - Education Subsectors', header2: '', subHeader: 'Number of Funders', initiative: false }
      }

      if (this.state.entitySelection == "funders" && this.state.attributeSelection == "baseLocations") {
        if (this.state.secondaryAttributeSelection == "mainProgramActivity") {
          return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: this.state.FunderTypeInitiative[0].BaseLocInitiative.mainProgramActivity, sub3: this.state.FunderInitiative[0].BaseLocFunderInitiative.mainProgramActivity, header1: 'Funders - Base Locations', header2: 'Initiatives - Main Programming Activity', subHeader: 'Number of Funders', initiative: false}
        }

        if (this.state.secondaryAttributeSelection == "countryOfOperation") {
          return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: this.state.FunderTypeInitiative[0].BaseLocInitiative.countryOfOperation, sub3: this.state.FunderInitiative[0].BaseLocFunderInitiative.countryOfOperation, header1: 'Funders - Base Locations', header2: 'Initiatives - Country of Operation', subHeader: 'Number of Funders', initiative: false}
        }

        return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: '', sub3: '', header1: 'Funders - Base Locations', header2: '', subHeader: 'Number of Funders', initiative: false }
      }

      if (this.state.entitySelection == "implementers" && this.state.attributeSelection == "profitMotive") {
        if (this.state.secondaryAttributeSelection == "mainProgramActivity") {
          return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: this.state.ImplementerTypeInitiative.ProfitMotiveInitiative.mainProgramActivity, sub3: this.state.ImplementerInitiative.ProfitMotiveImplementerInitiative.mainProgramActivity, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Main Programming Activity', subHeader: 'Number of Implementers', initiative: false}
        }

        if (this.state.secondaryAttributeSelection == "countryOfOperation") {
          return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: this.state.ImplementerTypeInitiative.ProfitMotiveInitiative.countryOfOperation, sub3: this.state.ImplementerInitiative.ProfitMotiveImplementerInitiative.countryOfOperation, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Country of Operation', subHeader: 'Number of Implementers', initiative: false}
        }

        return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: '', sub3: '', header1: 'Implementers - Profit Motives', header2: '', subHeader: 'Number of Implementers', initiative: false}
      }

      if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "mainProgramActivity") {
        return {main: this.state.InititativeData.mainProgrammingActivity.initAttributes, sub: this.state.InititativeData.mainProgrammingActivity.initNames, sub1: '', sub2: '', header1: 'Initiatives - Main Programming Area', header2: '', initiative: true}
      }

      if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "countryOfOperation") {
        return {main: this.state.InititativeData.countryOfOperation.initAttributes, sub: this.state.InititativeData.countryOfOperation.initNames, sub1: '', sub2: '', header1: 'Initiatives - Countries of Operation', header2: '', initiative: true}
      }
    }
    else {
      return null;
    }
  }

  handleEntitySelection = (event) => {
    this.setState({
      entitySelection: event.target.value,
      attributeSelection: 'select',
      secondaryAttributeSelection: 'select',
      compareChecked: false,
      breakDownChecked: false,
      mapViewChecked: false
    });
  }

  handleAttributeSelection = (event) => {
    this.setState({
      attributeSelection: event.target.value,
      mapViewChecked: false
    });
  }

  handleSecondaryAttributeSelection = (event) => {
    this.setState({
      secondaryAttributeSelection: event.target.value,
      mapViewChecked: false
    });
  }

  handleBreakDownChange = (checked) =>  {
    this.setState({ breakDownChecked: checked });
  }

  handleCompareChange = (checked) =>  {
    this.setState({
      compareChecked: checked,
      secondaryAttributeSelection: 'select' });
  }

  handleMapViewChange = (checked) =>  {
    this.setState({ mapViewChecked: checked });
  }

  render() {
    //Dynamically make attribute text field appear based on entity selection
    const selection = this.state.entitySelection == "funders" ?
      <select value = {this.state.attributeSelection} type="attributes" id="attributes" name="attributes" onChange={this.handleAttributeSelection} style = {{width:"80%", margin: "50px 0 0 25px"}}>
        <option value="select" selected = "selected">Filter a target funder attribute</option>
        <option value="profitMotive">Profit Motive</option>
        <option value="organizationForm">Organization Form</option>
        <option value="impactInvestor">Impact Investor</option>
        <option value="eSubsectors">Education Subsectors</option>
        <option value="baseLocations">Base Locations</option>
      </select> : (
        this.state.entitySelection == "initiatives" ?
        <select value = {this.state.attributeSelection} type="attributes" id="attributes" name="attributes" onChange={this.handleAttributeSelection} style = {{width:"80%", margin: "50px 0 0 25px"}}>
          <option value="select" selected = "selected">Filter an initiative attribute</option>
          <option value="mainProgramActivity">Main Programming Activity</option>
          <option value="countryOfOperation">Country of Operation</option>
        </select> : (
          this.state.entitySelection == "implementers" ?
          <select value = {this.state.attributeSelection} type="attributes" id="attributes" name="attributes" onChange={this.handleAttributeSelection} style = {{width:"80%", margin: "50px 0 0 25px"}}>
              <option value="select">Filter an implementer attribute</option>
            <option value="profitMotive">Profit Motive</option>
          </select> :
          null
        )
      )

      //Dynamically make secondary comparison field appear if compare toggle is on
      const secondarySelection = this.state.compareChecked ? (this.state.entitySelection == 'funders' || this.state.entitySelection == 'implementers' ?
        <select value = {this.state.secondaryAttributeSelection} type="attributes" id="attributes" name="attributes" onChange={this.handleSecondaryAttributeSelection} style = {{width:"80%", margin: "25px 0 0 25px"}}>
          <option value="select" selected = "selected">Filter an initiative attribute</option>
          <option value="mainProgramActivity">Main Programming Activity</option>
          <option value="countryOfOperation">Country of Operation</option>
        </select>
        : null
        ) : null

      //Compare toggle label
      const compareLabel = this.state.entitySelection !== 'select' ? (this.state.entitySelection == 'funders' || this.state.entitySelection == 'implementers' ? 'Initiatives' : null) : null
      //Breakdown toggle label
      const breakDownLabel = this.state.entitySelection !== 'select' ? (this.state.entitySelection == 'funders' ? "Funders" : (this.state.entitySelection == 'initiatives' ? 'Initiatives' : (this.state.entitySelection == 'implementers' ? 'Implementers' : null))) : null

      //Toggle for implementer/funder to initiative comparison - choose whether to show or not depending on the type of entity initially chosen
      const toggleCompare = this.state.attributeSelection !== 'select' ?
      (this.state.entitySelection == 'funders' || this.state.entitySelection == 'implementers' ?
        <div>
          <div style = {{margin: "50px 55px 0 30px"}}>
            <div style = {{float: "left"}}>
              <label style = {{margin: "0 25px 0 0", verticalAlign: "top", fontSize: "17px"}}> Break down {breakDownLabel} </label>
            </div>
            <div style = {{float: "right"}}>
              <Switch checked={this.state.breakDownChecked} onColor="#86d3ff" onHandleColor="#2693e6"
                handleDiameter={20} uncheckedIcon={false} checkedIcon={false} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20} width={48} className="react-switch" id="material-switch" key="breakDownChecked" disabled
               />
             </div>
           </div>
           <div style = {{margin: "130px 55px 0 30px"}}>
              <div style = {{float: "left"}}>
                <label style = {{margin: "0 25px 0 0", verticalAlign: "top", fontSize: "17px"}}> Compare with {compareLabel} </label>
              </div>
              <div style = {{float: "right"}}>
               <Switch checked={this.state.compareChecked} onChange={this.handleCompareChange} onColor="#86d3ff" onHandleColor="#2693e6"
                  handleDiameter={20} uncheckedIcon={false} checkedIcon={false} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20} width={48} className="react-switch" id="material-switch" key="compareChecked" disabled = {this.state.mapViewChecked}
                />
              </div>
            </div>
          </div>
       : null ) : null

     const toggleMap = this.state.attributeSelection == 'countryOfOperation' || this.state.secondaryAttributeSelection == 'countryOfOperation' ?
       <div style = {{margin: "50px 55px 0 30px"}}>
          <div style = {{float: "left"}}>
            <label style = {{margin: "0 25px 0 0", verticalAlign: "top", fontSize: "17px"}}> Map View </label>
          </div>
          <div style = {{float: "right"}}>
           <Switch checked={this.state.mapViewChecked} onChange={this.handleMapViewChange} onColor="#86d3ff" onHandleColor="#2693e6"
              handleDiameter={20} uncheckedIcon={false} checkedIcon={false} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20} width={48} className="react-switch" id="material-switch" key="compareChecked"
            />
          </div>
        </div>
        :
        null

      //Setup Chart as the visualization medium
      const visual = this.state.attributeSelection !== 'select' ?
      (
        this.dataSelection() ?
        <Chart data = {this.dataSelection()} toggleCompare = {this.state.compareChecked} toggleBreakDown = {this.handleBreakDownChange} toggleMap = {this.state.mapViewChecked}/>
        : <h3> Error occured loading data, please refresh page </h3>
      ) : <img src = {WorldIcon} height = {400} width = {400} style = {{margin: "150px 0 0 450px"}} />


      return (
        <div style = {{height: "100%"}}>
          <div className = "settings" style = {{width: "25%", height: "100%", float: "left"}}>
            <nav className = "nav flex-column navbar-dark bg-white" style = {{height: "100%"}}>
              <select value = {this.state.entitySelection} type="entity" id="entity" name="entity" onChange={this.handleEntitySelection} style = {{width:"80%", margin: "50px 0 0 25px"}}>
                <option value="select">Filter Entity Type</option>
                <option value="funders">Funders</option>
                <option value="initiatives">Initiatives</option>
                <option value="implementers">Implementers</option>
              </select>
              {selection}
              {toggleCompare}
              {secondarySelection}
              {toggleMap}
              <hr style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 2
                }}
            />
            </nav>
          </div>
          {visual}
        </div>
      );
   }
}

const mapStateToProps = (state) => {
  return {
    FunderData: state.data.FunderData,
    ImplementerData: state.data.ImplementerData,
    InititativeData: state.data.InititativeData,
    FunderAttributes: state.data.FunderAttributes,
    ImplementerAttributes: state.data.ImplementerAttributes,
    FunderTypeInitiative: state.data.FunderTypeInitiative,
    ImplementerTypeInitiative: state.data.ImplementerTypeInitiative,
    FunderInitiative: state.data.FunderInitiative,
    ImplementerInitiative: state.data.ImplementerInitiative
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFunderData: () => {dispatch(getFunderData())},
    getImplementerData: () => {dispatch(getImplementerData())},
    getInitiativeData: () => {dispatch(getInitiativeData())},
    getInitiativeFundersByAttr: () => {dispatch(getInitiativeFundersByAttr())},
    getInitiativeImplementersByAttr: () => {dispatch(getInitiativeImplementersByAttr())}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Visualize)
