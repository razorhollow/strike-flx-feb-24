import { useRef } from "react";
import { useFetcher } from "@remix-run/react";

import { PaperAirplaneIcon } from "@heroicons/react/20/solid";

export default function EventFeedComponent() {
  const fetcher = useFetcher()
  const inputRef = useRef(null)
  const isPosting = fetcher.state !== "idle"

  if (inputRef.current) {
    inputRef.current.value = ""
  }
  return (
    <div>
      <fetcher.Form className="flex content-between border border-gray-500 rounded-full p-2" method="POST">
        <input className="w-full h-full focus:outline-none focus:ring-0" type="text" placeholder="Write a comment..." name="comment" ref={inputRef}/>
        <button disabled={isPosting} type="submit"><PaperAirplaneIcon width={15} className="text-gray-500"/></button>
      </fetcher.Form>
    </div>
  );
}