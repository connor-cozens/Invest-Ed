import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {getApprovedForm} from '../../store/actions/dataActions'

class dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      tagNum: null
    }
    //

    this.tagNumChange = this.tagNumChange.bind(this);
    this.tagNumEntered = this.tagNumEntered.bind(this);
  }

  tagNumEntered(e) {
    if(e.target.id == "modifyTagNum") {
      if(this.state.modifyTagNum !== null && this.state.modifyTagNum !== ""){
        this.props.getForm(this.state, 'modify');
      }
    }
  }

  tagNumChange(e){
    this.setState({
      tagNum: e.currentTarget.value
    });

    if(e.target.id == "modifyTagNum") {
      if(this.state.modifyTagNum !== null && this.state.modifyTagNum !== ""){
        ReactDOM.render(<h5>Modify an Existing Submission Form</h5>, document.getElementById("modifyFormActive"))
        ReactDOM.render(<div></div>, document.getElementById("modifyFormInactive"))
      }
      else{
        ReactDOM.render(<font color="grey"><h5>Modify an Existing Submission Form</h5></font>, document.getElementById("modifyFormInactive"))
        ReactDOM.render(<div></div>, document.getElementById("modifyFormActive"))
      }
      console.log(this.state.tagNum);
    }
  }
  render() {
    const {authorized} = this.props;
    if (authorized === false){
      return <Redirect to='/' />
    }
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
                <input type="number" id="modifyTagNum" name="modifyTagNum" placeholder="Tag#" onChange={this.tagNumChange} onBlur={this.tagNumEntered}/><br></br><br></br>
              <div className = "card card-body">
                <Link to="/formReview"><div id="modifyFormActive"></div></Link>
                <div id="modifyFormInactive"><font color="grey"><h5>Modify an Existing Submission Form</h5></font></div>
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
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getForm: (tag, getType) => dispatch(getApprovedForm(tag, getType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dashboard)
