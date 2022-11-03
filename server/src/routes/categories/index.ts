import { Router } from "express";
import { CategoriesController } from "../../controllers/categories";

const {create, deleteFromDb, getAllByPage, get10BySearch, getBySearchAndPage} = CategoriesController

const router = Router()

router.get("/create/:name", create)
router.get("/delete/:name", deleteFromDb)
// router.get("/getByName/:name", getByName)
router.get("/getByPage/:page", getAllByPage)
router.get("/getBySearchAndPage/:search/:page", getBySearchAndPage)
router.get("/get10BySearch/:searchString", get10BySearch)
export default router