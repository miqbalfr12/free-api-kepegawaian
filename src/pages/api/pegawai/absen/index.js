import {addData, retrieveDataById} from "@/services";

export default async function handler(req, res) {
 if (req.method !== "POST") {
  return res.status(405).json({message: "Method not allowed"});
 }
 if (req.method === "POST") {
  if (!req.body) {
   return res.status(400).json({message: "Bad request"});
  }
  console.log(req.body);
  const newData = {
   isScanned: false,
   pegawai: req.body.id,
   status: req.body.status,
   timestamp: Date.now(),
  };
  const pegawai = await retrieveDataById("pegawai", req.body.id);
  console.log(newData);
  const ress = await addData("kehadiran", newData);
  console.log(ress.id);
  const ResponseInit = {status: 200, statusText: "OK"};
  newData.pegawai = pegawai;
  res.status(200).json({...ResponseInit, message: {...newData, id: ress.id}});
 }
}
