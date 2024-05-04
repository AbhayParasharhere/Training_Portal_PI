import React from "react";
import { Modal } from "antd";
import Meet from "../Meet";
const ModalComponent = ({ modalOpen, setModalOpen }) => {
  return (
    <>
      <Modal
        centered
        open={modalOpen}
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
