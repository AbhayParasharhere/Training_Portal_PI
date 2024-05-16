import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Modal } from "antd";
const BirthdayModal = ({
  birthdayOpen,
  setBirthdayOpen,
  renderClientEvent,
  upcomingEvents,
}) => {
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setBirthdayOpen(false);
  };
  return (
    <>
      <Modal
        open={birthdayOpen}
        title={
          upcomingEvents
            ? "Upcoming Birthdays & Anniversaries"
            : "No Upcoming Birthdays and Anniversaries"
        }
        onOk={handleOk}
        centered={true}
        onCancel={handleCancel}
        footer={null}
      >
        {upcomingEvents ? (
          renderClientEvent
        ) : (
          <div className={styles["home--no-data"]}></div>
        )}{" "}
      </Modal>
    </>
  );
};
export default BirthdayModal;
