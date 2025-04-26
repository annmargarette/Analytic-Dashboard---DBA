import React, { useState, useEffect } from 'react';
import './studentdata.css';

const StudentData = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [file, setFile] = useState(null);
    const [iframeKey, setIframeKey] = useState(Date.now());

  const handleImport = () => setShowUploadModal(true);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async () => {
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();  
  
      if (['csv', 'xls', 'xlsx'].includes(fileExtension)) {
        console.log('Submitting file:', file.name);
        const formData = new FormData();
        formData.append('file', file);  // <== Don't forget to append the actual file!
        formData.append('type', 'student');  // optional, if backend handles it
  
        try {
          const response = await fetch('http://localhost:8050/upload_dataset', {
            method: 'POST',
            body: formData
          });
  
          const result = await response.json();
          console.log('Server Response:', result);
  
          if (result.status === 'success') {
            alert(result.message);
            setIframeKey(Date.now());
            setSelectedCard(null);
          } else {
            alert("Upload failed: " + result.message);
          }
  
        } catch (error) {
          console.error('Error uploading file:', error);
          alert("An error occurred during upload.");
        }
  
        setShowUploadModal(false);  
        setFile(null);
  
      } else {
        alert("Please select a valid CSV or Excel file.");
      }
    } else {
      alert("Please select a file before submitting.");
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--zoom', zoomLevel);
  }, [zoomLevel]);

  const cardsData = [
    { label: "Student Population per Grade Level by Gender", src: "http://localhost:8050/graph7" },
    { label: "Student Distrubution per SHS Strand by Sector", src: "http://localhost:8050/graph8" },
    { label: "Student Distribution by Grade Division and School Sector", src: "http://localhost:8050/graph9" },
  ];

  return (
    <div className="student-data-container">
      <header className="student-header">
        <h1>Student Data</h1>
      </header>

      <div className="import-export-top">
        <button onClick={handleImport}>Add New DataSet</button>
      </div>

      <div className="cards-wrapper">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="student-card"
            onClick={() => {
              setSelectedCard(card);
              setZoomLevel(1);
            }}
          >
            <label>{card.label}</label>
            <iframe
              key={iframeKey}
              src={card.src}
              title={card.label}
              style={{
                width: '100%',
                height: '750px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                marginTop: '10px',
              }}
            />
          </div>
        ))}
      </div>

      {selectedCard && (
        <div className="modal-overlay" onClick={() => setSelectedCard(null)}>
          <div className="modal-card-expanded-modal" onClick={(e) => e.stopPropagation()}>
            <div
              className="modal-content"
              style={{
                transform: `scale(${zoomLevel})`,
                width: `${100 / zoomLevel}%`,
                height: `${100 / zoomLevel}%`,
              }}
            >
              <h2>{selectedCard.label}</h2>
              <iframe
                key={iframeKey}
                src={selectedCard.src}
                title={selectedCard.label}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {showUploadModal && (
        <div className="upload-modal-overlay-student" onClick={() => setShowUploadModal(false)}>
          <div className="upload-modal-student" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Dataset</h2>
            <p>Upload a CSV or Excel file:</p>
            <input 
              type="file" 
              onChange={handleFileChange} 
              accept=".csv, .xls, .xlsx" 
            />
            <div className="modal-buttons-student">
              <button onClick={() => setShowUploadModal(false)} className="cancel-btn-student">Cancel</button>
              <button onClick={handleSubmit} className="submit-btn-student">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentData;