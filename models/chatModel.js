import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", 
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", 
      required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        default: "66965043ad17b5897e2f6ec9"
    },
    message: {
      type: String,
      required: false,
    },
    attachments: [{ 
        type: String,
        required: false
     }],
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
