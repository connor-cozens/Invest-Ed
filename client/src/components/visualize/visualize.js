import React, {Component} from 'react';
import Chart from './chart'
import Switch from "react-switch";
import Map from './map';

import WorldIcon from '../../images/world.png'

class Visualize extends Component {
  state = {
    //Data to be used for visualization - will be returned by backend as json response instead - this is dummy for now

//ENDPOINT 1 - TARGET FUNDER DATA
    TargetFunderData:
      {
        profitMotives: [
        {
          name: "profit",
          value: 4  //Number of target Funders that are profit-based
        },
        {
          name: "not-for-profit",
          value: 2
        },
        {
          name: "hybrid",
          value: 3
        }],
        organizationForm: [
          {
            name: "private",
            value: 20 //Number of target Funders that private funders
          },
          {
            name: "impact investor",
            value: 20
          }],
          //Probably will add more attributes, like countryOfOperation, etc.
      },

//ENDPOINT 2 - IMPLEMENTER DATA
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
          //Probably will add more attributes, like countryOfOperation, etc.
      },

//ENDPOINT 3 - INITIATIVE DATA
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
            countryOfOperation: [
              {
                name: "Canada",
                value: 10  //Number of initiatives that operate in Canada
              },
              {
                name: "India",
                value: 17
              },
              {
                name: "Australia",
                value: 20
              }],
        },

//ENDPOINT 4 - AN ARRAY OF ATTRIBUTES RELATED TO TARGET FUNDERS
      //ATTRIBUTE 1 - PROFIT MOTIVE
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
              value: 4
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

      //ATTRIBUTE 2 - ORGANIZATION FORM
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

//ENDPOINT 5 - AN ARRAY OF ATTRIBUTES RELATED TO IMPLEMENTERS
      //ATTRIBUTE 1 - ORGANIZATION FORM
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

  //ENDPOINT 6 - AN ARRAY OF RELATIONSHIPS BETWEEN TARGET FUNDERS AND INITIATIVES
      //RELATIONSHIP 1 - Relationship between Target funders filtered by profit motive, and Initiatives
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
          ],
          countryOfOperation:[
            {
              id: "profit",
              data:[
                {
                  name: "Brazil",
                  value: 11 //Number of intiatives operated in Brazil that are funded by profit funders
                },
                {
                  name: "Argentina",
                  value: 5
                },
                {
                  name: "Morocco",
                  value: 9
                }
              ]
            },
            {
              id: "not-for-profit",
              data:[
                {
                  name: "Saudi Arabia",
                  value: 2
                }
              ]
            },
            {
              id: "hybrid",
              data:[
                {
                  name: "Armenia",
                  value: 1
                },
                {
                  name: "Madagascar",
                  value: 1
                }
              ]
            }
          ]
        },

      //RELATIONSHIP 2 - Relationship between Target funders filtered by organization form, and Initiatives
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
          ],
          countryOfOperation:[
            {
              id: "private",
              data:[
                {
                  name: "Thailand",
                  value: 10 //Number of intiatives operated in Thailand that are funded by profit funders
                },
                {
                  name: "China",
                  value: 3
                },
                {
                  name: "India",
                  value: 5
                }
              ]
            },
            {
              id: "impact investor",
              data:[
                {
                  name: "Italy",
                  value: 7
                },
                {
                  name: "Bulgaria",
                  value: 5
                }
              ]
            }
          ]
        },


  //ENDPOINT 7 - AN ARRAY OF RELATIONSHIPS BETWEEN iMPLEMENTERS AND INITIATIVES
      //RELATIONSHIP 1 - Relationship between Implementers filtered by profit motive, and Initiatives
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
          ],

          countryOfOperation:[
            {
              id: "profit",
              data:[
                {
                  name: "Japan",
                  value: 3 //Number of intiatives operated in Japan are funded by profit funders
                }
              ]
            },
            {
              id: "not-for-profit",
              data:[
                {
                  name: "Cambodia",
                  value: 2
                }
              ]
            },
            {
              id: "hybrid",
              data:[
                {
                  name: "Philippines",
                  value: 4
                },
                {
                  name: "Bangladesh",
                  value: 1
                }
              ]
            }
          ]
        },

//ENDPOINT 8 - TARGET FUNDER SPECIFIC DATA RELATED TO INITIATIVES
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
              ]
            },
            {
              id: "funder2",
              data: [
                {
                  name: "Scholarships",
                  value: 2 //Number of intiatives of type "scholarship" are funded by funder1
                },
                {
                  name: "School Loans",
                  value: 2
                },
                {
                  name: "Contracting",
                  value: 1
                }
              ]
            },
            {
              id: "funder3",
              data: [
                {
                  name: "Scholarships",
                  value: 1 //Number of intiatives of type "scholarship" are funded by funder1
                },
                {
                  name: "School Loans",
                  value: 2
                },
                {
                  name: "Contracting",
                  value: 1
                }
              ]
            },
            {
              id: "funder4",
              data: [
                {
                  name: "Contracting",
                  value: 2
                }
              ]
            }
          ],
          countryOfOperation : [
          {
            id: "funder1",
            data: [
              {
                name: "Pakistan",
                value: 1 //Number of intiatives in Pakistan are funded by funder1
              },
              {
                name: "Afghanistan",
                value: 1
              },
              {
                name: "Australia",
                value: 1
              }
            ]
          },
          {
            id: "funder2",
            data: [
              {
                name: "Thailand",
                value: 2 //Number of intiatives of type "scholarship" are funded by funder1
              },
              {
                name: "Sudan",
                value: 1
              },
              {
                name: "Cambodia",
                value: 2
              }
            ]
          },
          {
            id: "funder3",
            data: [
              {
                name: "Nigeria",
                value: 2 //Number of intiatives of type "scholarship" are funded by funder1
              },
              {
                name: "India",
                value: 1
              },
              {
                name: "China",
                value: 1
              }
            ]
          },
          {
            id: "funder4",
            data: [
              {
                name: "India",
                value: 1
              },
              {
                name: "China",
                value: 1
              }
            ]
          }
        ]
      },

//ENDPOINT 9 - IMPLEMENTER SPECIFIC DATA RELATED TO INITIATIVES
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
          ],
          countryOfOperation: [
            {
              id: "implementer1",
              data: [
                {
                  name: "Canada",
                  value: 3 //Number of intiatives in Canada that are funded by funder1
                },
                {
                  name: "Spain",
                  value: 2
                }
              ]
            },
            {
              id: "implementer2",
              data: [
                {
                  name: "India",
                  value: 2 //Number of intiatives of type "scholarship" are funded by funder1
                },
                {
                  name: "Pakistan",
                  value: 4
                },
                {
                  name: "Iran",
                  value: 3
                }
              ]
            }
          ]
        },

      entitySelection: 'select',
      attributeSelection: 'select',
      secondaryAttributeSelection: 'select',
      breakDownChecked: false,
      compareChecked: false,
      mapViewChecked: false
  }

  dataSelection = () => {
    if (this.state.entitySelection == "targetFunders" && this.state.attributeSelection == "profitMotive") {
      if (this.state.secondaryAttributeSelection == "mainProgramActivity") {
        return {main: this.state.TargetFunderData.profitMotives, sub: this.state.ProfitMotiveTargetFunder, sub2: this.state.ProfitMotiveFunderInitiative.mainProgramActivity, sub3: this.state.FunderInitiative.mainProgramActivity, header1: 'Target Funders - Profit Motives', header2: 'Initiatives - Main Programming Activity', subHeader: 'Number of Target Funders' }
      }

      if (this.state.secondaryAttributeSelection == "countryOfOperation") {
        return {main: this.state.TargetFunderData.profitMotives, sub: this.state.ProfitMotiveTargetFunder, sub2: this.state.ProfitMotiveFunderInitiative.countryOfOperation, sub3: this.state.FunderInitiative.countryOfOperation, header1: 'Target Funders - Profit Motives', header2: 'Initiatives - Country of Operation', subHeader: 'Number of Target Funders'}
      }

      return {main: this.state.TargetFunderData.profitMotives, sub: this.state.ProfitMotiveTargetFunder, sub2: '', sub3: '', header1: 'Target Funders - Profit Motives', header2: '', subHeader: 'Number of Target Funders' }
    }

    if (this.state.entitySelection == "targetFunders" && this.state.attributeSelection == "organizationForm") {
      if (this.state.secondaryAttributeSelection == "mainProgramActivity") {
        return {main: this.state.TargetFunderData.organizationForm, sub: this.state.OrgFormTargetFunder, sub2: this.state.OrgFormFunderInitiative.mainProgramActivity, sub3: this.state.FunderInitiative.mainProgramActivity, header1: 'Target Funders - Organization Form', header2: 'Initiatives - Main Programming Activity', subHeader: 'Number of Target Funders'}
      }

      if (this.state.secondaryAttributeSelection == "countryOfOperation") {
        return {main: this.state.TargetFunderData.organizationForm, sub: this.state.OrgFormTargetFunder, sub2: this.state.OrgFormFunderInitiative.countryOfOperation, sub3: this.state.FunderInitiative.countryOfOperation, header1: 'Target Funders - Organization Form', header2: 'Initiatives - Country of Operation', subHeader: 'Number of Target Funders' }
      }

      return {main: this.state.TargetFunderData.organizationForm, sub: this.state.OrgFormTargetFunder, sub2: '', sub3: '', header1: 'Target Funders - Organization Form', header2: '', subHeader: 'Number of Implementers' }
    }

    if (this.state.entitySelection == "implementers" && this.state.attributeSelection == "profitMotive") {
      if (this.state.secondaryAttributeSelection == "mainProgramActivity") {
        return {main: this.state.ImplementerData.profitMotives, sub: this.state.ProfitMotiveImplementer, sub2: this.state.ProfitMotiveImplementerInitiative.mainProgramActivity, sub3: this.state.ImplementerInitiative.mainProgramActivity, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Main Programming Activity', subHeader: 'Number of Implementers'}
      }

      if (this.state.secondaryAttributeSelection == "countryOfOperation") {
        return {main: this.state.ImplementerData.profitMotives, sub: this.state.ProfitMotiveImplementer, sub2: this.state.ProfitMotiveImplementerInitiative.countryOfOperation, sub3: this.state.ImplementerInitiative.countryOfOperation, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Country of Operation', subHeader: 'Number of Implementers'}
      }

      return {main: this.state.ImplementerData.profitMotives, sub: this.state.ProfitMotiveImplementer, sub2: '', sub3: '', header1: 'Implementers - Profit Motives', header2: '', subHeader: 'Number of Implementers'}
    }

    if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "mainProgramActivity") {
      return {main: this.state.InititativeData.mainProgramActivity, sub: '', sub1: '', sub2: '', header1: 'Initiatives - Main Programming Area', header2: ''}
    }

    if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "countryOfOperation") {
      return {main: this.state.InititativeData.countryOfOperation, sub: '', sub1: '', sub2: '', header1: 'Initiatives - Countries of Operation', header2: ''}
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
      const secondarySelection = this.state.compareChecked ? (this.state.entitySelection == 'targetFunders' || this.state.entitySelection == 'implementers' ?
        <select value = {this.state.secondaryAttributeSelection} type="attributes" id="attributes" name="attributes" onChange={this.handleSecondaryAttributeSelection} style = {{width:"80%", margin: "25px 0 0 25px"}}>
          <option value="select" selected = "selected">Filter an initiative attribute</option>
          <option value="mainProgramActivity">Main Programming Activity</option>
          <option value="countryOfOperation">Country of Operation</option>
        </select>
        : null
        ) : null

      //Compare toggle label
      const compareLabel = this.state.entitySelection !== 'select' ? (this.state.entitySelection == 'targetFunders' || this.state.entitySelection == 'implementers' ? 'Initiatives' : null) : null
      //Breakdown toggle label
      const breakDownLabel = this.state.entitySelection !== 'select' ? (this.state.entitySelection == 'targetFunders' ? "Target Funders" : (this.state.entitySelection == 'initiatives' ? 'Initiatives' : (this.state.entitySelection == 'implementers' ? 'Implementers' : null))) : null

      //Toggle for implementer/funder to initiative comparison - choose whether to show or not depending on the type of entity initially chosen
      const toggleCompare = this.state.attributeSelection !== 'select' ?
      (this.state.entitySelection == 'targetFunders' || this.state.entitySelection == 'implementers' ?
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
            <Chart data = {this.dataSelection} toggleCompare = {this.state.compareChecked} toggleBreakDown = {this.handleBreakDownChange} toggleMap = {this.state.mapViewChecked}/>
            : <img src = {WorldIcon} height = {400} width = {400} style = {{margin: "150px 0 0 450px"}} />

      return (
        <div style = {{height: "100%"}}>
          <div className = "settings" style = {{width: "25%", height: "100%", float: "left"}}>
            <nav className = "nav flex-column navbar-dark bg-white" style = {{height: "100%"}}>
              <select value = {this.state.entitySelection} type="entity" id="entity" name="entity" onChange={this.handleEntitySelection} style = {{width:"80%", margin: "50px 0 0 25px"}}>
                <option value="select">Filter Entity Type</option>
                <option value="targetFunders">Target Funders</option>
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

export default Visualize
