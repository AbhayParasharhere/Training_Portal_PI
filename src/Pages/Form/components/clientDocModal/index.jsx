import React, { useContext, useState } from "react";
import { Button as AntButton, Modal, Upload, Input, Tooltip } from "antd";
import uploadIcon from "./images/upload-icon-black.png";

import styles from "./styles.module.scss";
import { addClientDocument } from "../../../../Firebase/updateSalesClients";
import { AuthContext } from "../../../../context/authContext";
const ClientDocumentModal = ({ open, setOpen, clientId }) => {
  console.log("client ID: ", clientId);
  const [loading, setLoading] = useState(false);
  const currentUser = useContext(AuthContext);
  const [document, setDocument] = useState();

  //   const showModal = () => {
  //     setOpen(true);
  //   };

  const uploadDocument = async () => {
    try {
      setLoading(true);
      console.log(
        "Data being uploaded: ",
        document?.file,
        document?.name,
        clientId,
        currentUser?.uid
      );
      await addClientDocument(
        document?.file,
        document?.name,
        clientId,
        currentUser?.uid
      );
      setLoading(false);
      setOpen(false);
      setDocument(null);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal open={open} centered={true} onCancel={handleCancel} footer={null}>
        <div className={styles["clientModal--main-container"]}>
          <p className={styles["clientModal--title"]}>Upload Documents</p>
          <div className={styles["clientModal--upload-container"]}>
            <p className={styles["clientModal--upload-text"]}>
              Choose from computer
            </p>
            <Upload
              onChange={(info) => {
                console.log("Info: ", info.file, info);
                setDocument({ file: info.file, name: info.file.name });
              }}
              className={styles["clientModal--upload-input"]}
              beforeUpload={() => false}
              maxCount={1}
            >
              <div className={styles["clientModal--upload-inner-container"]}>
                <img
                  src={uploadIcon}
                  className={styles["clientModal--upload-icon"]}
                />
                Select Document
              </div>
            </Upload>
            <input
              className={styles["clientModal--file-name-input"]}
              placeholder="File Name"
              value={document?.name}
              onChange={(e) =>
                setDocument((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
            />

            <button
              className={styles["clientModal--upload-input-button"]}
              onClick={uploadDocument}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ClientDocumentModal;
