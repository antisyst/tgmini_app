import React, { useEffect, useState } from 'react';

const StartPage: React.FC = () => {
  const [pdfPages, setPdfPages] = useState<string[]>([]);

  // Example PDF URL
  const pdfFileUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  useEffect(() => {
    const fetchAndRenderPDF = async () => {
      const response = await fetch(pdfFileUrl);
      const arrayBuffer = await response.arrayBuffer();
      const pdfData = new Uint8Array(arrayBuffer);

      const pdfJS = await import('pdfjs-dist/build/pdf'); // PDF.js library
      pdfJS.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.7.570/pdf.worker.min.js';

      const pdfDocument = await pdfJS.getDocument({ data: pdfData }).promise;

      const pages: string[] = [];
      for (let i = 1; i <= pdfDocument.numPages; i++) {
        const page = await pdfDocument.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        pages.push(canvas.toDataURL()); // Convert canvas to image
      }

      setPdfPages(pages); // Store images of PDF pages
    };

    fetchAndRenderPDF();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>PDF Preview</h2>
      {pdfPages.length > 0 ? (
        <div>
          {pdfPages.map((page, index) => (
            <img
              key={index}
              src={page}
              alt={`PDF page ${index + 1}`}
              style={{ width: '100%', marginBottom: '20px' }}
            />
          ))}
        </div>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default StartPage;
