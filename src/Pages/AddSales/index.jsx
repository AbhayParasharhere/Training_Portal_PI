import React from "react";
import styles from "./styles.module.scss";
import storeSalesDetails from "../../Firebase/salesDataAddition";

export default function AddSales() {
  const [formValues, setFormValues] = React.useState({
    name: "",
    policySold: false,
    soldDate: "",
    expiryDate: "",
    policyDetails: "",
    personalNotes: "",
    status: "",
    soldTo: "client1",
  });
  function storeDetails() {
    storeSalesDetails("1243546", formValues);
  }
  function handleChange(event) {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }
  return (
    <div className={styles["addSales--main-container"]}>
      <div>
        Client Details
        <div>
          <select>
            <option>Client 1</option>
            <option>Client 2</option>
            <option>Client 3</option>
            <option>Client 4</option>
          </select>
          <button>Add a new client</button>
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
    </div>
  );
}
