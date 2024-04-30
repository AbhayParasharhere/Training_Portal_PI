// Previously at dashboard to fetch announcement working unsub
useEffect(() => {
  if (!currentUser || isListenerSetUp) return;

  const { uid } = currentUser;

  async function fetchData() {
    try {
      // Fetch user details
      const userDetails = await getUserDetails(uid);
      setUserDetails(userDetails);
      // console.log("User Info", uid, userDetails);

      // Start real-time listener for announcements
      const unsubscribe =
        getAllAnnouncementsSortedByUpdatedAtDescendingRealTime(
          setAnnouncements
        );
      console.log("Announcements listener startedssss");

      // Set the flag to true, indicating that the listener is set up

      setIsListenerSetUp(true);

      // Return the unsubscribe function to clean up the listener on unmount
      return unsubscribe;
    } catch (error) {
      console.error(error);
    }
  }

  const cleanup = fetchData();
  // Return the cleanup function from the effect to stop the real-time listener when the component unmounts
  return () => {
    if (cleanup) {
      console.log("Unsubscribing from announcements listener");
      // Reset the flag since we are cleaning up
      setIsListenerSetUp(false);
      return cleanup;
    }
  };
}, [currentUser]);
