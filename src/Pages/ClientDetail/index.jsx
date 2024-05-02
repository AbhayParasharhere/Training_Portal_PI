import React, { useContext } from "react";
import styles from "./styles.module.scss";
import ClientTopbar from "../../CommonComponents/ClientTopbar";
import { Outlet, useParams } from "react-router-dom";
import { PrimaryDataContext } from "../../context/primaryDataContext";
export default function ClientData() {
  const { clientId } = useParams();
  console.log("This is the id: ", clientId);

  const primaryContextData = useContext(PrimaryDataContext);
  console.log(primaryContextData);
  const clientData = primaryContextData?.clients?.filter(
    (client) => client.id === clientId
  );
  console.log("This is the data for the client: ", clientData);
  return (
    <div className={styles["clientData--main-container"]}>
      <ClientTopbar clientId={clientId} />
      <Outlet context={{ clientData: clientData?.[0] }} />
    </div>
  );
}
