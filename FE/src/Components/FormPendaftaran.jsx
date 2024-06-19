import React, { useState } from "react";
import axios from "axios";

const FormPendaftaran = () => {
  const [formDataSiswa, setFormDataSiswa] = useState({
    nisn: "",
    nama: "",
    email: "",
    telepon: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
    alamat: "",
    jurusan_yang_didaftar: "",
    status_pendaftaran : "Dalam proses",
    status: "formDataSiswa",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataSiswa({
      ...formDataSiswa,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    try {
      for (const key in formDataSiswa) {
        formData.append(key, formDataSiswa[key]);
      }
      // Kirim data ke server
      const response = await axios.post(
        "https://pendaftaransiswasekolah.000webhostapp.com/index.php",
        formData
      );


      if (response.status === 200) {
        window.location.reload()

        localStorage.setItem("status", 2)
        localStorage.setItem("dataSementara",JSON.stringify(formDataSiswa));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full ">
      <h1 className="mb-5">Data Diri</h1>
      <form method="post" className="w-full " onSubmit={(e) => handleSubmit(e)}>
        <div className="grid grid-cols-2 gap-5 w-full ">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">NISN</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full "
              onChange={(e) => handleChange(e)}
              name="nisn"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Nama Lengkap</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              onChange={(e) => handleChange(e)}
              name="nama"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full "
              onChange={(e) => handleChange(e)}
              name="email"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Telepon</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full "
              onChange={(e) => handleChange(e)}
              name="telepon"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Jenis Kelamin</span>
            </div>
            <div className="flex">
              <div className="form-control me-3 border px-3 rounded border-secondary">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="jenis_kelamin"
                    className="radio checked:bg-red-500 me-2"
                    onChange={(e) => handleChange(e)}
                    value="laki"
                  />
                  <span className="label-text">Laki-laki</span>
                </label>
              </div>
              <div className="form-control border px-3 rounded border-secondary">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="jenis_kelamin"
                    onChange={(e) => handleChange(e)}
                    value="perempuan"
                    className="radio checked:bg-blue-500 me-2"
                  />
                  <span className="label-text">Perempuan</span>
                </label>
              </div>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Tanggal Lahir</span>
            </div>
            <input
              type="date"
              className="input input-bordered w-full "
              onChange={(e) => handleChange(e)}
              name="tanggal_lahir"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Pilih jurusan</span>
            </div>
            <select
              className="select select-bordered"
              name="jurusan_yang_didaftar"
              defaultValue="Jurusan"
              onChange={(e) => handleChange(e)}
            >
              <option value="Jurusan">Jurusan</option>
              <option value="RPL">RPL</option>
              <option value="TKJ">TKJ</option>
              <option value="DKV">DKV</option>
            </select>
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Alamat</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Type here"
              name="alamat"
              onChange={(e) => handleChange(e)}
            ></textarea>
          </label>
        </div>

        <button type="submit" className="btn btn-primary mt-5 p-3 mb-3 w-full">
          Kirim
        </button>
      </form>
    </div>
  );
};

export default FormPendaftaran;
