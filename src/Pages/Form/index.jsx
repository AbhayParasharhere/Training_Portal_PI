import React, { useState } from "react";
import styles from "./styles.module.scss";
import profile from "./Images/profile.png";
import ClientTopbar from "../../CommonComponents/ClientTopbar";
import arrow_down from "./Images/arrow_down.png";
import arrow_up from "./Images/arrow_up.png";
import { useOutletContext } from "react-router-dom";

export default function ClientInfo() {
  const clientData = useOutletContext();
  const [arrowDropdown, setArrowDropdown] = useState(false);
  const [dropdownGender, setDropdownGender] = useState("Male");
  console.log("These are the props: ", clientData);
  return (
    // <div className={styles["ClientInfo-wrapper"]}>
    //   <div className={styles["ClientInfo-wrapper-form-main"]}>
    //     {" "}
    //     <img
    //       src={profile}
    //       className={styles["ClientInfo-wrapper-form-image"]}
    //     />
    //     <div className={styles["ClientInfo-wrapper-form"]}>
    //       <div className={styles["ClientInfo-wrapper-form-container"]}>
    //         <div className={styles["ClientInfo-wrapper-form-text"]}>
    //           {" "}
    //           <label for="name">Full Name</label>
    //           <label for="#gender">Gender</label>
    //           <label for="email">Email</label>
    //           <label for="number">Phone Number</label>
    //           <label for="address">Local Address</label>
    //           <label for="dob">Date of Birth</label>
    //         </div>
    //         <div className={styles["ClientInfo-wrapper-form-input"]}>
    //           <input
    //             type="text"
    //             name="name"
    //             className={styles["ClientInfo-wrapper-form-text-input"]}
    //             value={clientData?.clientData?.name}
    //           ></input>
    //           <div id="gender"></div>
    //           {/* <select
    //             name="gender"
    //             className={styles["ClientInfo-wrapper-form-text-input-select"]}
    //           >
    //             <option value="male">Male</option>
    //             <option value="female">Female</option>
    //           </select> */}
    //           <input
    //             type="text"
    //             name="email"
    //             className={styles["ClientInfo-wrapper-form-text-input"]}
    //             value={clientData?.clientData?.email}
    //           ></input>
    //           <input
    //             type="text"
    //             name="number"
    //             className={styles["ClientInfo-wrapper-form-text-input"]}
    //             value={clientData?.clientData?.phone_number}
    //           ></input>
    //           <input
    //             type="text"
    //             name="address"
    //             className={styles["ClientInfo-wrapper-form-text-input"]}
    //             value={clientData?.clientData?.address}
    //           ></input>
    //           <input
    //             type="date"
    //             name="dob"
    //             className={styles["ClientInfo-wrapper-form-text-input-date"]}
    //             value={clientData?.clientData?.DOB}
    //           ></input>
    //         </div>
    //       </div>
    //       <div className={styles["ClientInfo-wrapper-form-container-annv"]}>
    //         <div className={styles["ClientInfo-wrapper-form-text"]}>
    //           <label for="Annv">Anniversary</label>
    //         </div>
    //         {/* <div className={styles["ClientInfo-wrapper-form-input-date"]}> */}
    //         <input
    //           type="date"
    //           name="Annv"
    //           className={
    //             styles[
    //               ("ClientInfo-wrapper-form-text-input-date",
    //               "ClientInfo-wrapper-form-text-input-date-annv")
    //             ]
    //           }
    //           value={clientData?.clientData?.anniversary}
    //         ></input>
    //         {/* </div> */}
    //       </div>
    //     </div>
    //   </div>
    //   <div className={styles["ClientInfo-wrapper-form-notes"]}>
    //     <p className={styles["ClientInfo-wrapper-form-notes-text"]}>
    //       Personal Notes
    //     </p>
    //     <textarea
    //       rows="15"
    //       className={styles["ClientInfo-wrapper-form-notes-textarea"]}
    //     ></textarea>
    //   </div>
    // </div>
    <div className={styles["clientDetail--main-container"]}>
      <div className={styles["clientDetail--details-input-container"]}>
        <div className={styles["clientDetail--client-image-container"]}>
          <img src={profile} className={styles["clientDetail--client-image"]} />
        </div>
        <div className={styles["clientDetail--input-grid"]}>
          <div className={styles["clientDetail--input-column"]}>
            <div className={styles["clientDetail--input-text-container"]}>
              <p className={styles["clientDetail--input-text"]}>Full Name</p>
              <input className={styles["clientDetail--input"]} />
            </div>
            <div className={styles["clientDetail--input-text-container"]}>
              <p className={styles["clientDetail--input-text"]}>Gender</p>
              <div
                className={styles["clientDetail--gender-dropdown"]}
                onClick={() => setArrowDropdown((prev) => !prev)}
              >
                {dropdownGender}
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
                    onClick={() => setDropdownGender("Male")}
                  >
                    Male
                  </div>
                  <div
                    className={styles["clientDetail--option-text"]}
                    onClick={() => setDropdownGender("Female")}
                  >
                    Female
                  </div>
                  <div
                    className={styles["clientDetail--option-text"]}
                    onClick={() => setDropdownGender("Other")}
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
              <input className={styles["clientDetail--input"]} />
            </div>
            <div className={styles["clientDetail--input-text-container"]}>
              <p className={styles["clientDetail--input-text"]}>Phone Number</p>
              <input className={styles["clientDetail--input"]} />
            </div>
            <div className={styles["clientDetail--input-text-container"]}>
              <p className={styles["clientDetail--input-text"]}>
                Local Address
              </p>
              <input
                className={styles["clientDetail--input"]}
                style={{ height: "60px" }}
              />
            </div>
            <div className={styles["clientDetail--input-text-container"]}>
              <p className={styles["clientDetail--input-text"]}>
                Date of birth
              </p>
              <input className={styles["clientDetail--input"]} type="date" />
            </div>
          </div>
          <div className={styles["clientDetail--input-column"]}>
            <div className={styles["clientDetail--input-text-container"]}>
              <p className={styles["clientDetail--input-text"]}>Full Name</p>
              <input className={styles["clientDetail--input"]} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles["clientDetail--personal-notes-container"]}>
        <p className={styles["clientDetail--personal-notes-title"]}>
          Personal Notes
        </p>
        <input className={styles["clientDetail--personal-notes-input"]} />
      </div>
    </div>
  );
}
