import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import { Card, Spin, message } from 'antd'; // Ant Design components

// Set the workerSrc to load the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfViewer({ chapterId }) {
  const [pdfBlob, setPdfBlob] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (chapterId) {
      setLoading(true);
      // Fetch the PDF from the server
      axios.get(`${API_URL}/chapters/pdf/${chapterId}`, { responseType: 'blob' })
        .then((response) => {
          setPdfBlob(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching PDF:", error);
          message.error('Failed to load PDF');
          setLoading(false);
        });
    }
  }, [chapterId, API_URL]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!pdfBlob) {
    return <Spin size="large" style={{ marginTop: '50px' }} />; // AntD spinner while loading
  }

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Card
        bordered={false}
        style={{ width: '100%', height: '100%', overflowY: 'auto', padding: 0 }}
        bodyStyle={{ height: '100%', width: '100%' }} // Adjust card body to fit full screen
      >
        <div style={{ height: '100%', overflowY: 'auto', padding: '10px' }}>
          <Document
            file={URL.createObjectURL(pdfBlob)} // Create object URL from the blob
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => {
              console.error("PDF loading error:", error);
              message.error('Failed to load PDF document');
            }}
          >
            {/* Render each page */}
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                // width={document.documentElement.clientWidth - 1200} // Set page width to fit screen with some padding
              />
            ))}
          </Document>
        </div>
      </Card>
    </div>
  );
}

export default PdfViewer;
