import React from "react";
import { getSalesData, getClientsData } from "../../Firebase/kpi";

const KpiTest = () => {
  const handleGetSales = async () => {
    console.log("Getting sales");
    const uid = "03po3TJn0Ga0tAVzXe6UQKQwO242";
    // Get sales for a week
    const startDate = new Date("2024-04-12");
    const endDate = new Date("2024-04-19");
    const res = await getSalesData(uid, startDate, endDate);
    console.log(res, "Inputs were ", uid, startDate, endDate);
  };

  const handleGetClients = async () => {
    console.log("Getting clients");
    const uid = "03po3TJn0Ga0tAVzXe6UQKQwO242";
    // Get clients for a week
    const startDate = new Date("2024-04-12");
    const endDate = new Date("2024-04-19");
    const res = await getClientsData(uid, startDate, endDate);
    console.log(res, "Inputs were ", uid, startDate, endDate);
  };
  return (
    <div>
      <button onClick={handleGetSales}>Get sales</button>
      <button onClick={handleGetClients}>Get clients</button>
    </div>
  );
};

export default KpiTest;
