import React from "react";
import styles from "./styles.module.scss";
import MainCover from "./components/MainCover";
import MarqueeText from "./components/MarqueeText";
import VideoTutorial from "./components/VideoTutorial";
import Footer from "./components/Footer";
import DashboardAnimation from "./components/DashboardAnimation";

export default function Welcome() {
  return (
    <div style={{ width: "100%", maxWidth: "1500px" }}>
      <MainCover />
      <MarqueeText />
      <DashboardAnimation />
      <VideoTutorial />
      <Footer />
    </div>
  );
}
