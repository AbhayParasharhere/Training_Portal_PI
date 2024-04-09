import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import { createUserChats } from "../../Firebase/chat";
import { AuthContext } from "../../context/authContext";
// import { storeMessages } from "../../Firebase/chat";

export default function Chat() {
  const [message, setMessage] = useState("");
  console.log(message);
  const currentUser = useContext(AuthContext);
  const userChat = () => {
    createUserChats();
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
        placeholder="Enter your message"
        onChange={(event) => {
          setMessage(event.target.value);
          //   console.log(setMessage);
        }}
      />
      <button>Send</button>
      <button
        style={{ marginTop: "40px", maxWidth: "200px" }}
        onClick={userChat}
      >
        Create User Chat doc
      </button>
    </div>
  );
}
