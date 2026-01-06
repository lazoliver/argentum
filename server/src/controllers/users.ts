import { Request, Response } from "express";
import UsersService from "../services/users";
import { createUserSchema } from "../validation/users";
import { ValidationError } from "yup";
import logger from "../config/loggers";

const UsersController = {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = await createUserSchema.validate(req.body, {
        abortEarly: false,
      });

      const user = await UsersService.create(validatedData);

      logger.info(
        `users_controller/create - user successfully created with email: ${user.email}`
      );
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.warn(`users_controller/create - ${error.errors}`);
        return res.status(422).json({ msg: error.errors });
      }
      if (error instanceof Error) {
        logger.warn(`users_controller/create - ${error.message}`);
        return res.status(400).json({ msg: error.message });
      }

      logger.error(`users_controller/create - Error: ${error}`);
      return res.status(500).json({ error: "internal server error" });
    }
  },
};

export default UsersController;
