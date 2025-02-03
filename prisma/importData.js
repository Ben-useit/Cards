const jsonData = require('./dataWords4.json');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fs = require('fs');

// Read the JSON file
//const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

async function main() {
  // Loop through each item in the JSON and insert it into the database
  for (const item of jsonData) {
    let wordType = '';
    if (item.frontItemType) {
      switch (item.frontItemType) {
        case 'verb':
          wordType = ' (v.)';
          break;
        case 'adjective':
          wordType = ' (adj.)';
          break;
        case 'noun':
          wordType = ' (n.)';
          break;
        case 'adverb':
          wordType = ' (adv.)';
          break;
        default:
          wordType = '';
      }
    }
    await prisma.card.create({
      data: {
        frontLanguage: item.frontLanguage,
        frontItem: item.frontItem + wordType,
        frontExample: item.frontExample,
        frontStatus: -1,
        backLanguage: item.backLanguage,
        backItem: item.backItem + wordType,
        backPronunciation: item.backPronunciation,
        backExample: item.backExample,
        backStatus: -1,
        userId: 'user_2qzFAY5HCsy0nPCb7JwGC7LRwHv',
      },
    });
  }

  console.log('Data imported successfully!');
}

// Run the import function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
