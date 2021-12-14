import { Bid } from "@interfaces/bids.interface";

export interface Auction {
  _id: string;
  tokenId: string;
  deadline: string;
  executed: boolean;
  bids: [Bid];
}
