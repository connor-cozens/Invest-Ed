import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Collapsible } from '../common/collapsible.js';
import './formInput.css';
import { formProgAreas } from '../../componentsData/progAreas.js';
import { formData } from './formData.js';


const FormReview = (props) => {
    const { determineValue, funder, initiative, implementer } = props

    const [returnHome, setReturnHome] = useState(false)

    if (props.authorized === false) {
        return <Redirect to='/' />
    }

    return (
        <>
            {returnHome ? < Redirect to='/' /> : null}
            <h2 className="title">Initiative Submitted</h2>
            <div id='formReview' className="container">
                <div className="successContainer">
                    <p>Your initiative form has been successfully submitted. Please contact Prachi Srivastava to have your initiative reviewed.</p>
                </div>
                <p>The following initiative information has been submitted:</p>
                <Collapsible title={formData.funder.title}>
                    <h3 className="sectionTitle">{formData.funder.title}</h3>
                    {
                        Object.values(formData.funder).map(field => (
                            field != formData.funder.title ? <RenderFormFields field={field} funder={funder} determineValue={determineValue}/> : null
                        ))
                    }
                </Collapsible>
                <br />
                <Collapsible title={formData.initiative.title}>
                    <h3 className="sectionTitle">{formData.initiative.title}</h3>
                    {
                        Object.values(formData.initiative).map(field => (
                            field != formData.initiative.title ? <RenderFormFields field={field} initiative={initiative} determineValue={determineValue} /> : null
                        ))
                    }
                </Collapsible>
                <br />
                <Collapsible title={formData.implementer.title}>
                    <h3 className="sectionTitle">{formData.implementer.title}</h3>
                    {
                        Object.values(formData.implementer).map(field => (
                            field != formData.implementer.title ? <RenderFormFields field={field} implementer={implementer} determineValue={determineValue} /> : null
                        ))
                    }
                </Collapsible>
                <br />
                <Collapsible title={formData.comments.title}>
                    <h3 className="sectionTitle">{formData.comments.title}</h3>
                    <RenderFormFields field={formData.comments} determineValue={determineValue}/*comments={comments} setComments={setComments}*/ />
                </Collapsible>
                <br />
                <button className="search" onClick={() => setReturnHome(true)}>Return to Home</button>
            </div>
        </>
    )
}

const RenderFormFields = (props) => {
    const { determineValue, field, funder, implementer, initiative } = props


    return (
        <div id='formInput' className="formMargins">
            <p>{field.title}</p>
            {field.options
                ? <>
                    <select disabled value={determineValue(field)} >
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
                : <input disabled type="text" value={determineValue(field)} />
            }
            {field == formData.initiative.mainProgArea
                ? <>
                    <p>Program Area</p>
                    <p><em>{initiative != undefined ? initiative.mainProgArea != "" ? Object.values(formProgAreas.filter(area => area.programmingActivity == initiative.mainProgArea))[0].programTheme : null : null}</em></p>
                </>
                : null
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authorized: state.authenticate.auth,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormReview)
