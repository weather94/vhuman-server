import { Bid } from "@interfaces/bids.interface";
import { StringMap } from "ts-jest/dist/types";

export interface Auction {
  _id: string;
  tokenId: string;
  deadline: string;
  executed: boolean;
  bids: [Bid];
}
