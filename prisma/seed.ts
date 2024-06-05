import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  // Cleanup existing users
  await prisma.user.deleteMany().catch(() => {
    // no worries if they don't exist yet
  });

  const hashedPasswordRachel = await bcrypt.hash("racheliscool", 10);
  const hashedPasswordRob = await bcrypt.hash("lexilovesyou", 10);

  // Create Rachel's user
  const rachel = await prisma.user.create({
    data: {
      email: "rachel@remix.run",
      password: {
        create: {
          hash: hashedPasswordRachel,
        },
      },
    },
  });

  // Create Rob's user
  const rob = await prisma.user.create({
    data: {
      email: "rob@razorhollow.com",
      isActive: true,
      isAdmin: true,
      isNew: false,
      password: {
        create: {
          hash: hashedPasswordRob,
        },
      },
    },
  });

  // Create notes for Rachel
  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: rachel.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: rachel.id,
    },
  });

  // Seed the default location (Team Headquarters)
  const defaultLocation = await prisma.location.create({
    data: {
      name: "Team Headquarters",
      address: "5588 CR-11, Alpine, NY 14805"
    }
  });

  // Create a sample event with agenda items and the default location
  await prisma.event.create({
    data: {
      title: "Strike Team Training Event",
      date: new Date("2024-04-01T09:00:00Z"),
      startTime: new Date("2024-04-01T09:00:00Z"),
      endTime: new Date("2024-04-01T12:00:00Z"),
      location: {
        connect: { id: defaultLocation.id }
      },
      agenda: {
        create: [
          { title: "Land Water Land" },
          { title: "Baseball Drill" },
          { title: "Water Blinds" },
          { title: "Diversions" },
        ]
      }
    }
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
