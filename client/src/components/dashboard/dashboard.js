import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './dashboard.css';
import {getApprovedForm, getNonApprovedForm, clearFormStatus, setNewFormStatus} from '../../store/actions/dataActions'

class dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      modifyTagNum: null,
      reviewTagNum: null,
      addClicked: false,
      modifyClicked: false,
      reviewClicked: false
    }

    this.tagNumChange = this.tagNumChange.bind(this);
    this.handleModifyClick = this.handleModifyClick.bind(this);
    this.handleReviewClick = this.handleReviewClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  handleModifyClick(e){
    e.preventDefault();
    if (this.state.modifyTagNum !== null && this.state.modifyTagNum !== ""){
      //Get form
      this.props.getForm(this.state.modifyTagNum, 'modify');
      this.state.modifyClicked = true;
    }
  }

  handleReviewClick(e){
    e.preventDefault();
    if (this.state.reviewTagNum !== null && this.state.reviewTagNum !== ""){
      //Get form
      this.props.getForm(this.state.reviewTagNum, 'review');
      this.state.reviewClicked = true;
    }
  }

  handleAddClick(e){
    e.preventDefault();
    this.props.newForm();
    this.state.addClicked = true;
  }

  tagNumChange(e){
    if (e.target.id == 'modifyTagNum') {
      this.state.modifyTagNum = e.target.value;

      if (this.state.modifyTagNum !== null && this.state.modifyTagNum !== ""){
        ReactDOM.render(<h5>Modify an Existing Submission Form</h5>, document.getElementById("modifyFormActive"))
        ReactDOM.render(<div></div>, document.getElementById("modifyFormInactive"))
      }
      else {
        ReactDOM.render(<font color="grey"><h5>Modify an Existing Submission Form</h5></font>, document.getElementById("modifyFormInactive"))
        ReactDOM.render(<div></div>, document.getElementById("modifyFormActive"))
      }
    }
    else if (e.target.id == 'reviewTagNum') {
      this.state.reviewTagNum = e.target.value;
      console.log(this.state.reviewTagNum)
      if (this.state.reviewTagNum !== null && this.state.reviewTagNum !== ""){
        ReactDOM.render(<h5>Review a Submission Form</h5>, document.getElementById("reviewFormActive"))
        ReactDOM.render(<div></div>, document.getElementById("reviewFormInactive"))
      }
      else {
        ReactDOM.render(<font color="grey"><h5>Review a Submission Form</h5></font>, document.getElementById("reviewFormInactive"))
        ReactDOM.render(<div></div>, document.getElementById("reviewFormActive"))
      }
    }

  }

  render() {
    const {authorized, accessError, formStatus, clearForm, userData} = this.props;
    if (authorized === false){
      return <Redirect to='/' />
    }

    if (accessError == null) {
      if (this.state.modifyClicked || this.state.reviewClicked || this.state.addClicked) {
        //If user selects option to modify form
        if (this.state.modifyClicked) {
          this.setState({
            modifyClicked: false
          });
          return <Redirect to='/formsubmission'/>
        //If user selects option to add a new form
        }
        else if (this.state.addClicked) {
          this.setState({
            addClicked: false
          });
          return <Redirect to='/formsubmission'/>
        }
        //If user selects option to review form
        else if (this.state.reviewClicked){
          this.setState({
            reviewClicked: false
          });
          return <Redirect to='/formReview'/>
        }
      }
      else {
        clearForm();
      }
    }
    //If could not access form from either db, then return error message
    const error = accessError ?
    <div className="alert alert-danger alert-dismissible fade show" style = {{width: "25%", margin: "0 auto", marginTop: "50px"}}>
      <p style = {{textAlign: "center"}}> {accessError}</p>
    </div> : null

    //Handle click
    const click = (num) => (e) => {
      this.handleClick(e, num);
    }

    //Render review option only if RA or root user
    const review = userData ? (userData.accessLevel !== 0 ?
      <div className = "container">
        <div className = "row mt-4">
          <div className = "col-md-8 m-auto text-center">
            <div className = "card card-body">
              <h3>Review Form</h3>
              <input type="number" id="reviewTagNum" name="reviewTagNum" placeholder="Tag Number of Form to Review" onChange={this.tagNumChange}/><br></br>
              <Link onClick={this.handleReviewClick}><div id="reviewFormActive"></div></Link>
              <div id="reviewFormInactive"><font color="grey"><h5>Review a Submission Form</h5></font></div>
            </div>
          </div>
        </div>
      </div>: null
    ) : null

    return (
      <div id = "dashboard">
        <h2>My Dashboard</h2>
        {error}
        <div className = "container">
          <div className = "row mt-4">
            <div className = "col-md-8 m-auto">
              <div className = "card card-body text-center">
                <h3>Add a New Form</h3>
                <Link onClick={this.handleAddClick}><h5>Create an Information Submission Form</h5></Link>
              </div>
            </div>
          </div>
        </div>
        <div className = "container">
          <div className = "row mt-4">
            <div className = "col-md-8 m-auto text-center">
              <div className = "card card-body">
                <h3>Modify Form</h3>
                <input type="number" id="modifyTagNum" name="modifyTagNum" placeholder="Tag Number of Form to Modify" onChange={this.tagNumChange}/><br></br>
                <Link onClick={this.handleModifyClick}><div id="modifyFormActive"></div></Link>
                <div id="modifyFormInactive"><font color="grey"><h5>Modify an Existing Submission Form</h5></font></div>
              </div>
            </div>
          </div>
        </div>
        {review}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth,
    accessError: state.data.accessError,
    formStatus: state.data.formStatus,
    userData: state.data.userInformation
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getForm: (tag, getType) => dispatch(getNonApprovedForm(tag, getType)),
    clearForm: () => dispatch(clearFormStatus()),
    newForm: () => dispatch(setNewFormStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dashboard)
