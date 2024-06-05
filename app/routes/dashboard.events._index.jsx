import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { getAllEvents } from "../models/event.server";
import { useLoaderData } from "@remix-run/react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

import EventCard from '~/components/EventCard'

export const loader = async () => {
  const eventListItems = await getAllEvents()
  return json({ eventListItems });
};

export default function Component() {
  const { eventListItems } = useLoaderData()
  console.log("events: ", eventListItems)
  return (
    <div>
      <ul>
      {eventListItems.map((event) => (
      <li key={event.id}>
        <EventCard event={event} />
      </li>
      ))}
      </ul>
      <Link to="/dashboard/new-event">
        <PlusCircleIcon />
      </Link>
    </div>
  );
}