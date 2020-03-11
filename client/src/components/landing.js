import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser} from '../store/actions/dataActions';

class Landing extends Component{
  componentDidMount(){
      this.props.getUser()
  }

  componentDidUpdate(prevProps){
      this.props.getUser()
  }

  render() {
    const {authorized} = this.props;
    const showAuthStatus = authorized ? <h3>You are logged in</h3> : <h3>You are NOT logged in</h3>
    return (
      <div>
        <h2 style = {{paddingTop: '50px'}}>Landing Page</h2>
        {showAuthStatus}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
