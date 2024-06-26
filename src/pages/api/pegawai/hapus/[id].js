import {deleteData} from "@/services";

export default async function handler(req, res) {
 console.log(req.query);
 if (req.method !== "DELETE") {
  return res.status(405).json({message: "Method not allowed"});
 }
 if (req.method === "DELETE") {
  const data = await deleteData("pegawai", req.query.id);
  const kantor = await deleteData("kantor", req.query.id);
  const ResponseInit = {status: 200, statusText: "OK"};
  res.status(200).json({...ResponseInit, message: data});
 }
}
