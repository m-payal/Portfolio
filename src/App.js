// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/nav/nav";
import FullPage from "./components/fullPage/fullPage";

const Paintings = lazy(() => import("./pages/paintings"));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* Spacer equal to Toolbar height so sections never hide under the sticky nav */}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<FullPage />} />
          <Route path="/paintings" element={<Paintings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
