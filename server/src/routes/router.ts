import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => res.json({ status: "pass" }));

export default router;
