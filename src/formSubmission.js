import React from 'react';
import logo from './logo.svg';
import './formSubmission.css';

function formSubmission() {
    return (
        <div className = "formSubmission">
            <h3>Form Submission</h3>
            <div>
            <form action="/action_page.php">

            <h4>Funder</h4>

            <p>Name</p>
              <input type="text" id="fname" name="funderName" placeholder="Funder Name..."/>

            <p>Website</p>
              <input type="text" id="furl" name="funderWebsite" placeholder="funderWebsite.com..."/>

            <p>Profit Motive</p>
              <input type="radio" id="motive1" name="profitMotive" value="Not-For-Profit"/> <label for="motive1">Not-For-Profit</label>
              <input type="radio" id="motive2" name="profitMotive" value="Hybrid"/> <label for="motive2">Hybrid</label>
              <input type="radio" id="motive3" name="profitMotive" value="For-Profit"/> <label for="motive3">For-Profit</label>
            <br></br><br></br>

            <p>Impact Investing?</p>
              <input type="radio" id="impact1" name="impactInvesting" value="Yes"/> <label for="impact1">Yes</label>
              <input type="radio" id="impact2" name="impactInvesting" value="No"/> <label for="impact2">No</label>
              <input type="radio" id="impact3" name="impactInvesting" value="Unknown"/> <label for="impact3">Unknown</label>
            <br></br><br></br>

            <p>Organizational Form</p>
              <input type="radio" id="organization1" name="organizationalForm" value="Private Foundation"/> <label for="organization1">Private Foundation</label>
              <input type="radio" id="organization2" name="organizationalForm" value="Impact Investor"/> <label for="organization2">Impact Investor</label>
            <br></br><br></br>
            
            <p>International Base</p>

            <p>Operation</p>

            <p>Education Subsector(s)</p>

            <h4>Initiative</h4>

            <p>Tag Number</p>

            <p>Name</p>
              <input type="text" id="initname" name="initiativeName" placeholder="Initiative Name..."/>

            <p>Website</p>
              <input type="text" id="initurl" name="initiativeWebsite" placeholder="initiativeWebsite.com..."/>

            <p>Targets Women?</p>
              <input type="radio" id="twomen1" name="targetsWomen" value="Yes"/> <label for="twomen1">Yes</label>
              <input type="radio" id="twomen2" name="targetsWomen" value="No"/> <label for="twomen2">No</label>

            <p>Start Year</p>

            <p>End Year</p>

            <p>Launch Country</p>

            <p>Description</p>
              <textarea id="idescription" name="description" placeholder="Write a description..."></textarea>

            <p>Regions</p>

            <p>Countries</p>

            <h4>Implementer</h4>

            <p>Name</p>
              <input type="text" id="iname" name="implementerName" placeholder="Implementer Name..."/>

            <p>Profit Motive</p>
              <input type="radio" id="impMotive1" name="impProfitMotive" value="Not-For-Profit"/> <label for="impMotive1">Not-For-Profit</label>
              <input type="radio" id="impMotive2" name="impProfitMotive" value="Hybrid"/> <label for="impMotive2">Hybrid</label>
              <input type="radio" id="impMotive3" name="impProfitMotive" value="For-Profit"/> <label for="impMotive3">For-Profit</label>
            <br></br><br></br>
            <br></br><br></br>


            <input type="submit"value="Submit"/>
            </form>
            </div>
        </div>
        
    );
}


export default formSubmission;
