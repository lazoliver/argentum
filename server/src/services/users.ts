import bcrypt from "bcryptjs";
import { CreateUserRequest, CreateUserResponse } from "../interfaces/users";
import { prisma } from "./prisma";

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
};

export default UsersService;
