import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaDatabase,
  FaInfoCircle,
  FaVideo,
  FaTasks,
  FaEnvelope,
  FaPlay,
  FaSearch,
} from "react-icons/fa"; // Added FaSearch
import Swal from "sweetalert2";

const VerifyCommunicationTest = () => {
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const data = [
    {
      id: 1,
      name: "sonali",
      email: "son*********@gmail.com",
      phone: "919*********",
      topic:
        "What is the root cause of attrition? Explain from employees and employers points of view.",
      answer: `<html><head><title></title></head><body>afsdhgh</body></html>`,
      videoUrl: "https://margdarshak.org/watch-communication-video/117",
      score: "",
      updateScore: "Update",
      hiretestID: 117,
    },
    {
      id: 2,
      name: "Ankita B",
      email: "ank****@yopmail.com",
      phone: "918*********",
      topic:
        "What is the root cause of attrition? Explain from employees and employers points of view.",
      answer: `<html><head><title></title></head><body></body></html>`,
      videoUrl: "https://margdarshak.org/watch-communication-video/125",
      score: "50",
      updateScore: "Verified",
      hiretestID: 125,
    },
    {
      id: 3,
      name: "Shaily Pathak",
      email: "pat***********@gmail.com",
      phone: "829*******",
      topic:
        "Why school managements are reluctant to implement the provisions of career counselling? - comment.",
      answer: `<html><head><title></title></head><body>test</body></html>`,
      videoUrl: "https://margdarshak.org/watch-communication-video/115",
      score: "50",
      updateScore: "Verified",
      hiretestID: 115,
    },
  ];

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entries);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entries,
    currentPage * entries
  );

  useEffect(() => {
    // Reset to first page when entries or search term changes
    setCurrentPage(1);
  }, [entries, searchTerm]);

  const handleScoreModal = (id, name) => {
    document.getElementById("hiretestID").value = id;
    document.getElementById("candidate_name").innerText = name;
  };

  const handleReadModal = (ans, name) => {
    document.getElementById("ans_content").innerHTML = ans;
    document.getElementById("ans_name").innerText = name;
  };

  const handleScoreFormSubmit = (e) => {
    e.preventDefault();
    const score = document.getElementById("score").value;
    if (score.trim().length > 2 || score.trim().length === 0) {
      Swal.fire(
        "Score",
        "Maximum length 2 characters | Minimum length 1 character",
        "info"
      );
    } else {
      console.log("Form submitted with score:", score);
    }
  };

  return (
    <div className="min-h-screen mt-8 p-6">
      {/* Main Content */}
      <main className="container mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-semibold text-gray-800 flex items-center">
            <FaUsers className="text-blue-500 mr-2" /> Verify Communication Test
          </h2>
        </div>

        {/* Table Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <label className="text-gray-600">Show</label>
            <select
              className="border border-gray-300 rounded px-2 py-1"
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-gray-600">entries</span>
          </div>
          <div className="relative">
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-1 w-48 pl-10"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 font-medium">
                  <FaDatabase className="inline mr-1" /> Sr.no
                </th>
                <th className="p-3 font-medium">
                  <FaInfoCircle className="inline mr-1" /> User Details
                </th>
                <th className="p-3 font-medium">
                  <FaInfoCircle className="inline mr-1" /> Topic
                </th>
                <th className="p-3 font-medium">
                  <FaVideo className="inline mr-1" /> Answer
                </th>
                <th className="p-3 font-medium">
                  <FaVideo className="inline mr-1" /> Video
                </th>
                <th className="p-3 font-medium">
                  <FaTasks className="inline mr-1" /> Score
                </th>
                <th className="p-3 font-medium">
                  <FaTasks className="inline mr-1" /> Update Score
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.email}</div>
                    <div className="text-sm text-gray-500">{item.phone}</div>
                  </td>
                  <td className="p-3">{item.topic}</td>
                  <td className="p-3">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                      data-bs-toggle="modal"
                      data-bs-target="#readModal"
                      onClick={() => handleReadModal(item.answer, item.name)}
                    >
                      View Answer
                    </button>
                  </td>
                  <td className="p-3">
                    <a href={item.videoUrl}>
                      <FaPlay className="text-red-500 text-xl hover:text-red-600 transition" />
                    </a>
                  </td>
                  <td className="p-3">{item.score || "-"}</td>
                  <td className="p-3">
                    {item.updateScore === "Update" ? (
                      <button
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                        data-bs-toggle="modal"
                        data-bs-target="#scoreModal"
                        onClick={() =>
                          handleScoreModal(item.hiretestID, item.name)
                        }
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-green-500 text-white px-4 py-1 rounded opacity-60 cursor-not-allowed"
                      >
                        Verified
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-600">
            Showing {(currentPage - 1) * entries + 1} to{" "}
            {Math.min(currentPage * entries, filteredData.length)} of{" "}
            {filteredData.length} entries
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        {/* Copyright Footer */}
        <div className="text-center text-sm text-gray-500 mt-6 p-4">
          <span>
            Margdarshak © {new Date().getFullYear()}. All Rights Reserved.
          </span>
        </div>
      </main>
    </div>
  );
};

export default VerifyCommunicationTest;
