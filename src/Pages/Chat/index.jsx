import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import {
  checkChatExist,
  createNewChat,
  createUserChats,
  searchUser,
  updateUserChat,
} from "../../Firebase/chat";
import { AuthContext } from "../../context/authContext";
// import { storeMessages } from "../../Firebase/chat";

export default function Chat() {
  const [searchUserName, setSearchUserName] = useState("");
  const [user, setUser] = useState();
  const currentUser = useContext(AuthContext);
  const userChat = () => {
    createUserChats(currentUser?.uid);
  };

  const handleSearch = async () => {
    //Searching for the user, we want to chat with
    console.log("This worked", searchUserName);
    await searchUser(searchUserName, setUser); //Storing all the info of all the matching users in a state of array
    console.log("This is the seearched user: ", user);
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch(); //search by entering
  };

  const handleSelect = async (id, name) => {
    //When an user from the list is clicked, we get its info and make a combined id for their chat
    console.log("This is the id provided: ", id);
    const combinedId =
      currentUser?.uid > id ? currentUser?.uid + id : id + currentUser?.uid;
    console.log("This is the combined id: ", combinedId);
    try {
      const chat = await checkChatExist(combinedId);
      if (!chat.exists()) {
        const makeChat = await createNewChat(combinedId);

        const currentUserChat = await updateUserChat(
          currentUser?.uid,
          combinedId,
          id,
          name
        );
        console.log("After updating user chat: ", currentUserChat);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "lightgrey",
        padding: "40px",
      }}
    >
      <div>XYZ</div>
      <input
        placeholder="Enter User Name"
        onKeyDown={handleKey}
        onChange={(event) => {
          setSearchUserName(event.target.value);
          //   console.log(setMessage);
        }}
      />
      <button>Send</button>
      {user?.map((user) => {
        //Displaying all the matching users in a list format
        return (
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              cursor: "pointer",
            }}
            onClick={() => handleSelect(user.id, user.name)}
          >
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        );
      })}

      <button
        style={{ marginTop: "40px", maxWidth: "200px" }}
        onClick={userChat}
      >
        Create User Chat doc
      </button>
    </div>
  );
}
