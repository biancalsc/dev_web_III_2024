import controller from "../controllers/CategoryController"
import { Router } from "express";

const router = Router();

router.get("/", controller.list);
router.post("/", controller.create);
router.delete("/", controller.delete);
router.put("/", controller.update);

export default router;