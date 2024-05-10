import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { inviteUser } from "../../../Firebase/inviteLogic";
import {
  getTotalClientData,
  getTotalSales,
  getTotalVideosWatched,
} from "../../../Firebase/getOtherStats";

export default function InvitePeople() {
  const [userEmail, setUserEmail] = useState("");
  console.log(userEmail);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleInvite = async () => {
    if (!userEmail) {
      toast.error("Please enter a email");
      return;
    }
    if (!validateEmail(userEmail)) {
      toast.error("Please enter a valid email");
      return;
    }
    const confirmation = window.confirm(
      "Are you sure you want to invite this email?"
    );

    if (!confirmation) return;
    await inviteUser(userEmail);
    setUserEmail("");
  };

  return (
    <div className={styles["adminInvite--main-container"]}>
      <div className={styles["adminInvite--title-container"]}>
        Invite brokers to explore the exceptional features of this extranet
        platform and unlock its full potential.
      </div>
      <div className={styles["adminInvite--invite-container"]}>
        Who do you want to invite?
        <input
          className={styles["adminInvite--invite-input"]}
          placeholder="eg.-someone@gmail.com"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button
          className={styles["adminInvite--send-invite"]}
          onClick={handleInvite}
        >
          Send Invite
        </button>
      </div>
    </div>
  );
}
