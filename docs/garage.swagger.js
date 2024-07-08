export const GarageDoc = {
  "/api/v1/garages": {
    post: {
      tags: ["Garage"],
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
                employee: {
                  type: "string",
                  example: "60c72b2f9b1d4b3c6d3b9b0e",
                  description: "Employee ID",
                  required: true,
                },
                car: {
                  type: "string",
                  example: "90c72b2f9b1d4b8c6d3b9b0f",
                  description: "Car ID",
                  required: true,
                },
                garageName: {
                  type: "string",
                  example: "Main Street Garage",
                  description: "Name of the garage",
                  required: true,
                },
                amount: {
                  type: "number",
                  example: 200,
                  description: "Amount charged",
                  required: true,
                },
                description: {
                  type: "string",
                  example: "Routine maintenance",
                  description: "Description of the service",
                  required: false,
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Garage entry created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  garage: {},
                },
              },
            },
          },
        },
      },
    },
    get: {
      tags: ["Garage"],
      security: [
        {
          token: [],
        },
      ],
      responses: {
        200: {
          description: "List of all garage entries",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  garage: [],
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/garages/{id}": {
    get: {
      tags: ["Garage"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Garage entry ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        200: {
          description: "Garage entry details fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  garage: {},
                },
              },
            },
          },
        },
      },
    },
    put: {
      tags: ["Garage"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Garage entry ID",
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
                employee: {
                  type: "string",
                  example: "60c72b2f9b1d4b3c6d3b9b0e",
                  description: "Employee ID",
                  required: false,
                },
                car: {
                  type: "string",
                  example: "90c72b2f9b1d4b8c6d3b9b0f",
                  description: "Car ID",
                  required: false,
                },
                garageName: {
                  type: "string",
                  example: "Main Street Garage",
                  description: "Name of the garage",
                  required: false,
                },
                amount: {
                  type: "string",
                  example: "200$",
                  description: "Amount charged",
                  required: false,
                },
                description: {
                  type: "string",
                  example: "Routine maintenance",
                  description: "Description of the service",
                  required: false,
                },
                Date: {
                  type: "string",
                  format: "date-time",
                  example: "2024-05-30T09:00:00Z",
                  description: "Date of service",
                  required: false,
                },
                image: {
                  type: "string",
                  description: "Image URL of the service",
                  required: false,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Garage entry updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  garage: {},
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Garage"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Garage entry ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        200: {
          description: "Garage entry deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  message: "Garage entry deleted",
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/garages/car/{carId}": {
    get: {
      tags: ["Garage"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "carId",
          description: "car ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        200: {
          description: "Garage entries fetched by car ID",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  garage: [],
                },
              },
            },
          },
        },
      },
    },
  },
  
};
