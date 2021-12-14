import { model, Schema, Document } from "mongoose";
import { Human } from "@interfaces/humans.interface";

const requestSchema: Schema = new Schema({
  client: {
    type: String,
    required: true,
  },
  converter: {
    type: String,
    required: true,
  },
  sourceUri: {
    type: String,
    required: true,
  },
  target: {
    type: String,
  },
  resultUri: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const humanSchema: Schema = new Schema({
  tokenId: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  external_url: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  staked: {
    type: Boolean,
  },
  manual: {
    type: Boolean,
  },
  fee: {
    type: String,
  },
  balance: {
    type: String,
  },
  requests: {
    type: [requestSchema],
  },
});

const humanModel = model<Human & Document>("Human", humanSchema);

export default humanModel;
