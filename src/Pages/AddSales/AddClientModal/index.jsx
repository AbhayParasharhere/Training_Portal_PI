import React, { useState } from "react";
import { Modal } from "antd";
import styles from "./styles.module.scss";
const AddClientModal = (props) => {
  //   const [loading, setLoading] = useState(false);

  function handleChange(event) {
    props.setClientForm({
      ...props.clientForm,
      [event.target.name]: event.target.value,
    });
    console.log(props.clientForm);
  }
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    props.setOpen(false);
  };
  return (
    <>
      <Modal
        open={props.open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[<button onClick={handleCancel}>Submit</button>]}
      >
        <div className={styles["clientModal--main-container"]}>
          <input
            placeholder="Enter Client Name"
            name="name"
            onChange={handleChange}
          />
          <input
            placeholder="Enter Client Email"
            name="email"
            onChange={handleChange}
          />
          <input
            placeholder="Enter Client Phone Number"
            name="phone_number"
            onChange={handleChange}
          />
          <input
            placeholder="Enter Client DOB"
            type="date"
            name="DOB"
            onChange={handleChange}
          />
        </div>
      </Modal>
    </>
  );
};
export default AddClientModal;
