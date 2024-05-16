import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import samplePhoto from "./images/profile-photo.png";
import calendarIcon from "./images/calendar.png";
import { AnimatePresence, motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import cakeIcon from "./images/cakeIcon.png";
import clientPhoto from "./images/client-sample-image.png";
import { useNavigate, useOutletContext } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import {
  PrimaryDataContext,
  RealTimeDataContext,
} from "../../../../context/primaryDataContext";
import { getFutureTimeDifference } from "../TabletImportantUpdates";
import { pushRecentNotifications } from "../Home";
import ProfileChangeModal from "../ProfileChangeModal";
import { EditTwoTone } from "@ant-design/icons";
import { validateLink } from "../../../../utils/validation";
import { getWeeklyAddedClientsSales } from "../../../Statistics";
import { getUpcomingEvents } from "../../../../utils/date";
import filterSalesByEndDate from "../../../../utils/expiredSales";
import crossIcon from "./images/cross-icon.png";
import sendIcon from "./images/send-icon.svg";
import { toast } from "react-toastify";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../Firebase/firebaseConfig";
import chatIcon from "./images/chat-icon.png";
import { BeatLoader } from "react-spinners";
ChartJs.register(CategoryScale, LinearScale, BarElement);

export default function StatsSummary({ chatOpen, setChatOpen }) {
  const realTimeData = useContext(RealTimeDataContext);
  const salesData = realTimeData?.sales;
  const appointments = realTimeData?.appointments;
  const webinars = realTimeData?.webinars;
  const announcements = realTimeData?.announcements;
  const [notifications, setNotifications] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  // const [allMessages, setAllMessages] = useState([]);
  const [sending, setSending] = useState(false);
  let latestAppoitment = {};
  let appoitmentClientName = "";
  const outlet = useOutletContext();
  const allMessages = outlet?.allMessages;
  const setAllMessages = outlet?.setAllMessages;
  console.log("This is tge outket: ", allMessages, setAllMessages);
  useEffect(() => {
    // if (announcements || webinars || appointments) return;
    pushRecentNotifications(
      announcements,
      webinars,
      appointments,
      setNotifications
    );

    const weeklySalesData = getWeeklyAddedClientsSales(realTimeData.clients);
    const weekLabels = ["M", "T", "W", "T", "F", "S", "S"];
    let formattedWeeklySalesData = [];
    for (let i = 0; i < weekLabels.length; i++) {
      formattedWeeklySalesData.push({
        name: weekLabels[i],
        value: weeklySalesData[i],
      });
    }
    setGraphData(formattedWeeklySalesData);
  }, [announcements, appointments, webinars]);

  const chatListRef = useRef(null);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop =
        chatListRef.current.scrollHeight - chatListRef.current.clientHeight;
    }
  }, [chatOpen]);
  if (appointments) {
    // Get the one which is closest to the current time and must be in the future

    latestAppoitment = appointments
      .filter((appointment) => {
        const currentDate = new Date();
        const appointmentDate = appointment.date.toDate();
        // console.log(
        //   "Current Date",
        //   currentDate,
        //   "Appointment Date",
        //   appointmentDate
        // );
        return currentDate < appointmentDate;
      })
      ?.sort((a, b) => a.date.seconds - b.date.seconds)[0];

    if (latestAppoitment) {
      appoitmentClientName = realTimeData.clients.find(
        (client) => client.id === latestAppoitment.clientID
      )?.name;
    }
    // console.log("Latest Appoitment", latestAppoitment);
  }
  const navigate = useNavigate();
  // const primaryDataContext = useContext(PrimaryDataContext);
  const clients = realTimeData?.clients;
  const [graphData, setGraphData] = useState([
    { name: "M", value: "12" },
    { name: "T", value: "5" },
    { name: "W", value: "9" },
    { name: "T", value: "15" },
    { name: "F", value: "6" },
    { name: "S", value: "9" },
    { name: "S", value: "7" },
  ]);

  let upcomingEvents = [];
  if (clients) {
    upcomingEvents = getUpcomingEvents(clients);
  }

  const [modalOpen, setModalOpen] = useState(false);
  let salesExpired = [];

  if (salesData) {
    salesExpired = filterSalesByEndDate(salesData);
  }
  const renderExpiredPolicies = salesExpired?.map((sales) => {
    const salesClient = clients?.filter((client) => client.id === sales.cid)[0];
    return (
      <div className={styles["home--expired-policy-container"]}>
        <p className={styles["home--expired-policy-name"]}>
          {sales?.policy_type}
        </p>
        <p className={styles["home--expired-policy-desc"]}>
          Cliet: {salesClient?.name}
        </p>
        <p className={styles["home--expired-policy-desc"]}>
          Expiry Date: {sales?.end_date}
        </p>
        <button
          className={styles["home--renew-button"]}
          onClick={() => navigate(`/client-detail/${salesClient?.id}/policies`)}
        >
          Renew
        </button>
      </div>
    );
  });
  const handleSend = async () => {
    try {
      if (!userMessage) {
        toast.error("Please type something.");
        return;
      }
      setSending(true);
      chatListRef.current.scrollTop =
        chatListRef.current.scrollHeight -
        chatListRef.current.clientHeight +
        20;
      setAllMessages((prev) => [
        ...prev,
        { message: userMessage, user: true, created_at: new Date() },
      ]);
      const ref = await addDoc(collection(db, "generate"), {
        prompt: userMessage,
      });

      // Create a Promise to wait for the snapshot
      const responsePromise = new Promise((resolve, reject) => {
        const unsub = onSnapshot(ref, (doc) => {
          if (doc?.get("response")) {
            resolve(doc.get("response")); // Resolve the promise with the response
            unsub(); // Unsubscribe from further snapshot updates
          }
        });
      });

      // Wait for the response
      const response = await responsePromise;

      // Once response is received, update state with the response message
      setAllMessages((prev) => [
        ...prev,
        {
          message: response,
          user: false,
          created_at: new Date(),
        },
      ]);

      console.log("Message: ", allMessages);
      setSending(false);
      setUserMessage("");
    } catch (err) {
      setSending(false);
      setUserMessage("");
      console.log("Error: ", err);
    }
  };

  return (
    <div
      className={styles["statsSummary--main-container"]}
      // style={{ overflowX: "hidden" }}
    >
      <ProfileChangeModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className={styles["statsSummary--chat-container"]}
            initial={{ scaleX: 0, opacity: 0, transformOrigin: "right" }}
            exit={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1, transformOrigin: "right" }}
            transition={{
              duration: 0.2,
              type: "tween",
            }}
          >
            <div className={styles["statsSummary--chat-header"]}>
              <p className={styles["statsSummary--chat-title"]}>AI chat bot</p>
              <button
                className={styles["statsSummary--close-button"]}
                onClick={() => setChatOpen(false)}
              >
                <img
                  src={crossIcon}
                  className={styles["statsSummary--chat-cross-icon"]}
                />
              </button>
            </div>
            <div
              className={styles["statsSummary--chat-list"]}
              ref={chatListRef}
            >
              {allMessages?.map((message) => {
                return (
                  <div
                    className={
                      styles[
                        message.user
                          ? "statsSummary--user-message"
                          : "statsSummary--ai-message"
                      ]
                    }
                  >
                    {message.message}
                  </div>
                );
              })}
              {sending && (
                <div className={styles["statsSummary--ai-message"]}>
                  <BeatLoader size="10px" />
                </div>
              )}
            </div>
            <div className={styles["statsSummary--chat-input-container"]}>
              <input
                className={styles["statsSummary--chat-input"]}
                placeholder="Type Something.."
                onChange={(e) => setUserMessage(e.target.value)}
                value={userMessage}
              />
              <button
                className={styles["statsSummary--chat-send-button"]}
                onClick={handleSend}
                disabled={sending}
              >
                <img
                  className={styles["statsSummary--send-icon"]}
                  src={sendIcon}
                />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles["statsSummary--profile-container"]}>
        <p className={styles["statsSummary--title"]}>Statistics</p>
        <div className={styles["statsSummary--profile-inner-container"]}>
          <div>
            <div
              className={styles["image-wrapper"]}
              style={{ position: "relative" }}
            >
              <img
                src={
                  secureLocalStorage.getItem("userDetails")?.[1] || samplePhoto
                }
                className={styles["statsSummary--profile-image"]}
              />
              <div
                className={styles["image-edit-icon"]}
                onClick={() => setModalOpen(true)}
              >
                <EditTwoTone
                  style={{ fontSize: "25px" }}
                  twoToneColor="#4462A4"
                />
              </div>
            </div>
          </div>
          <p className={styles["statsSummary--name"]}>
            {secureLocalStorage.getItem("userDetails")?.[0] || "Broker"}
          </p>
          <p className={styles["statsSummary--desc"]}>
            Check out your weekly sales snapshot
          </p>
        </div>
        <div
          className={styles["statsSummary--sales-graph-container"]}
          onClick={() => navigate("/statistics")}
        >
          Weekly Sales Status
          <Bar
            className={styles["statsSummary--graph"]}
            data={{
              labels: graphData.map((data) => data.name),
              datasets: [
                {
                  data: graphData.map((data) => data.value),
                  backgroundColor: "#2D355C",
                  borderRadius: 3,
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  display: false,
                  grid: {
                    display: false,
                  },
                },
              },
            }}
            style={{ width: "300px", height: "500px" }}
          />
        </div>
      </div>
      <div className={styles["statsSummary--notifications-container"]}>
        <button
          className={styles["statsSummary--chat-button"]}
          onClick={() => setChatOpen(true)}
        >
          <img src={chatIcon} className={styles["statsSummary--chat-icon"]} />
        </button>
        <div className={styles["statsSummary--notifications-inner-container"]}>
          <p className={styles["statsSummary--notifications-title"]}>
            Notifications
          </p>
          <div
            className={styles["statsSummary--lists-container"]}
            style={{
              justifyContent:
                notifications?.length === 0 ? "center" : "flex-start",
            }}
          >
            {notifications?.length !== 0 ? (
              notifications?.map((notification) => {
                return (
                  <div className={styles["statsSummary--list"]}>
                    <p className={styles["statsSummary--list-title"]}>
                      Upcoming {notification?.type}
                    </p>
                    <p className={styles["statsSummary--list-desc"]}>
                      {notification?.type === "appointment" &&
                        `You have an appointment on ${notification.sortDate}`}
                      {notification?.type === "webinar" &&
                        `You have a webinar on ${notification.sortDate}`}
                      {notification?.type === "announcement" &&
                        `A latest annoucement was made on ${notification.sortDate}`}
                    </p>
                  </div>
                );
              })
            ) : (
              <div
                className={styles["home--no-data"]}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  justifySelf: "center",
                  alignSelf: "center",
                  minHeight: "100%",
                }}
              >
                You have no recent notifications
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles["statsSummary--appointment-container"]}>
        <div className={styles["statsSummary--appointment-inner-container"]}>
          <p className={styles["statsSummary--appointment-title"]}>
            Clients Appointment
          </p>
          {latestAppoitment ? (
            <>
              <div
                className={styles["statsSummary--meeting-title-name-container"]}
              >
                <p className={styles["statsSummary--meeting-title"]}>
                  {latestAppoitment?.topic}
                </p>
                <p className={styles["statsSummary--appointment-desc-text"]}>
                  Client Name: {appoitmentClientName}|Time:{" "}
                  {getFutureTimeDifference(latestAppoitment?.date?.toDate())}
                </p>
              </div>
              <div
                className={
                  styles["statsSummary--unordered-list-button-container"]
                }
              >
                <ul className={styles["statsSummary--unordered-list"]}>
                  <li className={styles["statsSummary--appointment-marker"]}>
                    {latestAppoitment?.date?.toDate()?.toDateString()}{" "}
                  </li>
                  <li className={styles["statsSummary--appointment-marker"]}>
                    {latestAppoitment?.date?.toDate().toLocaleTimeString()}{" "}
                  </li>
                </ul>
                {validateLink(latestAppoitment?.link) ? (
                  <a
                    target="_blank"
                    href={latestAppoitment?.link}
                    className={styles["statsSummary--appointment-button"]}
                    style={{
                      pointerEvents: latestAppoitment?.link ? "all" : "none",
                    }}
                  >
                    Join Link
                  </a>
                ) : (
                  <div
                    className={styles["statsSummary--appointment-button"]}
                    style={{
                      opacity: 0.5,
                      cursor: "not-allowed",
                    }}
                  >
                    No link
                  </div>
                )}
              </div>
            </>
          ) : (
            <div
              className={styles["home--no-data"]}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              You have no recent appointments
            </div>
          )}
        </div>
      </div>
      {/*Birthday container for tablet responsive starts */}
      <div className={styles["statsSummary--mobile-birthday-container"]}>
        <p className={styles["home--client-birthday-title"]}>
          Upcoming Policies to renew
        </p>
        <div className={styles["home--client-birthday-list"]}>
          {salesExpired.length ? (
            renderExpiredPolicies
          ) : (
            <div className={styles["home--no-data"]}>
              No Recent Policies Expiring
            </div>
          )}
        </div>
      </div>
      {/*Birthday container for tablet responsive ends*/}
    </div>
  );
}
