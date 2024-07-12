export const StaffDoc = {
  "/api/v1/staff": {
    post: {
      tags: ["Staff"],
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
    get: {
      tags: ["Staff"],
      security: [
        {
          token: [],
        },
      ],
      responses: {
        200: {
          description: "List of all staff",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  staff: [],
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/staff/{id}": {
    get: {
      tags: ["Staff"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Staff ID",
          required: true,
          example: "6405a31a2ad56808f4925521",
        },
      ],
      responses: {
        200: {
          description: "Staff details fetched successfully",
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
    "/api/v1/staff/email": {
    get: {
      tags: ["Staff"],
      security: [
        {
          token: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "John@gmail.com",
                  description: "Email address",
                  required: true,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Staff details fetched successfully",
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
     }
    },
    put: {
      tags: ["Staff"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Staff ID",
          required: true,
          example: "6405a31a2ad56808f4925521",
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
        200: {
          description: "Staff updated successfully",
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
    delete: {
      tags: ["Staff"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Staff ID",
          required: true,
          example: "6405a31a2ad56808f4925521",
        },
      ],
      responses: {
        200: {
          description: "Staff deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  message: "Staff deleted",
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/staff/position/{position}": {
    get: {
      tags: ["Staff"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "position",
          description: "Staff Position",
          required: true,
          example: "Manager",
        },
      ],
      responses: {
        200: {
          description: "Staff fetched by position",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  staff: [],
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/staff/jobtype/{jobtype}": {
    get: {
      tags: ["Staff"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "jobtype",
          description: "Staff job type: casual | formal",
          required: true,
          example: "casual",
        },
      ],
      responses: {
        200: {
          description: "Staff fetched by job type",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  staff: [],
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/staff/profile": {
    get: {
      tags: ["Staff"],
      security: [
        {
          token: [],
        },
      ],
      responses: {
        200: {
          description: "Staff Profile fetched for user who has authenticated",
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
};
