export const glossaryData = {
    bgGuidance: {
        sectionTitle: "Background Guidance",
        title: "Typology of Education Program Areas and Activities",
        version: "Version: 27 November 2017",
        description: "The intention of this typology is to provide a working framework from which to classify program areas and activities funded/implemented by the philanthropic/impact investors (or other actors) in the database. It was derived by combining the World Bank (2017a) education sector themes (pre-2016) with the World Bank (2016) education sector definitions and taxonomy, as well as the categories, codes, and definitions used by the Center for Education Innovations (CEI) (n.d.) program database.<br /><br />These were reframed as appropriate as indicated by preliminary data analysis in the background research (see Srivastava & Read, 2017) and pilot phase, and as field insights emerged during the pilot phase with organisations.<br /><br />The typology is intended to be a working framework. Therefore, it is expected that researchers/RAs using the framework in the initial phases will apply it keeping the definitions in mind, however, will also add examples of program activities that seem to fit in the relevant program areas. They will also indicate if definitions or program areas seem to be incongruous. Before making any changes, they must bring them to the attention to either Srivastava or Read.<br /><br />The categories 'Unclear' and 'Missing Data' are included for every level of coding. Unclear is to be used in any instance where data are provided but the researcher/RA is unclear on how to categorise as a result. Missing data is to be used if there are insufficient or no data provided. DO NOT GUESS.  Use these codes as and when appropriate. All fields with these codes will be double-checked.<br /><br />You are being asked to code for three levels: (1) education sub-sector/level; (2) program area; (3) program activity. Consult the definitions for each as provided and use the appropriate code. Multiple selections for any given program can be made for (1) education sub-sector/level and for (3) program activity. You are asked to provide only one code for (2) program area. In addition for (3) program activity, you are asked to discern the main program activity in addition to all other program activities. If you cannot discern the main activity mark the column as 'Uncler' or 'Missing Data' as appropriate but select all program activities that seem to apply."
    },
    countryCodes: {
        sectionTitle: "Codes - Countries and Regions",
        tableTitle: "World Bank List of Economies (June 2017)",
        tableDescription: "This table classifies all World Bank member countries (189), and all other economies with populations of more than 30,000. For operational and analytical purposes, economies are divided among income groups according to 2016 gross national income (GNI) per capita, calculated using the World Bank Atlas method. The groups are: low income, $1,005 or less; lower middle income, $1,006-3,955; upper middle income, $3,956-12,235; and high income, $12,236 or more. The effective IDA eligibility threshold is $1,165 or less.",
        note: "Note: The term <em>country</em>, used interchangeably with <em>economy</em>, does not imply political independence but refers to any territory for which authorities report separate social or economic statistics. Income classifications set on 1 July 2017 remain in effect until 1 July 2018. Argentina, which was temporarily unclassified in July 2016 pending release of revised national accounts statistics, was classified as upper middle income for FY17 as of 29 September 2016 based on alternative conversion factors. Also effective 29 September 2016, Syrian Arab Republic is reclassified from IBRD lending category to IDA-only. On 29 March 2017, new country codes were introduced to align World Bank 3-letter codes with ISO 3-letter codes: Andorra (AND), Dem. Rep. Congo (COD), Isle of Man (IMN), Kosovo (XKX), Romania (ROU), Timor-Leste (TLS), and West Bank and Gaza (PSE).",
        classification: "<strong>*</strong> indicates a change of classification.",
        tableHeadings: {
            number: "Number",
            economy: "Economy",
            code: "Code",
            region: "Region",
            income: "Income Group",
        },
    },

    orgTypes: {
        sectionTitle: "Codes - Organisational Types",
        defsTableTitle: "Organisational Type Definitions",
        preexistingDefsTableTitle: "Based on pre-existing definitions",
        inductiveDefsTableTitle: "Definitions developed inductively",
        preexistingDesc: "Terms in grey rows are based on pre-existing definitions.",
        inductiveDesc: "Terms in white rows have been developed inductively.",
        tableHeadings: {
            type: "Organisational Type",
            def: "Definition",
            //examples: "Examples From Our Data"
        }
    },

    edSubSectors: {
        sectionTitle: "Codes - Education Sub-Sectors",
        tableTitle: "Education Sub-Sectors",
        tableHeadings: {
            subSector: "Education Sub-Sector",
            worldBankDef: "World Bank Definition",
            exclusions: "Exclusions",
            addCodes: "*Additional Codes"
        },
        additionalCodes: "*Additional codes developed as a result of coding process."

    },

    progAreas: {
        sectionTitle: "Codes - Program Areas & Activities",
        tableTitle: "AMP Program Areas & Activities",
        tableHeadings: {
            progArea: "Program Area",
            def: "Program Area Definition",
            progActivities: "Program Area Activities"
        }
    },

    references: {
        sectionTitle: "References",
        refs: [
            "Center for Education Innovations. (n.d.). FAQ. Retrieved June 7, 2017, from <a href='http://www.educationinnovations.org/faq'>http://www.educationinnovations.org/faq</a>",
            "Srivastava, P. & Read, R. (2017). Non - state private sector engagement in basic education: a network analysis of implementers and funders in the Global South. Draft paper for the NORRAG Philanthropy in Education Symposium Series, Geneva, 22-24 November 2017.",
            "World Bank. (2016). Sector taxonomy and definitions. Revised July 1, 2016. World Bank Group, Operations Policy & Country Operations. Available online from: <a href='http://pubdocs.worldbank.org/en/538321490128452070/Sector-Taxonomy-and-definitions.pdf'>http://pubdocs.worldbank.org/en/538321490128452070/Sector-Taxonomy-and-definitions.pdf</a>",
            "World Bank. (2017a). Projects and operations by theme. Available online from: <a href='http://projects.worldbank.org/theme'>http://projects.worldbank.org/theme</a>",
            "World Bank. (2017b). Sector and theme operational coding remap, 22 Feb 2017 version. World Bank Group. Available online from: <a href='http://pubdocs.worldbank.org/en/178051490128112873/Sector-and-Theme-Remap.pdf'>http://pubdocs.worldbank.org/en/178051490128112873/Sector-and-Theme-Remap.pdf</a>"
        ]
    }

}
