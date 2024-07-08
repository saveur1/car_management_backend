export const SessionsDoc = {
    "/api/v1/sessions": {
      post: {
        tags: ["Sessions"],
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
                  sessionToken: {
                    type: "string",
                    example: "session token",
                    description: "Token of the session",
                    required: true,
                  },
                  userId: {
                    type: "string",
                    description: "Logged in user Id",
                    required: true,
                  },
                  expires: {
                    type: "string",
                    example: String(new Date()),
                    description: "expires time",
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
}