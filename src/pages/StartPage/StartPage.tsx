import React, { useEffect, useState } from 'react';

const StartPage: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Example PDF URL (ensure it is high resolution)
  const pdfFileUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  useEffect(() => {
    setPdfUrl(pdfFileUrl);
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center', height: '100vh' }}>
      <h2>PDF Preview</h2>
      {pdfUrl ? (
        <div>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
              Open PDF in Full Resolution
            </button>
          </a>
          <p style={{ marginTop: '10px' }}>Click the button to view or download the PDF in full resolution.</p>
        </div>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default StartPage;
