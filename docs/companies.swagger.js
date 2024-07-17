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
  };
  