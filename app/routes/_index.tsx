import { json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import AboutSection from "~/components/AboutSection";
import Attendees from "~/components/Attendees";
import DetailsSection from "~/components/DetailsSection";
import HeroSection from "~/components/HeroSection";
import FooterComponent from '~/components/Footer';
import { getAttendees } from '~/models/user.server';


export const loader = async () => {
  const attendees = await getAttendees()
  invariant(attendees, "No Attendees Found")

  return json({ attendees });
};

export default function IndexRoute() {
  const { attendees } = useLoaderData<typeof loader>();
  console.log('LOADER DATA: ', attendees)
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <DetailsSection count={attendees.length}/>
      <div className='flex justify-between w-full'>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register For This Event
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form className="space-y-6" method="POST"  id="register-section">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-burn px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </Form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a Retriever Roadmap member?{' '}
            <a href="https://www.retrieverroadmap.com/s-t-r-i-k-e-team" target='blank' className="font-semibold leading-6 text-burn hover:text-orange-800">
              Sign Up Here
            </a>
          </p>
        </div>
      </div>
        <div className='w-1/2'>
          <Attendees attendees={attendees}/>
        </div>
      </div>
      <FooterComponent />
    </main>
  );
}