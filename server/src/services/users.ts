import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  CreateUserRequest,
  CreateUserResponse,
  LoginUserRequest,
  LoginUserResponse,
} from "../interfaces/users";
import { prisma } from "./prisma";
import vars from "../config/vars";

const UsersService = {
  async create(userData: CreateUserRequest): Promise<CreateUserResponse> {
    const userExists = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (userExists) throw new Error("Email de usuário em uso.");

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: hashedPassword,
      },
    });

    return user;
  },
  async login(userData: LoginUserRequest): Promise<LoginUserResponse> {
    const userExists = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (!userExists) throw new Error("Usuário não cadastrado.");

    const matchPassword = await bcrypt.compare(
      userData.password,
      userExists.password
    );

    if (!matchPassword) throw new Error("Credenciais não coincidem.");

    const token = jwt.sign(
      { id: userExists.id, email: userExists.email },
      vars.jwt_secret_key
    );

    return {
      token,
    };
  },
};

export default UsersService;
