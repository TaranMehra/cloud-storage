"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { GetDashBoardData } from "@/lib/Apicalls";
import { useAuth } from "@clerk/nextjs";
import { Cloud, File, Folder, MoreVertical, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function DashboardPage() {
  const recentFiles = [
    { name: "Project Proposal.pdf", type: "pdf", size: "2.4 MB", date: "2 hrs ago" },
    { name: "Design Assets.zip", type: "zip", size: "145 MB", date: "Yesterday" },
    { name: "Q3 Financials.xlsx", type: "sheet", size: "1.2 MB", date: "Oct 12, 2026" },
  ];

  const folders = [
    { name: "Work", files: 12 },
    { name: "Personal", files: 45 },
    { name: "Projects", files: 8 },
  ];

  // interface UserReturn {
  //   // msg: string;
  //   userDataobj: {
  //     first_name: string;
  //   };
  // }

  // const [userdata, setUserData] = useState<UserReturn>({
  //   msg: "",
  //   // userDataObj: {
  //   //   first_name: "",
  //   // },
  // });

  // const { getToken, userId, sessionId, isSignedIn, isLoaded } = useAuth();

  // const fetchData = useCallback(async () => {
  //   const token = await getToken();
  //   // console.log(token, sessionId , userId, isSignedIn);
  //   if (token && userId) {
  //     const data = await GetDashBoardData(token, userId);
  //     // setUserData(data);
  //   }
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!isSignedIn || !userId) return; // wait until signed in

  //     try {
  //       const token = await getToken();
  //       if (!token) return;

  //       const data = await GetDashBoardData(token, userId);
  //       // setUserData(data);
  //     } catch (error) {
  //       console.error("Error fetching dashboard data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [getToken, isSignedIn, userId]);

  return <div className="flex">hello to dashboard</div>;
}
