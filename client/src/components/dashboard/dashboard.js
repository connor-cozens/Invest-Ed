import React, {Component, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './dashboard.css';
import {getApprovedForm, getNonApprovedForm, clearFormStatus, setNewFormStatus, clearFormRetrievalError} from '../../store/actions/dataActions';

class Collapsible extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        open: false
      }
      this.toggle = this.toggle.bind(this);
  }

  toggle(e){
      this.setState({open: !this.state.open})
  }

  render() {
    return (<div>
      <div onClick={(e)=>this.toggle(e)} className='header'>
      {
        this.state.open ?
        <i class="arrow up"></i>
        : <i class="arrow down"></i>
      }
      {this.props.title}</div>
      {this.state.open ? (
          <div className='content'>
              {this.props.children}
          </div>
          ) : null}
      </div>
    );
  }
}

class dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      modifyTagNum: null,
      reviewTagNum: null,
      addClicked: false,
      modifyClicked: false,
      reviewClicked: false,
    }

    this.tagNumChange = this.tagNumChange.bind(this);
    this.handleModifyClick = this.handleModifyClick.bind(this);
    this.handleReviewClick = this.handleReviewClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  componentDidMount = () => {
    this.props.clearFormRetrievalError();
  }

  componentDidUpdate = () => {
    window.onpopstate = (e) => {
      this.props.history.push('/')
    }
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
    if (e.target.name == 'modifyTagNum') {
      this.state.modifyTagNum = e.target.value;
      this.setState({
        modifyTagNum: this.state.modifyTagNum
      });

      if (this.state.modifyTagNum !== null && this.state.modifyTagNum !== ""){
        ReactDOM.render(<h5>Modify an Existing Submission Form</h5>, document.getElementById("modifyFormActive"))
        ReactDOM.render(<div></div>, document.getElementById("modifyFormInactive"))
      }
      else {
        ReactDOM.render(<font color="grey"><h5>Modify an Existing Submission Form</h5></font>, document.getElementById("modifyFormInactive"))
        ReactDOM.render(<div></div>, document.getElementById("modifyFormActive"))
      }
    }
    else if (e.target.name == 'reviewTagNum') {
      this.state.reviewTagNum = e.target.value;
      this.setState({
        reviewTagNum: this.state.reviewTagNum
      });

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
    const {authorized, formAccessError, formStatus, clearForm, userData} = this.props;
    if (authorized === false){
      return <Redirect to='/' />
    }

    if (formAccessError === null) {
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

    //Handle click
    const click = (num) => (e) => {
      this.handleClick(e, num);
    }


    //RENDER PAGE ELEMENTS
    //If there was an issue accessing form from either db, then return form access error message
    const error = formAccessError ? (
      <div className="alert alert-dismissible alert-danger" style = {{width: "35%", margin: "0 auto", marginTop: "50px"}}>
        <strong>{formAccessError}</strong>
        <br></br>No form with that tag number was found.
      </div>
    ) : null

    //Render organization user's edited pending forms listing
    const pendingFormsList = userData ? (
      userData.editedForms ? (
        <div>
          <br></br>
          <Collapsible title="Your Submitted Forms Pending Approval">
          {
            userData.editedForms.pendingForms.length > 0 ? (
              userData.editedForms.pendingForms.map(form => {
                let formStateStyle = {color: 'orange'}
                if (form.state === 'Rejected') {
                  formStateStyle.color = 'red'
                }
                return (
                  <div className = 'formlist'>
                    <button name = "modifyTagNum" type = "button" onClick = {this.tagNumChange} value = {form.tag}>Form {form.tag}</button>
                    <div>
                      <text style = {formStateStyle}>{form.state}</text>
                    </div>
                  </div>
                );
              })
            ) : <p>You have no forms currently pending approval</p>
          }
          </Collapsible>
        </div>
      ) : null
    ) : null

    //Render organization user's edited approved forms listing
    const approvedFormsList = userData ? (
      userData.editedForms ? (
        userData.editedForms.approvedForms !== undefined ? (
          <div>
            <br></br>
            <Collapsible title="Your Approved Forms">
            {
              userData.editedForms.approvedForms.length > 0 ? (
                userData.editedForms.approvedForms.map(form => {
                  let formStateStyle = {color: 'green'}
                  return (
                    <div className = 'formlist'>
                      <button name = "modifyTagNum" type = "button" onClick = {this.tagNumChange} value = {form.tag}>Form {form.tag}</button>
                      <div>
                        <text style = {formStateStyle}>{form.state}</text>
                      </div>
                    </div>
                  );
                })
              ) : <p>You have no edited forms currently approved</p>
            }
            </Collapsible>
          </div>
        ) : null
      ) : null
    ) : null

    //RENDER FOR RA/ROOT USERS
    //Render list of forms to be reviewed only if RA or root user
    const reviewFormsList = userData ? (
      userData.accessLevel !== 0 ? (
        userData.reviewForms ? (
          <div>
            <br></br>
            <Collapsible title="Forms to Review">
            {
              userData.reviewForms.length > 0 ? (
                userData.reviewForms.map(form => {
                  let formStateStyle = {color: 'orange'}
                  if (form.state === 'Rejected') {
                    formStateStyle.color = 'red'
                  }
                  return (
                    <div className = 'formlist'>
                      <button name = "reviewTagNum" type = "button" onClick = {this.tagNumChange} value = {form.tag}>Form {form.tag}</button>
                      <div>
                        <text style = {formStateStyle}>{form.state}</text>
                      </div>
                    </div>
                  );
                })
              ) : <p>There are no forms currently that require review</p>
            }
            </Collapsible>
          </div>
        ) : null
      ) : null
    ) : null

    //Render review option only if RA or root user
    const review = userData ? (userData.accessLevel !== 0 ?
      <div className = "container">
        <div className = "row mt-4">
          <div className = "col-md-8 m-auto">
            <div className = "card card-body">
              <h3>Review</h3>
              {reviewFormsList}
              <br></br>
              <input type="number" name="reviewTagNum" value={this.state.reviewTagNum} placeholder="Enter Form Tag Number" onChange={this.tagNumChange}/><br></br>
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
              <div className = "card card-body">
                <h3>Add a New Form</h3>
                <Link onClick={this.handleAddClick}><h5>Create an Information Submission Form</h5></Link>
              </div>
            </div>
          </div>
        </div>
        <div className = "container">
          <div className = "row mt-4">
            <div className = "col-md-8 m-auto">
              <div className = "card card-body">
                <h3>Modify</h3>
                {pendingFormsList}
                {approvedFormsList}
                <br></br>
                <input type="number" name="modifyTagNum" value={this.state.modifyTagNum} placeholder="Enter Form Tag Number" onChange={this.tagNumChange}/><br></br>
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

  //When leaving component, clear form retrieval errors
  componentWillUnmount = () => {
    this.props.clearFormRetrievalError();
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth,
    formAccessError: state.data.formRetrievalError,
    formStatus: state.data.formStatus,
    userData: state.data.userInformation
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getForm: (tag, getType) => dispatch(getNonApprovedForm(tag, getType)),
    clearForm: () => dispatch(clearFormStatus()),
    clearFormRetrievalError: () => dispatch(clearFormRetrievalError()),
    newForm: () => dispatch(setNewFormStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dashboard)
