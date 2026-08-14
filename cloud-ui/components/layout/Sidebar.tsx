"use client";
import React, { useRef } from "react";
import "./Sidebar.modules.css";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { getUploadPresignedUrl, postUploadPresignedUrl } from "@/lib/Apicalls";
import { File } from "node:buffer";

function Sidebar() {
  const { userId } = useAuth();

  const fileInputRef = useRef<HTMLInputElement | null>(null); //useRef is used to assign/point to input html elemnt

  if (!userId) {
    return <h1>UserId not availiable</h1>;
  }

  //open file selector
  const handleUploadClick = () => {
    fileInputRef.current?.click(); //open current window for selction, cause .click() property had each html element
  };

  // Handle file selection
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; //select first file from input element

    if (!file) return;

    console.log("Selected file:", file);

    // 11 may call api with it's name and file types etc
    const preSignedUrlObj = await getUploadPresignedUrl(file);

    //calling for upload
    await postUploadPresignedUrl(file, preSignedUrlObj);

    // Later you can upload the file to S3 here
  };

  return (
    <div className="sidebar-container">
      <h1>Hello {userId} </h1>
      {/*
       1. i clicked on upload , it open current window fielinputRef.current.click() so i can select file
      2. this files stores to the bottom input element, which i handle through useRef as input element
       */}
      <Button variant={"outline"} size={"lg"} onClick={() => handleUploadClick()}>
        Upload <Upload />
      </Button>

      {/* holds file */}
      <input name="Taran" type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
    </div>
  );
}

export default Sidebar;
