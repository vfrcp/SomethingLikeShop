import { Router } from "express";
import { AdminController } from "../../controllers/admin";

const {login, register, changePassword, isAdminExist} = AdminController

const router = Router()

router.get("/isAdminExist", isAdminExist)
router.post("/login", login)
router.post("/changePassword", changePassword)
router.post("/register", register)

export default router