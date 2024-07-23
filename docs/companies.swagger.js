export const CompanyDoc = {
    "/api/v1/companies": {
      post: {
        tags: ["Company"],
        security: [
          {
            token: [],
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  company_name: {
                    type: "string",
                    example: "Imbuto LTD",
                    description: "Name of the company",
                    required: true,
                  },
                  location: {
                    type: "string",
                    example: "50 kk 152 st",
                    description: "Location of the company",
                    required: true,
                  },
                  phone_number: {
                    type: "string",
                    example: "+250387383",
                    description: "Phone number of company",
                    required: true,
                  },
                  email: {
                    type: "string",
                    example: "example@example.com",
                    description: "Company's Email",
                    required: true,
                  },
                  website: {
                      type: "string",
                      example: "https://techspherelabs2.com",
                      description: "Company's website",
                      required: true,
                  },
                  description: {
                    type: "string",
                    required: true,
                    example: "Born 2020 and it's purpose is to insure food security.",
                    description: "Describe Company's reputation."
                  },
                  company_logo: {
                    type: "file",
                    required: true,
                    description: "Company logo",
                  }
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Company created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    status: "success",
                    company: {},
                  },
                },
              },
            },
          },
        },
      },
      get: {
        tags: ["Company"],
        security: [
          {
            token: [],
          },
        ],
        responses: {
          200: {
            description: "List of all companies",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    status: "success",
                    companies: [],
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/companies/{id}": {
      get: {
        tags: ["Company"],
        security: [
          {
            token: [],
          },
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Company ID",
            required: true,
            example: "60c72b2f9b1d4b3c6d3b9b0e",
          },
        ],
        responses: {
          200: {
            description: "Company details fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    status: "success",
                    company: {},
                  },
                },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Company"],
        security: [
          {
            token: [],
          },
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Company ID",
            required: true,
            example: "60c72b2f9b1d4b3c6d3b9b0e",
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                    company_name: {
                        type: "string",
                        example: "Imbuto LTD",
                        description: "Name of the company",
                        required: true,
                      },
                      location: {
                        type: "string",
                        example: "50 kk 152 st",
                        description: "Location of the company",
                        required: true,
                      },
                      phone_number: {
                        type: "string",
                        example: "+250387383",
                        description: "Phone number of company",
                        required: true,
                      },
                      email: {
                        type: "string",
                        example: "example@example.com",
                        description: "Company's Email",
                        required: true,
                      },
                      website: {
                          type: "string",
                          example: "https://techspherelabs2.com",
                          description: "Company's website",
                          required: true,
                      },
                      description: {
                        type: "string",
                        required: true,
                        example: "Born 2020 and it's purpose is to insure food security.",
                        description: "Describe Company's reputation."
                      },
                      company_logo: {
                        type: "file",
                        required: true,
                        description: "Company logo",
                      }
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "company updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    status: "success",
                    company: {},
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Company"],
        security: [
          {
            token: [],
          },
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Company ID",
            required: true,
            example: "60c72b2f9b1d4b3c6d3b9b0e",
          },
        ],
        responses: {
          204: {
            description: "Company deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    status: "success",
                    message: "Company was deleted successfully",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/companies/CEO": {
    post: {
      tags: ["Company"],
      security: [
        {
          token: [],
        },
      ],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                firstname: {
                    type: "string",
                    example: "John",
                    description: "First Name",
                    required: false,
                  },
                  lastname: {
                    type: "string",
                    example: "Doe",
                    description: "Last Name",
                    required: false,
                  },
                  phoneNumber: {
                    type: "string",
                    example: "+1234567890",
                    description: "Phone Number",
                    required: false,
                  },
                  username: {
                    type: "string",
                    example: "johndoe",
                    description: "Unique Username",
                    required: false,
                  },
                  email: {
                    type: "string",
                    example: "john.doe@example.com",
                    description: "Email Address",
                    required: false,
                  },
                  password: {
                      type: "string",
                      example: "User@123",
                      description: "Password",
                      required: true,
                  },
                  idNumber: {
                    type: "string",
                    example: "1234567890123456",
                    description: "ID Number (16 digits)",
                    required: false,
                  },
                  position: {
                    type: "string",
                    example: "manager",
                    description: "Position in the Company",
                    required: false,
                  },
                  address: {
                    type: "string",
                    example: "123 Main St",
                    description: "Address",
                    required: false,
                  },
                  startDate: {
                    type: "string",
                    format: "date",
                    example: "2023-01-01",
                    description: "Start Date",
                    required: false,
                  },
                  endingDate: {
                      type: "string",
                      format: "date",
                      example: "2023-01-01",
                      description: "Ending Date",
                      required: false,
                  },
                  jobType: {
                      type: "string",
                      enum: ["casual", "formal"],
                      example: "casual",
                      description: "Job type",
                      required: true,
                  },
                  description: {
                    type: "string",
                    example:
                      "Experienced manager with over 10 years in the industry.",
                    description: "Job Description",
                    required: false,
                  },
                  gender: {
                    type: "string",
                    enum: ["male", "female"],
                    description: "Gender",
                    required: false,
                  },
                  department: {
                    type: "string",
                    description: "Department",
                    required: false,
                  },
                  insurance: {
                    type: "string",
                    description: "Insurance Name",
                    required: false,
                  },
                  image: {
                    type: "string",
                    description: "Staff Image",
                    required: false,
                  },
                  grossSalary: { 
                      type: "string",
                      required: true,
                  },
                  accountNumber: {type:"string", required: false},
                  bankName: {type:"string", required: false},
                  bankClientName: {type:"string", required: false},
                  basicSalary: {type:"number", required: false},
                  transport: {type:"string", required: false},
                  taxablePay: {type:"number", required: false},
                  PAYE: {type:"number", required: false},
                  payForNSSF: {type:"number", required: false},
                  employeeNSSF: {type:"number", required: false},
                  companyNSSF: {type:"number", required: false},
                  NSSF: {type:"number", required: false},
                  employeeContributionOnML: {type:"number", required: false},
                  totalContributionOnML: {type:"number", required: false},
                  netBeforeDeductingCBHIS: {type:"number", required: false},
                  communityBasedHealthInsurance: {type:"number", required: false},
                  blockedSalary: {type:"number", required: false},
                  NetInRwf: {type:"number", required: false},
                  totalCost: {type:"number", required: false}
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Staff created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  staff: {},
                },
              },
            },
          },
        },
      },
    },
},
"/api/v1/companies/CEO/{companyID}": {
        get: {
            tags: ["Company"],
            security: [
              {
                token: [],
              },
            ],
            parameters: [
                {
                  in: "path",
                  name: "companyID",
                  description: "Company ID",
                  required: true,
                  example: "60c72b2f9b1d4b3c6d3b9b0e",
                },
            ],
            responses: {
              204: {
                description: "Company CEO fetched successfully",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      example: {
                        status: "success",
                        company: {}
                      },
                    },
                  },
                },
              },
            },
        },
    } 
};
  