import React, { Component, useEffect, useState } from 'react'
import { Collapsible } from '../common/collapsible.js';
import './glossary.css';
import { glossaryData } from './glossaryData.js';
import { countryCodes } from '../../componentsData/countryCodes';
import { preexistingDefinitions, inductiveDefinitions } from '../../componentsData/orgTypes';
import { edSubSectors } from '../../componentsData/edSubSectors';
import { progAreas } from '../../componentsData/progAreas';

const Glossary = () => {

    return (
        <>
        <h2 className="title">Glossary</h2>
        <div id='glossary' className="container">
                <Collapsible title={glossaryData.bgGuidance.sectionTitle} open={false}>
                <h3 className="sectionTitle">{glossaryData.bgGuidance.title}</h3>
                <p><em>{glossaryData.bgGuidance.version}</em></p>
                <p dangerouslySetInnerHTML={{ __html: glossaryData.bgGuidance.description }} />
            </Collapsible>
            <br />
            <Collapsible title={glossaryData.countryCodes.sectionTitle} open={false}>
                <h3 className="sectionTitle">{glossaryData.countryCodes.tableTitle}</h3>
                <p>{glossaryData.countryCodes.tableDescription}</p>
                {RenderTable(RenderHeaders(glossaryData.countryCodes.tableHeadings), RenderCountryCodes())}
                <p dangerouslySetInnerHTML={{ __html: glossaryData.countryCodes.classification }} />
                <br />
                <p dangerouslySetInnerHTML={{ __html: glossaryData.countryCodes.note }} />
            </Collapsible>
            <br />
            <Collapsible title={glossaryData.orgTypes.sectionTitle} open={false}>
                <h3 className="sectionTitle">{glossaryData.orgTypes.defsTableTitle}</h3>
                {RenderTable(RenderHeaders(glossaryData.orgTypes.tableHeadings), RenderOrgTypes())}
                <p style={{ marginBottom: "0" }}>{glossaryData.orgTypes.preexistingDesc}</p>
                <p>{glossaryData.orgTypes.inductiveDesc}</p>
                {/*INSERT BLURB HERE W PAPER REFERENCE*/}
            </Collapsible>
            <br />
            <Collapsible title={glossaryData.edSubSectors.sectionTitle} open={false}>
                <h3 className="sectionTitle">{glossaryData.edSubSectors.tableTitle}</h3>
                {RenderTable(RenderHeaders(glossaryData.edSubSectors.tableHeadings), RenderSubSectors())}
                <p>{glossaryData.edSubSectors.additionalCodes}</p>
            </Collapsible>
            <br />
            <Collapsible title={glossaryData.progAreas.sectionTitle} open={false}>
                <h3 className="sectionTitle">{glossaryData.progAreas.tableTitle}</h3>
                {RenderTable(RenderHeaders(glossaryData.progAreas.tableHeadings), RenderProgramAreas())}
            </Collapsible>
            <br />
            <Collapsible title={glossaryData.references.sectionTitle} open={false}>
                <h3 className="sectionTitle">{glossaryData.references.sectionTitle}</h3>
                {RenderReferences()}
            </Collapsible>
            <br />
        </div>
        </>
    );
}

const RenderTable = (tableHead, tableBody) => {

    return (
        <div className="tableContainer">
            <table style={{ width: '100%' }}>
                <thead>
                    {tableHead}
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
        </div>
    )

}

const RenderHeaders = (headers) => {

    return (
        <tr>
            {Object.values(headers).map((header) => (<th className="stickyHeader">{header}</th>))}
        </tr>
    )
}

const RenderReferences = () => {

    return (
        <>
            <ul>
                {glossaryData.references.refs.map((ref, i) => (
                    <li style={{marginBottom: '1vh'}} dangerouslySetInnerHTML={{ __html: ref }} />
                ))}
            </ul>
        </>
    )
    
}

const RenderProgramAreas = () => {
    return (
    <>
            {progAreas.map((area, i) => {
                let idx = 0
                return(
                    <tr className="rowStyle">
                        <td className={area.AMPProgramArea != "" ? "cellBorderTop" : null} style={{ width: '10%' }}>{area.AMPProgramArea}</td>
                        <td className={area.AMPProgramAreaDefinition != "" ? "cellBorderTop cellBorderLeft" : "cellBorderLeft"} style={{ width: '70%' }}>{area.AMPProgramAreaDefinition}</td>
                        <td className="cellBorderLeft cellBorderBottom cellBorderTop" style={{ width: '20%' }}>{area.AMPProgramActivities}</td>
                    </tr>

                )
            })}
    </>
    )
}

const RenderSubSectors = () => {
    return (
        <>
            {edSubSectors.map((sector, i) => (
                <tr className={i % 2 == 0 ? "rowStyle" : "rowStyleAlt"}>
                    <td className="cellBorderRight" style={{ fontWeight: "bold", width: '8%' }}>{sector.EducationSubSector}</td>
                    <td className="cellBorderRight" style={{width: '60%' }}>{sector.WorldBankDefinition}</td>
                    <td className="cellBorderRight" style={{ width: '16%' }}>{sector.Exclusions}</td>
                    <td className="" style={{ width: '16%' }}>{sector.AdditionalCodes}</td>
                </tr>
            ))}
        </>
    )
}

const RenderOrgTypes = () => {
    return (
        <>
            {preexistingDefinitions.map((def, i) => (
                <tr className={"rowStyle"}>
                    <td className={def.OrganisationalType != "" ? "cellBorderTop cellBorderRight" : "cellBorderRight cellBorderBottom"} style={{ fontWeight: "bold" }}>{def.OrganisationalType}</td>
                    <td className="cellBorderTop cellBorderBottom">{def.Definition}</td>
                </tr>
            ))}
            {inductiveDefinitions.map((def, i) => (
                <tr className="rowStyleAlt">
                    <td className="cellBorderBottom" style={{fontWeight: "bold"}}>{def.OrganisationalType}</td>
                    <td className="cellBorderLeft cellBorderRight cellBorderBottom">{def.Definition}</td>
                </tr>  
            ))}
        </>
    )
}

const RenderCountryCodes = () => {

    const boldWord = (word) => {
        if (word != ".." && word.includes("*")) {
            return <strong>{word}</strong>
        }
        else return word
    }

    return (
        <>
            {countryCodes.map((country, i) => (
                <tr className={i % 2 == 0 ? "rowStyle" : "rowStyleAlt"}>
                    <td style={{ width: '10%'}}>{country.Number}</td>
                    <td style={{ width: '15%' }}>{boldWord(country.Economy)}</td>
                    <td style={{ width: '10%' }}>{boldWord(country.Code)}</td>
                    <td style={{ width: '20%' }}>{boldWord(country.Region)}</td>
                    <td style={{ width: '20%' }}>{boldWord(country.IncomeGroup)}</td>
                </tr>
            ))}
        </>
    )
}


export default Glossary
