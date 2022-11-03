import { Router } from "express";
import { ErrorsController } from "../../controllers/errors";

const {err404} = ErrorsController

const router = Router()

router.all("*", err404)

export default router