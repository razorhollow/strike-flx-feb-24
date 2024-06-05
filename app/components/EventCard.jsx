export default function Component({ event }) {
  return (
    <div className="flex border border-slate-500 rounded-xl w-[80%] p-3 mb-3">
      <div className="flex flex-col">
        <h2 className="w-full">{event.title}</h2>
        <div className="flex w-full">
          <p>Location: {event.location.name}</p>
          <p>{event.date} at {event.startTime}</p>
        </div>
        <button>Details</button>
      </div>
      
    </div>
  );
}