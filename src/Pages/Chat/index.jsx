import React, { useContext, useMemo, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import {
  checkChatExist,
  createNewChat,
  createUserChats,
  searchUser,
  updateUserChat,
  getCurrentUser,
  getUserChats,
  saveMessage,
  getAllMessages,
} from "../../Firebase/chat";
import { AuthContext } from "../../context/authContext";
import { CurrentUserContext } from "../../context/currentUserContext";

export default function Chat() {
  const [searchUserName, setSearchUserName] = useState("");
  const [user, setUser] = useState();
  const [allChats, setAllChats] = useState();
  const [message, setMessage] = useState();
  const [allMessages, setAllMessages] = useState([]);
  const [chatUserDetails, setChatUserDetails] = useState({
    displayName: "User Name",
    id: "User id",
  });

  const currentUser = useContext(AuthContext);
  const currentUserDetails = useContext(CurrentUserContext);

  const userChat = () => {
    createUserChats(currentUser?.uid);
  };

  useEffect(() => {
    setSearchUserName("");
    setUser();
    setAllChats();
    setMessage();
    setAllMessages([]);
    setChatUserDetails({
      displayName: "User Name",
      id: "User id",
    });
  }, [currentUser]);

  useEffect(() => {
    currentUser?.uid && getUserChats(currentUser.uid, setAllChats); // This gets all the chats that the current user has

    //NOTE- We are getting all the chats in an object of objects, Then to iterate through it we convert the key value pairings into an array using Object.entries
  }, [currentUser?.uid]);
  const handleSearch = async () => {
    //Searching for the user, we want tos chat with
    await searchUser(searchUserName, setUser); //Storing all the info of all the matching users in a state of array
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
        console.log("After updating currentt user chat");

        const otherUserChat = await updateUserChat(
          id,
          combinedId,
          currentUser?.uid,
          currentUserDetails?.name
        );
        console.log("After updating other  user chat");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const renderChat = (displayName, id) => {
    setChatUserDetails({
      ...chatUserDetails,
      displayName: displayName,
      id: id,
    });
    console.log("These are the details fo chat user", chatUserDetails);
  };

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleSaveMessage = async () => {
    if (!message) {
      console.log("Cannot store empty string");
      return;
    }
    const savingResponse = await saveMessage(
      message,
      chatUserDetails.id,
      currentUser?.uid
    );

    console.log(
      "The response after calling save message function: ",
      savingResponse
    );
    setMessage("");
  };

  useEffect(() => {
    console.log("All the messages: ", allMessages);
    chatUserDetails.id !== "User id" &&
      getAllMessages(chatUserDetails.id, setAllMessages);
  }, [chatUserDetails]);
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
        value={searchUserName}
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
      <div style={{ marginTop: 40, height: 600, display: "flex", gap: 40 }}>
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {allChats &&
            Object.entries(allChats)?.map((chats) => {
              return (
                <div
                  key={chats[0]}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    height: 100,
                    backgroundColor: "white",
                    cursor: "pointer",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    renderChat(chats[1].userInfo.displayName, chats[0]);
                  }}
                >
                  <p>{chats[0]}</p>
                  <p>{chats[1].userInfo.displayName}</p>
                </div>
              );
            })}
        </div>
        <div
          style={{
            flex: 2,

            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            <p>{chatUserDetails.displayName}</p>
            <p>{chatUserDetails.id}</p>
          </div>

          <div
            style={{
              maxHeight: "500px",
              overflowY: "scroll",
              overflowX: "hidden",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {allMessages?.messages?.map((chat) => {
              return (
                <div
                  style={{
                    minWidth: "200px",
                    maxWidth: "250px",
                    backgroundColor:
                      chat.userId === currentUser.uid ? "white" : "grey",
                    color: chat.userId === currentUser.uid ? "black" : "white",
                    marginBottom: "20px",
                    alignSelf:
                      chat.userId === currentUser.uid
                        ? "flex-end"
                        : "flex-start",
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <p>{chat.message}</p>
                </div>
              );
            })}
          </div>

          <div
            style={{
              width: "100%",
              justifySelf: "end",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "flex-end",
              gap: 20,
            }}
          >
            <input
              style={{ width: 400, height: 30 }}
              placeholder="Enter Your Message"
              value={message}
              onChange={handleMessage}
            />
            <button onClick={handleSaveMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
