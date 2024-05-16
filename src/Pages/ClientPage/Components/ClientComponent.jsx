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
import {
  deleteAllClientSales,
  updateClient,
} from "../../../Firebase/updateSalesClients";
import { AuthContext } from "../../../context/authContext";

export default function ClientComponent() {
  const [search, setSearch] = useState("");
  const [prevIndex, setPrevIndex] = useState(null);
  const [filterOption, setFilterOption] = useState("All clients");
  const currentUser = useContext(AuthContext);
  const [arrowDropdown, setArrowDropdown] = useState(false);
  const realTimeData = useContext(RealTimeDataContext)?.clients;
  const [initialClientData, setInitialClientData] = useState(realTimeData);
  useEffect(() => {
    if (realTimeData) {
      setInitialClientData(realTimeData);
    }
  }, [realTimeData]);
  const [clientData, setClientData] = useState(
    initialClientData ? initialClientData : []
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

  const handleSearch = (value) => {
    setSearch(value);
    if (value === "") {
      setClientData(initialClientData ? initialClientData : clientData);
      return;
    }
    setClientData(
      clientData.filter((client) =>
        client.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  const deleteClient = async (clientId) => {
    try {
      await updateClient({ status: "deleted" }, clientId);
      await deleteAllClientSales(clientId, currentUser?.uid);
    } catch (error) {
      console.log(err);
    }
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
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div
            className={styles["clientList--dropdown"]}
            onClick={() => setArrowDropdown((prev) => !prev)}
          >
            {filterOption}
            <img
              className={styles["clientList--arrow-icon"]}
              src={arrowDropdown ? arrow_up : arrow_down}
            />
            <div
              className={styles["clientList--dropdown-option-container"]}
              style={{ display: arrowDropdown ? "flex" : "none" }}
            >
              <div
                className={styles["clientList--dropdown-option"]}
                onClick={() => setFilterOption("All clients")}
              >
                All clients
              </div>
              <div
                className={styles["clientList--dropdown-option"]}
                onClick={() => setFilterOption("Newest")}
              >
                Newest
              </div>
              <div
                className={styles["clientList--dropdown-option"]}
                onClick={() => setFilterOption("Oldest")}
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
            className={styles["clientList--dropdown"]}
            onClick={() => setArrowDropdown((prev) => !prev)}
          >
            {filterOption}
            <img
              className={styles["clientList--arrow-icon"]}
              src={arrowDropdown ? arrow_up : arrow_down}
            />
            <div
              className={styles["clientList--dropdown-option-container"]}
              style={{ display: arrowDropdown ? "flex" : "none" }}
            >
              <div
                className={styles["clientList--dropdown-option"]}
                onClick={() => setFilterOption("All clients")}
              >
                All clients
              </div>
              <div
                className={styles["clientList--dropdown-option"]}
                onClick={() => setFilterOption("Newest")}
              >
                Newest
              </div>
              <div
                className={styles["clientList--dropdown-option"]}
                onClick={() => setFilterOption("Oldest")}
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
          {clientData?.length ? (
            clientData?.map((item) => (
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
                            deleteClient(item?.id);
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
            ))
          ) : (
            <div className={styles["home--no-data"]}>
              You don't have any clients. Add some through the sales adding
              page!
            </div>
          )}
        </table>
        {/*  */}
      </div>
    </div>
  );
}
