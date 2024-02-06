import {  ActionFunctionArgs, json } from '@remix-run/node'

import { deleteRSVP } from '~/models/user.server'

export async function action({
  request,
}: ActionFunctionArgs) {
  await deleteRSVP()
  return json({})
}