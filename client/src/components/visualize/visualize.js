import React, {Component} from 'react';
import Chart from './chart'

class Visualize extends Component {
  state = {
    //Data to be used for visualization - will be returned by backend as json response instead - this is dummy for now
    TargetFunderData:
      {profitMotives: [
        {
          name: "profit",
          value: 30  //Number of targetFunders that are profit-based
        },
        {
          name: "not-for-profit",
          value: 50
        },
        {
          name: "hybrid",
          value: 10
        }],
        organizationForm: [
          {
            name: "private",
            value: 20
          },
          {
            name: "impact investor",
            value: 20
          }],
      },

    ImplementerData:
      {profitMotives: [
          {
            name: "profit",
            value: 20
          },
          {
            name: "not-for-profit",
            value: 20
          },
          {
            name: "hybrid",
            value: 5
          }],
      },

      InititativeData:
        {mainProgramActivity: [
            {
              name: "Scholarships",
              value: 10  //Number of initiatives that have "Scholarships as their main programming area"
            },
            {
              name: "School Loans",
              value: 15
            },
            {
              name: "Contracting",
              value: 5
            }],
        },

      ProfitMotiveTargetFunderData: [
        {
          id: "profit",
          data: [
            {
              name: "funder1",
              value: 3 //Number of initiatives Funded
            },
            {
              name: "funder2",
              value: 5
            },
            {
              name: "funder3",
              value: 10
            },
            {
              name: "funder4",
              value: 2
            }
          ]
        },

        {
          id: "not-for-profit",
          data: [
            {
              name: "funder1",
              value: 2
            },
            {
              name: "funder2",
              value: 3
            },
            {
              name: "funder3",
              value: 2
            }
          ]
        },

        {
          id: "hybrid",
          data: [
            {
              name: "funder1",
              value: 1
            },
            {
              name: "funder2",
              value: 2
            },
            {
              name: "funder3",
              value: 2
            }
          ]
        }
      ],

      ProfitMotiveImplementerData: [
        {
          id: "profit",
          data:[
            {
              name: "implementer1",
              value: 4
            },
            {
              name: "implementer2",
              value: 6
            }
          ]
        },

        {
          id: "not-for-profit",
          data:[
            {
              name: "implementer1",
              value: 2
            },
            {
              name: "implementer3",
              value: 2
            }
          ]
        },

        {
          id: "hybrid",
          data:[
            {
              name: "implementer1",
              value: 1
            },
            {
              name: "implementer2",
              value: 3
            },
            {
              name: "implementer3",
              value: 2
            }
          ]
        }
      ],

      OrgFormTargetFunderData: [
          {
          id: "private",
          data:[
            {
              name: "funder1",
              value: 3 //Number of initiatives Funded
            },
            {
              name: "funder2",
              value: 5
            },
            {
              name: "funder3",
              value: 10
            },
            {
              name: "funder4",
              value: 2
            }
          ]
        },

        {
          id: "impact investor",
          data:[
            {
              name: "funder1",
              value: 2
            },
            {
              name: "funder2",
              value: 3
            },
            {
              name: "funder3",
              value: 2
            }
          ]
        }
      ],

      entitySelection: '',
      attributeSelection: 'select'
  }

  dataSelection = () => {
    if (this.state.entitySelection == "targetFunders" && this.state.attributeSelection == "profitMotive") {
      return {main: this.state.TargetFunderData.profitMotives, sub: this.state.ProfitMotiveTargetFunderData}
    }
    if (this.state.entitySelection == "targetFunders" && this.state.attributeSelection == "organizationForm") {
      return {main: this.state.TargetFunderData.organizationForm, sub: this.state.OrgFormTargetFunderData}
    }
    if (this.state.entitySelection == "implementers" && this.state.attributeSelection == "profitMotive") {
      return {main: this.state.ImplementerData.profitMotives, sub: this.state.ProfitMotiveImplementerData}
    }
    if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "mainProgramActivity") {
      return {main: this.state.InititativeData.mainProgramActivity}
    }
  }

  entitySelection = (event) => {
    this.setState({entitySelection: event.target.value});
    this.setState({attributeSelection: 'select'});
  }

  attributeSelection = (event) => {
    this.setState({attributeSelection: event.target.value });
  }

  render() {
    const selection = this.state.entitySelection == "targetFunders" ?
      <select type="attributes" id="attributes" name="attributes" onChange={this.attributeSelection} style = {{width:"80%", margin: "50px 0 0 25px"}}>
        <option value="select" selected = "selected">Filter a target funder attribute</option>
        <option value="profitMotive">Profit Motive</option>
        <option value="organizationForm">Organization Form</option>
      </select> : (
        this.state.entitySelection == "initiatives" ?
        <select type="attributes" id="attributes" name="attributes" onChange={this.attributeSelection} style = {{width:"80%", margin: "50px 0 0 25px"}}>
          <option value="select" selected = "selected">Filter an initiative attribute</option>
          <option value="mainProgramActivity">Main Programming Activity</option>
        </select> : (
          this.state.entitySelection == "implementers" ?
          <select type="attributes" id="attributes" name="attributes" onChange={this.attributeSelection} style = {{width:"80%", margin: "50px 0 0 25px"}}>
              <option value="select" selected = "selected">Filter an implementer attribute</option>
            <option value="profitMotive">Profit Motive</option>
          </select> :
          null
        )
      )

      const piechart = this.state.attributeSelection !== 'select' ?
          <Chart data = {this.dataSelection}/> : null

      return (
        <div style = {{height: "100%"}}>
          <div className = "settings" style = {{width: "25%", height: "100%", float: "left"}}>
            <nav className = "nav flex-column navbar-dark bg-light" style = {{height: "100%"}}>
              <select type="entity" id="entity" name="entity" onChange={this.entitySelection} style = {{width:"80%", margin: "50px 0 0 25px"}}>
                <option value="select" selected = "selected">Filter Entity Type</option>
                <option value="targetFunders">Target Funders</option>
                <option value="initiatives">Initiatives</option>
                <option value="implementers">Implementers</option>
              </select>
              {selection}
            </nav>
          </div>
          {piechart}
        </div>
      );
   }
}

export default Visualize
