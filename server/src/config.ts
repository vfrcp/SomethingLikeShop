import { IConfig } from "./types";

export const config: IConfig = {
  serverInfo: {
    port: 5000,
  },
  admin: {
    accessKey: null,
    keyLifeTimeInMs: 3600000 //One hour
  },
  db: {
    dbLink: "mongodb+srv://admin:admin@cluster0.amz3m8x.mongodb.net/?retryWrites=true&w=majority",
    goodsPageAmount: 25
  }
}