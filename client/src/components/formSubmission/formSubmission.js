import React from 'react';
import ReactDOM from 'react-dom';
import './formSubmission.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

class formSubmission extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      internationalBases: [], //Funder International Bases
      operations: [], //Funder Operations
      regions: [], //Initiative Regions
      countries: [], //Initiative Countries
      activities: [], //Initiative Activities (not counting Main Activity)

      //Funder
      fname: null,
      furl: null,
      motive: null,
      organizationForm: null,
      impact: null,
      mEdSub: null,
      edSubs: [],
      orgTraits: [],

      //Initiative
      initName: null,
      initURL: null,
      tWomen: null,
      initStart: null,
      initEnd: null,
      launchCountry: null,
      idescription: null,
      geography: null,
      mainProgramActivity: null,
      programArea: null,
      feeAccess: null,
      targetPopSector: "dummyData",
      outcomesMonitored: "dummyData",
      sourceOfFees: "dummyData",

      //Implementer, I barely know er!
      iname: null,
      impMotive: null,

      //Other
      comments: null


    };

    this.addIBase = this.addIBase.bind(this);
    this.addOpLoc = this.addOpLoc.bind(this);
    this.addInitRegion = this.addInitRegion.bind(this);
    this.addInitCountry = this.addInitCountry.bind(this);
    this.buttonMaker = this.buttonMaker.bind(this);
    this.addProgramActivity = this.addProgramActivity.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.changeEdSub = this.changeEdSub.bind(this);
    this.changeOrgTrait = this.changeOrgTrait.bind(this);
    this.profitMotiveChange = this.profitMotiveChange.bind(this);
    this.organizationChange = this.organizationChange.bind(this);
    this.impactChange = this.impactChange.bind(this);
    this.mEdSubChange = this.mEdSubChange.bind(this);
    this.tWomenChange = this.tWomenChange.bind(this);
    this.geographyChange = this.geographyChange.bind(this);
    this.feeAccessChange = this.feeAccessChange.bind(this);
    this.impMotiveChange = this.impMotiveChange.bind(this);
  }

  buttonMaker(props){
    return <button type="button" onClick={() => {this.removeButton(props)}} ><b>X</b> {props.name}</button>
  }

  removeButton(props){
    if (props.category == "iBase"){
      for (var i = 0; i < this.state.internationalBases.length; i++){ //There is definitely a more efficient solution
        if (this.state.internationalBases[i].key == props.name){
          this.state.internationalBases.splice(i, 1);
          break;
        }
      }
      ReactDOM.render(<ul>{this.state.internationalBases}</ul>, document.getElementById('iBases'))
    }
    else if (props.category == "opLoc"){
      for (var i = 0; i < this.state.operations.length; i++){
        if (this.state.operations[i].key == props.name){
          this.state.operations.splice(i, 1);
          break;
        }
      }
      ReactDOM.render(<ul>{this.state.operations}</ul>, document.getElementById('operationLocations'))
    }
    else if (props.category == "initRegions"){
      for (var i = 0; i < this.state.regions.length; i++){
        if (this.state.regions[i].key == props.name){
          this.state.regions.splice(i, 1);
          break;
        }
      }
      ReactDOM.render(<ul>{this.state.regions}</ul>, document.getElementById('initRegions'))
    }
    else if (props.category == "initActivities"){
      for (var i = 0; i < this.state.activities.length; i++){
        if (this.state.activities[i].key == props.name){
          this.state.activities.splice(i, 1);
          break;
        }
      }
      ReactDOM.render(<ul>{this.state.activities}</ul>, document.getElementById('initActivities'))
    }
    else{
      for (var i = 0; i < this.state.countries.length; i++){
        if (this.state.countries[i].key == props.name){
          this.state.countries.splice(i, 1);
          break;
        }
      }
      ReactDOM.render(<ul>{this.state.countries}</ul>, document.getElementById('initCountries'))
    }
  }



  addIBase(e){
    var base = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.internationalBases.length; i++){ //There is definitely a more efficient solution
      if (this.state.internationalBases[i].key == base){
        present = true;
        break;
      }
    }
    if (!present && base != "baseCase"){
      this.state.internationalBases.push(<this.buttonMaker key={base} name={base} category="iBase"/> )
      console.log(base);
      ReactDOM.render(<ul>{this.state.internationalBases}</ul>, document.getElementById('iBases'))
    }
  }

  addOpLoc(e){
    var country = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.operations.length; i++){ //There is definitely a more efficient solution
      if (this.state.operations[i].key == country){
        present = true;
        break;
      }
    }
    if (!present && country != "baseCase"){
      this.state.operations.push(<this.buttonMaker key={country} name={country} category="opLoc"/>)
      console.log(country);
      ReactDOM.render(<ul>{this.state.operations}</ul>, document.getElementById('operationLocations'))
    }
  }

  addInitRegion(e){
    var region = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.regions.length; i++){ //There is definitely a more efficient solution
      if (this.state.regions[i].key == region){
        present = true;
        break;
      }
    }
    if (!present && region != "baseCase"){
      this.state.regions.push(<this.buttonMaker key={region} name={region} category="initRegions"/>)
      console.log(region);
      ReactDOM.render(<ul>{this.state.regions}</ul>, document.getElementById('initRegions'))
    }
  }

  addInitCountry(e){
    var country = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.countries.length; i++){ //There is definitely a more efficient solution
      if (this.state.countries[i].key == country){
        present = true;
        break;
      }
    }
    if (!present && country != "baseCase"){
      this.state.countries.push(<this.buttonMaker key={country} name={country} category="initCountries"/>)
      console.log(country);
      ReactDOM.render(<ul>{this.state.countries}</ul>, document.getElementById('initCountries'))
    }
  }

  addProgramActivity(e){
    var activity = e.currentTarget.value.slice(1);
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.activities.length; i++){ //There is definitely a more efficient solution
      if (this.state.activities[i].key == activity){
        present = true;
        break;
      }
    }
    if (!present && activity != "baseCase"){
      this.state.activities.push(<this.buttonMaker key={activity} name={activity} category="initActivities"/>)
      console.log(activity);
      ReactDOM.render(<ul>{this.state.activities}</ul>, document.getElementById('initActivities'))
    }
  }

  changeProgramArea(e){
    var activity = e.currentTarget.value;
    var updateArea = "";
    console.log(activity);
    if (activity == "Missing or Unclear"){
      updateArea = "Missing or Unclear";
    }
    else if(activity.charAt(0) == 'a'){
      updateArea = "Access to Education";
    }
    else if(activity.charAt(0) == 's'){
      updateArea = "Skills, Workplace Transition, and Continuing Education";
    }
    else if(activity.charAt(0) == 'e'){
      updateArea = "Education Facilities";
    }
    else if(activity.charAt(0) == 'f'){
      updateArea = "Education Financing";
    }
    else if(activity.charAt(0) == 'g'){
      updateArea = "Educational Governance and School-Based Management";
    }
    else if(activity.charAt(0) == 'p'){
      updateArea = "Private Sector Delivery of Education";
    }
    else if(activity.charAt(0) == 'i'){
      updateArea = "Information and Communications Technology";
    }
    else if(activity.charAt(0) == 'c'){
      updateArea = "Curriculum and Extra-Curricular Support";
    }
    else if(activity.charAt(0) == 's'){
      updateArea = "Student Assessment";
    }
    else if(activity.charAt(0) == 't'){
      updateArea = "Teachers and School Leaderhsip";
    }
    else if(activity.charAt(0) == 'v'){
      updateArea = "Advocacy and Policy";
    }
    else if(activity.charAt(0) == 'o'){
      updateArea = "Other Education";
    }
    else if(activity.charAt(0) == ' '){
      updateArea = "Area Data Missing";
    }
    ReactDOM.render(<p><i>{updateArea}</i></p>, document.getElementById('programArea'))

  }

  changeOrgTrait(e){
    var orgTrait = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.orgTraits.length; i++){ //There is definitely a more efficient solution
      if (this.state.orgTraits[i] == orgTrait){
        present = true;
        this.state.orgTraits.splice(i, 1);
        break;
      }
    }
    if (!present){
      this.state.orgTraits.push(orgTrait)
    }
  }

  changeEdSub(e){
    var edSub = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.edSubs.length; i++){ //There is definitely a more efficient solution
      if (this.state.edSubs[i] == edSub){
        present = true;
        this.state.edSubs.splice(i, 1);
        break;
      }
    }
    if (!present){
      this.state.edSubs.push(edSub)
    }
  }

  profitMotiveChange(e){
    this.state.motive = e.currentTarget.value;
  }

  organizationChange(e){
    this.state.organizationForm = e.currentTarget.value;
  }

  impactChange(e){
    this.state.impact = e.currentTarget.value;
  }

  mEdSubChange(e){
    this.state.mEdSub = e.currentTarget.value;
  }

  tWomenChange(e){
    this.state.tWomen = e.currentTarget.value;
  }

  geographyChange(e){
    this.state.geography = e.currentTarget.value;
  }

  feeAccessChange(e){
    this.state.feeAccess = e.currentTarget.value;
  }

  impMotiveChange(e){
    this.state.impMotive = e.currentTarget.value;
  }

  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }


  render(){
    const {authorized} = this.props;
    if (authorized === false) {
      return <Redirect to='/' />
    }
    return (
        <div className = "formSubmission" style = {{paddingTop: '50px'}}>
            <h3>Form Submission</h3>
            <div>
            <form onSubmit={this.handleFormSubmit}>

            <h4>Funder</h4>

            <p>Name</p>
              <input type="text" id="fname" name="funderName" placeholder="Funder Name" onChange={this.handleChange}/>

            <p>Website</p>
              <input type="text" id="furl" name="funderWebsite" placeholder="funderWebsite.com" onChange={this.handleChange}/>

            <p>Profit Motive</p>
              <input type="radio" id="motive1" name="profitMotive" value="Not-For-Profit" onChange={this.profitMotiveChange}/> <label htmlFor="motive1">Not-For-Profit</label>
              <input type="radio" id="motive2" name="profitMotive" value="Hybrid" onChange={this.profitMotiveChange}/> <label htmlFor="motive2">Hybrid</label>
              <input type="radio" id="motive3" name="profitMotive" value="For-Profit" onChange={this.profitMotiveChange}/> <label htmlFor="motive3">For-Profit</label>
            <br></br><br></br>

            <p>Impact Investing?</p>
              <input type="radio" id="impact1" name="impactInvesting" value="Yes" onChange={this.impactChange}/> <label htmlFor="impact1">Yes</label>
              <input type="radio" id="impact2" name="impactInvesting" value="No" onChange={this.impactChange}/> <label htmlFor="impact2">No</label>
              <input type="radio" id="impact3" name="impactInvesting" value="Unknown" onChange={this.impactChange}/> <label htmlFor="impact3">Unknown</label>
            <br></br><br></br>

            <p>Organizational Form</p>
              <input type="radio" id="organization1" name="organizationalForm" value="Private Foundation" onChange={this.organizationChange}/> <label htmlFor="organization1">Private Foundation</label>
              <input type="radio" id="organization2" name="organizationalForm" value="Impact Investor" onChange={this.organizationChange}/> <label htmlFor="organization2">Impact Investor</label>
            <br></br><br></br>

            <p>International Base(s)</p>
            <select id="internationalBase" name="country" onChange={this.addIBase}>
            <option value="baseCase">Choose the International Base Countries</option>
            <option value="Afganistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antigua & Barbuda">Antigua & Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bonaire">Bonaire</option>
            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
            <option value="Brunei">Brunei</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Canary Islands">Canary Islands</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Channel Islands">Channel Islands</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos Island">Cocos Island</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cote DIvoire">Cote DIvoire</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Curaco">Curacao</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="East Timor">East Timor</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands">Falkland Islands</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Ter">French Southern Ter</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Great Britain">Great Britain</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="Indonesia">Indonesia</option>
            <option value="India">India</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Isle of Man">Isle of Man</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Korea North">Korea North</option>
            <option value="Korea Sout">Korea South</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Laos">Laos</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macau">Macau</option>
            <option value="Macedonia">Macedonia</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Malawi">Malawi</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Midway Islands">Midway Islands</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Nambia">Nambia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherland Antilles">Netherland Antilles</option>
            <option value="Netherlands">Netherlands (Holland, Europe)</option>
            <option value="Nevis">Nevis</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau Island">Palau Island</option>
            <option value="Palestine">Palestine</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Phillipines">Philippines</option>
            <option value="Pitcairn Island">Pitcairn Island</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Republic of Montenegro">Republic of Montenegro</option>
            <option value="Republic of Serbia">Republic of Serbia</option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russia</option>
            <option value="Rwanda">Rwanda</option>
            <option value="St Barthelemy">St Barthelemy</option>
            <option value="St Eustatius">St Eustatius</option>
            <option value="St Helena">St Helena</option>
            <option value="St Kitts-Nevis">St Kitts-Nevis</option>
            <option value="St Lucia">St Lucia</option>
            <option value="St Maarten">St Maarten</option>
            <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
            <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
            <option value="Saipan">Saipan</option>
            <option value="Samoa">Samoa</option>
            <option value="Samoa American">Samoa American</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome & Principe">Sao Tome & Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syria">Syria</option>
            <option value="Tahiti">Tahiti</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad & Tobago">Trinidad & Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks & Caicos Is">Turks & Caicos Is</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Erimates">United Arab Emirates</option>
            <option value="United States of America">United States of America</option>
            <option value="Uraguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City State">Vatican City State</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
            <option value="Wake Island">Wake Island</option>
            <option value="Wallis & Futana Is">Wallis & Futana Is</option>
            <option value="Yemen">Yemen</option>
            <option value="Zaire">Zaire</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
            </select>

            <div id="iBases"></div>


            <p>Operation(s)</p>
            <select id="operations" name="opCountry" onChange={this.addOpLoc}>
            <option value="baseCase">Choose the Countries of Operation</option>
            <option value="Afganistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antigua & Barbuda">Antigua & Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bonaire">Bonaire</option>
            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
            <option value="Brunei">Brunei</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Canary Islands">Canary Islands</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Channel Islands">Channel Islands</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos Island">Cocos Island</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cote DIvoire">Cote DIvoire</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Curaco">Curacao</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="East Timor">East Timor</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands">Falkland Islands</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Ter">French Southern Ter</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Great Britain">Great Britain</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="Indonesia">Indonesia</option>
            <option value="India">India</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Isle of Man">Isle of Man</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Korea North">Korea North</option>
            <option value="Korea Sout">Korea South</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Laos">Laos</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macau">Macau</option>
            <option value="Macedonia">Macedonia</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Malawi">Malawi</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Midway Islands">Midway Islands</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Nambia">Nambia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherland Antilles">Netherland Antilles</option>
            <option value="Netherlands">Netherlands (Holland, Europe)</option>
            <option value="Nevis">Nevis</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau Island">Palau Island</option>
            <option value="Palestine">Palestine</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Phillipines">Philippines</option>
            <option value="Pitcairn Island">Pitcairn Island</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Republic of Montenegro">Republic of Montenegro</option>
            <option value="Republic of Serbia">Republic of Serbia</option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russia</option>
            <option value="Rwanda">Rwanda</option>
            <option value="St Barthelemy">St Barthelemy</option>
            <option value="St Eustatius">St Eustatius</option>
            <option value="St Helena">St Helena</option>
            <option value="St Kitts-Nevis">St Kitts-Nevis</option>
            <option value="St Lucia">St Lucia</option>
            <option value="St Maarten">St Maarten</option>
            <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
            <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
            <option value="Saipan">Saipan</option>
            <option value="Samoa">Samoa</option>
            <option value="Samoa American">Samoa American</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome & Principe">Sao Tome & Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syria">Syria</option>
            <option value="Tahiti">Tahiti</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad & Tobago">Trinidad & Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks & Caicos Is">Turks & Caicos Is</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Erimates">United Arab Emirates</option>
            <option value="United States of America">United States of America</option>
            <option value="Uraguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City State">Vatican City State</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
            <option value="Wake Island">Wake Island</option>
            <option value="Wallis & Futana Is">Wallis & Futana Is</option>
            <option value="Yemen">Yemen</option>
            <option value="Zaire">Zaire</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
            </select>

            <div id="operationLocations"></div>

            <p>Main Education Subsector</p>
              <input type="radio" id="mEdSub1" name="mainEducationSubsector" value="Adult" onChange={this.mEdSubChange}/> <label htmlFor="mEdSub1">Adult</label>
              <input type="radio" id="mEdSub2" name="mainEducationSubsector" value="Basic and Continuing Education" onChange={this.mEdSubChange}/> <label htmlFor="mEdSub2">Basic and Continuing Education</label>

            <p>Education Subsector(s)<br></br>Select all that apply:</p>
              <input type="checkbox" id="edSub1" name="educationSubsector" value="Early Childhood Education" onChange={this.changeEdSub}/> <label htmlFor="edSub1" className="checkbox">Early Childhood Education</label>
              <input type="checkbox" id="edSub2" name="educationSubsector" value="Primary Education" onChange={this.changeEdSub}/> <label htmlFor="edSub2" className="checkbox">Primary Education</label>
              <input type="checkbox" id="edSub3" name="educationSubsector" value="Secondary Education" onChange={this.changeEdSub}/> <label htmlFor="edSub3" className="checkbox">Secondary Education</label>
              <input type="checkbox" id="edSub4" name="educationSubsector" value="Tertiary Education" onChange={this.changeEdSub}/> <label htmlFor="edSub4" className="checkbox">Tertiary Education</label>
              <input type="checkbox" id="edSub5" name="educationSubsector" value="Adult Basic and Continuing Education" onChange={this.changeEdSub}/> <label htmlFor="edSub5" className="checkbox">Adult Basic and Continuing Education</label>
            
            <p>Organizational Trait(s)<br></br>Select all that apply:</p>
              <input type="checkbox" id="orgTrait1" name="organizationalTrait" value="Led by independent board of trustees or CEO" onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait1" className="checkbox">Led by Independent Board of Trustees or CEO</label>
              <input type="checkbox" id="orgTrait2" name="organizationalTrait" value="Aim to address issues of common good" onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait2" className="checkbox">Aim to address issues of common good</label>
              <input type="checkbox" id="orgTrait3" name="organizationalTrait" value="Not-for-profit oriented" onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait3" className="checkbox">Not-for-profit oriented</label>
              <input type="checkbox" id="orgTrait4" name="organizationalTrait" value="Use own financial resources" onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait4" className="checkbox">Use own financial resources</label>
              <input type="checkbox" id="orgTrait5" name="organizationalTrait" value="Commitment to measurement" onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait5" className="checkbox">Commitment to measurement</label>
              <input type="checkbox" id="orgTrait6" name="organizationalTrait" value="Explicit intention to have social impact in the education sector" onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait6" className="checkbox">Explicit intention to have social impact in the education sector</label>
              <input type="checkbox" id="orgTrait7" name="organizationalTrait" value="Expects return on investment" onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait7" className="checkbox">Expects return on investment</label>
              <input type="checkbox" id="orgTrait8" name="organizationalTrait" value="Not part of the public sector" onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait8" className="checkbox">Not part of the public sector</label>
              
            <h4>Initiative</h4>

            <p>Name</p>
              <input type="text" id="initName" name="initiativeName" placeholder="Initiative Name" onChange={this.handleChange}/>

            <p>Website</p>
              <input type="text" id="initURL" name="initiativeWebsite" placeholder="initiativeWebsite.com" onChange={this.handleChange}/>

            <p>Targets Women?</p>
              <input type="radio" id="tWomen1" name="targetsWomen" value="Yes" onChange={this.tWomenChange}/> <label htmlFor="tWomen1">Yes</label>
              <input type="radio" id="tWomen2" name="targetsWomen" value="No" onChange={this.tWomenChange}/> <label htmlFor="tWomen2">No</label>

            <p>Start Year</p>
              <input type="number" id="initStart" name="startYear" placeholder="Start Year" onChange={this.handleChange}/>

            <p>End Year</p>
              <input type="number" id="initEnd" name="endYear" placeholder="End Year" onChange={this.handleChange}/>

            <p>Launch Country</p>
            <select id="launchCountry" name="launchCountry" onChange={this.handleChange}>
            <option value="baseCase">Choose a Country</option>
            <option value="Afganistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antigua & Barbuda">Antigua & Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bonaire">Bonaire</option>
            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
            <option value="Brunei">Brunei</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Canary Islands">Canary Islands</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Channel Islands">Channel Islands</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos Island">Cocos Island</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cote DIvoire">Cote DIvoire</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Curaco">Curacao</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="East Timor">East Timor</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands">Falkland Islands</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Ter">French Southern Ter</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Great Britain">Great Britain</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="Indonesia">Indonesia</option>
            <option value="India">India</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Isle of Man">Isle of Man</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Korea North">Korea North</option>
            <option value="Korea Sout">Korea South</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Laos">Laos</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macau">Macau</option>
            <option value="Macedonia">Macedonia</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Malawi">Malawi</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Midway Islands">Midway Islands</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Nambia">Nambia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherland Antilles">Netherland Antilles</option>
            <option value="Netherlands">Netherlands (Holland, Europe)</option>
            <option value="Nevis">Nevis</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau Island">Palau Island</option>
            <option value="Palestine">Palestine</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Phillipines">Philippines</option>
            <option value="Pitcairn Island">Pitcairn Island</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Republic of Montenegro">Republic of Montenegro</option>
            <option value="Republic of Serbia">Republic of Serbia</option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russia</option>
            <option value="Rwanda">Rwanda</option>
            <option value="St Barthelemy">St Barthelemy</option>
            <option value="St Eustatius">St Eustatius</option>
            <option value="St Helena">St Helena</option>
            <option value="St Kitts-Nevis">St Kitts-Nevis</option>
            <option value="St Lucia">St Lucia</option>
            <option value="St Maarten">St Maarten</option>
            <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
            <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
            <option value="Saipan">Saipan</option>
            <option value="Samoa">Samoa</option>
            <option value="Samoa American">Samoa American</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome & Principe">Sao Tome & Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syria">Syria</option>
            <option value="Tahiti">Tahiti</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad & Tobago">Trinidad & Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks & Caicos Is">Turks & Caicos Is</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Erimates">United Arab Emirates</option>
            <option value="United States of America">United States of America</option>
            <option value="Uraguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City State">Vatican City State</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
            <option value="Wake Island">Wake Island</option>
            <option value="Wallis & Futana Is">Wallis & Futana Is</option>
            <option value="Yemen">Yemen</option>
            <option value="Zaire">Zaire</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
            </select>

            <p>Description</p>
              <textarea id="idescription" name="description" placeholder="Write a description" onChange={this.handleChange}></textarea>

            <p>Region(s)</p>
            <select id="region" name="regions" onChange={this.addInitRegion}>
            <option value="base">Choose a Region of the World</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Central America">Central America</option>
            <option value="Eastern Europe">Eastern Europe</option>
            <option value="European Union">European Union</option>
            <option value="Middle East">Middle East</option>
            <option value="North America">North America</option>
            <option value="Oceania">Oceania</option>
            <option value="South America">South America</option>
            <option value="The Caribbean">The Caribbean</option>
            </select>

            <div id="initRegions"></div>

            <p>Countries</p>
            <select id="initCountry" name="initiativeCountry" onChange={this.addInitCountry}>
            <option value="baseCase">Choose a Country</option>
            <option value="Afganistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antigua & Barbuda">Antigua & Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bonaire">Bonaire</option>
            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
            <option value="Brunei">Brunei</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Canary Islands">Canary Islands</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Channel Islands">Channel Islands</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos Island">Cocos Island</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cote DIvoire">Cote DIvoire</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Curaco">Curacao</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="East Timor">East Timor</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands">Falkland Islands</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Ter">French Southern Ter</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Great Britain">Great Britain</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="Indonesia">Indonesia</option>
            <option value="India">India</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Isle of Man">Isle of Man</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Korea North">Korea North</option>
            <option value="Korea Sout">Korea South</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Laos">Laos</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macau">Macau</option>
            <option value="Macedonia">Macedonia</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Malawi">Malawi</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Midway Islands">Midway Islands</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Nambia">Nambia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherland Antilles">Netherland Antilles</option>
            <option value="Netherlands">Netherlands (Holland, Europe)</option>
            <option value="Nevis">Nevis</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau Island">Palau Island</option>
            <option value="Palestine">Palestine</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Phillipines">Philippines</option>
            <option value="Pitcairn Island">Pitcairn Island</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Republic of Montenegro">Republic of Montenegro</option>
            <option value="Republic of Serbia">Republic of Serbia</option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russia</option>
            <option value="Rwanda">Rwanda</option>
            <option value="St Barthelemy">St Barthelemy</option>
            <option value="St Eustatius">St Eustatius</option>
            <option value="St Helena">St Helena</option>
            <option value="St Kitts-Nevis">St Kitts-Nevis</option>
            <option value="St Lucia">St Lucia</option>
            <option value="St Maarten">St Maarten</option>
            <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
            <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
            <option value="Saipan">Saipan</option>
            <option value="Samoa">Samoa</option>
            <option value="Samoa American">Samoa American</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome & Principe">Sao Tome & Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syria">Syria</option>
            <option value="Tahiti">Tahiti</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad & Tobago">Trinidad & Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks & Caicos Is">Turks & Caicos Is</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Erimates">United Arab Emirates</option>
            <option value="United States of America">United States of America</option>
            <option value="Uraguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City State">Vatican City State</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
            <option value="Wake Island">Wake Island</option>
            <option value="Wallis & Futana Is">Wallis & Futana Is</option>
            <option value="Yemen">Yemen</option>
            <option value="Zaire">Zaire</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
            </select>

            <div id="initCountries"></div>

            <p>Target Geography</p>
              <input type="radio" id="geography1" name="targetGeo" value="Urban" onChange={this.geographyChange}/> <label htmlFor="geography1">Urban</label>
              <input type="radio" id="geography2" name="targetGeo" value="Peri-Urban" onChange={this.geographyChange}/> <label htmlFor="geography2">Peri-Urban</label>
              <input type="radio" id="geography3" name="targetGeo" value="Rural" onChange={this.geographyChange}/> <label htmlFor="geography3">Rural</label>
              <input type="radio" id="geography4" name="targetGeo" value="Online" onChange={this.geographyChange}/> <label htmlFor="geography4">Online Community</label>
              <input type="radio" id="geography5" name="targetGeo" value="Unknown" onChange={this.geographyChange}/> <label htmlFor="geography5">Unknown</label>

            <p>Main Program Activity</p>
            <select id="mainProgramActivity" name="activity" onChange={this.changeProgramArea}>
            <option value="Missing or Unclear">Choose the Main Program Activity</option>
            <option value="aTransitional Support">Transitional Support</option>
            <option value="aIncreasing or Sustaining Enrollment">Increasing or Sustaining Enrollment</option>
            <option value="aSchool Feeding Programs and Other Non-Financial Targeted Incentives">School Feeding Programs and Other Non-Financial Targeted Incentives</option>
            <option value="aPrograms to improve access and equity in education">Programs to improve access and equity in education</option>
            <option value="sAdult literacy and numeracy programs">Adult literacy and numeracy programs</option>
            <option value="eSchool Infrastructure and equipment">School Infrastructure and equipment</option>
            <option value="eSchool rehabilitation and construction">School rehabilitation and construction</option>
            <option value="eCommunity resources towards education facilities">Community resources towards education facilities</option>
            <option value="fVouchers and conditional cash transfers">Vouchers and conditional cash transfers</option>
            <option value="fScholarships and financial aid">Scholarships and financial aid</option>
            <option value="fStudent/household loans">Student/household loans</option>
            <option value="fContracting">Contracting</option>
            <option value="fSchool loans">School loans</option>
            <option value="fPay-for-performance">Pay-for-performance</option>
            <option value="fOther financial targeted incentives for attendance">Other financial targeted incentives for attendance</option>
            <option value="gParental or community engagement for school accountability">Parental or community engagement for school accountability</option>
            <option value="gSchool operations or management">School operations or management</option>
            <option value="gSchool assessment/rating systems">School assessment/rating systems</option>
            <option value="gCapacity development programs or services for education administration or bureaucracy">Capacity development programs or services for education administration or bureaucracy</option>
            <option value="gEMIS/Data systems">EMIS/Data systems</option>
            <option value="pFranchise of schools/centers">Franchise of schools/centers</option>
            <option value="pChain of schools/centers">Chain of schools/centers</option>
            <option value="pNetwork of schools/centers">Network of schools/centers</option>
            <option value="pMobile schools/centers">Mobile schools/centers</option>
            <option value="pOnline school/center">Online school/center</option>
            <option value="pStand-alone school/center">Stand-alone school/center</option>
            <option value="iOnline learning portals">Online learning portals</option>
            <option value="iComputer-assisted instruction/learning programs/products">Computer-assisted instruction/learning programs/products</option>
            <option value="iComputers and tablets/computing skills focus">Computers and tablets/computing skills focus</option>
            <option value="iSchool WiFi/broadband initiatives">School WiFi/broadband initiatives</option>
            <option value="iDigital classrooms">Digital classrooms</option>
            <option value="iMOOC instruction">MOOC instruction</option>
            <option value="iScience technology and innovation (STI) activities including research and development (R&D), training knowledge workers/ technology acquisition and diffusion/ STI grants">Science technology and innovation (STI) activities including research and development (R&D), training knowledge workers/ technology acquisition and diffusion/ STI grants</option>
            <option value="cStandardized teaching materials">Standardized teaching materials</option>
            <option value="cNon-traditional schedules">Non-traditional schedules</option>
            <option value="cExtra-curricular activities">Extra-curricular activities</option>
            <option value="cLearning materials for students">Learning materials for students</option>
            <option value="cTextbooks/books">Textbooks/books</option>
            <option value="cSTEM materials/focus/program">STEM materials/focus/program</option>
            <option value="cEnglish/language materials">English/language materials</option>
            <option value="cMaths materials">Maths materials</option>
            <option value="sStudent assessment and progress">Student assessment and progress</option>
            <option value="sExam preparation">Exam preparation</option>
            <option value="sTutoring/private tuition (includes tutoring chains/centres)">Tutoring/private tuition (includes tutoring chains/centres)</option>
            <option value="sParental or community engagement in support of students">Parental or community engagement in support of students</option>
            <option value="sMentorship programs">Mentorship programs</option>
            <option value="tTeacher training">Teacher training</option>
            <option value="tSchool leader/principals training">School leader/principals training</option>
            <option value="tTeacher/leader evaluation capacity development and mentorship programs">Teacher/leader evaluation capacity development and mentorship programs</option>
            <option value="tTeacher recruitment/ deployment/ in-service training programs">Teacher recruitment/ deployment/ in-service training programs</option>
            <option value="wMentorship/ internship/ job placement">Mentorship/ internship/ job placement</option>
            <option value="wEmployment skills programs">Employment skills programs</option>
            <option value="wEntrepreneurship and business skills programs">Entrepreneurship and business skills programs</option>
            <option value="vLinking research and evidence with policy or implementation">Linking research and evidence with policy or implementation</option>
            <option value="vAdvocacy campaigns/ initiatives/ movements">Advocacy campaigns/ initiatives/ movements</option>
            <option value="vRegulatory analysis">Regulatory analysis</option>
            <option value="vKnowledge production/mobilization">Knowledge production/mobilization</option>
            <option value="vEducation sector research studies/ surveys/ assessments">Education sector research studies/ surveys/ assessments</option>
            <option value="wLife skills and personal finance training">Life skills and personal finance training</option>
            <option value="wContinuing education programs offered for adults">Continuing education programs offered for adults</option>
            <option value=" Private Sector Delivery of Education">Private Sector Delivery of Education</option>
            <option value=" vocational training">vocational training</option>
            <option value="vCapacity building at the system level">Capacity building at the system level</option>
            <option value="oNon-formal education youth">Non-formal education youth</option>
            <option value="aCurriculum and Extra-Curricular Support">Curriculum and Extra-Curricular Support</option>
            <option value="aPrograms targeting girls/women">Programs targeting girls/women</option>
            <option value="aPrograms targeting special needs or people with disabilities">Programs targeting special needs or people with disabilities</option>
            <option value="aPrograms targeting other marginalized groups">Programs targeting other marginalized groups</option>
            <option value="aPrograms targeting tribal or indigenous groups">Programs targeting tribal or indigenous groups</option>
            <option value="pNGO Schools">NGO Schools</option>
            <option value="sRegulatory analysis focused on government policy">Regulatory analysis focused on government policy</option>
            <option value="sRegulatory analysis focused on school policy">Regulatory analysis focused on school policy</option>
            <option value="sSchool quality improvement">School quality improvement</option>
            <option value="pFormal public-private partnership">Formal public-private partnership</option>
            <option value=" Education finance (system-level)">Education finance (system-level)</option>
            <option value=" school finance">school finance</option>
            <option value="wProfessional certification/skills">Professional certification/skills</option>
            <option value="wShort-term technical/vocational course">Short-term technical/vocational course</option>
            <option value="wLonger-term technical/vocational course">Longer-term technical/vocational course</option>
            <option value="pPrivate schools">Private schools</option>
            <option value=" Capacity Building of Non-Education Professionals">Capacity Building of Non-Education Professionals</option>
            <option value=" Enrichment/New Pedagogical or Curricular Programs">Enrichment/New Pedagogical or Curricular Programs</option>
            <option value=" Academic research/academic exchange">Academic research/academic exchange</option>
            </select>

            <p>Program Area</p>
            <div id="programArea"></div>
            <br></br>

            <p>Other Programming Activities</p>
            <select id="programActivity" name="activity" onChange={this.addProgramActivity}>
            <option value="Missing or Unclear">Choose the Main Program Activity</option>
            <option value="aTransitional Support">Transitional Support</option>
            <option value="aIncreasing or Sustaining Enrollment">Increasing or Sustaining Enrollment</option>
            <option value="aSchool Feeding Programs and Other Non-Financial Targeted Incentives">School Feeding Programs and Other Non-Financial Targeted Incentives</option>
            <option value="aPrograms to improve access and equity in education">Programs to improve access and equity in education</option>
            <option value="sAdult literacy and numeracy programs">Adult literacy and numeracy programs</option>
            <option value="eSchool Infrastructure and equipment">School Infrastructure and equipment</option>
            <option value="eSchool rehabilitation and construction">School rehabilitation and construction</option>
            <option value="eCommunity resources towards education facilities">Community resources towards education facilities</option>
            <option value="fVouchers and conditional cash transfers">Vouchers and conditional cash transfers</option>
            <option value="fScholarships and financial aid">Scholarships and financial aid</option>
            <option value="fStudent/household loans">Student/household loans</option>
            <option value="fContracting">Contracting</option>
            <option value="fSchool loans">School loans</option>
            <option value="fPay-for-performance">Pay-for-performance</option>
            <option value="fOther financial targeted incentives for attendance">Other financial targeted incentives for attendance</option>
            <option value="gParental or community engagement for school accountability">Parental or community engagement for school accountability</option>
            <option value="gSchool operations or management">School operations or management</option>
            <option value="gSchool assessment/rating systems">School assessment/rating systems</option>
            <option value="gCapacity development programs or services for education administration or bureaucracy">Capacity development programs or services for education administration or bureaucracy</option>
            <option value="gEMIS/Data systems">EMIS/Data systems</option>
            <option value="pFranchise of schools/centers">Franchise of schools/centers</option>
            <option value="pChain of schools/centers">Chain of schools/centers</option>
            <option value="pNetwork of schools/centers">Network of schools/centers</option>
            <option value="pMobile schools/centers">Mobile schools/centers</option>
            <option value="pOnline school/center">Online school/center</option>
            <option value="pStand-alone school/center">Stand-alone school/center</option>
            <option value="iOnline learning portals">Online learning portals</option>
            <option value="iComputer-assisted instruction/learning programs/products">Computer-assisted instruction/learning programs/products</option>
            <option value="iComputers and tablets/computing skills focus">Computers and tablets/computing skills focus</option>
            <option value="iSchool WiFi/broadband initiatives">School WiFi/broadband initiatives</option>
            <option value="iDigital classrooms">Digital classrooms</option>
            <option value="iMOOC instruction">MOOC instruction</option>
            <option value="iScience technology and innovation (STI) activities including research and development (R&D), training knowledge workers/ technology acquisition and diffusion/ STI grants">Science technology and innovation (STI) activities including research and development (R&D), training knowledge workers/ technology acquisition and diffusion/ STI grants</option>
            <option value="cStandardized teaching materials">Standardized teaching materials</option>
            <option value="cNon-traditional schedules">Non-traditional schedules</option>
            <option value="cExtra-curricular activities">Extra-curricular activities</option>
            <option value="cLearning materials for students">Learning materials for students</option>
            <option value="cTextbooks/books">Textbooks/books</option>
            <option value="cSTEM materials/focus/program">STEM materials/focus/program</option>
            <option value="cEnglish/language materials">English/language materials</option>
            <option value="cMaths materials">Maths materials</option>
            <option value="sStudent assessment and progress">Student assessment and progress</option>
            <option value="sExam preparation">Exam preparation</option>
            <option value="sTutoring/private tuition (includes tutoring chains/centres)">Tutoring/private tuition (includes tutoring chains/centres)</option>
            <option value="sParental or community engagement in support of students">Parental or community engagement in support of students</option>
            <option value="sMentorship programs">Mentorship programs</option>
            <option value="tTeacher training">Teacher training</option>
            <option value="tSchool leader/principals training">School leader/principals training</option>
            <option value="tTeacher/leader evaluation capacity development and mentorship programs">Teacher/leader evaluation capacity development and mentorship programs</option>
            <option value="tTeacher recruitment/ deployment/ in-service training programs">Teacher recruitment/ deployment/ in-service training programs</option>
            <option value="wMentorship/ internship/ job placement">Mentorship/ internship/ job placement</option>
            <option value="wEmployment skills programs">Employment skills programs</option>
            <option value="wEntrepreneurship and business skills programs">Entrepreneurship and business skills programs</option>
            <option value="vLinking research and evidence with policy or implementation">Linking research and evidence with policy or implementation</option>
            <option value="vAdvocacy campaigns/ initiatives/ movements">Advocacy campaigns/ initiatives/ movements</option>
            <option value="vRegulatory analysis">Regulatory analysis</option>
            <option value="vKnowledge production/mobilization">Knowledge production/mobilization</option>
            <option value="vEducation sector research studies/ surveys/ assessments">Education sector research studies/ surveys/ assessments</option>
            <option value="wLife skills and personal finance training">Life skills and personal finance training</option>
            <option value="wContinuing education programs offered for adults">Continuing education programs offered for adults</option>
            <option value=" Private Sector Delivery of Education">Private Sector Delivery of Education</option>
            <option value=" vocational training">vocational training</option>
            <option value="vCapacity building at the system level">Capacity building at the system level</option>
            <option value="oNon-formal education youth">Non-formal education youth</option>
            <option value="aCurriculum and Extra-Curricular Support">Curriculum and Extra-Curricular Support</option>
            <option value="aPrograms targeting girls/women">Programs targeting girls/women</option>
            <option value="aPrograms targeting special needs or people with disabilities">Programs targeting special needs or people with disabilities</option>
            <option value="aPrograms targeting other marginalized groups">Programs targeting other marginalized groups</option>
            <option value="aPrograms targeting tribal or indigenous groups">Programs targeting tribal or indigenous groups</option>
            <option value="pNGO Schools">NGO Schools</option>
            <option value="sRegulatory analysis focused on government policy">Regulatory analysis focused on government policy</option>
            <option value="sRegulatory analysis focused on school policy">Regulatory analysis focused on school policy</option>
            <option value="sSchool quality improvement">School quality improvement</option>
            <option value="pFormal public-private partnership">Formal public-private partnership</option>
            <option value=" Education finance (system-level)">Education finance (system-level)</option>
            <option value=" school finance">school finance</option>
            <option value="wProfessional certification/skills">Professional certification/skills</option>
            <option value="wShort-term technical/vocational course">Short-term technical/vocational course</option>
            <option value="wLonger-term technical/vocational course">Longer-term technical/vocational course</option>
            <option value="pPrivate schools">Private schools</option>
            <option value=" Capacity Building of Non-Education Professionals">Capacity Building of Non-Education Professionals</option>
            <option value=" Enrichment/New Pedagogical or Curricular Programs">Enrichment/New Pedagogical or Curricular Programs</option>
            <option value=" Academic research/academic exchange">Academic research/academic exchange</option>
            </select>
            
            <div id="initActivities"></div>

            <p>Fee to Access?</p>
              <input type="radio" id="feeAccess1" name="feeToAccess" value="Yes" onChange={this.feeAccessChange}/> <label htmlFor="feeAccess1">Yes</label>
              <input type="radio" id="feeAccess2" name="feeToAccess" value="No" onChange={this.feeAccessChange}/> <label htmlFor="feeAccess2">No</label>

            

            <h4>Implementer</h4>

            <p>Name</p>
              <input type="text" id="iname" name="implementerName" placeholder="Implementer Name" onChange={this.handleChange}/>

            <p>Profit Motive</p>
              <input type="radio" id="impMotive1" name="impProfitMotive" value="Not-For-Profit" onChange={this.impMotiveChange}/> <label htmlFor="impMotive1">Not-For-Profit</label>
              <input type="radio" id="impMotive2" name="impProfitMotive" value="Hybrid" onChange={this.impMotiveChange}/> <label htmlFor="impMotive2">Hybrid</label>
              <input type="radio" id="impMotive3" name="impProfitMotive" value="For-Profit" onChange={this.impMotiveChange}/> <label htmlFor="impMotive3">For-Profit</label>
            <br></br><br></br>

            <h4>Comments about Submission</h4>
              <textarea id="comments" name="comment" maxLength ="10000" placeholder="Write any comments you have about this form" onChange={this.handleChange}></textarea>
              <p>(10,000 character limit)</p>
            <br></br><br></br>


            <input type="submit"value="Submit"/>
            </form>
            </div>
        </div>
    );
  }
}

/*function multiSelectIBases(){
  var newBase = document.getElementById("internationalBase").value;
  if (selectedBases.findIndex(newBase) == -1){
    if (newBase != "base"){
      selectedBases.push(newBase);
      document.getElementById("selectedBases").innerHTML += <button onclick
    }
  }
}

function createButton(value){
  var someHTML = <button onclick="removeBase()">var value</button>;
  return(
    <button onclick="removeBase()">value</button>
  )
}

Comment Storage: since you can't make HTML comments :(
              <p>Tag Number</p>
              <input type="number" id="initTag" name="initiativeTag" placeholder="Tag Number"/>



*/


const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth
  };
}

export default connect(mapStateToProps)(formSubmission)
