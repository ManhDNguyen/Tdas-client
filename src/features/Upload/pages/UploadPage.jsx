import React from "react";
import UploadForm from "../components/UploadForm";

const UploadPage = () => {
  return (
    <div className="ml-8">
      <br />
      <div className="font-black text-3xl">Upload Form</div>
      <br />
      <p> Upload data from an XLSX file. </p>
      <br />
      <UploadForm />
    </div>
  );
};

export default UploadPage;
