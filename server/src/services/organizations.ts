import { prisma } from "./prisma";
import { OrgResponse } from "../interfaces/organizations";

const OrgsService = {
  async create(name: string): Promise<OrgResponse> {
    const orgExists = await prisma.organization.findFirst({ where: { name } });

    if (orgExists) throw new Error("Nome de organização em uso.");

    const org = await prisma.organization.create({ data: { name } });

    return org;
  },
};

export default OrgsService;
