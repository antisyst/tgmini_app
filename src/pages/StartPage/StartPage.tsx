import React, { useEffect, useState } from 'react';

const StartPage: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // This function generates a simple PDF as a Blob and returns its URL.
  const generatePDF = async (): Promise<string> => {
    const pdfContent = `
      %PDF-1.4
      1 0 obj
      << /Type /Catalog /Pages 2 0 R >>
      endobj
      2 0 obj
      << /Type /Pages /Count 1 /Kids [3 0 R] >>
      endobj
      3 0 obj
      << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
      endobj
      4 0 obj
      << /Length 44 >>
      stream
      BT
      /F1 24 Tf
      100 700 Td
      (Hello from Telegram Mini App!) Tj
      ET
      endstream
      endobj
      xref
      0 5
      0000000000 65535 f
      0000000010 00000 n
      0000000053 00000 n
      0000000102 00000 n
      0000000199 00000 n
      trailer
      << /Size 5 /Root 1 0 R >>
      startxref
      292
      %%EOF
    `;

    const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
    return URL.createObjectURL(pdfBlob);
  };

  useEffect(() => {
    const loadPDF = async () => {
      const url = await generatePDF();
      setPdfUrl(url);
    };

    loadPDF();
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
