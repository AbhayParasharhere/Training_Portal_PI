import React, { useState } from "react";
import styles from "./styles.module.scss";
import line from "../Images/vertical-line.png";
import delete_bin from "../Images/delete_bin.png";
import search_eye from "../Images/search_eye.png";
import pencil from "../Images/pencil.png";
import search_icon from "../Images/search_icon.png";
import red_button from "../Images/red_button.png";
import plus from "../Images/plus.png";
import arrow_down from "../Images/arrow_down.png";
import { languages } from "monaco-editor";

export default function ClientComponent() {
  const [prevIndex, setPrevIndex] = useState(null);
  const list = [
    {
      id: "0",
      name: "Devon Lane",
      email: "devon@gmail.com",
      number: "899999999",
    },
    {
      id: "1",
      name: "Devon smith",
      email: "devons@gmail.com",
      number: "899999998",
    },
  ];
  // const list = [0, 1, 2, 3];

  const toggleDialog = (index) => {
    if (prevIndex === index) {
      setPrevIndex(null);
    } else {
      setPrevIndex(index);
    }
  };

  return (
    <div className={styles["ClientComponent-wrapper"]}>
      <div className={styles["ClientComponent-wrapper-topbar"]}>
        <div className={styles["ClientComponent-wrapper-topbar-head"]}>
          <p className={styles["ClientComponent-topbar-clients"]}>Clients</p>
          <p className={styles["ClientComponent-topbar-count"]}>(18)</p>
        </div>
        <div className={styles["ClientComponent-wrapper-topbar-search"]}>
          <div className={styles["ClientComponent-wrapper-topbar-search-div"]}>
            <img src={search_icon} height="24px" />
            <input
              type={"text"}
              className={styles["ClientComponent-wrapper-topbar-search-bar"]}
              placeholder="Search Clients"
            />
          </div>
          <div
            className={styles["ClientComponent-wrapper-topbar-search-menu-div"]}
          >
            <div
              className={styles["ClientComponent-wrapper-topbar-search-menu"]}
            >
              All Clients
            </div>
            <img src={arrow_down} height="24px" />
          </div>
          <div className={styles["ClientComponent-wrapper-topbar-search-add"]}>
            <img src={plus} height="26px" />
          </div>
        </div>
      </div>
      <div className={styles["ClientComponent-wrapper-table"]}>
        <table className={styles["ClientComponent-table"]}>
          <tr className={styles["ClientComponent-th"]}>
            <th>Client name</th>
            <th>Email id</th>
            <th>Phone number</th>
          </tr>
          {list.map((item) => (
            <tr key={item.id} className={styles["ClientComponent-tr"]}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.number}</td>
              <td>
                <div className={styles["ClientComponent-dialog-div"]}>
                  {/* {!dialogActive && ( */}
                  {prevIndex === item.id && (
                    <dialog className={styles["ClientComponent-dialog-show"]}>
                      <div className={styles["ClientComponent-dialog-content"]}>
                        <img src={search_eye} height="18px" /> View Details
                      </div>
                      <div className={styles["ClientComponent-dialog-content"]}>
                        <img src={pencil} height="18px" />
                        Edit{" "}
                      </div>
                      <div className={styles["ClientComponent-dialog-content"]}>
                        <img src={delete_bin} height="18px" />
                        <span
                          className={
                            styles["ClientComponent-dialog-content-delete"]
                          }
                        >
                          Delete
                        </span>
                      </div>
                    </dialog>
                  )}

                  <img
                    className={styles["ClientComponent-tr-line"]}
                    onClick={() => toggleDialog(item.id)}
                    src={line}
                  />
                </div>
              </td>
            </tr>
          ))}
        </table>
        {/*  */}
      </div>
    </div>
  );
}
