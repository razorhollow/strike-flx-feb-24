/* eslint-disable react/prop-types */
import { Form } from '@remix-run/react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import { LocationSelect } from './LocationSelect'


export default function EventEditButton({ event, locations }) {
  const date = new Date(event.date).toISOString().slice(0, 10)
  const startTime = new Date(event.startTime).toISOString().slice(11, 16)
  const endTime = new Date(event.endTime).toISOString().slice(11, 16)
  const agendaString = event.agenda.map(item => item.title).join(', ')
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className='inline-flex h-[35px] items-center justify-center rounded-xl px-3 font-medium leading-none'>Edit Event</button>
      </Dialog.Trigger>
      <Dialog.Portal>
      <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Edit Event
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
          Make changes to the event here. Click save when you're done.
        </Dialog.Description>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="w-[90px] text-right text-[15px]" htmlFor="title">
            Title
          </label>
          <input
            className="shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="title"
            value={event.title}
          />
        </fieldset>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="w-[90px] text-right text-[15px]" htmlFor="date">
            Date
          </label>
          <input
            className="shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            type='date'
            id="date"
            defaultValue={date}
          />
        </fieldset>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="w-[90px] text-right text-[15px]" htmlFor="start-time">
            Start
          </label>
          <input
            className="shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            type='time'
            id="start-time"
            value={startTime}
          />
        </fieldset>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="w-[90px] text-right text-[15px]" htmlFor="end-time">
            End
          </label>
          <input
            className="shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            type='time'
            id="end-time"
            value={endTime}
          />
        </fieldset>
        <LocationSelect locations={locations} />
        <fieldset className="my-[15px] flex items-center gap-5">
          <label className="w-[90px] text-right text-[15px]" htmlFor="agenda-items">
            Agenda
          </label>
          <textarea
            className="align-middle pt-2 shadow-violet7 focus:shadow-violet8 inline-flex h-[70px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="agenda-items"
            value={agendaString}
            name='agendaItems'
          />
        </fieldset>
        <div className="flex w-full justify-around mt-[15px]">
          <Form method="POST">
          <button 
            className='bg-red-500 text-white hover:bg-red-600 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none'
            name='intent' 
            value="delete" 
            type='submit'
          >
            Delete Event
          </button>
          </Form>
          <Dialog.Close asChild>
            <button className="text-green-500 border border-green-500 rounded-lg font-bold hover:bg-green-300 hover:text-black focus:shadow-green-800 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Save changes
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}