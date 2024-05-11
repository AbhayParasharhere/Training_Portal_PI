import React from "react";
import styles from "./styles.module.scss";
import { useOutletContext } from "react-router-dom";

export default function ClientGoals() {
  const clientData = useOutletContext();
  console.log("client data: ", clientData?.updatedClientData);
  const handleGoalsChange = (event) => {
    clientData?.setUpdatedClientData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  return (
    <div className={styles["clientGoals--main-container"]}>
      <p className={styles["clientGoals--title"]}>Client Financial Goals</p>
      <textarea
        className={styles["clientGoals--input"]}
        name="financial_goals"
        value={clientData?.updatedClientData?.financial_goals}
        onChange={(event) => handleGoalsChange(event)}
      />
    </div>
  );
}
