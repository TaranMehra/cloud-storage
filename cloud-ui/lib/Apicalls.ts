import { getToken } from "@clerk/nextjs";
import axios from "axios";

const token = await getToken();

const ax = axios.create({
  baseURL: "http://localhost:3400/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// export const GetDashBoardData = async (token: string, userId: string) => {
//   const userData = {
//     token: token,
//     userId: userId,
//   };
//   console.log("calling api through GetDashBoardData");
//   const response = await axios.post("http://localhost:3400/api/dash", userData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   console.log(response.data);
//   return response.data;
// };

export const getUploadPresignedUrl = async (fileinfo: File) => {
  const { name, type, size } = fileinfo;
  //send id for verfications, and other details
  const data = await ax.post("/s3/initial-store-data", { name, type, size });
  return data;
};
export const postUploadPresignedUrl = async (file: File, preSignedUrlObj: any) => {
  const { preSignedUrl } = preSignedUrlObj.data;
  //url generated from PutObjectCommand -> must use PUT
  const data = await axios.put(preSignedUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  return data;
};

export const getMetaDataList = async () => {
  //url generated from PutObjectCommand -> must use PUT
  const data = await ax.get("/api/meta-data-list");
  console.log("data from aws url", data);
  return data;
};
