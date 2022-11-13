import express from "express";
import cors from "cors";
import cookie from "cookie-parser";
import { connect } from "mongoose";
import { config } from "./config";

import wrongPageRoutes from "./routes/wrongRoute";
import adminRoutes from "./routes/admin";
import goodsRoutes from "./routes/goods";
import ordersRoutes from "./routes/orders";
import categoriesRoutes from "./routes/categories";

import { isAdminMiddleware } from "./middlewares/isAdmin";
import path from "path";

const App = express()

App.use(cors({
  origin: config.clientInfo.link,
  credentials: true,
  exposedHeaders: ["Authorization"],
  allowedHeaders: ["Authorization", "Content-type"]
}))
App.use(cookie())
App.use(express.json())
App.use("/images", express.static(path.join(__dirname, "images")))

App.use(isAdminMiddleware)
App.use("/admin", adminRoutes)
App.use("/goods", goodsRoutes)
App.use("/orders", ordersRoutes)
App.use("/categories", categoriesRoutes)
App.use("*", wrongPageRoutes)

const start = async () => {
  try {
    await connect(config.db.dbLink)
    App.listen(config.serverInfo.port, () => {
      console.log(`Server has been started in ${config.serverInfo.port}`)
    })
  }catch (err) {
    console.log(err)
  }
}
start()
