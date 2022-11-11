import { Router } from "express";
import { AdminController } from "../../controllers/admin";

const {login, register, changePassword, isAdminExist, isKeyValid} = AdminController

const router = Router()

router.get("/isAdminExist", isAdminExist)
router.get("isKeyValid", isKeyValid)
router.post("/login", login)
router.post("/changePassword", changePassword)
router.post("/register", register)

export default router