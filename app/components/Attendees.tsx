import moment from 'moment'

import DialogDemo from "./DeleteDialog";


interface AttendeesProps {
  attendees: {
    id: string;
    name: string;
    email: string;
    comments: string | null;
    createdAt: string; // Changed from Date to string
    updatedAt: string; // Changed from Date to string
  }[];
}


export default function Attendees({ attendees }: AttendeesProps) {
  return (
    <div className="w-3/4 mx-auto">
      <ul className="divide-y divide-gray-100">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Current RSVP List</h2>
        {attendees.map((person) => (
          <li key={person.id} className="flex gap-x-4 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 ">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
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
