import React, { useEffect, useState } from "react";
import axios from "axios";

const Rekapitulasi = () => {
  const nisn = JSON.parse(localStorage.getItem("dataSementara")).nisn;
  const [dataSiswa, setDataSiswa] = useState(null);
  const [hasil, setHasil] = useState(null);

  useEffect(() => {
    const getDataSiswa = async () => {
      try {
        const response = await axios.get(
          `https://pendaftaransiswasekolah.000webhostapp.com/index.php?nisn=${nisn}`
        );
        console.log(response);
        if (response.status === 200) {
          setDataSiswa(response.data.siswa);
          setHasil(response.data.hasil.hasil)
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDataSiswa();
  }, []);

  console.log(hasil)

  return (
    <>
      {dataSiswa && (
        <div className="mt-8">
          <div className="flex w-full">
            <div className="avatar me-5">
              <div className="w-44 h-48">
                <img
                  src={`https://pendaftaransiswasekolah.000webhostapp.com/image/${dataSiswa.foto}`}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 w-full tracking-wide">
              <label className="text-lg">
                Nama : <span className="font-medium">{dataSiswa.nama}</span>
              </label>
              <label className="text-lg">
                NISN : <span className="font-medium">{dataSiswa.nisn}</span>
              </label>
              <label className="text-lg">
                Email : <span className="font-medium">{dataSiswa.email}</span>
              </label>
              <label className="text-lg">
                Jurusan yang dipilih :{" "}
                <span className="font-medium">
                  {dataSiswa.jurusan_yang_didaftar}
                </span>
              </label>
              <label className="text-lg">
                Telepon :{" "}
                <span className="font-medium">{dataSiswa.telepon}</span>
              </label>
              <label className="text-lg">
                Tanggal Lahir :{" "}
                <span className="font-medium">{dataSiswa.tanggal_lahir}</span>
              </label>
              <label className="text-lg">
                Jenis kelamin :{" "}
                <span className="font-medium">{dataSiswa.jenis_kelamin}</span>
              </label>
              <label htmlFor="">
                Hasil Tes :{" "}
                <span
                  className={`font-medium text-lg ${
                    hasil > 70
                      ? "text-success"
                      : "text-error"
                  }`}
                >
                  {hasil}
                </span>
              </label>
            </div>
          </div>
          <div className="flex h-full justify-center items-center tracking-wide">
            <label className="text-lg">
              Status :{" "}
              <span
                className={`font-bold ${
                  dataSiswa.status_pendaftaran === "Diterima"
                    ? "text-success"
                    : "text-error"
                }`}
              >
                {dataSiswa.status_pendaftaran === "Diterima"
                  ? "Selamat anda "
                  : "Maaf anda "}
                {dataSiswa.status_pendaftaran}
              </span>
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default Rekapitulasi;
