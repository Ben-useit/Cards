const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
  await prisma.card.updateMany({
    // where: {
    //   userId: 'userID',
    // },
    data: {
      language: '3f7497d7-212d-436c-b2ac-d75c428e7ee0',
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
