import { json } from '@remix-run/node';
import { Form, NavLink, Outlet } from '@remix-run/react';
import { requireUserId } from '~/session.server'
import { useUser } from "~/utils"

export const loader = async ({ request }) => {
  const userId = await requireUserId(request)
  return json({})
}

export default function Component() {
  const user = useUser()
  return (
    <div className='flex h-full min-h-screen flex-col'>
      <header className='flex items-center justify-between bg-darkBackground border-b border-b-slate-600 p-4 text-white'>
        <h1>You have Reached the Dashboard</h1>
        {user.isAdmin ? 
        <h2>You have access to everything</h2>
        : user.isActive ?
        <h2>You have access to a few things</h2>
        :
        <h2>You have access to nothing</h2>
        }
        <Form action='/logout' method='POST'>
          <button type='submit' className='rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600'>Logout</button>
        </Form>
      </header>
      <main className='flex h-full bg-darkBackground text-white'>
        <div className="h-full w-80 flex flex-col border-r-slate-600 border-r">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/dashboard/events">Events</NavLink>
        </div>
        <div className='bg-radialDark w-full'>
        <Outlet /></div>
      </main>
    </div>
  );
}