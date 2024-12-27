import React from 'react';

const WhatsappScan = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Scan WhatsApp QR Code</h1>
        
        {/* QR Code Placeholder */}
        <div className="bg-gray-200 p-6 rounded-lg mb-6 flex items-center justify-center">
          <span className="text-gray-500 text-sm">QR Code Placeholder</span>
        </div>

        {/* Instructions */}
        <p className="text-gray-600 mb-6">
          Open WhatsApp on your phone, go to Settings, and scan the QR code to link your device.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Scan QR Code
          </button>
          <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsappScan;