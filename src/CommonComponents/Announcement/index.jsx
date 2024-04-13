import { useContext, useState, useEffect } from "react";
import { auth } from "../../Firebase/firebaseConfig";
import {
  createAnnouncement,
  getAllUserAnnouncements,
  getAllAnnouncementsSortedByUpdatedAtDescending,
  updateAnnouncement,
  deleteAnnouncement,
} from "../../Firebase/announcementLogic";
import { AuthContext } from "../../context/authContext";

// Fix bug of id not being set when user logs in after the component is mounted
const Announcement = () => {
  const [announcementData, setAnnouncementData] = useState({});
  const [announcementID, setAnnouncementID] = useState("");
  const currentUser = useContext(AuthContext);
  const [userID, setUserID] = useState("");

  // Update announcementData when currentUser changes
  useEffect(() => {
    setAnnouncementData((prev) => ({
      ...prev,
      user_id: currentUser?.uid,
    }));
  }, [currentUser]);

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    console.log("Announcement Data", announcementData);
    const res = await createAnnouncement(announcementData);
    console.log("Announcement Created", res);
  };

  const handleGetAllUserAnnouncements = async (e) => {
    e.preventDefault();
    const res = await getAllUserAnnouncements(currentUser?.uid);
    console.log(
      "All User Announcements for uid ",
      currentUser.uid,
      " are ",
      res
    );
  };

  const handleGetAllAnnouncements = async (e) => {
    e.preventDefault();
    const res = await getAllAnnouncementsSortedByUpdatedAtDescending();
    console.log("All Announcements are ", res);
  };

  const handleUpdateAnnouncement = async (e) => {
    e.preventDefault();

    // Remove user_id from announcementData
    const updatedAnnouncementData = { ...announcementData };
    delete updatedAnnouncementData?.user_id;
    console.log("Updated Announcement Data", updatedAnnouncementData);

    const res = await updateAnnouncement(
      announcementID,
      updatedAnnouncementData
    );
    console.log("Announcement Updated", res);
  };

  const handleDeleteAnnouncement = async (e) => {
    e.preventDefault();
    await deleteAnnouncement(announcementID);
    console.log("Announcement Deleted");
  };
  //  A form where we can input the announcement title and announcement description
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <h2>Create an Announcement</h2>
        <input
          type="text"
          placeholder="Enter the announcement title"
          value={announcementData.title}
          onChange={(e) =>
            setAnnouncementData({ ...announcementData, title: e.target.value })
          }
        />
        <textarea
          type="text"
          placeholder="Enter the announcement description"
          value={announcementData.description}
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
        <h2>Ancillary Functions</h2>
        <input
          type="text"
          value={userID}
          placeholder="Enter the user id"
          onChange={(e) => setUserID(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            console.log("Current User ID", currentUser?.uid);
            setUserID(currentUser?.uid);
          }}
        >
          Prefill user ID to current uuid
        </button>
        <button type="submit" onClick={handleGetAllUserAnnouncements}>
          {" "}
          Get All User Announcements in Console
        </button>
        <button type="submit" onClick={handleGetAllAnnouncements}>
          {" "}
          Get All Announcements in Console
        </button>
        <h2>Update Announcement</h2>
        <input
          type="text"
          placeholder="Enter the announcement id"
          onChange={(e) => setAnnouncementID(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the announcement title"
          value={announcementData.title}
          onChange={(e) =>
            setAnnouncementData({ ...announcementData, title: e.target.value })
          }
        />
        <textarea
          type="text"
          placeholder="Enter the announcement description"
          value={announcementData.description}
          onChange={(e) =>
            setAnnouncementData({
              ...announcementData,
              description: e.target.value,
            })
          }
        />
        <button type="submit" onClick={handleUpdateAnnouncement}>
          Update Announcement
        </button>
        <h2>Delete Announcement</h2>
        <input
          type="text"
          placeholder="Enter the announcement id"
          onChange={(e) => setAnnouncementID(e.target.value)}
        />
        <button type="submit" onClick={handleDeleteAnnouncement}>
          {" "}
          Delete Announcement{" "}
        </button>
      </form>
    </div>
  );
};

export default Announcement;
