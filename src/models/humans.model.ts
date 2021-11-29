import { model, Schema, Document } from "mongoose";
import { Human } from "@interfaces/humans.interface";

const humanSchema: Schema = new Schema({
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

const humanModel = model<Human & Document>("Human", humanSchema);

export default humanModel;
