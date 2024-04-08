import React, { useState } from "react";
import styles from "./styles.module.scss";
import line from "../../../../assets/vertical-line.png";
import delete_bin from "../../../../assets/delete_bin.png";
import search_eye from "../../../../assets/search_eye.png";
import pencil from "../../../../assets/pencil.png";

export default function ClientComponent() {
  const [prevIndex, setPrevIndex] = useState(null);
  const list = [0, 1, 2, 3];

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
          <input type={"text"} placeholder="Search" />
          <button>All Clients</button>
          <button>add</button>
        </div>
      </div>
      <div className={styles["ClientComponent-wrapper-table"]}>
        <table className={styles["ClientComponent-table"]}>
          <tr className={styles["ClientComponent-th"]}>
            <th>Client name</th>
            <th>Email id</th>
            <th>Phone number</th>
          </tr>
          {/* <tr className={styles["ClientComponent-tr"]}>
          <td>Devon Lane</td>
          <td>someone@gmail.com</td>
          <td>(808)555-0111</td>
          <td>
            <div className={styles["ClientComponent-dialog-div"]}>
              {dialogVisible && (
                <dialog className={styles["ClientComponent-dialog-show "]}>
                  <div>View Details</div>
                  <div>Edit </div>
                  <div>Delete</div>
                </dialog>
              )}
              <img
                className={styles["ClientComponent-tr-line"]}
                onClick={toggleDialog}
                src={line}
              />
            </div>
          </td>
        </tr>
        <tr className={styles["ClientComponent-tr"]}>
          <td>Devon Lane</td>
          <td>someone@gmail.com</td>
          <td>(808)555-0111</td>
          <td>
            <div className={styles["ClientComponent-dialog-div"]}>
              {dialogVisible && (
                <dialog className={styles["ClientComponent-dialog-show "]}>
                  <div>View Details</div>
                  <div>Edit </div>
                  <div>Delete</div>
                </dialog>
              )}
              <img
                className={styles["ClientComponent-tr-line"]}
                onClick={toggleDialog}
                src={line}
              />
            </div>
          </td>
        </tr>
        <tr className={styles["ClientComponent-tr"]}>
          <td>Devon Lane</td>
          <td>someone@gmail.com</td>
          <td>(808)555-0111</td>
          <td>
            <div className={styles["ClientComponent-dialog-div"]}>
              {dialogVisible && (
                <dialog className={styles["ClientComponent-dialog-show "]}>
                  <div>View Details</div>
                  <div>Edit </div>
                  <div>Delete</div>
                </dialog>
              )}
              <img
                className={styles["ClientComponent-tr-line"]}
                onClick={toggleDialog}
                src={line}
              />
            </div>
          </td>
        </tr>
        <tr className={styles["ClientComponent-tr"]}>
          <td>Devon Lane</td>
          <td>someone@gmail.com</td>
          <td>(808)555-0111</td>
          <td>
            <div className={styles["ClientComponent-dialog-div"]}>
              {dialogVisible && (
                <dialog className={styles["ClientComponent-dialog-show"]}>
                  <div>View Details</div>
                  <div>Edit </div>
                  <div>Delete</div>
                </dialog>
              )}
              <img
                className={styles["ClientComponent-tr-line"]}
                onClick={toggleDialog}
                src={line}
              />
            </div>
          </td>
        </tr> */}
          {list.map((index) => (
            <tr key={index} className={styles["ClientComponent-tr"]}>
              <td>Devon Lane</td>
              <td>someone@gmail.com</td>
              <td>(808)555-0111</td>
              <td>
                <div className={styles["ClientComponent-dialog-div"]}>
                  {/* {!dialogActive && ( */}
                  {prevIndex === index && (
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
                    onClick={() => toggleDialog(index)}
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
