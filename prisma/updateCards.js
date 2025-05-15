const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
  await prisma.card.updateMany({
    // where: {
    //   userId: 'userID',
    // },
    data: {
      userId: '0729a37e-dd55-44b8-a96f-ed064f306001',
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
