import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
});

const Token = mongoose.model("tokens", tokenSchema);
export default Token;
