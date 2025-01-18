const products = require('./data.json');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
  //const data = JSON.parse(products);
  for (const item of products) {
    const data = {
      frontLanguage: 'German',
      frontItem: item.front,
      frontExample: item.exampleFront,
      frontStatus: item.status,
      backLanguage: 'English',
      backItem: item.back,
      backPronunciation: item.pronunciation,
      backExample: item.exampleBack,
      backStatus: item.rStatus,
      userId: 'user_2qzFAY5HCsy0nPCb7JwGC7LRwHv',
    };
    await prisma.card.create({
      data: data,
    });
  }

  // await prisma.card.updateMany({
  //   where: {
  //     userId: 'userID',
  //   },
  //   data: {
  //     userId: 'user_2qzFAY5HCsy0nPCb7JwGC7LRwHv',
  //   },
  // });
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
