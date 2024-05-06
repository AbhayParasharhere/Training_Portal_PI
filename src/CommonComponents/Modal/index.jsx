import React, { useState } from "react";
import { Modal } from "antd";
import Meet from "../Meet";
import "./styles.module.css";
const ModalComponent = ({ modalOpen, setModalOpen }) => {
  return (
    <>
      <Modal
        centered
        open={modalOpen}
        className={"modal"}
        footer={null}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <Meet setModalOpen={setModalOpen} />
      </Modal>
    </>
  );
};
export default ModalComponent;
