import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  CreateUserRequest,
  LoginUserRequest,
  UserResponse,
} from "../interfaces/users";
import { prisma } from "./prisma";
import vars from "../config/vars";

const UsersService = {
  async create(userData: CreateUserRequest): Promise<UserResponse> {
    const userExists = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (userExists) throw new Error("Email de usuário em uso.");

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        email: userData.email.toLowerCase(),
        firstName: userData.firstName.toLowerCase(),
        lastName: userData.lastName.toLowerCase(),
        password: hashedPassword,
      },
      include: {
        userOrganizations: {
          include: { organization: true },
        },
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      vars.jwt_secret_key
    );

    return {
      token,
      userOrganizations: user.userOrganizations,
    };
  },
  async login(userData: LoginUserRequest): Promise<UserResponse> {
    const userExists = await prisma.user.findUnique({
      where: {
        email: userData.email.toLowerCase(),
      },
      include: {
        userOrganizations: {
          include: { organization: true },
        },
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
      userOrganizations: userExists.userOrganizations,
    };
  },
};

export default UsersService;
