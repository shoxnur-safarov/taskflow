import { Router } from "express";
import { uploadAttachment, getAttachments, removeAttachment } from "../controllers/attachment.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router({ mergeParams: true });

router.post("/", authenticate, upload.single("file"), uploadAttachment);
router.get("/", authenticate, getAttachments);
router.delete("/:attachmentId", authenticate, removeAttachment);

export default router;