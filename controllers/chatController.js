import asyncCatch from "../middlewares/asyncCatch.js";
import Chat from "../models/chatModel.js";
import cloudinary from "cloudinary";

// @desc    Create new chat message
// @route   POST /api/v1/chats
export const sendMessage = asyncCatch(async (req, res, next) => {
  const { sender, receiver, message } = req.body;
  let attachments = [];

  // Handle attachments with Cloudinary
  if (req.files) {
    const uploadPromises = req.files.map((file) =>
      cloudinary.v2.uploader.upload(file.path, {
        folder: "attachments",
        unique_filename: false,
        use_filename: true,
      })
    );
    const results = await Promise.all(uploadPromises);
    attachments = results.map((result) => result.secure_url);
  }

  const newChat = await Chat.create({
    sender,
    receiver,
    message,
    attachments,
  });

  const chat = await Chat.findById(newChat._id).populate("sender receiver");

  res.status(201).json({
    success: true,
    chat,
  });
});

// @desc    Get all chat messages
// @route   GET /api/v1/chats
export const getAllChats = asyncCatch(async (req, res, next) => {
  const chats = await Chat.find()
    .sort({ createdAt: -1 })
    .populate("sender receiver");

  res.status(200).json({
    success: true,
    count: chats.length,
    data: chats,
  });
});

// @desc    Get chat by ID
// @route   GET /api/v1/chats/:id
export const getChatById = asyncCatch(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id).populate("sender receiver");

  if (!chat) {
    return res.status(404).json({
      success: false,
      message: "Chat not found",
    });
  }

  res.status(200).json({
    success: true,
    data: chat,
  });
});

// @desc    Update chat message
// @route   PUT /api/v1/chats/:id
export const updateChat = asyncCatch(async (req, res, next) => {
  const { message } = req.body;

  let chat = await Chat.findById(req.params.id);

  if (!chat) {
    return res.status(404).json({
      success: false,
      message: "Chat not found",
    });
  }

  chat.message = message;
  chat = await chat.save();

  res.status(200).json({
    success: true,
    data: chat,
  });
});

// @desc    Delete chat message
// @route   DELETE /api/v1/chats/:id
export const deleteChat = asyncCatch(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return res.status(404).json({
      success: false,
      message: "Chat not found",
    });
  }

  await chat.remove();

  res.status(200).json({
    success: true,
    message: "Chat deleted",
  });
});
