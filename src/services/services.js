import instance from "@/lib/axios/instance";

export const absenServices = {
 absen: (data) => instance.get(`/api/pegawai/absen/${data}`),
};
