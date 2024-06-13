import { prisma } from "~/db.server"

export function getAllEvents() {
  return prisma.event.findMany({
    include: {
      location: true,
      agenda: true,
      comments: true,
    },
  });
}

export function getEvent({ id }) {
  return prisma.event.findFirst({
    where: { id },
    include: {
      location: true,
      agenda: true,
      comments: {
        include: {
          author: true,
        }
      },
    },
  });
}

export function createEvent({ title, date, startTime, endTime, locationId, agendaItems }) {
  return prisma.event.create({
    data: {
      title,
      date: new Date(date),
      startTime: new Date(`${date}T${startTime}:00`),
      endTime: new Date(`${date}T${endTime}:00`),
      location: {
        connect: { id: locationId },
      },
      agenda: {
        create: agendaItems.map((title) => ({ title })),
      },
    },
  });
}

export function deleteEvent({ id }) {
  return prisma.event.delete({
    where: { id },
  });
}

export function getAllLocations() {
  return prisma.location.findMany();
}

export function createLocation({ name, address }) {
  return prisma.location.create({
    data: { name, address },
  });
}

export function createComment({
  content,
  userId,
  eventId
}) {
  return prisma.comment.create({
    data: {
      content,
      event: {
        connect: {
          id: eventId,
        }
      },
      author: {
        connect: {
          id: userId,
        },
      },
    },
  });
}


