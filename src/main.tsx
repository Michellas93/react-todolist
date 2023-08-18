import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./pages/todoapp/App.tsx";
import "./index.css";
import { Error } from "./pages/Error.tsx";
import { Blank } from "./pages/Blank.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* mame nejakou cestu  a ta nam vraci nejaky element ktery chceme robrazit */}
        <Route path="/" element={<App />} />
        <Route path="/error" element={<Error />} />
        {/* jaka koliv jina stranka nez tyto predchozi, tak nas to hodi sem. Je dulezi aby to bylo na konci */}
        <Route path="*" element={<Blank />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
