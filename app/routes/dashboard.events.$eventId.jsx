import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import { MapPinIcon, CalendarIcon } from "@heroicons/react/20/solid"
import dayjs from "dayjs"

import { getEvent } from "../models/event.server"

export const loader = async ({ params }) => {
  invariant(params.eventId, "Event ID not found")

  const event = await getEvent({ id: params.eventId })
  if (!event) {
    throw new Response("Not Found", { status: 404 })
  }
  return json({ event })
}

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
    </main>
  )
}