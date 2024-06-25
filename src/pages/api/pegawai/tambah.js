import {addData} from "@/services";

export default async function handler(req, res) {
 if (req.method !== "POST") {
  return res.status(405).json({message: "Method not allowed"});
 }
 if (req.method === "POST") {
  console.log(req.body);
  if (!req.body) {
   return res.status(400).json({message: "Bad request"});
  }
  const data = await addData("pegawai", req.body);
  const ResponseInit = {
   status: 200,
   statusText: "OK",
  };
  res.status(200).json({...ResponseInit, message: {...req.body, id: data.id}});
 }
}
