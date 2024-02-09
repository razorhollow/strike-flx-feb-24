import { json, useLoaderData } from '@remix-run/react';
import moment from 'moment'
import invariant from 'tiny-invariant';

import DialogDemo from "app/components/DeleteDialog";
import { getAttendees } from '~/models/user.server';
import { requireUserId } from '~/session.server';
import { LoaderFunctionArgs } from '@remix-run/node';



export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const attendees = await getAttendees()
  invariant(attendees, "No Attendees Found")

  return json({ attendees });
};



export default function Admin() {
  const { attendees } = useLoaderData<typeof loader>();
  return (
    <div className="w-3/4 mx-auto" id='guest-list'>
      <ul className="divide-y divide-gray-100">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Current RSVP List</h2>
        {attendees.map((person) => (
          <li key={person.id} className="flex gap-x-4 py-5">
            <div className="flex justify-between min-w-0 gap-x-4">
              <div className="min-w-0 ">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.email}</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">registered on {moment(person.createdAt).format("MMMM Do YYYY")}</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">{person.comments}</p>
              </div>
              <DialogDemo />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
