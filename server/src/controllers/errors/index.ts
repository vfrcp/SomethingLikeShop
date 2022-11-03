import { Request, Response } from "express";
import { generateWrongResponse } from "../../funcs";
import { IResponse } from "../../types";

export class ErrorsController {
  static async err404(req: Request, res: Response<IResponse>) {
    res.send(generateWrongResponse("Этой страницы не существует"))
  }
}