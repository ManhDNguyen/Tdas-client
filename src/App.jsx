import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./features/Nav/Navbar";
import HomePage from "./features/Home/pages/HomePage";
import UploadPage from "./features/Upload/pages/UploadPage";

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="test/:testId" element={<HomePage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
