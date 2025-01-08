const products = require('./data.json');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// async function main() {
//   for (const product of products) {
//     const card = {
//       frontLanguage: 'German',
//       frontItem: product.front,
//       frontPronunciation: '',
//       frontExample: product.exampleFront,
//       frontStatus: product.rStatus,
//       backLanguage: 'English',
//       backItem: product.back,
//       backPronunciation: product.pronunciation,
//       backExample: product.exampleBack,
//       backStatus: product.status,
//       userId: 'userID',
//       sessionId: '',
//     };
//     await prisma.card.create({
//       data: card,
//     });
//     //await prisma.product.create({ data: product });
//     //console.log(card);
//   }
// }

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
