import { Router, Request, Response } from "express";
import UsersController from "../controllers/users";

const router = Router();

router.post(
  "/register",
  async (req: Request, res: Response) => await UsersController.create(req, res)
);
router.post(
  "/login",
  async (req: Request, res: Response) => await UsersController.login(req, res)
);

export default router;
