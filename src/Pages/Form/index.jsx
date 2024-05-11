import React, { useState } from "react";
import styles from "./styles.module.scss";
import profile from "./Images/profile.png";
import arrow_down from "./Images/arrow_down.png";
import arrow_up from "./Images/arrow_up.png";
import { useOutletContext } from "react-router-dom";

export default function ClientInfo() {
  const clientData = useOutletContext();
  console.log("client data: ", clientData?.updatedClientData);
  // console.log("This is the client data", clientData?.clientData);
  const [arrowDropdown, setArrowDropdown] = useState(false);
  const [dropdownGender, setDropdownGender] = useState("Male");

  const handleInputData = () => {
    clientData?.setUpdatedClientData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
    console.log(clientData?.updatedClientData);
  };
  return (
    <div className={styles["clientDetail--main-container"]}>
      <div className={styles["clientDetail--details-input-container"]}>
        <div className={styles["clientDetail--client-image-container"]}>
          <img src={profile} className={styles["clientDetail--client-image"]} />
        </div>
        <div className={styles["clientDetail--input-grid"]}>
          <div className={styles["clientDetail--input-column"]}>
            <div className={styles["clientDetail--input-text-container"]}>
              <p className={styles["clientDetail--input-text"]}>Full Name</p>
              <input
                className={styles["clientDetail--input"]}
                name="name"
                onChange={handleInputData}
                value={clientData?.updatedClientData?.name}
              />
            </div>
            <div className={styles["clientDetail--input-column-part-2"]}>
              {" "}
              {/*To be made display none for mobile design */}
              <div className={styles["clientDetail--input-text-container"]}>
                <p className={styles["clientDetail--input-text"]}>Gender</p>
                <div
                  className={styles["clientDetail--gender-dropdown"]}
                  onClick={() => setArrowDropdown((prev) => !prev)}
                >
                  {clientData?.updatedClientData?.gender}
                  <img
                    className={styles["clientDetail--arrow-icon"]}
                    src={arrowDropdown ? arrow_up : arrow_down}
                  />
                  <div
                    className={
                      styles["clientDetail--gender-dropdown-option-container"]
                    }
                    style={{ display: arrowDropdown ? "flex" : "none" }}
                  >
                    <div
                      className={styles["clientDetail--option-text"]}
                      onClick={() =>
                        clientData?.setUpdatedClientData({ gender: "Male" })
                      }
                    >
                      Male
                    </div>
                    <div
                      className={styles["clientDetail--option-text"]}
                      onClick={() =>
                        clientData?.setUpdatedClientData({ gender: "Female" })
                      }
                    >
                      Female
                    </div>
                    <div
                      className={styles["clientDetail--option-text"]}
                      onClick={() =>
                        clientData?.setUpdatedClientData({ gender: "Other" })
                      }
                    >
                      Other
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["clientDetail--input-text-container"]}>
                <p className={styles["clientDetail--input-text"]}>
                  Email Address
                </p>
                <input
                  className={styles["clientDetail--input"]}
                  name="email"
                  onChange={handleInputData}
                  value={clientData?.updatedClientData?.email}
                />
              </div>
              <div className={styles["clientDetail--input-text-container"]}>
                <p className={styles["clientDetail--input-text"]}>
                  Phone Number
                </p>
                <input
                  className={styles["clientDetail--input"]}
                  name="phone_number"
                  onChange={handleInputData}
                  value={clientData?.updatedClientData?.phone_number}
                />
              </div>
              <div className={styles["clientDetail--input-text-container"]}>
                <p className={styles["clientDetail--input-text"]}>
                  Local Address
                </p>
                <input
                  className={styles["clientDetail--input"]}
                  style={{ height: "60px" }}
                  name="address"
                  onChange={handleInputData}
                  value={clientData?.updatedClientData?.address}
                />
              </div>
              <div className={styles["clientDetail--input-text-container"]}>
                <p className={styles["clientDetail--input-text"]}>
                  Date of birth
                </p>
                <input
                  className={styles["clientDetail--input"]}
                  type="date"
                  name="DOB"
                  onChange={handleInputData}
                  value={clientData?.updatedClientData?.DOB}
                />
              </div>
              <div
                className={
                  styles[
                    "clientDetail--input-text-container-anniversary-mobile"
                  ]
                }
              >
                <p className={styles["clientDetail--input-text"]}>
                  Anniversary
                </p>
                <input
                  className={styles["clientDetail--input"]}
                  type="date"
                  name="anniversary"
                  onChange={handleInputData}
                  value={clientData?.updatedClientData?.anniversary}
                />
              </div>
            </div>
          </div>
          <div className={styles["clientDetail--input-column-anniversary"]}>
            <div className={styles["clientDetail--input-text-container"]}>
              <p className={styles["clientDetail--input-text"]}>Anniversary</p>
              <input
                className={styles["clientDetail--input"]}
                type="date"
                name="anniversary"
                onChange={handleInputData}
                value={clientData?.updatedClientData?.anniversary}
              />
            </div>
          </div>
        </div>
      </div>
      {/*For mobile design */}
      <div className={styles["clientDetail--mobile-input-bottom-container"]}>
        {" "}
        <div className={styles["clientDetail--input-column"]}>
          {" "}
          <div className={styles["clientDetail--input-text-container"]}>
            <p className={styles["clientDetail--input-text"]}>Gender</p>
            <div
              className={styles["clientDetail--gender-dropdown"]}
              onClick={() => setArrowDropdown((prev) => !prev)}
            >
              {clientData?.updatedClientData?.gender}
              <img
                className={styles["clientDetail--arrow-icon"]}
                src={arrowDropdown ? arrow_up : arrow_down}
              />
              <div
                className={
                  styles["clientDetail--gender-dropdown-option-container"]
                }
                style={{ display: arrowDropdown ? "flex" : "none" }}
              >
                <div
                  className={styles["clientDetail--option-text"]}
                  onClick={() =>
                    clientData?.setUpdatedClientData({ gender: "Male" })
                  }
                >
                  Male
                </div>
                <div
                  className={styles["clientDetail--option-text"]}
                  onClick={() =>
                    clientData?.setUpdatedClientData({ gender: "Female" })
                  }
                >
                  Female
                </div>
                <div
                  className={styles["clientDetail--option-text"]}
                  onClick={() =>
                    clientData?.setUpdatedClientData({ gender: "Other" })
                  }
                >
                  Other
                </div>
              </div>
            </div>
          </div>
          <div className={styles["clientDetail--input-text-container"]}>
            <p className={styles["clientDetail--input-text"]}>Email Address</p>
            <input
              className={styles["clientDetail--input"]}
              name="email"
              onChange={handleInputData}
              value={clientData?.updatedClientData?.email}
            />
          </div>
          <div className={styles["clientDetail--input-text-container"]}>
            <p className={styles["clientDetail--input-text"]}>Phone Number</p>
            <input
              className={styles["clientDetail--input"]}
              name="phone_number"
              onChange={handleInputData}
              value={clientData?.updatedClientData?.phone_number}
            />
          </div>
          <div className={styles["clientDetail--input-text-container"]}>
            <p className={styles["clientDetail--input-text"]}>Local Address</p>
            <input
              className={styles["clientDetail--input"]}
              style={{ height: "60px" }}
              name="address"
              onChange={handleInputData}
              value={clientData?.updatedClientData?.address}
            />
          </div>
          <div className={styles["clientDetail--input-text-container"]}>
            <p className={styles["clientDetail--input-text"]}>Date of birth</p>
            <input
              className={styles["clientDetail--input"]}
              type="date"
              name="DOB"
              onChange={handleInputData}
              value={clientData?.updatedClientData?.DOB}
            />
          </div>
          <div
            className={
              styles["clientDetail--input-text-container-anniversary-mobile"]
            }
          >
            <p className={styles["clientDetail--input-text"]}>Anniversary</p>
            <input
              className={styles["clientDetail--input"]}
              type="date"
              name="anniversary"
              onChange={handleInputData}
              value={clientData?.updatedClientData?.anniversary}
            />
          </div>
        </div>
      </div>
      <div className={styles["clientDetail--personal-notes-container"]}>
        <p className={styles["clientDetail--personal-notes-title"]}>
          Personal Notes
        </p>
        <textarea
          className={styles["clientDetail--personal-notes-input"]}
          name="personal_notes"
          onChange={handleInputData}
          value={clientData?.updatedClientData?.personal_notes}
        />
      </div>
    </div>
  );
}
