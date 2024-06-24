export const SalariesDoc = {
    "/api/v1/salaries": {
      post: {
        tags: ["Salaries"],
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
                  job: {
                    type: "string",
                    example: "60c72b2f9b1d4b3c6d3b9b0e",
                    description: "job id",
                    required: true,
                  },
                  amount: {
                    type: "number",
                    example: 50,
                    description: "Amount expressed in dollars",
                    required: true,
                  },
                  employee: {
                    type: "array",
                    items: {
                        type: "string",
                        example: "60c72b2f9b1d4b3c6d3b9b0e",
                        description: "Employee ID: who are you setting salary to?",
                        required: true,
                    }
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Salary Grouping was created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    succes: true,
                    salary: {},
                  },
                },
              },
            },
          },
        },
      },
      get: {
        tags: ["Salaries"],
        security: [
          {
            token: [],
          },
        ],
        responses: {
          200: {
            description: "List of all Salaries",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    status: "success",
                    salaries: [],
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/salaries/{id}": {
      get: {
        tags: ["Salaries"],
        security: [
          {
            token: [],
          },
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Salaries entry ID",
            required: true,
            example: "60c72b2f9b1d4b3c6d3b9b0e",
          },
        ],
        responses: {
          200: {
            description: "Salary entry details fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    success: true,
                    salaries: [],
                  },
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Salaries"],
        security: [
          {
            token: [],
          },
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Salary entry ID",
            required: true,
            example: "60c72b2f9b1d4b3c6d3b9b0e",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                    job: {
                        type: "string",
                        example: "60c72b2f9b1d4b3c6d3b9b0e",
                        description: "job id",
                        required: true,
                    },
                        amount: {
                        type: "number",
                        example: 50,
                        description: "Amount expressed in dollars",
                        required: true,
                    },
                    employee: {
                        type: "array",
                        items: {
                            type: "string",
                            example: "60c72b2f9b1d4b3c6d3b9b0e",
                            description: "Employee ID: who are you setting salary to?",
                            required: true,
                        }
                    },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Salary Entry updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    status: "success",
                    salary: {},
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Salaries"],
        security: [
          {
            token: [],
          },
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Salary entry ID",
            required: true,
            example: "60c72b2f9b1d4b3c6d3b9b0e",
          },
        ],
        responses: {
          204: {
            description: "Salary Entry deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    status: "success",
                    message: "Salary entry was deleted successfully",
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  