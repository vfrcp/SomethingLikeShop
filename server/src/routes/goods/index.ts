import { Router } from "express";
import { GoodsController } from "../../controllers/goods";
import { upload } from "../../middlewares/multer";

const {
  create, getById, deleteById, edit, get10ByLargestNumberOfViews, getByPage, 
  getByIds, getByPageAndCategory, getBySearchAndPage, getBySearchAndCategoryAndPage
} = GoodsController

const router = Router()

router.get("/getById/:id", getById)
router.get("/getByPage/:page", getByPage)
router.get("/getByPageAndCategory/:category/:page", getByPageAndCategory)
router.get("/getBySearchAndPage/:category/:search/:page", getBySearchAndCategoryAndPage)
router.get("/getBySearchAndPage/:search/:page", getBySearchAndPage)
router.get("/delete/:id", deleteById)
router.get("/mostPopularByViews", get10ByLargestNumberOfViews)
router.post("/editById/:id", upload.any(), edit)
router.post("/getByIds", getByIds)
router.post("/create", upload.any(), create)

export default router