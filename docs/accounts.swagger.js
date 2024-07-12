export const AccountsDoc = {
    "/api/v1/accounts/link": {
      post: {
        tags: ["Accounts"],
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
                  type: {
                    type: "string",
                    example: "session type",
                    description: "type of the session",
                  },
                  userId: {
                    type: "string",
                    description: "Logged in user Id",
                    required: true,
                  },
                  provider: {
                    type: "string",
                  },
                  providerAccountId: {
                    type: "string",
                  },
                  refresh_token: {
                    type: "string",
                  },
                  access_token: {
                    type: "string",
                  },
                  expires_at: {
                    type: "number",
                  },
                  token_type: {
                    type: "string",
                  },
                  scope: {
                    type: "string",
                  },
                  id_token: {
                    type: "string",
                  },
                  session_state: {
                    type: "string",
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
    },
    "/api/v1/accounts/unlink": {
        post: {
            tags: ["Accounts"],
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
                      provider: {
                        type: "string",
                      },
                      providerAccountId: {
                        type: "string",
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
    }
}