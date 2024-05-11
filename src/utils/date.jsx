function getUpcomingEvents(clientData) {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; // Month starts from 0

  // Combine all events into a single array
  const allEvents = [];

  clientData?.forEach((client) => {
    const dobParts = client.DOB.split("-");
    const anniversaryParts = client.anniversary.split("-");
    const dobMonth = parseInt(dobParts[1], 10);
    const dobDay = parseInt(dobParts[2], 10);
    const anniversaryMonth = parseInt(anniversaryParts[1], 10);
    const anniversaryDay = parseInt(anniversaryParts[2], 10);

    // Check if DOB is today or within a week (7 days)
    if (
      dobMonth === currentMonth &&
      dobDay >= currentDay &&
      dobDay - currentDay <= 7
    ) {
      allEvents.push({ ...client, eventType: "Birthday" });
    }

    // Check if anniversary is today or within a week (7 days)
    if (
      anniversaryMonth === currentMonth &&
      anniversaryDay >= currentDay &&
      anniversaryDay - currentDay <= 7
    ) {
      allEvents.push({ ...client, eventType: "Anniversary" });
    }
  });

  // Sort events by the latest event first
  allEvents.sort((a, b) => {
    const dateA = new Date(
      2000,
      a.eventType === "Birthday"
        ? a.DOB.split("-")[2]
        : a.anniversary.split("-")[2]
    );
    const dateB = new Date(
      2000,
      b.eventType === "Birthday"
        ? b.DOB.split("-")[2]
        : b.anniversary.split("-")[2]
    );

    return dateA - dateB;
  });

  return allEvents;
}

export { getUpcomingEvents };
