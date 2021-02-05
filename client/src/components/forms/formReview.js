import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { generateTagNumber, resetSubmissionResults } from '../../store/actions/dataActions';
import './formInput.css'
import { formProgAreas } from '../../componentsData/progAreas'
import { formData } from './formData.js';


const FormReview = (props) => {
    const { funder, setFunder, initiative, setInitiative, implementer, setImplementer } = props

    const [returnHome, setReturnHome] = useState(false)

    console.log(props)
    if (props.authorized === false) {
        return <Redirect to='/' />
    }

    return (
        <>
            {returnHome ? < Redirect to='/' /> : null}
            <h2 className="title">Initiative Submitted</h2>
            <div id='formReview' className="container">
                <p>Your initiative form has been successfully submitted. Please contact Prachi Srivastava to have your initiative reviewed.</p>
                <Collapsible title={formData.funder.title}>
                    <h3 className="sectionTitle">{formData.funder.title}</h3>
                    {
                        Object.values(formData.funder).map(field => (
                            field != formData.funder.title ? <RenderFormFields field={field} funder={funder} setFunder={setFunder} /> : null
                        ))
                    }

                </Collapsible>
                <br />
                <Collapsible title={formData.initiative.title}>
                    <h3 className="sectionTitle">{formData.initiative.title}</h3>
                    {
                        Object.values(formData.initiative).map(field => (
                            field != formData.initiative.title ? <RenderFormFields field={field} initiative={initiative} setInitiative={setInitiative} /> : null
                        ))
                    }

                </Collapsible>
                <br />
                <Collapsible title={formData.implementer.title}>
                    <h3 className="sectionTitle">{formData.implementer.title}</h3>
                    {
                        Object.values(formData.implementer).map(field => (
                            field != formData.implementer.title ? <RenderFormFields field={field} implementer={implementer} setImplementer={setImplementer} /> : null
                        ))
                    }
                </Collapsible>
                <br />
                <Collapsible title={formData.comments.title}>
                    <h3 className="sectionTitle">{formData.comments.title}</h3>
                    <RenderFormFields field={formData.comments} /*comments={comments} setComments={setComments}*/ />
                </Collapsible>
                <br />
                <button className="search" onClick={() => setReturnHome(true)}>Return to Home</button>
            </div>
        </>
    )
}

const RenderFormFields = (props) => {
    const { field, funder, setFunder, implementer, setImplementer, initiative, setInitiative } = props

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
        if (field == formData.initiative.launchCountries) return initiative.launchCountries
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
        <div id='formInput' className="formMargins">
            <p>{field.title}</p>
            {field.options
                ? <>
                    <select disabled={true} value={determineValue(field)} >
                        {field.options.map(option => (
                            <option value={option}>{option}</option>
                        ))}
                    </select>
                    {field.type == "multiple"
                        ? <>
                            {
                                determineValue(field) != undefined
                                    ? Object.values(determineValue(field)).map(value => (
                                        <button disabled={true} className="selectedOptions">{value}</button>
                                    ))
                                    : null
                            }
                        </>
                        : null}
                </>
                : <input disabled={true} type="text" value={determineValue(field)} />}
            {field == formData.initiative.mainProgArea
                ? <>
                    <p>Program Area</p>
                    <p><em>{initiative != undefined ? initiative.mainProgArea != "" ? Object.values(formProgAreas.filter(area => area.programmingActivity == initiative.mainProgArea))[0].programTheme : null : null}</em></p>
                </>
                : null}
        </div>
    )
}

const Collapsible = (props) => {
    const [open, setOpen] = useState(true);

    const toggle = () => {
        setOpen(!open)
    }

    return (
        <div>
            <div onClick={(e) => toggle(e)} className='header'>
                {open ? <i className="arrow up"></i> : <i className="arrow down"></i>}
                {props.title}
            </div>

            {open ? (
                <div className='content'>
                    {props.children}
                </div>
            ) : null}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        authorized: state.authenticate.auth,
        //tag: state.data.tag,
        submissionResults: state.data.implementerSet
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetSubmissionResults: () => dispatch(resetSubmissionResults()),
        //generateTagNumber: () => dispatch(generateTagNumber())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormReview)
