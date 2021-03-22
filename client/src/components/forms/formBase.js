import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { generateTagNumber, resetSubmissionResults, resetRemoveResults } from '../../store/actions/dataActions';

import './formInput.css'
import { formData } from './formData.js';
import FormInput from './formInput.js'
import FormReview from './formReview.js'


const FormBase = (props) => {
    const [errors, setErrors] = useState(false)
    const [success, setSuccess] = useState(false)

    const [funder, setFunder] = useState({
        name: "", //
        site: "", //
        motive: "", //
        impact: "", //
        orgForm: "", //
        intBases: [], //
        edSubSectors: [], //
        orgTraits: [], //
        asiaIntBases: [], //
        asiaOps: [] //
    })

    const [initiative, setInitiative] = useState({
        name: "",
        site: "",
        targetsWomen: "",
        startYear: "",
        endYear: "",
        launchCountry: "",
        desc: "",
        regions: [],
        countries: [],
        targetGeo: [],
        mainEd: [],
        otherEd: [],
        mainProgArea: "",
        mainProgActivity: "",
        otherProgArea: [],
        fundingSource: [],
        accessFee: "",
        targetSchoolMgmt: "",
        //targetPopSectors: [], REQUIRED??????
        outcomes: "" //not accounted for
    })

    const [implementer, setImplementer] = useState({
        name: "", //
        motive: "" //
    })

    useEffect(() => {
        props.resetSubmissionResults()
        props.resetRemoveResults()
    }, [])

    useEffect(() => {
        props.resetSubmissionResults()
        props.resetRemoveResults()
    }, [success])

    useEffect(() => console.log(initiative), [initiative])

    useEffect(() => {
        let errorsFound = false
        console.log('FORMBASE: ', props.submissionResults)
        if (props.submissionResults != undefined) {
            Object.values(props.submissionResults).map(result => {
                console.log(result)
                if (result.error) {
                    setErrors(true)
                    errorsFound = true
                }
            })
            if (!errorsFound) {
                setSuccess(true)
                window.scrollTo(0, 0)
            }
        }
        

        

    }, [props.submissionResults])

    useEffect(() => {
        let errorsFound = false
        console.log('FORMBASE: ', props.submissionResults)
        if (props.removeResults != undefined) {
            Object.values(props.removeResults).map(result => {
                console.log(result)
                if (result.error) {
                    setErrors(true)
                    errorsFound = true
                }
            })
            if (!errorsFound) {
                setSuccess(true)
                window.scrollTo(0, 0)
            }
        }
        

        

    }, [props.removeResults])

    if (props.authorized === false) {
        return <Redirect to='/' />
    }

    const determineValue = (field) => {
        if (field == formData.funder.name) return funder.name
        if (field == formData.funder.site) return funder.site
        if (field == formData.funder.motive) return funder.motive
        if (field == formData.funder.impact) return funder.impact
        if (field == formData.funder.orgForm) return funder.orgForm
        if (field == formData.funder.intBases) return funder.intBases
        if (field == formData.funder.edSubSectors) return funder.edSubSectors
        if (field == formData.funder.orgTraits) return funder.orgTraits
        if (field == formData.funder.asiaIntBases) return funder.asiaIntBases
        if (field == formData.funder.asiaOps) return funder.asiaOps

        if (field == formData.initiative.name) return initiative.name
        if (field == formData.initiative.site) return initiative.site
        if (field == formData.initiative.targetsWomen) return initiative.targetsWomen
        if (field == formData.initiative.startYear) return initiative.startYear
        if (field == formData.initiative.endYear) return initiative.endYear
        if (field == formData.initiative.launchCountry) return initiative.launchCountry
        if (field == formData.initiative.desc) return initiative.desc
        if (field == formData.initiative.regions) return initiative.regions
        if (field == formData.initiative.countries) return initiative.countries
        if (field == formData.initiative.targetGeo) return initiative.targetGeo
        if (field == formData.initiative.mainEd) return initiative.mainEd
        if (field == formData.initiative.otherEd) return initiative.otherEd
        if (field == formData.initiative.mainProgArea) return initiative.mainProgArea
        if (field == formData.initiative.otherProgArea) return initiative.otherProgArea
        if (field == formData.initiative.fundingSource) return initiative.fundingSource
        if (field == formData.initiative.accessFee) return initiative.accessFee
        if (field == formData.initiative.targetSchoolMgmt) return initiative.targetSchoolMgmt
        if (field == formData.initiative.targetPopSectors) return initiative.targetPopSectors
        if (field == formData.initiative.outcomes) return initiative.outcomes

        if (field == formData.implementer.name) return implementer.name
        if (field == formData.implementer.motive) return implementer.motive

        //if (field == formData.comments) return comments
    }


    return (
        !success
            ? <FormInput
                funder={funder} setFunder={setFunder}
                initiative={initiative} setInitiative={setInitiative}
                implementer={implementer} setImplementer={setImplementer}
                determineValue={determineValue}
                { ...props }
            />
            : <FormReview
                funder={funder} setFunder={setFunder}
                initiative={initiative} setInitiative={setInitiative}
                implementer={implementer} setImplementer={setImplementer}
                determineValue={determineValue}
                { ...props }
            />
    )
}


const mapStateToProps = (state) => {
    return {
        authorized: state.authenticate.auth,
        //tag: state.data.tag,
        submissionResults: state.data.addInitiative,
        removeResults: state.data.removeInitiative,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetSubmissionResults: () => dispatch(resetSubmissionResults()),
        resetRemoveResults: () => dispatch(resetRemoveResults()),

        //generateTagNumber: () => dispatch(generateTagNumber())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBase)
