import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import { globalSearch } from "../controllers/search.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { checkWorkspaceMember } from "../middleware/workspace-auth.middleware.js";

const router = Router({ mergeParams: true });

router.get("/dashboard-stats", authenticate, checkWorkspaceMember, getDashboardStats);
router.get("/search", authenticate, checkWorkspaceMember, globalSearch);

export default router;