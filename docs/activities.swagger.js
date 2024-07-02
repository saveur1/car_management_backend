export const ActivitiesDoc = {
  "/api/v1/activities": {
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
