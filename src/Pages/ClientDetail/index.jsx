import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import ClientTopbar from "../../CommonComponents/ClientTopbar";
import { Outlet, useParams } from "react-router-dom";
import {
  PrimaryDataContext,
  RealTimeDataContext,
} from "../../context/primaryDataContext";
import { AuthContext } from "../../context/authContext";
import SalesUpdate from "../PurchasedPolicy/components/salesUpdate";

export default function ClientData() {
  const { clientId } = useParams();
  // const primaryContextData = useContext(PrimaryDataContext);
  const realTimeData = useContext(RealTimeDataContext);
  const clientData = realTimeData?.clients?.filter(
    (client) => client.id === clientId
  )?.[0];
  const [updatedClientData, setUpdatedClientData] = useState({
    ...clientData,
  });
  const salesData = realTimeData?.sales;
  // const currentUser = useContext(AuthContext);
  const filteredSales = salesData?.filter((sales) => sales?.cid === clientId);
  const [salesUpdate, setSalesUpdate] = useState({ status: false, id: "" });

  return (
    <div className={styles["clientData--main-container"]}>
      {salesUpdate.status ? (
        <SalesUpdate
          salesUpdate={salesUpdate}
          filteredSales={filteredSales}
          setSalesUpdate={setSalesUpdate}
        />
      ) : (
        <>
          <ClientTopbar
            clientId={clientId}
            updatedClientData={updatedClientData}
          />
          <Outlet
            context={{
              clientData: clientData,
              filteredSales: filteredSales,
              setSalesUpdate: setSalesUpdate,
              setUpdatedClientData: setUpdatedClientData,
              updatedClientData: updatedClientData,
            }}
          />
        </>
      )}
    </div>
  );
}
