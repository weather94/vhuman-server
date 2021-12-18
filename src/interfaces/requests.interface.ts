export interface Request {
  requestId: string;
  client: string;
  converter: string;
  sourceUri: string;
  target: string;
  resultUri: string;
  status: string;
  time: string;
  allowed: boolean;
}
