import { JwtPayload } from "jsonwebtoken";

export interface ITokenPayload extends JwtPayload {
  uid: string
  username: string
}
export interface ITokensStatus {
  status: string,
  tokenA: string,
  tokenR: string,
  data: null | ITokenPayload
}