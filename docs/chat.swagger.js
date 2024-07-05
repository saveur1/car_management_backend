export const ChatDoc = {
  "/api/v1/chat": {
    post: {
      tags: ["Chat"],
      security: [
        {
          token: [],
        },
      ],
      summary: "Send a new chat message",
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                sender: {
                  type: "string",
                  description: "ID of the sender",
                  example: "6405a31a2ad56808f4925521",
                },
                receiver: {
                  type: "string",
                  description: "ID of the receiver",
                  example: "6405a31a2ad56808f4925522",
                },
                message: {
                  type: "string",
                  description: "Message content",
                  example: "Hello, how are you?",
                },
                attachments: {
                  type: "array",
                  items: {
                    type: "file",
                    example: "attachment.jpg",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Message sent successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "6405a31a2ad56808f4925523",
                      },
                      sender: {
                        type: "string",
                        example: "6405a31a2ad56808f4925521",
                      },
                      receiver: {
                        type: "string",
                        example: "6405a31a2ad56808f4925522",
                      },
                      message: {
                        type: "string",
                        example: "Hello, how are you?",
                      },
                      attachments: {
                        type: "array",
                        items: {
                          type: "file",
                          example: "attachment.jpg",
                        },
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-07-05T12:00:00.000Z",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    get: {
      tags: ["Chat"],
      security: [
        {
          token: [],
        },
      ],
      summary: "Get all chat messages",
      responses: {
        200: {
          description: "List of all chat messages",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      example: "6405a31a2ad56808f4925523",
                    },
                    sender: {
                      type: "string",
                      example: "6405a31a2ad56808f4925521",
                    },
                    receiver: {
                      type: "string",
                      example: "6405a31a2ad56808f4925522",
                    },
                    message: {
                      type: "string",
                      example: "Hello, how are you?",
                    },
                    attachments: {
                      type: "array",
                      items: {
                        type: "file",
                        example: "attachment.jpg",
                      },
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      example: "2024-07-05T12:00:00.000Z",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/chat/{id}": {
    get: {
      tags: ["Chat"],
      security: [
        {
          token: [],
        },
      ],
      summary: "Get chat message by ID",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
            example: "6405a31a2ad56808f4925523",
          },
          description: "ID of the chat message",
        },
      ],
      responses: {
        200: {
          description: "Chat message fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    example: "6405a31a2ad56808f4925523",
                  },
                  sender: {
                    type: "string",
                    example: "6405a31a2ad56808f4925521",
                  },
                  receiver: {
                    type: "string",
                    example: "6405a31a2ad56808f4925522",
                  },
                  message: {
                    type: "string",
                    example: "Hello, how are you?",
                  },
                  attachments: {
                    type: "array",
                    items: {
                      type: "file",
                      example: "attachment.jpg",
                    },
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2024-07-05T12:00:00.000Z",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Chat message not found",
        },
      },
    },
    put: {
      tags: ["Chat"],
      security: [
        {
          token: [],
        },
      ],
      summary: "Update chat message by ID",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
            example: "6405a31a2ad56808f4925523",
          },
          description: "ID of the chat message",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Updated message content",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Chat message updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "6405a31a2ad56808f4925523",
                      },
                      sender: {
                        type: "string",
                        example: "6405a31a2ad56808f4925521",
                      },
                      receiver: {
                        type: "string",
                        example: "6405a31a2ad56808f4925522",
                      },
                      message: {
                        type: "string",
                        example: "Updated message content",
                      },
                      attachments: {
                        type: "array",
                        items: {
                          type: "file",
                          example: "attachment.jpg",
                        },
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-07-05T12:00:00.000Z",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Chat message not found",
        },
      },
    },
    delete: {
      tags: ["Chat"],
      security: [
        {
          token: [],
        },
      ],
      summary: "Delete chat message by ID",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
            example: "6405a31a2ad56808f4925523",
          },
          description: "ID of the chat message",
        },
      ],
      responses: {
        200: {
          description: "Chat message deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "Chat message deleted",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Chat message not found",
        },
      },
    },
  },
};
