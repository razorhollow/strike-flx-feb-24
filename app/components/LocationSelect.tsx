import type { Location } from '@prisma/client';
import { useState } from 'react'


interface LocationSelectProps {
  locations: Location[]
}

export function LocationSelect({ locations }: LocationSelectProps) {
  const [isAddingNewLocation, setIsAddingNewLocation] = useState(false)

  return (
    <div>
            <select
              name="locationId"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 text-[15px] sm:leading-6"
              onChange={(e) => {
                if (e.target.value === "new") {
                  setIsAddingNewLocation(true);
                } else {
                  setIsAddingNewLocation(false);
                }
              }}
            >
              <option value="">Select Location</option>
              {locations?.map((location: Location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
              <option value="new">Add New Location</option>
            </select>
          {isAddingNewLocation ? <div>
              <fieldset className='my-[15px] flex items-center gap-5'>
                <label htmlFor='new-location-name' className='w-[90px] text-right text-[15px]'>
                  Name: 
                </label>
                <input 
                  className='inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
                  type='text'
                  id='new-location-name'
                  name='newLocationName'
                />
              </fieldset>
              <fieldset className='my-[15px] flex items-center gap-5'>
                <label htmlFor='new-location-address' className='w-[90px] text-right text-[15px]'>
                  Address: 
                </label>
                <input 
                  className='inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
                  type='text'
                  id='new-location-address'
                  name='newLocationAddress'
                />
              </fieldset>
            </div> : null}
        </div>
  )
}
