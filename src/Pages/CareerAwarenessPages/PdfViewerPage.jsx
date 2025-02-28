import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Dashboard/Navbar";
import Sidebar from "../../Dashboard/Sidebar";

const PdfViewerPage = () => {
  const { pdfFile } = useParams(); // Get the PDF file name from the URL

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={true} isMobile={false} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-grow overflow-hidden flex flex-col">
          <div className="flex-grow">
            <iframe
              src={`/public/pdfs/${pdfFile}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-none"
              title="PDF Viewer"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewerPage;
