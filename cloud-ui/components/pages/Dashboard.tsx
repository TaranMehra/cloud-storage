'use client'
// import { Sidebar } from "lucide-react";
import React, { useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import "./Dashboard.modules.css";
import { getMetaDataList } from "@/lib/Apicalls";

function Dashboard() {
  //fetch details
  useEffect(() => {
    (async () => {
      await getMetaDataList();
    })();
  }, []);
  return (
    <div className="dashboard-container">
      {/* Dashboard */}

      <Sidebar />
    </div>
  );
}

export default Dashboard;
