import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import './contactUs.css';
import {Redirect} from 'react-router-dom'

class contactUs extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        sender: null,
        emailSubject: null,
        emailBody: null
      }

      this.senderChange = this.senderChange.bind(this);
      this.subjectChange = this.subjectChange.bind(this);
      this.bodyChange = this.bodyChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    senderChange(e){
        this.state.sender = e.currentTarget.value;
    }
    subjectChange(e){
        this.state.emailSubject = e.currentTarget.value;
    }
    bodyChange(e){
        this.state.bodyChange = e.currentTarget.value;
    }

    handleFormSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }


    render(){
        console.log("test");
        const {authorized} = this.props;
        if (authorized === false) {
          //return <Redirect to='/' />
          //2 Different contact us views, general users must set a sender
          //Organization users have email auto-set

          return(
              <div className="col-md-8 m-auto">
                <br></br>
                <h4>Message Sender</h4>
                <input type="email" id="sender" name="emailSender" required wrap="off" placeholder="yourEmail@address.com" onChange={this.senderChange}></input>

                <h4>Message Subject</h4>
                <input type="text" id="subject" name="emailSubject" required wrap="off" placeholder="Write a subject" onChange={this.subjectChange}></input>

                <h4>Message Body</h4>
                <textarea id="body" name="emailBody" required rows="10" placeholder="Write your message here!" onChange={this.bodyChange}></textarea>
                
                <input type="submit"value="Send"/>
              </div>
          )
        }
        else{
            //Autofill organization's email address as Sender
            return(
                <div className="col-md-8 m-auto">
                <br></br>
                <h4>Message Subject</h4>
                <input type="text" id="subject" name="emailSubject" required wrap="off" placeholder="Write a subject" onChange={this.subjectChange}></input>

                <h4>Message Body</h4>
                <textarea id="body" name="emailBody" required rows="10" placeholder="Write your message here!" onChange={this.bodyChange}></textarea>

                <input type="submit"value="Send"/>
              </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
      authorized: state.authenticate.auth
    };
  }
  
  export default connect(mapStateToProps)(contactUs)