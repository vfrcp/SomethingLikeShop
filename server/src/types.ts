declare global {
  namespace Express {
    interface Request {
      isAdmin?: boolean
      authData?: {username: string, uid: string}
    }
  }
}

export interface IConfig {
  serverInfo: {
    port: number
    secretA: string
    secretR: string
  }
  admin: {
    accessKey: string | null
    keyLifeTimeInMs: number
  }
  db: {
    dbLink: string
    goodsPageAmount: number 
  }
}

interface IResponseSuccess {
  status: "success"
  body: any
  message: null
}
interface IResponseWrong {
  status: "wrong"
  body: null
  message: string
}

export type IResponse = IResponseSuccess | IResponseWrong 