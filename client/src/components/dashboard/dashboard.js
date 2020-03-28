import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {getApprovedForm, getNonApprovedForm, clearFormStatus} from '../../store/actions/dataActions'

class dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      tagNum: null,
      clicked: false
    }

    this.tagNumChange = this.tagNumChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.tagNum !== null && this.state.tagNum !== ""){
      //Get form
      this.props.getForm(this.state, 'modify');
      this.state.clicked = true;
    }
  }

  tagNumChange(e){
    this.state.tagNum = e.target.value;

    if (this.state.tagNum !== null && this.state.tagNum !== ""){
      ReactDOM.render(<h5>Modify an Existing Submission Form</h5>, document.getElementById("modifyFormActive"))
      ReactDOM.render(<div></div>, document.getElementById("modifyFormInactive"))
    }
    else {
      ReactDOM.render(<font color="grey"><h5>Modify an Existing Submission Form</h5></font>, document.getElementById("modifyFormInactive"))
      ReactDOM.render(<div></div>, document.getElementById("modifyFormActive"))
    }
    console.log(this.state.tagNum);
  }

  render() {
    const {authorized, accessError, formStatus} = this.props;
    if (authorized === false){
      return <Redirect to='/' />
    }

    if (accessError == null) {
      if (this.state.clicked) {
        this.setState({
          clicked: false
        });
        return <Redirect to='/formReview'/>
      }
    }
    //If could not access form from either db, then return error message
    const error = accessError ?
    <div className="alert alert-danger alert-dismissible fade show">
      Could not find requested form
    </div> : null

    return (
      <div>
        <div className = "container">
          <div className = "row mt-5">
            <div className = "col-md-8 m-auto">
              <div className = "card card-body text-center">
                <Link to="/formsubmission"><h5>Create an Information Submission Form</h5></Link>
              </div>
            </div>
          </div>
        </div>
        <div className = "container">
          <p></p>
          <div className = "row mt-5">
            <div className = "col-md-8 m-auto text-center">
            <p>Tag Number of Form to Modify</p>
                <input type="number" id="modifyTagNum" name="modifyTagNum" placeholder="Tag#" onChange={this.tagNumChange}/><br></br><br></br>
              <div className = "card card-body">
                <Link onClick={this.handleClick}><div id="modifyFormActive"></div></Link>
                <div id="modifyFormInactive"><font color="grey"><h5>Modify an Existing Submission Form</h5></font></div>
                {error}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth,
    accessError: state.data.accessError,
    formStatus: state.data.formStatus
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getForm: (tag, getType) => dispatch(getNonApprovedForm(tag, getType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dashboard)
