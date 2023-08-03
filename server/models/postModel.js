import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  username: {
    type: String,
  },
  category: {
    type: String,
    required: false,
    default: "All",
  },
  createdDate: {
    type: Date,
  },
});

const post = mongoose.model("post", PostSchema);

export default post;
