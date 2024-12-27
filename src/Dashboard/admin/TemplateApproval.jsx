import React from 'react';

const TemplateApproval = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Template Approval</h1>
        
        <div className="space-y-6">
          {/* Template Card */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Template Title</h2>
            <p className="text-gray-600 mb-4">
              This is a sample template description. It provides details about the template that needs approval.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Created by: John Doe</span>
              <div className="space-x-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                  Approve
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  Reject
                </button>
              </div>
            </div>
          </div>

          {/* Another Template Card */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Another Template Title</h2>
            <p className="text-gray-600 mb-4">
              This is another template description. It provides details about the template that needs approval.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Created by: Jane Smith</span>
              <div className="space-x-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                  Approve
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateApproval;