import React, {Component} from 'react';
import Network from './network';

class Visualize extends Component {
  state = {
    //This is dummy data for now. When connected with backend will be get this back as json response
    foundations:
      {targetFunders:
        [{name: "funder1", profitMotive: "profit", organizationForm: "private", countryOperation: [{countryName: "Egypt"}, {countryName: "Iran"}]},
        {name: "funder2", profitMotive: "not-for-profit", organizationForm: "private", countryOperation: [{countryName: "Albania"}, {countryName: "Portugal"}]},
        {name: "funder3", profitMotive: "not-for-profit", organizationForm: "private", countryOperation: [{countryName: "Italy"}, {countryName: "Portugal"}]},
        {name: "funder4", profitMotive: "hybrid", organizationForm: "impact investor", countryOperation: [{countryName: "Thailand"}, {countryName: "Afghanistan"}]}],
      implementers:
        [{name: "implementer1", profitMotive: "profit"},
         {name: "implementer2", profitMotive: "profit"},
         {name: "implementer3", profitMotive: "not-for-profit"}]
      },

    initiatives:
      [{name: "initiative1", mainProgramActivity: "Contracting", countryOperation: [{countryName: "China"}, {countryName: "Australia"}]},
      {name: "initiative2", mainProgramActivity: "School Loans", countryOperation: [{countryName: "China"}, {countryName: "Australia"}]},
      {name: "initiative3", mainProgramActivity: "Scholarships", countryOperation: [{countryName: "China"}, {countryName: "Australia"}]}],

    selectedFoundations: '',
    selectedInitiatives: '',
    dataFoundations: '',
    dataInitiatives: ''
  }

  getProfitMotive = (entity) => {
    var filter = {};
    if (entity == "targetFunders" || entity == "foundations") {
      Array.prototype.forEach.call(this.state.foundations.targetFunders, item => {
        if (filter[item.profitMotive] == null) { filter[item.profitMotive] = 1; }
        else { filter[item.profitMotive]++; }
      })
    }

    if (entity == "implementers" || entity == "foundations") {
      Array.prototype.forEach.call(this.state.foundations.implementers, item => {
        if (filter[item.profitMotive] == null) { filter[item.profitMotive] = 1; }
        else { filter[item.profitMotive]++; }
      })
    }
    return filter;
  }

  getOrganizationForm = () => {
    var filter = {};
    Array.prototype.forEach.call(this.state.foundations.targetFunders, item => {
      if (filter[item.organizationForm] == null) { filter[item.organizationForm] = 1; }
      else { filter[item.organizationForm]++; }
    })
    return filter;
  }

  getMainProgrammingArea = () => {
    var filter = {};
    Array.prototype.forEach.call(this.state.initiatives, item => {
      if (filter[item.mainProgramActivity] == null) { filter[item.mainProgramActivity] = 1; }
      else { filter[item.mainProgramActivity]++; }
    })
    return filter;
  }

  /////////USE LATER ON
  // else if (entity == "foundations"){
  //   var arr1 = this.targetFunders.filter((currentValue) => { return value == currentValue.profitMotive });
  //   var arr2 = this.implementers.filter((currentValue) => { return value == currentValue.profitMotive });
  //   return arr1.concat(arr2);
  // }
  // else if (entity == "implementers"){
  //   return this.implementers.filter((currentValue) => { return value == currentValue.profitMotive });
  // }

  handleFoundationSelection = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
    if (event.target.value == 'profitMotive') {
      this.setState({
        dataFoundations: this.getProfitMotive("foundations")
      })
    }
    else if(event.target.value == 'organizationForm') {
      this.setState({
        dataFoundations: this.getOrganizationForm()
      })
    }
    else if(event.target.value == 'select')
    this.setState({
      dataFoundations: ''
    })
  }

  handleInitiativeSelection = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
    if (event.target.value == 'mainProgramActivity') {
      this.setState({
        dataInitiatives: this.getMainProgrammingArea()
      })
    }
    else if(event.target.value == 'select')
    this.setState({
      dataInitiatives: ''
    })
  }

  render() {
    return (
      <div>
        <select type="selectedFoundations" id="selectedFoundations" name="selectedFoundations" onChange={this.handleFoundationSelection} style = {{width:"22%", margin: "50px 0 0 50px"}}>
          <option value="select" selected = "selected">Filter a foundation attribute</option>
          <option value="profitMotive">profit Motive</option>
          <option value="organizationForm">Organization Form</option>
        </select>
        <select type="selectedInitiatives" id="selectedInitiatives" name="selectedFoundations" onChange={this.handleInitiativeSelection} style = {{width:"22%", margin: "50px 0 0 50px"}}>
          <option value="select" selected = "selected">Filter an initiative attribute</option>
          <option value="mainProgramActivity">Main Program Activity</option>
        </select>
        <Network dataFoundations = {this.state.dataFoundations} dataInitiatives = {this.state.dataInitiatives}/>
      </div>
    );
  }
}

export default Visualize
