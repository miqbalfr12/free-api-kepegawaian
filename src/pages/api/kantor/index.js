// pages/api/pegawai.js

import {retrieveData, retrieveDataById} from "@/services";

export default async function handler(req, res) {
 if (req.method !== "GET") {
  return res.status(405).json({message: "Method not allowed"});
 }
 if (req.method === "GET") {
  const data = await retrieveData("kantor");

  const dataWithPegawai = await Promise.all(
   data.map(async (data) => {
    const userData = await retrieveDataById("pegawai", data.id);
    return {
     ...data,
     ...userData,
    };
   })
  );

  const ResponseInit = {
   status: 200,
   statusText: "OK",
  };
  res.status(200).json({...ResponseInit, message: dataWithPegawai});
 }
}
