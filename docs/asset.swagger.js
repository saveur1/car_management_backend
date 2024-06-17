export const AssetDoc = {
  "/api/v1/assets": {
    post: {
      tags: ["Asset"],
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
                nameOfAsset: {
                  type: "string",
                  example: "Office Chair",
                  description: "Name of the asset",
                  required: true,
                },
                unities: {
                  type: "number",
                  example: "10",
                  description: "Number of unities",
                  required: true,
                },
                unityPrice: {
                  type: "number",
                  example: 150.0,
                  description: "Price per unity",
                  required: true,
                },
                UnityTotalPrice: {
                  type: "number",
                  example: 1500.0,
                  description: "Total price for all unities",
                  required: true,
                },
                description: {
                    type: "string",
                    example: "Computer arrived late.",
                    description: "Total price for all unities",
                    required: true,
                  },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Asset created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  asset: {},
                },
              },
            },
          },
        },
      },
    },
    get: {
      tags: ["Asset"],
      security: [
        {
          token: [],
        },
      ],
      responses: {
        200: {
          description: "List of all assets",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  assets: [],
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/assets/{id}": {
    get: {
      tags: ["Asset"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Asset ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        200: {
          description: "Asset details fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  asset: {},
                },
              },
            },
          },
        },
      },
    },
    patch: {
      tags: ["Asset"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Asset ID",
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
                nameOfAsset: {
                  type: "string",
                  example: "Office Chair",
                  description: "Name of the asset",
                  required: false,
                },
                unities: {
                  type: "string",
                  example: "10",
                  description: "Number of unities",
                  required: false,
                },
                unityPrice: {
                  type: "number",
                  example: 150.0,
                  description: "Price per unity",
                  required: false,
                },
                UnityTotalPrice: {
                  type: "number",
                  example: 1500.0,
                  description: "Total price for all unities",
                  required: false,
                },
                date: {
                  type: "string",
                  format: "date-time",
                  example: "2024-06-12T10:00:00Z",
                  description: "Date of the asset acquisition",
                  required: false,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Asset updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  asset: {},
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Asset"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Asset ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        204: {
          description: "Asset deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  message: "Asset was deleted successfully",
                },
              },
            },
          },
        },
      },
    },
  },
};
