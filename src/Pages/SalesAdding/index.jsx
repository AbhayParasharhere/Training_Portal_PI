import React, { useState } from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import ClientDetails from "./components/ClientDetails";
import SalesDetails from "./components/SalesDetails";

export default function SalesAdding() {
  const [displayComponent, setDisplayComponent] = useState("client");
  const [clientId, setClientId] = useState("");
  const [dropdownValue, setDropdownValue] = useState();
  const [clientDetails, setClientDetails] = useState({
    client_gender: dropdownValue || "",
    client_name: "",
    client_address: "",
    client_number: "",
    client_DOB: "",
    client_anniversary: "",
    client_email: "",
  });
  const [clientDropdownValue, setClientDropdownValue] = useState("");
  return (
    <div className={styles["salesAdding--main-container"]}>
      {displayComponent === "sales" ? (
        <SalesDetails
          setDisplayComponent={setDisplayComponent}
          clientId={clientId}
        />
      ) : (
        <ClientDetails
          setDisplayComponent={setDisplayComponent}
          setClientId={setClientId}
          clientDetails={clientDetails}
          setClientDetails={setClientDetails}
          dropdownValue={dropdownValue}
          setDropdownValue={setDropdownValue}
          clientDropdownValue={clientDropdownValue}
          setClientDropdownValue={setClientDropdownValue}
        />
      )}
    </div>
  );
}
