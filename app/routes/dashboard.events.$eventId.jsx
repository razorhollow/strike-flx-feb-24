import { json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import { MapPinIcon, CalendarIcon } from "@heroicons/react/20/solid"
import dayjs from "dayjs"

import EventFeedComponent from "../components/EventFeed"
import { getEvent, createComment, deleteEvent } from "../models/event.server"
import { requireUserId } from "~/session.server"
import EventEditButton from "../components/EventEditButton"

export const loader = async ({ params }) => {
  invariant(params.eventId, "Event ID not found")

  const event = await getEvent({ id: params.eventId })
  if (!event) {
    throw new Response("Not Found", { status: 404 })
  }

  return json({ event })
}

export const action = async ({ params, request }) => {
  const userId = await requireUserId(request);
  const event = await getEvent({ id: params.eventId });
  if (!event) {
    throw new Response("Event not found", { status: 404 });
  }

  const formData = await request.formData();

  const intent = formData.get('intent')
  console.log(`The intent was to ${intent}`)
  switch (intent) {
    case 'comment': {
      const content = formData.get("comment");
      if (!content) {
        throw new Response("Comment content is required", { status: 400 });
      }
    
      const comment = await createComment({ content, userId, eventId: event.id });
      return json({ comment });
    }
    case 'delete': {
      await deleteEvent({ id: params.eventId })
      console.log('The event to be deleted is: ', params.eventId)
      return redirect('/dashboard/events')
    }
    default: {
      throw new Response(`Invalid intent: ${intent}`, { status: 400})
    }
  }
};


export default function EventDetailsPage() {
  const data = useLoaderData()
  const eventDate = dayjs(data.event.date).format('MMMM DD,[ ]YYYY')
  const startTime = dayjs(data.event.startTime).format('h:mm A')
  const endTime = dayjs(data.event.endTime).format('h:mm A')
  return (
    <main>
      <div id="location" className="border border-zinc-500 p-10">
        <h1>{data.event.title}</h1>
        <div className="flex gap-10">
          <MapPinIcon width={30}/>
          <div className="flex flex-col">
            <h2>{data.event.location.name}</h2>
            <h3>{data.event.location.address}</h3>
          </div>
        </div>
        <div className="flex gap-10">
          <CalendarIcon width={30}/>
          <div className="flex-col">
            <h2>{eventDate}</h2>
            <p>{startTime} - {endTime}</p>
          </div>
        </div>
      </div>
        {data.event.agenda ? 
          <ul id="agenda" className="border border-zinc-500 p-10 m-10">
            <h3>Agenda For The Event</h3>
            {data.event.agenda.map((agendaItem)=> (
              <li key={agendaItem.id}>
                {agendaItem.title}
              </li>
            ))}
          </ul>
        :
        <p>No Comments Yet. Leave one below.</p>
        }
     <EventFeedComponent comments={data.event.comments}/> 
     <EventEditButton event={data.event} />
    </main>
  )
}