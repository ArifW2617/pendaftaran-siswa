import React, { useState } from "react";
import axios from "axios";

const UnggahDokumen = () => {
  const dataUser = localStorage.getItem("dataSementara");
  
  const [files, setFiles] = useState({
    nisn : JSON.parse(dataUser).nisn,
    foto: null,
    suratLulus: null,
    ijasah: null,
    kartuKeluarga: null,
    akte: null,
    status: "unggahDokumen",
  });


  const handleFileChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setFiles((prevState) => ({
      ...prevState,
      [name]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in files) {
      formData.append(key, files[key]);
    }

    try {
      const response = await axios.post(
        "https://pendaftaransiswasekolah.000webhostapp.com/index.php",
        formData
      );

      if(response.status === 200) {
        window.location.reload()
        localStorage.setItem("status", 3)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="grid grid-cols-2 gap-5 w-full">
        <label className="form-control">
          <label className="label">Foto</label>
          <input
            type="file"
            name="foto"
            onChange={handleFileChange}
            placeholder="foto"
            className="file-input file-input-bordered"
          />
        </label>

        <label className="form-control">
          <label className="label">Surat Lulus</label>
          <input
            type="file"
            name="suratLulus"
            onChange={handleFileChange}
            placeholder="surat lulus"
            className="file-input file-input-bordered"
          />
        </label>

        <label className="form-control">
          <label className="label">Ijasah</label>
          <input
            type="file"
            name="ijasah"
            onChange={handleFileChange}
            placeholder="ijasah"
            className="file-input file-input-bordered"
          />
        </label>

        <label className="form-control">
          <label className="label">Kartu Keluarga</label>
          <input
            type="file"
            name="kartuKeluarga"
            onChange={handleFileChange}
            placeholder="kartu keluarga"
            className="file-input file-input-bordered"
          />
        </label>

        <label className="form-control col-span-2">
          <label className="label">Akte</label>
          <input
            type="file"
            name="akte"
            onChange={handleFileChange}
            placeholder="akte"
            className="file-input file-input-bordered "
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary mt-5 p-3 mb-3 w-full">
        Kirim
      </button>
    </form>
  );
};

export default UnggahDokumen;
