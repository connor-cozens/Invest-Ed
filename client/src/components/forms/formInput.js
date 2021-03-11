import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Collapsible } from '../common/collapsible.js';
import './formInput.css'
import { formData } from './formData.js';
import { formProgAreas } from '../../componentsData/progAreas';
import { generateTagNumber, addInitiative, getInitiative } from '../../store/actions/dataActions';

const FormInput = (props) => {
    const { determineValue, funder, setFunder, initiative, setInitiative, implementer, setImplementer } = props

    const [comments, setComments] = useState("") //check db for comments table or email comments???

    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState(false)

    const [editing, setEditing] = useState(props.location.state ? props.location.state.tag ? true : false : false)

    useEffect(() => {
        console.log('TAG:', props.tag)

    }, [props.tag])

    useEffect(() => {
        console.log('MODIFY:', props.modifyInitiative)
            if (editing && (props.modifyInitiative != undefined)) {
                setInitiative({
                    ...props.modifyInitiative.initiative,
                    mainProgArea: props.modifyInitiative.initiative.mainProgActivity,
                })
                setFunder({ ...props.modifyInitiative.funder })
                setImplementer({ ...props.modifyInitiative.implementer })
            }


    }, [props.modifyInitiative])

    //generate tag upon loading component
    useEffect(() => {
        if (props.location.state) {
            props.generateTagNumber(props.location.state.tag)
            props.getInitiative(props.location.state.tag)
        }
        else props.generateTagNumber()

    }, [])

    //set programming area if programming activity is picked
    useEffect(() => {
        if (initiative.mainProgArea != "")
            setInitiative({
                ...initiative,
                mainProgActivity: Object.values(formProgAreas.filter(area => area.programmingActivity == initiative.mainProgArea))[0].programTheme
            })
    }, [initiative.mainProgArea])


    //determine errors upon submitted form
    useEffect(() => {
        if (submitted) {
            Object.values(props.submissionResults).map(result => {
                //console.log(result)
                if (result.error) setErrors(true)
            })
        }
    }, [props.submissionResults])

    useEffect(() => console.log(errors), [errors])

    if (props.authorized === false) {
        return <Redirect to='/' />
    }

    const isSearchDisabled = () => {
        if (errors) return true
        let disabled = false

        Object.values(funder).map(funder => (funder == "" || funder == []) ? disabled = true : null)
        Object.values(initiative).map(initiative => (initiative == "" || initiative == []) ? disabled = true : null)
        Object.values(implementer).map(implementer => (implementer == "" || implementer == []) ? disabled = true : null)

        return disabled
    }

    const submitForm = () => {
        //HANDLE WHETHER FORM IS NEW OR BEING REVIEWED & SUBMITTED BY ROOT USER
        props.addInitiative(implementer, initiative, funder, props.tag)
        setSubmitted(true)

        console.log(funder, initiative, implementer, comments)
    }

    return (
        <>
            <h2 className="title">{editing ? formData.edit.title : formData.title}</h2>
            <div id='formInput' className="container">
                <>
                    <p>{editing ? formData.edit.description : formData.description}</p>
                    <Collapsible title={formData.funder.title}>
                        <h3 className="sectionTitle">{formData.funder.title}</h3>
                        {
                            Object.values(formData.funder).map(field => (
                                field != formData.funder.title ? <RenderFormFields field={field} funder={funder} setFunder={setFunder} determineValue={determineValue}/> : null
                            ))
                        }

                    </Collapsible>
                    <br />
                    <Collapsible title={formData.initiative.title}>
                        <h3 className="sectionTitle">{formData.initiative.title}</h3>
                        {
                            Object.values(formData.initiative).map(field => (
                                field != formData.initiative.title ? <RenderFormFields field={field} initiative={initiative} setInitiative={setInitiative} determineValue={determineValue}/> : null
                            ))
                        }

                    </Collapsible>
                    <br />
                    <Collapsible title={formData.implementer.title}>
                        <h3 className="sectionTitle">{formData.implementer.title}</h3>
                        {
                            Object.values(formData.implementer).map(field => (
                                field != formData.implementer.title ? <RenderFormFields field={field} implementer={implementer} setImplementer={setImplementer} determineValue={determineValue} /> : null
                            ))
                        }
                    </Collapsible>
                    <br />
                    <Collapsible title={formData.comments.title}>
                        <h3 className="sectionTitle">{formData.comments.title}</h3>
                        <RenderFormFields field={formData.comments} comments={comments} setComments={setComments} determineValue={determineValue} />
                    </Collapsible>
                    <br />
                    {errors
                        ? <div className="errorContainer">
                            <p>Error! Your form return errors upon submission. Please resolve them and re-submit.</p>
                            {Object.values(props.submissionResults).map(e => e.error ? <p>{e.error.message} for query {e.error.query}</p> : null)}
                        </div>
                        : null}
                    <button
                        className={isSearchDisabled() ? "search disabled" : "search"}
                        disabled={false /*isSearchDisabled()*/}
                        onClick={() => submitForm()}
                    >
                        {errors ? formData.resubmit.title : formData.submit.title}
                    </button>
                    <br /><br />
                </>
            </div>
        </>
    );
}

const RenderFormFields = (props) => {
    const { determineValue, field, funder, setFunder, implementer, comments, setImplementer, initiative, setInitiative, setComments } = props

    const removeValue = (field, value) => {
        if (field == formData.funder.orgForm) setFunder({ ...funder, orgForm: [...funder.orgForm.filter(obj => obj != value)] })
        if (field == formData.funder.intBases) setFunder({ ...funder, intBases: [...funder.intBases.filter(obj => obj != value)] })
        if (field == formData.funder.edSubSectors) setFunder({ ...funder, edSubSectors: [...funder.edSubSectors.filter(obj => obj != value)] })
        if (field == formData.funder.orgTraits) setFunder({ ...funder, orgTraits: [...funder.orgTraits.filter(obj => obj != value)] })
        if (field == formData.funder.asiaIntBases) setFunder({ ...funder, asiaIntBases: [...funder.asiaIntBases.filter(obj => obj != value)] })
        if (field == formData.funder.asiaOps) setFunder({ ...funder, asiaOps: [...funder.asiaOps.filter(obj => obj != value)] })

        //if (field == formData.initiative.launchCountries) setInitiative({ ...initiative, launchCountries: [...initiative.launchCountries.filter(obj => obj != value)] })
        if (field == formData.initiative.regions) setInitiative({ ...initiative, regions: [...initiative.regions.filter(obj => obj != value)] })
        if (field == formData.initiative.countries) setInitiative({ ...initiative, countries: [...initiative.countries.filter(obj => obj != value)] })
        if (field == formData.initiative.targetGeo) setInitiative({ ...initiative, targetGeo: [...initiative.targetGeo.filter(obj => obj != value)] })
        if (field == formData.initiative.mainEd) setInitiative({ ...initiative, mainEd: [...initiative.mainEd.filter(obj => obj != value)] })
        if (field == formData.initiative.otherEd) setInitiative({ ...initiative, otherEd: [...initiative.otherEd.filter(obj => obj != value)] })
        if (field == formData.initiative.otherProgArea) setInitiative({ ...initiative, otherProgArea: [...initiative.otherProgArea.filter(obj => obj != value)] })
        if (field == formData.initiative.fundingSource) setInitiative({ ...initiative, fundingSource: [...initiative.fundingSource.filter(obj => obj != value)] })
        if (field == formData.initiative.targetPopSectors) setInitiative({ ...initiative, targetPopSectors: [...initiative.targetPopSectors.filter(obj => obj != value)] })

        if (field == formData.implementer.name) setImplementer({ ...implementer, name: value })
        if (field == formData.implementer.motive) setImplementer({ ...implementer, motive: value })

        
    }

    const changeInputValue = (value, field) => {
        if (field == formData.funder.name) setFunder({ ...funder, name: value })
        if (field == formData.funder.site) setFunder({ ...funder, site: value })
        if (field == formData.funder.motive) setFunder({ ...funder, motive: value })
        if (field == formData.funder.impact) setFunder({ ...funder, impact: value })
        if (field == formData.funder.orgForm) setFunder({ ...funder, orgForm: value })
        if (field == formData.funder.intBases && !funder.intBases.includes(value)) setFunder({ ...funder, intBases: [...funder.intBases, value] })
        if (field == formData.funder.edSubSectors && !funder.edSubSectors.includes(value)) setFunder({ ...funder, edSubSectors: [...funder.edSubSectors, value] })
        if (field == formData.funder.orgTraits && !funder.orgTraits.includes(value)) setFunder({ ...funder, orgTraits: [...funder.orgTraits, value] })
        if (field == formData.funder.asiaIntBases && !funder.asiaIntBases.includes(value)) setFunder({ ...funder, asiaIntBases: [...funder.asiaIntBases, value] })
        if (field == formData.funder.asiaOps && !funder.asiaOps.includes(value)) setFunder({ ...funder, asiaOps: [...funder.asiaOps, value] })

        if (field == formData.initiative.name) setInitiative({ ...initiative, name: value })
        if (field == formData.initiative.site) setInitiative({ ...initiative, site: value })
        if (field == formData.initiative.targetsWomen) setInitiative({ ...initiative, targetsWomen: value})
        if (field == formData.initiative.startYear) setInitiative({ ...initiative, startYear: value })
        if (field == formData.initiative.endYear) setInitiative({ ...initiative, endYear: value })
        if (field == formData.initiative.launchCountry) setInitiative({ ...initiative, launchCountry: value })
        if (field == formData.initiative.desc) setInitiative({ ...initiative, desc: value })
        if (field == formData.initiative.regions && !initiative.regions.includes(value)) setInitiative({ ...initiative, regions: [...initiative.regions, value] })
        if (field == formData.initiative.countries && !initiative.countries.includes(value)) setInitiative({ ...initiative, countries: [...initiative.countries, value] })
        if (field == formData.initiative.targetGeo && !initiative.targetGeo.includes(value)) setInitiative({ ...initiative, targetGeo: [...initiative.targetGeo, value]})
        if (field == formData.initiative.mainEd && !initiative.mainEd.includes(value)) setInitiative({ ...initiative, mainEd: [...initiative.mainEd, value] })
        if (field == formData.initiative.otherEd && !initiative.otherEd.includes(value)) setInitiative({ ...initiative, otherEd: [...initiative.otherEd, value] })
        if (field == formData.initiative.mainProgArea) setInitiative({ ...initiative, mainProgArea: value })
        if (field == formData.initiative.otherProgArea && !initiative.otherProgArea.includes(value)) setInitiative({ ...initiative, otherProgArea: [...initiative.otherProgArea, value] })
        if (field == formData.initiative.fundingSource && !initiative.fundingSource.includes(value)) setInitiative({ ...initiative, fundingSource: [...initiative.fundingSource, value] })
        if (field == formData.initiative.accessFee) setInitiative({ ...initiative, accessFee: value })
        if (field == formData.initiative.targetSchoolMgmt) setInitiative({ ...initiative, targetSchoolMgmt: value })
        if (field == formData.initiative.targetPopSectors && !initiative.targetPopSectors.includes(value)) setInitiative({ ...initiative, targetPopSectors: [...initiative.targetPopSectors, value] })
        //if (field == formData.initiative.outcomes && !initiative.outcomes.includes(value)) setInitiative({ ...initiative, outcomes: [...initiative.outcomes, value] })
        if (field == formData.initiative.outcomes) setInitiative({ ...initiative, outcomes: value }) //not accounted for

        if (field == formData.implementer.name) setImplementer({ ...implementer, name: value })
        if (field == formData.implementer.motive) setImplementer({ ...implementer, motive: value })

        if (field == formData.comments) setComments(value)

    }

    return (
        <div className="formMargins">
            <p>{field.title}</p>
            {field.options
                ? <>
                    <select value={determineValue(field)} onChange={e => changeInputValue(e.target.value, field)}>
                        <option value={""} className="selectPlaceholder">{field.placeholder}</option>
                        {field.options.map(option => (
                            <option value={option}>{option}</option>
                        ))}
                    </select>
                    {field.type == "multiple"
                        ? <>
                            {
                                determineValue(field) != undefined
                                    ? Object.values(determineValue(field)).map(value => (
                                        <button className="selectedOptions" onClick={() => removeValue(field, value)}><b>X</b> {value}</button>
                                    ))
                                    : null
                            }
                        </>
                        : null}
                </>
                : <input placeholder={field.placeholder} type="text" value={determineValue(field)} onChange={e => changeInputValue(e.target.value, field)} />}
            {field == formData.initiative.mainProgArea
                ? <>
                    <p>Program Area</p>
                    <p><em>{initiative != undefined ? initiative.mainProgArea != ""  ? Object.values(formProgAreas.filter(area => area.programmingActivity == initiative.mainProgArea))[0].programTheme : null : null}</em></p>
                </>
                : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authorized: state.authenticate.auth,
        tag: state.data.tag,
        submissionResults: state.data.addInitiative,
        modifyInitiative: state.data.getInitiative
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addInitiative: (implementer, initiative, funder, tag) => dispatch(addInitiative(implementer, initiative, funder, tag)),
        getInitiative: (tag) => dispatch(getInitiative(tag)),
        generateTagNumber: (tag) => dispatch(generateTagNumber(tag))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormInput)
