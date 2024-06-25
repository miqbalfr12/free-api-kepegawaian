import {filterDataById, retrieveDataById} from "@/services";

export default async function handler(req, res) {
 console.log(req.query);
 if (req.method !== "GET") {
  return res.status(405).json({message: "Method not allowed"});
 }
 if (req.method === "GET") {
  const data = await retrieveDataById("pegawai", req.query.id);
  const kehadiran = await filterDataById("kehadiran", req.query.id);

  kehadiran.map((kehadiran) => {
   delete kehadiran.pegawai;
  });

  data.kehadiran = kehadiran.sort((a, b) => a.timestamp - b.timestamp);

  const ResponseInit = {status: 200, statusText: "OK"};
  res.status(200).json({...ResponseInit, message: data});
 }
}
