import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}


export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
  ) {
    const userWithPassword = await prisma.user.findUnique({
      where: { email },
      include: {
        password: true,
      },
    });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }
  
  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
    );
    
    if (!isValid) {
      return null;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = userWithPassword;
    
    return userWithoutPassword;
  }

  export async function getAttendees() {
    const attendees = await prisma.rSVP.findMany({
      select: {id:true, name:true, email: true, comments:true, createdAt:true, updatedAt:true},
      orderBy: { createdAt: "desc" },
    })
    return attendees
  }
  
export async function createRSVP(name: string, email: string, comments: string | null) {
  return prisma.rSVP.create({
    data: {
      name,
      email,
      comments,
    },
  });
}

export async function deleteRSVP(email: User['email']){
  return prisma.rSVP.deleteMany({
    where: { email }
  })
  
}


