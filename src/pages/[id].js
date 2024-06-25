"use client";
import {absenServices} from "@/services/services";
import {useRouter} from "next/router";
import React from "react";

const Home = () => {
 const router = useRouter();
 const [data, setData] = React.useState(false);
 console.log(router.query.id);

 React.useEffect(() => {
  const getData = async () => {
   const ress = await absenServices.absen(router.query.id);
   setData(ress.data);
  };

  if (!data && router.query.id) {
   console.log("getData");
   getData();
  }
 }, [data, router.query.id]);

 console.log(data);

 const toString = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
 };

 return (
  <div className="flex h-screen justify-center items-center">
   {data ? (
    <div className="flex flex-col text-center">
     <p>{data.message.pegawai.nama}</p>
     <p className="text-sm mb-4">{data.message.pegawai.jabatan}</p>
     <p>{data.message.status} Success!</p>
     <p className="text-sm">{toString(data.message.timestamp)}</p>
    </div>
   ) : (
    "Loading..."
   )}
  </div>
 );
};

export default Home;
