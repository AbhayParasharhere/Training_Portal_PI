import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./styles.module.scss";
import line from "../Images/vertical-line.png";
import delete_bin from "../Images/delete_bin.png";
import search_eye from "../Images/search_eye.png";
import pencil from "../Images/pencil.png";
import search_icon from "../Images/search_icon.png";
import red_button from "../Images/red_button.png";
import plus from "../Images/plus.png";
import arrow_down from "../Images/arrow_down.png";
import arrow_up from "../Images/arrow_up.png";
import client_img from "../Images/client_img.png";
import {
  RealTimeDataContext,
  PrimaryDataContext,
} from "../../../context/primaryDataContext";
import { useNavigate } from "react-router-dom";
import { updateClient } from "../../../Firebase/updateSalesClients";

export default function ClientComponent() {
  const [prevIndex, setPrevIndex] = useState(null);
  const primaryContextData = useContext(PrimaryDataContext);
  const salesData = primaryContextData?.sales;
  const clientData = useContext(RealTimeDataContext)?.clients?.filter(
    (client) => client.status === "active"
  );
  const navigate = useNavigate();
  console.log("This is the realtime client data for the user: ", clientData);
  const toggleDialog = (index) => {
    if (prevIndex === index) {
      setPrevIndex(null);
    } else {
      setPrevIndex(index);
    }
  };
  const parentDivRef = useRef(null);

  const handleInputChange = () => {
    // Change border color of parent div here
    parentDivRef.current.style.borderColor = "blue";

    // Change to your desired color
    // console.log("Parent", parentDivRef);
  };
  const InputChangeColor = () => {
    // Change border color of parent div here
    parentDivRef.current.style.borderColor = "#d6d6d6";

    // Change to your desired color
    // console.log("Parent", parentDivRef);
  };
  const offDialog = () => {
    parentDivRef.current.style.borderColor = "#d6d6d6";
    if (prevIndex) {
      setPrevIndex(null);
    }
  };

  const addClient = () => {
    console.log("add client");
  };

  const viewDetails = () => {
    console.log("view details");
  };

  const edit = () => {
    console.log("edit client");
  };

  const dltBtn = () => {
    console.log("delete client");
  };

  return (
    <div className={styles["ClientComponent-wrapper"]} onClick={offDialog}>
      <div className={styles["ClientComponent-wrapper-topbar"]}>
        <div className={styles["ClientComponent-wrapper-topbar-head"]}>
          <p className={styles["ClientComponent-topbar-clients"]}>Clients</p>
          <p className={styles["ClientComponent-topbar-count"]}>
            ({clientData?.length})
          </p>
        </div>
        <div className={styles["ClientComponent-wrapper-topbar-search"]}>
          <div
            className={styles["ClientComponent-wrapper-topbar-search-div"]}
            ref={parentDivRef}
            onChange={handleInputChange}
          >
            <img src={search_icon} height="18px" />
            <input
              type="text"
              className={styles["ClientComponent-wrapper-topbar-search-bar"]}
              placeholder="Search client"
            />
          </div>
          <div
            className={styles["ClientComponent-wrapper-topbar-search-menu-div"]}
          >
            <div
              className={styles["ClientComponent-wrapper-topbar-search-menu"]}
            >
              All clients
            </div>
            <img
              src={arrow_down}
              height="24px"
              className={
                styles["ClientComponent-wrapper-topbar-search-menu-arrow-down"]
              }
            />
            <img
              src={arrow_up}
              height="24px"
              className={
                styles["ClientComponent-wrapper-topbar-search-menu-arrow-up"]
              }
            />
            <div
              className={
                styles[
                  "ClientComponent-wrapper-topbar-search-menu-div-dropdown"
                ]
              }
            >
              {" "}
              <div
                className={
                  styles[
                    "ClientComponent-wrapper-topbar-search-menu-div-dropdown-content"
                  ]
                }
              >
                All clients
              </div>
              <div
                className={
                  styles[
                    "ClientComponent-wrapper-topbar-search-menu-div-dropdown-content"
                  ]
                }
              >
                Newest
              </div>
              <div
                className={
                  styles[
                    "ClientComponent-wrapper-topbar-search-menu-div-dropdown-content"
                  ]
                }
              >
                Oldest
              </div>
            </div>
          </div>
          <div
            className={styles["ClientComponent-wrapper-topbar-search-add"]}
            onClick={() => navigate("/addSales")}
          >
            <img src={plus} height="26px" />
          </div>
        </div>
      </div>

      <div className={styles["ClientComponent-wrapper-topbar-mobile"]}>
        <div
          className={styles["ClientComponent-wrapper-topbar-search-div"]}
          ref={parentDivRef}
          onChange={handleInputChange}
        >
          <img src={search_icon} height="18px" />
          <input
            type="text"
            className={styles["ClientComponent-wrapper-topbar-search-bar"]}
            placeholder="Search client"
          />
        </div>
        <div
          className={styles["ClientComponent-wrapper-topbar-mobile-clients"]}
        >
          <div
            className={styles["ClientComponent-wrapper-topbar-search-menu-div"]}
          >
            <div
              className={styles["ClientComponent-wrapper-topbar-search-menu"]}
            >
              All clients
            </div>
            <img
              src={arrow_down}
              height="24px"
              className={
                styles["ClientComponent-wrapper-topbar-search-menu-arrow-down"]
              }
            />
            <img
              src={arrow_up}
              height="24px"
              className={
                styles["ClientComponent-wrapper-topbar-search-menu-arrow-up"]
              }
            />
            <div
              className={
                styles[
                  "ClientComponent-wrapper-topbar-search-menu-div-dropdown"
                ]
              }
            >
              {" "}
              <div
                className={
                  styles[
                    "ClientComponent-wrapper-topbar-search-menu-div-dropdown-content"
                  ]
                }
              >
                All clients
              </div>
              <div
                className={
                  styles[
                    "ClientComponent-wrapper-topbar-search-menu-div-dropdown-content"
                  ]
                }
              >
                Newest
              </div>
              <div
                className={
                  styles[
                    "ClientComponent-wrapper-topbar-search-menu-div-dropdown-content"
                  ]
                }
              >
                Oldest
              </div>
            </div>
          </div>
          <div
            className={styles["ClientComponent-wrapper-topbar-search-add"]}
            onClick={() => navigate("/addSales")}
          >
            <img src={plus} height="26px" />
          </div>
        </div>
      </div>
      <div className={styles["ClientComponent-wrapper-table"]}>
        <table className={styles["ClientComponent-table"]}>
          <tr className={styles["ClientComponent-th"]}>
            <th className={styles["ClientComponent-th-name"]}>Client name</th>
            <th className={styles["ClientComponent-th-email"]}>Email id</th>
            <th className={styles["ClientComponent-th-phone"]}>Phone number</th>
          </tr>
          {clientData?.map((item) => (
            <tr key={item.id} className={styles["ClientComponent-tr"]}>
              <td
                className={styles["ClientComponent-td-name"]}
                onClick={() => navigate(`/client-detail/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={client_img}
                  className={styles["ClientComponent-td-img"]}
                />{" "}
                {item.name}
              </td>
              <td className={styles["ClientComponent-td-email"]}>
                {item.email}
              </td>
              <td className={styles["ClientComponent-td-phone"]}>
                {item.phone_number}
              </td>
              <td>
                <div className={styles["ClientComponent-dialog-div"]}>
                  {/* {!dialogActive && ( */}
                  {prevIndex === item.id && (
                    <dialog className={styles["ClientComponent-dialog-show"]}>
                      <div
                        className={styles["ClientComponent-dialog-content"]}
                        onClick={() => navigate(`/client-detail/${item.id}`)}
                      >
                        <img src={search_eye} height="18px" /> View Details
                      </div>
                      <div
                        className={styles["ClientComponent-dialog-content"]}
                        onClick={() => navigate(`/client-detail/${item.id}`)}
                      >
                        <img src={pencil} height="18px" />
                        Edit{" "}
                      </div>
                      <div
                        className={styles["ClientComponent-dialog-content"]}
                        onClick={() => {
                          console.log("This is the client id: ", item?.id, {
                            status: "active",
                          });
                          updateClient({ status: "deleted" }, item.id);
                        }}
                      >
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
