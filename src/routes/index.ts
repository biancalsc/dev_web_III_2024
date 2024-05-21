import { Router } from "express";
import category from "./category";

const router = Router();

router.use("/categoria", category);

export default router;