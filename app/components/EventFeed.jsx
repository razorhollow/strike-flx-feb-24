import { useRef } from "react";
import { useFetcher } from "@remix-run/react";

import { PaperAirplaneIcon, UserCircleIcon } from "@heroicons/react/20/solid";

export default function EventFeedComponent({ comments }) {
  const fetcher = useFetcher()
  const inputRef = useRef(null)
  const isPosting = fetcher.state !== "idle"

  if (inputRef.current) {
    inputRef.current.value = ""
    }

  return (
    <div>
      <div id="comment-box">
        {comments && comments.length > 0 ? 
          <ul>
            {comments.map((comment) => (
              <div  key={comment.id} className="flex content-around w-full border-b border-gray-300 m-3 p-3">
                <UserCircleIcon width={30} className="mr-5 text-gray-400"/>
                <div className="">
                  <h3 className="font-bold">{comment.author?.name || "Anonymous"}</h3>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </ul>
          :
          <p>No comments yet. Leave one below</p>
        }
      </div>
      <fetcher.Form className="flex content-between border border-gray-500 rounded-full p-2 my-3" method="POST">
        <input required className="w-full h-full focus:outline-none focus:ring-0" type="text" placeholder="Write a comment..." name="comment" ref={inputRef} autoComplete="off" />
        <button disabled={isPosting} type="submit"><PaperAirplaneIcon width={20} className="text-gray-500"/></button>
      </fetcher.Form>
    </div>
  );
}