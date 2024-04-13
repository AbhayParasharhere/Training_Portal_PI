import React, { useContext, useState, useEffect, useMemo } from "react";
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
  const [user, setUser] = useState(null);
  const [allChats, setAllChats] = useState(null);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [chatUserDetails, setChatUserDetails] = useState({
    displayName: "User Name",
    id: "User id",
  });

  const currentUser = useContext(AuthContext);
  const currentUserDetails = useContext(CurrentUserContext);

  console.log("Current user details: ", currentUserDetails);

  useEffect(() => {
    if (currentUser?.uid) {
      const unsubscribe = getUserChats(currentUser.uid, setAllChats);
      // return () => {
      //   if (unsubscribe) {
      //     console.log("Unsubscribing working", unsubscribe);
      //   }
      // };
    }
  }, [currentUser?.uid]);

  useEffect(() => {
    setSearchUserName("");
    setUser(null);
    setMessage("");
    setAllMessages([]);
    setChatUserDetails({
      displayName: "User Name",
      id: "User id",
    });
  }, [currentUser]);

  const handleSearch = async () => {
    if (searchUserName.trim() !== "") {
      await searchUser(searchUserName, setUser);
    }
  };

  const handleSelect = async (id, name) => {
    const combinedId =
      currentUser?.uid > id ? currentUser?.uid + id : id + currentUser?.uid;

    try {
      if (!combinedId || !id || !name || !currentUser) {
        return;
      }

      const chat = await checkChatExist(combinedId);

      if (!chat.exists()) {
        await Promise.all([
          createNewChat(combinedId),
          updateUserChat(currentUser?.uid, combinedId, id, name),
          updateUserChat(
            id,
            combinedId,
            currentUser?.uid,
            currentUserDetails?.name
          ),
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleSaveMessage = async () => {
    if (message.trim() !== "") {
      await saveMessage(message, chatUserDetails.id, currentUser?.uid);
      setMessage("");
    }
  };

  useEffect(() => {
    if (chatUserDetails.id !== "User id") {
      const unsubscribe = getAllMessages(chatUserDetails.id, setAllMessages);
      return () => {
        //   if (unsubscribe) {
        //     console.log("Unbscribing for messages ", unsubscribe);
        //   }
        // };
        unsubscribe();
      };
    }
  }, [chatUserDetails]);

  const renderChat = (displayName, id) => {
    setChatUserDetails({
      ...chatUserDetails,
      displayName: displayName,
      id: id,
    });
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
        onKeyDown={(e) => e.code === "Enter" && handleSearch()}
        value={searchUserName}
        onChange={(event) => setSearchUserName(event.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {user?.map((user) => (
        <div
          key={user.id}
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
      ))}

      <button
        style={{ marginTop: "40px", maxWidth: "200px" }}
        onClick={() => createUserChats(currentUser?.uid)}
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
            Object.entries(allChats)?.map(([id, chat]) => (
              <div
                key={id}
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
                onClick={() => renderChat(chat.userInfo?.displayName, id)}
              >
                <p>{id}</p>
                <p>{chat.userInfo?.displayName}</p>
              </div>
            ))}
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
            {allMessages?.messages?.map((chat) => (
              <div
                key={chat.id}
                style={{
                  minWidth: "200px",
                  maxWidth: "250px",
                  backgroundColor:
                    chat.userId === currentUser.uid ? "white" : "grey",
                  color: chat.userId === currentUser.uid ? "black" : "white",
                  marginBottom: "20px",
                  alignSelf:
                    chat.userId === currentUser.uid ? "flex-end" : "flex-start",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <p>{chat.message}</p>
              </div>
            ))}
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
