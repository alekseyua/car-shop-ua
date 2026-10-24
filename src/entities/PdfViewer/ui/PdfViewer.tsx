"use client";

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { usePdfStore } from "../model/pdf.store";
import { BACKEND_HOST } from "@/src/config";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PdfViewer = () => {
  const { pdfFile } = usePdfStore();

  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(800);

  useEffect(() => {
    const updateWidth = () => {
      setPageWidth(Math.min(800, window.innerWidth - 32));
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    setNumPages(0);
  }, [pdfFile]);

  if (!pdfFile) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        PDF не выбран
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-gray-100 p-2 sm:p-4">
      <Document
        key={pdfFile}
        file={BACKEND_HOST + "/proxy/pdf?pdf=" + pdfFile}
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages);
        }}
        loading={
          <div className="flex min-h-[300px] items-center justify-center">
            Загрузка PDF...
          </div>
        }
        error={
          <div className="flex min-h-[300px] items-center justify-center text-red-500">
            Не удалось загрузить PDF
          </div>
        }
      >
        <div className="flex flex-col items-center gap-4">
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page-${index + 1}`}
              pageNumber={index + 1}
              width={pageWidth}
              renderTextLayer
              renderAnnotationLayer
            />
          ))}
        </div>
      </Document>
    </div>
  );
};

export default PdfViewer;

// "use client";

// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";
// import { usePdfStore } from "../model/pdf.store";
// import { BACKEND_HOST } from "@/src/config";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url,
// ).toString();

// const PdfViewer = () => {
//   const { pdfFile } = usePdfStore();
//   const [numPages, setNumPages] = useState<number>(0);

//   return (
//     <div className="h-full w-full overflow-y-auto bg-gray-100 p-2 sm:p-4">
//       <Document
//         file={BACKEND_HOST + "/proxy/pdf?pdf=" + pdfFile}
//         onLoadSuccess={({ numPages }) => {
//           setNumPages(numPages);
//         }}
//         loading={
//           <div className="flex min-h-[300px] items-center justify-center">
//             Загрузка PDF...
//           </div>
//         }
//         error={
//           <div className="flex min-h-[300px] items-center justify-center text-red-500">
//             Не удалось загрузить PDF
//           </div>
//         }
//       >
//         <div className="flex flex-col items-center gap-4">
//           {Array.from({ length: numPages }, (_, index) => (
//             <Page
//               key={`page-${index + 1}`}
//               pageNumber={index + 1}
//               width={Math.min(
//                 800,
//                 typeof window !== "undefined" ? window.innerWidth - 32 : 800,
//               )}
//               renderTextLayer
//               renderAnnotationLayer
//             />
//           ))}
//         </div>
//       </Document>
//     </div>
//   );
// };

// export default PdfViewer;
