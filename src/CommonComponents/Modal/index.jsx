import React from "react";
import { Modal } from "antd";
import Meet from "../Meet";
const ModalComponent = ({ modalOpen, setModalOpen }) => {
  return (
    <>
      <Modal
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <Meet />
      </Modal>
    </>
  );
};
export default ModalComponent;
