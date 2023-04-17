import { Router } from "express";
import home from "./home.js";
const router = Router();

router.get("/", home);

export default router;
