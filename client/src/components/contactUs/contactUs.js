import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import './contactUs.css';
import {Redirect} from 'react-router-dom'
import {userSendEmail} from '../../store/actions/dataActions';
import {getUser} from '../../store/actions/dataActions';

class contactUs extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        senderEmail: null,
        emailSubject: null,
        emailBody: null,
        firstName: null,
        lastName: null,
        organization: null,
      }

      this.senderChange = this.senderChange.bind(this);
      this.subjectChange = this.subjectChange.bind(this);
      this.bodyChange = this.bodyChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    senderChange(e){
        this.state.senderEmail = e.currentTarget.value;
    }
    subjectChange(e){
        this.state.emailSubject = e.currentTarget.value;
    }
    bodyChange(e){
        this.state.emailBody = e.currentTarget.value;
    }

    fillUserInfo(){
      if (this.props.userData != null){
        this.state.firstName = this.props.userData.firstname;
        this.state.lastName = this.props.userData.lastname;
        this.state.organization = this.props.userData.organization;
        this.state.senderEmail = this.props.userData.email;
      }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.fillUserInfo();
        console.log(this.props.userData);
        this.props.sendEmail(this.state);
        this.props.history.push('/');
    }


    render(){
        const {authorized} = this.props;
        if (authorized === false) {
          //return <Redirect to='/' />
          //2 Different contact us views, general users must set a sender
          //Organization users have email auto-set

          return(
            <form onSubmit={this.handleFormSubmit}>
              <div className="col-md-8 m-auto">
                <br></br>
                <h4>Message Sender</h4>
                <input type="email" id="sender" name="emailSender" required wrap="off" placeholder="yourEmail@address.com" onChange={this.senderChange}></input>

                <h4>Message Subject</h4>
                <input type="text" id="subject" name="emailSubject" required wrap="off" placeholder="Write a subject" onChange={this.subjectChange}></input>

                <h4>Message Body</h4>
                <textarea id="body" name="emailBody" required rows="10" placeholder="Write your message here!" onChange={this.bodyChange}></textarea>
                
                {/* <Link to = '/'> */}
                <input type="submit"value="Send"/>
                {/* </Link> */}
              </div>
            </form>
          )
        }
        else{
            //Autofill organization's email address as Sender
            return(
              <form onSubmit={this.handleFormSubmit}>
                <div className="col-md-8 m-auto">
                <br></br>
                <h4>Message Subject</h4>
                <input type="text" id="subject" name="emailSubject" required wrap="off" placeholder="Write a subject" onChange={this.subjectChange}></input>

                <h4>Message Body</h4>
                <textarea id="body" name="emailBody" required rows="10" placeholder="Write your message here!" onChange={this.bodyChange}></textarea>

                {/* <Link to = '/'> */}
                <input type="submit"value="Send"/>
                {/* </Link> */}
              </div>
            </form>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
      authorized: state.authenticate.auth,
      userData: state.data.userInformation
    };
  }

const mapDispatchToProps = (dispatch) => {
  return{
    sendEmail: (contents) => dispatch(userSendEmail(contents)),
    getUser: () => dispatch(getUser())
  }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(contactUs)