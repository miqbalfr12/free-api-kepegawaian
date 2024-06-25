// pages/api/pegawai.js

import {retrieveData} from "@/services";

export default async function handler(req, res) {
 if (req.method !== "GET") {
  return res.status(405).json({message: "Method not allowed"});
 }
 if (req.method === "GET") {
  const data = await retrieveData("pegawai");
  const ResponseInit = {
   status: 200,
   statusText: "OK",
  };
  res.status(200).json({...ResponseInit, message: data});
 }
}
