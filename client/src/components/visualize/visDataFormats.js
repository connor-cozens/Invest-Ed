//FOR REFERENCE ONLY - The format of objects to be used for data visualization


//TARGET FUNDER DATA
TargetFunderData:
{
  profitMotives: [
  {
    name: "profit",
    value: 4  //Number of funders that are profit-based
  },
  {
    name: "not-for-profit",
    value: 2
  },
  {
    name: "hybrid",
    value: 3
  }],
  organizationForm: [
    {
      name: "private",
      value: 20 //Number of funders that private funders
    },
    {
      name: "impact investor",
      value: 20
    }],
},

//IMPLEMENTER DATA
ImplementerData:
{
  profitMotives: [
    {
      name: "profit",
      value: 20 //Number of implementers that are profit-based
    },
    {
      name: "not-for-profit",
      value: 20
    },
    {
      name: "hybrid",
      value: 5
    }],
},

//INITIATIVE DATA
InititativeData:
{
  mainProgramActivity: [
    {
      name: "Scholarships",
      value: 10  //Number of initiatives that have "Scholarships" as their main programming area
    },
    {
      name: "School Loans",
      value: 15
    },
    {
      name: "Contracting",
      value: 5
    }],
    countryOfOperation: [
      {
        name: "Canada",
        value: 10  //Number of initiatives that operate in Canada
      },
      {
        name: "India",
        value: 17
      },
      {
        name: "Australia",
        value: 20
      }
    ],
},


//FUNDER ATTRIBUTES
FunderAttributes: [
  //ATTRIBUTE 1 - PROFIT MOTIVE
  ProfitMotiveTargetFunder: [
    {
      id: "profit",
      data: [
        {
          name: "funder1",
          value: 3 //Number of initiatives that funder1, a profit funder, funds
        },
        {
          name: "funder2",
          value: 5
        },
        {
          name: "funder3",
          value: 4
        },
        {
          name: "funder4",
          value: 2
        }
      ]
    },
    {
      id: "not-for-profit",
      data: [
        {
          name: "funder1",
          value: 2
        },
        {
          name: "funder2",
          value: 3
        }
      ]
    },

    {
      id: "hybrid",
      data: [
        {
          name: "funder1",
          value: 1
        },
        {
          name: "funder2",
          value: 2
        },
        {
          name: "funder3",
          value: 2
        }
      ]
    }
  ],

  //ATTRIBUTE 2 - ORGANIZATION FORM
  OrgFormTargetFunder: [
      {
      id: "private",
      data:[
        {
          name: "funder1",
          value: 3 //Number of initiatives that funder1, a private funder, funds
        },
        {
          name: "funder2",
          value: 5
        },
        {
          name: "funder3",
          value: 10
        },
        {
          name: "funder4",
          value: 2
        }
      ]
    },

    {
      id: "impact investor",
      data:[
        {
          name: "funder1",
          value: 2,
        },
        {
          name: "funder2",
          value: 3,
        },
        {
          name: "funder3",
          value: 2,
        }
      ]
    }
  ]
],


//IMPLEMENTER ATTRIBUTES
ImplementerAttributes: [
  //ATTRIBUTE 1 - ORGANIZATION FORM
  ProfitMotiveImplementer: [
    {
      id: "profit",
      data:[
        {
          name: "implementer1",
          value: 4  //Number of initiatives that implementer1, a profit implementer, implements
        },
        {
          name: "implementer2",
          value: 6
        }
      ],
    },
    {
      id: "not-for-profit",
      data:[
        {
          name: "implementer1",
          value: 2
        },
        {
          name: "implementer3",
          value: 2
        }
      ]
    },
    {
      id: "hybrid",
      data:[
        {
          name: "implementer1",
          value: 1
        },
        {
          name: "implementer2",
          value: 3
        },
        {
          name: "implementer3",
          value: 2
        }
      ]
    }
  ],
],


//RELATIONSHIPS BETWEEN FUNDER attribute AND number of INITIATIVES by initiative attribute
FunderTypeInitiative: [
  0 : {
    //RELATIONSHIP 1 - Relationship between funders filtered by profit motive, and initiatives by initiative attribute
     ProfitMotiveInitiative: {
       mainProgramActivity: [
         {
           id: "profit",
           data:[
             {
               name: "Scholarships",
               value: 4 //Number of initiatives of mainProgramActivity type "scholarship", that are funded by profit funders
             },
             {
               name: "School Loans",
               value: 5
             },
             {
               name: "Contracting",
               value: 9
             }
           ]
         },
         {
           id: "not-for-profit",
           data:[
             {
               name: "Contracting",
               value: 5
             }
           ]
         },
         {
           id: "hybrid",
           data:[
             {
               name: "Scholarships",
               value: 3
             },
             {
               name: "Contracting",
               value: 4
             }
           ]
         }
       ],
       countryOfOperation:[
         {
           id: "profit",
           data:[
             {
               name: "Brazil",
               value: 11 //Number of initiatives with country of operation in Brazil, that are funded by profit funders
             },
             {
               name: "Argentina",
               value: 5
             },
             {
               name: "Morocco",
               value: 9
             }
           ]
         },
         {
           id: "not-for-profit",
           data:[
             {
               name: "Saudi Arabia",
               value: 2
             }
           ]
         },
         {
           id: "hybrid",
           data:[
             {
               name: "Armenia",
               value: 1
             },
             {
               name: "Madagascar",
               value: 1
             }
           ]
         }
       ]
     },

   //RELATIONSHIP 2 - Relationship between funders filtered by organization form, and initiatives by initiative attribute
   OrgFormInitiative:{
       mainProgramActivity:[
         {
           id: "private",
           data:[
             {
               name: "Scholarships",
               value: 10 //Number of initiatives of mainProgramActivity type "scholarship", that are funded by profit funders
             },
             {
               name: "School Loans",
               value: 9
             },
             {
               name: "Contracting",
               value: 9
             }
           ]
         },
         {
           id: "impact investor",
           data:[
             {
               name: "School Loans",
               value: 9
             },
             {
               name: "Contracting",
               value: 10
             }
           ]
         }
       ],
       countryOfOperation:[
         {
           id: "private",
           data:[
             {
               name: "Thailand",
               value: 10 //Number of initiatives with country of operation in Thailand, that are funded by profit funders
             },
             {
               name: "China",
               value: 3
             },
             {
               name: "India",
               value: 5
             }
           ]
         },
         {
           id: "impact investor",
           data:[
             {
               name: "Italy",
               value: 7
             },
             {
               name: "Bulgaria",
               value: 5
             }
           ]
         }
       ]
     }
   }
],


//RELATIONSHIPS BETWEEN IMPLEMENTER attribute AND number of INITIATIVES by initiative attribute
ImplementerTypeInitiative: {
  //RELATIONSHIP 1 - Relationship between implementers filtered by profit motive, and number of initiatives by initiative attribute
  ProfitMotiveInitiative: {
      mainProgramActivity: [
        {
          id: "profit",
          data:[
            {
              name: "Scholarships",
              value: 1 //Number of initiatives of mainProgramActivity type "scholarship", that are implemented by profit motive based implementers
            }
          ]
        },
        {
          id: "not-for-profit",
          data:[
            {
              name: "Contracting",
              value: 2
            }
          ]
        },
        {
          id: "hybrid",
          data:[
            {
              name: "Scholarships",
              value: 2
            },
            {
              name: "Contracting",
              value: 1
            }
          ]
        }
      ],

      countryOfOperation:[
        {
          id: "profit",
          data:[
            {
              name: "Japan",
              value: 3 //Number of initiatives with country of operation in Japan, that are funded by profit funders
            }
          ]
        },
        {
          id: "not-for-profit",
          data:[
            {
              name: "Cambodia",
              value: 2
            }
          ]
        },
        {
          id: "hybrid",
          data:[
            {
              name: "Philippines",
              value: 4
            },
            {
              name: "Bangladesh",
              value: 1
            }
          ]
        }
      ]
    }
},

//RELATIONSHIPS BETWEEN FUNDER AND number of INITIATIVES by initiative attribute
FunderInitiative: [
   0: {
     //RELATIONSHIP 1 - Relationship between funders filtered by profit motive, and number of initiatives by initiative attribute
     ProfitMotiveFunderInitiative: {
       mainProgramActivity : [
       {
         id: "funder1",
         data: [
           {
             name: "Scholarships",
             value: 2 //Number of initiatives of mainProgramActivity type "scholarship" are funded by funder1, a profit motive based funder
           },
           {
             name: "School Loans",
             value: 1
           },
         ]
       },
       {
         id: "funder2",
         data: [
           {
             name: "Scholarships",
             value: 2
           },
           {
             name: "School Loans",
             value: 2
           },
           {
             name: "Contracting",
             value: 1
           }
         ]
       },
       {
         id: "funder3",
         data: [
           {
             name: "Scholarships",
             value: 1
           },
           {
             name: "School Loans",
             value: 2
           },
           {
             name: "Contracting",
             value: 1
           }
         ]
       },
       {
         id: "funder4",
         data: [
           {
             name: "Contracting",
             value: 2
           }
         ]
       }
     ],
     countryOfOperation : [
     {
       id: "funder1",
       data: [
         {
           name: "Pakistan",
           value: 1 //Number of initiatives with country of operation in Pakistan, that are funded by funder1
         },
         {
           name: "Afghanistan",
           value: 1
         },
         {
           name: "Australia",
           value: 1
         }
       ]
     },
     {
       id: "funder2",
       data: [
         {
           name: "Thailand",
           value: 2
         },
         {
           name: "Sudan",
           value: 1
         },
         {
           name: "Cambodia",
           value: 2
         }
       ]
     },
     {
       id: "funder3",
       data: [
         {
           name: "Nigeria",
           value: 2
         },
         {
           name: "India",
           value: 1
         },
         {
           name: "China",
           value: 1
         }
       ]
     },
     {
       id: "funder4",
       data: [
         {
           name: "India",
           value: 1
         },
         {
           name: "China",
           value: 1
         }
       ]
     }
    ]
   }
 }
]


//RELATIONSHIPS BETWEEN IMPLEMENTER AND number of INITIATIVES by initiative attribute
ImplementerInitiative: {
  //RELATIONSHIP 1 - Relationship between implementers filtered by profit motive, and number of initiatives by initiative attribute
  ProfitMotiveImplementerInitiative: {
    mainProgramActivity : [
      {
        id: "implementer1",
        data: [
          {
            name: "Scholarships",
            value: 1 //Number of initiatives of mainProgramActivity type "scholarship", that are implemented by implementer1, a profit motive based implementer
          },
          {
            name: "Contracting",
            value: 2
          }
        ]
      },
      {
        id: "implementer2",
        data: [
          {
            name: "Scholarships",
            value: 2
          },
          {
            name: "School Loans",
            value: 1
          },
          {
            name: "Contracting",
            value: 2
          }
        ]
      }
    ],
    countryOfOperation: [
      {
        id: "implementer1",
        data: [
          {
            name: "Canada",
            value: 3 //Number of initiatives with country of operation in Canada, that are implemented by implementer1
          },
          {
            name: "Spain",
            value: 2
          }
        ]
      },
      {
        id: "implementer2",
        data: [
          {
            name: "India",
            value: 2
          },
          {
            name: "Pakistan",
            value: 4
          },
          {
            name: "Iran",
            value: 3
          }
        ]
      }
    ]
  }
}
