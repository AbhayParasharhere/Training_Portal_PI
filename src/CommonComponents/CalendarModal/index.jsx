const addToCalendar = (appointmentData, clientEmail) => {
  const timeZ =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Los_Angeles";
  // console.log("Timezone", timeZ);
  console.log("Inputs calendar", appointmentData, clientEmail);
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
          summary: appointmentData?.topic || "NA",
          // location: eventDetails?.location || "NA",
          description: appointmentData?.description || "NA",
          start: {
            dateTime:
              `${new Date(appointmentData?.date)?.toISOString()}` ||
              "2024-04-03T09:00:00-07:00",
            timeZone: timeZ,
          },
          end: {
            dateTime:
              `${new Date(appointmentData?.date)?.toISOString()}` ||
              "2024-04-04T17:00:00-07:00",
            timeZone: timeZ,
          },
          // recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
          attendees: [
            { email: clientEmail },
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

export default addToCalendar;
