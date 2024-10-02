import React, { useEffect, useState } from 'react';

const StartPage: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Example PDF URL
  const pdfFileUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  useEffect(() => {
    setPdfUrl(pdfFileUrl);
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center', height: '100vh' }}>
      <h2>PDF Preview</h2>
      {pdfUrl ? (
        <object
          data={pdfUrl}
          type="application/pdf"
          width="100%"
          height="80vh"
        >
          <p>Your browser does not support PDFs. Please <a href={pdfUrl}>download the PDF</a> to view it.</p>
        </object>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default StartPage;
