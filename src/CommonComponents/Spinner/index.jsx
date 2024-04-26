import React from "react";
import { HashLoader } from "react-spinners";

const Spinner = ({ loading }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <HashLoader color={"#3064d4"} loading={loading} size={300} />
    </div>
  );
};

export default Spinner;
