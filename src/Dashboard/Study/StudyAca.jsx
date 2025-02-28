import React, { useState } from 'react';
import { FaGraduationCap, FaEdit, FaTrash } from 'react-icons/fa';

const StudyAca = () => {
  // Predefined options for dropdowns
  const boardUniversityOptions = ['CBSE', 'ICSE', 'State Board', 'University A', 'University B'];
  const classExamOptions = ['Class 10', 'Class 12', 'Semester 1', 'Semester 2', 'Final Exam'];
  const subjectOptions = ['Mathematics', 'Science', 'English', 'History', 'Geography'];

  // State to manage form inputs
  const [formData, setFormData] = useState({
    boardUniversity: '',
    classExam: '',
    subject: '',
    marksTotal: '',
    marksPass: '',
    marksCorrect: '',
    marksWrong: '',
    mcqQuestions: '',
    mcqTime: '',
    fee: '',
    syllabus: '',
    syllabusDoc: '',
  });

  // Dummy data for the table
  const dummyData = [
    {
      boardUniversity: 'CBSE',
      classExam: 'Class 10',
      subject: 'Mathematics',
      marksTotal: '100',
      marksPass: '40',
      fee: '500',
    },
    {
      boardUniversity: 'ICSE',
      classExam: 'Class 12',
      subject: 'Science',
      marksTotal: '80',
      marksPass: '35',
      fee: '600',
    },
    {
      boardUniversity: 'State Board',
      classExam: 'Semester 1',
      subject: 'English',
      marksTotal: '90',
      marksPass: '45',
      fee: '450',
    },
  ];

  // State to manage table data, initialized with dummy data
  const [tableData, setTableData] = useState(dummyData);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      syllabusDoc: e.target.files[0]?.name || '',
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form data to table data
    setTableData([...tableData, formData]);
    // Reset form
    setFormData({
      boardUniversity: '',
      classExam: '',
      subject: '',
      marksTotal: '',
      marksPass: '',
      marksCorrect: '',
      marksWrong: '',
      mcqQuestions: '',
      mcqTime: '',
      fee: '',
      syllabus: '',
      syllabusDoc: '',
    });
  };

  // Handle delete action
  const handleDelete = (index) => {
    setTableData(tableData.filter((_, i) => i !== index));
  };

  // Handle edit action (placeholder for now)
  const handleEdit = (index) => {
    // Placeholder for edit functionality
    console.log(`Edit row at index ${index}`);
    // You can implement logic here to populate the form with the selected row's data
  };

  return (
    <div className="min-h-screen bg-gray-10 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Form Section */}
        <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center">
          <FaGraduationCap className="mr-2 text-green-600" />
          Study ACA Form
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Board/University */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Board/University *
              </label>
              <select
                name="boardUniversity"
                value={formData.boardUniversity}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Board/University</option>
                {boardUniversityOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Class/Exam */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Class/Exam *
              </label>
              <select
                name="classExam"
                value={formData.classExam}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Class/Exam</option>
                {classExamOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Subject</option>
                {subjectOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Marks Total */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Marks Total *
              </label>
              <input
                type="text"
                name="marksTotal"
                value={formData.marksTotal}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Marks Pass */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Marks Pass *
              </label>
              <input
                type="text"
                name="marksPass"
                value={formData.marksPass}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Marks Correct */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Marks Correct *
              </label>
              <input
                type="text"
                name="marksCorrect"
                value={formData.marksCorrect}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Marks Wrong */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Marks Wrong *
              </label>
              <input
                type="text"
                name="marksWrong"
                value={formData.marksWrong}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* MCQ Questions */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                MCQ Questions *
              </label>
              <input
                type="text"
                name="mcqQuestions"
                value={formData.mcqQuestions}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* MCQ Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                MCQ Time *
              </label>
              <input
                type="text"
                name="mcqTime"
                value={formData.mcqTime}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Fee */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fee *
              </label>
              <input
                type="text"
                name="fee"
                value={formData.fee}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Syllabus */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Syllabus *
              </label>
              <input
                type="text"
                name="syllabus"
                value={formData.syllabus}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Syllabus Doc */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Syllabus Doc *
              </label>
              <input
                type="file"
                name="syllabusDoc"
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Submit Button (Aligned to the Right) */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Table Section */}
        <h2 className="text-2xl font-bold text-center mb-4">Table Data</h2>
        {tableData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Action</th>
                  <th className="py-3 px-6 text-left">Board/University</th>
                  <th className="py-3 px-6 text-left">Class/Exam</th>
                  <th className="py-3 px-6 text-left">Subject</th>
                  <th className="py-3 px-6 text-left">Marks Total</th>
                  <th className="py-3 px-6 text-left">Marks Pass</th>
                  <th className="py-3 px-6 text-left">Fee</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {tableData.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left flex space-x-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                    <td className="py-3 px-6 text-left">{data.boardUniversity}</td>
                    <td className="py-3 px-6 text-left">{data.classExam}</td>
                    <td className="py-3 px-6 text-left">{data.subject}</td>
                    <td className="py-3 px-6 text-left">{data.marksTotal}</td>
                    <td className="py-3 px-6 text-left">{data.marksPass}</td>
                    <td className="py-3 px-6 text-left">{data.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
      </div>

      {/* Footer */}
<footer className="mt-4 w-full bg-gray-100 py-4 border-t flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm px-4">
        <span>Margdarshak © {new Date().getFullYear()}</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600">
            Support
          </a>
          <a href="#" className="hover:text-blue-600">
            Help Center
          </a>
          <a href="#" className="hover:text-blue-600">
            Privacy
          </a>
          <a href="#" className="hover:text-blue-600">
            Terms
          </a>
        </div>
      </footer>
      
    </div>
  );
};

export default StudyAca;