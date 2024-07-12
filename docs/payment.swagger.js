export const PaymentDoc = {
  "/api/v1/payment": {
    post: {
      tags: ["Payment"],
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
                staff: {
                  type: "string",
                  example: "60c72b2f9b1d4b3c6d3b9b0e",
                  description: "Staff ID",
                  required: true,
                },
                reason: {
                  type: "string",
                  example: "driving customer",
                  description: "Reason for payment",
                  required: true,
                },
                amount: {
                  type: "number",
                  example: 10000,
                },
                paymentMethod: {
                  type: "string",
                  example: "Visa",
                },

                accountNumber: {
                  type: "number",
                  example: 34567890345678,
                },
                paymentDate: {
                  type: "date",
                  example: "2022-01-01",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Payment created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  payment: {},
                },
              },
            },
          },
        },
      },
    },
    get: {
      tags: ["Payment"],
      security: [
        {
          token: [],
        },
      ],
      responses: {
        200: {
          description: "List of all payments",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  payments: [],
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/payment/{paymentId}": {
    get: {
      tags: ["Payment"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Payment entry ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        200: {
          description: "Payment details fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  payment: {},
                },
              },
            },
          },
        },
      },
    },
    patch: {
      tags: ["Payment"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "paymentId",
          description: "Payment entry ID",
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
                staff: {
                  type: "string",
                  example: "60c72b2f9b1d4b3c6d3b9b0e",
                  description: "Staff ID",
                  required: false,
                },
                reason: {
                  type: "string",
                  required: false,
                },
                amount: { type: "number", required: false },
                paymentMethod: { type: "string", required: false },
                accountNumber: { type: "number", required: false },
                paymentDate: { type: "date", required: false },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Payment updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  payment: {},
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Payment"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "paymentId",
          description: "Payment entry ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        204: {
          description: "Payment deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/payment/staff/{staffId}": {
    get: {
      tags: ["Payment"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "staffId",
          description: "Staff ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        200: {
          description: "List of payments made by a staff member",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  payments: [],
                },
              },
            },
          },
        },
        404: {
          description: "No payment for this staff",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: false,
                  message: "No payment for this staff",
                },
              },
            },
          },
        },
      },
    },
  },
};
