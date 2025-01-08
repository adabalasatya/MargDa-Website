import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TemplatesFooter = () => {
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [templates, setTemplates] = useState([]);
  const [showFilteredFrom, setShowFilteredFrom] = useState(true);
  const [userID, setUserID] = useState(null);
  const [viewTemplate, setViewTemplate] = useState(false);
  const [viewedTemplateData, setViewedTemplateData] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const userId = localStorage.getItem("userID");
    setUserID(userId);
    if (!userId) return setTemplates([]);

    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/templates/get-templates",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID: userId }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch templates");
      const data = await response.json();
      setTemplates(data.Templates);
      setTotalPages(Math.ceil(data.Templates.length / entriesToShow));
      setCurrentData(data.Templates);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const handleDeleteTemplate = async (tempID) => {
    if (!window.confirm("Are you sure you want to delete this template?")) {
      return;
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/templates/delete-template",
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tempID }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setCurrentData((prevData) =>
          prevData.filter((template) => template.tempID != tempID)
        );
        setTemplates((prevData) =>
          prevData.filter((template) => template.tempID != tempID)
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const data = filteredTemplates.slice(
      (page - 1) * entriesToShow,
      page * entriesToShow
    );

    setCurrentData(data);
    setTotalPages(Math.ceil(filteredTemplates.length / entriesToShow));
  }, [entriesToShow, page, searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [entriesToShow]);

  const filteredTemplates = templates.filter(
    (template) =>
      (template.template &&
        template.template.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (template.temptype &&
        template.temptype.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    setPage(1);
    if (searchTerm !== "") {
      setShowFilteredFrom(true);
    } else {
      setShowFilteredFrom(false);
    }
  }, [searchTerm]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {viewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-2/3 max-h-[90%] bg-white rounded-lg p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Template Details</h2>
              <button
                onClick={() => setViewTemplate(false)}
                className="text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-bold mb-2">Template Type</label>
                <input
                  disabled
                  type="text"
                  value={
                    viewedTemplateData.temptype === "WS"
                      ? "Scan Whatsapp"
                      : viewedTemplateData.temptype === "WA"
                      ? "Whatsapp API"
                      : viewedTemplateData.temptype.trim() === "E"
                      ? "Email"
                      : viewedTemplateData.temptype.trim() === "S"
                      ? "SMS"
                      : viewedTemplateData.temptype
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Template Name</label>
                <input
                  disabled
                  type="text"
                  value={viewedTemplateData.template}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            {(viewedTemplateData.subject || viewedTemplateData.auth) && (
              <div className="mt-4">
                <label className="font-bold mb-2">
                  {viewedTemplateData.subject ? "Subject" : "Template ID"}
                </label>
                <input
                  disabled
                  type="text"
                  value={viewedTemplateData.subject || viewedTemplateData.auth}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            )}
            {viewedTemplateData.bimg_url && (
              <div className="mt-4">
                <label className="font-bold mb-2">Header File</label>
                <a
                  href={viewedTemplateData.bimg_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Header File
                </a>
              </div>
            )}
            <div className="mt-4">
              <label className="font-bold mb-2">Message</label>
              <textarea
                disabled
                value={viewedTemplateData.matter}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows="10"
              />
            </div>
            {viewedTemplateData.matter.toLowerCase().includes("<html") && (
              <div className="mt-4">
                <label className="font-bold mb-2">Preview</label>
                <div
                  className="w-full p-4 border border-gray-300 rounded-lg overflow-auto"
                  dangerouslySetInnerHTML={{
                    __html: viewedTemplateData.matter || "Preview Will be Shown Here",
                  }}
                />
              </div>
            )}
            {viewedTemplateData.attach_url &&
              viewedTemplateData.attach_url.length > 0 &&
              viewedTemplateData.attach_url.map((url, index) => (
                <div key={index} className="mt-4">
                  <label className="font-bold mb-2">{`Attachment ${index + 1}`}</label>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Attachment
                  </a>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Footer Templates</h1>
          <Link
            to="/add-footer"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Footer
          </Link>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <label className="mr-2">Show Entries:</label>
            <select
              value={entriesToShow}
              onChange={(e) => setEntriesToShow(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {currentData.length === 0 ? (
          <div className="text-center text-gray-600 py-20">No Footer found</div>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Type</th>
                    <th className="px-6 py-3 text-left">Template</th>
                    <th className="px-6 py-3 text-left">Share</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((template, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-6 py-4">{template.temptype}</td>
                      <td className="px-6 py-4">{template.template}</td>
                      <td className="px-6 py-4">{template.share ? "Y" : "N"}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-4">
                          {template.euser == userID && (
                            <Link
                              to="/dashboard/edit-template"
                              state={{ tempID: template.tempID }}
                            >
                              <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                            </Link>
                          )}
                          {template.euser == userID && (
                            <button
                              onClick={() => handleDeleteTemplate(template.tempID)}
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <FaTrash />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setViewedTemplateData(templates[index]);
                              setViewTemplate(true);
                            }}
                            className="text-blue-500 hover:text-blue-700 cursor-pointer"
                          >
                            <FaEye />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-6">
              <div className="text-gray-600">
                Showing {(page - 1) * entriesToShow + 1} to{" "}
                {Math.min(page * entriesToShow, filteredTemplates.length)} of{" "}
                {filteredTemplates.length} entries
                {showFilteredFrom && ` (filtered from ${templates.length} entries)`}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 border border-gray-300 rounded-lg ${
                      page === index + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 text-center text-gray-600">
        Copyright @ 2024 <span className="text-blue-500">Margdarshak</span>. All rights
        reserved.
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default TemplatesFooter;