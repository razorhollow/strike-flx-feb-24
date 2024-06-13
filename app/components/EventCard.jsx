import { MapIcon, CalendarIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";

export default function Component({ event }) {
  const eventDate = dayjs(event.date).format('MMMM DD, [ ]YYYY')
  const startTime = dayjs(event.startTime).format('h:mm A')
  return (
    <div className=" w-full flex shadow-lg rounded-xl w-[30%] p-10 mb-3 hover:shadow-lg hover:shadow-lime-800/15 hover:border hover:border-white bg-darkCard/10">
      <div className="flex flex-col items-start gap-6">
        <h2 className="w-full font-extrabold">{event.title}</h2>
        <div className="w-full flex flex-row justify-around">
          <MapIcon width={20}/>
          <div>
            <p>{event.location.name}</p>
            <p>{event.location.address}</p>
          </div>
        </div>
        <div className="w-full flex flex-row justify-around">
          <CalendarIcon width={20} />
          <p>{eventDate} at {startTime}</p>
        </div>
        
        <button>Details</button>
      </div>
      
    </div>
  );
}