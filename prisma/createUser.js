//const jsonData = require('./dataWords4.json');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fs = require('fs');
const bcrypt = require('bcrypt');

async function main(username, password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });
  console.log('User created successfully!');
}

// Run the import function
const [, , arg1, arg2] = process.argv;
main(arg1, arg2)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
