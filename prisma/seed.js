const products = require('./data.json');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
  await prisma.card.updateMany({
    where: {
      userId: 'userID',
    },
    data: {
      userId: 'user_2qzFAY5HCsy0nPCb7JwGC7LRwHv',
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
