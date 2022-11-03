import { Router } from "express";
import { OrdersController } from "../../controllers/orders";

const {create, confirm, done, getUnconfirmedByPage, getConfirmedByPage, getUndoneByPage, getDoneByPage, deleteById} = OrdersController

const router = Router()

router.get("/confirm/:id", confirm)
router.get("/done/:id", done)
router.get("/delete/:id", deleteById)
router.get("/getUnconfirmedByPage/:page", getUnconfirmedByPage)
router.get("/getConfirmedByPage/:page", getConfirmedByPage)
router.get("/getUndoneByPage/:page", getUndoneByPage)
router.get("/getDoneBYPage/:page", getDoneByPage)
router.post("/create", create)

export default router