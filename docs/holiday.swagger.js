export const HolidayDoc = {
  "/api/v1/holidays": {
    get: {
      tags: ["Holiday"],
      security: [
        {
          token: [],
        },
      ],
      responses: {
        200: {
          description: "List of all holidays",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  holidays: [],
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Holiday"],
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
                  example: "Vacation",
                  description: "Reason for the holiday",
                  required: true,
                },
                startDate: {
                  type: "string",
                  format: "date",
                  example: "2024-07-01",
                  description: "Start date of the holiday",
                  required: true,
                },
                endDate: {
                  type: "string",
                  format: "date",
                  example: "2024-07-15",
                  description: "End date of the holiday",
                  required: true,
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Holiday created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  holiday: {},
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/holidays/{id}": {
    patch: {
      tags: ["Holiday"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Holiday ID",
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
                  example: "Vacation",
                  description: "Reason for the holiday",
                  required: false,
                },
                startDate: {
                  type: "string",
                  format: "date",
                  example: "2024-07-01",
                  description: "Start date of the holiday",
                  required: false,
                },
                endDate: {
                  type: "string",
                  format: "date",
                  example: "2024-07-15",
                  description: "End date of the holiday",
                  required: false,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Holiday updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  holiday: {},
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Holiday"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Holiday ID",
          required: true,
          example: "60c72b2f9b1d4b3c6d3b9b0e",
        },
      ],
      responses: {
        204: {
          description: "Holiday deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  message: "Holiday deleted successfully",
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/holidays/staff/{staffId}": {
    get: {
      tags: ["Holiday"],
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
          description: "Holidays fetched by staff ID",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  holidays: [],
                },
              },
            },
          },
        },
        404: {
          description: "No holidays found for this staff",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: false,
                  message: "No holidays found for this staff",
                },
              },
            },
          },
        },
      },
    },
  },
};
