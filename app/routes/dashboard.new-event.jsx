import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
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
    <div>
      <h1>Add Event</h1>
      <Form method="post">
        {actionData?.error ? <p style={{ color: "red" }}>{actionData.error}</p> : null}
        <div>
          <label>
            Title: <input type="text" name="title" />
          </label>
        </div>
        <div>
          <label>
            Date: <input type="date" name="date" />
          </label>
        </div>
        <div>
          <label>
            Start Time: <input type="time" name="startTime" />
          </label>
        </div>
        <div>
          <label>
            End Time: <input type="time" name="endTime" />
          </label>
        </div>
        <div>
          <label>
            Location:
            <select
              name="locationId"
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
          <label>
            Agenda Items:
            <textarea name="agendaItems" placeholder="Separate items with commas"></textarea>
          </label>
        </div>
        <button type="submit" name="intent" value="createEvent">
          Add Event
        </button>
      </Form>
    </div>
  );
}
