import React, { Component, useState } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { updateUser } from '../../store/actions/dataActions';
import './profile.css';
import Image from '../../images/profile.png'

const Profile = (props) => {
  

  const [allValues, setAllValues] = useState({
		editing: false,
		updating: false
	});
  
  
  const editClick = React.useCallback(
	// set not updating info
	() => setAllValues({editing: true, updating: false,})

  );

  
  
  const submitClick = React.useCallback(
	
	() => setAllValues({editing: false, updating: true,}),
	submitEdit(),
	() => setAllValues({editing: false, updating: false,}),
  );
  
  const discardChanges = React.useCallback(
	
	() => setAllValues({editing: false, updating: false,})
  );

   
  const {authorized, userAccessError, userData} = props;
   if (authorized !== true) {
      return <Redirect to='/' />
    }

   

  if (userAccessError) {
    return (
      <h3>There was an error retrieving your information</h3>
    );
  }

  const userType = userData ? (userData.accessLevel == 0 ? "Organization user" : (userData.accessLevel == 1 ? "Research user": "Root user")) : null

  

  function submitEdit(){
	
	if (allValues.updating == true)
	{		

		var temp = props.userData;
		try{
			var newName = document.getElementById("nameKey").value;
			if(newName != "")
			{
				temp.username = newName;
			}

			var newEmail = document.getElementById("emailKey").value;
			if(newEmail != "")
			{
				temp.email = newEmail;
			}

			var newOrg = document.getElementById("orgKey").value;	
			if(newOrg != "")
			{
				temp.organization = newOrg;
			}
		}
		catch{
			console.log("Error occured in account update");
		}
		// collect info
		
		
		console.log(props.userData)

		// save in database
		props.updateUser(temp);

	}


  }

    if (allValues.editing == false && userType == "Organization user") {

        return (
            <div>

                <div style={{ margin: "auto", height: "500px" }}>
                    <h2 style={{ marginTop: "50px" }}>Account Details</h2>
                    <div className="card" style={{ margin: "0 auto", width: "25rem", marginTop: "25px", borderStyle: "none" }}>
                        <img className="card-img-top" src={Image} alt="Card image cap" style={{ margin: "0 auto", marginTop: "25px", width: "200px", height: "200px" }} />
                        <div className="card-body" style={{ margin: "auto" }}>
                            <h3 style={{ textAlign: "left" }} className="card-title"><b>{userData ? userData.firstname + ' ' + userData.lastname : null}</b></h3>
                        </div>
                    </div>
                    <div className="card" style={{ margin: "0 auto", width: "25rem" }}>
                        <ul className="list-group list-group-flush">
                            <li style={{ paddingBottom: "15px" }} className="list-group-item">Username: <b>{userData ? userData.username : null}</b></li>
                            <li style={{ paddingBottom: "15px" }} className="list-group-item">Email: <b>{userData ? userData.email : null}</b></li>
                            <li style={{ paddingBottom: "15px" }} className="list-group-item">Organization: <b>{userData ? userData.organization : null}</b></li>
                            <li style={{ paddingBottom: "15px" }} className="list-group-item">User Type: <b>{userType}</b></li>

                            <button className="search-button btn btn-primary focus-visible" onClick={editClick} >Edit Information</button>

                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    else if (allValues.editing == false && userType != "Organization user") {
        return (
            <div>
                <div style={{ margin: "auto", height: "500px" }}>
                    <h2 style={{ marginTop: "50px" }}>Account Details</h2>
                    <div className="card" style={{ margin: "0 auto", width: "25rem", marginTop: "25px", borderStyle: "none" }}>
                        <img className="card-img-top" src={Image} alt="Card image cap" style={{ margin: "0 auto", marginTop: "25px", width: "200px", height: "200px" }} />
                        <div className="card-body" style={{ margin: "auto" }}>
                            <h3 style={{ textAlign: "left" }} className="card-title"><b>{userData ? userData.firstname + ' ' + userData.lastname : null}</b></h3>
                        </div>
                    </div>
                    <div className="card" style={{ margin: "0 auto", width: "25rem" }}>
                        <ul className="list-group list-group-flush">
                            <li style={{ paddingBottom: "15px" }} className="list-group-item">Username: <b>{userData ? userData.username : null}</b></li>
                            <li style={{ paddingBottom: "15px" }} className="list-group-item">Email: <b>{userData ? userData.email : null}</b></li>
                            <li style={{ paddingBottom: "15px" }} className="list-group-item">User Type: <b>{userType}</b></li>


    const userType = userData ? (userData.accessLevel == 2 ? "Organization user" : (userData.accessLevel == 1 ? "Research user": "Root user")) : null

                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    else if (allValues.editing == true && userType == "Organization user") {
        return (
            <div>
                <div style={{ margin: "auto", height: "500px" }}>
                    <h2 style={{ marginTop: "50px" }}>Account Details</h2>
                    <div className="card" style={{ margin: "0 auto", width: "25rem", marginTop: "25px", borderStyle: "none" }}>
                        <img className="card-img-top" src={Image} alt="Card image cap" style={{ margin: "0 auto", marginTop: "25px", width: "200px", height: "200px" }} />
                        <div className="card-body" style={{ margin: "auto" }}>
                            <h3 style={{ textAlign: "left" }} className="card-title"><b>{userData ? userData.firstname + ' ' + userData.lastname : null}</b></h3>
                        </div>
                    </div>
                    <div className="card" style={{ margin: "0 auto", width: "25rem" }}>
                        <ul className="list-group list-group-flush">

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">Username: </span>
                                </div>
                                <input placeholder={userData.username} className="form-control" id="nameKey" aria-describedby="basic-addon3" />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">Email: </span>
                                </div>
                                <input placeholder={userData.email} className="form-control" id="emailKey" aria-describedby="basic-addon3" />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">Organization: </span>
                                </div>
                                <input placeholder={userData.organization} className="form-control" id="orgKey" aria-describedby="basic-addon3" />
                            </div>

                            

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">User Type: </span>
                                </div>
                                <input placeholder={userType} className="form-control" id="na" aria-describedby="basic-addon3" disabled />
                            </div>

                            <button className="search-button btn btn-primary focus-visible" onClick={submitClick} >Finish Editing</button>

                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                <div style={{ margin: "auto", height: "500px" }}>
                    <h2 style={{ marginTop: "50px" }}>Account Details</h2>
                    <div className="card" style={{ margin: "0 auto", width: "25rem", marginTop: "25px", borderStyle: "none" }}>
                        <img className="card-img-top" src={Image} alt="Card image cap" style={{ margin: "0 auto", marginTop: "25px", width: "200px", height: "200px" }} />
                        <div className="card-body" style={{ margin: "auto" }}>
                            <h3 style={{ textAlign: "left" }} className="card-title"><b>{userData ? userData.firstname + ' ' + userData.lastname : null}</b></h3>
                        </div>
                    </div>
                    <div className="card" style={{ margin: "0 auto", width: "25rem" }}>
                        <ul className="list-group list-group-flush">

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">Username: </span>
                                </div>
                                <input placeholder={userData.username} className="form-control" id="nameKey" aria-describedby="basic-addon3" />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">Email: </span>
                                </div>
                                <input placeholder={userData.email} className="form-control" id="emailKey" aria-describedby="basic-addon3" />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">User Type: </span>
                                </div>
                                <input placeholder={userType} className="form-control" id="na" aria-describedby="basic-addon3" disabled />
                            </div>

                            <button className="search-button btn btn-primary" onClick={submitClick} >Finish Editing</button>



                        </ul>
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
    userAccessError: state.data.userRetrievalError
  };
}

const mapDispatchToProps = (dispatch) => {
	
  	return{
		updateUser: (user) => dispatch(updateUser(user))
	}
  }

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
