import React, { useState } from "react";

const DataShare = () => {
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [link, setLink] = useState("");

  const handleGenerateLink = () => {
    if (data) {
      const generatedLink = `https://example.com/share?data=${encodeURIComponent(data)}`;
      setLink(generatedLink);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Data shared with ${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">Share Your Data</h2>
        
        {/* Form for Sharing Data */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="data" className="block text-sm font-medium text-gray-700">
              Enter Data to Share
            </label>
            <textarea
              id="data"
              name="data"
              rows="4"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
              placeholder="Enter the data you want to share"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address to Share With
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
              placeholder="Enter recipient's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white font-medium text-sm rounded-md shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            Share via Email
          </button>
        </form>

        {/* Generate Sharing Link */}
        <div className="mt-6">
          <button
            onClick={handleGenerateLink}
            className="w-full py-2 px-4 bg-orange-500 text-white font-medium text-sm rounded-md shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Generate Sharing Link
          </button>
          {link && (
            <div className="mt-4 bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              <p className="font-medium">Sharing Link:</p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline break-all"
              >
                {link}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataShare;
