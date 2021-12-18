import { Request } from "@/interfaces/requests.interface";
export interface Human {
  _id: string;
  tokenId: string;
  owner: string;
  name: string;
  description: string;
  external_url: string;
  convertCount: number;
  profit: number;
  image: string;
  staked: boolean;
  manual: boolean;
  fee: string;
  balance: string;
  total: string;
  requests: [Request];
}
