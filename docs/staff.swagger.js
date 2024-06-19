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
          "application/json": {
            schema: {
              type: "object",
              properties: {
                firstname: {
                  type: "string",
                  example: "John",
                  description: "First Name",
                  required: true,
                },
                lastname: {
                  type: "string",
                  example: "Doe",
                  description: "Last Name",
                  required: true,
                },
                phoneNumber: {
                  type: "string",
                  example: "+250734567890",
                  description: "Phone Number",
                  required: true,
                },
                username: {
                  type: "string",
                  example: "johndoe",
                  description: "Unique Username",
                  required: true,
                },
                email: {
                  type: "string",
                  example: "john.doe@example.com",
                  description: "Email Address",
                  required: true,
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
                  required: true,
                },
                position: {
                  type: "string",
                  example: "Manager",
                  description: "Position in the Company",
                  required: true,
                },
                location: {
                  type: "string",
                  example: "New York",
                  description: "Location",
                  required: true,
                },
                address: {
                  type: "string",
                  example: "123 Main St",
                  description: "Address",
                  required: true,
                },
                startDate: {
                  type: "string",
                  format: "date",
                  example: "2023-01-01",
                  description: "Start Date",
                  required: true,
                },
                endDate: {
                  type: "string",
                  format: "date",
                  example: "2024-01-01",
                  description: "End Date",
                  required: false,
                },
                description: {
                  type: "string",
                  example:
                    "Experienced manager with over 10 years in the industry.",
                  description: "Job Description",
                  required: false,
                },
                salary: {
                  type: "string",
                  example: "60000$",
                  description: "Salary",
                  required: true,
                },
                image: {
                  type: "string",
                  description: "Staff Image",
                  required: true,
                },
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
          "application/json": {
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
                  example: "Manager",
                  description: "Position in the Company",
                  required: false,
                },
                location: {
                  type: "string",
                  example: "New York",
                  description: "Location",
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
                endDate: {
                  type: "string",
                  format: "date",
                  example: "2024-01-01",
                  description: "End Date",
                  required: false,
                },
                description: {
                  type: "string",
                  example:
                    "Experienced manager with over 10 years in the industry.",
                  description: "Job Description",
                  required: false,
                },
                salary: {
                  type: "string",
                  example: "60000$",
                  description: "Salary",
                  required: false,
                },
                image: {
                  type: "string",
                  description: "Staff Image",
                  required: false,
                },
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
};
