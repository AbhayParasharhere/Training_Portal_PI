import React, { useContext, useState } from "react";
import ModalComponent from "../../CommonComponents/Modal";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { PrimaryDataContext } from "../../context/primaryDataContext";
import { updateClient } from "../../Firebase/updateSalesClients";
import { toast } from "react-toastify";

export default function ClientTopbar(props) {
  function SaveChanges() {
    console.log("Save Changes");
  }

  const [modalOpen, setModalOpen] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleUpdateClient = () => {
    // if (!props.updateClientData || !props.clientId) {
    //   toast.error("An error occured");
    // }
    if (
      props.updatedClientData.name === "" ||
      props.updatedClientData.gender === "" ||
      props.updatedClientData.email === "" ||
      props.updatedClientData.phone_number === "" ||
      props.updatedClientData.address === ""
    ) {
      toast.error("Fill the requirements");
      return;
    } else {
      if (!validateEmail(props.updatedClientData.email)) {
        toast.error("Invalid email format.");
        return;
      } else if (props.updatedClientData.phone_number.length !== 10) {
        toast.error("Invalid phone number format.");
        return;
      }
    }
    updateClient(props.updatedClientData, props.clientId);
  };
  const activeStyles = { color: "#123c97", borderColor: "#123c97" };

  return (
    <div className={styles["ClientInfo-wrapper-topbar"]}>
      <div className={styles["ClientInfo-wrapper-topbar-div"]}>
        <NavLink
          exact={true}
          end
          to={`.`}
          style={({ isActive }) => (isActive ? activeStyles : null)}
          className={styles["ClientInfo-wrapper-topbar-text"]}
        >
          Client Information
        </NavLink>
        <NavLink
          exact={true}
          to={`/client-detail/${props.clientId}/policies`}
          style={({ isActive }) => (isActive ? activeStyles : null)}
          className={styles["ClientInfo-wrapper-topbar-text"]}
        >
          Purchased Policies
        </NavLink>
        <NavLink
          exact={true}
          to={`/client-detail/${props.clientId}/goals`}
          style={({ isActive }) => (isActive ? activeStyles : null)}
          className={styles["ClientInfo-wrapper-topbar-text"]}
        >
          Financial Goals
        </NavLink>
      </div>
      <div className={styles["ClientInfo-wrapper-topbar-buttons"]}>
        <button
          className={styles["ClientInfo-wrapper-topbar-buttons-save"]}
          onClick={() => handleUpdateClient()}
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
