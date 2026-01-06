import { prisma } from "./prisma";

const UserOrgService = {
  async create(userId: string, organizationId: string) {
    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) throw new Error("Usuário não cadastrado.");

    const orgExists = await prisma.organization.findUnique({
      where: { id: organizationId },
    });

    if (!orgExists) throw new Error("Organização nao cadastrada.");

    const userOrgExists = await prisma.userOrganization.findFirst({
      where: {
        userId,
        organizationId,
      },
    });

    if (userOrgExists) throw new Error("UserOrg já cadastrado.");

    const userOrg = await prisma.userOrganization.create({
      data: {
        userId,
        organizationId,
      },
    });

    return userOrg;
  },
};

export default UserOrgService;
