import React, { useContext, useState } from "react";
import { Button as AntButton, Modal, Upload, Input, Tooltip } from "antd";
import {
  UploadOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { update } from "firebase/database";
import { updateNameAndPhoto } from "../../../../Firebase/updateProfile";
import { AuthContext } from "../../../../context/authContext";
import styles from "./styles.module.scss";

const ProfileChangeModal = ({ modalOpen, setModalOpen }) => {
  const currentUser = useContext(AuthContext);
  const uid = currentUser?.uid;
  const [photo, setPhoto] = useState();
  const [name, setName] = useState();
  const handleOk = () => {
    console.log("Photo: ", photo);
    console.log("Name: ", name);
    updateNameAndPhoto(uid, name, photo);
    setModalOpen(false);
  };
  console.log("Modal Open: ", modalOpen, photo, name);
  return (
    <Modal
      title={
        <span
          style={{
            fontSize: "24px",
            color: "#000",
            fontFamily: "Epilogue",
            fontWeight: "600",
          }}
        >
          Update Profile
        </span>
      }
      open={modalOpen}
      onOk={handleOk}
      onCancel={() => setModalOpen(false)}
    >
      <div className={styles["wrapper"]}>
        <div className={styles["input-wrapper"]}>
          <div className={styles["label"]}>Name: </div>
          <Input
            placeholder="Enter Name"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            suffix={
              <Tooltip title="Please enter the name that you wish to change">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles["input-wrapper"]}>
          <div className={styles["label"]}>Photo: </div>
          <Upload
            onChange={(info) => {
              console.log("Info: ", info.file, info);
              setPhoto(info.file);
            }}
            beforeUpload={() => false}
            maxCount={1}
          >
            <AntButton icon={<UploadOutlined />}>Upload Photo</AntButton>
          </Upload>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileChangeModal;
