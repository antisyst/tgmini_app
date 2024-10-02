import React, { useEffect, useState } from 'react';

const StartPage: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Example PDF URL
  const pdfFileUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  useEffect(() => {
    // Set the external PDF URL directly
    setPdfUrl(pdfFileUrl);
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center', height: '100vh' }}>
      <h2>PDF Preview</h2>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          title="PDF Preview"
          style={{ width: '100%', height: '80vh', border: '1px solid #ccc' }}
        />
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default StartPage;
