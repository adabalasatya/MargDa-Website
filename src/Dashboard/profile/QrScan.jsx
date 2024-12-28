import React from "react";

const QrScanPage = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6">
        <div className="w-full max-w-sm p-4 sm:p-6 bg-white rounded-lg shadow-md sm:max-w-md mx-4 sm:ml-16">
          <h2 className="text-lg sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
            QR Code Scanner
          </h2>
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
              <p className="text-sm sm:text-base text-gray-600">Scan QR</p>
            </div>
          </div>
          <button
            type="button"
            className="w-full py-2 px-4 bg-orange-500 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Scan QR Code
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-black text-center py-4 mt-6">
        <p className="text-xs sm:text-sm">&copy; 2024 Margdarshak Media. All rights reserved.</p>
      </footer>
    </>
  );
};

export default QrScanPage;