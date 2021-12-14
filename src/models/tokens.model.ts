import { model, Schema, Document } from "mongoose";
import { Token } from "@interfaces/tokens.interface";

const tokenSchema: Schema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  external_url: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const tokenModel = model<Token & Document>("Token", tokenSchema);

export default tokenModel;
