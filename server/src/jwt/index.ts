import JWT from "jsonwebtoken";
import { config } from "../config";
import { ITokenPayload, ITokensStatus } from "./types";

export class Tokens {
  static create(payload: ITokenPayload) {
    // TODO: сделать жизнь токена больше
    return {
      tokenA: JWT.sign(payload, config.serverInfo.secretR, {
        expiresIn: "30 days"
      }),
      tokenR: JWT.sign(payload, config.serverInfo.secretA, {
        expiresIn: 10
      })
    }
  }
  static _isEqual (tokenAData: ITokenPayload, tokenRData: ITokenPayload) {
    try{
      if(
        tokenAData.username === tokenRData.username &&
        tokenAData.uid === tokenRData.uid
        ) {
        return true
      }else throw "The tokens is different"
    }catch (err) {
      return false
    }
  }
  static check(tokenA: string, tokenR: string) {
    try{
      const tokensStatus: ITokensStatus = {
        status: "normal",
        tokenA,
        tokenR,
        data: null
      }
      // Если токен не валидный, верифай бросает ошибку
      const tokenRData = JWT.verify(tokenR, config.serverInfo.secretA) as ITokenPayload
      const tokenAData = JWT.verify(tokenA, config.serverInfo.secretR) as ITokenPayload
      if(!this._isEqual(tokenAData, tokenRData)) {
        tokensStatus.status = "invalid"
      }else {
        tokensStatus.data = tokenAData
      }
      return tokensStatus
    }catch (err) {
      const tokensStatus: ITokensStatus = {
        status: "expired",
        tokenA,
        tokenR,
        data: null
      }
      let tokenRData: ITokenPayload
      try{
        tokenRData = JWT.verify(tokenR, config.serverInfo.secretR) as ITokenPayload
      }catch (err) {
        tokensStatus.status = "fullExpiresOrMissing"
        return tokensStatus
      }
      const tokenAData = JWT.decode(tokenA) as ITokenPayload | null
      if(!tokenAData || !this._isEqual(tokenAData, tokenRData)) tokensStatus.status = "invalid"
      else if(tokenAData) tokensStatus.data = tokenAData
      return tokensStatus
    }
  }
}