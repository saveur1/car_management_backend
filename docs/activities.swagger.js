export const ActivitiesDoc = {
  "/api/v1/activities": {
    post: {
        tags: ["Activities"],
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
                  activityName: {
                    type: "string",
                    example: "Cleaning Chair",
                    description: "Activity Title",
                    required: true,
                  },
                  staff: {
                    type: "string",
                    example: "60c72b2f9b1d4b3c6d3b9b0e",
                    description: "Staff who added this activity",
                    required: true,
                  },
                  date: {
                    type: "date",
                    example: String(new Date()),
                    description: "Date of activity",
                    required: true,
                  },
                  status: {
                      type: "string",
                      enum: ["Incoming", "Live", "Completed", "Cancelled"],
                      description: "Activity status",
                      required: true,
                  },
                  description: {
                    type: "string",
                    required: false,
                    description: "Activity description",
                  }
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
      tags: ["Activities"],
      security: [
        {
          token: [],
        },
      ],
      responses: {
        200: {
          description: "List of all activities",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  activities: [],
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/activities/staff/{staffId}": {
    get: {
      tags: ["Activities"],
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
          description: "Activities fetched by staff ID",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  activities: [],
                },
              },
            },
          },
        },
        404: {
          description: "No activities found for this staff",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: false,
                  message: "No activities found for this staff",
                },
              },
            },
          },
        },
      },
    },
  },
};
