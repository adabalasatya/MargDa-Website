import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CallCon = ({ setShowCallCon, selectedLeads }) => {
  const [token, setToken] = useState(null);
  const [callType, setCallType] = useState("S");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = async () => {
    const userLocalData = JSON.parse(localStorage.getItem("userData"));
    const accessToken = userLocalData ? userLocalData.access_token : null;
    try {
      const response = await fetch(
        "https://margda.in:7000/api/android/push-notification/get-token",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setToken(data.Token.token);
      } else if (response.status === 404) {
        toast.error(
          "Call feature is not available for your account. Please install the Margda app and sign up to enable this feature."
        );
      }
    } catch (error) {
      toast.error("Failed to fetch token. Please try again.");
    }
  };

  const handleCall = async () => {
    if (selectedLeads.length > 1) {
      toast.warning("Please select only one lead for calling.");
      return;
    }

    setIsLoading(true);
    const mobile = selectedLeads[0].mobile;
    const userLocalData = JSON.parse(localStorage.getItem("userData"));
    const agent = userLocalData ? userLocalData.user_data.mobile : null;
    const accessToken = userLocalData ? userLocalData.access_token : null;

    try {
      if (callType === "S") {
        const response = await fetch(
          "https://margda.in:7000/api/android/push-notification/send-call-notification",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
              number: mobile.length > 10 ? `+${mobile}` : mobile,
              text: "call",
            }),
          }
        );
        if (response.ok) {
          toast.success("Calling in progress...");
        } else {
          const data = await response.json();
          toast.error(data.message || "Failed to initiate call.");
        }
      } else if (callType === "A") {
        const response = await fetch(
          "https://margda.in:7000/api/cloud_telephony/initiate_call_to_lead",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              agent_number: agent,
              destination_number: mobile,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          toast.success(data.message || "Call initiated successfully.");
        } else {
          toast.error(data.message || "Failed to initiate call.");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Initiate Call
            </h2>
            <button
              onClick={() => setShowCallCon(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Call Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={callType}
                onChange={(e) => setCallType(e.target.value)}
              >
                <option value="S">SIM</option>
                <option value="A">API</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCallCon(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCall}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Calling..." : "Call"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallCon;
