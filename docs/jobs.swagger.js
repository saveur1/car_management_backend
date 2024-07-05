export const JobsDoc = {
    "/api/v1/jobs": {
      post: {
        tags: ["Jobs"],
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
                  job_title: {
                    type: "string",
                    example: "Manager",
                    description: "Enter Job Title",
                    required: true,
                  },
                  skills: {
                    type: "string",
                    example: "Management, Leadership and Self Dependent",
                    description: "what are required skills for this position?",
                    required: true,
                  },
                  allowDelete: {
                    type: "boolean",
                    description: "Allow delete permission",
                    example: true,
                    required: true,
                  },
                  allowEdit: {
                    type: "boolean",
                    description: "Allow edit permission",
                    example: true,
                    required: true,
                  },
                  allowAdd: {
                    type: "boolean",
                    description: "Allow add permission",
                    example: true,
                    required: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Job Position was created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    succes: true,
                    job: {},
                  },
                },
              },
            },
          },
        },
      },
      get: {
        tags: ["Jobs"],
        security: [
          {
            token: [],
          },
        ],
        responses: {
          200: {
            description: "List of all Jobs",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    status: "success",
                    jobs: [],
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/jobs/{id}": {
      get: {
        tags: ["Jobs"],
        security: [
          {
            token: [],
          },
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Jobs entry ID",
            required: true,
            example: "60c72b2f9b1d4b3c6d3b9b0e",
          },
        ],
        responses: {
          200: {
            description: "Job details fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    success: true,
                    jobs: [],
                  },
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Jobs"],
        security: [
          {
            token: [],
          },
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Job entry ID",
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
                    job_title: {
                        type: "string",
                        example: "Manager",
                        description: "Enter Job Title",
                        required: true,
                      },
                      skills: {
                        type: "string",
                        example: "Management, Leadership and Self Dependent",
                        description: "what are required skills for this position?",
                        required: true,
                      },
                      allowDelete: {
                        type: "boolean",
                        description: "Allow delete permission",
                        example: true,
                        required: true,
                      },
                      allowEdit: {
                        type: "boolean",
                        description: "Allow edit permission",
                        example: true,
                        required: true,
                      },
                      allowAdd: {
                        type: "boolean",
                        description: "Allow add permission",
                        example: true,
                        required: true,
                      },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Job Entry updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    status: "success",
                    job: {},
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Jobs"],
        security: [
          {
            token: [],
          },
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Job entry ID",
            required: true,
            example: "60c72b2f9b1d4b3c6d3b9b0e",
          },
        ],
        responses: {
          204: {
            description: "Job Entry deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    status: "success",
                    message: "Job entry was deleted successfully",
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  