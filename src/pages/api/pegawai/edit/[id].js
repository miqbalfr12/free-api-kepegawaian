import {updateData} from "@/services";

export default async function handler(req, res) {
 console.log(req.query);
 if (req.method !== "PUT") {
  return res.status(405).json({message: "Method not allowed"});
 }
 if (req.method === "PUT") {
  const data = await updateData("pegawai", req.query.id, req.body);
  const ResponseInit = {status: 200, statusText: "OK"};
  res.status(200).json({...ResponseInit, message: data});
 }
}
