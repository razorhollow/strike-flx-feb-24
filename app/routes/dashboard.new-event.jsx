import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Button } from '~/components/buttons'
import { Form, Input, Textarea } from '~/components/forms'
import { getAllLocations, createEvent, createLocation } from "~/models/event.server";

export const loader = async () => {
  const locations = await getAllLocations();
  return json({ locations });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "createEvent") {
    const title = formData.get("title");
    const date = formData.get("date");
    const startTime = formData.get("startTime");
    const endTime = formData.get("endTime");
    let locationId = formData.get("locationId");
    const newLocationName = formData.get("newLocationName");
    const newLocationAddress = formData.get("newLocationAddress");
    const agendaItems = formData.get("agendaItems").split(',').map(item => item.trim());

    if (!title || !date || !startTime || !endTime || (!locationId && (!newLocationName || !newLocationAddress)) || !agendaItems.length) {
      return json({ error: "All fields are required." }, { status: 400 });
    }

    if (locationId === "new") {
      const newLocation = await createLocation({
        name: newLocationName,
        address: newLocationAddress,
      });
      locationId = newLocation.id;
    }

    await createEvent({
      title,
      date,
      startTime,
      endTime,
      locationId,
      agendaItems,
    });

    return redirect("/dashboard");
  }
};

export default function AddEvent() {
  const { locations } = useLoaderData();
  const actionData = useActionData();
  const [isAddingNewLocation, setIsAddingNewLocation] = useState(false);

  return (
    <div className="flex flex-col content-center items-center w-[80vw] max-w-[500px] mt-10">
      <h1>Add Event</h1>
      <Form method="post" className="mt-10 grid grid-cols-1 gap-y-8 px-10">
        {actionData?.error ? <p style={{ color: "red" }}>{actionData.error}</p> : null}
        <div>
          <Input label="Title:" type="text" name="title" />
        </div>
        <div>
          <Input type="date" name="date" label="Date:" />
        </div>
        <div>
          <Input label="Start Time:" type="time" name="startTime" />
        </div>
        <div>
          <Input label="End Time:" type="time" name="endTime" />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Location:
            <select
              name="locationId"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => {
                if (e.target.value === "new") {
                  setIsAddingNewLocation(true);
                } else {
                  setIsAddingNewLocation(false);
                }
              }}
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
              <option value="new">Add New Location</option>
            </select>
          </label>
        </div>
        {isAddingNewLocation ? <div>
            <h2>New Location</h2>
            <label>
              Name: <input type="text" name="newLocationName" />
            </label>
            <label>
              Address: <input type="text" name="newLocationAddress" />
            </label>
          </div> : null}
        <div>
          <Textarea 
            label="Agenda Items:" name="agendaItems" placeholder="Separate items with commas">
          </Textarea>
        </div>
        <Button type="submit" name="intent" value="createEvent">
          Add Event
        </Button>
      </Form>
    </div>
  );
}
