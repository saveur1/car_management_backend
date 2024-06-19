export const BookingDoc = {
  "/api/v1/bookings": {
    post: {
      tags: ["Booking"],
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
                customer: {
                  type: "string",
                  example: "60c72b2f9b1d4b3c6d3b9b0e",
                  description: "Customer Id",
                  required: true,
                },
                car: {
                  type: "string",
                  example: "90c72b2f9b1d4b8c6d3b9b0f",
                  description: "Car ID",
                  required: true,
                },
                pickUpDate: {
                  type: "string",
                  format: "date-time",
                  example: "2024-06-01T10:00:00Z",
                  description: "Pick-up date",
                  required: true,
                },
                returnDate: {
                  type: "string",
                  format: "date-time",
                  example: "2024-06-10T10:00:00Z",
                  description: "Return date",
                  required: true,
                },
                cost: {
                  type: "number",
                  example: 150,
                  description: "Cost of the booking",
                  required: true,
                },
                additionalComment: {
                  type: "string",
                  example: "Please provide a baby seat.",
                  description: "Additional comments",
                },
                bookingStatus: {
                  type: "string",
                  enum: ["confirm", "pending", "cancelled","expired","completed"],
                  example: "pending",
                  description: "Booking status",
                  required: true,
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Booking created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  data: {
                    booking: {
                      _id: "60c72b2f9b1d4b3c6d3b9b0e",
                      customerName: "John Doe",
                      carPlateNumber: "ABC1234",
                      pickUpDate: "2024-06-01T10:00:00Z",
                      returnDate: "2024-06-10T10:00:00Z",
                      cost: 150,
                      additionalComment: "Please provide a baby seat.",
                      bookingStatus: "pending",
                      createdAt: "2024-05-01T10:00:00Z",
                      updatedAt: "2024-05-01T10:00:00Z",
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
      tags: ["Booking"],
      security: [
        {
          token: [],
        },
      ],
      responses: {
        200: {
          description: "Get all bookings",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  data: {
                    bookings: [
                      {
                        _id: "60c72b2f9b1d4b3c6d3b9b0e",
                        customerName: "John Doe",
                        carPlateNumber: "ABC1234",
                        pickUpDate: "2024-06-01T10:00:00Z",
                        returnDate: "2024-06-10T10:00:00Z",
                        cost: 150,
                        additionalComment: "Please provide a baby seat.",
                        bookingStatus: "pending",
                        createdAt: "2024-05-01T10:00:00Z",
                        updatedAt: "2024-05-01T10:00:00Z",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/bookings/{id}": {
    get: {
      tags: ["Booking"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID of the booking",
          required: true,
          schema: {
            type: "string",
            example: "60c72b2f9b1d4b3c6d3b9b0e",
          },
        },
      ],
      responses: {
        200: {
          description: "Get booking by ID",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  data: {
                    booking: {
                      _id: "60c72b2f9b1d4b3c6d3b9b0e",
                      customerName: "John Doe",
                      carPlateNumber: "ABC1234",
                      pickUpDate: "2024-06-01T10:00:00Z",
                      returnDate: "2024-06-10T10:00:00Z",
                      cost: 150,
                      additionalComment: "Please provide a baby seat.",
                      bookingStatus: "pending",
                      createdAt: "2024-05-01T10:00:00Z",
                      updatedAt: "2024-05-01T10:00:00Z",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    patch: {
      tags: ["Booking"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID of the booking",
          required: true,
          schema: {
            type: "string",
            example: "60c72b2f9b1d4b3c6d3b9b0e",
          },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                customer: {
                    type: "string",
                    example: "60c72b2f9b1d4b3c6d3b9b0e",
                    description: "Customer Id",
                    required: true,
                },
                car: {
                    type: "string",
                    example: "90c72b2f9b1d4b8c6d3b9b0f",
                    description: "Car ID",
                    required: true,
                },
                pickUpDate: {
                  type: "string",
                  format: "date-time",
                  example: "2024-06-01T10:00:00Z",
                  description: "Pick-up date",
                },
                returnDate: {
                  type: "string",
                  format: "date-time",
                  example: "2024-06-10T10:00:00Z",
                  description: "Return date",
                },
                cost: {
                  type: "number",
                  example: 150,
                  description: "Cost of the booking",
                },
                additionalComment: {
                  type: "string",
                  example: "Please provide a baby seat.",
                  description: "Additional comments",
                },
                bookingStatus: {
                  type: "string",
                  enum: ["confirm", "pending", "cancelled","expired","completed"],
                  example: "pending",
                  description: "Booking status",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Booking updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  data: {
                    booking: {
                      _id: "60c72b2f9b1d4b3c6d3b9b0e",
                      customerName: "John Doe",
                      carPlateNumber: "ABC1234",
                      pickUpDate: "2024-06-01T10:00:00Z",
                      returnDate: "2024-06-10T10:00:00Z",
                      cost: 150,
                      additionalComment: "Please provide a baby seat.",
                      bookingStatus: "confirm",
                      createdAt: "2024-05-01T10:00:00Z",
                      updatedAt: "2024-05-01T10:00:00Z",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Booking"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID of the booking",
          required: true,
          schema: {
            type: "string",
            example: "60c72b2f9b1d4b3c6d3b9b0e",
          },
        },
      ],
      responses: {
        204: {
          description: "Booking deleted successfully",
        },
      },
    },
  },
  "/api/v1/bookings/status/{status}": {
    get: {
      tags: ["Booking"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "status",
          description: "Booking status",
          required: true,
          schema: {
            type: "string",
            enum: ["confirm", "pending", "canceled"],
            example: "pending",
          },
        },
      ],
      responses: {
        200: {
          description: "Get bookings by status",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  data: {
                    bookings: [
                      {
                        _id: "60c72b2f9b1d4b3c6d3b9b0e",
                        customerName: "John Doe",
                        carPlateNumber: "ABC1234",
                        pickUpDate: "2024-06-01T10:00:00Z",
                        returnDate: "2024-06-10T10:00:00Z",
                        cost: 150,
                        additionalComment: "Please provide a baby seat.",
                        bookingStatus: "pending",
                        createdAt: "2024-05-01T10:00:00Z",
                        updatedAt: "2024-05-01T10:00:00Z",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/bookings/customer/{customerID}": {
    get: {
      tags: ["Booking"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "customerID",
          description: "All bookings ordered by customer",
          required: true,
        },
      ],
      responses: {
        200: {
          description: "Get bookings by customer ID",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  bookings: [
                    {
                      _id: "60c72b2f9b1d4b3c6d3b9b0e",
                      customerName: "John Doe",
                      carPlateNumber: "ABC1234",
                      pickUpDate: "2024-06-01T10:00:00Z",
                      returnDate: "2024-06-10T10:00:00Z",
                      cost: 150,
                      additionalComment: "Please provide a baby seat.",
                      bookingStatus: "pending",
                      createdAt: "2024-05-01T10:00:00Z",
                      updatedAt: "2024-05-01T10:00:00Z",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/bookings/car/{carID}": {
    get: {
      tags: ["Booking"],
      security: [
        {
          token: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "carID",
          description: "All bookings for particular car",
          required: true,
        },
      ],
      responses: {
        200: {
          description: "Get bookings by particular car",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "success",
                  bookings: [
                    {
                      _id: "60c72b2f9b1d4b3c6d3b9b0e",
                      customerName: "John Doe",
                      carPlateNumber: "ABC1234",
                      pickUpDate: "2024-06-01T10:00:00Z",
                      returnDate: "2024-06-10T10:00:00Z",
                      cost: 150,
                      additionalComment: "Please provide a baby seat.",
                      bookingStatus: "pending",
                      createdAt: "2024-05-01T10:00:00Z",
                      updatedAt: "2024-05-01T10:00:00Z",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
};
