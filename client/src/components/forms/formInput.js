import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './formInput.css'
import { formData } from './formData.js';
import { formProgAreas } from '../../componentsData/progAreas'
import { generateTagNumber, setImplementer } from '../../store/actions/dataActions';




const FormInput = (props) => {
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

    const [comments, setComments] = useState("") //check db for comments table

    useEffect(() => {
        if (initiative.mainProgArea != "") setInitiative({ ...initiative, mainProgActivity: Object.values(formProgAreas.filter(area => area.programmingActivity == initiative.mainProgArea))[0].programTheme})
    }, [initiative.mainProgArea])

    useEffect(() => props.generateTagNumber(), [])
    //useEffect(() => console.log('IMPLEMNENTER SET', props.implementerSet), [props.implementerSet])

    /*useEffect(() => console.log('FUNDER: ', funder), [funder])
    useEffect(() => console.log('IMPLEMENTER: ', implementer), [implementer])
    useEffect(() => console.log('INITIATIVE: ', initiative), [initiative])
    useEffect(() => console.log('COMMENTS: ', comments), [comments])*/

    if (props.authorized === false) {
        return <Redirect to='/' />
    }

    const isSearchDisabled = () => {
        let disabled = false
        Object.values(funder).map(funder => {
            if (funder == "" || funder == []) {
                disabled = true
            }
        })
        Object.values(initiative).map(initiative => {
            if (initiative == "" || initiative == []) {
                disabled = true
            }
        })

        Object.values(implementer).map(implementer => {
            if (implementer == "" || implementer == []) {
                disabled = true
            }
        })

        return disabled
    }

    const submitForm = () => {

        props.setImplementerForm(implementer, initiative, funder, props.tag)
        

        console.log(funder, initiative, implementer, comments)
    }


    return (
        <>
            <h2 className="title">{formData.title}</h2>
            <div id='formInput' className="container">
                <p>{formData.description}</p>
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
                    <RenderFormFields field={formData.comments} comments={comments} setComments={setComments} />
                </Collapsible>
                <br />
                <button className={isSearchDisabled() ? "search disabled" : "search"} disabled={false/*isSearchDisabled()*/} onClick={() => submitForm()}>{formData.submit.title}</button>
                <br /><br />
            </div>
        </>
    );
}

const RenderFormFields = (props) => {
    const { field, funder, setFunder, implementer, comments, setImplementer, initiative, setInitiative, setComments } = props

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

        if (field == formData.comments) return comments
    }

    const removeValue = (field, value) => {
        if (field == formData.funder.orgForm) setFunder({ ...funder, orgForm: [...funder.orgForm.filter(obj => obj != value)] })
        if (field == formData.funder.intBases) setFunder({ ...funder, intBases: [...funder.intBases.filter(obj => obj != value)] })
        if (field == formData.funder.edSubSectors) setFunder({ ...funder, edSubSectors: [...funder.edSubSectors.filter(obj => obj != value)] })
        if (field == formData.funder.orgTraits) setFunder({ ...funder, orgTraits: [...funder.orgTraits.filter(obj => obj != value)] })
        if (field == formData.funder.asiaIntBases) setFunder({ ...funder, asiaIntBases: [...funder.asiaIntBases.filter(obj => obj != value)] })
        if (field == formData.funder.asiaOps) setFunder({ ...funder, asiaOps: [...funder.asiaOps.filter(obj => obj != value)] })

        if (field == formData.initiative.launchCountries) setInitiative({ ...initiative, launchCountries: [...initiative.launchCountries.filter(obj => obj != value)] })
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
        if (field == formData.initiative.launchCountries && !initiative.launchCountries.includes(value)) setInitiative({ ...initiative, launchCountries: [...initiative.launchCountries, value] })
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
        tag: state.data.tag,
        implementerSet: state.data.implementerSet
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setImplementerForm: (implementer, initiative, funder, tag) => dispatch(setImplementer(implementer, initiative, funder, tag)),
        generateTagNumber: () => dispatch(generateTagNumber())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormInput)
