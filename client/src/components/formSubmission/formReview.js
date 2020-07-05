import React from 'react';
import ReactDOM from 'react-dom';
import './formReview.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {reviewForm} from '../../store/actions/dataActions'

class formReview extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      //Original values
      tagNum: null,
      originalFunderName: null,
      originalImplementerName: null,

      internationalBases: [], //Funder International Bases
      regions: [], //Initiative Regions
      countries: [], //Initiative Countries
      activities: [], //Initiative Activities (not counting Main Activity)
      sourceOfFees: [], //Initiative Source of Fees

      //Funder
      fname: null,
      furl: null,
      motive: null,
      organizationForm: null,
      impact: null,
      edSubs: [],
      orgTraits: [],
      asiaIBases: [],
      asiaOperations: [],

      //Initiative
      initName: null,
      initURL: null,
      tWomen: null,
      initStart: null,
      initEnd: null,
      launchCountries: [],
      idescription: null,
      targetGeos: [],
      mainProgramActivity: '', //This isnt being set
      programArea: '',
      feeAccess: null,
      targetPopulationSectors: [], //
      outcomesMonitored: [], //
      mEdSubs: [],
      oEdSubs: [],
      managementTypes: [],

      //Implementer
      iname: null,
      impMotive: null,

      //Other
      comments: null,

      //Reviews
      needsReview: null,
      //Section Reviews
      originalReviews: {
        fnameA: null,
        furlA: null,
        motiveA: null,
        impactA: null,
        organizationFormA: null,
        // multi val funder
        internationalBasesA: null,
        edSubsA: null,
        orgTraitsA: null,
        asialBasesA: null,
        asiaOperationsA: null,
        // single val initiative
        initNameA: null,
        initURLA: null,
        tWomenA: null,
        initStartA: null,
        initEndA: null,
        idescriptionA: null,
        programAreaA: null,
        initiativeMainProgramActivityA: null,
        feeAccessA: null,
        // multi val initiative
        regionsA: null,
        countriesA: null,
        activitiesA: null,
        sourceOfFeesA: null,
        launchCountryA: null,
        targetGeosA: null,
        targetPopulationSectorsA: null,
        outcomesMonitoredA: null,
        mEdSubsA: null,
        oEdSubsA: null,
        managementTypesA: null,
        // single val implementer
        inameA: null,
        impMotiveA: null
      },
      reviews: {
        fnameA: null,
        furlA: null,
        motiveA: null,
        impactA: null,
        organizationFormA: null,
        // multi val funder
        internationalBasesA: null,
        edSubsA: null,
        orgTraitsA: null,
        asialBasesA: null,
        asiaOperationsA: null,
        // single val initiative
        initNameA: null,
        initURLA: null,
        tWomenA: null,
        initStartA: null,
        initEndA: null,
        idescriptionA: null,
        programAreaA: null,
        initiativeMainProgramActivityA: null,
        feeAccessA: null,
        // multi val initiative
        regionsA: null,
        countriesA: null,
        activitiesA: null,
        sourceOfFeesA: null,
        launchCountryA: null,
        targetGeosA: null,
        targetPopulationSectorsA: null,
        outcomesMonitoredA: null,
        mEdSubsA: null,
        oEdSubsA: null,
        managementTypesA: null,
        // single val implementer
        inameA: null,
        impMotiveA: null
      },
      isUpdated: null,
      isUnsaved: false
    };

    this.handleLeave = this.handleLeave.bind(this);
    this.handleStay = this.handleStay.bind(this);
    this.handleApprovalSelection = this.handleApprovalSelection.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount = () => {
    const {props} = this;
    if (props.formStatus === 'review') {
      this.setState({
        //Original value Setters
        tagNum: props.form.tagNumber,
        originalFunderName: props.form.funders.length > 0 ? props.form.funders[0].funderName : null,  //For now, retrieving and displaying first funder in the funder list
        originalImplementerName: props.form.implementers.length > 0 ? props.form.implementers[0].implementorName : null,  //For now, retrieving and displaying first implementer in the implementer list

        //Initiative setters
        initName: props.form.name,
        initURL: props.form.website,
        tWomen: props.form.targetsWomen,
        initStart: props.form.startYear,
        initEnd: props.form.endYear,
        launchCountries: props.form.launchCountry !== undefined ? props.form.launchCountry : [],
        idescription: props.form.description,
        targetGeos: props.form.targetGeographies.length !== undefined ? props.form.targetGeographies : [],
        mainProgramActivity: props.form.mainProgrammingActivity !== undefined ? props.form.mainProgrammingActivity : '',
        programArea: props.form.mainProgrammingArea !== undefined ? props.form.mainProgrammingArea : '',
        feeAccess: props.form.feeToAccess,
        targetPopulationSectors: props.form.targetPopulationSectors !== undefined ? props.form.targetPopulationSectors : [],
        outcomesMonitored: props.form.monitoredOutcomes !== undefined ? props.form.monitoredOutcomes : [],
        mEdSubs: props.form.mainEducationSubSectors !== undefined ? props.form.mainEducationSubSectors : [],
        oEdSubs: props.form.educationSubSectors !== undefined ? props.form.educationSubSectors : [],
        managementTypes: props.form.targetSchoolManagementType !== undefined ? props.form.targetSchoolManagementType : [],
        regions: props.form.regions !== undefined ? props.form.regions : [],
        countries: props.form.countriesOfOperation !== undefined ? props.form.countriesOfOperation : [],
        activities: props.form.programmingActivities !== undefined ? props.form.programmingActivities : [],
        sourceOfFees: props.form.sourcesOfFunding !== undefined ? props.form.sourcesOfFunding : [],

        //Funder Setters
        fname: props.form.funders.length > 0 ? props.form.funders[0].funderName : null,
        furl: props.form.funders.length > 0 ? props.form.funders[0].funderWebsite : null,
        motive: props.form.funders.length > 0 ? props.form.funders[0].profitMotive : null,
        organizationForm: props.form.funders.length > 0 ? props.form.funders[0].organizationalForm : null,
        impact: props.form.funders.length > 0 ? props.form.funders[0].impactInvesting : null,

        //Multi-valued funder attribute setters
        edSubs: props.form.funders !== undefined ? (props.form.funders.length > 0 ? (props.form.funders[0].educationSubsector !== undefined ? props.form.funders[0].educationSubsector : []) : []) : [],
        orgTraits: props.form.funders !== undefined ? (props.form.funders.length > 0 ? (props.form.funders[0].trait !== undefined ? props.form.funders[0].trait : []) : []) : [],
        asiaIBases: props.form.funders !== undefined ? (props.form.funders.length > 0 ? (props.form.funders[0].asiaBase !== undefined ? props.form.funders[0].asiaBase : []) : []) : [],
        asiaOperations: props.form.funders !== undefined ? (props.form.funders.length > 0 ? (props.form.funders[0].asiaOperatons !== undefined ? props.form.funders[0].asiaOperatons : []) : []) : [],
        internationalBases: props.form.funders !== undefined ? (props.form.funders.length > 0 ? (props.form.funders[0].baseLocation !== undefined ? props.form.funders[0].baseLocation : []) : []) : [],

        //Implementer setters
        iname: props.form.implementers.length > 0 ? props.form.implementers[0].implementorName : null,
        impMotive: props.form.implementers.length > 0 ? props.form.implementers[0].profitMotive : null
      });

      if (props.location.state !== undefined) {
        if (props.location.state.savedState !== undefined) {
          const {savedState, isUnsaved} = props.location.state;
          this.setState({
            //Other Setters
            comments: savedState.comments,
            //Review Setters
            needsReview: savedState.needsReview,
            originalReviews: savedState.originalReviews,
            reviews: savedState.reviews,
            isUnsaved: isUnsaved
          })
        }
      } else {
        this.setState({
          //Other Setters
          comments: props.form.status !== undefined ? (props.form.status.length > 0 ? (props.form.status[0].length > 0 ? (props.form.status[0][0].comment !== undefined ? props.form.status[0][0].comment : null) : null) : null) : null,
          //Review Setters
          needsReview: props.form.status !== undefined ? (props.form.status.length > 0 ? (props.form.status[0].length > 0 ? (props.form.status[0][0].needsReview !== undefined ? props.form.status[0][0].needsReview : null) : null) : null) : null,
          originalReviews: {
            fnameA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderNameApproval : null) : null) : null) : null) : 1,
            furlA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderUrlApproval : null) : null) : null) : null) : 1,
            motiveA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderMotiveApproval : null) : null) : null) : null) : 1,
            impactA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderImpactApproval : null) : null) : null) : null) : 1,
            organizationFormA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderOrganizationFormApproval : null) : null) : null) : null) : 1,
            // multi val funder
            internationalBasesA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderInternationalBaseApproval : null) : null) : null) : null) : 1,
            edSubsA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderEdSubsApproval : null) : null) : null) : null) : 1,
            orgTraitsA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderOrgTraitsApproval : null) : null) : null) : null) : 1,
            asialBasesA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderAsiaBasesApproval : null) : null) : null) : null) : 1,
            asiaOperationsA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderAsiaOperationsApproval : null) : null) : null) : null) : 1,
            // single val initiative
            initNameA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initNameApproval : null) : null) : null) : null) : 1,
            initURLA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initUrlApproval : null) : null) : null) : null) : 1,
            tWomenA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initTargetsWomenApproval : null) : null) : null) : null) : 1,
            initStartA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initStartApproval : null) : null) : null) : null) : 1,
            initEndA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initEndApproval : null) : null) : null) : null) : 1,
            idescriptionA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initDescriptionApproval : null) : null) : null) : null) : 1,
            programAreaA: 1, //set to approved as this is not based on user input
            initiativeMainProgramActivityA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initMainProgramActivityApproval : null) : null) : null) : null) : 1,
            feeAccessA:  props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initFeeAccessApproval : null) : null) : null) : null) : 1,
            // multi val initiative
            regionsA: props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initRegionsApproval : null) : null) : null) : null) : 1,
            countriesA: props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initCountriesApproval : null) : null) : null) : null) : 1,
            activitiesA: props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initActivitiesApproval : null) : null) : null) : null) : 1,
            sourceOfFeesA: 1, //Set to 1 for now, as not a field on form    //props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initSourceOfFeesApproval : null) : null) : null) : null,
            launchCountryA: props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initLaunchCountryApproval : null) : null) : null) : null) : 1,
            targetGeosA: props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initTargetGeoApproval : null) : null) : null) : null) : 1,
            targetPopulationSectorsA: props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initTargetPopulationSectorApproval : null) : null) : null) : null) : 1,
            outcomesMonitoredA: props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initOutcomesMonitoredApproval : null) : null) : null) : null) : 1,
            mEdSubsA: props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initMEdSubsApproval : null) : null) : null) : null) : 1,
            oEdSubsA: props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initOEdSubsApproval : null) : null) : null) : null) : 1,
            managementTypesA: props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initManagementTypesApproval : null) : null) : null) : null) : 1,
            // single val implementer
            inameA: props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].implementorNameApproval : null) : null) : null) : null) : 1,
            impMotiveA: props.inDB == false ? (props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].implementorMotiveApproval : null) : null) : null) : null) : 1
          },
          reviews: {
            fnameA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderNameApproval : null) : null) : null) : null,
            furlA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderUrlApproval : null) : null) : null) : null,
            motiveA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderMotiveApproval : null) : null) : null) : null,
            impactA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderImpactApproval : null) : null) : null) : null,
            organizationFormA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderOrganizationFormApproval : null) : null) : null) : null,
            // multi val funder
            internationalBasesA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderInternationalBaseApproval : null) : null) : null) : null,
            edSubsA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderEdSubsApproval : null) : null) : null) : null,
            orgTraitsA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderOrgTraitsApproval : null) : null) : null) : null,
            asialBasesA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderAsiaBasesApproval : null) : null) : null) : null,
            asiaOperationsA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].funderAsiaOperationsApproval : null) : null) : null) : null,
            // single val initiative
            initNameA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initNameApproval : null) : null) : null) : null,
            initURLA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initUrlApproval : null) : null) : null) : null,
            tWomenA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initTargetsWomenApproval : null) : null) : null) : null,
            initStartA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initStartApproval : null) : null) : null) : null,
            initEndA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initEndApproval : null) : null) : null) : null,
            idescriptionA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initDescriptionApproval : null) : null) : null) : null,
            programAreaA: 1, //set to approved as this is not based on user input
            initiativeMainProgramActivityA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initMainProgramActivityApproval : null) : null) : null) : null,
            feeAccessA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initFeeAccessApproval : null) : null) : null) : null,
            // multi val initiative
            regionsA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initRegionsApproval : null) : null) : null) : null,
            countriesA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initCountriesApproval : null) : null) : null) : null,
            activitiesA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initActivitiesApproval : null) : null) : null) : null,
            sourceOfFeesA: 1, //Set to 1 for now, as not a field on form    //props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initSourceOfFeesApproval : null) : null) : null) : null,
            launchCountryA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initLaunchCountryApproval : null) : null) : null) : null,
            targetGeosA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initTargetGeoApproval : null) : null) : null) : null,
            targetPopulationSectorsA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initTargetPopulationSectorApproval : null) : null) : null) : null,
            outcomesMonitoredA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initOutcomesMonitoredApproval : null) : null) : null) : null,
            mEdSubsA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initMEdSubsApproval : null) : null) : null) : null,
            oEdSubsA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initOEdSubsApproval : null) : null) : null) : null,
            managementTypesA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initManagementTypesApproval : null) : null) : null) : null,
            // single val implementer
            inameA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].implementorNameApproval : null) : null) : null) : null,
            impMotiveA: props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].implementorMotiveApproval : null) : null) : null) : null
          }
        });
      }
    }
  }

  componentDidUpdate = () => {
    //On browser back button click
    window.onpopstate = (e) => {
      //If the approval status for none of the fields was changed, then leave page, otherwise stay on page
      if (JSON.stringify(this.state.reviews) === JSON.stringify(this.state.originalReviews)) {
        this.props.history.push('/dashboard')
      } else {
        this.state.isUnsaved = true;
        this.setState({
          isUnsaved: this.state.isUnsaved
        })
        this.setState({
          isUnsaved: true
        });
        this.props.history.push({
          pathname: '/formReview',
          state: {
            savedState: this.state,
            isUnsaved: true
          }
        });
      }
    }
  }

  handleApprovalSelection(e){
    this.state.reviews[[e.target.name]] = parseInt(e.target.value);
    this.setState({
      reviews: this.state.reviews
    });
  }

  handleChange(e){
    console.log(e)
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  //Leave with unsaved changes
  handleLeave(e) {
    this.props.history.replace('/dashboard')
  }

  //Stay with unsaved changes
  handleStay(e) {
    this.state.isUnsaved = false;
    this.setState({
      isUnsaved: this.state.isUnsaved
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const {formStatus, userData} = this.props;
    //If submitting a new form
    if (formStatus === 'review') {
      if (userData) {
        //Check if form fields have been updated in terms of approval status
        if (JSON.stringify(this.state.reviews) !== JSON.stringify(this.state.originalReviews)) {
          this.state.isUpdated = true
        } else {
          this.state.isUpdated = false
        }
        this.setState({
          isUpdated: this.state.isUpdated
        });
        //If an RA or root user, then submit review to temp db
        if (userData.accessLevel !== 0) {
          //Only allow submission if at least one of the form fields' approval status has been updated
          if (this.state.isUpdated === true) {
            this.state.needsReview = 0;  //Form is ready for approval is the initial assumption
            for (const [key, value] of Object.entries(this.state.reviews)) {
              //If any field is found to be rejected, then form still requires further review
              if (value == 0) {
                this.state.needsReview = 1;
              }
              this.setState({
                needsReview: this.state.needsReview
              })
            }
            //If all fields in the form have been approved, then submit form to main and update temp form.
            //otherwise, if some fields are rejected, then submit form only to temp
            this.props.reviewForm(this.state, this.props.inDB, true);
          }
        }
      }
    }
  }

  render(){
    console.log(this.state.isUnsaved)
    const {authorized, formReviewed, formReviewError} = this.props;
    if (authorized === false) {
      return <Redirect to='/' />
    }

    if (formReviewed === true){
      return <Redirect to=
        {{
          pathname: '/form-review-success',
          state: {submission: true}
        }} />
    }

    const reviewError = formReviewError ?
    <div className="alert alert-dismissible alert-danger" style = {{width: "75%"}}>
      <strong> {formReviewError} </strong>
    </div> : (
      this.state.isUpdated !== null ? (
        this.state.isUpdated === false ? (
          <div className="alert alert-dismissible alert-warning" style = {{width: "75%"}}>
            <strong>No new reviews have been made to this form.</strong> Please make an approval change to one or more fields before submitting your review.
          </div>
        ) : null
      ) : null
    );

    const unsavedWarning = this.state.isUnsaved === true ?
    <div className="alert alert-dismissible alert-warning" style = {{width: "100%"}}>
      <strong> You have unsaved changes. </strong>Are you sure you want to leave?
      <button type="button" class="btn btn-warning" style = {{margin: '0 0 0 25px'}} onClick = {this.handleLeave}>Yes</button>
      <button type="button" class="btn btn-warning" style = {{margin: '0 0 0 10px'}} onClick = {this.handleStay}>No</button>
    </div> : null

    return (
        <div className = "formReview" style = {{padding: '50px 300px 0 300px'}}>
          <h3>Form Review</h3>
          <div>
            <br></br>
            {unsavedWarning}
            <form onSubmit={this.handleFormSubmit}>

            <h4>Funder</h4>
            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Name: <strong>{this.state.fname}</strong></p>
                <input type="radio" id="needsReview1" name="fnameA" value={1} checked = {this.state.reviews.fnameA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview1">Accept</label>
                <input type="radio" id="needsReview2" name="fnameA" value={0} checked = {this.state.reviews.fnameA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview2">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Website: <strong>{this.state.furl}</strong></p>
                <input type="radio" id="needsReview3" name="furlA" value={1} checked = {this.state.reviews.furlA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview3">Accept</label>
                <input type="radio" id="needsReview4" name="furlA" value={0} checked = {this.state.reviews.furlA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview4">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Profit Motive: <strong>{this.state.motive}</strong></p>
                <input type="radio" id="needsReview3_5" name="motiveA" value={1} checked = {this.state.reviews.motiveA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview3_5">Accept</label>
                <input type="radio" id="needsReview4_5" name="motiveA" value={0} checked = {this.state.reviews.motiveA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview4_5">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Impact Investing: <strong>{this.state.impact}</strong></p>
                <input type="radio" id="needsReview5" name="impactA" value={1} checked = {this.state.reviews.impactA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview5">Accept</label>
                <input type="radio" id="needsReview6" name="impactA" value={0} checked = {this.state.reviews.impactA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview6">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Organizational Form: <strong>{this.state.organizationForm}</strong></p>
                <input type="radio" id="needsReview9" name="organizationFormA" value={1} checked = {this.state.reviews.organizationFormA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview9">Accept</label>
                <input type="radio" id="needsReview10" name="organizationFormA" value={0} checked = {this.state.reviews.organizationFormA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview10">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>International Base(s):</p>
                <div id="iBases">
                  <ul className="list-group">
                  {
                    this.state.internationalBases.map(base => {
                      return (
                        <li className="list-group-item d-flex justify-content-between align-items-center bg-light"><strong>{base}</strong></li>
                      );
                    })
                  }
                  </ul>
                </div>
                <br></br>
                <input type="radio" id="needsReview11" name="internationalBasesA" value={1} checked = {this.state.reviews.internationalBasesA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview11">Accept</label>
                <input type="radio" id="needsReview12" name="internationalBasesA" value={0} checked = {this.state.reviews.internationalBasesA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview12">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Education Subsector(s):</p>
                <div id="edSubs">
                  <ul className="list-group">
                  {
                    this.state.edSubs.map(edSub => {
                      return (
                        <li className="list-group-item d-flex justify-content-between align-items-center bg-light"><strong>{edSub}</strong></li>
                      );
                    })
                  }
                  </ul>
                </div>
                <br></br>
                <input type="radio" id="needsReview15" name="edSubsA" value={1} checked = {this.state.reviews.edSubsA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview15">Accept</label>
                <input type="radio" id="needsReview16" name="edSubsA" value={0} checked = {this.state.reviews.edSubsA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview16">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Organizational Trait(s):</p>
                <div id="orgTraits">
                  <ul className="list-group">
                  {
                    this.state.orgTraits.map(orgTrait => {
                      return (
                        <li className="list-group-item d-flex justify-content-between align-items-center bg-light"><strong>{orgTrait}</strong></li>
                      );
                    })
                  }
                  </ul>
                </div>
                <br></br>
                <input type="radio" id="needsReview17" name="orgTraitsA" value={1} checked = {this.state.reviews.orgTraitsA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview17">Accept</label>
                <input type="radio" id="needsReview18" name="orgTraitsA" value={0} checked = {this.state.reviews.orgTraitsA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview18">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Asia International Base(s):</p>
                <div id="aIBases">
                  <ul className="list-group">
                  {
                    this.state.asiaIBases.map(base => {
                      return (
                        <li className="list-group-item d-flex justify-content-between align-items-center bg-light"><strong>{base}</strong></li>
                      );
                    })
                  }
                  </ul>
                </div>
                <br></br>
                <input type="radio" id="needsReview19" name="asialBasesA" value={1} checked = {this.state.reviews.asialBasesA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview19">Accept</label>
                <input type="radio" id="needsReview20" name="asialBasesA" value={0} checked = {this.state.reviews.asialBasesA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview20">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Asia Operation(s):</p>
                <div id="asiaOperationLocations">
                  <ul className="list-group">
                    {
                      this.state.asiaOperations.map(operation => {
                        return (
                          <li className="list-group-item d-flex justify-content-between align-items-center bg-light"><strong>{operation}</strong></li>
                        );
                      })
                    }
                  </ul>
                </div>
                <br></br>
                <input type="radio" id="needsReview21" name="asiaOperationsA" value={1} checked = {this.state.reviews.asiaOperationsA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview21">Accept</label>
                <input type="radio" id="needsReview22" name="asiaOperationsA" value={0} checked = {this.state.reviews.asiaOperationsA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview22">Reject</label>
              </div>
            </div>

            <br></br>
            <h4>Initiative</h4>
            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Name: <strong>{this.state.initName}</strong></p>
                <input type="radio" id="needsReview23" name="initNameA" value={1} checked = {this.state.reviews.initNameA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview23">Accept</label>
                <input type="radio" id="needsReview24" name="initNameA" value={0} checked = {this.state.reviews.initNameA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview24">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Website: <strong>{this.state.initURL}</strong></p>
                <input type="radio" id="needsReview25" name="initURLA" value={1} checked = {this.state.reviews.initURLA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview25">Accept</label>
                <input type="radio" id="needsReview26" name="initURLA" value={0} checked = {this.state.reviews.initURLA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview26">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Targets Women: <strong>{this.state.tWomen}</strong></p>
                <input type="radio" id="needsReview27" name="tWomenA" value={1} checked = {this.state.reviews.tWomenA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview27">Accept</label>
                <input type="radio" id="needsReview28" name="tWomenA" value={0} checked = {this.state.reviews.tWomenA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview28">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Start Year: <strong>{this.state.initStart}</strong></p>
                <input type="radio" id="needsReview29" name="initStartA" value={1} checked = {this.state.reviews.initStartA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview29">Accept</label>
                <input type="radio" id="needsReview30" name="initStartA" value={0} checked = {this.state.reviews.initStartA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview30">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>End Year: <strong>{this.state.initEnd}</strong></p>
                <input type="radio" id="needsReview31" name="initEndA" value={1} checked = {this.state.reviews.initEndA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview31">Accept</label>
                <input type="radio" id="needsReview32" name="initEndA" value={0} checked = {this.state.reviews.initEndA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview32">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Launch Country:</p>
                <div id="launchCountries">
                  <ul className="list-group">
                  {
                    this.state.launchCountries.map(country => {
                      return (
                        <li className="list-group-item d-flex justify-content-between align-items-center bg-light"><strong>{country}</strong></li>
                      );
                    })
                  }
                  </ul>
                </div>
                <br></br>
                <input type="radio" id="needsReview33" name="launchCountryA" value={1} checked = {this.state.reviews.launchCountryA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview33">Accept</label>
                <input type="radio" id="needsReview34" name="launchCountryA" value={0} checked = {this.state.reviews.launchCountryA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview34">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Description: <strong>{this.state.idescription}</strong></p>
                <input type="radio" id="needsReview35" name="idescriptionA" value={1} checked = {this.state.reviews.idescriptionA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview35">Accept</label>
                <input type="radio" id="needsReview36" name="idescriptionA" value={0} checked = {this.state.reviews.idescriptionA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview36">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Region(s):</p>
                <div id="initRegions">
                  <ul className="list-group">
                    {
                      this.state.regions.map(region => {
                        return (
                          <li className="list-group-item d-flex justify-content-between align-items-center bg-light"><strong>{region}</strong></li>
                        );
                      })
                    }
                  </ul>
                </div>
                <br></br>
                <input type="radio" id="needsReview37" name="regionsA" value={1} checked = {this.state.reviews.regionsA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview37">Accept</label>
                <input type="radio" id="needsReview38" name="regionsA" value={0} checked = {this.state.reviews.regionsA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview38">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Countries:</p>
                <div id="initCountries">
                  <ul className="list-group">
                    {
                      this.state.countries.map(country => {
                        return (
                          <li className="list-group-item d-flex justify-content-between align-items-center bg-light"><strong>{country}</strong></li>
                        );
                      })
                    }
                  </ul>
                </div>
                <br></br>
                <input type="radio" id="needsReview39" name="countriesA" value={1} checked = {this.state.reviews.countriesA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview39">Accept</label>
                <input type="radio" id="needsReview40" name="countriesA" value={0} checked = {this.state.reviews.countriesA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview40">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Target Geography:</p>
                <div id="targetGeos">
                  <ul className="list-group">
                    {
                      this.state.targetGeos.map(geography => {
                        return (
                          <li className="list-group-item d-flex justify-content-between align-items-center bg-light"><strong>{geography}</strong></li>
                        );
                      })
                    }
                  </ul>
                </div>
                <br></br>
                <input type="radio" id="needsReview41" name="targetGeosA" value={1} checked = {this.state.reviews.targetGeosA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview41">Accept</label>
                <input type="radio" id="needsReview42" name="targetGeosA" value={0} checked = {this.state.reviews.targetGeosA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview42">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Main Education Subsector:</p>
                <div id="mEdSubs">
                  <ul className="list-group">
                    {
                      this.state.mEdSubs.map(mEdSub => {
                        return (
                          <li className="list-group-item d-flex justify-content-between align-items-center bg-light"><strong>{mEdSub}</strong></li>
                        );
                      })
                    }
                  </ul>
                </div>
                <br></br>
                <input type="radio" id="needsReview43" name="mEdSubsA" value={1} checked = {this.state.reviews.mEdSubsA == 1} onChange = {this.handleApprovalSelection}/> <label name="accept" htmlFor="needsReview43">Accept</label>
                <input type="radio" id="needsReview44" name="mEdSubsA" value={0} checked = {this.state.reviews.mEdSubsA == 0} onChange = {this.handleApprovalSelection}/> <label name="reject" htmlFor="needsReview44">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Other Education Subsector(s):</p>
                <div id="oEdSubs">
                  <ul className="list-group">
                    {
                      this.state.oEdSubs.map(oEdSub => {
                        return (
                          <li className="list-group-item d-flex justify-content-between align-items-center bg-light"><strong>{oEdSub}</strong></li>
                        );
                      })
                    }
                  </ul>
                </div>
                <br></br>
                <input type="radio" id="needsReview45" name="oEdSubsA" value={1} checked = {this.state.reviews.oEdSubsA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview45">Accept</label>
                <input type="radio" id="needsReview46" name="oEdSubsA" value={0} checked = {this.state.reviews.oEdSubsA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview46">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Main Program Activity: <strong>{this.state.mainProgramActivity}</strong></p>
                <input type="radio" id="needsReview47" name="initiativeMainProgramActivityA" value={1} checked = {this.state.reviews.initiativeMainProgramActivityA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview47">Accept</label>
                <input type="radio" id="needsReview48" name="initiativeMainProgramActivityA" value={0} checked = {this.state.reviews.initiativeMainProgramActivityA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview48">Reject</label>
                <br></br><br></br>

                <p>Program Area:</p>
                <div id="programArea">
                  <p>
                    <i>{this.state.programArea}</i>
                  </p>
                </div>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Other Programming Activities:</p>
                <div id="initActivities">
                  <ul className="list-group">
                    {
                      this.state.activities.map(activity => {
                        return (
                          <li className="list-group-item d-flex justify-content-between align-items-center bg-light"><strong>{activity}</strong></li>
                        );
                      })
                    }
                  </ul>
                </div>
                <br></br>
                <input type="radio" id="needsReview49" name="activitiesA" value={1} checked = {this.state.reviews.activitiesA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview49">Accept</label>
                <input type="radio" id="needsReview50" name="activitiesA" value={0} checked = {this.state.reviews.activitiesA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview50">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Fee to Access: <strong>{this.state.feeAccess}</strong></p>
                <input type="radio" id="needsReview51" name="feeAccessA" value={1} checked = {this.state.reviews.feeAccessA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview51">Accept</label>
                <input type="radio" id="needsReview52" name="feeAccessA" value={0} checked = {this.state.reviews.feeAccessA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview52">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Target School Management Type:</p>
                <div id="managementTypes">
                  <ul className="list-group">
                    {
                      this.state.managementTypes.map(type => {
                        return (
                          <li className="list-group-item d-flex justify-content-between align-items-center bg-light"><strong>{type}</strong></li>
                        );
                      })
                    }
                  </ul>
                </div>
                <br></br>
                <input type="radio" id="needsReview53" name="managementTypesA" value={1} checked = {this.state.reviews.managementTypesA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview53">Accept</label>
                <input type="radio" id="needsReview54" name="managementTypesA" value={0} checked = {this.state.reviews.managementTypesA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview54">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Target Population Sector(s):</p>
                <div id="targetPopSector">
                  <ul className="list-group">
                    {
                      this.state.targetPopulationSectors.map(sector => {
                        return (
                          <li className="list-group-item d-flex justify-content-between align-items-center bg-light"><strong>{sector}</strong></li>
                        );
                      })
                    }
                  </ul>
                </div>
                <br></br>
                <input type="radio" id="needsReview55" name="targetPopulationSectorsA" value={1} checked = {this.state.reviews.targetPopulationSectorsA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview55">Accept</label>
                <input type="radio" id="needsReview56" name="targetPopulationSectorsA" value={0} checked = {this.state.reviews.targetPopulationSectorsA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview56">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Outcomes Monitored:</p>
                <div id="outcomesMonitored">
                  <ul className="list-group">
                    {
                      this.state.outcomesMonitored.map(outcome => {
                        return (
                          <li className="list-group-item d-flex justify-content-between align-items-center bg-light"><strong>{outcome}</strong></li>
                        );
                      })
                    }
                  </ul>
                </div>
                <br></br>
                <input type="radio" id="needsReview57" name="outcomesMonitoredA" value={1} checked = {this.state.reviews.outcomesMonitoredA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview57">Accept</label>
                <input type="radio" id="needsReview58" name="outcomesMonitoredA" value={0} checked = {this.state.reviews.outcomesMonitoredA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview58">Reject</label>
              </div>
            </div>

            <br></br>
            <h4>Implementer</h4>
            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Name: <strong>{this.state.iname}</strong></p>
                <input type="radio" id="needsReview61" name="inameA" value={1} checked = {this.state.reviews.inameA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview61">Accept</label>
                <input type="radio" id="needsReview62" name="inameA" value={0} checked = {this.state.reviews.inameA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview62">Reject</label>
              </div>
            </div>

            <div className="card border-secondary mb-3" style={{maxWidth: "20rem;"}}>
              <div class="card-body bg-light">
                <p>Profit Motive: <strong>{this.state.impMotive}</strong></p>
                <input type="radio" id="needsReview63" name="impMotiveA" value={1} checked = {this.state.reviews.impMotiveA == 1} onChange = {this.handleApprovalSelection} /> <label name="accept" htmlFor="needsReview63">Accept</label>
                <input type="radio" id="needsReview64" name="impMotiveA" value={0} checked = {this.state.reviews.impMotiveA == 0} onChange = {this.handleApprovalSelection} /> <label name="reject" htmlFor="needsReview64">Reject</label>
              </div>
            </div>
            <br></br>

            <h4>Comments about Submission and Review</h4>
              <textarea id="comments" name="comment" value = {this.state.comments} maxLength ="10000" placeholder="Write any comments you have about this form" onChange={this.handleChange}></textarea>
              <p>(10,000 character limit)</p>
            <br></br><br></br>

            <input type="submit"value="Submit Review" onChange/>
            <br></br><br></br>
            {reviewError}
            </form>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth,
    userData: state.data.userInformation,

    form: state.data.form,
    formStatus: state.data.formStatus,
    inDB: state.data.pulledformApproved,

    formReviewed: state.data.formReviewed,
    formReviewError: state.data.formReviewError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    reviewForm: (form, inDB, isModified) => {dispatch(reviewForm(form, inDB, isModified))},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(formReview)
