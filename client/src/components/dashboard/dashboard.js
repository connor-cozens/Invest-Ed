import React, {Component, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './dashboard.css';
import {getInitiativeTags, getApprovedForm, getNonApprovedForm, clearFormStatus, setNewFormStatus, clearFormRetrievalError} from '../../store/actions/dataActions';

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
        <i className ="arrow up"></i>
        : <i className ="arrow down"></i>
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
      modifyEnabled: false,
      modifyClicked: false,

      reviewTagNum: null,
      reviewEnabled: false,
      reviewClicked: false,

      addClicked: false
    }

    this.tagNumChange = this.tagNumChange.bind(this);
    this.handleModifyClick = this.handleModifyClick.bind(this);
    this.handleReviewClick = this.handleReviewClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  componentDidMount = () => {
      this.props.clearFormRetrievalError();
      this.props.getInitiativeTags();
      
  }

  componentDidUpdate = () => {
    window.onpopstate = (e) => {
      this.props.history.push('/')
    }
  }

  handleModifyClick(e){
    e.preventDefault();
    this.state.modifyClicked = false;
    this.state.reviewClicked = false;
    this.state.addClicked = false;

    if (this.state.modifyTagNum !== null && this.state.modifyTagNum !== ""){
      //Get form
      this.props.getForm(this.state.modifyTagNum, 'modify')
      //Set clicked status to modify
      this.state.modifyClicked = true;
    }
  }

  handleReviewClick(e){
    e.preventDefault();
    this.state.modifyClicked = false;
    this.state.reviewClicked = false;
    this.state.addClicked = false;

    if (this.state.reviewTagNum !== null && this.state.reviewTagNum !== ""){
      //Get form
      this.props.getForm(this.state.reviewTagNum, 'review')
      //Set clicked status to review
      this.state.reviewClicked = true;
    }
  }

  handleAddClick(e){
    e.preventDefault();
    this.state.modifyClicked = false;
    this.state.reviewClicked = false;
    this.state.addClicked = false;

    //Set new form status
    this.props.newForm();
    //Set clicked status to add
    this.state.addClicked = true;
  }

  tagNumChange(e){


    //Set tag number and enabled state
    if (e.target.name == 'modifyTagNum') {
      this.state.modifyTagNum = e.target.value;
      this.setState({
        modifyTagNum: this.state.modifyTagNum
      });

      if (this.state.modifyTagNum !== null && this.state.modifyTagNum !== ""){
        this.state.modifyEnabled = true;
      }
      //Tag num field has been emptied
      else {
        this.state.modifyEnabled = false;
      }

      this.setState({
        modifyEnabled: this.state.modifyEnabled
      })
    }
    else if (e.target.name == 'reviewTagNum') {
      this.state.reviewTagNum = e.target.value;
      this.setState({
        reviewTagNum: this.state.reviewTagNum
      });

      if (this.state.reviewTagNum !== null && this.state.reviewTagNum !== ""){
        this.state.reviewEnabled = true;
      }
      //Tag num field has been emptied
      else {
        this.state.reviewEnabled = false;
      }

      this.setState({
        reviewEnabled: this.state.reviewEnabled
      })
    }
    }

  render() {
    const {authorized, formAccessError, formStatus, clearForm, userData, tagNumbers} = this.props;
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
          return <Redirect to='/initiative-submission'/>
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

    //RENDER PAGE ELEMENTS
    //If there was an issue accessing form from either db, then return form access error message
    const error = formAccessError ? (
      <div className="alert alert-dismissible alert-danger" style = {{width: "100%", margin: "0 auto", marginTop: "20px"}}>
        <strong>{formAccessError}</strong>
        <br></br>No initiative with that tag number was found.
      </div>
    ) : null

    //Render organization user's edited pending forms listing
    const pendingFormsList = userData ? (
      userData.editedForms ? (
        <div>
          <br></br>
          <Collapsible title="Your Initiative Submissions Pending Approval">
          {
            userData.editedForms.pendingForms.length > 0 ? (
              userData.editedForms.pendingForms.map(form => {
                let formStateStyle = {color: 'orange'}
                if (form.state === 'Rejected') {
                  formStateStyle.color = 'red'
                }
                return (
                  <div className = 'form-list'>
                    <button className = "form-button" name = "modifyTagNum" type = "button" onClick = {this.tagNumChange} value = {form.tag}>Initiative Tag Number: <b>{form.tag}</b></button>
                    <hr/>
                    <div>
                      <text style = {formStateStyle}>Status: <b>{form.state}</b></text>
                    </div>
                  </div>
                );
              })
            ) : <p>You have no initiative submissions currently pending approval.</p>
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
            <Collapsible title="Your Approved Initiative Submissions">
            {
              userData.editedForms.approvedForms.length > 0 ? (
                userData.editedForms.approvedForms.map(form => {
                  let formStateStyle = {color: 'green'}
                  return (
                    <div className = 'form-list'>
                      <button className = "form-button" name = "modifyTagNum" type = "button" onClick = {this.tagNumChange} value = {form.tag}>Initiative Tag Number: <b>{form.tag}</b></button>
                      <hr/>
                      <div>
                        <text style = {formStateStyle}>Status: <b>{form.state}</b></text>
                      </div>
                    </div>
                  );
                })
              ) : <p>You have no initiative submissions currently approved.</p>
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
            <Collapsible title="Initiative Submissions to Review">
            {
              userData.reviewForms.length > 0 ? (
                userData.reviewForms.map(form => {
                  let formStateStyle = {color: 'orange'}
                  if (form.state === 'Rejected') {
                    formStateStyle.color = 'red'
                  }
                  return (
                    <div className = 'form-list'>
                      <button className = "form-button" name = "reviewTagNum" type = "button" onClick = {this.tagNumChange} value = {form.tag}>Initiative Tag Number: <b>{form.tag}</b></button>
                      <hr/>
                      <div>
                        <text style = {formStateStyle}>Status: <b>{form.state}</b></text>
                      </div>
                    </div>
                  );
                })
              ) : <p>There are currently no initiative submissions that require review.</p>
            }
            </Collapsible>
          </div>
        ) : null
      ) : null
    ) : null

    //Render review option only if RA or root user
    const review = userData ? (userData.accessLevel !== 0 ?
      <div className = "container" style = {{marginBottom: "100px"}}>
        <div className = "row mt-4">
          <div className = "col-md-9 m-auto">
            <div className = "card card-body">
              <h4><b>Review Initiative</b></h4>
              <hr/>
              {reviewFormsList}
              <br></br>
              <input type="number" name="reviewTagNum" value={this.state.reviewTagNum} placeholder="Initiative to Review by Tag Number" onChange={this.tagNumChange}/><br></br>
              {
                !this.state.reviewEnabled ?
                  <button className="search-button btn btn-primary disabled" disabled>Search</button> :
                  <button className="search-button btn btn-primary" onClick={this.handleReviewClick}>Search</button>
              }
              {
                this.state.reviewClicked ? error : null
              }
            </div>
          </div>
        </div>
      </div>: null
    ) : null

    return (
      <div id = "dashboard">
        <h2>My Dashboard</h2>
        <div className = "container">
          <div className = "row mt-4">
            <div className = "col-md-9 m-auto">
              <div className = "card card-body">
                <h4><b>Add Initiative</b></h4>
                <hr/>
                <Link onClick={this.handleAddClick}><h5>Complete Form</h5></Link>
              </div>
            </div>
          </div>
        </div>
        <div className = "container">
          <div className = "row mt-4">
            <div className = "col-md-9 m-auto">
              <div className = "card card-body">
                <h4><b>Modify Initiative</b></h4>
                <hr/>
                {pendingFormsList}
                {approvedFormsList}
                <br></br>
                <select name="modifyTagNumSelect" placeholder="Select Initiative to Modify by Tag Number" onChange={e => this.setState({modifyTagNum: e.target.value})} value={this.state.modifyTagNum}>
                    <option value={null} >Select Initiative to Modify by Tag Number</option>
                    {RenderTagList(tagNumbers)}
                </select>
                <button className="search-button btn btn-primary" onClick={this.handleModifyClick} disabled={this.state.modifyTagNum == null}>Search</button>
                <br></br>

                            {/*<input type="number" name="modifyTagNum" value={this.state.modifyTagNum} placeholder="Initiative to Modify by Tag Number" onChange={this.tagNumChange}/><br></br>
                {
                  !this.state.modifyEnabled ?
                    <button className="search-button btn btn-primary disabled" disabled>Search</button> :
                    <button className="search-button btn btn-primary" onClick={this.handleModifyClick}>Search</button>
                }
                {
                  this.state.modifyClicked ? error : null
                }*/}
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

const RenderTagList = (tagNumbers) => {

    return (
        Object.values(tagNumbers).map(tag => (
            <option value={tag.tagNumber}>{tag.tagNumber}</option>
    ))
        )
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth,
    formAccessError: state.data.formRetrievalError,
    formStatus: state.data.formStatus,
    userData: state.data.userInformation,
    tagNumbers: state.data.tagNumbers,

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInitiativeTags: () => dispatch(getInitiativeTags()),
    getForm: (tag, getType) => dispatch(getNonApprovedForm(tag, getType)),
    clearForm: () => dispatch(clearFormStatus()),
    clearFormRetrievalError: () => dispatch(clearFormRetrievalError()),
    newForm: () => dispatch(setNewFormStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dashboard)
