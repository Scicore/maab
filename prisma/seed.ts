import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Read from env. Required for first admin.
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME || "MAAB Admin";

  if (!email || !password) {
    console.log(
      "Skipping seed: SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set."
    );
    return;
  }

  if (password.length < 12) {
    throw new Error("SEED_ADMIN_PASSWORD must be at least 12 characters.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email: email.toLowerCase().trim() },
    update: {
      passwordHash,
      name,
      role: UserRole.SUPER_ADMIN,
      status: "ACTIVE",
    },
    create: {
      email: email.toLowerCase().trim(),
      name,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      status: "ACTIVE",
    },
  });

  console.log(`✔ Admin user ready: ${user.email} (${user.role})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });