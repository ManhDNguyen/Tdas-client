import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../../lib/axios";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileIsUploading, setFileIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setFileIsUploading(true);
      const res = await axios.post("/api/data/upload", formData);

      alert(res.data.error);

      if (res?.data?.testId != undefined) {
        alert("File uploaded successfully");
        navigate("/test/" + res?.data?.testId);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload the file");
    }
    setFileIsUploading(false);
  };

  return (
    <>
      {fileIsUploading ? (
        <div>uploading file...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
          <br />
          <br />
          <button
            className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {" "}
            Upload
          </button>
        </form>
      )}
    </>
  );
};

export default UploadForm;
