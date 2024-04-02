import { useState } from "react";

const CalendarModal = () => {
  const [eventDetails, setEventDetails] = useState({
    summary: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
    console.log(eventDetails);
  };
  var gapi = window.gapi;
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID =
    "16764537808-cg9k4kv2gq9d67ea5k1rpmko92u26o8f.apps.googleusercontent.com";
  var API_KEY = "AIzaSyAuPnYG8AQt4JY7UgUEIv8EMTMkvrdHGCM";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const handleClick = () => {
    gapi.load("client:auth2", () => {
      console.log("loaded client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
        plugin_name: "Training Portal PI",
      });

      gapi.client.load("calendar", "v3", () => console.log("bam!"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: eventDetails?.summary || "NA",
            location: eventDetails?.location || "NA",
            description: eventDetails?.description || "NA",
            start: {
              dateTime:
                `${eventDetails?.startDate}:00-07:00` ||
                "2024-04-03T09:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            end: {
              dateTime:
                `${eventDetails?.endDate}:00-07:00` ||
                "2024-04-04T17:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            // recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            attendees: [
              //   { email: "lpage@example.com" },
              //   { email: "sbrin@example.com" },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            console.log(event);
            window.open(event.htmlLink);
          });

          // Clear the form
          setEventDetails({
            summary: "",
            location: "",
            description: "",
            startDate: "",
            endDate: "",
          });

          // get events
          gapi.client.calendar.events
            .list({
              calendarId: "primary",
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: "startTime",
            })
            .then((response) => {
              const events = response.result.items;
              console.log("EVENTS: ", events);
            });
        });
    });
  };
  return (
    <div>
      <h2>Add Calendar Event</h2>
      <form>
        <label>
          Summary:
          <input
            type="text"
            name="summary"
            value={eventDetails.summary}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={eventDetails.location}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={eventDetails.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Start Date:
          <input
            type="datetime-local"
            name="startDate"
            value={eventDetails.startDate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="datetime-local"
            name="endDate"
            value={eventDetails.endDate}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleClick}>
          Add Event
        </button>
      </form>
    </div>
  );
};

export default CalendarModal;
