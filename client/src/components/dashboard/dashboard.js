import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

class dashboard extends Component {
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
                <h4>You have successfully registered an organization user.</h4>
              </div>
            </div>
          </div>
        </div>
        <div className = "container">
          <div className = "row mt-5">
            <div className = "col-md-8 m-auto">
              <div className = "card card-body text-center">
                 <Link to="/formsubmission"><h5>Request a change or addition</h5></Link>
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

export default connect(mapStateToProps)(dashboard)
