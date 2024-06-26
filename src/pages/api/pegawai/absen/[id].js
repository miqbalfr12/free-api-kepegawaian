import {addData, deleteData, retrieveDataById, updateData} from "@/services";

export default async function handler(req, res) {
 console.log(req.query);
 if (req.method !== "GET") {
  return res.status(405).json({message: "Method not allowed"});
 }
 if (req.method === "GET") {
  const update = await updateData("kehadiran", req.query.id, {isScanned: true});
  console.log(update);

  const data = await retrieveDataById("kehadiran", req.query.id);
  const pegawai = await retrieveDataById("pegawai", data.pegawai);

  data.pegawai = pegawai;

  console.log(data);
  console.log(data.pegawai);
  console.log(data.pegawai.id);
  console.log(data.status);

  if (data.status === "CheckIn") {
   const newData = await addData(
    "kantor",
    {
     status: "OnDuty",
     timestamp: Date.now(),
    },
    data.pegawai.id
   );
   console.log(newData);
  } else if (data.status === "CheckOut") {
   const delData = await deleteData("kantor", data.pegawai.id);
   console.log(delData);
  }

  const ResponseInit = {status: 200, statusText: "OK"};
  res.status(200).json({...ResponseInit, message: data});
 }
}
