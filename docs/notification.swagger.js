export const NotificationDoc = {
  "/api/v1/notifications": {
    post: {
      tags: ["Notification"],
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
                booking: {
                  type: "string",
                  example: "60c72b2f9b1d4b3c6d3b9b0e",
                  description: "Booking ID",
                  required: false,
                },
                message: {
                  type: "string",
                  example: "Your booking has been confirmed.",
                  description: "Notification message",
                  required: true,
                },
                title: {
                    type: "string",
                    example: "Confirmed Booking",
                    description: "Notification message",
                    required: true,
                },
                isread: {
                  type: "boolean",
                  example: false,
                  description: "Read status of the notification",
                  required: false,
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Notification created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  notification: {},
                },
              },
            },
          },
        },
      },
    },
    get: {
      tags: ["Notification"],
      security: [
        {
          token: [],
        },
      ],
      responses: {
        200: {
          description: "List of all notifications",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  notifications: [],
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/notifications/{id}": {
    get: {
      tags: ["Notification"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Notification ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        200: {
          description: "Notification details fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  notification: {},
                },
              },
            },
          },
        },
      },
    },
    patch: {
      tags: ["Notification"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Notification ID",
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
                booking: {
                  type: "string",
                  example: "60c72b2f9b1d4b3c6d3b9b0e",
                  description: "Booking ID",
                  required: false,
                },
                message: {
                  type: "string",
                  example: "Your booking has been confirmed.",
                  description: "Notification message",
                  required: false,
                },
                title: {
                    type: "string",
                    example: "Confirmed Booking",
                    description: "Notification message",
                    required: true,
                },
                isread: {
                  type: "boolean",
                  example: false,
                  description: "Read status of the notification",
                  required: false,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Notification updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  notification: {},
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Notification"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Notification ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        204: {
          description: "Notification deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  message: "Notification deleted",
                },
              },
            },
          },
        },
      },
    },
  },
};
