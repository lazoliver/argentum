import logger from "../../config/loggers";
import OrgsService from "../../services/organizations";
import { prisma } from "../../services/prisma";

(async () => {
  const args = process.argv;

  if (args.length !== 3) {
    logger.info("Usage: yarn run create-org <org-name>");
    process.exit(1);
  }

  const orgName = args[2];

  if (!orgName?.trim()) {
    logger.error("Organization name is required");
    process.exit(1);
  }

  try {
    const org = await OrgsService.create(orgName);

    logger.info(
      `createOrg_script - Organization successfully created with id: ${org.id}`
    );
  } catch (error) {
    if (error instanceof Error) {
      logger.error(
        `createOrg_script - Error creating organization: ${error.message}`
      );
    } else {
      logger.error("createOrg_script - Unknown error", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
