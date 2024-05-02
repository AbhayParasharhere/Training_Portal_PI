import React, { useState } from "react";
import styles from "./styles.module.scss";
import ModalComponent from "../../CommonComponents/Modal";

export default function ClientTopbar() {
  function SaveChanges() {
    console.log("Save Changes");
  }

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className={styles["ClientInfo-wrapper-topbar"]}>
      <div className={styles["ClientInfo-wrapper-topbar-div"]}>
        <div className={styles["ClientInfo-wrapper-topbar-text"]}>
          Client Information
        </div>
        <div className={styles["ClientInfo-wrapper-topbar-text"]}>
          Purchased Policies
        </div>
        <div className={styles["ClientInfo-wrapper-topbar-text"]}>
          Financial Goals
        </div>
      </div>
      <div className={styles["ClientInfo-wrapper-topbar-buttons"]}>
        <button
          className={styles["ClientInfo-wrapper-topbar-buttons-save"]}
          onClick={SaveChanges}
        >
          Save Changes
        </button>
        <button
          className={styles["ClientInfo-wrapper-topbar-buttons-meet"]}
          onClick={() => setModalOpen(true)}
        >
          Organize Meet
        </button>
      </div>
      <ModalComponent modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}
