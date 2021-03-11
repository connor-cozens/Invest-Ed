import { countryCodes } from '../../componentsData/countryCodes'
import { preexistingDefinitions, inductiveDefinitions } from '../../componentsData/orgTypes'
import { formEdSubSectors } from '../../componentsData/edSubSectors'
import { formProgAreas } from '../../componentsData/progAreas'
import { regions } from '../../componentsData/regions'
import { orgTraits } from '../../componentsData/orgTraits'
import { targetGeography } from '../../componentsData/targetGeography'
import { tuitionSource } from '../../componentsData/tuitionSource'

export const formData = {
    title: "Add New Initiative",
    description: "Please fill out the forms in each of the following sections and click 'Submit' to add a new initiative.",
    edit: {
        title: "Modify Initiative",
        description: "Please edit the forms in each of the following sections and click 'Submit' to modify this initiative.",
    },

    funder: {
        title: "Funder",
        name: {
            title: "Name",
            placeholder: "Funder Name",
        },
        site: {
            title: "Website",
            placeholder: "www.funderwebsite.com",
        },
        motive: {
            title: "Profit Motive",
            placeholder: "Select a Profit Motive...",
            options: ["Not-For-Profit", "Hybrid", "For-Profit"],
        },
        impact: {
            title: "Impact Investing?",
            placeholder: "Select an Option...",
            options: ["Yes", "No", "Unknown"],
        },
        orgForm: {
            title: "Organizational Form",
            placeholder: "Select an Organizational Form...",
            options: Object.values(preexistingDefinitions.map(def => def.OrganisationalType)).concat(Object.values(inductiveDefinitions.map(def => def.OrganisationalType))).filter(def => def != "")
        },
        intBases: {
            id: "intBases",
            title: "International Base(s)",
            placeholder: "Select all that apply...",
            type: "multiple",
            options: Object.values(countryCodes.map(country => country.Economy))
        },
        edSubSectors: {
            title: "Education Subsector(s)",
            placeholder: "Select all that apply...",
            type: "multiple",
            options: Object.values(formEdSubSectors.map(sector => sector.educationSubsector))
        },
        orgTraits: {
            title: "Organizational Trait(s)",
            placeholder: "Select all that apply...",
            type: "multiple",
            options: Object.values(orgTraits.map(trait => trait.organizationalTrait))

        },
        asiaIntBases: {
            title: "Asia International Base(s)",
            placeholder: "Select all that apply...",
            type: "multiple",
            options: Object.values(countryCodes.map(country => country.Economy))

        },
        asiaOps: {
            title: "Asia Operation(s)",
            placeholder: "Select all that apply...",
            type: "multiple",
            options: Object.values(countryCodes.map(country => country.Economy))
        }
    },

    initiative: {
        title: "Initiative",
        name: {
            title: "Name",
            placeholder: "Initiative Name",
        },
        site: {
            title: "Website",
            placeholder: "www.initiativewebsite.com"
        },
        targetsWomen: {
            title: "Targets Women?",
            placeholder: "Select an Option...",
            options: ["Yes", "No"],
        },
        startYear: {
            title: "Start Year",
            placeholder: "Start Year",
        },
        endYear: {
            title: "End Year",
            placeholder: "End Year",
        },
        launchCountry: {
            title: "Launch Country",
            placeholder: "Select a launch country...",
            //type: "multiple",
            options: Object.values(countryCodes.map(country => country.Economy)),
        },
        desc: {
            title: "Description",
            placeholder: "Write a description about the initiative...",
        },
        regions: {
            title: "Region(s)",
            placeholder: "Select all that apply...",
            type: "multiple",
            options: Object.values(regions.map(region => region.regionName).filter((item, i, ar) => ar.indexOf(item) === i)),
        },
        countries: {
            title: "Country(s)",
            placeholder: "Select all that apply...",
            type: "multiple",
            options: Object.values(countryCodes.map(country => country.Economy)),
        },
        targetGeo: {
            title: "Target Geography",
            placeholder: "Select all that apply...",
            type: "multiple",
            options: Object.values(targetGeography.map(geo => geo.targetGeography)),
        },
        mainEd: {
            title: "Main Education Subsector(s)",
            placeholder: "Select all that apply...",
            type: "multiple",
            options: Object.values(formEdSubSectors.map(sector => sector.educationSubsector)),
        },
        otherEd: {
            title: "Other Education Subsector(s)",
            placeholder: "Select all that apply...",
            type: "multiple",
            options: Object.values(formEdSubSectors.map(sector => sector.educationSubsector)),
        },
        mainProgArea: {
            title: "Main Program Activity",
            placeholder: "Select the Main Programming Activity...",
            options: Object.values(formProgAreas.map(area => area.programmingActivity).filter(area => area != "")),
        },
        otherProgArea: {
            title: "Other Programming Activities",
            placeholder: "Select all that apply...",
            type: "multiple",
            options: Object.values(formProgAreas.map(area => area.programmingActivity).filter(area => area != "")),
        },
        fundingSource: {
            title: "Funding Source(s)",
            placeholder: "Select all that apply...",
            type: "multiple",
            options: Object.values(tuitionSource.map(t => t.tuitionSource)),
        },
        accessFee: {
            title: "Fee to Access?",
            placeholder: "Select an Option...",
            options: ["Yes", "No"],
        },
        targetSchoolMgmt: {
            title: "Target School Management Type",
            placeholder: "Select the Target School Management Type...",
            options: ["Government/Public", "Non-state/Private", "Not Applicable", "Unclear", "Missing Data"],
        },
        /*targetPopSectors: {
            title: "Target Population Sector(s)",
            placeholder: "Select all that apply...",
            type: "multiple",
            options: [],
        },*/
        outcomes: {
            title: "Outcomes Monitored",
            placeholder: "Enter any outcomes monitored separated by commas (,)"
        },

    },

    implementer: {
        title: "Implementer",
        name: {
            title: "Name",
            placeholder: "Implementer Name",
        },
        motive: {
            title: "Profit Motive",
            placeholder: "Select a Profit Motive...",
            options: ["Not-For-Profit", "Hybrid", "For-Profit"],
        },
    },

    comments: {
        title: "Comments about Submission",
        placeholder: "Write any comments you have about this form."
    },

    submit: { title: "Submit" },
    resubmit: { title: "Re-submit" }
}
