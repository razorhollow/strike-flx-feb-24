import { InformationCircleIcon } from '@heroicons/react/24/outline';
import * as Popover from '@radix-ui/react-popover'

const PopoverInfo = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button className="inline-flex items-center justify-center rounded-full p-2 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 focus:ring-slate-600">
        <InformationCircleIcon className='w-6 h-6'/>
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className="w-[320px] rounded-lg bg-white p-4 shadow-lg border border-gray-200 text-sm text-gray-800"
        sideOffset={5}
      >
        <div className="text-gray-900 font-medium">Bird Allocation</div>
        <p className="mt-2">
          Each handler is initially allocated 2 pheasants and 4 chukar. These numbers are our starting point, and we are open to your input! If you have suggestions for different quantities, please share them in the comment section of the registration form.
        </p>
        <p className="mt-2">
          <strong>Pricing:</strong> $20 per pheasant, $16 per chukar.
        </p>

        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default PopoverInfo;
