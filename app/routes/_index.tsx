import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import AboutSection from "~/components/AboutSection";
import Attendees from "~/components/Attendees";
import DetailsSection from "~/components/DetailsSection";
import HeroSection from "~/components/HeroSection";
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
      <div>
        <Attendees attendees={attendees}/>
      </div>
    </main>
  );
}