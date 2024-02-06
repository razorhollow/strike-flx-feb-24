
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, CrossCircledIcon } from '@radix-ui/react-icons';
import { useFetcher } from '@remix-run/react';
import { useState } from 'react';


export default function DeleteDialog() {
  const fetcher = useFetcher()

  const [open, setOpen] = useState(false)

  const handleSubmit = (() => {
    setOpen(false)
  })
  
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className="text-burn shadow-slate-200 hover:bg-white hover:text-red-500 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none" type='button'>
            <CrossCircledIcon />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <fetcher.Form 
          method="POST" 
          action='/resources/deletereservation' 
          onSubmit={handleSubmit}>
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Delete Reservation:
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              Cancel Your reservation. Click confirm when you are done.
            </Dialog.Description>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="email">
                  Email
                </label>
                <input
                  className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="email"
                  name='email'
                />
              </fieldset>
            <div className="mt-[25px] flex justify-end">
                <button className="bg-burn text-white hover:bg-orange-800 focus:shadow-orange-300 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none" type='submit'>
                  Confirm Delete
                </button>
            </div>
            <Dialog.Close asChild>
              <button
                className="text-burn hover:bg-orange-800 focus:shadow-orange-300 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
                type='button'
                >
                <Cross2Icon />
              </button>
            </Dialog.Close>
  </fetcher.Form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
)};

