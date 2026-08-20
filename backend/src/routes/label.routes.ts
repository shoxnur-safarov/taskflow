import { Router } from "express";
import { createLabelHandler, getLabels, deleteLabelHandler } from "../controllers/label.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router({ mergeParams: true });

router.post("/", authenticate, createLabelHandler);
router.get("/", authenticate, getLabels);
router.delete("/:labelId", authenticate, deleteLabelHandler);

export default router;