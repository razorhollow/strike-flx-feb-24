import { json, redirect, ActionFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import AboutSection from "~/components/AboutSection";
import Attendees from "~/components/Attendees";
import DetailsSection from "~/components/DetailsSection";
import FooterComponent from '~/components/Footer';
import HeroSection from "~/components/HeroSection";
import { getAttendees, createRSVP } from '~/models/user.server';



export const loader = async () => {
  const attendees = await getAttendees()
  invariant(attendees, "No Attendees Found")

  return json({ attendees });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  invariant(formData.get("name_confirm") === "", "Form not submitted properly")
  const name = formData.get("name") as string;
  let email = formData.get("email") as string;
  email = email.toLowerCase()
  const comments = formData.get("comments") as string;

  try {
    await createRSVP(name, email, comments || "");
    return redirect("/#guest-list")
    
  } catch (error) {
    // Handle potential errors, such as email uniqueness constraint violations
    return json({ errorMessage: "An error occurred while submitting your RSVP. Please try again." }, { status: 500, headers: {
      "X-Remix-Redirect-PreventScroll": "true"
    } });
  }
};

export default function IndexRoute() {
  const { attendees } = useLoaderData<typeof loader>();
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <DetailsSection count={attendees.length}/>
      <div className='sm:block md:flex justify-between w-full'>
      <div className="flex self-start min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register For This Event
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form reloadDocument className="space-y-6" method="POST"  id="register-section" preventScrollReset={true}>
            <div className='opacity-0 absolute top-0 left-0 h-0 w-0 -z-1'>
              <label htmlFor='name-input'>Please leave this field blank</label>
              <input type="text" name="name_confirm" id='name-input'
              tabIndex={-1}
              autoComplete='off'
              />
            </div>
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
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              </div>
              <div>
              <div className="flex items-center justify-between">
                <label htmlFor="comments" className="block text-sm font-medium leading-6 text-gray-900">
                  Comments
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  id="comments"
                  name="comments"
                  rows={6}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder='training goals for the day, requests, etc'
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-burn px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
        <div className='sm:w-5/6 sm:mx-auto md:w-1/2 pt-10'>
          <Attendees attendees={attendees}/>
        </div>
      </div>
      <FooterComponent />
      <script dangerouslySetInnerHTML={{
  __html: `
    if (new URLSearchParams(window.location.search).has('formSubmitted')) {
      document.getElementById('register-section').reset();
      window.history.replaceState(null, '', window.location.pathname); // Remove query params
    }
  `,
}} />

    </main>
  );
}