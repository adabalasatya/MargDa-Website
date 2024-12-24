import React from "react";

const QrScanPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  px-6">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md sm:max-w-md ml-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          QR Code Scanner
        </h2>
        <div className="flex items-center justify-center mb-6">
          <div className="w-40 h-40 bg-gray-200 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Scan QR</p>
          </div>
        </div>
        <button
          type="button"
          className="w-full py-2 px-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Scan QR Code
        </button>
      </div>
    </div>
  );
};

export default QrScanPage;
