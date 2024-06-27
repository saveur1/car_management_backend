export const FuelDoc = {
  "/api/v1/fuels": {
    post: {
      tags: ["Fuel"],
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
                liter: {
                  type: "number",
                  example: 50,
                  description: "Amount of fuel in liters",
                  required: true,
                },
                totalCost: {
                  type: "number",
                  example: 100,
                  description: "Total cost of the fuel",
                  required: true,
                },
                costPerLiter: {
                  type: "number",
                  example: 2,
                  description: "Cost per liter of fuel",
                  required: true,
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Fuel entry created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  fuel: {},
                },
              },
            },
          },
        },
      },
    },
    get: {
      tags: ["Fuel"],
      security: [
        {
          token: [],
        },
      ],
      responses: {
        200: {
          description: "List of all fuel entries",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  fuels: [],
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/fuels/{id}": {
    get: {
      tags: ["Fuel"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Fuel entry ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        200: {
          description: "Fuel entry details fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  fuel: {},
                },
              },
            },
          },
        },
      },
    },
    put: {
      tags: ["Fuel"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Fuel entry ID",
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
                little: {
                  type: "string",
                  example: "50",
                  description: "Amount of fuel in liters",
                  required: false,
                },
                totalCost: {
                  type: "string",
                  example: "100$",
                  description: "Total cost of the fuel",
                  required: false,
                },
                costPerLitre: {
                  type: "string",
                  example: "2$",
                  description: "Cost per liter of fuel",
                  required: false,
                },
                date: {
                  type: "string",
                  format: "date-time",
                  example: "2024-05-30T09:00:00Z",
                  description: "Date of fuel purchase",
                  required: false,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Fuel entry updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  fuel: {},
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Fuel"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Fuel entry ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        200: {
          description: "Fuel entry deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  message: "Fuel entry deleted",
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/fuels/employee/{employeeId}": {
    get: {
      tags: ["Fuel"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "employeeId",
          description: "Employee ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        200: {
          description: "Fuel entries fetched by employee ID",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  fuels: [],
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/fuels/car/{carId}": {
    get: {
      tags: ["Fuel"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "carId",
          description: "Car ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        200: {
          description: "Fuel entries fetched by Car ID",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  fuels: [],
                },
              },
            },
          },
        },
      },
    },
  },
 
};
