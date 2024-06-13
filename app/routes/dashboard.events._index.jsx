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
  return (
    <div className="w-full text-white">
      <ul>
      {eventListItems.map((event) => (
        <Link to={event.id} key={event.id}>
          <li>
            <EventCard event={event} />
          </li>
        </Link>
      ))}
      </ul>
      <Link to="/dashboard/new-event">
        <PlusCircleIcon className="w-16 h-auto fixed right-10 bottom-10"/>
      </Link>
    </div>
  );
}