
import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

import AboutSection from "~/components/AboutSection";
import FooterComponent from '~/components/Footer';
import HeroSection from "~/components/HeroSection";
import { useOptionalUser } from '~/utils';

export const meta = () => [{ title: "STRIKE TEAM - FLX" }];


// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   // Retrieve data based on params or request
//   // const data = await someDatabaseFunction(params.id);

//   return json({ data });
// };

export default function IndexRoute() {
  const user = useOptionalUser()
  console.log(user)
  return (
    <main>
      <HeroSection user={user} />
      <AboutSection />
      <div className='sm:block md:flex justify-between w-full'>
      <div className="flex self-start min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      </div>
        <div className='sm:w-5/6 sm:mx-auto md:w-1/2 pt-10'>
        </div>
      </div>
      <FooterComponent />
    </main>
  );
}