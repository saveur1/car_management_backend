export const CarToolDoc = {
  "/api/v1/car-tools": {
    post: {
      tags: ["Car Tool"],
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
                nameOfTool: {
                  type: "string",
                  example: "Wrench",
                  description: "Name of the tool",
                  required: true,
                },
                toolsBrand: {
                  type: "string",
                  example: "Craftsman",
                  description: "Brand of the tool",
                  required: true,
                },
                modelNumber: {
                  type: "string",
                  example: "CMHT65011",
                  description: "Model number of the tool",
                  required: true,
                },
                serialNumber: {
                  type: "string",
                  example: "SN12345678",
                  description: "Serial number of the tool",
                  required: true,
                  uniques: true,
                },
                toolsCategory: {
                  type: "string",
                  example: "Hand Tools",
                  description: "Category of the tool",
                  required: true,
                },
                purchaseDate: {
                  type: "string",
                  format: "date-time",
                  example: "2024-06-15T10:00:00Z",
                  description: "Purchase date of the tool",
                  required: true,
                },
                description: {
                  type: "string",
                  example:"made in metal",
                  description: "description of the tool",
                  required: true,
                },
                quantity: {
                  type: "number",
                  example: 10,
                  description: "Quantity of the tool",
                  required: true,
                },
                pricePerUnity: {
                  type: "number",
                  example: 2.6,
                  description: "Price per unity of the tool",
                  required: true,
                },
                totalPrice: {
                  type: "number",
                  example: 26.0,
                  description: "Total price of the tool",
                  required: true,
                },
                photo: {
                  type: "file",
                  description: "Photo URL of the tool",
                  required: true,
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Car tool created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  carTool: {},
                },
              },
            },
          },
        },
      },
    },
    get: {
      tags: ["Car Tool"],
      security: [
        {
          token: [],
        },
      ],
      responses: {
        200: {
          description: "List of all car tools",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  carTools: [],
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/car-tools/{id}": {
    get: {
      tags: ["Car Tool"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Car tool entry ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        200: {
          description: "Car tool entry details fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  carTool: {},
                },
              },
            },
          },
        },
      },
    },
    patch: {
      tags: ["Car Tool"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Car tool entry ID",
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
                nameOfTool: {
                  type: "string",
                  example: "Wrench",
                  description: "Name of the tool",
                  required: false,
                },
                toolsBrand: {
                  type: "string",
                  example: "Craftsman",
                  description: "Brand of the tool",
                  required: false,
                },
                modelNumber: {
                  type: "string",
                  example: "CMHT65011",
                  description: "Model number of the tool",
                  required: false,
                },
                serialNumber: {
                  type: "string",
                  example: "SN12345678",
                  description: "Serial number of the tool",
                  required: false,
                  unique: true,
                },
                toolsCategory: {
                  type: "string",
                  example: "Hand Tools",
                  description: "Category of the tool",
                  required: false,
                },
                purchaseDate: {
                  type: "string",
                  format: "date-time",
                  example: "2024-06-15T10:00:00Z",
                  description: "Purchase date of the tool",
                  required: false,
                },
                purchasePrice: {
                  type: "number",
                  example: 25.99,
                  description: "Purchase price of the tool",
                  required: false,
                },
                quantity: {
                  type: "number",
                  example: 10,
                  description: "Quantity of the tool",
                  required: false,
                },
                pricePerUnity: {
                  type: "number",
                  example: 2.6,
                  description: "Price per unity of the tool",
                  required: false,
                },
                totalPrice: {
                  type: "number",
                  example: 26.0,
                  description: "Total price of the tool",
                  required: false,
                },
                photo: {
                  type: "string",
                  example: "https://example.com/photo.jpg",
                  description: "Photo URL of the tool",
                  required: false,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Car tool entry updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  carTool: {},
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Car Tool"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Car tool entry ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        204: {
          description: "Car tool entry deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  message: "Car tool entry was deleted successfully",
                },
              },
            },
          },
        },
      },
    },
  },
};
