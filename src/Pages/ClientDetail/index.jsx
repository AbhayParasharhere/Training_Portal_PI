import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import ClientTopbar from "../../CommonComponents/ClientTopbar";
import { Outlet, useParams } from "react-router-dom";
import { PrimaryDataContext } from "../../context/primaryDataContext";
import { AuthContext } from "../../context/authContext";
import SalesUpdate from "../PurchasedPolicy/components/salesUpdate";

export default function ClientData() {
  const { clientId } = useParams();
  const primaryContextData = useContext(PrimaryDataContext);
  const clientData = primaryContextData?.clients?.filter(
    (client) => client.id === clientId
  );
  const salesData = primaryContextData?.sales;
  const currentUser = useContext(AuthContext);
  const filteredSales = salesData?.filter(
    (sales) => sales?.cid === clientId && sales?.uid === currentUser?.uid
  );
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
          <ClientTopbar clientId={clientId} />
          <Outlet
            context={{
              clientData: clientData?.[0],
              filteredSales: filteredSales,
              setSalesUpdate: setSalesUpdate,
            }}
          />
        </>
      )}
    </div>
  );
}
