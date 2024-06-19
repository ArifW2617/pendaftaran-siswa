import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Pendaftaran from "./Components/Pendaftaran.jsx";
import Home from "./Components/Home.jsx"
import UnggahDokumen from "./Components/UnggahDokumen.jsx";
import HasilPendaftaran from "./Components/HasilPendaftaran.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path : "/home",
        element : <Home />
      },
      {
        path: "/pendaftaran",
        element: <Pendaftaran />,
      },
      {
        path : "/hasil-pendaftaran",
        element : <HasilPendaftaran />
      }
      // {
      //   path: "/unggah_dokumen",
      //   element : <UnggahDokumen />
      // }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
