import React from 'react';
import ReactDOM from 'react-dom';
import './formSubmission.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {addForm, addFormRA, modifyForm, modifyFormRA} from '../../store/actions/dataActions'

class formSubmission extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      //Original values
      tagNum: null,
      originalFunderName: null,
      originalImplementerName: null,

      //Original Funder
      ofurl: null,
      omotive: null,
      oOrganizationForm: null,
      oimpact: null,
      oedSubs: [],
      oOrgTraits: [],
      oasiaIBases: [],
      oasiaOperations: [],
      ointernationalBases: [],

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
      internationalBases: [], //Funder International Bases

      //Original Initiative
      oinitName: null,
      oinitURL: null,
      otWomen: null,
      oinitStart: null,
      oinitEnd: null,
      olaunchCountries: [],
      oidescription: null,
      otargetGeos: [],
      omainProgramActivity: '',
      oprogramArea: '',
      ofeeAccess: null,
      otargetPopulationSectors: [],
      oOutcomesMonitored: [],
      omEdSubs: [],
      oOEdSubs: [],
      omanagementTypes: [],
      oregions: [],
      ocountries: [],
      oactivities: [],
      osourceOfFees: [],

      //Initiative
      initName: null,
      initURL: null,
      tWomen: null,
      initStart: null,
      initEnd: null,
      launchCountries: [],
      idescription: null,
      targetGeos: [],
      mainProgramActivity: '',
      programArea: '',
      feeAccess: null,
      targetPopulationSectors: [],
      outcomesMonitored: [],
      mEdSubs: [],
      oEdSubs: [],
      managementTypes: [],
      regions: [], //Initiative Regions
      countries: [], //Initiative Countries
      activities: [], //Initiative Activities (not counting Main Activity)
      sourceOfFees: [], //Initiative Source of Fees

      //Initial Implementer
      oimpMotive: null,

      //Implementer
      iname: null,
      impMotive: null,

      //Other
      comments: null,

      //Reviews
      needsReview: 1,
      //Section Reviews
      originalReviews: {
        fnameA: 0,
        furlA: 0,
        motiveA: 0,
        impactA: 0,
        organizationFormA: 0,
        // multi val funder
        internationalBasesA: 0,
        edSubsA: 0,
        orgTraitsA: 0,
        asialBasesA: 0,
        asiaOperationsA: 0,
        // single val initiative
        initNameA: 0,
        initURLA: 0,
        tWomenA: 0,
        initStartA: 0,
        initEndA: 0,
        idescriptionA: 0,
        programAreaA: 0,
        initiativeMainProgramActivityA: 0,
        feeAccessA: 0,
        // multi val initiative
        regionsA: 0,
        countriesA: 0,
        activitiesA: 0,
        sourceOfFeesA: 0,
        launchCountryA: 0,
        targetGeosA: 0,
        targetPopulationSectorsA: 0,
        outcomesMonitoredA: 0,
        mEdSubsA: 0,
        oEdSubsA: 0,
        managementTypesA: 0,
        // single val implementer
        inameA: 0,
        impMotiveA: 0
      },
      reviews: {
        fnameA: 0,
        furlA: 0,
        motiveA: 0,
        impactA: 0,
        organizationFormA: 0,
        // multi val funder
        internationalBasesA: 0,
        edSubsA: 0,
        orgTraitsA: 0,
        asialBasesA: 0,
        asiaOperationsA: 0,
        // single val initiative
        initNameA: 0,
        initURLA: 0,
        tWomenA: 0,
        initStartA: 0,
        initEndA: 0,
        idescriptionA: 0,
        programAreaA: 0,
        initiativeMainProgramActivityA: 0,
        feeAccessA: 0,
        // multi val initiative
        regionsA: 0,
        countriesA: 0,
        activitiesA: 0,
        sourceOfFeesA: 0,
        launchCountryA: 0,
        targetGeosA: 0,
        targetPopulationSectorsA: 0,
        outcomesMonitoredA: 0,
        mEdSubsA: 0,
        oEdSubsA: 0,
        managementTypesA: 0,
        // single val implementer
        inameA: 0,
        impMotiveA: 0
      },
      isUpdated: null,
      isUnsaved: false
    };

    this.addIBase = this.addIBase.bind(this);
    //this.addOpLoc = this.addOpLoc.bind(this);
    this.addInitRegion = this.addInitRegion.bind(this);
    this.addInitCountry = this.addInitCountry.bind(this);
    this.buttonMaker = this.buttonMaker.bind(this);
    this.addProgramActivity = this.addProgramActivity.bind(this);
    this.changeProgramArea = this.changeProgramArea.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.changeEdSub = this.changeEdSub.bind(this);
    this.changeOrgTrait = this.changeOrgTrait.bind(this);
    this.profitMotiveChange = this.profitMotiveChange.bind(this);
    this.organizationChange = this.organizationChange.bind(this);
    this.impactChange = this.impactChange.bind(this);
    this.mEdSubChange = this.mEdSubChange.bind(this);
    this.oEdSubChange = this.oEdSubChange.bind(this);
    this.tWomenChange = this.tWomenChange.bind(this);
    this.geographyChange = this.geographyChange.bind(this);
    this.feeAccessChange = this.feeAccessChange.bind(this);
    this.impMotiveChange = this.impMotiveChange.bind(this);
    this.addOutcome = this.addOutcome.bind(this);
    this.addSourceFee = this.addSourceFee.bind(this);
    this.addManagementType = this.addManagementType.bind(this);
    this.addPopSector = this.addPopSector.bind(this);
    this.addAIBase = this.addAIBase.bind(this);
    this.addAsiaOperation = this.addAsiaOperation.bind(this);
    this.addLaunchCountry = this.addLaunchCountry.bind(this);
    this.startYearChange = this.startYearChange.bind(this);
    this.endYearChange = this.endYearChange.bind(this);
    this.fieldStatus = this.fieldStatus.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleStay = this.handleStay.bind(this);
  }

  componentDidMount = () => {
    const {props} = this;
    if (props.formStatus === 'modify') {
      if (props.location.state !== undefined) {
        if (props.location.state.savedState !== undefined) {
          const {savedState, isUnsaved} = props.location.state;
          this.setState({
            //Original value Setters
            tagNum: savedState.tagNum,
            originalFunderName: savedState.originalFunderName,
            originalImplementerName: savedState.originalImplementerName,

            //Original Initiative setters
            oinitName: savedState.oinitName,
            oinitURL: savedState.oinitURL,
            otWomen: savedState.otWomen,
            oinitStart: savedState.oinitStart,
            oinitEnd: savedState.oinitEnd,
            olaunchCountries: savedState.olaunchCountries,
            oidescription: savedState.oidescription,
            otargetGeos: savedState.otargetGeos,
            omainProgramActivity: savedState.omainProgramActivity,
            oprogramArea: savedState.oprogramArea,
            ofeeAccess: savedState.ofeeAccess,
            otargetPopulationSectors: savedState.otargetPopulationSectors,
            oOutcomesMonitored: savedState.oOutcomesMonitored,
            omEdSubs: savedState.omEdSubs,
            oOEdSubs: savedState.oOEdSubs,
            omanagementTypes: savedState.omanagementTypes,
            oregions: savedState.oregions,
            ocountries: savedState.ocountries,
            oactivities: savedState.oactivities,
            osourceOfFees: savedState.osourceOfFees,

            //Initiative setters
            initName: savedState.initName,
            initURL: savedState.initURL,
            tWomen: savedState.tWomen,
            initStart: savedState.initStart,
            initEnd: savedState.initEnd,
            launchCountries: savedState.launchCountries,
            idescription: savedState.idescription,
            targetGeos: savedState.targetGeos,
            mainProgramActivity: savedState.mainProgramActivity,
            programArea: savedState.programArea,
            feeAccess: savedState.feeAccess,
            targetPopulationSectors: savedState.targetPopulationSectors,
            outcomesMonitored: savedState.outcomesMonitored,
            mEdSubs: savedState.mEdSubs,
            oEdSubs: savedState.oEdSubs,
            managementTypes: savedState.managementTypes,
            regions: savedState.regions,
            countries: savedState.countries,
            activities: savedState.activities,
            sourceOfFees: savedState.sourceOfFees,

            //Original Funder Setters
            ofurl: savedState.ofurl,
            omotive: savedState.omotive,
            oOrganizationForm: savedState.oOrganizationForm,
            oimpact: savedState.oimpact,
            //Multi-valued funder attribute setters
            oedSubs: savedState.oedSubs,
            oOrgTraits: savedState.oOrgTraits,
            oasiaIBases: savedState.oasiaIBases,
            oasiaOperations: savedState.oasiaOperations,
            ointernationalBases: savedState.ointernationalBases,

            //Funder Setters
            fname: savedState.fname,
            furl: savedState.furl,
            motive: savedState.motive,
            organizationForm: savedState.organizationForm,
            impact: savedState.impact,
            //Multi-valued funder attribute setters
            edSubs: savedState.edSubs,
            orgTraits: savedState.orgTraits,
            asiaIBases: savedState.asiaIBases,
            asiaOperations: savedState.asiaOperations,
            internationalBases: savedState.internationalBases,

            //Original Implementer Setters
            oimpMotive: savedState.oimpMotive,

            //Implementer Setters
            iname: savedState.iname,
            impMotive: savedState.impMotive,

            //Other Setters
            comments: savedState.comments,

            //Review Setters
            needsReview: savedState.needsReview,
            originalReviews: savedState.originalReviews,
            reviews: savedState.reviews,
            isUnsaved: isUnsaved
          });
        }
      } else {
        this.setState({
          //Original value Setters
          tagNum: props.form.tagNumber,
          originalFunderName: props.form.funders.length > 0 ? props.form.funders[0].funderName : null,  //For now, retrieving and displaying first funder in the funder list
          originalImplementerName: props.form.implementers.length > 0 ? props.form.implementers[0].implementorName : null,  //For now, retrieving and displaying first implementer in the implementer list

          //Original Initiative setters
          oinitName: props.form.name,
          oinitURL: props.form.website,
          otWomen: props.form.targetsWomen,
          oinitStart: props.form.startYear,
          oinitEnd: props.form.endYear,
          olaunchCountries: props.form.launchCountry !== undefined ? JSON.parse(JSON.stringify(props.form.launchCountry)) : [],
          oidescription: props.form.description,
          otargetGeos: props.form.targetGeographies.length !== undefined ? JSON.parse(JSON.stringify(props.form.targetGeographies)) : [],
          omainProgramActivity: props.form.mainProgrammingActivity !== undefined ? props.form.mainProgrammingActivity : '',
          oprogramArea: props.form.mainProgrammingArea !== undefined ? props.form.mainProgrammingArea : '',
          ofeeAccess: props.form.feeToAccess,
          otargetPopulationSectors: props.form.targetPopulationSectors !== undefined ? JSON.parse(JSON.stringify(props.form.targetPopulationSectors)) : [],
          oOutcomesMonitored: props.form.monitoredOutcomes !== undefined ? JSON.parse(JSON.stringify(props.form.monitoredOutcomes)) : [],
          omEdSubs: props.form.mainEducationSubSectors !== undefined ? JSON.parse(JSON.stringify(props.form.mainEducationSubSectors)) : [],
          oOEdSubs: props.form.educationSubSectors !== undefined ? JSON.parse(JSON.stringify(props.form.educationSubSectors)) : [],
          omanagementTypes: props.form.targetSchoolManagementType !== undefined ? JSON.parse(JSON.stringify(props.form.targetSchoolManagementType)) : [],
          oregions: props.form.regions !== undefined ? JSON.parse(JSON.stringify(props.form.regions)) : [],
          ocountries: props.form.countriesOfOperation !== undefined ? JSON.parse(JSON.stringify(props.form.countriesOfOperation)) : [],
          oactivities: props.form.programmingActivities !== undefined ? JSON.parse(JSON.stringify(props.form.programmingActivities)) : [],
          osourceOfFees: props.form.sourcesOfFunding !== undefined ? props.form.sourcesOfFunding : [],

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

          //Original Funder Setters
          ofurl: props.form.funders.length > 0 ? props.form.funders[0].funderWebsite : null,
          omotive: props.form.funders.length > 0 ? props.form.funders[0].profitMotive : null,
          oOrganizationForm: props.form.funders.length > 0 ? props.form.funders[0].organizationalForm : null,
          oimpact: props.form.funders.length > 0 ? props.form.funders[0].impactInvesting : null,
          //Multi-valued funder attribute setters
          oedSubs: props.form.funders !== undefined ? (props.form.funders.length > 0 ? (props.form.funders[0].educationSubsector !== undefined ? JSON.parse(JSON.stringify(props.form.funders[0].educationSubsector)) : []) : []) : [],
          oOrgTraits: props.form.funders !== undefined ? (props.form.funders.length > 0 ? (props.form.funders[0].trait !== undefined ? JSON.parse(JSON.stringify(props.form.funders[0].trait)) : []) : []) : [],
          oasiaIBases: props.form.funders !== undefined ? (props.form.funders.length > 0 ? (props.form.funders[0].asiaBase !== undefined ? JSON.parse(JSON.stringify(props.form.funders[0].asiaBase)) : []) : []) : [],
          oasiaOperations: props.form.funders !== undefined ? (props.form.funders.length > 0 ? (props.form.funders[0].asiaOperatons !== undefined ? JSON.parse(JSON.stringify(props.form.funders[0].asiaOperatons)) : []) : []) : [],
          ointernationalBases: props.form.funders !== undefined ? (props.form.funders.length > 0 ? (props.form.funders[0].baseLocation !== undefined ? JSON.parse(JSON.stringify(props.form.funders[0].baseLocation)) : []) : []) : [],

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

          //Original Implementer Setters
          oimpMotive: props.form.implementers.length > 0 ? props.form.implementers[0].profitMotive : null,

          //Implementer Setters
          iname: props.form.implementers.length > 0 ? props.form.implementers[0].implementorName : null,
          impMotive: props.form.implementers.length > 0 ? props.form.implementers[0].profitMotive : null,

          //Other Setters
          comments: props.form.status !== undefined ? (props.form.status.length > 0 ? (props.form.status[0].length > 0 ? (props.form.status[0][0].comment !== undefined ? props.form.status[0][0].comment : '') : '') : '') : '',

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
          }
        });
      }
    } else {
      if (props.formStatus === 'add') {
        if (props.location.state !== undefined) {
          if (props.location.state.savedState !== undefined) {
            const {savedState, isUnsaved} = props.location.state;
            this.setState({
              //Original value Setters
              tagNum: savedState.tagNum,
              originalFunderName: savedState.originalFunderName,
              originalImplementerName: savedState.originalImplementerName,

              //Original Initiative setters
              oinitName: savedState.oinitName,
              oinitURL: savedState.oinitURL,
              otWomen: savedState.otWomen,
              oinitStart: savedState.oinitStart,
              oinitEnd: savedState.oinitEnd,
              olaunchCountries: savedState.olaunchCountries,
              oidescription: savedState.oidescription,
              otargetGeos: savedState.otargetGeos,
              omainProgramActivity: savedState.omainProgramActivity,
              oprogramArea: savedState.oprogramArea,
              ofeeAccess: savedState.ofeeAccess,
              otargetPopulationSectors: savedState.otargetPopulationSectors,
              oOutcomesMonitored: savedState.oOutcomesMonitored,
              omEdSubs: savedState.omEdSubs,
              oOEdSubs: savedState.oOEdSubs,
              omanagementTypes: savedState.omanagementTypes,
              oregions: savedState.oregions,
              ocountries: savedState.ocountries,
              oactivities: savedState.oactivities,
              osourceOfFees: savedState.osourceOfFees,

              //Initiative setters
              initName: savedState.initName,
              initURL: savedState.initURL,
              tWomen: savedState.tWomen,
              initStart: savedState.initStart,
              initEnd: savedState.initEnd,
              launchCountries: savedState.launchCountries,
              idescription: savedState.idescription,
              targetGeos: savedState.targetGeos,
              mainProgramActivity: savedState.mainProgramActivity,
              programArea: savedState.programArea,
              feeAccess: savedState.feeAccess,
              targetPopulationSectors: savedState.targetPopulationSectors,
              outcomesMonitored: savedState.outcomesMonitored,
              mEdSubs: savedState.mEdSubs,
              oEdSubs: savedState.oEdSubs,
              managementTypes: savedState.managementTypes,
              regions: savedState.regions,
              countries: savedState.countries,
              activities: savedState.activities,
              sourceOfFees: savedState.sourceOfFees,

              //Original Funder Setters
              ofurl: savedState.ofurl,
              omotive: savedState.omotive,
              oOrganizationForm: savedState.oOrganizationForm,
              oimpact: savedState.oimpact,
              //Multi-valued funder attribute setters
              oedSubs: savedState.oedSubs,
              oOrgTraits: savedState.oOrgTraits,
              oasiaIBases: savedState.oasiaIBases,
              oasiaOperations: savedState.oasiaOperations,
              ointernationalBases: savedState.ointernationalBases,

              //Funder Setters
              fname: savedState.fname,
              furl: savedState.furl,
              motive: savedState.motive,
              organizationForm: savedState.organizationForm,
              impact: savedState.impact,
              //Multi-valued funder attribute setters
              edSubs: savedState.edSubs,
              orgTraits: savedState.orgTraits,
              asiaIBases: savedState.asiaIBases,
              asiaOperations: savedState.asiaOperations,
              internationalBases: savedState.internationalBases,

              //Original Implementer Setters
              oimpMotive: savedState.oimpMotive,

              //Implementer Setters
              iname: savedState.iname,
              impMotive: savedState.impMotive,

              //Other Setters
              comments: savedState.comments,

              //Review Setters
              needsReview: savedState.needsReview,
              originalReviews: savedState.originalReviews,
              reviews: savedState.reviews,

              isUnsaved: isUnsaved
            })
          }
        }
      }
    }
  }

  componentDidUpdate = () => {
    //On browser back button click
    window.onpopstate = (e) => {
      //If one of the fields was changed or inputted, then stay on page, otherwise leave page
      if (this.state.fname !== this.state.originalFunderName ||
          this.state.furl !== this.state.ofurl ||
          this.state.motive !==  this.state.omotive ||
          this.state.impact !==  this.state.oimpact ||
          this.state.organizationForm !==  this.state.oOrganizationForm ||
          JSON.stringify(this.state.internationalBases) !== JSON.stringify(this.state.ointernationalBases) ||
          JSON.stringify(this.state.edSubs) !== JSON.stringify(this.state.oedSubs) ||
          JSON.stringify(this.state.orgTraits) !== JSON.stringify(this.state.oOrgTraits) ||
          JSON.stringify(this.state.asiaIBases) !== JSON.stringify(this.state.oasiaIBases) ||
          JSON.stringify(this.state.asiaOperations) !== JSON.stringify(this.state.oasiaOperations) ||
          this.state.initName !==  this.state.oinitName ||
          this.state.initURL !==  this.state.oinitURL ||
          this.state.tWomen !==  this.state.otWomen ||
          this.state.initStart !==  this.state.oinitStart ||
          this.state.initEnd !==  this.state.oinitEnd ||
          this.state.idescription !==  this.state.oidescription ||
          this.state.mainProgramActivity !==  this.state.omainProgramActivity ||
          this.state.feeAccess !==  this.state.ofeeAccess ||
          JSON.stringify(this.state.regions) !== JSON.stringify(this.state.oregions) ||
          JSON.stringify(this.state.countries) !== JSON.stringify(this.state.ocountries) ||
          JSON.stringify(this.state.activities) !== JSON.stringify(this.state.oactivities) ||
          JSON.stringify(this.state.launchCountries) !== JSON.stringify(this.state.olaunchCountries) ||
          JSON.stringify(this.state.targetGeos) !== JSON.stringify(this.state.otargetGeos) ||
          JSON.stringify(this.state.targetPopulationSectors) !== JSON.stringify(this.state.otargetPopulationSectors) ||
          JSON.stringify(this.state.outcomesMonitored) !== JSON.stringify(this.state.oOutcomesMonitored) ||
          JSON.stringify(this.state.mEdSubs) !== JSON.stringify(this.state.omEdSubs) ||
          JSON.stringify(this.state.oEdSubs) !== JSON.stringify(this.state.oOEdSubs) ||
          JSON.stringify(this.state.managementTypes) !== JSON.stringify(this.state.omanagementTypes) ||
          this.state.iname !==  this.state.originalImplementerName ||
          this.state.impMotive !==  this.state.oimpMotive) {
              this.setState({
                isUnsaved: true
              })
              this.props.history.push({
                pathname: '/formsubmission',
                state: {
                  savedState: this.state,
                  isUnsaved: true
                }
              });
          } else {
              //Go back
              this.props.history.push('/dashboard')
          }
      }
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.formStatus === 'modify') {
      //Section Reviews
      return {
        //If changes are made to form, only set changed fields to not accepted (i.e. to 0)
        reviews: {
          fnameA: state.fname !== state.originalFunderName ? 0 : state.originalReviews.fnameA,
          furlA:  state.furl !== state.ofurl ? 0 : state.originalReviews.furlA ,
          motiveA:  state.motive !==  state.omotive ? 0 :  state.originalReviews.motiveA,
          impactA:  state.impact !==  state.oimpact ? 0 :  state.originalReviews.impactA,
          organizationFormA:  state.organizationForm !==  state.oOrganizationForm ? 0 :  state.originalReviews.organizationFormA,
          // multi val funder
          internationalBasesA:  JSON.stringify(state.internationalBases) !== JSON.stringify(state.ointernationalBases) ? 0 :  state.originalReviews.internationalBasesA,
          edSubsA:  JSON.stringify(state.edSubs) !== JSON.stringify(state.oedSubs) ? 0 :  state.originalReviews.edSubsA,
          orgTraitsA:  JSON.stringify(state.orgTraits) !== JSON.stringify(state.oOrgTraits) ? 0 :  state.originalReviews.orgTraitsA,
          asialBasesA:  JSON.stringify(state.asiaIBases) !== JSON.stringify(state.oasiaIBases) ? 0 :  state.originalReviews.asialBasesA,
          asiaOperationsA:  JSON.stringify(state.asiaOperations) !== JSON.stringify(state.oasiaOperations) ? 0 :  state.originalReviews.asiaOperationsA,
          // single val initiative
          initNameA:  state.initName !==  state.oinitName ? 0 :  state.originalReviews.initNameA,
          initURLA:  state.initURL !==  state.oinitURL ? 0 :  state.originalReviews.initURLA,
          tWomenA:  state.tWomen !==  state.otWomen ? 0 :  state.originalReviews.tWomenA,
          initStartA:  state.initStart !==  state.oinitStart ? 0 :  state.originalReviews.initStartA,
          initEndA:  state.initEnd !==  state.oinitEnd ? 0 :  state.originalReviews.initEndA,
          idescriptionA:  state.idescription !==  state.oidescription ? 0 :  state.originalReviews.idescriptionA,
          programAreaA: 1, //set to approved as this is not based on user input
          initiativeMainProgramActivityA:  state.mainProgramActivity !==  state.omainProgramActivity ? 0 :  state.originalReviews.initiativeMainProgramActivityA,
          feeAccessA:  state.feeAccess !==  state.ofeeAccess ? 0 :  state.originalReviews.feeAccessA,
          // multi val initiative
          regionsA:  JSON.stringify(state.regions) !== JSON.stringify(state.oregions) ? 0 : state.originalReviews.regionsA,
          countriesA:  JSON.stringify(state.countries) !== JSON.stringify(state.ocountries) ? 0 : state.originalReviews.countriesA,
          activitiesA:  JSON.stringify(state.activities) !== JSON.stringify(state.oactivities) ? 0 :  state.originalReviews.activitiesA,
          sourceOfFeesA: 1, //Set to 1 for now, as not a field on form    //props.form.reviews !== undefined ? (props.form.reviews.length > 0 ? (props.form.reviews[0].length > 0 ? (props.form.reviews[0][0] !== undefined ? props.form.reviews[0][0].initSourceOfFeesApproval : null) : null) : null) : null,
          launchCountryA:  JSON.stringify(state.launchCountries) !== JSON.stringify(state.olaunchCountries) ? 0 :  state.originalReviews.launchCountryA,
          targetGeosA:  JSON.stringify(state.targetGeos) !== JSON.stringify(state.otargetGeos) ? 0 :  state.originalReviews.targetGeosA,
          targetPopulationSectorsA: JSON.stringify(state.targetPopulationSectors) !== JSON.stringify(state.otargetPopulationSectors) ? 0 :  state.originalReviews.targetPopulationSectorsA,
          outcomesMonitoredA:  JSON.stringify(state.outcomesMonitored) !== JSON.stringify(state.oOutcomesMonitored) ? 0 :  state.originalReviews.outcomesMonitoredA,
          mEdSubsA:  JSON.stringify(state.mEdSubs) !== JSON.stringify(state.omEdSubs) ? 0 :  state.originalReviews.mEdSubsA,
          oEdSubsA:  JSON.stringify(state.oEdSubs) !== JSON.stringify(state.oOEdSubs) ? 0 :  state.originalReviews.oEdSubsA,
          managementTypesA: JSON.stringify(state.managementTypes) !== JSON.stringify(state.omanagementTypes) ? 0 :  state.originalReviews.managementTypesA,
          // single val implementer
          inameA:  state.iname !==  state.originalImplementerName ? 0 :  state.originalReviews.inameA,
          impMotiveA:  state.impMotive !==  state.oimpMotive ? 0 :  state.originalReviews.impMotiveA,
        }
      };
    }
  }


  buttonMaker(props){
    return <button type="button" onClick={() => {this.removeButton(props)}} ><b>X</b> {props.name}</button>
  }

  removeButton(props){
    if (props.category === "iBase"){
      for (var i = 0; i < this.state.internationalBases.length; i++){ //There is definitely a more efficient solution
        if (this.state.internationalBases[i] === props.name){
          this.state.internationalBases.splice(i, 1);
          this.setState({
            internationalBases: this.state.internationalBases
          })
          break;
        }
      }
    }
    /*else if (props.category === "opLoc"){
      for (var i = 0; i < this.state.operations.length; i++){
        if (this.state.operations[i].key === props.name){
          this.state.operations.splice(i, 1);
          break;
        }
      }
      ReactDOM.render(<ul>{this.state.operations}</ul>, document.getElementById('operationLocations'))
    }*/
    else if (props.category === "initRegions"){
      for (var i = 0; i < this.state.regions.length; i++){
        if (this.state.regions[i] === props.name){
          this.state.regions.splice(i, 1);
          this.setState({
            regions: this.state.regions
          })
          break;
        }
      }
    }
    else if (props.category === "initActivities"){
      for (var i = 0; i < this.state.activities.length; i++){
        if (this.state.activities[i] === props.name){
          this.state.activities.splice(i, 1);
          this.setState({
            activities: this.state.activities
          })
          break;
        }
      }
    }
    else if (props.category === "sourceOfFeesList"){
      for (var i = 0; i < this.state.sourceOfFees.length; i++){
        if (this.state.sourceOfFees[i] === props.name){
          this.state.sourceOfFees.splice(i, 1);
          this.setState({
            sourceOfFees: this.state.sourceOfFees
          })
          break;
        }
      }
    }
    else if (props.category === "outcomesMonitored"){
      for (var i = 0; i < this.state.outcomesMonitored.length; i++){
        if (this.state.outcomesMonitored[i] === props.name){
          this.state.outcomesMonitored.splice(i, 1);
          this.setState({
            outcomesMonitored: this.state.outcomesMonitored
          })
          break;
        }
      }
    }
    else if (props.category === "managementTypes"){
      for (var i = 0; i < this.state.managementTypes.length; i++){
        if (this.state.managementTypes[i] === props.name){
          this.state.managementTypes.splice(i, 1);
          this.setState({
            managementTypes: this.state.managementTypes
          })
          break;
        }
      }
    }
    else if (props.category === "targetPopSector"){
      for (var i = 0; i < this.state.targetPopulationSectors.length; i++){
        if (this.state.targetPopulationSectors[i] === props.name){
          this.state.targetPopulationSectors.splice(i, 1);
          this.setState({
            targetPopulationSectors: this.state.targetPopulationSectors
          })
          break;
        }
      }
    }
    else if (props.category === "aIBases"){
      for (var i = 0; i < this.state.asiaIBases.length; i++){
        if (this.state.asiaIBases[i] === props.name){
          this.state.asiaIBases.splice(i, 1);
          this.setState({
            asiaIBases: this.state.asiaIBases
          })
          break;
        }
      }
    }
    else if (props.category === "asiaOperationLocations"){
      for (var i = 0; i < this.state.asiaOperations.length; i++){
        if (this.state.asiaOperations[i] === props.name){
          this.state.asiaOperations.splice(i, 1);
          this.setState({
            asiaOperations: this.state.asiaOperations
          })
          break;
        }
      }
    }
    else if (props.category === "launchCountries"){
      for (var i = 0; i < this.state.launchCountries.length; i++){
        if (this.state.launchCountries[i] === props.name){
          this.state.launchCountries.splice(i, 1);
          this.setState({
            launchCountries: this.state.launchCountries
          })
          break;
        }
      }
    }
    else{
      for (var i = 0; i < this.state.countries.length; i++){
        if (this.state.countries[i] === props.name){
          this.state.countries.splice(i, 1);
          this.setState({
            countries: this.state.countries
          })
          break;
        }
      }
    }
  }


  addIBase(e){
    var base = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.internationalBases.length; i++){ //There is definitely a more efficient solution
      if (this.state.internationalBases[i] === base){
        present = true;
        break;
      }
    }
    if (!present && base !== "baseCase"){
      this.state.internationalBases.push(base);
      this.setState({
        internationalBases: this.state.internationalBases
      })
    }
  }

  /*addOpLoc(e){
    var country = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.operations.length; i++){ //There is definitely a more efficient solution
      if (this.state.operations[i].key === country){
        present = true;
        break;
      }
    }
    if (!present && country !== "baseCase"){
      this.state.operations.push(<this.buttonMaker key={country} name={country} category="opLoc"/>)
      console.log(country);
      ReactDOM.render(<ul>{this.state.operations}</ul>, document.getElementById('operationLocations'))
    }
  }

  fillOpLoc(){
    for (var i = 0; i < this.state.operations.length; i++){
      this.state.operations[i] = (<this.buttonMaker key={this.state.operations[i]} name={this.state.operations[i]} category="opLoc"/>)
      console.log(this.state.operations[i]);
    }
    ReactDOM.render(<ul>{this.state.operations}</ul>, document.getElementById('operationLocations'))
  }*/

  addInitRegion(e, onStart){
    var region = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.regions.length; i++){ //There is definitely a more efficient solution
      if (this.state.regions[i] === region){
        present = true;
        break;
      }
    }
    if (!present && region !== "baseCase"){
      this.state.regions.push(region)
      this.setState({
        regions: this.state.regions
      })
    }
  }

  addInitCountry(e){
    var country = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.countries.length; i++){ //There is definitely a more efficient solution
      if (this.state.countries[i] === country){
        present = true;
        break;
      }
    }
    if (!present && country !== "baseCase"){
      this.state.countries.push(country)
      this.setState({
        countries: this.state.countries
      })
    }
  }

  addProgramActivity(e){
    var activity = e.currentTarget.value.slice(1);
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.activities.length; i++){ //There is definitely a more efficient solution
      if (this.state.activities[i] === activity){
        present = true;
        break;
      }
    }
    if (!present && activity !== "baseCase"){
      this.state.activities.push(activity)
      this.setState({
        activities: this.state.activities
      })
    }
  }

  addSourceFee(e){
    var source = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.sourceOfFees.length; i++){ //There is definitely a more efficient solution
      if (this.state.sourceOfFees[i] === source){
        present = true;
        break;
      }
    }
    if (!present && source !== "base"){
      this.state.sourceOfFees.push(<this.buttonMaker key={source} name={source} category="sourceOfFeesList"/>)
    }
  }

  addOutcome(e){
    var outcome = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.outcomesMonitored.length; i++){ //There is definitely a more efficient solution
      if (this.state.outcomesMonitored[i] === outcome){
        present = true;
        break;
      }
    }
    if (!present && outcome !== "base"){
      this.state.outcomesMonitored.push(outcome)
      this.setState({
        outcomesMonitored: this.state.outcomesMonitored
      })
    }
  }

  addManagementType(e){
    var type = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.managementTypes.length; i++){ //There is definitely a more efficient solution
      if (this.state.managementTypes[i] === type){
        present = true;
        break;
      }
    }
    if (!present && type !== "base"){
      this.state.managementTypes.push(type)
      this.setState({
        managementTypes: this.state.managementTypes
      })
    }
  }

  addPopSector(e){
    var sector = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.targetPopulationSectors.length; i++){ //There is definitely a more efficient solution
      if (this.state.targetPopulationSectors[i] === sector){
        present = true;
        break;
      }
    }
    if (!present && sector !== "base"){
      this.state.targetPopulationSectors.push(sector)
      this.setState({
        targetPopulationSectors: this.state.targetPopulationSectors
      })
    }
  }

  addAIBase(e){
    var base = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.asiaIBases.length; i++){ //There is definitely a more efficient solution
      if (this.state.asiaIBases[i] === base){
        present = true;
        break;
      }
    }
    if (!present && base !== "base"){
      this.state.asiaIBases.push(base);
      this.setState({
        asiaIBases: this.state.asiaIBases
      })
    }
  }

  addAsiaOperation(e){
    var operation = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.asiaOperations.length; i++){ //There is definitely a more efficient solution
      if (this.state.asiaOperations[i] === operation){
        present = true;
        break;
      }
    }
    if (!present && operation !== "base"){
      this.state.asiaOperations.push(operation)
      this.setState({
        asiaOperations: this.state.asiaOperations
      })
    }
  }

  addLaunchCountry(e){
    var country = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.launchCountries.length; i++){ //There is definitely a more efficient solution
      if (this.state.launchCountries[i] === country){
        present = true;
        break;
      }
    }
    if (!present && country !== "base"){
      this.state.launchCountries.push(country);
      this.setState({
        launchCountries: this.state.launchCountries
      });
    }
  }

  changeProgramArea(e){
    var activity = e.currentTarget.value;
    var updateArea = "";

    if (activity === "Missing"){
      updateArea = "Missing";
    }
    else if (activity === "Unclear"){
      updateArea = "Unclear";
    }
    else if(activity.charAt(0) === 'a'){
      updateArea = "Access to Education";
    }
    else if(activity.charAt(0) === 'w'){
      updateArea = "Skills, Workplace Transition, and Continuing Education";
    }
    else if(activity.charAt(0) === 'e'){
      updateArea = "Education Facilities";
    }
    else if(activity.charAt(0) === 'f'){
      updateArea = "Education Financing";
    }
    else if(activity.charAt(0) === 'g'){
      updateArea = "Educational Governance and School-Based Management";
    }
    else if(activity.charAt(0) === 'p'){
      updateArea = "Private Sector Delivery of Education";
    }
    else if(activity.charAt(0) === 'i'){
      updateArea = "Information and Communications Technology";
    }
    else if(activity.charAt(0) === 'c'){
      updateArea = "Curriculum and Extra-Curricular Support";
    }
    else if(activity.charAt(0) === 's'){
      updateArea = "Student Assessment";
    }
    else if(activity.charAt(0) === 't'){
      updateArea = "Teachers and School Leadership";
    }
    else if(activity.charAt(0) === 'v'){
      updateArea = "Advocacy and Policy";
    }
    else if(activity.charAt(0) === 'o'){
      updateArea = "Other Education";
    }
    else if(activity.charAt(0) === ' '){
      updateArea = "Area Data Missing?";
    }
    //Set Program Area and Main Programming Activity
    this.state.mainProgramActivity = activity.substring(1);
    this.state.programArea = updateArea;
    this.setState({
      mainProgramActivity: this.state.mainProgramActivity,
      programArea: this.state.programArea
    })
  }

  changeOrgTrait(e){
    var orgTrait = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.orgTraits.length; i++){ //There is definitely a more efficient solution
      if (this.state.orgTraits[i] === orgTrait){
        present = true;
        this.state.orgTraits.splice(i, 1);
        break;
      }
    }
    if (!present){
      this.state.orgTraits.push(orgTrait)
    }
    this.setState({
      orgTraits: this.state.orgTraits
    })
  }

  changeEdSub(e){
    var edSub = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.edSubs.length; i++){ //There is definitely a more efficient solution
      if (this.state.edSubs[i] === edSub){
        present = true;
        this.state.edSubs.splice(i, 1);
        break;
      }
    }
    if (!present){
      this.state.edSubs.push(edSub)
    }
    this.setState({
      edSubs: this.state.edSubs
    })
  }

  profitMotiveChange(e){
    this.setState({
      motive: e.currentTarget.value
    });
  }

  organizationChange(e){
    this.setState({
      organizationForm: e.currentTarget.value
    });
  }

  impactChange(e){
    this.setState({
      impact: e.currentTarget.value
    });
  }

  mEdSubChange(e){
    var mEdSub = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.mEdSubs.length; i++){ //There is definitely a more efficient solution
      if (this.state.mEdSubs[i] === mEdSub){
        present = true;
        this.state.mEdSubs.splice(i, 1);
        break;
      }
    }
    if (!present){
      this.state.mEdSubs.push(mEdSub)
    }
    this.setState({
      mEdSubs: this.state.mEdSubs
    })
  }

  oEdSubChange(e){
    var oEdSub = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.oEdSubs.length; i++){ //There is definitely a more efficient solution
      if (this.state.oEdSubs[i] === oEdSub){
        present = true;
        this.state.oEdSubs.splice(i, 1);
        break;
      }
    }
    if (!present){
      this.state.oEdSubs.push(oEdSub)
    }
    this.setState({
      oEdSubs: this.state.oEdSubs
    })
  }

  tWomenChange(e){
    let targetsWomen = e.target.value === "Yes" ? true : false;
    if (targetsWomen === true) {
      this.state.tWomen = "Yes";
    } else {
      this.state.tWomen = "No";
    }
    this.setState({
      tWomen: this.state.tWomen
    });
  }

  geographyChange(e){
    var geo = e.currentTarget.value;
    //Check if it's already there
    var present = false;
    for (var i = 0; i < this.state.targetGeos.length; i++){ //There is definitely a more efficient solution
      if (this.state.targetGeos[i] === geo){
        present = true;
        this.state.targetGeos.splice(i, 1);
        break;
      }
    }
    if (!present){
      this.state.targetGeos.push(geo)
    }
    this.setState({
      targetGeos: this.state.targetGeos
    })
  }

  feeAccessChange(e){
    let feeToAccess = e.currentTarget.value === "Yes" ? true : false;
    if (feeToAccess === true) {
      this.state.feeAccess = "Yes";
    } else {
      this.state.feeAccess = "No";
    }
    this.setState({
      feeAccess: this.state.feeAccess
    });
  }

  impMotiveChange(e){
    this.setState({
      impMotive: e.currentTarget.value
    });
  }

  startYearChange(e) {
    let date = e.target.value + '-01-01'
    this.setState({
      initStart: date
    });
  }

  endYearChange(e) {
    let date = e.target.value + '-01-01'
    this.setState({
      initEnd: date
    });
  }

  fieldStatus(fieldReview) {
    if (this.props.formStatus === 'modify') {
      if (this.state.needsReview === 1) {
        if (fieldReview === 0) {
          return (
            <span class="badge badge-warning">Not approved</span>
          )
        } else {
          return (
            <span class="badge badge-success">Approved</span>
          )
        }
      }
    }
  }

  //Leave with unsaved changes
  handleLeave(e) {
    this.state.isUnsaved = false;
    this.setState({
      isUnsaved: this.state.isUnsaved
    });
    //Return to dashboard
    this.props.history.replace('/dashboard')
  }

  //Stay with unsaved changes
  handleStay(e) {
    this.state.isUnsaved = false;
    this.setState({
      isUnsaved: this.state.isUnsaved
    });
  }

  handleChange(e){
    console.log(e)
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const {formStatus, userData} = this.props;
    //If submitting a new form
    if (formStatus === 'add') {
      if (userData) {
        //If an organization user, then submit to temp db for review
        if (userData.accessLevel === 0) {
          this.props.submitNonRA(this.state, this.props.inDB, false);
        }
        //Otherwise, if an RA or root user, submit directly to main db
        else {
          this.props.submitRA(this.state, false);
        }
      }
    }
    else {
      if (formStatus == 'modify') {
        if (userData) {
          //Check if at least one of the form fields has been updated
          if (this.state.fname !== this.state.originalFunderName ||
            this.state.furl !== this.state.ofurl ||
            this.state.motive !==  this.state.omotive ||
            this.state.impact !==  this.state.oimpact ||
            this.state.organizationForm !==  this.state.oOrganizationForm ||
            JSON.stringify(this.state.internationalBases) !== JSON.stringify(this.state.ointernationalBases) ||
            JSON.stringify(this.state.edSubs) !== JSON.stringify(this.state.oedSubs) ||
            JSON.stringify(this.state.orgTraits) !== JSON.stringify(this.state.oOrgTraits) ||
            JSON.stringify(this.state.asiaIBases) !== JSON.stringify(this.state.oasiaIBases) ||
            JSON.stringify(this.state.asiaOperations) !== JSON.stringify(this.state.oasiaOperations) ||
            this.state.initName !==  this.state.oinitName ||
            this.state.initURL !==  this.state.oinitURL ||
            this.state.tWomen !==  this.state.otWomen ||
            this.state.initStart !==  this.state.oinitStart ||
            this.state.initEnd !==  this.state.oinitEnd ||
            this.state.idescription !==  this.state.oidescription ||
            this.state.mainProgramActivity !==  this.state.omainProgramActivity ||
            this.state.feeAccess !==  this.state.ofeeAccess ||
            JSON.stringify(this.state.regions) !== JSON.stringify(this.state.oregions) ||
            JSON.stringify(this.state.countries) !== JSON.stringify(this.state.ocountries) ||
            JSON.stringify(this.state.activities) !== JSON.stringify(this.state.oactivities) ||
            JSON.stringify(this.state.launchCountries) !== JSON.stringify(this.state.olaunchCountries) ||
            JSON.stringify(this.state.targetGeos) !== JSON.stringify(this.state.otargetGeos) ||
            JSON.stringify(this.state.targetPopulationSectors) !== JSON.stringify(this.state.otargetPopulationSectors) ||
            JSON.stringify(this.state.outcomesMonitored) !== JSON.stringify(this.state.oOutcomesMonitored) ||
            JSON.stringify(this.state.mEdSubs) !== JSON.stringify(this.state.omEdSubs) ||
            JSON.stringify(this.state.oEdSubs) !== JSON.stringify(this.state.oOEdSubs) ||
            JSON.stringify(this.state.managementTypes) !== JSON.stringify(this.state.omanagementTypes) ||
            this.state.iname !==  this.state.originalImplementerName ||
            this.state.impMotive !==  this.state.oimpMotive) {
              this.state.isUpdated = true
          }
          else {
            this.state.isUpdated = false
          }
          this.setState({
            isUpdated: this.state.isUpdated
          });
          //If an organization user, then submit modified form to temp db for review
          if (userData.accessLevel == 0) {
            //Only allow submission if form fields have been updated
            if (this.state.isUpdated === true) {
              for (const [key, value] of Object.entries(this.state.reviews)) {
                //If any field is found to be rejected, then form still requires further review
                if (value == 0) {
                  this.state.needsReview = 1;
                }
                this.setState({
                  needsReview: this.state.needsReview
                })
              }
              this.props.submitModifiedNonRA(this.state, this.props.inDB, true);
            }
          }
          //Otherwise, if an RA or root user, submit modified form directly to main db
          else {
            //Only allow submission if form fields have been updated
            if (this.state.isUpdated === true) {
              //Set all fields to approved if RA is updating the form.
              for (const [key, value] of Object.entries(this.state.reviews)) {
                this.state.reviews[key] = 1
              }
              this.state.needsReview = 0;
              this.setState({
                reviews: this.state.reviews,
                needsReview: this.state.needsReview
              })

              this.props.submitModifiedRA(this.state, true);
            }
          }
        }
      }
    }
  }

  render(){
    const {authorized, formSubmitted, formSubmitError, formStatus, inDB} = this.props;
    if (authorized === false) {
      return <Redirect to='/' />
    }

    if (formSubmitted === true){
      return <Redirect to=
        {{
          pathname: '/form-submission-success',
          state: {submission: true}
        }} />
    }

    const submitError = formSubmitError ?
    <div className="alert alert-dismissible alert-danger" style = {{width: "75%"}}>
      <strong> {formSubmitError} </strong>
    </div> : (
      this.state.isUpdated !== null ? (
        this.state.isUpdated === false ? (
          <div className="alert alert-dismissible alert-warning" style = {{width: "75%"}}>
            <strong>No new updates have been made to this form.</strong> Please make a change before submitting.
          </div>
        ) : null
      ) : null
    );

    const approvalFeedback = formStatus === 'modify' ? (
      inDB === true ? (
        <div class="alert alert-dismissible alert-success">
          <strong>This form has been approved.</strong> The information currently on this form is public.
        </div>
      ) : (
        this.state.needsReview === 0 ? (
          <div class="alert alert-dismissible alert-success">
            <strong>This form has been approved.</strong> The information currently on this form is public.
          </div>
        ) : (
          <div class="alert alert-dismissible alert-danger">
            <strong>This form is under review for approval.</strong> Please review the approval status of the below fields.
          </div>
        )
      )
    ) : null

    const unsavedWarning = this.state.isUnsaved === true ?
    <div className="alert alert-dismissible alert-warning" style = {{width: "100%"}}>
      <strong> You have unsaved changes. </strong>Are you sure you want to leave?
      <button type="button" class="btn btn-warning" style = {{margin: '0 0 0 25px'}} onClick = {this.handleLeave}>Yes</button>
      <button type="button" class="btn btn-warning" style = {{margin: '0 0 0 10px'}} onClick = {this.handleStay}>No</button>
    </div> : null

    return (
        <div className = "formSubmission" style = {{padding: '50px 200px 0 200px'}}>
          <h3>Form Submission</h3>
          <div>
            <br></br>
            {unsavedWarning}
            {approvalFeedback}
            <form onSubmit={this.handleFormSubmit}>

            <h4>Funder</h4>

            <p>Name</p>
              <input type="text" id="fname" name="funderName" value={this.state.fname} placeholder="Funder Name" onChange={this.handleChange}/>
              {this.fieldStatus(this.state.originalReviews.fnameA)}
              <br></br><br></br>

            <p>Website</p>
              <input type="text" id="furl" name="funderWebsite" value={this.state.furl} placeholder="funderWebsite.com" onChange={this.handleChange}/>
              {this.fieldStatus(this.state.originalReviews.furlA)}
              <br></br><br></br>

            <p>Profit Motive</p>
              <input type="radio" id="motive1" name="profitMotive" value="Not-for-profit" checked = {this.state.motive === 'Not-for-profit'} onChange={this.profitMotiveChange}/> <label htmlFor="motive1">Not-For-Profit</label>
              <input type="radio" id="motive2" name="profitMotive" value="Hybrid" checked = {this.state.motive === 'Hybrid'} onChange={this.profitMotiveChange}/> <label htmlFor="motive2">Hybrid</label>
              <input type="radio" id="motive3" name="profitMotive" value="For-profit" checked = {this.state.motive === 'For-profit'} onChange={this.profitMotiveChange}/> <label htmlFor="motive3">For-Profit</label>
            <br></br>
            {this.fieldStatus(this.state.originalReviews.motiveA)}
            <br></br><br></br>

            <p>Impact Investing?</p>
              <input type="radio" id="impact1" name="impactInvesting" value="Yes" checked = {this.state.impact === 'Yes'} onChange={this.impactChange}/> <label htmlFor="impact1">Yes</label>
              <input type="radio" id="impact2" name="impactInvesting" value="No" checked = {this.state.impact === 'No'} onChange={this.impactChange}/> <label htmlFor="impact2">No</label>
              <input type="radio" id="impact3" name="impactInvesting" value="Unknown" checked = {this.state.impact === 'Unknown'} onChange={this.impactChange}/> <label htmlFor="impact3">Unknown</label>
            <br></br>
            {this.fieldStatus(this.state.originalReviews.impactA)}
            <br></br><br></br>

            <p>Organizational Form</p>
              <input type="radio" id="organization1" name="organizationalForm" value="Private Foundation" checked = {this.state.organizationForm === 'Private Foundation'} onChange={this.organizationChange}/> <label htmlFor="organization1">Private Foundation</label>
              <input type="radio" id="organization2" name="organizationalForm" value="Impact Investor" checked = {this.state.organizationForm === 'Impact Investor'} onChange={this.organizationChange}/> <label htmlFor="organization2">Impact Investor</label>
              <input type="radio" id="organization3" name="organizationalForm" value="Invenstment Firm / Fund Manager / Fund Advisor or Consultancy Services" checked = {this.state.organizationForm === 'Invenstment Firm / Fund Manager / Fund Advisor or Consultancy Services'} onChange={this.organizationChange}/> <label htmlFor="organization3">Investment Firm / Fund Manager / Fund Advisor or Consultancy Services</label>
              <input type="radio" id="organization4" name="organizationalForm" value="Charity / NGO" checked = {this.state.organizationForm === 'Charity / NGO'} onChange={this.organizationChange}/> <label htmlFor="organization4">Charity / NGO</label>
              <input type="radio" id="organization5" name="organizationalForm" value="State / Government" checked = {this.state.organizationForm === 'State / Government'} onChange={this.organizationChange}/> <label htmlFor="organization5">State / Government</label>
              <input type="radio" id="organization6" name="organizationalForm" value="Network or Platform" checked = {this.state.organizationForm === 'Network or Platform'} onChange={this.organizationChange}/> <label htmlFor="organization6">Network or Platform</label>
              <input type="radio" id="organization7" name="organizationalForm" value="CSR Initiative / unit" checked = {this.state.organizationForm === 'CSR initiative / unit'} onChange={this.organizationChange}/> <label htmlFor="organization7">CSR Initiative / Unit</label>
              <input type="radio" id="organization8" name="organizationalForm" value="Multilateral" checked = {this.state.organizationForm === 'Multilateral'} onChange={this.organizationChange}/> <label htmlFor="organization8">Multilateral</label>
              <input type="radio" id="organization9" name="organizationalForm" value="Other" checked = {this.state.organizationForm === 'Other'} onChange={this.organizationChange}/> <label htmlFor="organization9">Other</label>
            <br></br>
            {this.fieldStatus(this.state.originalReviews.organizationFormA)}
            <br></br><br></br>

            <p>International Base(s)</p>
            <select id="internationalBase" name="country" onChange={this.addIBase}>
            <option value="baseCase">Choose the International Base Countries</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
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
            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="British Virgin Islands">British Virgin Islands</option>
            <option value="Brunei Darussalam">Brunei Darussalam</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cabo Verde">Cabo Verde</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Caymen Islands">Caymen Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Channel Islands">Channel Islands</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo, Dem. Rep.">Congo, Dem. Rep.</option>
            <option value="Congo, Rep.">Congo, Rep.</option>
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
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt, Arab Rep.">Egypt, Arab Rep.</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="Indonesia">Indonesia</option>
            <option value="India">India</option>
            <option value="Iran, Islamic Rep.">Iran, Islamic Rep.</option>
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
            <option value="Korea, Dem. People's Rep.">Korea, Dem. People's Rep.</option>
            <option value="Korea, Rep.">Korea, Rep.</option>
            <option value="Kosovo">Kosovo</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzs Republic">Kyrgyzs Republic</option>
            <option value="Lao PDR">Lao PDR</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macau SAR, China">Macau SAR, China</option>
            <option value="Macedonia, FYR">Macedonia, FYR</option>
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
            <option value="Mexico">Mexico</option>
            <option value="Micronesia, Fed. Sts.">Micronesia, Fed. Sts.</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Phillipines">Philippines</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Romania">Romania</option>
            <option value="Russian Federation">Russian Federation</option>
            <option value="Rwanda">Rwanda</option>
            <option value="St Kitts and Nevis">St Kitts and Nevis</option>
            <option value="St Lucia">St Lucia</option>
            <option value="St Marten (French Part)">St Marten (French Part)</option>
            <option value="St Vincent & the Grenadines">St Vincent & the Grenadines</option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome & Principe">Sao Tome & Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Sint Maarten (Dutch Part)">Sint Maarten (Dutch Part)</option>
            <option value="Slovak Republic">Slovak Republic</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Sudan">South Sudan</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
            <option value="Tahiti">Tahiti</option>
            <option value="Taiwan, China">Taiwan, China</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Timor-Leste">Timor-Leste</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad & Tobago">Trinidad & Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks & Caicos Island">Turks & Caicos Island</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Erimates">United Arab Emirates</option>
            <option value="United States">United States</option>
            <option value="Uraguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City">Vatican City</option>
            <option value="Venezuela, RB">Venezuela, RB</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
            <option value="West Bank and Gaza">West Bank and Gaza</option>
            <option value="Yemen, Rep.">Yemen, Rep.</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
            </select>

            <div id="iBases">
              <ul>
              {
                this.state.internationalBases.map(base => {
                  return (
                    <this.buttonMaker key={base} name={base} category="iBase"/>
                  );
                })
              }
              </ul>
            </div>
            {this.fieldStatus(this.state.originalReviews.internationalBasesA)}
            <br></br><br></br>

            <p>Education Subsector(s)<br></br>Select all that apply:</p>
            <input type="checkbox" id="edSub1" name="educationSubsector" value="Adult" checked = {this.state.edSubs.includes("Adult")} onChange={this.changeEdSub}/> <label htmlFor="edSub1" className="checkbox">Adult</label>
            <input type="checkbox" id="edSub2" name="educationSubsector" value="Adult Basic and Continuing Education" checked = {this.state.edSubs.includes("Adult Basic and Continuing Education")}  onChange={this.changeEdSub}/> <label htmlFor="edSub2" className="checkbox">Adult Basic and Continuing Education</label>
            <input type="checkbox" id="edSub3" name="educationSubsector" value="All Education Sub-Sectors" checked = {this.state.edSubs.includes("All Education Sub-Sectors")} onChange={this.changeEdSub}/> <label htmlFor="edSub3" className="checkbox">All Education Sub-Sectors</label>
            <input type="checkbox" id="edSub4" name="educationSubsector" value="All sector data missing or unclear" checked = {this.state.edSubs.includes("All sector data missing or unclear")} onChange={this.changeEdSub}/> <label htmlFor="edSub4" className="checkbox">All sector data missing or unclear</label>
            <input type="checkbox" id="edSub5" name="educationSubsector" value="Basic and Continuing Education" checked = {this.state.edSubs.includes("Basic and Continuing Education")} onChange={this.changeEdSub}/> <label htmlFor="edSub5" className="checkbox">Basic and Continuing Education</label>
            <input type="checkbox" id="edSub6" name="educationSubsector" value="Early Childhood Education" checked = {this.state.edSubs.includes("Early Childhood Education")} onChange={this.changeEdSub}/> <label htmlFor="edSub6" className="checkbox">Early Childhood Education</label>
            <input type="checkbox" id="edSub7" name="educationSubsector" value="Education Facilities" checked = {this.state.edSubs.includes("Education Facilities")} onChange={this.changeEdSub}/> <label htmlFor="edSub7" className="checkbox">Education Facilities</label>
            <input type="checkbox" id="edSub8" name="educationSubsector" value="Education Sub-sector unclear" checked = {this.state.edSubs.includes("Education Sub-sector unclear")} onChange={this.changeEdSub}/> <label htmlFor="edSub8" className="checkbox">Education Sub-sector unclear</label>
            <input type="checkbox" id="edSub9" name="educationSubsector" value="Main Education Sub-Sector" checked = {this.state.edSubs.includes("Main Education Sub-Sector")} onChange={this.changeEdSub}/> <label htmlFor="edSub9" className="checkbox">Main Education Sub-Sector</label>
            <input type="checkbox" id="edSub10" name="educationSubsector" value="Missing data" checked = {this.state.edSubs.includes("Missing data")} onChange={this.changeEdSub}/> <label htmlFor="edSub10" className="checkbox">Missing data</label>
            <input type="checkbox" id="edSub11" name="educationSubsector" value="No Education" checked = {this.state.edSubs.includes("No Education")} onChange={this.changeEdSub}/> <label htmlFor="edSub11" className="checkbox">No Education</label>
            <input type="checkbox" id="edSub12" name="educationSubsector" value="Other Education" checked = {this.state.edSubs.includes("Other Education")} onChange={this.changeEdSub}/> <label htmlFor="edSub12" className="checkbox">Other Education</label>
            <input type="checkbox" id="edSub13" name="educationSubsector" value="Primary Education" checked = {this.state.edSubs.includes("Primary Education")} onChange={this.changeEdSub}/> <label htmlFor="edSub13" className="checkbox">Primary Education</label>
            <input type="checkbox" id="edSub14" name="educationSubsector" value="Public Administration – Education" checked = {this.state.edSubs.includes("Public Administration – Education")} onChange={this.changeEdSub}/> <label htmlFor="edSub14" className="checkbox">Public Administration – Education</label>
            <input type="checkbox" id="edSub15" name="educationSubsector" value="Secondary Education" checked = {this.state.edSubs.includes("Secondary Education")} onChange={this.changeEdSub}/> <label htmlFor="edSub15" className="checkbox">Secondary Education</label>
            <input type="checkbox" id="edSub16" name="educationSubsector" value="Tertiary Education" checked = {this.state.edSubs.includes("Tertiary Education")} onChange={this.changeEdSub}/> <label htmlFor="edSub16" className="checkbox">Tertiary Education</label>
            <input type="checkbox" id="edSub17" name="educationSubsector" value="Unclear" checked = {this.state.edSubs.includes("Unclear")} onChange={this.changeEdSub}/> <label htmlFor="edSub17" className="checkbox">Unclear</label>
            <input type="checkbox" id="edSub18" name="educationSubsector" value="Workforce Development and Vocational Education" checked = {this.state.edSubs.includes("Workforce Development and Vocational Education")} onChange={this.changeEdSub}/> <label htmlFor="edSub18" className="checkbox">Workforce Development and Vocational Education</label>
            <input type="checkbox" id="edSub19" name="educationSubsector" value="Workforce Development/Skills" checked = {this.state.edSubs.includes("Workforce Development/Skills")} onChange={this.changeEdSub}/> <label htmlFor="edSub19" className="checkbox">Workforce Development/Skills</label>
            <br></br>
            {this.fieldStatus(this.state.originalReviews.edSubsA)}
            <br></br><br></br>

            <p>Organizational Trait(s)<br></br>Select all that apply:</p>
            <input type="checkbox" id="orgTrait1" name="organizationalTrait" value="Aim to address issues of common good" checked = {this.state.orgTraits.includes("Aim to address issues of common good")} onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait1" className="checkbox">Aim to address issues of common good</label>
            <input type="checkbox" id="orgTrait2" name="organizationalTrait" value="All sector data missing or unclear" checked = {this.state.orgTraits.includes("All sector data missing or unclear")} onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait2" className="checkbox">All sector data missing or unclear</label>
            <input type="checkbox" id="orgTrait3" name="organizationalTrait" value="Commitment to measurement" checked = {this.state.orgTraits.includes("Commitment to measurement")} onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait3" className="checkbox">Commitment to measurement</label>
            <input type="checkbox" id="orgTrait4" name="organizationalTrait" value="Education Sub-sector unclear" checked = {this.state.orgTraits.includes("Education Sub-sector unclear")} onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait4" className="checkbox">Education Sub-sector unclear</label>
            <input type="checkbox" id="orgTrait5" name="organizationalTrait" value="Expects return on investment" checked = {this.state.orgTraits.includes("Expects return on investment")} onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait5" className="checkbox">Expects return on investment</label>
            <input type="checkbox" id="orgTrait6" name="organizationalTrait" value="Explicit intention to have social impact in the education sector" checked = {this.state.orgTraits.includes("Explicit intention to have social impact in the education sector")} onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait6" className="checkbox">Explicit intention to have social impact in the education sector</label>
            <input type="checkbox" id="orgTrait7" name="organizationalTrait" value="Led by independent board of trustees or CEO" checked = {this.state.orgTraits.includes("Led by independent board of trustees or CEO")} onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait7" className="checkbox">Led by independent board of trustees or CEO</label>
            <input type="checkbox" id="orgTrait8" name="organizationalTrait" value="Not part of the public sector" checked = {this.state.orgTraits.includes("Not part of the public sector")} onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait8" className="checkbox">Not part of the public sector</label>
            <input type="checkbox" id="orgTrait9" name="organizationalTrait" value="Not-for-profit oriented" checked = {this.state.orgTraits.includes("Not-for-profit oriented")} onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait9" className="checkbox">Not-for-profit oriented</label>
            <input type="checkbox" id="orgTrait10" name="organizationalTrait" value="Organizational Traits" checked = {this.state.orgTraits.includes("Organizational Traits")} onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait10" className="checkbox">Organizational Traits</label>
            <input type="checkbox" id="orgTrait11" name="organizationalTrait" value="Secondary Education" checked = {this.state.orgTraits.includes("Secondary Education")} onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait11" className="checkbox">Secondary Education</label>
            <input type="checkbox" id="orgTrait12" name="organizationalTrait" value="Use own financial resources (unlike NGOs)" checked = {this.state.orgTraits.includes("Use own financial resources (unlike NGOs)")} onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait12" className="checkbox">Use own financial resources (unlike NGOs)</label>
            <input type="checkbox" id="orgTrait13" name="organizationalTrait" value="Workforce Development/Skills" checked = {this.state.orgTraits.includes("Workforce Development/Skills")} onChange={this.changeOrgTrait}/> <label htmlFor="orgTrait13" className="checkbox">Workforce Development/Skills</label>
            <br></br>
            {this.fieldStatus(this.state.originalReviews.orgTraitsA)}
            <br></br><br></br>

            <p>Asia International Base(s)</p>
            <select id="asiaInternationalBase" name="country" onChange={this.addAIBase}>
            <option value="baseCase">Choose the International Base Countries in Asia</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
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
            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="British Virgin Islands">British Virgin Islands</option>
            <option value="Brunei Darussalam">Brunei Darussalam</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cabo Verde">Cabo Verde</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Caymen Islands">Caymen Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Channel Islands">Channel Islands</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo, Dem. Rep.">Congo, Dem. Rep.</option>
            <option value="Congo, Rep.">Congo, Rep.</option>
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
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt, Arab Rep.">Egypt, Arab Rep.</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="Indonesia">Indonesia</option>
            <option value="India">India</option>
            <option value="Iran, Islamic Rep.">Iran, Islamic Rep.</option>
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
            <option value="Korea, Dem. People's Rep.">Korea, Dem. People's Rep.</option>
            <option value="Korea, Rep.">Korea, Rep.</option>
            <option value="Kosovo">Kosovo</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzs Republic">Kyrgyzs Republic</option>
            <option value="Lao PDR">Lao PDR</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macau SAR, China">Macau SAR, China</option>
            <option value="Macedonia, FYR">Macedonia, FYR</option>
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
            <option value="Mexico">Mexico</option>
            <option value="Micronesia, Fed. Sts.">Micronesia, Fed. Sts.</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Phillipines">Philippines</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Romania">Romania</option>
            <option value="Russian Federation">Russian Federation</option>
            <option value="Rwanda">Rwanda</option>
            <option value="St Kitts and Nevis">St Kitts and Nevis</option>
            <option value="St Lucia">St Lucia</option>
            <option value="St Marten (French Part)">St Marten (French Part)</option>
            <option value="St Vincent & the Grenadines">St Vincent & the Grenadines</option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome & Principe">Sao Tome & Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Sint Maarten (Dutch Part)">Sint Maarten (Dutch Part)</option>
            <option value="Slovak Republic">Slovak Republic</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Sudan">South Sudan</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
            <option value="Tahiti">Tahiti</option>
            <option value="Taiwan, China">Taiwan, China</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Timor-Leste">Timor-Leste</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad & Tobago">Trinidad & Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks & Caicos Island">Turks & Caicos Island</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Erimates">United Arab Emirates</option>
            <option value="United States">United States</option>
            <option value="Uraguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City">Vatican City</option>
            <option value="Venezuela, RB">Venezuela, RB</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
            <option value="West Bank and Gaza">West Bank and Gaza</option>
            <option value="Yemen, Rep.">Yemen, Rep.</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
            </select>

            <div id="aIBases">
              <ul>
              {
                this.state.asiaIBases.map(base => {
                  return (
                    <this.buttonMaker key={base} name={base} category="aIBases"/>
                  );
                })
              }
              </ul>
            </div>
            {/* MAKE ASIA INTERNATIONAL BASE NOT ACCEPT BASE CASE */}
            {this.fieldStatus(this.state.originalReviews.asialBasesA)}
            <br></br><br></br>

            <p>Asia Operation(s)</p>
            <select id="aOperations" name="opCountry" onChange={this.addAsiaOperation}>
            <option value="baseCase">Choose the Countries of Operation</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
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
            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="British Virgin Islands">British Virgin Islands</option>
            <option value="Brunei Darussalam">Brunei Darussalam</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cabo Verde">Cabo Verde</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Caymen Islands">Caymen Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Channel Islands">Channel Islands</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo, Dem. Rep.">Congo, Dem. Rep.</option>
            <option value="Congo, Rep.">Congo, Rep.</option>
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
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt, Arab Rep.">Egypt, Arab Rep.</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="Indonesia">Indonesia</option>
            <option value="India">India</option>
            <option value="Iran, Islamic Rep.">Iran, Islamic Rep.</option>
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
            <option value="Korea, Dem. People's Rep.">Korea, Dem. People's Rep.</option>
            <option value="Korea, Rep.">Korea, Rep.</option>
            <option value="Kosovo">Kosovo</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzs Republic">Kyrgyzs Republic</option>
            <option value="Lao PDR">Lao PDR</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macau SAR, China">Macau SAR, China</option>
            <option value="Macedonia, FYR">Macedonia, FYR</option>
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
            <option value="Mexico">Mexico</option>
            <option value="Micronesia, Fed. Sts.">Micronesia, Fed. Sts.</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Phillipines">Philippines</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Romania">Romania</option>
            <option value="Russian Federation">Russian Federation</option>
            <option value="Rwanda">Rwanda</option>
            <option value="St Kitts and Nevis">St Kitts and Nevis</option>
            <option value="St Lucia">St Lucia</option>
            <option value="St Marten (French Part)">St Marten (French Part)</option>
            <option value="St Vincent & the Grenadines">St Vincent & the Grenadines</option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome & Principe">Sao Tome & Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Sint Maarten (Dutch Part)">Sint Maarten (Dutch Part)</option>
            <option value="Slovak Republic">Slovak Republic</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Sudan">South Sudan</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
            <option value="Tahiti">Tahiti</option>
            <option value="Taiwan, China">Taiwan, China</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Timor-Leste">Timor-Leste</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad & Tobago">Trinidad & Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks & Caicos Island">Turks & Caicos Island</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Erimates">United Arab Emirates</option>
            <option value="United States">United States</option>
            <option value="Uraguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City">Vatican City</option>
            <option value="Venezuela, RB">Venezuela, RB</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
            <option value="West Bank and Gaza">West Bank and Gaza</option>
            <option value="Yemen, Rep.">Yemen, Rep.</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
            </select>

            <div id="asiaOperationLocations">
              <ul>
                {
                  this.state.asiaOperations.map(operation => {
                    return (
                      <this.buttonMaker key={operation} name={operation} category="asiaOperationLocations"/>
                    );
                  })
                }
              </ul>
            </div>
            {this.fieldStatus(this.state.originalReviews.asiaOperationsA)}
            <br></br><br></br>

            <h4>Initiative</h4>

            <p>Name</p>
              <input type="text" id="initName" name="initiativeName" value = {this.state.initName} placeholder="Initiative Name" onChange={this.handleChange}/>
            {this.fieldStatus(this.state.originalReviews.initNameA)}
            <br></br><br></br>

            <p>Website</p>
              <input type="text" id="initURL" name="initiativeWebsite" value = {this.state.initURL} placeholder="initiativeWebsite.com" onChange={this.handleChange}/>
            {this.fieldStatus(this.state.originalReviews.initURLA)}
            <br></br><br></br>

            <p>Targets Women?</p>
              <input type="radio" id="tWomen1" name="targetsWomen" value="Yes" checked = {this.state.tWomen === "Yes"} onChange={this.tWomenChange}/> <label htmlFor="tWomen1">Yes</label>
              <input type="radio" id="tWomen2" name="targetsWomen" value="No" checked = {this.state.tWomen === "No"} onChange={this.tWomenChange}/> <label htmlFor="tWomen2">No</label>
            <br></br>
            {this.fieldStatus(this.state.originalReviews.tWomenA)}
            <br></br><br></br>

            <p>Start Year</p>
              <input type="number" id="initStart" name="startYear" defaultValue={this.state.initStart} placeholder="Start Year" onChange={this.startYearChange}/>
            <br></br>
            {this.fieldStatus(this.state.originalReviews.initStartA)}
            <br></br><br></br>

            <p>End Year</p>
              <input type="number" id="initEnd" name="endYear" defaultValue={this.state.initEnd} placeholder="End Year" onChange={this.endYearChange}/>
            <br></br>
            {this.fieldStatus(this.state.originalReviews.initEndA)}
            <br></br><br></br>

            <p>Launch Countries</p>
            <select id="launchCountry" name="launchCountry" onChange={this.addLaunchCountry}>
            <option value="baseCase">Choose the Countries of Operation</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
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
            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="British Virgin Islands">British Virgin Islands</option>
            <option value="Brunei Darussalam">Brunei Darussalam</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cabo Verde">Cabo Verde</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Caymen Islands">Caymen Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Channel Islands">Channel Islands</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo, Dem. Rep.">Congo, Dem. Rep.</option>
            <option value="Congo, Rep.">Congo, Rep.</option>
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
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt, Arab Rep.">Egypt, Arab Rep.</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="Indonesia">Indonesia</option>
            <option value="India">India</option>
            <option value="Iran, Islamic Rep.">Iran, Islamic Rep.</option>
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
            <option value="Korea, Dem. People's Rep.">Korea, Dem. People's Rep.</option>
            <option value="Korea, Rep.">Korea, Rep.</option>
            <option value="Kosovo">Kosovo</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzs Republic">Kyrgyzs Republic</option>
            <option value="Lao PDR">Lao PDR</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macau SAR, China">Macau SAR, China</option>
            <option value="Macedonia, FYR">Macedonia, FYR</option>
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
            <option value="Mexico">Mexico</option>
            <option value="Micronesia, Fed. Sts.">Micronesia, Fed. Sts.</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Phillipines">Philippines</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Romania">Romania</option>
            <option value="Russian Federation">Russian Federation</option>
            <option value="Rwanda">Rwanda</option>
            <option value="St Kitts and Nevis">St Kitts and Nevis</option>
            <option value="St Lucia">St Lucia</option>
            <option value="St Marten (French Part)">St Marten (French Part)</option>
            <option value="St Vincent & the Grenadines">St Vincent & the Grenadines</option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome & Principe">Sao Tome & Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Sint Maarten (Dutch Part)">Sint Maarten (Dutch Part)</option>
            <option value="Slovak Republic">Slovak Republic</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Sudan">South Sudan</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
            <option value="Tahiti">Tahiti</option>
            <option value="Taiwan, China">Taiwan, China</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Timor-Leste">Timor-Leste</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad & Tobago">Trinidad & Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks & Caicos Island">Turks & Caicos Island</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Erimates">United Arab Emirates</option>
            <option value="United States">United States</option>
            <option value="Uraguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City">Vatican City</option>
            <option value="Venezuela, RB">Venezuela, RB</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
            <option value="West Bank and Gaza">West Bank and Gaza</option>
            <option value="Yemen, Rep.">Yemen, Rep.</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
            </select>

            <div id="launchCountries">
              <ul>
              {
                this.state.launchCountries.map(country => {
                  return (
                    <this.buttonMaker key={country} name={country} category="launchCountries"/>
                  );
                })
              }
              </ul>
            </div>
            {this.fieldStatus(this.state.originalReviews.launchCountryA)}
            <br></br><br></br>

            <p>Description</p>
            <textarea id="idescription" name="description" value = {this.state.idescription} placeholder="Write a description" onChange={this.handleChange}></textarea>
            {this.fieldStatus(this.state.originalReviews.idescriptionA)}
            <br></br><br></br>

            <p>Region(s)</p>
            <select id="region" name="regions" onChange={this.addInitRegion}>
            <option value="base">Choose a Region of the World</option>
            <option value="Arab World">Arab World</option>
            <option value="Caribbean Small States ">Caribbean Small States </option>
            <option value="Central Europe and the Baltics">Central Europe and the Baltics</option>
            <option value="Early-Demographic Dividend">Early-Demographic Dividend</option>
            <option value="East Asia & Pacific">East Asia & Pacific</option>
            <option value="East Asia & Pacific (Excluding High Income)">East Asia & Pacific (Excluding High Income)</option>
            <option value="East Asia & Pacific (IDA & IBRD)">East Asia & Pacific (IDA & IBRD)</option>
            <option value="Euro Area">Euro Area</option>
            <option value="Europe & Central Asia">Europe & Central Asia</option>
            <option value="Europe & Central Asia (Excluding High Income)">Europe & Central Asia (Excluding High Income)</option>
            <option value="Europe & Central Asia (IDA & IBRD)">Europe & Central Asia (IDA & IBRD)</option>
            <option value="European Union">European Union</option>
            <option value="Fragile and Conflict Affected Situations">Fragile and Conflict Affected Situations</option>
            <option value="Heavily Indebted Poor Countries (HIPC)">Heavily Indebted Poor Countries (HIPC)</option>
            <option value="High Income">High Income</option>
            <option value="IBRD Only">IBRD Only</option>
            <option value="IDA & IBRD Total">IDA & IBRD Total</option>
            <option value="IDA Blend">IDA Blend</option>
            <option value="IDA Only">IDA Only</option>
            <option value="IDA Total">IDA Total</option>
            <option value="Late-Demographic Dividend">Late-Demographic Dividend</option>
            <option value="Latin America & Caribbean">Latin America & Caribbean</option>
            <option value="Latin America & Caribbean (Excluding High Income)">Latin America & Caribbean (Excluding High Income)</option>
            <option value="Latin America & Caribbean (IDA & IBRD)">Latin America & Caribbean (IDA & IBRD)</option>
            <option value="Least Developed Countries: UN Classification">Least Developed Countries: UN Classification</option>
            <option value="Low & Middle Income">Low & Middle Income</option>
            <option value="Low Income">Low Income</option>
            <option value="Lower Middle Income">Lower Middle Income</option>
            <option value="Middle East & North Africa">Middle East & North Africa</option>
            <option value="Middle East & North Africa (Excluding High Income)">Middle East & North Africa (Excluding High Income)</option>
            <option value="Middle East & North Africa (IDA & IBRD)">Middle East & North Africa (IDA & IBRD)</option>
            <option value="Middle Income">Middle Income</option>
            <option value="North America">North America</option>
            <option value="OECD Members">OECD Members</option>
            <option value="Other Small States">Other Small States</option>
            <option value="Pacific Island Small States">Pacific Island Small States</option>
            <option value="Post-Demographic Dividend">Post-Demographic Dividend</option>
            <option value="Pre-Demographic Dividend">Pre-Demographic Dividend</option>
            <option value="Small States">Small States</option>
            <option value="South Asia">South Asia</option>
            <option value="South Asia (IDA & IBRD)">South Asia (IDA & IBRD)</option>
            <option value="Sub-Saharan Africa">Sub-Saharan Africa</option>
            <option value="Sub-Saharan Africa (Excluding High Income)">Sub-Saharan Africa (Excluding High Income)</option>
            <option value="Sub-Saharan Africa (IDA & IBRD)">Sub-Saharan Africa (IDA & IBRD)</option>
            <option value="Upper Middle Income">Upper Middle Income</option>
            <option value="World">World</option>
            {/* ???? I'm not sure about these */}
            <option value="Global">Global</option>
            <option value="Middle East and North Africa">Middle East and North Africa</option>
            <option value="Latin America and Caribbean">Latin America and Caribbean</option>
            <option value="East Asia and Pacific">East Asia and Pacific</option>
            <option value="Europe and Central Asia">Europe and Central Asia</option>
            <option value="World">World</option>
            <option value="World">World</option>
            </select>

            <div id="initRegions">
              <ul>
                {
                  this.state.regions.map(region => {
                    return (
                      <this.buttonMaker key={region} name={region} category="initRegions"/>
                    );
                  })
                }
              </ul>
            </div>
            {this.fieldStatus(this.state.originalReviews.regionsA)}
            <br></br><br></br>

            <p>Countries</p>
            <select id="initCountry" name="initiativeCountry" onChange={this.addInitCountry}>
            <option value="baseCase">Choose a Country</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
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
            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="British Virgin Islands">British Virgin Islands</option>
            <option value="Brunei Darussalam">Brunei Darussalam</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cabo Verde">Cabo Verde</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Caymen Islands">Caymen Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Channel Islands">Channel Islands</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo, Dem. Rep.">Congo, Dem. Rep.</option>
            <option value="Congo, Rep.">Congo, Rep.</option>
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
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt, Arab Rep.">Egypt, Arab Rep.</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="Indonesia">Indonesia</option>
            <option value="India">India</option>
            <option value="Iran, Islamic Rep.">Iran, Islamic Rep.</option>
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
            <option value="Korea, Dem. People's Rep.">Korea, Dem. People's Rep.</option>
            <option value="Korea, Rep.">Korea, Rep.</option>
            <option value="Kosovo">Kosovo</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzs Republic">Kyrgyzs Republic</option>
            <option value="Lao PDR">Lao PDR</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macau SAR, China">Macau SAR, China</option>
            <option value="Macedonia, FYR">Macedonia, FYR</option>
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
            <option value="Mexico">Mexico</option>
            <option value="Micronesia, Fed. Sts.">Micronesia, Fed. Sts.</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Phillipines">Philippines</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Romania">Romania</option>
            <option value="Russian Federation">Russian Federation</option>
            <option value="Rwanda">Rwanda</option>
            <option value="St Kitts and Nevis">St Kitts and Nevis</option>
            <option value="St Lucia">St Lucia</option>
            <option value="St Marten (French Part)">St Marten (French Part)</option>
            <option value="St Vincent & the Grenadines">St Vincent & the Grenadines</option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome & Principe">Sao Tome & Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Sint Maarten (Dutch Part)">Sint Maarten (Dutch Part)</option>
            <option value="Slovak Republic">Slovak Republic</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Sudan">South Sudan</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
            <option value="Tahiti">Tahiti</option>
            <option value="Taiwan, China">Taiwan, China</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Timor-Leste">Timor-Leste</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad & Tobago">Trinidad & Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks & Caicos Island">Turks & Caicos Island</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Erimates">United Arab Emirates</option>
            <option value="United States">United States</option>
            <option value="Uraguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City">Vatican City</option>
            <option value="Venezuela, RB">Venezuela, RB</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
            <option value="West Bank and Gaza">West Bank and Gaza</option>
            <option value="Yemen, Rep.">Yemen, Rep.</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
            </select>

            <div id="initCountries">
              <ul>
                {
                  this.state.countries.map(country => {
                    return (
                      <this.buttonMaker key={country} name={country} category="initCountries"/>
                    );
                  })
                }
              </ul>
            </div>
            {this.fieldStatus(this.state.originalReviews.countriesA)}
            <br></br><br></br>

            <p>Target Geography</p>
              <input type="checkbox" id="geography1" name="targetGeo" value="Urban" checked = {this.state.targetGeos.includes("Urban")} onChange={this.geographyChange}/> <label htmlFor="geography1" className="checkbox">Urban</label>
              <input type="checkbox" id="geography2" name="targetGeo" value="Peri-Urban" checked = {this.state.targetGeos.includes("Peri-Urban")} onChange={this.geographyChange}/> <label htmlFor="geography2" className="checkbox">Peri-Urban</label>
              <input type="checkbox" id="geography3" name="targetGeo" value="Rural" checked = {this.state.targetGeos.includes("Rural")} onChange={this.geographyChange}/> <label htmlFor="geography3" className="checkbox">Rural</label>
              <input type="checkbox" id="geography4" name="targetGeo" value="Online community" checked = {this.state.targetGeos.includes("Online community")} onChange={this.geographyChange}/> <label htmlFor="geography4" className="checkbox">Online community</label>
              <input type="checkbox" id="geography5" name="targetGeo" value="children with special needs" checked = {this.state.targetGeos.includes("children with special needs")} onChange={this.geographyChange}/> <label htmlFor="geography5" className="checkbox">children with special needs</label>
              <input type="checkbox" id="geography6" name="targetGeo" value="Unclear" checked = {this.state.targetGeos.includes("Unclear")} onChange={this.geographyChange}/> <label htmlFor="geography6" className="checkbox">Unclear</label>
              <input type="checkbox" id="geography7" name="targetGeo" value="Missing" checked = {this.state.targetGeos.includes("Missing")} onChange={this.geographyChange}/> <label htmlFor="geography7" className="checkbox">Missing</label>
            <br></br>
            {this.fieldStatus(this.state.originalReviews.targetGeosA)}
            <br></br><br></br>

            <p>Main Education Subsector</p>
            <input type="checkbox" id="iEdSub1" name="educationSubsector" value="Adult" checked = {this.state.mEdSubs.includes("Adult")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub1" className="checkbox">Adult</label>
            <input type="checkbox" id="iEdSub2" name="educationSubsector" value="Adult Basic and Continuing Education" checked = {this.state.mEdSubs.includes("Adult Basic and Continuing Education")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub2" className="checkbox">Adult Basic and Continuing Education</label>
            <input type="checkbox" id="iEdSub3" name="educationSubsector" value="All Education Sub-Sectors" checked = {this.state.mEdSubs.includes("All Education Sub-Sectors")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub3" className="checkbox">All Education Sub-Sectors</label>
            <input type="checkbox" id="iEdSub4" name="educationSubsector" value="All sector data missing or unclear" checked = {this.state.mEdSubs.includes("All sector data missing or unclear")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub4" className="checkbox">All sector data missing or unclear</label>
            <input type="checkbox" id="iEdSub5" name="educationSubsector" value="Basic and Continuing Education" checked = {this.state.mEdSubs.includes("Basic and Continuing Education")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub5" className="checkbox">Basic and Continuing Education</label>
            <input type="checkbox" id="iEdSub6" name="educationSubsector" value="Early Childhood Education" checked = {this.state.mEdSubs.includes("Early Childhood Education")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub6" className="checkbox">Early Childhood Education</label>
            <input type="checkbox" id="iEdSub7" name="educationSubsector" value="Education Facilities" checked = {this.state.mEdSubs.includes("Education Facilities")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub7" className="checkbox">Education Facilities</label>
            <input type="checkbox" id="iEdSub8" name="educationSubsector" value="Education Sub-sector unclear" checked = {this.state.mEdSubs.includes("Education Sub-sector unclear")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub8" className="checkbox">Education Sub-sector unclear</label>
            <input type="checkbox" id="iEdSub9" name="educationSubsector" value="Main Education Sub-Sector" checked = {this.state.mEdSubs.includes("Main Education Sub-Sector")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub9" className="checkbox">Main Education Sub-Sector</label>
            <input type="checkbox" id="iEdSub10" name="educationSubsector" value="Missing data" checked = {this.state.mEdSubs.includes("Missing data")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub10" className="checkbox">Missing data</label>
            <input type="checkbox" id="iEdSub11" name="educationSubsector" value="No Education" checked = {this.state.mEdSubs.includes("No Education")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub11" className="checkbox">No Education</label>
            <input type="checkbox" id="iEdSub12" name="educationSubsector" value="Other Education" checked = {this.state.mEdSubs.includes("Other Education")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub12" className="checkbox">Other Education</label>
            <input type="checkbox" id="iEdSub13" name="educationSubsector" value="Primary Education" checked = {this.state.mEdSubs.includes("Primary Education")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub13" className="checkbox">Primary Education</label>
            <input type="checkbox" id="iEdSub14" name="educationSubsector" value="Public Administration – Education" checked = {this.state.mEdSubs.includes("Public Administration – Education")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub14" className="checkbox">Public Administration – Education</label>
            <input type="checkbox" id="iEdSub15" name="educationSubsector" value="Secondary Education" checked = {this.state.mEdSubs.includes("Secondary Education")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub15" className="checkbox">Secondary Education</label>
            <input type="checkbox" id="iEdSub16" name="educationSubsector" value="Tertiary Education" checked = {this.state.mEdSubs.includes("Tertiary Education")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub16" className="checkbox">Tertiary Education</label>
            <input type="checkbox" id="iEdSub17" name="educationSubsector" value="Unclear" checked = {this.state.mEdSubs.includes("Unclear")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub17" className="checkbox">Unclear</label>
            <input type="checkbox" id="iEdSub18" name="educationSubsector" value="Workforce Development and Vocational Education" checked = {this.state.mEdSubs.includes("Workforce Development and Vocational Education")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub18" className="checkbox">Workforce Development and Vocational Education</label>
            <input type="checkbox" id="iEdSub19" name="educationSubsector" value="Workforce Development/Skills" checked = {this.state.mEdSubs.includes("Workforce Development/Skills")} onChange={this.mEdSubChange}/> <label htmlFor="iEdSub19" className="checkbox">Workforce Development/Skills</label>
            <br></br>
            {this.fieldStatus(this.state.originalReviews.mEdSubsA)}
            <br></br><br></br>

            <p>Other Education Subsector(s)<br></br>Select all that apply:</p>
            <input type="checkbox" id="oEdSub1" name="educationSubsector" value="Adult" checked = {this.state.oEdSubs.includes("Adult")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub1" className="checkbox">Adult</label>
            <input type="checkbox" id="oEdSub2" name="educationSubsector" value="Adult Basic and Continuing Education" checked = {this.state.oEdSubs.includes("Adult Basic and Continuing Education")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub2" className="checkbox">Adult Basic and Continuing Education</label>
            <input type="checkbox" id="oEdSub3" name="educationSubsector" value="All Education Sub-Sectors" checked = {this.state.oEdSubs.includes("All Education Sub-Sectors")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub3" className="checkbox">All Education Sub-Sectors</label>
            <input type="checkbox" id="oEdSub4" name="educationSubsector" value="All sector data missing or unclear" checked = {this.state.oEdSubs.includes("All sector data missing or unclear")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub4" className="checkbox">All sector data missing or unclear</label>
            <input type="checkbox" id="oEdSub5" name="educationSubsector" value="Basic and Continuing Education" checked = {this.state.oEdSubs.includes("Basic and Continuing Education")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub5" className="checkbox">Basic and Continuing Education</label>
            <input type="checkbox" id="oEdSub6" name="educationSubsector" value="Early Childhood Education" checked = {this.state.oEdSubs.includes("Early Childhood Education")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub6" className="checkbox">Early Childhood Education</label>
            <input type="checkbox" id="oEdSub7" name="educationSubsector" value="Education Facilities" checked = {this.state.oEdSubs.includes("Education Facilities")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub7" className="checkbox">Education Facilities</label>
            <input type="checkbox" id="oEdSub8" name="educationSubsector" value="Education Sub-sector unclear" checked = {this.state.oEdSubs.includes("Education Sub-sector unclear")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub8" className="checkbox">Education Sub-sector unclear</label>
            <input type="checkbox" id="oEdSub9" name="educationSubsector" value="Main Education Sub-Sector" checked = {this.state.oEdSubs.includes("Main Education Sub-Sector")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub9" className="checkbox">Main Education Sub-Sector</label>
            <input type="checkbox" id="oEdSub10" name="educationSubsector" value="Missing data" checked = {this.state.oEdSubs.includes("Missing data")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub10" className="checkbox">Missing data</label>
            <input type="checkbox" id="oEdSub11" name="educationSubsector" value="No Education" checked = {this.state.oEdSubs.includes("No Education")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub11" className="checkbox">No Education</label>
            <input type="checkbox" id="oEdSub12" name="educationSubsector" value="Other Education" checked = {this.state.oEdSubs.includes("Other Education")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub12" className="checkbox">Other Education</label>
            <input type="checkbox" id="oEdSub13" name="educationSubsector" value="Primary Education" checked = {this.state.oEdSubs.includes("Primary Education")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub13" className="checkbox">Primary Education</label>
            <input type="checkbox" id="oEdSub14" name="educationSubsector" value="Public Administration – Education" checked = {this.state.oEdSubs.includes("Public Administration – Education")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub14" className="checkbox">Public Administration – Education</label>
            <input type="checkbox" id="oEdSub15" name="educationSubsector" value="Secondary Education" checked = {this.state.oEdSubs.includes("Secondary Education")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub15" className="checkbox">Secondary Education</label>
            <input type="checkbox" id="oEdSub16" name="educationSubsector" value="Tertiary Education" checked = {this.state.oEdSubs.includes("Tertiary Education")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub16" className="checkbox">Tertiary Education</label>
            <input type="checkbox" id="oEdSub17" name="educationSubsector" value="Unclear" checked = {this.state.oEdSubs.includes("Unclear")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub17" className="checkbox">Unclear</label>
            <input type="checkbox" id="oEdSub18" name="educationSubsector" value="Workforce Development and Vocational Education" checked = {this.state.oEdSubs.includes("Workforce Development and Vocational Education")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub18" className="checkbox">Workforce Development and Vocational Education</label>
            <input type="checkbox" id="oEdSub19" name="educationSubsector" value="Workforce Development/Skills" checked = {this.state.oEdSubs.includes("Workforce Development/Skills")} onChange={this.oEdSubChange}/> <label htmlFor="oEdSub19" className="checkbox">Workforce Development/Skills</label>
            <br></br>
            {this.fieldStatus(this.state.originalReviews.oEdSubsA)}
            <br></br><br></br>

            <p>Main Program Activity</p>
            <select id="mainProgramActivity" name="activity" onChange={this.changeProgramArea}>
            <option value="baseCase" selected = {this.state.mainProgramActivity === null}>Choose the Main Program Activity</option>
            <option value="Missing Data" selected = {this.state.mainProgramActivity.includes("Missing Data")}>Missing</option>
            <option value="Unclear" selected = {this.state.mainProgramActivity.includes("Unclear")}>Unclear</option>
            <option value="aTransitional Support" selected = {this.state.mainProgramActivity.includes("Transitional support")}>Transitional Support</option>
            <option value="aIncreasing or Sustaining Enrollment" selected = {this.state.mainProgramActivity.includes("Increasing or sustaining enrollment")}>Increasing or Sustaining Enrollment</option>
            <option value="aSchool Feeding Programs and Other Non-Financial Targeted Incentives" selected = {this.state.mainProgramActivity.includes("school feeding programs and other non-financial targeted incentives")}>School Feeding Programs and Other Non-Financial Targeted Incentives</option>
            <option value="aPrograms to improve access and equity in education" selected = {this.state.mainProgramActivity.includes("Programs to improve access and equity in education")}>Programs to improve access and equity in education</option>
            <option value="aAdult literacy and numeracy programs" selected = {this.state.mainProgramActivity.includes("Adult literacy and numeracy programs")}>Adult literacy and numeracy programs</option>
            <option value="eSchool Infrastructure and equipment" selected = {this.state.mainProgramActivity.includes("School Infrastructure and equipment")}>School Infrastructure and equipment</option>
            <option value="eSchool rehabilitation and construction" selected = {this.state.mainProgramActivity.includes("School rehabilitation and construction")}>School rehabilitation and construction</option>
            <option value="eCommunity resources towards education facilities" selected = {this.state.mainProgramActivity.includes("Community resources towards education facilities")}>Community resources towards education facilities</option>
            <option value="fVouchers and conditional cash transfers" selected = {this.state.mainProgramActivity.includes("Vouchers and conditional cash transfers")}>Vouchers and conditional cash transfers</option>
            <option value="fScholarships and financial aid" selected = {this.state.mainProgramActivity.includes("Scholarships and financial aid")}>Scholarships and financial aid</option>
            <option value="fStudent/household loans" selected = {this.state.mainProgramActivity.includes("Student/household loans")}>Student/household loans</option>
            <option value="fContracting" selected = {this.state.mainProgramActivity.includes("Contracting")}>Contracting</option>
            <option value="fSchool loans" selected = {this.state.mainProgramActivity.includes("School loans")}>School loans</option>
            <option value="fPay-for-performance" selected = {this.state.mainProgramActivity.includes("Pay-for-performance")}>Pay-for-performance</option>
            <option value="fOther financial targeted incentives for attendance" selected = {this.state.mainProgramActivity.includes("Other financial targeted incentives for attendance")}>Other financial targeted incentives for attendance</option>
            <option value="gParental or community engagement for school accountability" selected = {this.state.mainProgramActivity.includes("Parental or community engagement for school accountability")}>Parental or community engagement for school accountability</option>
            <option value="gSchool operations or management" selected = {this.state.mainProgramActivity.includes("School operations or management")}>School operations or management</option>
            <option value="gSchool assessment/rating systems" selected = {this.state.mainProgramActivity.includes("School assessment/rating systems")}>School assessment/rating systems</option>
            <option value="gCapacity development programs or services for education administration or bureaucracy" selected = {this.state.mainProgramActivity.includes("Capacity development programs or services for education administration or bureaucracy")}>Capacity development programs or services for education administration or bureaucracy</option>
            <option value="gEMIS/Data systems" selected = {this.state.mainProgramActivity.includes("EMIS/Data systems")}>EMIS/Data systems</option>
            <option value="gRegulatory analysis focused on government policy" selected = {this.state.mainProgramActivity.includes("Regulatory analysis focused on government policy")}>Regulatory analysis focused on government policy</option>
            <option value="gRegulatory analysis focused on school policy" selected = {this.state.mainProgramActivity.includes("Regulatory analysis focused on school policy")}>Regulatory analysis focused on school policy</option>
            <option value="gSchool quality improvement" selected = {this.state.mainProgramActivity.includes("School quality improvement")}>School quality improvement</option>
            <option value="pFranchise of schools/centers" selected = {this.state.mainProgramActivity.includes("Franchise of schools/centers")}>Franchise of schools/centers</option>
            <option value="pChain of schools/centers" selected = {this.state.mainProgramActivity.includes("Chain of schools/centers")}>Chain of schools/centers</option>
            <option value="pNetwork of schools/centers" selected = {this.state.mainProgramActivity.includes("Network of schools/centers")}>Network of schools/centers</option>
            <option value="pMobile schools/centers" selected = {this.state.mainProgramActivity.includes("Mobile schools/centers")}>Mobile schools/centers</option>
            <option value="pOnline school/center" selected = {this.state.mainProgramActivity.includes("Online school/center")}>Online school/center</option>
            <option value="pStand-alone schools/centers" selected = {this.state.mainProgramActivity.includes("Stand-alone schools/centers")}>Stand-alone schools/centers</option>
            <option value="pNGO Schools" selected = {this.state.mainProgramActivity.includes("NGO Schools")}>NGO Schools</option>
            <option value="pFormal public-private partnership" selected = {this.state.mainProgramActivity.includes("Formal public-private partnership")}>Formal public-private partnership</option>
            <option value="pPrivate schools" selected = {this.state.mainProgramActivity.includes("Private schools")}>Private schools</option>
            <option value="iOnline learning portals" selected = {this.state.mainProgramActivity.includes("Online learning portals")}>Online learning portals</option>
            <option value="iComputer-assisted instruction/learning programs/products" selected = {this.state.mainProgramActivity.includes("Computer-assisted instruction/learning programs/products")}>Computer-assisted instruction/learning programs/products</option>
            <option value="iComputers and tablets/computing skills focus" selected = {this.state.mainProgramActivity.includes("Computers and tablets/computing skills focus")}>Computers and tablets/computing skills focus</option>
            <option value="iSchool WiFi/broadband initiatives" selected = {this.state.mainProgramActivity.includes("School WiFi/broadband initiatives")}>School WiFi/broadband initiatives</option>
            <option value="iDigital classrooms" selected = {this.state.mainProgramActivity.includes("Digital classrooms")}>Digital classrooms</option>
            <option value="iMOOC instruction" selected = {this.state.mainProgramActivity.includes("MOOC instruction")}>MOOC instruction</option>
            <option value="iScience technology and innovation (STI) activities including research and development (R&D), training knowledge workers/ technology acquisition and diffusion/ STI grants" selected = {this.state.mainProgramActivity.includes("Science technology and innovation (STI) activities including research and development (R&D), training knowledge workers/ technology acquisition and diffusion/ STI grants")}>Science technology and innovation (STI) activities including research and development (R&D), training knowledge workers/ technology acquisition and diffusion/ STI grants</option>
            <option value="cStandardized teaching materials" selected = {this.state.mainProgramActivity.includes("Standardized teaching materials")}>Standardized teaching materials</option>
            <option value="cNon-traditional schedules" selected = {this.state.mainProgramActivity.includes("Non-traditional schedules")}>Non-traditional schedules</option>
            <option value="cExtra-curricular activities" selected = {this.state.mainProgramActivity.includes("Extra-curricular activities")}>Extra-curricular activities</option>
            <option value="cLearning materials for students" selected = {this.state.mainProgramActivity.includes("Learning materials for students")}>Learning materials for students</option>
            <option value="cTextbooks/books" selected = {this.state.mainProgramActivity.includes("Textbooks/books")}>Textbooks/books</option>
            <option value="cSTEM materials/focus/program" selected = {this.state.mainProgramActivity.includes("STEM materials/focus/program")}>STEM materials/focus/program</option>
            <option value="cEnglish/language materials" selected = {this.state.mainProgramActivity.includes("English/language materials")}>English/language materials</option>
            <option value="cMaths materials" selected = {this.state.mainProgramActivity.includes("Maths materials")}>Maths materials</option>
            <option value="sStudent assessment and progress" selected = {this.state.mainProgramActivity.includes("Student assessment and progress")}>Student assessment and progress</option>
            <option value="sExam preparation" selected = {this.state.mainProgramActivity.includes("Exam preparation")}>Exam preparation</option>
            <option value="sTutoring/private tuition (includes tutoring chains/centres)" selected = {this.state.mainProgramActivity.includes("Tutoring/private tuition (includes tutoring chains/centres)")}>Tutoring/private tuition (includes tutoring chains/centres)</option>
            <option value="sParental or community engagement in support of students" selected = {this.state.mainProgramActivity.includes("Parental or community engagement in support of students")}>Parental or community engagement in support of students</option>
            <option value="sMentorship programs" selected = {this.state.mainProgramActivity.includes("Mentorship programs")}>Mentorship programs</option>
            <option value="tTeacher training" selected = {this.state.mainProgramActivity.includes("Teacher training")}>Teacher training</option>
            <option value="tSchool leader/principals training" selected = {this.state.mainProgramActivity.includes("School leader/principals training")}>School leader/principals training</option>
            <option value="tTeacher/leader evaluation capacity development and mentorship programs" selected = {this.state.mainProgramActivity.includes("Teacher/leader evaluation capacity development and mentorship programs")}>Teacher/leader evaluation capacity development and mentorship programs</option>
            <option value="tTeacher recruitment/ deployment/ in-service training programs" selected = {this.state.mainProgramActivity.includes("Teacher recruitment/ deployment/ in-service training programs")}>Teacher recruitment/ deployment/ in-service training programs</option>
            <option value="wMentorship/ internship/ job placement" selected = {this.state.mainProgramActivity.includes("Mentorship/ internship/ job placement")}>Mentorship/ internship/ job placement</option>
            <option value="wEmployment skills programs" selected = {this.state.mainProgramActivity.includes("Employment skills programs")}>Employment skills programs</option>
            <option value="wEntrepreneurship and business skills programs" selected = {this.state.mainProgramActivity.includes("Entrepreneurship and business skills programs")}>Entrepreneurship and business skills programs</option>
            <option value="vLinking research and evidence with policy or implementation" selected = {this.state.mainProgramActivity.includes("Linking research and evidence with policy or implementation")}>Linking research and evidence with policy or implementation</option>
            <option value="vAdvocacy campaigns/ initiatives/ movements" selected = {this.state.mainProgramActivity.includes("Advocacy campaigns/ initiatives/ movements")}>Advocacy campaigns/ initiatives/ movements</option>
            <option value="vRegulatory analysis" selected = {this.state.mainProgramActivity.includes("Regulatory analysis")}>Regulatory analysis</option>
            <option value="vKnowledge production/mobilization" selected = {this.state.mainProgramActivity.includes("Knowledge production/mobilization")}>Knowledge production/mobilization</option>
            <option value="vEducation sector research studies/ surveys/ assessments" selected = {this.state.mainProgramActivity.includes("Increasing or Sustaining Enrollment")}>Education sector research studies/ surveys/ assessments</option>
            <option value="vCapacity building at the system level" selected = {this.state.mainProgramActivity.includes("Capacity building at the system level")}>Capacity building at the system level</option>
            <option value="wLife skills and personal finance training" selected = {this.state.mainProgramActivity.includes("Life skills and personal finance training")}>Life skills and personal finance training</option>
            <option value="wContinuing education programs offered for adults" selected = {this.state.mainProgramActivity.includes("Continuing education programs offered for adults")}>Continuing education programs offered for adults</option>
            <option value="aCurriculum and Extra-Curricular Support" selected = {this.state.mainProgramActivity.includes("Curriculum and Extra-Curricular Support")}>Curriculum and Extra-Curricular Support</option>
            <option value="aPrograms targeting girls/women" selected = {this.state.mainProgramActivity.includes("Programs targeting girls/women")}>Programs targeting girls/women</option>
            <option value="aPrograms targeting special needs or people with disabilities" selected = {this.state.mainProgramActivity.includes("Programs targeting special needs or people with disabilities")}>Programs targeting special needs or people with disabilities</option>
            <option value="aPrograms targeting other marginalized groups" selected = {this.state.mainProgramActivity.includes("Programs targeting other marginalized groups")}>Programs targeting other marginalized groups</option>
            <option value="aPrograms targeting tribal or indigenous groups" selected = {this.state.mainProgramActivity.includes("Programs targeting tribal or indigenous groups")}>Programs targeting tribal or indigenous groups</option>
            <option value="wProfessional certification/skills" selected = {this.state.mainProgramActivity.includes("Professional certification/skills")}>Professional certification/skills</option>
            <option value="wShort-term technical/vocational course" selected = {this.state.mainProgramActivity.includes("Short-term technical/vocational course")}>Short-term technical/vocational course</option>
            <option value="wLonger-term technical/vocational course" selected = {this.state.mainProgramActivity.includes("Longer-term technical/vocational course")}>Longer-term technical/vocational course</option>
            <option value="oNon-formal education youth" selected = {this.state.mainProgramActivity.includes("Non-formal education youth")}>Non-formal education youth</option>
            <option value=" Private Sector Delivery of Education" selected = {this.state.mainProgramActivity.includes("Private Sector Delivery of Education")}>Private Sector Delivery of Education</option>
            <option value=" vocational training" selected = {this.state.mainProgramActivity.includes("vocational training")}>vocational training</option>
            <option value=" Education Finance (system-level)" selected = {this.state.mainProgramActivity.includes("Education Finance (system-level)")}>Education Finance (system-level)</option>
            <option value=" school finance" selected = {this.state.mainProgramActivity.includes("school finance")}>school finance</option>
            <option value=" Capacity Building of Non-Education Professionals" selected = {this.state.mainProgramActivity.includes("Capacity Building of Non-Education Professionals")}>Capacity Building of Non-Education Professionals</option>
            <option value=" Enrichment/New Pedagogical or Curricular Programs" selected = {this.state.mainProgramActivity.includes("Enrichment/New Pedagogical or Curricular Programs")}>Enrichment/New Pedagogical or Curricular Programs</option>
            <option value=" Academic research/academic exchange" selected = {this.state.mainProgramActivity.includes("Academic research/academic exchange")}>Academic research/academic exchange</option>
            <option value=" Main Programming Activity" selected = {this.state.mainProgramActivity.includes("Main Programming Activity")}>Main Programming Activity</option>
            <option value=" All Programming Activities" selected = {this.state.mainProgramActivity.includes("All Programming Activities")}>All Programming Activities</option>
            <option value=" Civic/community education" selected = {this.state.mainProgramActivity.includes("Civic/community education")}>Civic/community education</option>
            <option value=" Scholarships and Financial Aid" selected = {this.state.mainProgramActivity.includes("Scholarships and Financial Aid")}>Scholarship and Financial Aid</option>
            <option value=" Employment Skills program" selected = {this.state.mainProgramActivity.includes("Employment Skills program")}>Employment Skills program</option>
            <option value=" Advocacy campaigns/initiatives/movements" selected = {this.state.mainProgramActivity.includes("Advocacy campaigns/initiatives/movements")}>Advocacy campaigns/initiatives/movements</option>
            <option value=" Knowledge production/mobilization" selected = {this.state.mainProgramActivity.includes("Knowledge production/mobilization")}>Knowledge production/mobilization</option>
            <option value=" Program targeting special needs or people with disabilities" selected = {this.state.mainProgramActivity.includes("Program targeting special needs or people with disabilities")}>Program targeting special needs or people with disabilities</option>
            <option value=" Literacy skills" selected = {this.state.mainProgramActivity.includes("Literacy skills")}>Literacy skills</option>
            <option value=" Maternal Health Education" selected = {this.state.mainProgramActivity.includes("Maternal Health Education")}>Maternal Health Education</option>
            </select>

            <p>Program Area</p>
            <div id="programArea">
              <p>
                <i>{this.state.programArea}</i>
              </p>
            </div>
            {this.fieldStatus(this.state.originalReviews.initiativeMainProgramActivityA)}
            <br></br><br></br>

            <p>Other Programming Activities</p>
            <select id="programActivity" name="activity" onChange={this.addProgramActivity}>
            <option value="baseCase">Choose the Other Program Activities</option>
            <option value="Missing Data">Missing</option>
            <option value="Unclear">Unclear</option>
            <option value="aTransitional Support">Transitional Support</option>
            <option value="aIncreasing or Sustaining Enrollment">Increasing or Sustaining Enrollment</option>
            <option value="aSchool Feeding Programs and Other Non-Financial Targeted Incentives">School Feeding Programs and Other Non-Financial Targeted Incentives</option>
            <option value="aPrograms to improve access and equity in education">Programs to improve access and equity in education</option>
            <option value="aAdult literacy and numeracy programs">Adult literacy and numeracy programs</option>
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
            <option value="gRegulatory analysis focused on government policy">Regulatory analysis focused on government policy</option>
            <option value="gRegulatory analysis focused on school policy">Regulatory analysis focused on school policy</option>
            <option value="gSchool quality improvement">School quality improvement</option>
            <option value="pFranchise of schools/centers">Franchise of schools/centers</option>
            <option value="pChain of schools/centers">Chain of schools/centers</option>
            <option value="pNetwork of schools/centers">Network of schools/centers</option>
            <option value="pMobile schools/centers">Mobile schools/centers</option>
            <option value="pOnline school/center">Online school/center</option>
            <option value="pStand-alone schools/centers">Stand-alone schools/centers</option>
            <option value="pNGO Schools">NGO Schools</option>
            <option value="pFormal public-private partnership">Formal public-private partnership</option>
            <option value="pPrivate schools">Private schools</option>
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
            <option value="vCapacity building at the system level">Capacity building at the system level</option>
            <option value="wLife skills and personal finance training">Life skills and personal finance training</option>
            <option value="wContinuing education programs offered for adults">Continuing education programs offered for adults</option>
            <option value="aCurriculum and Extra-Curricular Support">Curriculum and Extra-Curricular Support</option>
            <option value="aPrograms targeting girls/women">Programs targeting girls/women</option>
            <option value="aPrograms targeting special needs or people with disabilities">Programs targeting special needs or people with disabilities</option>
            <option value="aPrograms targeting other marginalized groups">Programs targeting other marginalized groups</option>
            <option value="aPrograms targeting tribal or indigenous groups">Programs targeting tribal or indigenous groups</option>
            <option value="wProfessional certification/skills">Professional certification/skills</option>
            <option value="wShort-term technical/vocational course">Short-term technical/vocational course</option>
            <option value="wLonger-term technical/vocational course">Longer-term technical/vocational course</option>
            <option value="oNon-formal education youth">Non-formal education youth</option>
            <option value=" Private Sector Delivery of Education">Private Sector Delivery of Education</option>
            <option value=" vocational training">vocational training</option>
            <option value=" Education Finance (system-level)">Education Finance (system-level)</option>
            <option value=" school finance">school finance</option>
            <option value=" Capacity Building of Non-Education Professionals">Capacity Building of Non-Education Professionals</option>
            <option value=" Enrichment/New Pedagogical or Curricular Programs">Enrichment/New Pedagogical or Curricular Programs</option>
            <option value=" Academic research/academic exchange">Academic research/academic exchange</option>
            <option value=" Main Programming Activity">Main Programming Activity</option>
            <option value=" All Programming Activities">All Programming Activities</option>
            <option value=" Civic/community education">Civic/community education</option>
            <option value=" Scholarships and Financial Aid">Scholarship and Financial Aid</option>
            <option value=" Employment Skills program">Employment Skills program</option>
            <option value=" Advocacy campaigns/initiatives/movements">Advocacy campaigns/initiatives/movements</option>
            <option value=" Knowledge production/mobilization">Knowledge production/mobilization</option>
            <option value=" Program targeting special needs or people with disabilities">Program targeting special needs or people with disabilities</option>
            <option value=" Literacy skills">Literacy skills</option>
            <option value=" Maternal Health Education">Maternal Health Education</option>
            </select>

            <div id="initActivities">
              <ul>
                {
                  this.state.activities.map(activity => {
                    return (
                      <this.buttonMaker key={activity} name={activity} category="initActivities"/>
                    );
                  })
                }
              </ul>
            </div>
            {this.fieldStatus(this.state.originalReviews.activitiesA)}
            <br></br><br></br>

            <p>Fee to Access?</p>
              <input type="radio" id="feeAccess1" name="feeToAccess" value="Yes" checked = {this.state.feeAccess === "Yes"} onChange={this.feeAccessChange}/> <label htmlFor="feeAccess1">Yes</label>
              <input type="radio" id="feeAccess2" name="feeToAccess" value="No" checked = {this.state.feeAccess === "No"} onChange={this.feeAccessChange}/> <label htmlFor="feeAccess2">No</label>
            <br></br>
            {this.fieldStatus(this.state.originalReviews.feeAccessA)}
            <br></br><br></br>

            <p>Target School Management Type</p>
            <select id="manType" name="managementType" onChange={this.addManagementType}>
            <option value="base">Choose a School Management Type</option>
            <option value="Government/Public">Government/Public</option>
            <option value="Non-state/Private">Non-state/Private</option>
            <option value="Not Applicable">Not Applicable</option>
            <option value="Unclear">Unclear</option>
            <option value="Missing Data">Missing Data</option>
            </select>

            <div id="managementTypes">
              <ul>
                {
                  this.state.managementTypes.map(type => {
                    return (
                      <this.buttonMaker key={type} name={type} category="managementTypes"/>
                    );
                  })
                }
              </ul>
            </div>
            {this.fieldStatus(this.state.originalReviews.managementTypesA)}
            <br></br><br></br>

            <p>Target Population Sector(s)<br></br>Select all that apply:</p>
            <select id="popSector" name="targetPopulationSector" onChange={this.addPopSector}>
            <option value="base">Choose a Population Sector</option>
            <option value="Sixty-two students from private schools">Sixty-two students from private schools</option>
            <option value=" Low-income families in Rawalpindi"> Low-income families in Rawalpindi</option>
            <option value="American youth aged 16-24 year old who are out of school and not working">American youth aged 16-24 year old who are out of school and not working</option>
            <option value="Linguistic minorities">Linguistic minorities</option>
            <option value=" Out-of-school children"> Out-of-school children</option>
            <option value=" Other"> Other</option>
            <option value=" Children in grades 1-3"> Children in grades 1-3</option>
            <option value=" Some of the hardest to reach populations around the world"> Some of the hardest to reach populations around the world</option>
            <option value="children and adults with special needs">children and adults with special needs</option>
            <option value="special needs students">special needs students</option>
            <option value="Girls">Girls</option>
            <option value=" Children with disabilities"> Children with disabilities</option>
            <option value=" Vulnerable children"> Vulnerable children</option>
            <option value="Out-of-school children">Out-of-school children</option>
            <option value="students selected via blind lottery">students selected via blind lottery</option>
            <option value="Teachers">Teachers</option>
            <option value=" Low fee private sector schools"> Low fee private sector schools</option>
            <option value="Other">Other</option>
            <option value=" School-age children"> School-age children</option>
            <option value=" illiterate youth and adults"> illiterate youth and adults</option>
            <option value="low SES children">low SES children</option>
            <option value="Private high school">Private high school</option>
            <option value=" Accepts low-income students from public schools (limited seats)"> Accepts low-income students from public schools (limited seats)</option>
            <option value="Women">Women</option>
            <option value=" Out-of-school girls"> Out-of-school girls</option>
            <option value="exceptional youth from across Africa">exceptional youth from across Africa</option>
            <option value="unclear">unclear</option>
            <option value="Ethnic minorities">Ethnic minorities</option>
            <option value="rural youth">rural youth</option>
            <option value="Communities">Communities</option>
            <option value=" service providers and policy makers."> service providers and policy makers.</option>
            <option value=" Young people from underprivileged backgrounds"> Young people from underprivileged backgrounds</option>
            <option value="Government and Government-assisted primary schools">Government and Government-assisted primary schools</option>
            <option value=" Disadvantaged students"> Disadvantaged students</option>
            <option value="students from low-income families and those who will be the first in their families to attend college">students from low-income families and those who will be the first in their families to attend college</option>
            <option value="Orphans and vulnerable children">Orphans and vulnerable children</option>
            <option value=" Living in conditions of poverty"> Living in conditions of poverty</option>
            <option value=" orphans and vulnerable children"> orphans and vulnerable children</option>
            <option value=" displaced individuals"> displaced individuals</option>
            <option value=" linguistic minorities"> linguistic minorities</option>
            <option value="Networks of people living with HIV (PLHIV)">Networks of people living with HIV (PLHIV)</option>
            <option value=" legal aid organisations"> legal aid organisations</option>
            <option value=" women’s organisations"> women’s organisations</option>
            <option value=" youth organisations and other AIDS service organisations"> youth organisations and other AIDS service organisations</option>
            <option value="NGO leaders">NGO leaders</option>
            <option value="Students">Students</option>
            <option value=" Parents"> Parents</option>
            <option value=" Teachers"> Teachers</option>
            <option value=" Community members"> Community members</option>
            <option value="low SES students and students with academic merit are given preference">low SES students and students with academic merit are given preference</option>
            <option value="All children ages 3 to 16 to be included – those who have never been to school or have dropped out">All children ages 3 to 16 to be included – those who have never been to school or have dropped out</option>
            <option value=" as well as those who are in government schools"> as well as those who are in government schools</option>
            <option value=" private schools"> private schools</option>
            <option value=" religious schools or anywhere else."> religious schools or anywhere else.</option>
            <option value="Asian and Pacific Islander American's">Asian and Pacific Islander American's</option>
            <option value="young Asian professionals">young Asian professionals</option>
            <option value="Low-income students">Low-income students</option>
            <option value="teachers">teachers</option>
            <option value="Local children">Local children</option>
            <option value=" Diverse socioeconomic backgrounds"> Diverse socioeconomic backgrounds</option>
            <option value="Girls; Displaced individuals">Girls; Displaced individuals</option>
            <option value=" Orphans and vulnerable children"> Orphans and vulnerable children</option>
            <option value=" Child laborers "> Child laborers </option>
            <option value="Children in Government-run primary schools">Children in Government-run primary schools</option>
            <option value=" underprivileged children"> underprivileged children</option>
            <option value=" students from city municipal schools"> students from city municipal schools</option>
            <option value=" children living in slum areas"> children living in slum areas</option>
            <option value="the poorest in India—particularly women and their dependent families">the poorest in India—particularly women and their dependent families</option>
            <option value="Nomadic communities">Nomadic communities</option>
            <option value="Young people who live in poverty">Young people who live in poverty</option>
            <option value="Select state schools">Select state schools</option>
            <option value=" Students in Grades 7 to 9 in 3 secondary schools in three districts in two provinces including Kampong Cham and Tbaung Khmum School management and teachers"> Students in Grades 7 to 9 in 3 secondary schools in three districts in two provinces including Kampong Cham and Tbaung Khmum School management and teachers</option>
            <option value=" Parents of students"> Parents of students</option>
            <option value="REACH courses are designed exclusively for street and migrant youth">REACH courses are designed exclusively for street and migrant youth</option>
            <option value=" school dropouts"> school dropouts</option>
            <option value=" unemployed secondary school graduates and resettlement community member"> unemployed secondary school graduates and resettlement community member</option>
            <option value=" Rural children"> Rural children</option>
            <option value="Garment/apparel workers">Garment/apparel workers</option>
            <option value="Rural and Tribal India">Rural and Tribal India</option>
            <option value="Teachers in government and private schools">Teachers in government and private schools</option>
            <option value="Most vulnerable communities">Most vulnerable communities</option>
            <option value=" Women"> Women</option>
            <option value=" Children"> Children</option>
            <option value="marginalized youth in the 18-35 years age group">marginalized youth in the 18-35 years age group</option>
            <option value="Adolescent girls">Adolescent girls</option>
            <option value="Students from disadvantaged and non-literate families">Students from disadvantaged and non-literate families</option>
            <option value=" Students who are at high-risk of dropping out of primary school"> Students who are at high-risk of dropping out of primary school</option>
            <option value="Disadvantaged children">Disadvantaged children</option>
            <option value=" Girls"> Girls</option>
            <option value=" Ethnic minority students"> Ethnic minority students</option>
            <option value=" Children living on less than $2 a day"> Children living on less than $2 a day</option>
            <option value="Government schools">Government schools</option>
            <option value=" Low to high-income schools"> Low to high-income schools</option>
            <option value=" Children and Teachers in Affordable Private Schools"> Children and Teachers in Affordable Private Schools</option>
            <option value="Children from classes six and above">Children from classes six and above</option>
            <option value="Burmese children">Burmese children</option>
            <option value=" Migrant children living on the Thai-Burma border"> Migrant children living on the Thai-Burma border</option>
            <option value=" Ethnic minorities "> Ethnic minorities </option>
            <option value=" Displaced individuals"> Displaced individuals</option>
            <option value="girls">girls</option>
            <option value="Young people from vulnerable backgrounds">Young people from vulnerable backgrounds</option>
            <option value="school systems">school systems</option>
            <option value="low SES students">low SES students</option>
            <option value="Low SES students">Low SES students</option>
            <option value="7-12 year olds">7-12 year olds</option>
            <option value="young people with a migration background ">young people with a migration background </option>
            <option value="girls and women">girls and women</option>
            <option value=" Child laborers at construction sites"> Child laborers at construction sites</option>
            <option value=" children of construction laborers"> children of construction laborers</option>
            <option value="Children of two and half to five years in the districts of Purulia and Murshidabad of West Bengal India">Children of two and half to five years in the districts of Purulia and Murshidabad of West Bengal India</option>
            <option value=" working children at garbage dumps"> working children at garbage dumps</option>
            <option value="open to all children from all segments and school systems as well as their teachers and parents for an experience to remember and emulate when they go back to their schools and homes.">open to all children from all segments and school systems as well as their teachers and parents for an experience to remember and emulate when they go back to their schools and homes.</option>
            <option value=" Children from stigmatized and discriminated sections of society"> Children from stigmatized and discriminated sections of society</option>
            <option value=" such as street sex workers’ children"> such as street sex workers’ children</option>
            <option value=" HIV orphans"> HIV orphans</option>
            <option value=" and children in conflict with the law"> and children in conflict with the law</option>
            <option value="Garabage scavengers in Payatas">Garabage scavengers in Payatas</option>
            <option value="Poor people">Poor people</option>
            <option value=" women and children"> women and children</option>
            <option value=" children who are out of school"> children who are out of school</option>
            <option value=" or at risk of leaving it"> or at risk of leaving it</option>
            <option value="low SES youth">low SES youth</option>
            <option value="high needs and meritous scholars">high needs and meritous scholars</option>
            <option value="Children">Children</option>
            <option value=" ages 6-15"> ages 6-15</option>
            <option value=" across economic"> across economic</option>
            <option value=" social"> social</option>
            <option value=" and educational backgrounds are a part of the program"> and educational backgrounds are a part of the program</option>
            <option value="low income schools">low income schools</option>
            <option value="universities and colleges">universities and colleges</option>
            <option value="Mostly disadvantaged sections of society">Mostly disadvantaged sections of society</option>
            <option value="Girls who have dropped out of">Girls who have dropped out of</option>
            <option value=" or never attended primary school"> or never attended primary school</option>
            <option value="students who come from challenging backgrounds">students who come from challenging backgrounds</option>
            <option value="Female entrepreneurs">Female entrepreneurs</option>
            <option value=" youth"> youth</option>
            <option value=" farmers"> farmers</option>
            <option value=" textile workers"> textile workers</option>
            <option value=" and female merchants"> and female merchants</option>
            <option value=" School management committees"> School management committees</option>
            <option value=" Women and girl children from marginalized communities of Meo Muslims"> Women and girl children from marginalized communities of Meo Muslims</option>
            <option value=" scheduled castes"> scheduled castes</option>
            <option value=" scheduled tribes and other backward communities"> scheduled tribes and other backward communities</option>
            <option value=" Child labourers"> Child labourers</option>
            <option value=" Refugees"> Refugees</option>
            <option value=" Orphaned children"> Orphaned children</option>
            <option value="under-served students in secondary schools">under-served students in secondary schools</option>
            <option value="The programme reaches over 31">The programme reaches over 31</option>
            <option value="000 schools in more than 50 countries. Through our digital platforms we link schools from around the world">000 schools in more than 50 countries. Through our digital platforms we link schools from around the world</option>
            <option value="Teachers and school leaders around the world">Teachers and school leaders around the world</option>
            <option value="The control group will be drawn from junior high school classes in the two neighboring counties">The control group will be drawn from junior high school classes in the two neighboring counties</option>
            <option value=" Hanyin and Shiquan. One third of the 7th and 8th graders in Hanyin and Shiquan counties (totaling about 5000 7th and 8th graders) will constitute the control group."> Hanyin and Shiquan. One third of the 7th and 8th graders in Hanyin and Shiquan counties (totaling about 5000 7th and 8th graders) will constitute the control group.</option>
            <option value="Educate Girls partner schools">Educate Girls partner schools</option>
            <option value=" teachers"> teachers</option>
            <option value=" and classrooms"> and classrooms</option>
            <option value="low income youth">low income youth</option>
            <option value="Teachers and administrators associated with managing education and vocational training projects">Teachers and administrators associated with managing education and vocational training projects</option>
            <option value="underprivledged youth in economically depressed neighbourhoods">underprivledged youth in economically depressed neighbourhoods</option>
            <option value="Economically disadvantaged areas of China">Economically disadvantaged areas of China</option>
            <option value="Rural youth">Rural youth</option>
            <option value=" rural women"> rural women</option>
            <option value=" secondary and university students in Vietnam"> secondary and university students in Vietnam</option>
            <option value="student’s parents must be part of our microfinance program">student’s parents must be part of our microfinance program</option>
            <option value="students who have overcome significant obstacles to pursue their educations">students who have overcome significant obstacles to pursue their educations</option>
            <option value="first-generation university students from deeply disadvantaged communities">first-generation university students from deeply disadvantaged communities</option>
            <option value="Students around the world">Students around the world</option>
            <option value="high achieveing secondary school students">high achieveing secondary school students</option>
            <option value="Individuals from disadvantaged families">Individuals from disadvantaged families</option>
            <option value=" Disadvantaged high school graduates"> Disadvantaged high school graduates</option>
            <option value=" Ages 17-24"> Ages 17-24</option>
            <option value=" Young women and men"> Young women and men</option>
            <option value=" Youth with disabilities."> Youth with disabilities.</option>
            <option value="Rural or tribal communities">Rural or tribal communities</option>
            <option value=" Underprivileged students"> Underprivileged students</option>
            <option value=" Students"> Students</option>
            <option value="Participants should be familiar with basic terms of accounting">Participants should be familiar with basic terms of accounting</option>
            <option value="public schools">public schools</option>
            <option value="Out-of-school adolescents">Out-of-school adolescents</option>
            <option value=" Rural communities"> Rural communities</option>
            <option value=" Marginalized adolescents"> Marginalized adolescents</option>
            <option value="marginalized youth">marginalized youth</option>
            <option value="Migrant families living in slums">Migrant families living in slums</option>
            <option value=" Displaced families"> Displaced families</option>
            <option value=" Communities with limited or no Internet access"> Communities with limited or no Internet access</option>
            <option value="Hearing impaired and children with disabilities from underprivileged backgrounds">Hearing impaired and children with disabilities from underprivileged backgrounds</option>
            <option value="low income students">low income students</option>
            <option value=" Marginalised girls in the most rural and remotest parts of educationally backward districts"> Marginalised girls in the most rural and remotest parts of educationally backward districts</option>
            <option value="underprivileged students">underprivileged students</option>
            <option value="secondary students">secondary students</option>
            <option value="government primary school students">government primary school students</option>
            <option value="Government schools in Chitrakoot and Bahraich districts of Uttar Pradesh">Government schools in Chitrakoot and Bahraich districts of Uttar Pradesh</option>
            <option value=" Mahabubnagar of Telangana and in Gumla and Singrauli districts of Jharkhand and Madhya Pradesh respectively"> Mahabubnagar of Telangana and in Gumla and Singrauli districts of Jharkhand and Madhya Pradesh respectively</option>
            <option value="Citizens">Citizens</option>
            <option value=" Community representatives"> Community representatives</option>
            <option value=" District government"> District government</option>
            <option value=" School officials"> School officials</option>
            <option value="Underprivileged students">Underprivileged students</option>
            <option value=" Low-income students"> Low-income students</option>
            <option value="Educators and organizations in education and learning">Educators and organizations in education and learning</option>
            <option value="working professionals">working professionals</option>
            <option value="secondary students in Nigeria">secondary students in Nigeria</option>
            <option value="the remotest villages">the remotest villages</option>
            <option value="financially underprivileged college">financially underprivileged college</option>
            <option value="Child labourers">Child labourers</option>
            <option value=" Migrant children"> Migrant children</option>
            <option value="both public and private school systems">both public and private school systems</option>
            <option value="Physically Challenged youth (having min 40% of disability) and Speech and Hearing Impaired ">Physically Challenged youth (having min 40% of disability) and Speech and Hearing Impaired </option>
            <option value=" Youth (having min 50% of disability) are eligible to this program "> Youth (having min 50% of disability) are eligible to this program </option>
            <option value="Vulnerable youth">Vulnerable youth</option>
            <option value=" women"> women</option>
            <option value=" juvenile delinquents"> juvenile delinquents</option>
            <option value=" specially-abled"> specially-abled</option>
            <option value=" school/ college drop-outs"> school/ college drop-outs</option>
            <option value="District officials and education administrators">District officials and education administrators</option>
            <option value=" Remote areas"> Remote areas</option>
            <option value=" Conflict-affected rural areas"> Conflict-affected rural areas</option>
            <option value="Women migrant workers">Women migrant workers</option>
            <option value="Primary students">Primary students</option>
            <option value=" All residents of the Shahdara region in northeastern Delhi"> All residents of the Shahdara region in northeastern Delhi</option>
            <option value=" From economically weaker sections (EWS); Private schools"> From economically weaker sections (EWS); Private schools</option>
            <option value="children with behavioral or attitudinal issues; Approximately fifty percent of the Encompass student body is able to attend a regular school">children with behavioral or attitudinal issues; Approximately fifty percent of the Encompass student body is able to attend a regular school</option>
            <option value=" but require special assistance with behavioral issues"> but require special assistance with behavioral issues</option>
            <option value=" academics"> academics</option>
            <option value=" or addiction. Although much of the student body is comprised of high fee paying students"> or addiction. Although much of the student body is comprised of high fee paying students</option>
            <option value=" the model utilizes an innovative cross-subsidization approach to reach the poor. Thirty percent of the student body come from disadvantaged backgrounds"> the model utilizes an innovative cross-subsidization approach to reach the poor. Thirty percent of the student body come from disadvantaged backgrounds</option>
            <option value=" and their enrollment is wholly subsidized by the fees of the high fee-paying individuals. "> and their enrollment is wholly subsidized by the fees of the high fee-paying individuals. </option>
            <option value="Low income earners. 70% of them living in rural areas. With over 3 million unique users">Low income earners. 70% of them living in rural areas. With over 3 million unique users</option>
            <option value=" we are undoubtedly Africa’s #1 Mobile Learning Platform for 10 – 25-year-old learners in rural Africa"> we are undoubtedly Africa’s #1 Mobile Learning Platform for 10 – 25-year-old learners in rural Africa</option>
            <option value="Children between 3 years – 14 years and aims at making reading and comprehension of the language">Children between 3 years – 14 years and aims at making reading and comprehension of the language</option>
            <option value=" experiential and joyful. "> experiential and joyful. </option>
            <option value="Bangladeshi adults and school children">Bangladeshi adults and school children</option>
            <option value="English Language Learners">English Language Learners</option>
            <option value=" School drop outs"> School drop outs</option>
            <option value=" Public schools"> Public schools</option>
            <option value="Students in state-run schools
            2000 schools located in rural">Students in state-run schools
            2000 schools located in rural</option>
            <option value=" urban and adivasi areas across the country"> urban and adivasi areas across the country</option>
            <option value="Enuma® designs exceptional learning tools to empower children - including those with special needs - to be independent learners.">Enuma® designs exceptional learning tools to empower children - including those with special needs - to be independent learners.</option>
            <option value="Equal Opportunity Schools’ mission is to ensure students of all backgrounds have equal access to America’s most academically intense high school programs—and particularly that low-income students and students of color ">Equal Opportunity Schools’ mission is to ensure students of all backgrounds have equal access to America’s most academically intense high school programs—and particularly that low-income students and students of color </option>
            <option value="Poorest families">Poorest families</option>
            <option value=" Most marginalized villages"> Most marginalized villages</option>
            <option value="Economically and socially underprivileged students">Economically and socially underprivileged students</option>
            <option value=" mainly the Corporation schools"> mainly the Corporation schools</option>
            <option value=" Youth with disabilities"> Youth with disabilities</option>
            <option value="Children living in remote and rural India">Children living in remote and rural India</option>
            <option value="Community workers and students from marginalized communities in Southeast Asia">Community workers and students from marginalized communities in Southeast Asia</option>
            <option value="young adults on the autism spectrum">young adults on the autism spectrum</option>
            <option value="women entrepreneurs in Bangladesh">women entrepreneurs in Bangladesh</option>
            <option value="Schools within northern and southern India from all categories and segments of schools including government">Schools within northern and southern India from all categories and segments of schools including government</option>
            <option value=" private"> private</option>
            <option value=" international"> international</option>
            <option value=" and low-income"> and low-income</option>
            <option value="middle school children grades 6-8">middle school children grades 6-8</option>
            <option value="primary school teachers grade 3-5.">primary school teachers grade 3-5.</option>
            <option value="Groups and organizations of women: factory workers">Groups and organizations of women: factory workers</option>
            <option value=" domestic workers"> domestic workers</option>
            <option value=" sex workers"> sex workers</option>
            <option value=" day laborers"> day laborers</option>
            <option value=" packagers"> packagers</option>
            <option value=" telephone operators"> telephone operators</option>
            <option value=" migrant women"> migrant women</option>
            <option value="Top performing students from financially constrained backgrounds ">Top performing students from financially constrained backgrounds </option>
            <option value="undergraduate and graduate students">undergraduate and graduate students</option>
            <option value="children who do not have access to high quality pre-school">children who do not have access to high quality pre-school</option>
            <option value=" Youth and illiterate adults living in marginalized rural and urban slum communities"> Youth and illiterate adults living in marginalized rural and urban slum communities</option>
            <option value=" Marginalized adolescent girls from government residential schools"> Marginalized adolescent girls from government residential schools</option>
            <option value="Children in communities without access to formal pre-schools or other early learning opportunities ">Children in communities without access to formal pre-schools or other early learning opportunities </option>
            <option value=" Minority students"> Minority students</option>
            <option value=" Girls from poor families"> Girls from poor families</option>
            <option value="Children of migrant families">Children of migrant families</option>
            <option value="National">National</option>
            <option value=" regional and international policy-makers in education and finance as well as planners"> regional and international policy-makers in education and finance as well as planners</option>
            <option value=" policy analysts"> policy analysts</option>
            <option value=" aid agencies"> aid agencies</option>
            <option value=" foundations"> foundations</option>
            <option value=" UN organizations"> UN organizations</option>
            <option value=" NGOs"> NGOs</option>
            <option value=" experts"> experts</option>
            <option value=" researchers"> researchers</option>
            <option value=" the media and students"> the media and students</option>
            <option value="At-risk girls">At-risk girls</option>
            <option value="Children of all abilities">Children of all abilities</option>
            <option value=" Students with special needs"> Students with special needs</option>
            <option value=" Gifted students"> Gifted students</option>
            <option value="underprivileged adolescent girls">underprivileged adolescent girls</option>
            <option value="Impoverished families with children enrolled in low cost private schools">Impoverished families with children enrolled in low cost private schools</option>
            <option value="secondary students in urban slums">secondary students in urban slums</option>
            <option value="young people from visible minorities">young people from visible minorities</option>
            <option value="Children under 6 in rural poverty-affected areas">Children under 6 in rural poverty-affected areas</option>
            <option value="universities">universities</option>
            <option value="orphaned and underprivileged children">orphaned and underprivileged children</option>
            <option value="Adolescent girls aged 11-16">Adolescent girls aged 11-16</option>
            <option value="Low-income workers">Low-income workers</option>
            <option value=" factory apparel workers"> factory apparel workers</option>
            <option value="secondary schols">secondary schols</option>
            <option value="Low-income rural communities">Low-income rural communities</option>
            <option value="Low income Hispanic youth">Low income Hispanic youth</option>
            <option value="People facing discrimination due to their HIV / AIDS status or their sexual orientation or gender identity.">People facing discrimination due to their HIV / AIDS status or their sexual orientation or gender identity.</option>
            <option value="17-20 yr old Soccer players of Spanish nationality from low SES families">17-20 yr old Soccer players of Spanish nationality from low SES families</option>
            <option value="low-fee private schools">low-fee private schools</option>
            <option value="graduate students from Asian countries">graduate students from Asian countries</option>
            <option value=" Rural schools without access to internet"> Rural schools without access to internet</option>
            <option value="An estimated 820 visually impaired beneficiaries will be reached by the project over a three year period. This will include 150 blind students and 7">An estimated 820 visually impaired beneficiaries will be reached by the project over a three year period. This will include 150 blind students and 7</option>
            <option value="500 non-disabled students">500 non-disabled students</option>
            <option value=" university staff members and policy makers in Indonesia"> university staff members and policy makers in Indonesia</option>
            <option value=" 305 students and over 2"> 305 students and over 2</option>
            <option value="000 faculty members and university administrators in the Philippines">000 faculty members and university administrators in the Philippines</option>
            <option value=" 330 students and over 1"> 330 students and over 1</option>
            <option value="000 faculty members and administrators in Vietnam">000 faculty members and administrators in Vietnam</option>
            <option value=" 20 students and over 200 university faculty in Myanmar and approximately 15 students and over 200 university faculty and administrators in Cambodia. We are unable at this time to project the number of beneficiaries in Laos until a situation analysis is completed during the first year of the project period."> 20 students and over 200 university faculty in Myanmar and approximately 15 students and over 200 university faculty and administrators in Cambodia. We are unable at this time to project the number of beneficiaries in Laos until a situation analysis is completed during the first year of the project period.</option>
            <option value="primary school teachers in East Mumbai">primary school teachers in East Mumbai</option>
            <option value="Children and women involved in hazardous forms of labor">Children and women involved in hazardous forms of labor</option>
            <option value="exemplary teachers">exemplary teachers</option>
            <option value=" Marginalized families living in urban slum communities and rural areas"> Marginalized families living in urban slum communities and rural areas</option>
            <option value="Science teachers of government girls’ elementary/high schools of tehsil Bahawalpur">Science teachers of government girls’ elementary/high schools of tehsil Bahawalpur</option>
            <option value="refugee camps">refugee camps</option>
            <option value="tribal communities">tribal communities</option>
            <option value=" marginalized groups"> marginalized groups</option>
            <option value=" "> </option>
            <option value="Parents">Parents</option>
            <option value=" Children under 5"> Children under 5</option>
            <option value=" Children 6-12 years"> Children 6-12 years</option>
            <option value=" Adolescents"> Adolescents</option>
            <option value=" Pregnant women"> Pregnant women</option>
            <option value=" Service providers"> Service providers</option>
            <option value="Underserved youth ages 8 to 25">Underserved youth ages 8 to 25</option>
            <option value="Secondary level and adult learners with little or no experience with computers">Secondary level and adult learners with little or no experience with computers</option>
            <option value="children who have been affected by violence">children who have been affected by violence</option>
            <option value="Leaders of government and budget-private schools">Leaders of government and budget-private schools</option>
            <option value="Rural and peri-urban underprivileged children who do not have access to skilled teachers and effective teaching/learning materials">Rural and peri-urban underprivileged children who do not have access to skilled teachers and effective teaching/learning materials</option>
            <option value="refugees">refugees</option>
            <option value="Displaced individuals">Displaced individuals</option>
            <option value="schools ">schools </option>
            <option value="State-run schools">State-run schools</option>
            <option value=" Rural areas"> Rural areas</option>
            <option value="Economically and socially disadvantaged youth">Economically and socially disadvantaged youth</option>
            <option value="school graduates who could not afford formal college education">school graduates who could not afford formal college education</option>
            <option value="English Language learners">English Language learners</option>
            <option value="All stakeholders involved in primary education">All stakeholders involved in primary education</option>
            <option value=" Non-profits"> Non-profits</option>
            <option value="Low SES families">Low SES families</option>
            <option value="all learners">all learners</option>
            <option value="Children from socially and economically disenfranchised communities">Children from socially and economically disenfranchised communities</option>
            <option value="Underprivileged children">Underprivileged children</option>
            <option value=" Schools"> Schools</option>
            <option value="charter schools">charter schools</option>
            <option value="Children who are deaf">Children who are deaf</option>
            <option value=" blind"> blind</option>
            <option value=" or have low vision"> or have low vision</option>
            <option value=" Underprivileged children"> Underprivileged children</option>
            <option value="children of hotel staff">children of hotel staff</option>
            <option value="disability and career services personnel from Japanese institutes of higher education ">disability and career services personnel from Japanese institutes of higher education </option>
            <option value=" Kakuma and Dadaab refugee camp Instant Network Schools"> Kakuma and Dadaab refugee camp Instant Network Schools</option>
            <option value="young people who face disadvantage into secure">young people who face disadvantage into secure</option>
            <option value=" sustainable"> sustainable</option>
            <option value=" high-quality careers in accounting"> high-quality careers in accounting</option>
            <option value=" business and finance."> business and finance.</option>
            <option value="LBB works with all ages and all types of organizations to build leadership skills">LBB works with all ages and all types of organizations to build leadership skills</option>
            <option value="At-risk students">At-risk students</option>
            <option value="adult learners">adult learners</option>
            <option value=" anyone engaged in campaigning"> anyone engaged in campaigning</option>
            <option value=" advocating or litigating for the right to education"> advocating or litigating for the right to education</option>
            <option value="BoP families">BoP families</option>
            <option value="high school students from low-income circumstances ">high school students from low-income circumstances </option>
            <option value="School children in rural and remote areas with unreliable access to an energy grid">School children in rural and remote areas with unreliable access to an energy grid</option>
            <option value="full time undergraduate students with demonstrated financial need">full time undergraduate students with demonstrated financial need</option>
            <option value="Children grades 1-3">Children grades 1-3</option>
            <option value=" Community leaders"> Community leaders</option>
            <option value="low-income adults in the Seattle area">low-income adults in the Seattle area</option>
            <option value="highly deprived communities">highly deprived communities</option>
            <option value="First generation adolescent learners from underprivileged households">First generation adolescent learners from underprivileged households</option>
            <option value="1-year foundational English language programme">1-year foundational English language programme</option>
            <option value=" for Class 2 and above"> for Class 2 and above</option>
            <option value=" Children from non-English environments"> Children from non-English environments</option>
            <option value="victims of violent crimes">victims of violent crimes</option>
            <option value="young people from socially and economically disadvantaged communities">young people from socially and economically disadvantaged communities</option>
            <option value="girls between 12-18 years old">girls between 12-18 years old</option>
            <option value="Underprivileged students of classes 1-8">Underprivileged students of classes 1-8</option>
            <option value="Children of migrant construction workers">Children of migrant construction workers</option>
            <option value=" children of slum dwellers"> children of slum dwellers</option>
            <option value="Nomadic families">Nomadic families</option>
            <option value="Disadvantaged students and families">Disadvantaged students and families</option>
            <option value=" Early childhood children"> Early childhood children</option>
            <option value="Dalit - members of the lowest caste">Dalit - members of the lowest caste</option>
            <option value=" Ethnic minorities"> Ethnic minorities</option>
            <option value=" Indigenous minorities

            2"> Indigenous minorities

            2</option>
            <option value="700 children and young people got the opportunity to break the vicious cycle thanks to SAD and the Dalit Welfare Organisation’s education programme.

            SAD and the DWO built 15 early years centres for children between the ages of three and five. At these centres">700 children and young people got the opportunity to break the vicious cycle thanks to SAD and the Dalit Welfare Organisation’s education programme.

            SAD and the DWO built 15 early years centres for children between the ages of three and five. At these centres</option>
            <option value=" the children did things including developing their fine motor skills"> the children did things including developing their fine motor skills</option>
            <option value=" practicing listening comprehension and looking at quantities in a playful way.

            Marginalised young people up to the age of 22 developed new prospects with vocational training – for example training as motorbike mechanics or seamstresses"> practicing listening comprehension and looking at quantities in a playful way.

            Marginalised young people up to the age of 22 developed new prospects with vocational training – for example training as motorbike mechanics or seamstresses</option>
            <option value=" to name just two of the 21 possible subjects. In the academic part of the six-month course"> to name just two of the 21 possible subjects. In the academic part of the six-month course</option>
            <option value=" the young people learnt the basics of business and developed their social skills."> the young people learnt the basics of business and developed their social skills.</option>
            <option value="Underprivileged government schools and children">Underprivileged government schools and children</option>
            <option value="Displaced refugee and migrant communities on the Thai-Burmese border">Displaced refugee and migrant communities on the Thai-Burmese border</option>
            <option value="Underserved communities">Underserved communities</option>
            <option value="youths living in urban slums">youths living in urban slums</option>
            <option value="low income families">low income families</option>
            <option value="aboriginal youth">aboriginal youth</option>
            <option value="School leaders">School leaders</option>
            <option value="traditionally underrserved and female students">traditionally underrserved and female students</option>
            <option value="Large for-profit vocational institutions; Enterprises">Large for-profit vocational institutions; Enterprises</option>
            <option value=" companies and organizations that provide skill training."> companies and organizations that provide skill training.</option>
            <option value="the children of sex workers">the children of sex workers</option>
            <option value="teachers and schools">teachers and schools</option>
            <option value="Primary Teachers">Primary Teachers</option>
            <option value=" Nomadic communities"> Nomadic communities</option>
            <option value="young Japanese descendants living in Latin America and the Carribean">young Japanese descendants living in Latin America and the Carribean</option>
            <option value="youth that have been in the care of the state">youth that have been in the care of the state</option>
            <option value="children working as garbage pickers">children working as garbage pickers</option>
            <option value=" Working children"> Working children</option>
            <option value="low SES families">low SES families</option>
            <option value=" School-going children"> School-going children</option>
            <option value=" visible minorities"> visible minorities</option>
            <option value=" Low-income impoverished families"> Low-income impoverished families</option>
            <option value="Marginalized children">Marginalized children</option>
            <option value=" Children from slum households"> Children from slum households</option>
            <option value="children who are highly vulnerable to exploitation">children who are highly vulnerable to exploitation</option>
            <option value=" victimization and trafficking"> victimization and trafficking</option>
            <option value=" including orphans"> including orphans</option>
            <option value=" street children"> street children</option>
            <option value=" abandoned children"> abandoned children</option>
            <option value=" and extremely impoverished children from tribal areas."> and extremely impoverished children from tribal areas.</option>
            <option value=" Children living in slums"> Children living in slums</option>
            <option value="Underprivileged youth">Underprivileged youth</option>
            <option value=" Excluded communities"> Excluded communities</option>
            <option value="Global community of students">Global community of students</option>
            <option value=" parents"> parents</option>
            <option value=" and educators"> and educators</option>
            <option value="Children in the pre-school age group and their families">Children in the pre-school age group and their families</option>
            <option value=" Mothers"> Mothers</option>
            <option value="Government aided schools">Government aided schools</option>
            <option value=" Affordable schools"> Affordable schools</option>
            <option value="Children in Grade 3 to 5">Children in Grade 3 to 5</option>
            <option value="Local students">Local students</option>
            <option value="School drop-outs">School drop-outs</option>
            <option value="Children in public schools">Children in public schools</option>
            <option value=" Children in municipal schools"> Children in municipal schools</option>
            <option value=" Socially and economically disadvantaged children of urban slum communities in Mumbai & Pune"> Socially and economically disadvantaged children of urban slum communities in Mumbai & Pune</option>
            <option value="young women">young women</option>
            <option value="adolescent girls in urban slums">adolescent girls in urban slums</option>
            <option value="schools and school districts">schools and school districts</option>
            <option value="Girls and boys in the age group of 14 - 16 who are studying in urban and rural secondary schools ">Girls and boys in the age group of 14 - 16 who are studying in urban and rural secondary schools </option>
            <option value=" Schools suffering from at least three hours of power cuts during school hours"> Schools suffering from at least three hours of power cuts during school hours</option>
            <option value="students">students</option>
            <option value=" particularly girls"> particularly girls</option>
            <option value=" in socio-economically marginalized urban communities in Chennai"> in socio-economically marginalized urban communities in Chennai</option>
            <option value="Youth with disabilities">Youth with disabilities</option>
            <option value=" Underprivileged youth"> Underprivileged youth</option>
            <option value=" Unemployed youth ages 18-25"> Unemployed youth ages 18-25</option>
            <option value="Qatari nationals">Qatari nationals</option>
            <option value="Students enrolled in undergraduate studies in Education City">Students enrolled in undergraduate studies in Education City</option>
            <option value="primary school teachers">primary school teachers</option>
            <option value="Unemployed youth">Unemployed youth</option>
            <option value=" Unemployed and displacedworkers"> Unemployed and displacedworkers</option>
            <option value="students who are victims of insurgencies">students who are victims of insurgencies</option>
            <option value=" teachers’ strike and poverty"> teachers’ strike and poverty</option>
            <option value="girls who have been living on the street">girls who have been living on the street</option>
            <option value="Indian citizens that require financial assistance to attend Cambridge">Indian citizens that require financial assistance to attend Cambridge</option>
            <option value="marginalized youth in London and Manchester">marginalized youth in London and Manchester</option>
            <option value="Rural communities">Rural communities</option>
            <option value=" Impoverished families"> Impoverished families</option>
            <option value="under-resourced schools">under-resourced schools</option>
            <option value="children from low-income homes">children from low-income homes</option>
            <option value="all educators">all educators</option>
            <option value="TOEIC students">TOEIC students</option>
            <option value="women owners of small businesses">women owners of small businesses</option>
            <option value="Young people">Young people</option>
            <option value="Health care professionals">Health care professionals</option>
            <option value=" leaders for the health care industry"> leaders for the health care industry</option>
            <option value="Cultural institutions">Cultural institutions</option>
            <option value=" small children irrespective of their background and social status; preschools and elementary schools"> small children irrespective of their background and social status; preschools and elementary schools</option>
            <option value="All schools in Germany as well government agencies">All schools in Germany as well government agencies</option>
            <option value=" teacher training institutes"> teacher training institutes</option>
            <option value=" municipalities"> municipalities</option>
            <option value=" and private school operators. "> and private school operators. </option>
            <option value="Members of the public">Members of the public</option>
            <option value=" decision-makers"> decision-makers</option>
            <option value=" and opinion leaders who are engaged in driving the social change in their countries."> and opinion leaders who are engaged in driving the social change in their countries.</option>
            <option value="Those people and organizations who work to maintain and foster the cause of an open and social society within difficult environments. ">Those people and organizations who work to maintain and foster the cause of an open and social society within difficult environments. </option>
            <option value="Professionals in the cultural sector">Professionals in the cultural sector</option>
            <option value=" leaders"> leaders</option>
            <option value=" and schools for international exchanges"> and schools for international exchanges</option>
            <option value="International mediation organizations and local mediation initiatives">International mediation organizations and local mediation initiatives</option>
            <option value="Well-informed citizens">Well-informed citizens</option>
            <option value=" scientists"> scientists</option>
            <option value=" children and young people with diverse sociogeographic backgrounds and various education levels"> children and young people with diverse sociogeographic backgrounds and various education levels</option>
            <option value=" researchers and scientists"> researchers and scientists</option>
            <option value="Health care system">Health care system</option>
            <option value=" health care leaders"> health care leaders</option>
            <option value="200 students from all around the world">200 students from all around the world</option>
            <option value=" aged 16-19"> aged 16-19</option>
            <option value="exceptional children">exceptional children</option>
            <option value="migrant workers in Nepal">migrant workers in Nepal</option>
            <option value="Low literacy or illiterate rural women">Low literacy or illiterate rural women</option>
            <option value="Unemployed youth from rural and semi-urban backgrounds">Unemployed youth from rural and semi-urban backgrounds</option>
            <option value="school-leavers">school-leavers</option>
            <option value="rural communities in China">rural communities in China</option>
            <option value="Girls living in rural areas">Girls living in rural areas</option>
            <option value="villages with no or inadequate schools">villages with no or inadequate schools</option>
            <option value="students who will be attending a faculty of education">students who will be attending a faculty of education</option>
            <option value="Girl leaders">Girl leaders</option>
            <option value=" Adolescent girls aged 11-16"> Adolescent girls aged 11-16</option>
            <option value=" Children of migrant labourers"> Children of migrant labourers</option>
            <option value=" Slum dwelling children"> Slum dwelling children</option>
            <option value=" Minority families"> Minority families</option>
            <option value=" Government schools"> Government schools</option>
            <option value="Non-state and state financed schools ">Non-state and state financed schools </option>
            <option value="low income students in government schools">low income students in government schools</option>
            <option value="low SES communities">low SES communities</option>
            <option value=" Fragile and Conflict-Affected States"> Fragile and Conflict-Affected States</option>
            <option value="Disadvantaged children and young adults">Disadvantaged children and young adults</option>
            <option value="Each family housed by One Life One Chance receives our books">Each family housed by One Life One Chance receives our books</option>
            <option value="private schools and families">private schools and families</option>
            <option value="the poorest of the poor">the poorest of the poor</option>
            <option value="School going children">School going children</option>
            <option value="Youth">Youth</option>
            <option value=" Low-income children"> Low-income children</option>
            <option value=" Young adults from vulnerable backgrounds"> Young adults from vulnerable backgrounds</option>
            <option value="young women in Northern Nigeria currently enrolled in secondary education">young women in Northern Nigeria currently enrolled in secondary education</option>
            <option value="refugees and migrants">refugees and migrants</option>
            <option value="middle school students grade 7 - 9 ">middle school students grade 7 - 9 </option>
            <option value=" Disadvantaged areas"> Disadvantaged areas</option>
            <option value="Disadvantaged students from the poorest districts in Vietnam ">Disadvantaged students from the poorest districts in Vietnam </option>
            <option value="children with special needs">children with special needs</option>
            <option value="Impact Awards winners">Impact Awards winners</option>
            <option value="street children and youth with disabilities">street children and youth with disabilities</option>
            <option value="Indigenous tribal groups">Indigenous tribal groups</option>
            <option value=" Pregnant Women; Mothers; Infants 0-28 days"> Pregnant Women; Mothers; Infants 0-28 days</option>
            <option value=" 0-2 years"> 0-2 years</option>
            <option value=" 3-6 years"> 3-6 years</option>
            <option value="areas where either because there are no connectivity or there's no electricity">areas where either because there are no connectivity or there's no electricity</option>
            <option value=" the infrastructure for online education is not possible"> the infrastructure for online education is not possible</option>
            <option value=" Excluded populations"> Excluded populations</option>
            <option value="Students in Class 6 to 12.">Students in Class 6 to 12.</option>
            <option value="Youth entrepreneurs">Youth entrepreneurs</option>
            <option value="low-income">low-income</option>
            <option value=" first generation college students "> first generation college students </option>
            <option value="(Bottom of the pyramid) underprivileged children">(Bottom of the pyramid) underprivileged children</option>
            <option value="migrant workers in the sugarcane industry">migrant workers in the sugarcane industry</option>
            <option value="highly motivated underprivileged secondary school students in Hong Kong">highly motivated underprivileged secondary school students in Hong Kong</option>
            <option value=" Marginalized children"> Marginalized children</option>
            <option value="Cotton farmers">Cotton farmers</option>
            <option value="Government primary schools">Government primary schools</option>
            <option value=" Administration"> Administration</option>
            <option value=" undergrads"> undergrads</option>
            <option value=" graduate students"> graduate students</option>
            <option value=" new teachers"> new teachers</option>
            <option value="While the program impacts several countries the main focus is Indonesia">While the program impacts several countries the main focus is Indonesia</option>
            <option value="outstanding academics">outstanding academics</option>
            <option value="outstanding students">outstanding students</option>
            <option value=" Disadvantaged communities"> Disadvantaged communities</option>
            <option value="individuals who already have a Bachelor degree">individuals who already have a Bachelor degree</option>
            <option value=" High-needs schools"> High-needs schools</option>
            <option value=" Under-resourced schools"> Under-resourced schools</option>
            <option value=" 2 elementary and high schools in 3 districts (Chakwal"> 2 elementary and high schools in 3 districts (Chakwal</option>
            <option value=" Lahore"> Lahore</option>
            <option value=" Vehari)"> Vehari)</option>
            <option value=" parents and children in countries around the world"> parents and children in countries around the world</option>
            <option value="Low-income schools">Low-income schools</option>
            <option value=" College graduates"> College graduates</option>
            <option value="rural children and youth">rural children and youth</option>
            <option value=" Motivated and capable students with financial need and in their last 2 years of higher education"> Motivated and capable students with financial need and in their last 2 years of higher education</option>
            <option value="South African citizens">South African citizens</option>
            <option value="Children aged 6 to 13">Children aged 6 to 13</option>
            <option value="Girls aged 10 to 14">Girls aged 10 to 14</option>
            <option value="out-of-school girls in the age group 11-14 years who have either dropped out of schools or never been enrolled in a school.">out-of-school girls in the age group 11-14 years who have either dropped out of schools or never been enrolled in a school.</option>
            <option value="children of the employees of Godrej & Boyce Mfg. Co. Ltd employees and its subsidiaries">children of the employees of Godrej & Boyce Mfg. Co. Ltd employees and its subsidiaries</option>
            <option value=" associates and affiliates.  "> associates and affiliates.  </option>
            <option value="visible minorities ">visible minorities </option>
            <option value="undergraduate students at the University of Malaya">undergraduate students at the University of Malaya</option>
            <option value="less educated">less educated</option>
            <option value=" unemployed and economically backward youth "> unemployed and economically backward youth </option>
            <option value="Economically disadvantaged girls and women">Economically disadvantaged girls and women</option>
            <option value=" Low-income communities"> Low-income communities</option>
            <option value="undergraduates in STEM fields">undergraduates in STEM fields</option>
            <option value=" Low-income schools"> Low-income schools</option>
            <option value="Parents and children in rural Andhra Pradesh">Parents and children in rural Andhra Pradesh</option>
            <option value="Rural students">Rural students</option>
            <option value=" School drop-outs"> School drop-outs</option>
            <option value=" Rural government high schools"> Rural government high schools</option>
            <option value="children of martyrs from the from Central Armed Police Forces vide BSF">children of martyrs from the from Central Armed Police Forces vide BSF</option>
            <option value=" CRPF"> CRPF</option>
            <option value=" CISF"> CISF</option>
            <option value=" ITBP"> ITBP</option>
            <option value=" SSB & Assam Rifles from across India "> SSB & Assam Rifles from across India </option>
            <option value="Para military forces.">Para military forces.</option>
            <option value="students with demonstrated financial need">students with demonstrated financial need</option>
            <option value="Talukas">Talukas</option>
            <option value=" Vocational students"> Vocational students</option>
            <option value=" Tertiary students"> Tertiary students</option>
            <option value=" Unemployed youth"> Unemployed youth</option>
            <option value=" Economically backward youth"> Economically backward youth</option>
            <option value="Students with disabilities">Students with disabilities</option>
            <option value="Voices has no admission requirements">Voices has no admission requirements</option>
            <option value=" but they target Spanish speaking children"> but they target Spanish speaking children</option>
            <option value="students in general">students in general</option>
            <option value="Local schools">Local schools</option>
            <option value="Youth volunteers">Youth volunteers</option>
            <option value=" Underserved communities"> Underserved communities</option>
            <option value="veterans and their family">veterans and their family</option>
            <option value="high-achieving African American women pursuing degrees in the physical sciences ">high-achieving African American women pursuing degrees in the physical sciences </option>
            <option value=" mostly aged 18-35"> mostly aged 18-35</option>
            <option value=" living in slums and resettlement colonies in cities"> living in slums and resettlement colonies in cities</option>
            <option value=" with meagre economic capital"> with meagre economic capital</option>
            <option value="Union leaders">Union leaders</option>
            <option value=" human resource managers or supervisors"> human resource managers or supervisors</option>
            <option value=" shop stewards and worker and employer representatives from garment factories"> shop stewards and worker and employer representatives from garment factories</option>
            <option value="Vocational program graduates">Vocational program graduates</option>
            <option value="Youth in schools">Youth in schools</option>
            <option value="Graduates who are previously sponsored by KEMBALI Program who come from an economically disadvantaged family">Graduates who are previously sponsored by KEMBALI Program who come from an economically disadvantaged family</option>
            <option value="Mothers">Mothers</option>
            <option value=" Community youth"> Community youth</option>
            <option value=" School leaders"> School leaders</option>
            <option value="Private schools">Private schools</option>
            <option value="Low-income communities">Low-income communities</option>
            <option value=" private-public schools"> private-public schools</option>
            <option value="Rural communities across India ">Rural communities across India </option>
            <option value="Government schools ">Government schools </option>
            <option value="Teachers in low-resource communities">Teachers in low-resource communities</option>
            <option value="Low-income families">Low-income families</option>
            <option value="Senior talent from diverse backgrounds ">Senior talent from diverse backgrounds </option>
            <option value="Recent teacher (B.Ed) graduates">Recent teacher (B.Ed) graduates</option>
            <option value=" catering to low-income schools"> catering to low-income schools</option>
            <option value="Our students come from Pune’s most under-resourced homes.">Our students come from Pune’s most under-resourced homes.</option>
            <option value="ECE children from low-income communities">ECE children from low-income communities</option>
            <option value="Secondary school students in rural communities who don't have access to internet">Secondary school students in rural communities who don't have access to internet</option>
            </select>

            <div id="targetPopSector">
              <ul>
                {
                  this.state.targetPopulationSectors.map(sector => {
                    return (
                      <this.buttonMaker key={sector} name={sector} category="targetPopSector"/>
                    );
                  })
                }
              </ul>
            </div>
            {this.fieldStatus(this.state.originalReviews.targetPopulationSectorsA)}
            <br></br><br></br>

            <p>Outcomes Monitored<br></br>Select all that apply:</p>
            <select id="outcome" name="outcomesMonitored" onChange={this.addOutcome}>
            <option value="base">Choose an Outcome</option>
            <option value="Standardized assessment performance">Standardized assessment performance</option>
            <option value=" User satisfaction"> User satisfaction</option>
            <option value=" Student attendance"> Student attendance</option>
            <option value=" Student retention"> Student retention</option>
            <option value=" Increased enrollment"> Increased enrollment</option>
            <option value=" The program monitors its results through regular reporting and visits to the target schools. Visits to the project site during the duration of the project were conducted by the project internal evaluation focal person"> The program monitors its results through regular reporting and visits to the target schools. Visits to the project site during the duration of the project were conducted by the project internal evaluation focal person</option>
            <option value=" Ilm Ideas (donor) managers"> Ilm Ideas (donor) managers</option>
            <option value=" and project senior management."> and project senior management.</option>
            <option value="missing">missing</option>
            <option value="Internal assessment performance">Internal assessment performance</option>
            <option value=" Ability to reach the poor"> Ability to reach the poor</option>
            <option value="unclear">unclear</option>
            <option value="User satisfaction">User satisfaction</option>
            <option value=" Graduation or promotion rates"> Graduation or promotion rates</option>
            <option value="standardized assessment">standardized assessment</option>
            <option value=" student outcomes for special needs students and ELL"> student outcomes for special needs students and ELL</option>
            <option value=" parental demand"> parental demand</option>
            <option value=" awards"> awards</option>
            <option value=" Internal assessment performance"> Internal assessment performance</option>
            <option value="total number of centers constructed">total number of centers constructed</option>
            <option value=" number of students served"> number of students served</option>
            <option value=" number of teachers served"> number of teachers served</option>
            <option value="Other">Other</option>
            <option value=" Learning outcomes"> Learning outcomes</option>
            <option value=" Student and teacher engagement"> Student and teacher engagement</option>
            <option value=" Increased enrolment"> Increased enrolment</option>
            <option value="Could not locate.">Could not locate.</option>
            <option value=" Employment rates"> Employment rates</option>
            <option value=" Teacher attendance"> Teacher attendance</option>
            <option value=" Cost effectiveness/value for money"> Cost effectiveness/value for money</option>
            <option value=" Other"> Other</option>
            <option value=" See attachment"> See attachment</option>
            <option value="unversity placement of program alumni">unversity placement of program alumni</option>
            <option value=" employment placements for alumni"> employment placements for alumni</option>
            <option value=" number of ventures funded by alumni"> number of ventures funded by alumni</option>
            <option value="Graduation or promotion rates">Graduation or promotion rates</option>
            <option value="Missing">Missing</option>
            <option value="Student retention">Student retention</option>
            <option value="Student attendance">Student attendance</option>
            <option value="test scores">test scores</option>
            <option value=" number of students reached"> number of students reached</option>
            <option value=" number of communities reached"> number of communities reached</option>
            <option value=" number of teachers trained"> number of teachers trained</option>
            <option value="student outcomes">student outcomes</option>
            <option value=" parental satisfaction"> parental satisfaction</option>
            <option value=" Parenting practices"> Parenting practices</option>
            <option value=" dietary practices"> dietary practices</option>
            <option value=" parental knowledge"> parental knowledge</option>
            <option value="number of people through the program">number of people through the program</option>
            <option value=" Student Attendance"> Student Attendance</option>
            <option value=" Teacher retention"> Teacher retention</option>
            <option value=" Development of councils"> Development of councils</option>
            <option value=" number of citizens participating in committees/councils"> number of citizens participating in committees/councils</option>
            <option value="research outputs">research outputs</option>
            <option value=" "> </option>
            <option value="number of scholarships granted">number of scholarships granted</option>
            <option value=" total $ amount of scholarships granted"> total $ amount of scholarships granted</option>
            <option value=" college completion rates of scholars"> college completion rates of scholars</option>
            <option value="number of students">number of students</option>
            <option value=" Graduation or performance rates"> Graduation or performance rates</option>
            <option value=" Proactive involvement of parents"> Proactive involvement of parents</option>
            <option value=" community"> community</option>
            <option value=" local CBOs and CBIs"> local CBOs and CBIs</option>
            <option value="number of students who have completed the program">number of students who have completed the program</option>
            <option value=" number of cities included in the program"> number of cities included in the program</option>
            <option value=" Cost effectiveness/ value for money"> Cost effectiveness/ value for money</option>
            <option value="Ability to reach the poor">Ability to reach the poor</option>
            <option value=" Number of entrepreneurs supported"> Number of entrepreneurs supported</option>
            <option value=" percentage who are women"> percentage who are women</option>
            <option value=" number of stated programs solved by enterprises"> number of stated programs solved by enterprises</option>
            <option value=" number of people impacted in each community; number of jobs created; amount earned by each employee and effect on family; and more"> number of people impacted in each community; number of jobs created; amount earned by each employee and effect on family; and more</option>
            <option value=" Transparency and effective management"> Transparency and effective management</option>
            <option value=" access to facilities"> access to facilities</option>
            <option value=" Increased enrolment "> Increased enrolment </option>
            <option value="number of youth trained">number of youth trained</option>
            <option value=" employment outcomes after completion"> employment outcomes after completion</option>
            <option value=" including salary"> including salary</option>
            <option value=" promotions after 1 year."> promotions after 1 year.</option>
            <option value=" Staff appraisals"> Staff appraisals</option>
            <option value=" Donor management"> Donor management</option>
            <option value="Job and internship attainment after the program">Job and internship attainment after the program</option>
            <option value=" changes in social network of fellows"> changes in social network of fellows</option>
            <option value=" satisfaction level of the fellows"> satisfaction level of the fellows</option>
            <option value="number of meals and snacks served">number of meals and snacks served</option>
            <option value=" Improvement in teaching practices"> Improvement in teaching practices</option>
            <option value="Improvement in teaching practices">Improvement in teaching practices</option>
            <option value=" Necessary research"> Necessary research</option>
            <option value=" Policy amendment/development/implementation"> Policy amendment/development/implementation</option>
            <option value=" Number of councils/committees created"> Number of councils/committees created</option>
            <option value=" Number of citizens capacitated"> Number of citizens capacitated</option>
            <option value=" Leadership Competence"> Leadership Competence</option>
            <option value=" Teaching Quality"> Teaching Quality</option>
            <option value=" School-based outcomes"> School-based outcomes</option>
            <option value=" Student academic progress"> Student academic progress</option>
            <option value=" Enrollment"> Enrollment</option>
            <option value=" and retention rates"> and retention rates</option>
            <option value="number of girls supported">number of girls supported</option>
            <option value=" annual review of their work"> annual review of their work</option>
            <option value=" Life preparedness"> Life preparedness</option>
            <option value="Number of interface users">Number of interface users</option>
            <option value=" frequency of use"> frequency of use</option>
            <option value=" materials accessed"> materials accessed</option>
            <option value="student and teacher experiential feedback">student and teacher experiential feedback</option>
            <option value="outputs online">outputs online</option>
            <option value=" website veiws"> website veiws</option>
            <option value=" facebook friends"> facebook friends</option>
            <option value=" partnerships"> partnerships</option>
            <option value="unclear (in German only)">unclear (in German only)</option>
            <option value="  Number of study hours ">  Number of study hours </option>
            <option value=" reduction of kerosene use in the house"> reduction of kerosene use in the house</option>
            <option value=" reduction of indoor air pollution in the house"> reduction of indoor air pollution in the house</option>
            <option value="number of students reached">number of students reached</option>
            <option value=" number of schools reached"> number of schools reached</option>
            <option value="user reviews">user reviews</option>
            <option value="quasi-experimental external evaluation of the implementation and impact of the Citizen Schools Expanded Learning Time; rigorous longitudinal study of our Boston program from 2001 to 2010 ">quasi-experimental external evaluation of the implementation and impact of the Citizen Schools Expanded Learning Time; rigorous longitudinal study of our Boston program from 2001 to 2010 </option>
            <option value="diversity of users">diversity of users</option>
            <option value=" teachers trained"> teachers trained</option>
            <option value=" student proficiency"> student proficiency</option>
            <option value=" global reach"> global reach</option>
            <option value=" external evaluations"> external evaluations</option>
            <option value="misisng">misisng</option>
            <option value="number of awards granted">number of awards granted</option>
            <option value="students who come from challenging backgrounds">students who come from challenging backgrounds</option>
            <option value="Community satisfaction">Community satisfaction</option>
            <option value="Teacher attendance">Teacher attendance</option>
            <option value="?Graduation or promotion rates">?Graduation or promotion rates</option>
            <option value="number of scholarships awarded">number of scholarships awarded</option>
            <option value="number of students served">number of students served</option>
            <option value=" number of schools served"> number of schools served</option>
            <option value="The primary objective of the study is to track the impact of the contract agreement on the academic performance of 7th and 8th graders in the treatment versus control schools">The primary objective of the study is to track the impact of the contract agreement on the academic performance of 7th and 8th graders in the treatment versus control schools</option>
            <option value=" Improvement of scores on a REAP-administered standardized baseline test"> Improvement of scores on a REAP-administered standardized baseline test</option>
            <option value=" Student scores on China’s standardized High School Admissions Test"> Student scores on China’s standardized High School Admissions Test</option>
            <option value=" Student grade rankings in Math"> Student grade rankings in Math</option>
            <option value=" Chinese"> Chinese</option>
            <option value=" and English"> and English</option>
            <option value=" A standardized REAP administered self-esteem test"> A standardized REAP administered self-esteem test</option>
            <option value=" A survey detailing the student plans for high school and beyond"> A survey detailing the student plans for high school and beyond</option>
            <option value=" The rate of matriculation to high school"> The rate of matriculation to high school</option>
            <option value="External RCT trial">External RCT trial</option>
            <option value=" student test scores"> student test scores</option>
            <option value=" internal evaluations"> internal evaluations</option>
            <option value="college placements">college placements</option>
            <option value=" college graduation rates"> college graduation rates</option>
            <option value=" student outcomes in literacy and math"> student outcomes in literacy and math</option>
            <option value=" All of CW4WAfghan programs are rigorously assessed to ensure performance and meeting of goals"> All of CW4WAfghan programs are rigorously assessed to ensure performance and meeting of goals</option>
            <option value=" and donors/project sponsors are invited to conduct site visits and monitoring activities to address challenges and opportunities in a collaborative manner. CW4WAfghan is in the process of shaping their performance measurement framework for the online library and center."> and donors/project sponsors are invited to conduct site visits and monitoring activities to address challenges and opportunities in a collaborative manner. CW4WAfghan is in the process of shaping their performance measurement framework for the online library and center.</option>
            <option value="Student exam results">Student exam results</option>
            <option value="number of scholars">number of scholars</option>
            <option value=" college completion rates"> college completion rates</option>
            <option value=" job placements after graduation"> job placements after graduation</option>
            <option value=" Students' and teachers' skills"> Students' and teachers' skills</option>
            <option value=" attitudes"> attitudes</option>
            <option value=" and motivation to solve a problem"> and motivation to solve a problem</option>
            <option value="standardized test results">standardized test results</option>
            <option value=" college palcements"> college palcements</option>
            <option value="awards for the program">awards for the program</option>
            <option value=" customer satisfaction"> customer satisfaction</option>
            <option value="number of engineers trained">number of engineers trained</option>
            <option value=" number of projects supported"> number of projects supported</option>
            <option value=" number of fellowships"> number of fellowships</option>
            <option value="dollars raised">dollars raised</option>
            <option value=" number of projects funded"> number of projects funded</option>
            <option value=" number of students helped"> number of students helped</option>
            <option value=" number of teachers helped"> number of teachers helped</option>
            <option value="student demographics">student demographics</option>
            <option value=" high school graduation rates"> high school graduation rates</option>
            <option value=" college placement rates"> college placement rates</option>
            <option value=" Standardized assessment performance"> Standardized assessment performance</option>
            <option value="number of students impacted">number of students impacted</option>
            <option value=" number of times organization profiled in national and local media"> number of times organization profiled in national and local media</option>
            <option value=" number of states engaged"> number of states engaged</option>
            <option value=" development of councils"> development of councils</option>
            <option value="number of students sponsored">number of students sponsored</option>
            <option value=" graduation rates"> graduation rates</option>
            <option value="Internal assessment">Internal assessment</option>
            <option value=" performance"> performance</option>
            <option value=" Institutional capability of community based structures"> Institutional capability of community based structures</option>
            <option value="number of fortune 500 companies which have used their services">number of fortune 500 companies which have used their services</option>
            <option value="third party impact study">third party impact study</option>
            <option value="number of districts using the service">number of districts using the service</option>
            <option value=" student progress"> student progress</option>
            <option value="number of youth reached">number of youth reached</option>
            <option value=" employment outcomes"> employment outcomes</option>
            <option value="number of women trained">number of women trained</option>
            <option value="Standard assessment performance">Standard assessment performance</option>
            <option value=" Increased enrollment

            To assess whether our Cooperative Reflective Learning based academic support centres are effective in improving learning levels of children"> Increased enrollment

            To assess whether our Cooperative Reflective Learning based academic support centres are effective in improving learning levels of children</option>
            <option value=" these classes were monitored through a two- year"> these classes were monitored through a two- year</option>
            <option value=" rigorous"> rigorous</option>
            <option value=" randomised controlled trial. The trial took place in Mahabubnagar district of Telangana. Called Support to Rural India’s Primary Education System (STRIPES)"> randomised controlled trial. The trial took place in Mahabubnagar district of Telangana. Called Support to Rural India’s Primary Education System (STRIPES)</option>
            <option value="geographical reach">geographical reach</option>
            <option value=" number of students impacted"> number of students impacted</option>
            <option value=" number of schools/school districts engaged"> number of schools/school districts engaged</option>
            <option value=" success stories"> success stories</option>
            <option value=" Improvement of ECD-related knowledge and behavioral change among teachers

            Monitored metrics:
            Standardized assessment performance
            Internal assessment performance
            User satisfaction
            Graduation or promotion rates
            Student retention
            student participation"> Improvement of ECD-related knowledge and behavioral change among teachers

            Monitored metrics:
            Standardized assessment performance
            Internal assessment performance
            User satisfaction
            Graduation or promotion rates
            Student retention
            student participation</option>
            <option value=" cooperation"> cooperation</option>
            <option value=" relationships between students"> relationships between students</option>
            <option value=" teachers"> teachers</option>
            <option value=" and parents"> and parents</option>
            <option value=" An external evaluation agency assesses the children's performance in a random set of villages every year. The state level monitoring team visits the villages every month to ensure quality. Course corrections are suggested based on monthly data collected from the field"> An external evaluation agency assesses the children's performance in a random set of villages every year. The state level monitoring team visits the villages every month to ensure quality. Course corrections are suggested based on monthly data collected from the field</option>
            <option value="Lessons planned vs actual classes">Lessons planned vs actual classes</option>
            <option value=" Learning outcome through assessment"> Learning outcome through assessment</option>
            <option value=" Teacher fulfilment and effectiveness"> Teacher fulfilment and effectiveness</option>
            <option value="testimonials">testimonials</option>
            <option value=" impact of the program on students future interests/goals related to STEM and accessing higher education"> impact of the program on students future interests/goals related to STEM and accessing higher education</option>
            <option value="number of teachers trained">number of teachers trained</option>
            <option value="parental survey">parental survey</option>
            <option value=" number of families engaged"> number of families engaged</option>
            <option value=" number of training workshops"> number of training workshops</option>
            <option value=" number of home visits"> number of home visits</option>
            <option value="number of students and teachers who have accessed the program">number of students and teachers who have accessed the program</option>
            <option value=" number of volunteers"> number of volunteers</option>
            <option value="scholar publications">scholar publications</option>
            <option value=" testimonials"> testimonials</option>
            <option value="independent impact assessment">independent impact assessment</option>
            <option value=" student literacy gains"> student literacy gains</option>
            <option value="student assessment">student assessment</option>
            <option value=" post-secondary destinations"> post-secondary destinations</option>
            <option value=" international and national awards won by students"> international and national awards won by students</option>
            <option value="number of students who have accessed the program">number of students who have accessed the program</option>
            <option value=" number of teachers engaged"> number of teachers engaged</option>
            <option value=" number of student leaders engaged"> number of student leaders engaged</option>
            <option value=" standardized test results; user satisfaction"> standardized test results; user satisfaction</option>
            <option value=" Accuracy of program delivery"> Accuracy of program delivery</option>
            <option value=" implementation"> implementation</option>
            <option value=" and reporting"> and reporting</option>
            <option value=" Community Impact"> Community Impact</option>
            <option value="external evaluations">external evaluations</option>
            <option value="Student progress">Student progress</option>
            <option value="number of girls impacted">number of girls impacted</option>
            <option value="unclear - website is in Indonesian">unclear - website is in Indonesian</option>
            <option value=" Accuracy and delivery of the program"> Accuracy and delivery of the program</option>
            <option value="number of scholarships given">number of scholarships given</option>
            <option value=" total amount given"> total amount given</option>
            <option value=" Standard assessment performance"> Standard assessment performance</option>
            <option value="research projects fellows have contributed to">research projects fellows have contributed to</option>
            <option value=" number of mentors"> number of mentors</option>
            <option value=" college enrollment"> college enrollment</option>
            <option value=" college completion"> college completion</option>
            <option value=" number of first-generation college students"> number of first-generation college students</option>
            <option value=" Dropout Rates"> Dropout Rates</option>
            <option value="students enrolled">students enrolled</option>
            <option value=" student employment outcomes"> student employment outcomes</option>
            <option value=" other outcomes"> other outcomes</option>
            <option value="number of schools served">number of schools served</option>
            <option value="  geographic disbursement of loans">  geographic disbursement of loans</option>
            <option value=" demographic data of borrowers"> demographic data of borrowers</option>
            <option value="number of teachers">number of teachers</option>
            <option value=" number of students"> number of students</option>
            <option value=" number of Instant network schools"> number of Instant network schools</option>
            <option value="student attendance">student attendance</option>
            <option value=" teacher and student engagement with ITC"> teacher and student engagement with ITC</option>
            <option value="Partner organizations that use the Learn Easy Steps software submit quarterly reports">Partner organizations that use the Learn Easy Steps software submit quarterly reports</option>
            <option value="number of children impacted">number of children impacted</option>
            <option value=" geographic reach of the program"> geographic reach of the program</option>
            <option value="industry rankings">industry rankings</option>
            <option value=" student achievements post graduation"> student achievements post graduation</option>
            <option value=" corporations who have accessed their programs to train staff"> corporations who have accessed their programs to train staff</option>
            <option value="changes in attitude towards STEM">changes in attitude towards STEM</option>
            <option value="number of students enrolled">number of students enrolled</option>
            <option value=" Generic assessment"> Generic assessment</option>
            <option value=" reports on teacher training"> reports on teacher training</option>
            <option value=" progress of module development"> progress of module development</option>
            <option value=" number of students accepted to post-secondary"> number of students accepted to post-secondary</option>
            <option value="academic rankings">academic rankings</option>
            <option value=" student academic awards"> student academic awards</option>
            <option value=" Effectiveness of remedial interventions"> Effectiveness of remedial interventions</option>
            <option value=" unique users accessing website information"> unique users accessing website information</option>
            <option value=" number of corrective measures taken up by schools to improve quality of education"> number of corrective measures taken up by schools to improve quality of education</option>
            <option value=" number of school leaders trained"> number of school leaders trained</option>
            <option value=" changes in enrollment"> changes in enrollment</option>
            <option value=" impact on the learning environment"> impact on the learning environment</option>
            <option value=" impact on the school environments"> impact on the school environments</option>
            <option value=" number of alumni"> number of alumni</option>
            <option value=" starting salary"> starting salary</option>
            <option value="student progress">student progress</option>
            <option value=" external studies"> external studies</option>
            <option value="enrollment of children">enrollment of children</option>
            <option value=" regular attendance of children and teachers"> regular attendance of children and teachers</option>
            <option value=" division according to learning level"> division according to learning level</option>
            <option value=" child assessments (Hindi"> child assessments (Hindi</option>
            <option value=" English"> English</option>
            <option value=" and math)"> and math)</option>
            <option value=" weekly and monthly tests"> weekly and monthly tests</option>
            <option value=" maintaining and updating children's profiles"> maintaining and updating children's profiles</option>
            <option value=" open group meetings"> open group meetings</option>
            <option value=" work description vs. time sheets"> work description vs. time sheets</option>
            <option value=" monthly planning at team meetings and quarterly board meetings"> monthly planning at team meetings and quarterly board meetings</option>
            <option value=" quarterly reports"> quarterly reports</option>
            <option value=" maintenance of expenditures in Google Drive"> maintenance of expenditures in Google Drive</option>
            <option value=" proper audits"> proper audits</option>
            <option value=" community and household visits"> community and household visits</option>
            <option value=" parent and teacher meetings"> parent and teacher meetings</option>
            <option value="user reviews and testimonials">user reviews and testimonials</option>
            <option value="attendance rate">attendance rate</option>
            <option value=" parental engagment"> parental engagment</option>
            <option value="student performance data">student performance data</option>
            <option value=" number of students graduated the program"> number of students graduated the program</option>
            <option value=" number of trained teachers"> number of trained teachers</option>
            <option value="institutional rankings">institutional rankings</option>
            <option value=" number of students enrolled"> number of students enrolled</option>
            <option value=" number of students employed after graduation"> number of students employed after graduation</option>
            <option value=" impact of training on students based on improved test results"> impact of training on students based on improved test results</option>
            <option value="program mentors">program mentors</option>
            <option value="apprenticeship placements">apprenticeship placements</option>
            <option value=" number of students who have passed English Entrance Exams to military schools"> number of students who have passed English Entrance Exams to military schools</option>
            <option value="high school graduation rates">high school graduation rates</option>
            <option value=" number of students who go on to higher education"> number of students who go on to higher education</option>
            <option value=" standardized testing"> standardized testing</option>
            <option value="employment after completion">employment after completion</option>
            <option value=" income before and after completion"> income before and after completion</option>
            <option value=" gender demographics"> gender demographics</option>
            <option value=" racial demographics"> racial demographics</option>
            <option value="assessment data">assessment data</option>
            <option value="success stories">success stories</option>
            <option value="Benefit of solar lights">Benefit of solar lights</option>
            <option value=" Issues faced by students with the lamps"> Issues faced by students with the lamps</option>
            <option value=" Teacher feedback"> Teacher feedback</option>
            <option value=" Parent feedback"> Parent feedback</option>
            <option value="number of principals trained">number of principals trained</option>
            <option value=" survey stakeholders on program effectiveness including parents"> survey stakeholders on program effectiveness including parents</option>
            <option value=" teachers and students."> teachers and students.</option>
            <option value="student testimonials">student testimonials</option>
            <option value="parent satisfaction">parent satisfaction</option>
            <option value=" Quarterly progress reports written by caregivers track children’s developmental progress. Essential elements of effective preschools are assessed every six months with a standard form. Results are used to identify strengths and to develop an action plan to address elements that need improvement. Supervisory staff closely monitor the program and implementation of the action plan. "> Quarterly progress reports written by caregivers track children’s developmental progress. Essential elements of effective preschools are assessed every six months with a standard form. Results are used to identify strengths and to develop an action plan to address elements that need improvement. Supervisory staff closely monitor the program and implementation of the action plan. </option>
            <option value="child cognitive assessments">child cognitive assessments</option>
            <option value=" child health outcomes"> child health outcomes</option>
            <option value=" teacher attendance rates"> teacher attendance rates</option>
            <option value=" teachers using child centered pedagogy"> teachers using child centered pedagogy</option>
            <option value="Magic Bus' research">Magic Bus' research</option>
            <option value=" development and management information system ensures that our work proceeds from a strong theoretical foundation"> development and management information system ensures that our work proceeds from a strong theoretical foundation</option>
            <option value=" is grounded in the experiences of children who have been with the organization"> is grounded in the experiences of children who have been with the organization</option>
            <option value=" and has empirical evidence testifying to its methods and impacts. In this way"> and has empirical evidence testifying to its methods and impacts. In this way</option>
            <option value=" we develop resilient and effective policies that help ensure that the program is always accountable and responsive to our key stakeholders – children and youth."> we develop resilient and effective policies that help ensure that the program is always accountable and responsive to our key stakeholders – children and youth.</option>
            <option value=" job placement rate after program completion"> job placement rate after program completion</option>
            <option value=" standardized testing results"> standardized testing results</option>
            <option value=" number of students who go on to tertiary education"> number of students who go on to tertiary education</option>
            <option value="Each program can tailor their involvement in measurement work to their readiness and capacity">Each program can tailor their involvement in measurement work to their readiness and capacity</option>
            <option value=" and will receive a Program Report for Improvement and System Measurement (PRISM). PRISMs allow programs to compare themselves to a citywide group of their peers and to research-informed benchmarks to determine areas of relative strength and challenge"> and will receive a Program Report for Improvement and System Measurement (PRISM). PRISMs allow programs to compare themselves to a citywide group of their peers and to research-informed benchmarks to determine areas of relative strength and challenge</option>
            <option value=" which in turn enables targeted"> which in turn enables targeted</option>
            <option value=" data-driven continuous improvement."> data-driven continuous improvement.</option>
            <option value="number of students trained">number of students trained</option>
            <option value="user satisfaction">user satisfaction</option>
            <option value="udited by the UK’s Quality Assurance Agency (QAA) for Higher Education">udited by the UK’s Quality Assurance Agency (QAA) for Higher Education</option>
            <option value=" research impact"> research impact</option>
            <option value="number of students accepted into college">number of students accepted into college</option>
            <option value="Number of students">Number of students</option>
            <option value=" Test scores"> Test scores</option>
            <option value=" Subject"> Subject</option>
            <option value=" salary after completion"> salary after completion</option>
            <option value=" School readiness"> School readiness</option>
            <option value="number of youth through the program (Male vs female)">number of youth through the program (Male vs female)</option>
            <option value=" Employment outcomes upon completion of the program"> Employment outcomes upon completion of the program</option>
            <option value="Transition to formal education">Transition to formal education</option>
            <option value=" School performance"> School performance</option>
            <option value="  The M&E system">  The M&E system</option>
            <option value=" which formed an integral part of the programme design"> which formed an integral part of the programme design</option>
            <option value=" adapted a mixed-method approach by combining conventional M&E tools with more participatory tools. The approach to M&E was participatory; it involved the partners in developing context-sensitive"> adapted a mixed-method approach by combining conventional M&E tools with more participatory tools. The approach to M&E was participatory; it involved the partners in developing context-sensitive</option>
            <option value=" practical and easily applicable M&E tools to collect relevant data regarding achievements on both the output and outcome levels."> practical and easily applicable M&E tools to collect relevant data regarding achievements on both the output and outcome levels.</option>
            <option value="Student understanding and holistic development; teachers' ability to effectively communicate and make connections between theory and practice">Student understanding and holistic development; teachers' ability to effectively communicate and make connections between theory and practice</option>
            <option value=" number of schools"> number of schools</option>
            <option value="Leadership Competence">Leadership Competence</option>
            <option value="Standardized test scores">Standardized test scores</option>
            <option value=" Teacher motivation â€“ teacher self efficacy"> Teacher motivation â€“ teacher self efficacy</option>
            <option value=" learner outcomes"> learner outcomes</option>
            <option value=" implementations of innovations"> implementations of innovations</option>
            <option value="user testimonials">user testimonials</option>
            <option value=" student participation"> student participation</option>
            <option value=" student savings"> student savings</option>
            <option value=" family financial situations"> family financial situations</option>
            <option value="past participant data including country of origin">past participant data including country of origin</option>
            <option value=" program of study"> program of study</option>
            <option value=" and length of study"> and length of study</option>
            <option value="number of students accessing the program">number of students accessing the program</option>
            <option value="
            Internal assessment performance">
            Internal assessment performance</option>
            <option value="
            Student attendance">
            Student attendance</option>
            <option value="
            Teacher retention">
            Teacher retention</option>
            <option value="
            Increased enrollment">
            Increased enrollment</option>
            <option value=" Number of study hours"> Number of study hours</option>
            <option value="secondary school completion rates">secondary school completion rates</option>
            <option value=" college retention rates"> college retention rates</option>
            <option value=" number of students engaged"> number of students engaged</option>
            <option value=" number of schools engaged"> number of schools engaged</option>
            <option value="EQuIP and IMET rubrics">EQuIP and IMET rubrics</option>
            <option value=" large-scale district beta use"> large-scale district beta use</option>
            <option value=" collaborating with teachers and district partners in the continuous improvement of each core program"> collaborating with teachers and district partners in the continuous improvement of each core program</option>
            <option value=" high school completion rates"> high school completion rates</option>
            <option value=" number of students who go on to tertiary education / job placements after graduation"> number of students who go on to tertiary education / job placements after graduation</option>
            <option value=" Post-graduation salary level"> Post-graduation salary level</option>
            <option value="college enrollment rates">college enrollment rates</option>
            <option value="number of classrooms built and refurbished">number of classrooms built and refurbished</option>
            <option value=" number of latrines built"> number of latrines built</option>
            <option value="number of teachers and school leaders trinained">number of teachers and school leaders trinained</option>
            <option value="number of libraries refurbished">number of libraries refurbished</option>
            <option value=" number of books donated"> number of books donated</option>
            <option value=" number of librarians trained"> number of librarians trained</option>
            <option value="number of daycare and kindergarten teachers trained and certified">number of daycare and kindergarten teachers trained and certified</option>
            <option value=" number of daycare centers refurbished"> number of daycare centers refurbished</option>
            <option value="number of users">number of users</option>
            <option value=" improvement in math"> improvement in math</option>
            <option value=" parent satisfaction"> parent satisfaction</option>
            <option value=" number of teachers"> number of teachers</option>
            <option value=" Internalized assessment performance"> Internalized assessment performance</option>
            <option value="Increased enrolment">Increased enrolment</option>
            <option value="number of people impacted by program">number of people impacted by program</option>
            <option value="number of schools/school districts engaged">number of schools/school districts engaged</option>
            <option value=" case studies"> case studies</option>
            <option value=" Absorption of subject matter"> Absorption of subject matter</option>
            <option value=" performance of students"> performance of students</option>
            <option value=" involvement in class"> involvement in class</option>
            <option value=" teachers using techniques learned through training"> teachers using techniques learned through training</option>
            <option value=" school leaders demonstrating leadership skills"> school leaders demonstrating leadership skills</option>
            <option value=" students demonstrating leadership skills"> students demonstrating leadership skills</option>
            <option value="number of homes">number of homes</option>
            <option value=" numbero f children presently in care"> numbero f children presently in care</option>
            <option value="number of youth served">number of youth served</option>
            <option value=" number of hours of mentorship"> number of hours of mentorship</option>
            <option value=" impact of program on students confidence"> impact of program on students confidence</option>
            <option value=" behavior"> behavior</option>
            <option value=" and academics; impact on mentors confidence"> and academics; impact on mentors confidence</option>
            <option value=" communication"> communication</option>
            <option value=" listening"> listening</option>
            <option value="number of students who have attended the program">number of students who have attended the program</option>
            <option value=" number of books distributed"> number of books distributed</option>
            <option value="independent studies">independent studies</option>
            <option value="number of educators engaged">number of educators engaged</option>
            <option value=" donations"> donations</option>
            <option value=" volunteer hours"> volunteer hours</option>
            <option value=" Salary level after graduation"> Salary level after graduation</option>
            <option value=" self-sufficiency"> self-sufficiency</option>
            <option value="students impacted by the program">students impacted by the program</option>
            <option value=" job placement rates"> job placement rates</option>
            <option value="impact on policy">impact on policy</option>
            <option value="number of schools built">number of schools built</option>
            <option value=" student outcomes"> student outcomes</option>
            <option value=" number of school"> number of school</option>
            <option value=" student grades"> student grades</option>
            <option value="Student learning outcomes">Student learning outcomes</option>
            <option value=" students who receive scholarships"> students who receive scholarships</option>
            <option value=" Quality of learning experience"> Quality of learning experience</option>
            <option value="number of children enrolled in the program">number of children enrolled in the program</option>
            <option value=" Number of children who join regular schools"> Number of children who join regular schools</option>
            <option value=" Bi-annual evaluations of children"> Bi-annual evaluations of children</option>
            <option value=" Regular monitoring and classroom observations"> Regular monitoring and classroom observations</option>
            <option value="number of textbooks downloaded">number of textbooks downloaded</option>
            <option value=" number of questions completed"> number of questions completed</option>
            <option value=" student progress data"> student progress data</option>
            <option value="Employment rates">Employment rates</option>
            <option value=" Number of entrepreneurs completing the course"> Number of entrepreneurs completing the course</option>
            <option value=" Number of trainees starting their own initiatives"> Number of trainees starting their own initiatives</option>
            <option value=" Quality of teaching and learning"> Quality of teaching and learning</option>
            <option value=" student surveys"> student surveys</option>
            <option value=" Student behaviour"> Student behaviour</option>
            <option value=" Student GPA"> Student GPA</option>
            <option value=" student satisfaction"> student satisfaction</option>
            <option value=" staff satisfaction"> staff satisfaction</option>
            <option value=" enrollment rates"> enrollment rates</option>
            <option value="external impact assessment">external impact assessment</option>
            <option value=" standardized test results"> standardized test results</option>
            <option value="Resources">Resources</option>
            <option value=" Self-assessment tools"> Self-assessment tools</option>
            <option value=" shared learning"> shared learning</option>
            <option value=" networking success"> networking success</option>
            <option value="number of children engaged in the program">number of children engaged in the program</option>
            <option value=" Behavioral and cognitive development of children under six years old"> Behavioral and cognitive development of children under six years old</option>
            <option value=" improvement in the parenting skills of caregivers for health and ECD"> improvement in the parenting skills of caregivers for health and ECD</option>
            <option value="Number of schools reached">Number of schools reached</option>
            <option value=" number of program participants"> number of program participants</option>
            <option value="Teacher motivation – teacher self efficacy">Teacher motivation – teacher self efficacy</option>
            <option value=" Student participation"> Student participation</option>
            <option value="high school completion rates">high school completion rates</option>
            <option value=" college acceptance rates"> college acceptance rates</option>
            <option value=" college placements"> college placements</option>
            <option value=" employment after graduation"> employment after graduation</option>
            <option value=" student survey"> student survey</option>
            <option value="number of awards given">number of awards given</option>
            <option value="Awards granted">Awards granted</option>
            <option value="Number of awards given">Number of awards given</option>
            <option value="independent evaluation">independent evaluation</option>
            <option value="internal and external evaluations">internal and external evaluations</option>
            <option value="number of students who have participated (girls vs boys); employment outcomes upon completion of the program">number of students who have participated (girls vs boys); employment outcomes upon completion of the program</option>
            <option value="user feedback">user feedback</option>
            <option value=" number of users"> number of users</option>
            <option value=" use of the platform"> use of the platform</option>
            <option value="number of scholarship granted">number of scholarship granted</option>
            <option value=" $ amount of scholarships granted"> $ amount of scholarships granted</option>
            <option value=" scholar success stories"> scholar success stories</option>
            <option value="?Standardized assessment performance">?Standardized assessment performance</option>
            <option value=" number of graduates who go on to careers in teaching"> number of graduates who go on to careers in teaching</option>
            <option value=" Time and cost effective"> Time and cost effective</option>
            <option value=" number of scholarships granted"> number of scholarships granted</option>
            <option value=" career placement of students who received scholarships"> career placement of students who received scholarships</option>
            <option value="external evaluation">external evaluation</option>
            <option value=" standardized tests"> standardized tests</option>
            <option value="standardized assessment results">standardized assessment results</option>
            <option value=" Increased knowledge of sanitation and hygiene"> Increased knowledge of sanitation and hygiene</option>
            <option value=" adoption of good WASH behaviors including hand-washing with soap"> adoption of good WASH behaviors including hand-washing with soap</option>
            <option value=" toilet use"> toilet use</option>
            <option value=" and menstrual hygiene"> and menstrual hygiene</option>
            <option value=" salary of alumni"> salary of alumni</option>
            <option value="student success stories">student success stories</option>
            <option value="Unclear">Unclear</option>
            <option value="number of people reached">number of people reached</option>
            <option value="independent student data analysis">independent student data analysis</option>
            <option value="School Development Review">School Development Review</option>
            <option value=" Teacher Engagement Survey"> Teacher Engagement Survey</option>
            <option value="ASER yearly survey">ASER yearly survey</option>
            <option value="student enrolment and learning outcomes">student enrolment and learning outcomes</option>
            <option value=" improved teaching standards"> improved teaching standards</option>
            <option value=" less teacher vacancies "> less teacher vacancies </option>
            <option value="automated system that allows you to track and analyze your progress">automated system that allows you to track and analyze your progress</option>
            <option value=" contribution"> contribution</option>
            <option value=" and learning."> and learning.</option>
            <option value="Rewards and recognition programs">Rewards and recognition programs</option>
            <option value="missing data">missing data</option>
            </select>

            <div id="outcomesMonitored">
              <ul>
                {
                  this.state.outcomesMonitored.map(outcome => {
                    return (
                      <this.buttonMaker key={outcome} name={outcome} category="outcomesMonitored"/>
                    );
                  })
                }
              </ul>
            </div>
            {this.fieldStatus(this.state.originalReviews.outcomesMonitoredA)}
            <br></br><br></br>


            <div id="sourceOfFeesList"></div>

            <h4>Implementer</h4>

            <p>Name</p>
              <input type="text" id="iname" name="implementerName" value = {this.state.iname} placeholder="Implementer Name" onChange={this.handleChange}/>
            {this.fieldStatus(this.state.originalReviews.inameA)}
            <br></br><br></br>

            <p>Profit Motive</p>
              <input type="radio" id="impMotive1" name="impProfitMotive" value="Not-for-profit" checked = {this.state.impMotive === "Not-for-profit"} onChange={this.impMotiveChange}/> <label htmlFor="impMotive1">Not-For-Profit</label>
              <input type="radio" id="impMotive2" name="impProfitMotive" value="Hybrid" checked = {this.state.impMotive === "Hybrid"} onChange={this.impMotiveChange}/> <label htmlFor="impMotive2">Hybrid</label>
              <input type="radio" id="impMotive3" name="impProfitMotive" value="For-profit" checked = {this.state.impMotive === "For-profit"} onChange={this.impMotiveChange}/> <label htmlFor="impMotive3">For-Profit</label>
            <br></br>
            {this.fieldStatus(this.state.originalReviews.impMotiveA)}
            <br></br><br></br>

            <h4>Comments about Submission</h4>
              <textarea id="comments" name="comment" value = {this.state.comments} maxLength ="10000" placeholder="Write any comments you have about this form" onChange={this.handleChange}></textarea>
              <p>(10,000 character limit)</p>
            <br></br><br></br>


            <input type="submit"value="Submit" onChange/>
            <br></br><br></br>
            {submitError}
            </form>
            </div>
        </div>
    );
  }
}

/*
Comment Storage: since you can't make HTML comments :(
              <p>Tag Number</p>
              <input type="number" id="initTag" name="initiativeTag" placeholder="Tag Number"/>


Program Area stuff that was part of AirTable but not the cleaned data

            <option value=" Private Sector Delivery of Education">Private Sector Delivery of Education</option>
            <option value=" vocational training">vocational training</option>

            <option value="sRegulatory analysis focused on government policy">Regulatory analysis focused on government policy</option>
            <option value="sRegulatory analysis focused on school policy">Regulatory analysis focused on school policy</option>



            <option value=" Capacity Building of Non-Education Professionals">Capacity Building of Non-Education Professionals</option>
            <option value=" Enrichment/New Pedagogical or Curricular Programs">Enrichment/New Pedagogical or Curricular Programs</option>
            <option value=" Academic research/academic exchange">Academic research/academic exchange</option>


            <option value=" Education finance (system-level)">Education finance (system-level)</option>
            <option value=" school finance">school finance</option>

            <option value="pPrivate schools">Private schools</option>
            <option value="pFormal public-private partnership">Formal public-private partnership</option>


            */


const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth,
    userData: state.data.userInformation,

    form: state.data.form,
    formStatus: state.data.formStatus,
    inDB: state.data.pulledformApproved,

    formSubmitted: state.data.formSubmitted,
    formSubmitError: state.data.formSubmitError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitRA: (form, isModified) => {dispatch(addFormRA(form, isModified))},
    submitNonRA: (form, inDB, isModified) => {dispatch(addForm(form, inDB, isModified))},
    submitModifiedRA: (form, isModified) => {dispatch(modifyFormRA(form, isModified))},
    submitModifiedNonRA: (form, inDB, isModified) => {dispatch(modifyForm(form, inDB, isModified))},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(formSubmission)
