import React, { useState } from "react";
import { uploadDocument } from "../../Firebase/addGetDocuments";
const UploadForm = () => {
  const [formData, setFormData] = useState({
    documentName: "",
    type: "",
    category: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("uploading fiile: ", formData);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData({
      ...formData,
      file: selectedFile,
    });
    console.log("uploading fiile: ", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await uploadDocument(formData);
      // Reset form fields after successful upload
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  return (
    <div>
      <h2>Upload Document</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="documentName">Document Name:</label>
          <input
            type="text"
            id="documentName"
            name="documentName"
            value={formData.documentName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="compliance">Compliance</option>
            <option value="sales">Sales</option>
            <option value="policies">Policies</option>
            <option value="marketing">Marketing</option>

            {/* Add more categories as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="file">Choose File:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
