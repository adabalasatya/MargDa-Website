import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye, FaSearch, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AddTemplateTeamContainer from "../../Components/Dashboard/Template/AddTemplateTeamContainer";

const TemplatesList = () => {
  const [recordsPerPage, setRecordsPerPage] = useState(10); // Default to 10 records per page
  const [searchTerm, setSearchTerm] = useState("");
  const [templateFilter, setTemplateFilter] = useState("");
  const [templates, setTemplates] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewTemplate, setViewTemplate] = useState(false);
  const [viewedTemplateData, setViewedTemplateData] = useState(null);
  const [isTemplateTeamCon, setIsAddTemplateTeamCon] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userLocalData ? userLocalData.access_token : null;
  const loginUserID = userLocalData.user_data.userID;

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/templates/get-templates",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch templates");
      const data = await response.json();
      if (response.ok) {
        const templates = data.Templates;
        templates.map((template) => {
          template.tempTypeName =
            template.temptype == "E"
              ? "Email"
              : template.temptype == "S"
              ? "SMS"
              : template.temptype == "WA"
              ? "Whatsapp Api"
              : template.temptype == "WS"
              ? "Whatsapp SIM"
              : "Undefined";
        });
        setAllTemplates(templates);

        const selfTemplates = templates.filter(
          (item) => item.euser == loginUserID
        );

        setTemplates(selfTemplates);
      } else {
        toast.error(data.message);
      }
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
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tempID }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        await fetchTemplates();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error(error.message);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = templates.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(templates.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getPaginationRange = () => {
    const totalPageNumbers = 5; // Number of page numbers to show
    const halfRange = Math.floor(totalPageNumbers / 2);

    let startPage = Math.max(currentPage - halfRange, 1);
    let endPage = Math.min(startPage + totalPageNumbers - 1, totalPages);

    if (endPage - startPage + 1 < totalPageNumbers) {
      startPage = Math.max(endPage - totalPageNumbers + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const handleShowAddTeam = (template) => {
    setIsAddTemplateTeamCon(true);
    setSelectedTemplate(template);
  };

  const filter = (allTemplates, templateFilter, searchTerm) => {
    const filteredData = allTemplates.filter((item) => {
      const lowerCaseQuery = searchTerm.toLowerCase().trim();
      const matchesSearchQuery = Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(lowerCaseQuery)
      );
      if (templateFilter == "self") {
        return matchesSearchQuery && item.euser == loginUserID;
      } else if (templateFilter == "others") {
        return matchesSearchQuery && item.euser != loginUserID;
      } else if (templateFilter == "team") {
        return (
          matchesSearchQuery &&
          item.team &&
          Array.isArray(item.team) &&
          item.team.includes(loginUserID)
        );
      }
      return matchesSearchQuery;
    });

    setTemplates(filteredData);
  };

  useEffect(() => {
    setCurrentPage(1);
    filter(allTemplates, templateFilter, searchTerm);
  }, [templateFilter, searchTerm]);

  const handleTemplateFilterChange = (e) => {
    setTemplateFilter(e.target.value);
  };

  return (
    <div className=" min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-blue-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Templates</h1>
          <Link
            to="/add-template"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Template
          </Link>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Show</span>
            <select
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(Number(e.target.value))}
              className="border border-gray-300 p-2 rounded w-16 text-center"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>

            <span className="text-sm font-bold">Records</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-[200px] ml-4">
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 p-2 pl-8 rounded w-full"
              />
            </div>
            <select
              className="border border-gray-300 p-2 rounded"
              value={templateFilter}
              onChange={handleTemplateFilterChange}
              disabled={allTemplates.length == 0}
            >
              <option value="self">Your Templates</option>
              <option value="team">Team Templates</option>
              <option value="others">Others Shared Templates</option>
            </select>
          </div>
        </div>
        {currentRecords.length === 0 ? (
          <div className="text-center text-gray-600 py-20">
            No templates found
          </div>
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
                  {currentRecords.map((template, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-6 py-4">{template.tempTypeName}</td>
                      <td className="px-6 py-4">{template.template}</td>
                      <td className="px-6 py-4">
                        {template.share ? "Y" : "N"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-4">
                          {template.euser == loginUserID && (
                            <div className="flex items-center gap-4">
                              <div className="relative group flex items-center">
                                <button
                                  className="text-green-600 hover:text-green-800"
                                  onClick={() => handleShowAddTeam(template)}
                                >
                                  <FaUsers />
                                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Add Template Team
                                  </span>
                                </button>
                              </div>

                              <Link
                                to="/edit-template"
                                state={{ tempID: template.tempID }}
                              >
                                <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                              </Link>
                              <button
                                onClick={() =>
                                  handleDeleteTemplate(template.tempID)
                                }
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                              >
                                <FaTrash />
                              </button>
                            </div>
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
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstRecord + 1} to{" "}
                {Math.min(indexOfLastRecord, templates.length)} Records
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 bg-gray-200 text-gray-700 rounded ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-300"
                  }`}
                >
                  {"<<"} Previous
                </button>
                {getPaginationRange().map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 ${
                      currentPage === page
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } rounded`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 bg-gray-200 text-gray-700 rounded ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-300"
                  }`}
                >
                  Next {">>"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {viewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
                    __html:
                      viewedTemplateData.matter || "Preview Will be Shown Here",
                  }}
                />
              </div>
            )}
            {viewedTemplateData.attach_url &&
              viewedTemplateData.attach_url.length > 0 &&
              viewedTemplateData.attach_url.map((url, index) => (
                <div key={index} className="mt-4">
                  <label className="font-bold mb-2">{`Attachment ${
                    index + 1
                  }`}</label>
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

      {isTemplateTeamCon && (
        <AddTemplateTeamContainer
          selectedTemplate={selectedTemplate}
          setIsAddTemplateTeamCon={setIsAddTemplateTeamCon}
        />
      )}
       <footer className="text-center text-sm text-black-600 p-2 bg-white shadow-lg rounded-t-2xl">
        <span>Margdarshak © {new Date().getFullYear()}. All Rights Reserved.</span>
      </footer>
    </div>
  );
};

export default TemplatesList;
