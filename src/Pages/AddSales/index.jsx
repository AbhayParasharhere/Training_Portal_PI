import React, { useMemo, useState } from "react";
import styles from "./styles.module.scss";
import storeSalesDetails from "../../Firebase/salesDataAddition";
import AddClientModal from "./AddClientModal";
import {
  storeClientsDetails,
  getAllClients,
} from "../../Firebase/clientDataAddition";

export default function AddSales() {
  const [formValues, setFormValues] = useState({
    name: "",
    policySold: false,
    soldDate: "",
    expiryDate: "",
    policyDetails: "",
    personalNotes: "",
    status: "",
  });
  const [allClients, setAllClients] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientForm, setClientForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    DOB: "",
  });
  useMemo(() => {
    getAllClients(setAllClients);
  }, []);
  console.log(allClients);

  const [open, setOpen] = useState(false);
  const uid = "user5";
  const showModal = () => {
    setOpen(true);
  };

  async function storeDetails() {
    setClientId(`${clientForm.email}` + "_" + `${clientForm.phone_number}`);
    const clientResponse = await storeClientsDetails(uid, clientId, clientForm);
    console.log("This is the client response: ", clientResponse);

    const saleResponse = await storeSalesDetails(uid, formValues, clientId);
    console.log("This is the sale response: ", saleResponse);
  }

  function handleChange(event) {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }

  const clientOptions = allClients.map((client) => {
    return (
      <option>
        {client.name} {client.email}
      </option>
    );
  });
  return (
    <div className={styles["addSales--main-container"]}>
      <div className={styles["addSales--client-form-container"]}>
        <p> Client Details</p>
        <div>
          <select>{clientOptions}</select>
          <button onClick={showModal}>Add a new client</button>
        </div>
      </div>
      <div>
        <input placeholder="Policy Name" name="name" onChange={handleChange} />
        <select
          name="policySold"
          placeholder="policy Sold"
          onChange={handleChange}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <input
          placeholder="Sold Date"
          name="soldDate"
          onChange={handleChange}
        />
        <input
          placeholder="Expiry date"
          name="expiryDate"
          onChange={handleChange}
        />
        <input
          placeholder="Policy details"
          name="policyDetails"
          onChange={handleChange}
        />
        <input
          placeholder="Notes"
          name="personalNotes"
          onChange={handleChange}
        />
        <input
          placeholder="Sales Status"
          name="staus"
          onChange={handleChange}
        />
        <button onClick={storeDetails}>Submit</button>
      </div>
      <AddClientModal
        open={open}
        setOpen={setOpen}
        clientForm={clientForm}
        setClientForm={setClientForm}
      />
    </div>
  );
}
