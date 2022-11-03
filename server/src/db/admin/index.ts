import { hash, compare } from "bcrypt";
import { v4 as createId } from "uuid";
import { config } from "../../config";
import { generateWrongResponse } from "../../funcs";
import { IResponse } from "../../types";
import { UserModel } from "../modelsAndSchemas";

export class Admin {
  static async isAdminExist(): Promise<IResponse> {
    try {
      const admin = await UserModel.findOne({username: "admin"})
      return {status: "success", body: !!admin, message: null}
    }catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async register({password, email}: {password: string, email: string}): Promise<IResponse> {
    try {
      const adminFromDb = await UserModel.findOne({username: "admin"})
      if(adminFromDb) throw "Админ уже зарегистрирован"
      const hashedPassword = await hash(password, 10)
      const _id = createId()
      const admin = new UserModel({username: "admin", password: hashedPassword, email, _id})
      await admin.save()
      return {status: "success", body: null, message: null}
    }catch (err) {
      return generateWrongResponse(err)
    }
  }

  static async login({password, email}: {password: string, email: string}): Promise<IResponse> {
    try{
      const admin = await UserModel.findOne({username: "admin"})
      if(!admin) throw "Админ не найден, добавьте его в базу данных"
      const comparedPassword = await compare(password, admin.password)
      if(!comparedPassword || admin.email !== email) throw "Не верный пароль или почта"
      config.admin.accessKey = createId()
      console.log(config)
      setTimeout(() => {
        console.log("Ключ все")
        config.admin.accessKey = null
      }, config.admin.keyLifeTimeInMs)
      return {status: "success", body: config.admin.accessKey, message: null}
    }catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async changePassword({oldPassword, newPassword}: {oldPassword: string, newPassword: string}): Promise<IResponse> {
    try {
      const admin = await UserModel.findOne({username: "admin"})
      if(!admin) throw "Админ не найден, добавьте его в базу данных"
      const hashedOldPassword = await hash(oldPassword, 10)
      if(admin.password !== hashedOldPassword) throw "Не верный пароль"
      const hashedNewPassword = await hash(newPassword, 10)
      admin.password = hashedNewPassword
      await admin.save()
      return {status: "success", body: null, message: null}
    }catch (err) {
      return generateWrongResponse(err)
    }
  }
}