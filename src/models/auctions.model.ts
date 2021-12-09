import { model, Schema, Document } from "mongoose";
import { Auction } from "@interfaces/auctions.interface";

const bidSchema: Schema = new Schema({
  bidder: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const auctionSchema: Schema = new Schema({
  tokenId: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  executed: {
    type: Boolean,
    required: true,
  },
  bids: {
    type: [bidSchema],
  },
});

const auctionModel = model<Auction & Document>("Auction", auctionSchema);

export default auctionModel;
