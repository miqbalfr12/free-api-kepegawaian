import {filterDataById, retrieveDataById} from "@/services";

export default async function handler(req, res) {
 console.log(req.query);
 if (req.method !== "GET") {
  return res.status(405).json({message: "Method not allowed"});
 }
 if (req.method === "GET") {
  const data = await retrieveDataById("kehadiran", req.query.id);

  const ResponseInit = {status: 200, statusText: "OK"};
  res.status(200).json({...ResponseInit, message: data});
 }
}
