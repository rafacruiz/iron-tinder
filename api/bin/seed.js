import mongoose from "mongoose";
import "../config/db.config.js";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
import User from "../models/user.model.js";

async function seed() {
  if (mongoose.connection.readyState !== 1) {
    await new Promise((resolve) =>
      mongoose.connection.once("connected", resolve)
    );
  }

  await mongoose.connection.dropDatabase();
  console.log("[OK] Database dropped");

  const hashedPassword = await bcrypt.hash("123", 10);

  // Traer 50 usuarios de randomuser.me en una sola llamada
  const res = await fetch("https://randomuser.me/api/?results=50");
  const data = await res.json();

  const usersData = data.results.map((user) => {
    const age = user.dob.age;

    // Preferencias aleatorias
    const preferenceGender = ["male", "female", "everyone"][
      Math.floor(Math.random() * 3)
    ];

    const ageMin = Math.max(18, age - Math.floor(Math.random() * 8));
    const ageMax = age + Math.floor(Math.random() * 10) + 2;

    const maxDistanceOptions = [5, 10, 25, 50, 100];
    const maxDistance =
      maxDistanceOptions[Math.floor(Math.random() * maxDistanceOptions.length)];

    return {
      email: user.email.toLowerCase(),
      password: hashedPassword,
      name: `${user.name.first} ${user.name.last}`,
      age,
      gender: user.gender,
      bio: `Hola, soy ${user.name.first} y vivo en ${user.location.city}, ${user.location.state}. Me gusta conocer gente nueva y disfrutar de la vida.`,
      pics: [
        user.picture.large,
        user.picture.medium,
        user.picture.thumbnail,
      ],
      preferences: {
        gender: preferenceGender,
        ageMin,
        ageMax,
        maxDistance,
      },
    };
  });

  await User.insertMany(usersData);
  console.log(`[OK] ${usersData.length} users created`);
  mongoose.connection.close();
}

seed().catch((error) => {
  console.error("[ERROR]", error);
  mongoose.connection.close();
  process.exit(1);
});

/*import mongoose from "mongoose";
import "../config/db.config.js";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import User from "../models/user.model.js";

async function seed() {
  // Wait for DB connection
  if (mongoose.connection.readyState !== 1) {
    await new Promise((resolve) =>
      mongoose.connection.once("connected", resolve)
    );
  }

  // Drop database
  await mongoose.connection.dropDatabase();
  console.log("[OK] Database dropped");

  // --- Create Users ---
  const hashedPassword = await bcrypt.hash("123", 10);

  const usersData = [];

  for (let i = 0; i < 50; i++) {
    const gender = faker.helpers.arrayElement(["male", "female"]);
    const firstName = faker.person.firstName(gender);
    const lastName = faker.person.lastName();

    // RandomUser image index (0–99)
    const imgIndex = faker.number.int({ min: 0, max: 99 });

    // Generate 3 pics
    const pics = [
      `https://randomuser.me/api/portraits/${gender}/${imgIndex}.jpg`,
      `https://randomuser.me/api/portraits/${gender}/${(imgIndex + 1) % 100}.jpg`,
      `https://randomuser.me/api/portraits/${gender}/${(imgIndex + 2) % 100}.jpg`,
    ];

    usersData.push({
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      age: faker.number.int({ min: 18, max: 60 }),
      gender,
      pics,
      bio: faker.lorem.sentences({ min: 1, max: 3 }),
    });
  }

  await User.insertMany(usersData);

  console.log(`[OK] ${usersData.length} users created`);
  mongoose.connection.close();
}

seed().catch((error) => {
  console.error("[ERROR]", error);
  mongoose.connection.close();
  process.exit(1);
});*/