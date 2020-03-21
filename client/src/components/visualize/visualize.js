import React, {Component} from 'react';
import Chart from './chart'
import Switch from "react-switch";

class Visualize extends Component {
  state = {
    //Data to be used for visualization - will be returned by backend as json response instead - this is dummy for now
    TargetFunderData:
      {
        profitMotives: [
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
            value: 20 //Number of targetFunders that private funders
          },
          {
            name: "impact investor",
            value: 20
          }],
      },

    ImplementerData:
      {
        profitMotives: [
          {
            name: "profit",
            value: 20 //Number of implementers that are profit-based
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
        {
          mainProgramActivity: [
            {
              name: "Scholarships",
              value: 10  //Number of initiatives that have Scholarships as their main programming area
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

      ProfitMotiveTargetFunder: [
        {
          id: "profit",
          data: [
            {
              name: "funder1",
              value: 3 //Number of initiatives that funder1, a profit funder, funds
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

      ProfitMotiveImplementer: [
        {
          id: "profit",
          data:[
            {
              name: "implementer1",
              value: 4  //Number of initiatives that implementer1, a profit implementer, implements
            },
            {
              name: "implementer2",
              value: 6
            }
          ],
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

      OrgFormTargetFunder: [
          {
          id: "private",
          data:[
            {
              name: "funder1",
              value: 3 //Number of initiatives that funder1, a private funder, funds
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
              value: 2,
            },
            {
              name: "funder2",
              value: 3,
            },
            {
              name: "funder3",
              value: 2,
            }
          ]
        }
      ],

      ////////
      //Connection between Profit Funders and Initiatives
      ProfitMotiveFunderInitiative:
        {
          mainProgramActivity:[
            {
              id: "profit",
              data:[
                {
                  name: "Scholarships",
                  value: 4 //Number of intiatives of type "scholarship" are funded by profit funders
                },
                {
                  name: "School Loans",
                  value: 5
                },
                {
                  name: "Contracting",
                  value: 9
                }
              ]
            },
            {
              id: "not-for-profit",
              data:[
                {
                  name: "Contracting",
                  value: 5
                }
              ]
            },
            {
              id: "hybrid",
              data:[
                {
                  name: "Scholarships",
                  value: 3
                },
                {
                  name: "Contracting",
                  value: 4
                }
              ]
            }
          ]
        },

      OrgFormFunderInitiative:
        {
          mainProgramActivity:[
            {
              id: "private",
              data:[
                {
                  name: "Scholarships",
                  value: 10 //Number of intiatives of type "scholarship" are funded by profit funders
                },
                {
                  name: "School Loans",
                  value: 9
                },
                {
                  name: "Contracting",
                  value: 9
                }
              ]
            },
            {
              id: "impact investor",
              data:[
                {
                  name: "School Loans",
                  value: 9
                },
                {
                  name: "Contracting",
                  value: 10
                }
              ]
            }
          ]
        },


      //Connection between Profit Implementers and Initiatives
      ProfitMotiveImplementerInitiative:
        {
          mainProgramActivity:[
            {
              id: "profit",
              data:[
                {
                  name: "Scholarships",
                  value: 1 //Number of intiatives of type "scholarship" are funded by profit funders
                }
              ]
            },
            {
              id: "not-for-profit",
              data:[
                {
                  name: "Contracting",
                  value: 2
                }
              ]
            },
            {
              id: "hybrid",
              data:[
                {
                  name: "Scholarships",
                  value: 2
                },
                {
                  name: "Contracting",
                  value: 1
                }
              ]
            }
          ]
        },

      //Funder data related to initiatives
      FunderInitiative:
          {
            mainProgramActivity : [
            {
              id: "funder1",
              data: [
                {
                  name: "Scholarships",
                  value: 2 //Number of intiatives of type "scholarship" are funded by funder1
                },
                {
                  name: "School Loans",
                  value: 1
                },
                {
                  name: "Contracting",
                  value: 2
                }
              ]
            },
            {
              id: "funder2",
              data: [
                {
                  name: "Scholarships",
                  value: 4 //Number of intiatives of type "scholarship" are funded by funder1
                },
                {
                  name: "School Loans",
                  value: 4
                },
                {
                  name: "Contracting",
                  value: 5
                }
              ]
            },
            {
              id: "funder3",
              data: [
                {
                  name: "Scholarships",
                  value: 4 //Number of intiatives of type "scholarship" are funded by funder1
                },
                {
                  name: "School Loans",
                  value: 4
                },
                {
                  name: "Contracting",
                  value: 5
                }
              ]
            }
          ]
        },

      //Implementer data related to initiatives
      ImplementerInitiative:
        {
          mainProgramActivity : [
            {
              id: "implementer1",
              data: [
                {
                  name: "Scholarships",
                  value: 1 //Number of intiatives of type "scholarship" are funded by funder1
                },
                {
                  name: "Contracting",
                  value: 2
                }
              ]
            },
            {
              id: "implementer2",
              data: [
                {
                  name: "Scholarships",
                  value: 2 //Number of intiatives of type "scholarship" are funded by funder1
                },
                {
                  name: "School Loans",
                  value: 1
                },
                {
                  name: "Contracting",
                  value: 2
                }
              ]
            }
          ]
        },

      entitySelection: 'select',
      attributeSelection: 'select',
      secondaryAttributeSelection: 'select',
      breakDownChecked: false,
      compareChecked: false
  }

  dataSelection = () => {
    if (this.state.entitySelection == "targetFunders" && this.state.attributeSelection == "profitMotive") {
      if (this.state.secondaryAttributeSelection == "mainProgramActivity") {
        return {main: this.state.TargetFunderData.profitMotives, sub: this.state.ProfitMotiveTargetFunder, sub2: this.state.ProfitMotiveFunderInitiative.mainProgramActivity, sub3: this.state.FunderInitiative.mainProgramActivity, header1: 'Target Funders - Profit Motives', header2: 'Initiatives - Main Programming Activity' }
      }
      return {main: this.state.TargetFunderData.profitMotives, sub: this.state.ProfitMotiveTargetFunder, sub2: '', sub3: '', header1: 'Target Funders - Profit Motives', header2: '' }
    }
    if (this.state.entitySelection == "targetFunders" && this.state.attributeSelection == "organizationForm") {
      if (this.state.secondaryAttributeSelection == "mainProgramActivity") {
        return {main: this.state.TargetFunderData.organizationForm, sub: this.state.OrgFormTargetFunder, sub2: this.state.OrgFormFunderInitiative.mainProgramActivity, sub3: this.state.FunderInitiative.mainProgramActivity, header1: 'Target Funders - Organization Form', header2: 'Initiatives - Main Programming Activity' }
      }
      return {main: this.state.TargetFunderData.organizationForm, sub: this.state.OrgFormTargetFunder, sub2: '', sub3: '', header1: 'Target Funders - Organization Form', header2: '' }
    }
    if (this.state.entitySelection == "implementers" && this.state.attributeSelection == "profitMotive") {
      if (this.state.secondaryAttributeSelection == "mainProgramActivity") {
        return {main: this.state.ImplementerData.profitMotives, sub: this.state.ProfitMotiveImplementer, sub2: this.state.ProfitMotiveImplementerInitiative.mainProgramActivity, sub3: this.state.ImplementerInitiative.mainProgramActivity, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Main Programming Activity'}
      }
      return {main: this.state.ImplementerData.profitMotives, sub: this.state.ProfitMotiveImplementer, sub2: '', sub3: '', header1: 'Implementers - Profit Motives', header2: ''}
    }
    if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "mainProgramActivity") {
      return {main: this.state.InititativeData.mainProgramActivity, sub: '', sub1: '', sub2: '', header1: 'Initiatives - Main Programming Area', header2: ''}
    }
  }

  handleEntitySelection = (event) => {
    this.setState({ entitySelection: event.target.value, attributeSelection: 'select', secondaryAttributeSelection: 'select', compareChecked: false, breakDownChecked: false});
  }

  handleAttributeSelection = (event) => {
    this.setState({ attributeSelection: event.target.value });
  }

  handleSecondaryAttributeSelection = (event) => {
    this.setState({ secondaryAttributeSelection: event.target.value });
  }

  handleBreakDownChange = (checked) =>  {
    this.setState({ breakDownChecked: checked });
  }

  handleCompareChange = (checked) =>  {
    this.setState({ compareChecked: checked, secondaryAttributeSelection: 'select' });
  }

  render() {
    //Dynamically make attribute text field appear based on entity selection
    const selection = this.state.entitySelection == "targetFunders" ?
      <select value = {this.state.attributeSelection} type="attributes" id="attributes" name="attributes" onChange={this.handleAttributeSelection} style = {{width:"80%", margin: "50px 0 0 25px"}}>
        <option value="select" selected = "selected">Filter a target funder attribute</option>
        <option value="profitMotive">Profit Motive</option>
        <option value="organizationForm">Organization Form</option>
      </select> : (
        this.state.entitySelection == "initiatives" ?
        <select value = {this.state.attributeSelection} type="attributes" id="attributes" name="attributes" onChange={this.handleAttributeSelection} style = {{width:"80%", margin: "50px 0 0 25px"}}>
          <option value="select" selected = "selected">Filter an initiative attribute</option>
          <option value="mainProgramActivity">Main Programming Activity</option>
        </select> : (
          this.state.entitySelection == "implementers" ?
          <select value = {this.state.attributeSelection} type="attributes" id="attributes" name="attributes" onChange={this.handleAttributeSelection} style = {{width:"80%", margin: "50px 0 0 25px"}}>
              <option value="select">Filter an implementer attribute</option>
            <option value="profitMotive">Profit Motive</option>
          </select> :
          null
        )
      )

      //Dynamically make secondary comparison field appear if compare toggle on
      const secondarySelection = this.state.compareChecked ? (this.state.entitySelection == 'targetFunders' || this.state.entitySelection == 'implementers' ?
        <select value = {this.state.secondaryAttributeSelection} type="attributes" id="attributes" name="attributes" onChange={this.handleSecondaryAttributeSelection} style = {{width:"80%", margin: "25px 0 0 25px"}}>
          <option value="select" selected = "selected">Filter an initiative attribute</option>
          <option value="mainProgramActivity">Main Programming Activity</option>
        </select>
        : null
        ) : null

      //Compare toggle label
      const compareLabel = this.state.entitySelection !== 'select' ? (this.state.entitySelection == 'targetFunders' || this.state.entitySelection == 'implementers' ? 'Initiatives' : null) : null
      //Breakdown toggle label
      const breakDownLabel = this.state.entitySelection !== 'select' ? (this.state.entitySelection == 'targetFunders' ? "Target Funders" : (this.state.entitySelection == 'initiatives' ? 'Initiatives' : (this.state.entitySelection == 'implementers' ? 'Implementers' : null))) : null

      //Toggle for entity comparison - choose whether to show or not depending on the type of entity initially chosen
      const toggleCompare = this.state.attributeSelection !== 'select' ? (this.state.entitySelection == 'targetFunders' || this.state.entitySelection == 'implementers' ?
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
                  height={20} width={48} className="react-switch" id="material-switch" key="compareChecked"
                />
              </div>
            </div>
          </div>
       : null ) : null

     //Setup Piechart child component
     const piechart = this.state.attributeSelection !== 'select' ?
          <Chart data = {this.dataSelection} toggleCompare = {this.state.compareChecked} toggleBreakDown = {this.handleBreakDownChange}/> : null

      return (
        <div style = {{height: "100%"}}>
          <div className = "settings" style = {{width: "25%", height: "100%", float: "left"}}>
            <nav className = "nav flex-column navbar-dark bg-light" style = {{height: "100%"}}>
              <select value = {this.state.entitySelection} type="entity" id="entity" name="entity" onChange={this.handleEntitySelection} style = {{width:"80%", margin: "50px 0 0 25px"}}>
                <option value="select">Filter Entity Type</option>
                <option value="targetFunders">Target Funders</option>
                <option value="initiatives">Initiatives</option>
                <option value="implementers">Implementers</option>
              </select>
              {selection}
              {toggleCompare}
              {secondarySelection}
            </nav>
          </div>
          {piechart}
        </div>
      );
   }
}

export default Visualize
