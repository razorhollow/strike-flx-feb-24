import {  ActionFunctionArgs, json } from '@remix-run/node'

import { deleteRSVP } from '~/models/user.server'

export async function action({
  request,
}: ActionFunctionArgs) {
  const body = await request.formData()
  const email = body.get('email')
  await deleteRSVP({ email })
  return json({})
}