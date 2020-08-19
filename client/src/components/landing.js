import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, PieChart, Pie, Sector, Cell, Legend} from 'recharts'

import {getFunderData, getImplementerData, getInitiativeData} from '../store/actions/dataActions';
import './landing.css';

const COLORS = ['#2c3e50', '#95a5a6;', '#18bc9c', '#3498db'];

class Landing extends Component{
  state = {
    actorInfo: null,
    funderInfo: null,
    implementerInfo: null,
    initiativeInfo: null,
  }

  componentDidMount = () => {
    this.props.getFunderData();
    this.props.getImplementerData();
    this.props.getInitiativeData();
  }

  static getDerivedStateFromProps = (props, state) => {
    const {funderNumbers, implementerNumbers, initiativeNumbers, funderData, implementerData, initiativeData} = props;
    //Set numbers of each actor to be displayed in graph
    if (funderNumbers && implementerNumbers && initiativeNumbers) {
      state.actorInfo = [
        {name: "Funders", number: funderNumbers},
        {name: "Implementers", number: implementerNumbers},
        {name: "Initiatives", number: initiativeNumbers}
      ]
    }

    //Set funder base location data consisting of the top 3 (in terms of number) countries funders are based in
    if (funderData) {
      if (funderData.baseLocation) {
        funderData.baseLocation.sort((a,b) => (a.value > b.value) ? -1 : ((b.value > a.value) ? 1 : 0));
        const funderDataTop3 = funderData.baseLocation.filter((elem, index) => index < 3)
        if (funderDataTop3 !== undefined) {
          state.funderInfo = funderDataTop3
        }
      }
    }

    //Set implementer profit motive data consisting of the top 3 (in terms of number) motives
    if (implementerData) {
      if (implementerData.profitMotives) {
        implementerData.profitMotives.sort((a,b) => (a.value > b.value) ? -1 : ((b.value > a.value) ? 1 : 0));
        const implementerDataTop3 = implementerData.profitMotives.filter((elem, index) => index < 3)
        if (implementerDataTop3 !== undefined) {
          state.implementerInfo = implementerDataTop3
        }
      }
    }

    //Set initiative country of operation data consisting of the top 3 (in terms of number) countries
    if (initiativeData) {
      if (initiativeData.countryOfOperation) {
        if (initiativeData.countryOfOperation.initAttributes) {
          initiativeData.countryOfOperation.initAttributes.sort((a,b) => (a.value > b.value) ? -1 : ((b.value > a.value) ? 1 : 0));
          const initiativeDataTop3 = initiativeData.countryOfOperation.initAttributes.filter((elem, index) => index < 3)
          if (initiativeDataTop3 !== undefined) {
            state.initiativeInfo = initiativeDataTop3
          }
        }
      }
    }

    return {
      actorInfo: state.actorInfo,
      funderInfo: state.funderInfo
    }
  }

  render() {
    const {authorized, userData, userAccessError} = this.props;

    const numNonReviewedForms = authorized ? (
      !userAccessError ? (
        userData ? (
          userData.reviewForms ? (
            userData.reviewForms.filter(form => {
              return form.state === "Not Reviewed"
            })
          ) : (
            userData.editedForms ? (
              userData.editedForms.pendingForms.filter(form => {
                return form.state === "Not Reviewed"
              })
            ) : null
          )
        ) : null
      ) : null
    ) : null

    const numRejectedForms = authorized ? (
      !userAccessError ? (
        userData ? (
          userData.reviewForms ? (
            userData.reviewForms.filter(form => {
              return form.state === "Rejected"
            })
          ) : (
            userData.editedForms ? (
              userData.editedForms.pendingForms.filter(form => {
                return form.state === "Rejected"
              })
            ) : null
          )
        ) : null
      ) : null
    ) : null

    //Only applicable to organization users to see which how many of their forms have been approved
    const numApprovedForms = authorized ? (
      !userAccessError ? (
        userData ? (
          userData.editedForms ? (
            userData.editedForms.approvedForms ? (
              userData.editedForms.approvedForms.length
            ) : null
          ) : null
        ) : null
      ) : null
    ) : null

    const barGraph = this.state.actorInfo ?
    (
      <div>
        <br/>
        <h5><b>Number of Actors</b></h5>
        <BarChart
          width={450}
          height={200}
          data={this.state.actorInfo}
          layout="vertical"
          margin={{top: 0, right: 0, left: 25}}
          >
          <XAxis type="number"/>
          <YAxis type="category" dataKey="name" tick={{fontSize: 12}}/>
          <CartesianGrid strokeDasharray="4 3"/>
          <Tooltip/>
          <Bar dataKey= "number" fill = "#2c3e50"/>
        </BarChart>
      </div>
    ) : null

    const funderPieGraph = this.state.funderInfo ?
    (
      <div>
        <br/>
        <p style = {{height: "60px"}}><b>Number of Funders by Base Locations</b> - Top 3</p>
        <PieChart width={150} height={250}>
          <Pie dataKey="value"
            data={this.state.funderInfo}
            cy={65}
            innerRadius={40}
            outerRadius={70}
            fill="#2c3e50">
            {
              this.state.funderInfo.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]} />
              ))
            }
          </Pie>
          <Tooltip/>
          <Legend layout="vertical" verticalAlign="bottom" align="bottom" width = "175px" />
        </PieChart>
      </div>
    ) : null

    const implementerPieGraph = this.state.implementerInfo ?
    (
      <div className = "overview">
        <br/>
        <p style = {{height: "60px"}}><b>Number of Implementers by Profit Motive</b> - Top 3</p>
        <PieChart width={150} height={250}>
          <Pie dataKey="value"
            data={this.state.implementerInfo}
            cy={65}
            innerRadius={40}
            outerRadius={70}
            fill="#2c3e50">
            {
              this.state.implementerInfo.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]} />
              ))
            }
          </Pie>
          <Tooltip/>
          <Legend layout="vertical" verticalAlign="bottom" align="bottom" width = "175px" />
        </PieChart>
      </div>
    ) : null

    const initiativePieGraph = this.state.initiativeInfo ?
    (
      <div className = "overview">
        <br/>
        <p style = {{height: "60px"}}><b>Number of Initiatives by Countries of Operation</b> - Top 3</p>
        <PieChart width={150} height={250}>
          <Pie dataKey="value"
            data={this.state.initiativeInfo}
            cy={65}
            innerRadius={40}
            outerRadius={70}
            fill="#2c3e50">
            {
              this.state.initiativeInfo.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]} />
              ))
            }
          </Pie>
          <Tooltip/>
          <Legend layout="vertical" verticalAlign="bottom" align="bottom" width = "175px"/>
        </PieChart>
      </div>
    ) : null

    return (
      <div id = "landing">
        <div className = "container">
          <div className = "row mt-4">
            <div className = "col-md-12 m-auto">
                {
                  authorized ? (
                    <div className = "card card-body">
                      {
                        userAccessError ? <h4 style = {{color: "gray"}}>There was an error retrieving your information</h4> :
                        (
                          userData ?
                            <h4 style = {{color: "gray"}}>Welcome, {userData.firstname}</h4> :
                            <h4 style = {{color: "gray"}}>Loading</h4>
                        )
                      }
                      <hr/>

                      <h3 class="card-title"><b>Dashboard Overview</b></h3>
                      <br/>
                      <div style = {{display: "flex"}}>
                       {
                         numNonReviewedForms !== null ? (
                           <div className = "card text-white bg-warning mb-3" style={{maxWidth: "20rem"}}>
                             <div class="card-body">
                               <h4 class="card-title">Forms Not Reviewed</h4>
                               <h1>{numNonReviewedForms.length}</h1>
                             </div>
                           </div>
                         ) : null
                       }
                       {
                         numRejectedForms !== null ? (
                           <div className = "overview card text-white bg-danger mb-3" style={{maxWidth: "20rem"}}>
                             <div class="card-body">
                               <h4 class="card-title">Forms Rejected</h4>
                               <h1>{numRejectedForms.length}</h1>
                             </div>
                           </div>
                         ) : null
                       }
                       {
                         numApprovedForms !== null ? (
                           <div className = "overview card text-white bg-success mb-3" style={{maxWidth: "20rem"}}>
                             <div class="card-body">
                               <h4 class="card-title">Forms Approved</h4>
                               <h1>{numApprovedForms}</h1>
                             </div>
                           </div>
                         ) : null
                       }

                      </div>
                      <br/>
                      <Link to = '/dashboard'>Go to Dashboard ></Link>
                      <hr/>
                      <br/>

                      <div style = {{display: "flex"}}>
                        <div class="card bg-light mb-3" style={{display: "flex"}}>
                          <div class="card-body">
                            <h4 class="card-title"><b>Data Visualization Overview</b></h4>
                            {barGraph}
                            <hr/>
                            <div style = {{display: "flex"}}>
                              <div>
                                {funderPieGraph}
                              </div>
                              <div>
                                {implementerPieGraph}
                              </div>
                              <div>
                                {initiativePieGraph}
                              </div>
                            </div>
                            <br/>
                            <Link to = '/visualize'>View more data ></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className = "card card-body">
                      <div style = {{display: "flex"}}>
                        <div class="card bg-light mb-3" style={{display: "flex"}}>
                          <div class="card-body">
                            <h4 class="card-title"><b>Data Visualization Overview</b></h4>
                            <p> Visualize data pertaining to actors in girls education in the Global South.</p>
                            <p>Actors include initiatives for girls education, as well as the funding and implementing organizations who finance and support these initiatives.</p>
                            {barGraph}
                            <hr/>
                            <div style = {{display: "flex"}}>
                              <div>
                                {funderPieGraph}
                              </div>
                              <div>
                                {implementerPieGraph}
                              </div>
                              <div>
                                {initiativePieGraph}
                              </div>
                            </div>
                            <br/>
                            <Link to = '/visualize'>View more data ></Link>
                          </div>
                        </div>

                        <div class="overview card bg-light mb-3" style={{maxWidth: "27rem"}}>
                          <div class="card-body">
                            <h4 class="card-title"><b>Organization Access</b></h4>
                            <ul>
                              <li>View detailed information about actors.</li>
                              <li>Submit change requests to have new organization-specific information added for analysis and visualization purposes.</li>
                              <li>Update existing organization information.</li>
                            </ul>
                            <hr/>
                            <Link to = '/login'><p><b>Log in to your organization account</b></p></Link>
                            <p><i> Don't have an account?</i> <Link to = '/contactUs'>
                            <i>Contact us</i></Link><i> with your request to open an organization account.</i></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth,
    userData: state.data.userInformation,
    userAccessError: state.data.userRetrievalError,
    funderNumbers: state.data.FunderNumbers,
    implementerNumbers: state.data.ImplementerNumbers,
    initiativeNumbers: state.data.InititativeNumbers,
    funderData: state.data.FunderData,
    implementerData: state.data.ImplementerData,
    initiativeData: state.data.InititativeData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFunderData: () => {dispatch(getFunderData())},
    getImplementerData: () => {dispatch(getImplementerData())},
    getInitiativeData: () => {dispatch(getInitiativeData())}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
