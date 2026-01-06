import logger from "../../config/loggers";
import { prisma } from "../../services/prisma";
import UserOrgService from "../../services/userOrg";

(async () => {
  const args = process.argv;

  if (args.length !== 4) {
    logger.info("Usage: yarn run create-user-org <user-id> <org-id>");
    process.exit(1);
  }

  const orgId = args[2];
  const userId = args[3];

  if (!orgId?.trim()) {
    logger.error("Organization id is required");
    process.exit(1);
  }

  if (!userId?.trim()) {
    logger.error("User id is required");
    process.exit(1);
  }

  try {
    const userOrg = await UserOrgService.create(userId, orgId);

    logger.info(
      `createUserOrg_script - userOrganization successfully created with userId: ${userOrg.userId} and orgId: ${userOrg.organizationId}`
    );
  } catch (error) {
    if (error instanceof Error) {
      logger.error(
        `createUserOrg_script - Error creating userOrganization: ${error.message}`
      );
    } else {
      logger.error("createUserOrg_script - Unknown error", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
