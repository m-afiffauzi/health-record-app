import { hash } from "bcrypt";
import { prisma } from "../app/libs/prisma";

async function main() {
  const hashedPassword = await hash(`${process.env.USER_PASSWORD}`, 12);
  const user = await prisma.user.upsert({
    where: {
      email: `${process.env.USER_EMAIL}`,
    },
    update: {},
    create: {
      email: `${process.env.USER_EMAIL}`,
      name: `${process.env.USER_NAME}`,
      password: hashedPassword,
    },
  });
  console.log(user);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
