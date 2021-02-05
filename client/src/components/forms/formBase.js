import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { generateTagNumber, resetSubmissionResults } from '../../store/actions/dataActions';

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
        launchCountries: [],
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
    }, [])

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
            if (!errorsFound) setSuccess(true)
        }
        

        

    }, [props.submissionResults])

    if (props.authorized === false) {
        return <Redirect to='/' />
    }


    return (
        !success
            ? <FormInput
                funder={funder} setFunder={setFunder}
                initiative={initiative} setInitiative={setInitiative}
                implementer={implementer} setImplementer={setImplementer}
            />
            : <FormReview
                funder={funder} setFunder={setFunder}
                initiative={initiative} setInitiative={setInitiative}
                implementer={implementer} setImplementer={setImplementer}
            />
    )
}


const mapStateToProps = (state) => {
    return {
        authorized: state.authenticate.auth,
        //tag: state.data.tag,
        submissionResults: state.data.addInitiative
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetSubmissionResults: () => dispatch(resetSubmissionResults()),
        //generateTagNumber: () => dispatch(generateTagNumber())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBase)
