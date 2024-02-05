import { MapPinIcon, CalendarDaysIcon, ChartBarIcon, InformationCircleIcon } from '@heroicons/react/20/solid'

import backgroundImageUrl from 'app/assets/field.webp'

const guestCount = 3


const cards = [
  {
    name: 'Venue',
    description: 'Join us at Upland Game Preserve, the perfect setting for our training. This venue offers an ideal environment for our activities.*Upland Game Preserve *2998 Mills Road *Montour Falls, NY',
    icon: MapPinIcon,
  },
  {
    name: 'Date and Time',
    description: 'Training Will Take Place on Sunday, February 18th, 2024. Time is still TBD. Check back for updates. *DATE: 2/18/2024 *TIME: TBD',
    icon: CalendarDaysIcon,
  },
  {
    name: 'Guest & Bird Count',
    description: `The amount of birds reserved will be dependent on dog/handler registration. The more participants we have, the more birds will be available. *Current Guest / Bird Count is: *Handlers - ${guestCount} *Pheasants - ${guestCount * 2} *Chukar - ${guestCount * 4}`,
    icon: ChartBarIcon,
  },
]

export default function DetailsSection() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        src={backgroundImageUrl}
        alt="an empty field in winter"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div className='absolute inset-0 bg-dirt opacity-80 -z-10'></div> {/* Overlay div */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8"> {/* Text content wrapper with higher z-index */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Event Details</h2>
          <h3 className='text-slate-200'>Join Us for an Unforgettable Upland Training Event</h3>
          <p className="mt-6 text-lg leading-8 text-gray-300">
          Mark your calendars for February 18th, 2024. The precise timing of the event is to be determined. Stay updated for the exact schedule and bird count to make the most of this training opportunity.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <div key={card.name} className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10">
              <card.icon className="h-7 w-5 flex-none text-burn" aria-hidden="true" />
              <div className="text-base leading-7">
                <h3 className="font-semibold text-white">{card.name}</h3>
                {card.description.split('*').map((line, index) => (
                <p className="mt-2 text-gray-300" key={index}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}
