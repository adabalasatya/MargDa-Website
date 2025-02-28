import React, { useState } from "react";
import {
  FaBookOpen,
  FaBookReader,
  FaAngleDown,
  FaFile,
  FaEdit,
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
  FaTrash,
  FaFilePdf,
  FaPlay,
  FaListOl,
} from "react-icons/fa";
import { Editor } from '@tinymce/tinymce-react';

const dummyData = [
  {
    id: 1,
    course: "Career Counselling",
    subject: "Career Professional Practices",
    activity: "test",
    info: "<html><head><title></title></head><body>Teste</body></html>",
    pdf: "1art 1.pdf",
    video: "1shipping.mp4",
    marks: "100",
  },
];

const StudyActivity = () => {
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [activity, setActivity] = useState("");
  const [activityInfo, setActivityInfo] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [marks, setMarks] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (fileType === "pdf" && file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }
    if (fileType === "video" && file.type !== "video/mp4") {
      alert("Only .mp4 files are allowed");
      return;
    }
    fileType === "pdf" ? setPdfFile(file) : setVideoFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      course,
      subject,
      activity,
      activityInfo,
      pdfFile: pdfFile ? pdfFile.name : null,
      videoFile: videoFile ? videoFile.name : null,
      marks,
    });
  };

  const handleEditorChange = (content, editor) => {
    setActivityInfo(content);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const filteredData = dummyData.filter((item) =>
    item.course.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="container mx-auto p-4 bg-gray-10 min-h-screen">
      <div className="flex justify-center items-center mb-8 pt-4">
        <FaBookOpen className="text-4xl text-blue-500 mr-2" />
        <h2 className="text-4xl text-primary font-bold">Study Activity</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Course Selection */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaBookReader className="text-blue-500 mr-2" /> Select Course
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select a Course</option>
              <option value="1">Career Counselling</option>
            </select>
          </div>

          {/* Subject Selection */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaBookOpen className="text-blue-500 mr-2" /> Select Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select a Subject</option>
              <option value="1">Career Professional Practices</option>
            </select>
          </div>

          {/* Activity Input */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaBookReader className="text-blue-500 mr-2" /> Activity
            </label>
            <input 
              type="text" 
              value={activity} 
              onChange={(e) => setActivity(e.target.value)} 
              className="w-full border p-2 rounded" 
              placeholder="Activity" 
            />
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaFile className="text-blue-500 mr-2" /> Activity Pdf
            </label>
            <input 
              type="file" 
              onChange={(e) => handleFileChange(e, "pdf")} 
              className="w-full border p-2 rounded" 
            />
            {pdfFile && <p className="mt-2 text-gray-600">Uploaded: {pdfFile.name}</p>}
          </div>

          {/* Video Upload */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaFile className="text-blue-500 mr-2" /> Activity Video
            </label>
            <input 
              type="file" 
              onChange={(e) => handleFileChange(e, "video")} 
              className="w-full border p-2 rounded" 
            />
            {videoFile && <p className="mt-2 text-gray-600">Uploaded: {videoFile.name}</p>}
          </div>

          {/* Marks Input */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaBookReader className="text-blue-500 mr-2" /> Marks
            </label>
            <input 
              type="text" 
              value={marks} 
              onChange={(e) => setMarks(e.target.value)} 
              className="w-full border p-2 rounded" 
              placeholder="Marks" 
            />
          </div>

          {/* Activity Info */}
          <div className="col-span-full">
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaBookReader className="text-blue-500 mr-2" /> Activity Info
            </label>
            <Editor
              apiKey='your-api-key-here' // Replace with your actual TinyMCE API key
              value={activityInfo}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help'
              }}
              onEditorChange={handleEditorChange}
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-full">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>

 {/* Table Section */}
 <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <label>Show </label>
              <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                className="border p-1 rounded"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <label> entries</label>
            </div>
            <div className="flex items-center">
              <FaSearch className="mr-2 text-blue-500" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-white">
                <th className="px-4 py-2 border-b text-left">
                  <FaEdit className="text-blue-500 inline mr-2" /> Action
                </th>
                <th className="px-4 py-2 border-b text-left">
                  <FaBookReader className="text-blue-500 inline mr-2" /> Course
                </th>
                <th className="px-4 py-2 border-b text-left">
                  <FaBookOpen className="text-blue-500 inline mr-2" /> Subject
                </th>
                <th className="px-4 py-2 border-b text-left">
                  <FaBookReader className="text-blue-500 inline mr-2" /> Activity
                </th>
                <th className="px-4 py-2 border-b text-left">
                  <FaEdit className="text-blue-500 inline mr-2" /> Info
                </th>
                <th className="px-4 py-2 border-b text-left">
                  <FaFilePdf className="text-blue-500 inline mr-2" /> Pdf
                </th>
                <th className="px-4 py-2 border-b text-left">
                  <FaPlay className="text-blue-500 inline mr-2" /> Video
                </th>
                <th className="px-4 py-2 border-b text-left">
                  <FaListOl className="text-blue-500 inline mr-2" /> Marks
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((item) => (
                <tr key={item.id} className="odd:bg-gray-50 even:bg-white">
                  <td className="px-6 py-4 whitespace-nowrap">
                   <button className="text-blue-500 hover:text-blue-700">
                     <FaEdit className="w-4 h-4 inline" />
                      </button>&nbsp;
                       <button className="text-red-500 hover:text-red-700">
                        <FaTrash className="w-4 h-4 inline" />
                          </button>
                         </td>
                  <td className="px-4 py-2 border-b">{item.course}</td>
                  <td className="px-4 py-2 border-b">{item.subject}</td>
                  <td className="px-4 py-2 border-b">{item.activity}</td>
                  <td className="px-4 py-2 border-b" dangerouslySetInnerHTML={{ __html: item.info }}></td>
                  <td className="px-4 py-2 border-b">
                    {item.pdf && (
                      <div className="cursor-pointer" onClick={() => console.log("Open PDF")}>
                        <FaFilePdf className="inline mr-2" /> {item.pdf}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {item.video && (
                      <div className="cursor-pointer" onClick={() => console.log("Play Video")}>
                        <FaPlay className="inline mr-2" /> {item.video}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">{item.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <span>
              Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, totalRecords)} of {totalRecords} records
            </span>

            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
              >
                <FaAngleLeft />
              </button>

              <span className="px-4 py-1 border rounded bg-blue-500 text-white">
                {currentPage}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
              >
                <FaAngleRight />
              </button>
            </div>
          </div>
        </div>
    
      </div>

      {/* Footer */}
      <footer className="mt-6 w-full bg-gray-100 py-4 border-t flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm px-4">
        <span>Margdarshak © {new Date().getFullYear()}</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600">Support</a>
          <a href="#" className="hover:text-blue-600">Help Center</a>
          <a href="#" className="hover:text-blue-600">Privacy</a>
          <a href="#" className="hover:text-blue-600">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default StudyActivity;