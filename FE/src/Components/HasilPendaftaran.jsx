import React, { useEffect, useState } from "react";
import axios from "axios";

const HasilPendaftaran = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const response = async () => {
        try {
            const fetchData = await axios.get("https://pendaftaransiswasekolah.000webhostapp.com/hasil.php")
            if(fetchData.status === 200) {
              setData(fetchData.data)
              setLoading(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
    response()
  }, [])

  return (
    <div>
      <div className="overflow-x-auto p-20 ">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>NISN</th>
              <th>Nama</th>
              <th>Jenis Kelamin</th>
              <th>Jurusan yang didaftar</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            
            {loading ? (data.data.map((data, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{data.nisn}</td>
                <td>{data.nama}</td>
                <td>{data.jenis_kelamin}</td>
                <td>{data.jurusan_yang_didaftar}</td>
                <td className={data.hasil >= 75 ? "btn btn-success text-base-content" : "btn btn-error text-base-content"}>{data.hasil >= 75 ? "Diterima" : "Ditolak"}</td>
              </tr>
            ))) : (<h1>Data tidak ada </h1>)} 

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HasilPendaftaran;
