import FormPendaftaran from "./FormPendaftaran";
import UnggahDokumen from "./UnggahDokumen";
import SoalTes from "./SoalTes";
import Rekapitulasi from "./Rekapitulasi";
import React, { useEffect, useState } from "react";

const Pendaftaran = () => {
  const [formStatus, setFormStatus] = useState(1);
  const getFormStatus = localStorage.getItem("status");

  useEffect(() => {
    if (!getFormStatus) {
      localStorage.setItem("status", 1);
      setFormStatus(getFormStatus);
    }
    setFormStatus(getFormStatus);
  });

  return (
    <div className="px-14 mt-10">
      <div className="flex w-full">
        <ul className="steps steps-vertical w-56 h-96 sticky top-14 overflow-hidden">
          <li className="step step-primary">Biodata diri</li>
          <li
            className={`step ${
              getFormStatus === "2" || getFormStatus > 2 ? "step-primary" : ""
            }`}
          >
            Unggah Dokumen
          </li>

          <li
            className={`step ${
              getFormStatus === "3" || getFormStatus > 3 ? "step-primary" : ""
            }`}
          >
            Soal Tes
          </li>
          <li className={`step ${getFormStatus === "4" && "step-primary"}`}>
            Rekapitulasi
          </li>
        </ul>
        <div className="divider divider-horizontal"></div>
        <div className="card rounded-box w-full">
          {formStatus == 1 && <FormPendaftaran />}
          {formStatus == 2 && <UnggahDokumen />}
          {formStatus == 3 && <SoalTes />}
          {formStatus == 4 && <Rekapitulasi />}
        </div>
      </div>
    </div>
  );
};

export default Pendaftaran;
