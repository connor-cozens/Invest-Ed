import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from './chart'
import Switch from "react-switch";
import Map from './map';
import './visualize.css';

import {getFunderData, getImplementerData, getInitiativeData, getInitiativeFundersByAttr, getInitiativeImplementersByAttr} from '../../store/actions/dataActions';

import WorldIcon from '../../images/world.png'

class Visualize extends Component {
  state = {
      entitySelection: 'select',
      attributeSelection: 'select',
      secondaryAttributeSelection: 'select',
      dataSelected: false,
      breakDownChecked: false,
      compareChecked: false,
      mapViewChecked: false,

      TargetFunderData: null,
      ImplementerData: null,
      InititativeData: null,
      FunderAttributes: null,
      ImplementerAttributes: null,

      FunderTypeInitiative: null,
      ImplementerTypeInitiative: null,
      FunderInitiative: null,
      ImplementerInitiative: null
  }

  //Trigger get request to retrieve data for visualization
  componentDidMount = () => {
    document.body.style.height = "100%"
    this.props.getInitiativeFundersByAttr();
    this.props.getInitiativeImplementersByAttr();
  }
  componentWillUnmount = () => {
    document.body.style.height = "auto"
  }

  //Set retrieved visualized data passed into component via next props to the state
  static getDerivedStateFromProps = (props, state) => {
    const {FunderData, ImplementerData, InititativeData, FunderAttributes, ImplementerAttributes, FunderTypeInitiative, ImplementerTypeInitiative, FunderInitiative, ImplementerInitiative} = props;
    return {
      TargetFunderData: FunderData,
      ImplementerData: ImplementerData,
      InititativeData: InititativeData,
      FunderAttributes: FunderAttributes,
      ImplementerAttributes: ImplementerAttributes,

      FunderTypeInitiative: FunderTypeInitiative,
      ImplementerTypeInitiative: ImplementerTypeInitiative,
      FunderInitiative: FunderInitiative,
      ImplementerInitiative: ImplementerInitiative
    };
  }

  dataSelection = () => {
    if (this.state.TargetFunderData !== null && this.state.ImplementerData !== null && this.state.InititativeData !== null && this.state.FunderAttributes !== null && this.state.ImplementerAttributes !== null
    && this.state.FunderTypeInitiative !== null && this.state.ImplementerTypeInitiative !== null && this.state.FunderInitiative !== null && this.state.ImplementerInitiative !== null) {
      //If funder selected as entity
      //Profit Motive
      if (this.state.entitySelection == "funders" && this.state.attributeSelection == "profitMotive") {
        if (this.state.secondaryAttributeSelection == "mainProgrammingActivity") {
          return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: this.state.FunderTypeInitiative[0].ProfitMotiveInitiative.mainProgramActivity, sub3: this.state.FunderInitiative[0].ProfitMotiveFunderInitiative.mainProgramActivity, header1: 'Funders - Profit Motives', header2: 'Initiatives - Main Programming Activities', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "mainProgrammingArea") {
          return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: this.state.FunderTypeInitiative[0].ProfitMotiveInitiative.mainProgramArea, sub3: this.state.FunderInitiative[0].ProfitMotiveFunderInitiative.mainProgramArea, header1: 'Funders - Profit Motives', header2: 'Initiatives - Main Programming Areas', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "region") {
          return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: this.state.FunderTypeInitiative[0].ProfitMotiveInitiative.region, sub3: this.state.FunderInitiative[0].ProfitMotiveFunderInitiative.region, header1: 'Funders - Profit Motives', header2: 'Initiatives - Regions Based or Operating', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "countryOfOperation") {
          return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: this.state.FunderTypeInitiative[0].ProfitMotiveInitiative.countryOfOperation, sub3: this.state.FunderInitiative[0].ProfitMotiveFunderInitiative.countryOfOperation, header1: 'Funders - Profit Motives', header2: 'Initiatives - Countries of Operation', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "programmingActivity") {
          return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: this.state.FunderTypeInitiative[0].ProfitMotiveInitiative.programmingActivity, sub3: this.state.FunderInitiative[0].ProfitMotiveFunderInitiative.programmingActivity, header1: 'Funders - Profit Motives', header2: 'Initiatives - Other Programming Activities', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "sourceOfFunding") {
          return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: this.state.FunderTypeInitiative[0].ProfitMotiveInitiative.sourceOfFunding, sub3: this.state.FunderInitiative[0].ProfitMotiveFunderInitiative.sourceOfFunding, header1: 'Funders - Profit Motives', header2: 'Initiatives - Sources of Funding', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "launchCountry") {
          return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: this.state.FunderTypeInitiative[0].ProfitMotiveInitiative.launchCountry, sub3: this.state.FunderInitiative[0].ProfitMotiveFunderInitiative.launchCountry, header1: 'Funders - Profit Motives', header2: 'Initiatives - Launch Countries', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "monitoredOutcome") {
          return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: this.state.FunderTypeInitiative[0].ProfitMotiveInitiative.monitoredOutcome, sub3: this.state.FunderInitiative[0].ProfitMotiveFunderInitiative.monitoredOutcome, header1: 'Funders - Profit Motives', header2: 'Initiatives - Monitored Outcomes', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "targetGeography") {
          return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: this.state.FunderTypeInitiative[0].ProfitMotiveInitiative.targetGeography, sub3: this.state.FunderInitiative[0].ProfitMotiveFunderInitiative.targetGeography, header1: 'Funders - Profit Motives', header2: 'Initiatives - Target Geographies', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "targetPopulationSector") {
          return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: this.state.FunderTypeInitiative[0].ProfitMotiveInitiative.targetPopulationSector, sub3: this.state.FunderInitiative[0].ProfitMotiveFunderInitiative.targetPopulationSector, header1: 'Funders - Profit Motives', header2: 'Initiatives - Target Population Sectors', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "mainEducationSubsector") {
          return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: this.state.FunderTypeInitiative[0].ProfitMotiveInitiative.mainEducationSubsector, sub3: this.state.FunderInitiative[0].ProfitMotiveFunderInitiative.mainEducationSubsector, header1: 'Funders - Profit Motives', header2: 'Initiatives - Main Education Subsectors', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "educationSubsector") {
          return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: this.state.FunderTypeInitiative[0].ProfitMotiveInitiative.educationSubsector, sub3: this.state.FunderInitiative[0].ProfitMotiveFunderInitiative.educationSubsector, header1: 'Funders - Profit Motives', header2: 'Initiatives - Other Education Subsectors', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "targetSchoolManagementType") {
          return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: this.state.FunderTypeInitiative[0].ProfitMotiveInitiative.targetSchoolManagementType, sub3: this.state.FunderInitiative[0].ProfitMotiveFunderInitiative.targetSchoolManagementType, header1: 'Funders - Profit Motives', header2: 'Initiatives - Target School Management Types', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        return {main: this.state.TargetFunderData.profitMotives, sub: this.state.FunderAttributes.ProfitMotiveTargetFunder, sub2: '', sub3: '', header1: 'Funders - Profit Motives', header2: '', subHeader: 'Number of Funders', initiative: false, funder: true}
      }

      //Organization Form
      if (this.state.entitySelection == "funders" && this.state.attributeSelection == "organizationForm") {
        if (this.state.secondaryAttributeSelection == "mainProgrammingActivity") {
          return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: this.state.FunderTypeInitiative[0].OrgFormInitiative.mainProgramActivity, sub3: this.state.FunderInitiative[0].OrgFormFunderInitiative.mainProgramActivity, header1: 'Funders - Organization Form', header2: 'Initiatives - Main Programming Activities', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "mainProgrammingArea") {
          return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: this.state.FunderTypeInitiative[0].OrgFormInitiative.mainProgramArea, sub3: this.state.FunderInitiative[0].OrgFormFunderInitiative.mainProgramArea, header1: 'Funders - Organization Form', header2: 'Initiatives - Main Programming Areas', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "region") {
          return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: this.state.FunderTypeInitiative[0].OrgFormInitiative.region, sub3: this.state.FunderInitiative[0].OrgFormFunderInitiative.region, header1: 'Funders - Organization Form', header2: 'Initiatives - Regions Based or Operating', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "countryOfOperation") {
          return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: this.state.FunderTypeInitiative[0].OrgFormInitiative.countryOfOperation, sub3: this.state.FunderInitiative[0].OrgFormFunderInitiative.countryOfOperation, header1: 'Funders - Organization Form', header2: 'Initiatives - Countries of Operation', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "programmingActivity") {
          return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: this.state.FunderTypeInitiative[0].OrgFormInitiative.programmingActivity, sub3: this.state.FunderInitiative[0].OrgFormFunderInitiative.programmingActivity, header1: 'Funders - Organization Form', header2: 'Initiatives - Other Programming Activities', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "sourceOfFunding") {
          return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: this.state.FunderTypeInitiative[0].OrgFormInitiative.sourceOfFunding, sub3: this.state.FunderInitiative[0].OrgFormFunderInitiative.sourceOfFunding, header1: 'Funders - Organization Form', header2: 'Initiatives - Sources of Funding', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "launchCountry") {
          return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: this.state.FunderTypeInitiative[0].OrgFormInitiative.launchCountry, sub3: this.state.FunderInitiative[0].OrgFormFunderInitiative.launchCountry, header1: 'Funders - Organization Form', header2: 'Initiatives - Launch Countries', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "monitoredOutcome") {
          return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: this.state.FunderTypeInitiative[0].OrgFormInitiative.monitoredOutcome, sub3: this.state.FunderInitiative[0].OrgFormFunderInitiative.monitoredOutcome, header1: 'Funders - Organization Form', header2: 'Initiatives - Monitored Outcomes', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "targetGeography") {
          return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: this.state.FunderTypeInitiative[0].OrgFormInitiative.targetGeography, sub3: this.state.FunderInitiative[0].OrgFormFunderInitiative.targetGeography, header1: 'Funders - Organization Form', header2: 'Initiatives - Target Geographies', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "targetPopulationSector") {
          return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: this.state.FunderTypeInitiative[0].OrgFormInitiative.targetPopulationSector, sub3: this.state.FunderInitiative[0].OrgFormFunderInitiative.targetPopulationSector, header1: 'Funders - Organization Form', header2: 'Initiatives - Target Population Sectors', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "mainEducationSubsector") {
          return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: this.state.FunderTypeInitiative[0].OrgFormInitiative.mainEducationSubsector, sub3: this.state.FunderInitiative[0].OrgFormFunderInitiative.mainEducationSubsector, header1: 'Funders - Organization Form', header2: 'Initiatives - Main Education Subsectors', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "educationSubsector") {
          return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: this.state.FunderTypeInitiative[0].OrgFormInitiative.educationSubsector, sub3: this.state.FunderInitiative[0].OrgFormFunderInitiative.educationSubsector, header1: 'Funders - Organization Form', header2: 'Initiatives - Other Education Subsectors', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "targetSchoolManagementType") {
          return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: this.state.FunderTypeInitiative[0].OrgFormInitiative.targetSchoolManagementType, sub3: this.state.FunderInitiative[0].OrgFormFunderInitiative.targetSchoolManagementType, header1: 'Funders - Organization Form', header2: 'Initiatives - Target School Management Types', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        return {main: this.state.TargetFunderData.organizationForm, sub: this.state.FunderAttributes.OrgFormTargetFunder, sub2: '', sub3: '', header1: 'Funders - Organization Form', header2: '', subHeader: 'Number of Funders', initiative: false, funder: true }
      }

      //Impact Investor
      if (this.state.entitySelection == "funders" && this.state.attributeSelection == "impactInvestor") {
        if (this.state.secondaryAttributeSelection == "mainProgrammingActivity") {
          return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: this.state.FunderTypeInitiative[0].ImpactInvestorInitiative.mainProgramActivity, sub3: this.state.FunderInitiative[0].ImpactInvestorFunderInitiative.mainProgramActivity, header1: 'Funders - Impacting Investing', header2: 'Initiatives - Main Programming Activities', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "mainProgrammingArea") {
          return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: this.state.FunderTypeInitiative[0].ImpactInvestorInitiative.mainProgramArea, sub3: this.state.FunderInitiative[0].ImpactInvestorFunderInitiative.mainProgramArea, header1: 'Funders - Impacting Investing', header2: 'Initiatives - Main Programming Areas', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "region") {
          return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: this.state.FunderTypeInitiative[0].ImpactInvestorInitiative.region, sub3: this.state.FunderInitiative[0].ImpactInvestorFunderInitiative.region, header1: 'Funders - Impacting Investing', header2: 'Initiatives - Regions Based or Operating', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "countryOfOperation") {
          return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: this.state.FunderTypeInitiative[0].ImpactInvestorInitiative.countryOfOperation, sub3: this.state.FunderInitiative[0].ImpactInvestorFunderInitiative.countryOfOperation, header1: 'Funders - Impacting Investing', header2: 'Initiatives - Countries of Operation', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "programmingActivity") {
          return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: this.state.FunderTypeInitiative[0].ImpactInvestorInitiative.programmingActivity, sub3: this.state.FunderInitiative[0].ImpactInvestorFunderInitiative.programmingActivity, header1: 'Funders - Impacting Investing', header2: 'Initiatives - Other Programming Activities', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "sourceOfFunding") {
          return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: this.state.FunderTypeInitiative[0].ImpactInvestorInitiative.sourceOfFunding, sub3: this.state.FunderInitiative[0].ImpactInvestorFunderInitiative.sourceOfFunding, header1: 'Funders - Impacting Investing', header2: 'Initiatives - Sources of Funding', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "launchCountry") {
          return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: this.state.FunderTypeInitiative[0].ImpactInvestorInitiative.launchCountry, sub3: this.state.FunderInitiative[0].ImpactInvestorFunderInitiative.launchCountry, header1: 'Funders - Impacting Investing', header2: 'Initiatives - Launch Countries', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "monitoredOutcome") {
          return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: this.state.FunderTypeInitiative[0].ImpactInvestorInitiative.monitoredOutcome, sub3: this.state.FunderInitiative[0].ImpactInvestorFunderInitiative.monitoredOutcome, header1: 'Funders - Impacting Investing', header2: 'Initiatives - Monitored Outcomes', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "targetGeography") {
          return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: this.state.FunderTypeInitiative[0].ImpactInvestorInitiative.targetGeography, sub3: this.state.FunderInitiative[0].ImpactInvestorFunderInitiative.targetGeography, header1: 'Funders - Impacting Investing', header2: 'Initiatives - Target Geographies', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "targetPopulationSector") {
          return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: this.state.FunderTypeInitiative[0].ImpactInvestorInitiative.targetPopulationSector, sub3: this.state.FunderInitiative[0].ImpactInvestorFunderInitiative.targetPopulationSector, header1: 'Funders - Impacting Investing', header2: 'Initiatives - Target Population Sectors', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "mainEducationSubsector") {
          return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: this.state.FunderTypeInitiative[0].ImpactInvestorInitiative.mainEducationSubsector, sub3: this.state.FunderInitiative[0].ImpactInvestorFunderInitiative.mainEducationSubsector, header1: 'Funders - Impacting Investing', header2: 'Initiatives - Main Education Subsectors', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "educationSubsector") {
          return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: this.state.FunderTypeInitiative[0].ImpactInvestorInitiative.educationSubsector, sub3: this.state.FunderInitiative[0].ImpactInvestorFunderInitiative.educationSubsector, header1: 'Funders - Impacting Investing', header2: 'Initiatives - Other Education Subsectors', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "targetSchoolManagementType") {
          return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: this.state.FunderTypeInitiative[0].ImpactInvestorInitiative.targetSchoolManagementType, sub3: this.state.FunderInitiative[0].ImpactInvestorFunderInitiative.targetSchoolManagementType, header1: 'Funders - Impacting Investing', header2: 'Initiatives - Target School Management Types', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        return {main: this.state.TargetFunderData.impactInvesting, sub: this.state.FunderAttributes.ImpactInvestingTargetFunder, sub2: '', sub3: '', header1: 'Funders - Impacting Investing', header2: '', subHeader: 'Number of Funders', initiative: false, funder: true}
      }

      if (this.state.entitySelection == "funders" && this.state.attributeSelection == "eSubsectors") {
        if (this.state.secondaryAttributeSelection == "mainProgrammingActivity") {
          return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: this.state.FunderTypeInitiative[0].ESubsectorInitiative.mainProgramActivity, sub3: this.state.FunderInitiative[0].ESubsectorFunderInitiative.mainProgramActivity, header1: 'Funders - Education Subsectors', header2: 'Initiatives - Main Programming Activities', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "mainProgrammingArea") {
          return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: this.state.FunderTypeInitiative[0].ESubsectorInitiative.mainProgramArea, sub3: this.state.FunderInitiative[0].ESubsectorFunderInitiative.mainProgramArea, header1: 'Funders - Education Subsectors', header2: 'Initiatives - Main Programming Areas', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "region") {
          return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: this.state.FunderTypeInitiative[0].ESubsectorInitiative.region, sub3: this.state.FunderInitiative[0].ESubsectorFunderInitiative.region, header1: 'Funders - Education Subsectors', header2: 'Initiatives - Regions Based or Operating', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "countryOfOperation") {
          return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: this.state.FunderTypeInitiative[0].ESubsectorInitiative.countryOfOperation, sub3: this.state.FunderInitiative[0].ESubsectorFunderInitiative.countryOfOperation, header1: 'Funders - Education Subsectors', header2: 'Initiatives - Countries of Operation', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "programmingActivity") {
          return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: this.state.FunderTypeInitiative[0].ESubsectorInitiative.programmingActivity, sub3: this.state.FunderInitiative[0].ESubsectorFunderInitiative.programmingActivity, header1: 'Funders - Education Subsectors', header2: 'Initiatives - Other Programming Activities', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "sourceOfFunding") {
          return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: this.state.FunderTypeInitiative[0].ESubsectorInitiative.sourceOfFunding, sub3: this.state.FunderInitiative[0].ESubsectorFunderInitiative.sourceOfFunding, header1: 'Funders - Education Subsectors', header2: 'Initiatives - Sources of Funding', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "launchCountry") {
          return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: this.state.FunderTypeInitiative[0].ESubsectorInitiative.launchCountry, sub3: this.state.FunderInitiative[0].ESubsectorFunderInitiative.launchCountry, header1: 'Funders - Education Subsectors', header2: 'Initiatives - Launch Countries', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "monitoredOutcome") {
          return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: this.state.FunderTypeInitiative[0].ESubsectorInitiative.monitoredOutcome, sub3: this.state.FunderInitiative[0].ESubsectorFunderInitiative.monitoredOutcome, header1: 'Funders - Education Subsectors', header2: 'Initiatives - Monitored Outcomes', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "targetGeography") {
          return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: this.state.FunderTypeInitiative[0].ESubsectorInitiative.targetGeography, sub3: this.state.FunderInitiative[0].ESubsectorFunderInitiative.targetGeography, header1: 'Funders - Education Subsectors', header2: 'Initiatives - Target Geographies', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "targetPopulationSector") {
          return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: this.state.FunderTypeInitiative[0].ESubsectorInitiative.targetPopulationSector, sub3: this.state.FunderInitiative[0].ESubsectorFunderInitiative.targetPopulationSector, header1: 'Funders - Education Subsectors', header2: 'Initiatives - Target Population Sectors', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "mainEducationSubsector") {
          return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: this.state.FunderTypeInitiative[0].ESubsectorInitiative.mainEducationSubsector, sub3: this.state.FunderInitiative[0].ESubsectorFunderInitiative.mainEducationSubsector, header1: 'Funders - Education Subsectors', header2: 'Initiatives - Main Education Subsectors', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "educationSubsector") {
          return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: this.state.FunderTypeInitiative[0].ESubsectorInitiative.educationSubsector, sub3: this.state.FunderInitiative[0].ESubsectorFunderInitiative.educationSubsector, header1: 'Funders - Education Subsectors', header2: 'Initiatives - Other Education Subsectors', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "targetSchoolManagementType") {
          return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: this.state.FunderTypeInitiative[0].ESubsectorInitiative.targetSchoolManagementType, sub3: this.state.FunderInitiative[0].ESubsectorFunderInitiative.targetSchoolManagementType, header1: 'Funders - Education Subsectors', header2: 'Initiatives - Target School Management Types', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        return {main: this.state.TargetFunderData.educationSubsector, sub: this.state.FunderAttributes.EduSubsectorsTargetFunder, sub2: '', sub3: '', header1: 'Funders - Education Subsectors', header2: '', subHeader: 'Number of Funders', initiative: false, funder: true}
      }

      if (this.state.entitySelection == "funders" && this.state.attributeSelection == "baseLocations") {
        if (this.state.secondaryAttributeSelection == "mainProgrammingActivity") {
          return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: this.state.FunderTypeInitiative[0].BaseLocInitiative.mainProgramActivity, sub3: this.state.FunderInitiative[0].BaseLocFunderInitiative.mainProgramActivity, header1: 'Funders - Base Locations', header2: 'Initiatives - Main Programming Activities', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "mainProgrammingArea") {
          return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: this.state.FunderTypeInitiative[0].BaseLocInitiative.mainProgramArea, sub3: this.state.FunderInitiative[0].BaseLocFunderInitiative.mainProgramArea, header1: 'Funders - Base Locations', header2: 'Initiatives - Main Programming Areas', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "region") {
          return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: this.state.FunderTypeInitiative[0].BaseLocInitiative.region, sub3: this.state.FunderInitiative[0].BaseLocFunderInitiative.region, header1: 'Funders - Base Locations', header2: 'Initiatives - Regions Based or Operating', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "countryOfOperation") {
          return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: this.state.FunderTypeInitiative[0].BaseLocInitiative.countryOfOperation, sub3: this.state.FunderInitiative[0].BaseLocFunderInitiative.countryOfOperation, header1: 'Funders - Base Locations', header2: 'Initiatives - Countries of Operation', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "programmingActivity") {
          return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: this.state.FunderTypeInitiative[0].BaseLocInitiative.programmingActivity, sub3: this.state.FunderInitiative[0].BaseLocFunderInitiative.programmingActivity, header1: 'Funders - Base Locations', header2: 'Initiatives - Other Programming Activities', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "sourceOfFunding") {
          return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: this.state.FunderTypeInitiative[0].BaseLocInitiative.sourceOfFunding, sub3: this.state.FunderInitiative[0].BaseLocFunderInitiative.sourceOfFunding, header1: 'Funders - Base Locations', header2: 'Initiatives - Sources of Funding', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "launchCountry") {
          return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: this.state.FunderTypeInitiative[0].BaseLocInitiative.launchCountry, sub3: this.state.FunderInitiative[0].BaseLocFunderInitiative.launchCountry, header1: 'Funders - Base Locations', header2: 'Initiatives - Launch Countries', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "monitoredOutcome") {
          return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: this.state.FunderTypeInitiative[0].BaseLocInitiative.monitoredOutcome, sub3: this.state.FunderInitiative[0].BaseLocFunderInitiative.monitoredOutcome, header1: 'Funders - Base Locations', header2: 'Initiatives - Monitored Outcomes', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "targetGeography") {
          return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: this.state.FunderTypeInitiative[0].BaseLocInitiative.targetGeography, sub3: this.state.FunderInitiative[0].BaseLocFunderInitiative.targetGeography, header1: 'Funders - Base Locations', header2: 'Initiatives - Target Geographies', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "targetPopulationSector") {
          return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: this.state.FunderTypeInitiative[0].BaseLocInitiative.targetPopulationSector, sub3: this.state.FunderInitiative[0].BaseLocFunderInitiative.targetPopulationSector, header1: 'Funders - Base Locations', header2: 'Initiatives - Target Population Sectors', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "mainEducationSubsector") {
          return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: this.state.FunderTypeInitiative[0].BaseLocInitiative.mainEducationSubsector, sub3: this.state.FunderInitiative[0].BaseLocFunderInitiative.mainEducationSubsector, header1: 'Funders - Base Locations', header2: 'Initiatives - Main Education Subsectors', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "educationSubsector") {
          return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: this.state.FunderTypeInitiative[0].BaseLocInitiative.educationSubsector, sub3: this.state.FunderInitiative[0].BaseLocFunderInitiative.educationSubsector, header1: 'Funders - Base Locations', header2: 'Initiatives - Other Education Subsectors', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        if (this.state.secondaryAttributeSelection == "targetSchoolManagementType") {
          return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: this.state.FunderTypeInitiative[0].BaseLocInitiative.targetSchoolManagementType, sub3: this.state.FunderInitiative[0].BaseLocFunderInitiative.targetSchoolManagementType, header1: 'Funders - Base Locations', header2: 'Initiatives - Target School Management Types', subHeader: 'Number of Funders', initiative: false, funder: true}
        }

        return {main: this.state.TargetFunderData.baseLocation, sub: this.state.FunderAttributes.BaseLocationTargetFunder, sub2: '', sub3: '', header1: 'Funders - Base Locations', header2: '', subHeader: 'Number of Funders', initiative: false, funder: true}
      }

      //If implementer selected as entity
      if (this.state.entitySelection == "implementers" && this.state.attributeSelection == "profitMotive") {
        if (this.state.secondaryAttributeSelection == "mainProgrammingActivity") {
          return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: this.state.ImplementerTypeInitiative.ProfitMotiveInitiative.mainProgramActivity, sub3: this.state.ImplementerInitiative.ProfitMotiveImplementerInitiative.mainProgramActivity, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Main Programming Activities', subHeader: 'Number of Implementers', initiative: false, funder: false}
        }

        if (this.state.secondaryAttributeSelection == "mainProgrammingArea") {
          return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: this.state.ImplementerTypeInitiative.ProfitMotiveInitiative.mainProgramArea, sub3: this.state.ImplementerInitiative.ProfitMotiveImplementerInitiative.mainProgramArea, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Main Programming Areas', subHeader: 'Number of Implementers', initiative: false, funder: false}
        }

        if (this.state.secondaryAttributeSelection == "region") {
          return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: this.state.ImplementerTypeInitiative.ProfitMotiveInitiative.region, sub3: this.state.ImplementerInitiative.ProfitMotiveImplementerInitiative.region, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Regions Based or Operating', subHeader: 'Number of Implementers', initiative: false, funder: false}
        }

        if (this.state.secondaryAttributeSelection == "countryOfOperation") {
          return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: this.state.ImplementerTypeInitiative.ProfitMotiveInitiative.countryOfOperation, sub3: this.state.ImplementerInitiative.ProfitMotiveImplementerInitiative.countryOfOperation, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Countries of Operation', subHeader: 'Number of Implementers', initiative: false, funder: false}
        }

        if (this.state.secondaryAttributeSelection == "programmingActivity") {
          return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: this.state.ImplementerTypeInitiative.ProfitMotiveInitiative.programmingActivity, sub3: this.state.ImplementerInitiative.ProfitMotiveImplementerInitiative.programmingActivity, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Other Programming Activities', subHeader: 'Number of Implementers', initiative: false, funder: false}
        }

        if (this.state.secondaryAttributeSelection == "sourceOfFunding") {
          return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: this.state.ImplementerTypeInitiative.ProfitMotiveInitiative.sourceOfFunding, sub3: this.state.ImplementerInitiative.ProfitMotiveImplementerInitiative.sourceOfFunding, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Sources of Funding', subHeader: 'Number of Implementers', initiative: false, funder: false}
        }

        if (this.state.secondaryAttributeSelection == "launchCountry") {
          return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: this.state.ImplementerTypeInitiative.ProfitMotiveInitiative.launchCountry, sub3: this.state.ImplementerInitiative.ProfitMotiveImplementerInitiative.launchCountry, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Launch Countries', subHeader: 'Number of Implementers', initiative: false, funder: false}
        }

        if (this.state.secondaryAttributeSelection == "monitoredOutcome") {
          return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: this.state.ImplementerTypeInitiative.ProfitMotiveInitiative.monitoredOutcome, sub3: this.state.ImplementerInitiative.ProfitMotiveImplementerInitiative.monitoredOutcome, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Monitored Outcomes', subHeader: 'Number of Implementers', initiative: false, funder: false}
        }

        if (this.state.secondaryAttributeSelection == "targetGeography") {
          return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: this.state.ImplementerTypeInitiative.ProfitMotiveInitiative.targetGeography, sub3: this.state.ImplementerInitiative.ProfitMotiveImplementerInitiative.targetGeography, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Target Geographies', subHeader: 'Number of Implementers', initiative: false, funder: false}
        }

        if (this.state.secondaryAttributeSelection == "targetPopulationSector") {
          return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: this.state.ImplementerTypeInitiative.ProfitMotiveInitiative.targetPopulationSector, sub3: this.state.ImplementerInitiative.ProfitMotiveImplementerInitiative.targetPopulationSector, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Target Population Sectors', subHeader: 'Number of Implementers', initiative: false, funder: false}
        }

        if (this.state.secondaryAttributeSelection == "mainEducationSubsector") {
          return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: this.state.ImplementerTypeInitiative.ProfitMotiveInitiative.mainEducationSubsector, sub3: this.state.ImplementerInitiative.ProfitMotiveImplementerInitiative.mainEducationSubsector, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Main Education Subsectors', subHeader: 'Number of Implementers', initiative: false, funder: false}
        }

        if (this.state.secondaryAttributeSelection == "educationSubsector") {
          return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: this.state.ImplementerTypeInitiative.ProfitMotiveInitiative.educationSubsector, sub3: this.state.ImplementerInitiative.ProfitMotiveImplementerInitiative.educationSubsector, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Other Education Subsectors', subHeader: 'Number of Implementers', initiative: false, funder: false}
        }

        if (this.state.secondaryAttributeSelection == "targetSchoolManagementType") {
          return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: this.state.ImplementerTypeInitiative.ProfitMotiveInitiative.targetSchoolManagementType, sub3: this.state.ImplementerInitiative.ProfitMotiveImplementerInitiative.targetSchoolManagementType, header1: 'Implementers - Profit Motives', header2: 'Initiatives - Target School Management Types', subHeader: 'Number of Implementers', initiative: false, funder: false}
        }

        return {main: this.state.ImplementerData.profitMotives, sub: this.state.ImplementerAttributes.ProfitMotiveImplementer, sub2: '', sub3: '', header1: 'Implementers - Profit Motives', header2: '', subHeader: 'Number of Implementers', initiative: false, funder: false}
      }

      //If initiative selected as entity
      if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "countryOfOperation") {
        return {main: this.state.InititativeData.countryOfOperation.initAttributes, sub: '', sub1: '', sub2: this.state.InititativeData.countryOfOperation.initNames, sub3: '', header1: 'Initiatives - Countries of Operation', header2: '', initiative: true, funder: false}
      }

      if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "launchCountry") {
        return {main: this.state.InititativeData.launchCountry.initAttributes, sub: '', sub1: '', sub2: this.state.InititativeData.launchCountry.initNames, sub3: '', header1: 'Initiatives - Launch Countries', header2: '', initiative: true, funder: false}
      }

      if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "mainEducationSubsector") {
        return {main: this.state.InititativeData.mainEducationSubsector.initAttributes, sub: '', sub1: '', sub2: this.state.InititativeData.mainEducationSubsector.initNames, sub3: '', header1: 'Initiatives - Main Education Subsectors', header2: '', initiative: true, funder: false}
      }

      if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "educationSubsector") {
        return {main: this.state.InititativeData.educationSubsector.initAttributes, sub: '', sub1: '', sub2: this.state.InititativeData.educationSubsector.initNames, sub3: '', header1: 'Initiatives - Other Education Subsectors', header2: '', initiative: true, funder: false}
      }

      if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "mainProgrammingActivity") {
        return {main: this.state.InititativeData.mainProgrammingActivity.initAttributes, sub: '', sub1: '', sub2: this.state.InititativeData.mainProgrammingActivity.initNames, sub3: '', header1: 'Initiatives - Main Programming Activities', header2: '', initiative: true, funder: false}
      }

      if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "mainProgrammingArea") {
        return {main: this.state.InititativeData.mainProgrammingArea.initAttributes, sub: '', sub1: '', sub2: this.state.InititativeData.mainProgrammingArea.initNames, sub3: '', header1: 'Initiatives - Main Programming Area', header2: '', initiative: true, funder: false}
      }

      if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "monitoredOutcome") {
        return {main: this.state.InititativeData.monitoredOutcome.initAttributes, sub: '', sub1: '', sub2: this.state.InititativeData.monitoredOutcome.initNames, sub3: '', header1: 'Initiatives - Monitored Outcomes', header2: '', initiative: true, funder: false}
      }

      if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "programmingActivity") {
        return {main: this.state.InititativeData.programmingActivity.initAttributes, sub: '', sub1: '', sub2: this.state.InititativeData.programmingActivity.initNames, sub3: '', header1: 'Initiatives - Other Programming Areas', header2: '', initiative: true, funder: false}
      }

      if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "region") {
        return {main: this.state.InititativeData.region.initAttributes, sub: '', sub1: '', sub2: this.state.InititativeData.region.initNames, sub3: '', header1: 'Initiatives - Regions', header2: '', initiative: true, funder: false}
      }

      if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "sourceOfFunding") {
        return {main: this.state.InititativeData.sourceOfFunding.initAttributes, sub: '', sub1: '', sub2: this.state.InititativeData.sourceOfFunding.initNames, sub3: '', header1: 'Initiatives - Sources of Funding', header2: '', initiative: true, funder: false}
      }

      if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "targetGeography") {
        return {main: this.state.InititativeData.targetGeography.initAttributes, sub: '', sub1: '', sub2: this.state.InititativeData.targetGeography.initNames, sub3: '', header1: 'Initiatives - Target Geographies', header2: '', initiative: true, funder: false}
      }

      if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "targetPopulationSector") {
        return {main: this.state.InititativeData.targetPopulationSector.initAttributes, sub: '', sub1: '', sub2: this.state.InititativeData.targetPopulationSector.initNames, sub3: '', header1: 'Initiatives - Target Population Sectors', header2: '', initiative: true, funder: false}
      }

      if (this.state.entitySelection == "initiatives" && this.state.attributeSelection == "targetSchoolManagementType") {
        return {main: this.state.InititativeData.targetSchoolManagementType.initAttributes, sub: '', sub1: '', sub2: this.state.InititativeData.targetSchoolManagementType.initNames, sub3: '', header1: 'Initiatives - Target School Management Types', header2: '', initiative: true, funder: false}
      }
    }
    else {
      return null;
    }
  }

  handleEntitySelection = (event) => {
    this.setState({
      entitySelection: event.target.value,
      attributeSelection: 'select',
      secondaryAttributeSelection: 'select',
      compareChecked: false,
      breakDownChecked: false,
      mapViewChecked: false
    });
  }

  handleAttributeSelection = (event) => {
    this.setState({
      attributeSelection: event.target.value,
      mapViewChecked: false
    });
  }

  handleSecondaryAttributeSelection = (event) => {
    this.setState({
      secondaryAttributeSelection: event.target.value,
      mapViewChecked: false
    });
  }

  handleBreakDownChange = (checked) =>  {
    this.setState({ breakDownChecked: checked });
  }

  handleCompareChange = (checked) =>  {
    this.setState({
      compareChecked: checked,
      secondaryAttributeSelection: 'select' });
  }

  handleMapViewChange = (checked) =>  {
    this.setState({ mapViewChecked: checked });
  }

  render() {
    //Dynamically make attribute text field appear based on entity selection
    const selection = this.state.entitySelection == "funders" ?
      <select value = {this.state.attributeSelection} type="attributes" id="attributes" name="attributes" onChange={this.handleAttributeSelection} style = {{width:"90%", margin: "50px 0 0 20px"}}>
        <option value="select" selected = "selected">Filter a target funder attribute</option>
        <option value="profitMotive">Profit Motive</option>
        <option value="organizationForm">Organization Form</option>
        <option value="impactInvestor">Impact Investor</option>
        <option value="eSubsectors">Education Subsectors</option>
        <option value="baseLocations">Base Locations</option>
      </select> : (
        this.state.entitySelection == "initiatives" ?
        <select value = {this.state.attributeSelection} type="attributes" id="attributes" name="attributes" onChange={this.handleAttributeSelection} style = {{width:"90%", margin: "50px 0 0 20px"}}>
          <option value="select" selected = "selected">Filter an initiative attribute</option>
          <option value="countryOfOperation">Countries of Operation</option>
          <option value="launchCountry">Launch Country(ies)</option>
          <option value="mainEducationSubsector">Main Education Subsectors</option>
          <option value="educationSubsector">Other Education Subsectors</option>
          <option value="mainProgrammingActivity">Main Programming Activity</option>
          <option value="programmingActivity">Other Programming Activities</option>
          <option value="mainProgrammingArea">Main Programming Area</option>
          <option value="monitoredOutcome">Monitored Outcomes</option>
          <option value="region">Region(s)</option>
          <option value="sourceOfFunding">Sources of Funding</option>
          <option value="targetGeography">Target Geographies</option>
          <option value="targetPopulationSector">Target Population Sectors</option>
          <option value="targetSchoolManagementType">Target School Management Types</option>
        </select> : (
          this.state.entitySelection == "implementers" ?
          <select value = {this.state.attributeSelection} type="attributes" id="attributes" name="attributes" onChange={this.handleAttributeSelection} style = {{width:"90%", margin: "50px 0 0 20px"}}>
            <option value="select">Filter an implementer attribute</option>
            <option value="profitMotive">Profit Motive</option>
          </select> :
          null
        )
      )

      //Dynamically make secondary comparison field appear if compare toggle is on
      const secondarySelection = this.state.compareChecked ? (this.state.entitySelection == 'funders' || this.state.entitySelection == 'implementers' ?
        <select value = {this.state.secondaryAttributeSelection} type="attributes" id="attributes" name="attributes" onChange={this.handleSecondaryAttributeSelection} style = {{width:"90%", margin: "25px 0 0 20px"}}>
          <option value="select" selected = "selected">Filter an initiative attribute</option>
          <option value="countryOfOperation">Countries of Operation</option>
          <option value="launchCountry">Launch Country(ies)</option>
          <option value="mainEducationSubsector">Main Education Subsectors</option>
          <option value="educationSubsector">Other Education Subsectors</option>
          <option value="mainProgrammingActivity">Main Programming Activity</option>
          <option value="programmingActivity">Other Programming Activities</option>
          <option value="mainProgrammingArea">Main Programming Area</option>
          <option value="monitoredOutcome">Monitored Outcomes</option>
          <option value="region">Region(s)</option>
          <option value="sourceOfFunding">Sources of Funding</option>
          <option value="targetGeography">Target Geographies</option>
          <option value="targetPopulationSector">Target Population Sectors</option>
          <option value="targetSchoolManagementType">Target School Management Types</option>
        </select>
        : null
        ) : null

      //Compare toggle label
      const compareLabel = this.state.entitySelection !== 'select' ? (this.state.entitySelection == 'funders' || this.state.entitySelection == 'implementers' ? 'Initiatives' : null) : null
      //Breakdown toggle label
      const breakDownLabel = this.state.entitySelection !== 'select' ? (this.state.entitySelection == 'funders' ? "Funders" : (this.state.entitySelection == 'initiatives' ? 'Initiatives' : (this.state.entitySelection == 'implementers' ? 'Implementers' : null))) : null

      //Toggle for implementer/funder to initiative comparison - choose whether to show or not depending on the type of entity initially chosen
      const toggleCompare = this.state.attributeSelection !== 'select' ?
      (this.state.entitySelection == 'funders' || this.state.entitySelection == 'implementers' ?
        <div>
          <div style = {{margin: "50px 30px 0 30px"}}>
            <div style = {{float: "left"}}>
              <label style = {{margin: "0 25px 0 0", verticalAlign: "top", fontSize: "17px"}}> Break down {breakDownLabel} </label>
            </div>
            <div style = {{float: "left"}}>
              <label style = {{margin: "0 25px 0 0", verticalAlign: "top", fontSize: "12px", width: "200px"}}><i> Click the pie chart to break down {breakDownLabel} by attribute. Click again to return to the original chart.</i></label>
            </div>
            <div style = {{float: "right"}}>
              <Switch checked={this.state.breakDownChecked} onColor="#86d3ff" onHandleColor="#2693e6"
                handleDiameter={20} uncheckedIcon={false} checkedIcon={false} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20} width={48} className="react-switch" id="material-switch" key="breakDownChecked" disabled
               />
             </div>
           </div>
           <div style = {{margin: "170px 30px 0 30px"}}>
              <div style = {{float: "left"}}>
                <label style = {{margin: "0 25px 0 0", verticalAlign: "top", fontSize: "17px"}}> Compare with {compareLabel} </label>
              </div>
              <div style = {{float: "right"}}>
               <Switch checked={this.state.compareChecked} onChange={this.handleCompareChange} onColor="#86d3ff" onHandleColor="#2693e6"
                  handleDiameter={20} uncheckedIcon={false} checkedIcon={false} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20} width={48} className="react-switch" id="material-switch" key="compareChecked" disabled = {this.state.mapViewChecked}
                />
              </div>
            </div>
          </div>
       : null ) : null

     const toggleMap = (this.state.attributeSelection == 'countryOfOperation' || this.state.attributeSelection == 'launchCountry') || (this.state.secondaryAttributeSelection == 'countryOfOperation' || this.state.secondaryAttributeSelection == 'launchCountry') ?
       <div style = {{margin: "50px 30px 0 30px"}}>
          <div style = {{float: "left"}}>
            <label style = {{margin: "0 25px 0 0", verticalAlign: "top", fontSize: "17px"}}> Map View </label>
          </div>
          <div style = {{float: "right"}}>
           <Switch checked={this.state.mapViewChecked} onChange={this.handleMapViewChange} onColor="#86d3ff" onHandleColor="#2693e6"
              handleDiameter={20} uncheckedIcon={false} checkedIcon={false} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20} width={48} className="react-switch" id="material-switch" key="compareChecked"
            />
          </div>
        </div>
        :
        null

      //Setup Chart as the visualization medium
      const visual = this.state.attributeSelection !== 'select' ?
      (
        this.dataSelection() ?
        <Chart data = {this.dataSelection()} toggleCompare = {this.state.compareChecked} toggleBreakDown = {this.handleBreakDownChange} toggleMap = {this.state.mapViewChecked}/>
        : <h3> Error occured loading data, please refresh page </h3>
      ) : <img src = {WorldIcon} height = {400} width = {400} style = {{margin: "150px 0 0 450px"}} />


      return (
        <div className = "wrapper">
          <nav className = "nav flex-column sidebar settings">
            <select value = {this.state.entitySelection} type="entity" id="entity" name="entity" onChange={this.handleEntitySelection} style = {{width:"90%", margin: "50px 0 0 20px"}}>
              <option value="select">Filter Entity Type</option>
              <option value="funders">Funders</option>
              <option value="initiatives">Initiatives</option>
              <option value="implementers">Implementers</option>
            </select>
            {selection}
            {toggleCompare}
            {secondarySelection}
            {toggleMap}
            <hr style={{
                  color: "black",
                  backgroundColor: "black",
                  height: 2
              }}
          />
          </nav>
          {visual}
        </div>
      );
   }
}

const mapStateToProps = (state) => {
  return {
    FunderData: state.data.FunderData,
    ImplementerData: state.data.ImplementerData,
    InititativeData: state.data.InititativeData,
    FunderAttributes: state.data.FunderAttributes,
    ImplementerAttributes: state.data.ImplementerAttributes,
    FunderTypeInitiative: state.data.FunderTypeInitiative,
    ImplementerTypeInitiative: state.data.ImplementerTypeInitiative,
    FunderInitiative: state.data.FunderInitiative,
    ImplementerInitiative: state.data.ImplementerInitiative
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInitiativeFundersByAttr: () => {dispatch(getInitiativeFundersByAttr())},
    getInitiativeImplementersByAttr: () => {dispatch(getInitiativeImplementersByAttr())}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Visualize)
