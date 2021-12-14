import { Human } from "@/interfaces/humans.interface";

export interface Account {
  address: string;
  balance: string;
  humans: [Human];
}
