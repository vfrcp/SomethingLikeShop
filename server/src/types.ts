declare global {
  namespace Express {
    interface Request {
      isAdmin?: boolean
    }
  }
}

export interface IConfig {
  serverInfo: {
    port: number
  }
  admin: {
    accessKey: string | null,
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