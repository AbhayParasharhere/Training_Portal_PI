import { useState } from "react";
import { auth } from "../../Firebase/firebaseConfig";
import { createAnnouncement } from "../../Firebase/announcementLogic";

const Announcement = () => {
  const [announcementData, setAnnouncementData] = useState({});

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();

    // Before submitting get the uid of the user who is creating the announcement
    // and add it to the announcementData object
    const currentUserUid = auth.currentUser.uid;
    setAnnouncementData({ ...announcementData, user_id: currentUserUid });

    const res = createAnnouncement(announcementData);

    console.log(auth.currentUser.uid, announcementData);
    console.log(res);
  };

  const updateAnnouncement = (e) => {
    e.preventDefault();

    const currentUserUid = auth.currentUser.uid;
    setAnnouncementData({ ...announcementData, user_id: currentUserUid });
    console.log(auth.currentUser.uid);
    console.log(announcementData);
  };

  //  A form where we can input the announcement title and announcement description
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        Create an announcement
        <input
          type="text"
          placeholder="Enter the announcement title"
          onChange={(e) =>
            setAnnouncementData({ ...announcementData, title: e.target.value })
          }
        />
        <textarea
          type="text"
          placeholder="Enter the announcement description"
          onChange={(e) =>
            setAnnouncementData({
              ...announcementData,
              description: e.target.value,
            })
          }
        />
        <button type="submit" onClick={handleCreateAnnouncement}>
          Create Announcement
        </button>
        <button type="submit" onClick={updateAnnouncement}>
          Update Announcement
        </button>
      </form>
    </div>
  );
};

export default Announcement;
