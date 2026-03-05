
import mongoose from "mongoose";
import "../config/db.config.js";
import bcrypt from 'bcrypt';
import { faker } from "@faker-js/faker";

import User from "../models/user.model.js";

async function seed() {
  // Wait for DB connection
  if (mongoose.connection.readyState !== 1) {
    await new Promise((resolve) =>
      mongoose.connection.once("connected", resolve),
    );
  }

  // Drop database
  await mongoose.connection.dropDatabase();
  console.log("[OK] Database dropped");

  // --- Create Users ---
  
  const PASSWORD = '123';

  const usersData = [];

  const hashedPassword = await bcrypt.hash('123', 10);

  for (let i = 0; i < 50; i++) {
      const gender = faker.helpers.arrayElement(['male', 'female']);
      const firstName = faker.person.firstName(gender);
      const lastName = faker.person.lastName();

      usersData.push({
          email: faker.internet.email({ firstName, lastName }).toLowerCase(),
          password: hashedPassword,
          name: `${firstName} ${lastName}`,
          age: faker.number.int({ min: 18, max: 60 }),
          gender,
      });
  }

  await User.insertMany(usersData);

  console.log(`[OK] ${usersData.length} users created`);
}

seed().catch((error) => {
  console.error("[ERROR]", error);
  mongoose.connection.close();
  process.exit(1);
});