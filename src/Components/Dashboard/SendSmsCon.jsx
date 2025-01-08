import { useEffect, useState } from "react";

const SendSmsCon = ({ setSendSms, selectedLeads }) => {
  const [smsContent, setSmsContent] = useState("");
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(selectedLeads);
    fetchToken();
  }, []);

  const fetchToken = async () => {
    setLoading(true);
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
        console.log(data.Token.token);
        const token = data.Token.token;
        if (token) {
          setToken(token);
        }
      } else if (response.status === 404) {
        setError("SMS feature is not available for your account. Please install the Margda app and sign up to get the SMS feature.");
      }
    } catch (err) {
      setError("Failed to fetch token. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSmsSend = async () => {
    if (!smsContent) {
      setError("Please enter SMS content.");
      return;
    }
    setLoading(true);
    setError(null);
    const userLocalData = JSON.parse(localStorage.getItem("userData"));
    const accessToken = userLocalData ? userLocalData.access_token : null;
    const mobile = selectedLeads.map((lead) => lead.mobile);
    try {
      for (const number of mobile) {
        const formattedNumber = number.length > 10 ? `+${number}` : number;
        const response = await fetch(
          "https://margda.in:7000/api/android/push-notification/send-sms",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
              number: formattedNumber,
              text: "sms",
              content: smsContent,
            }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            setError(data.message);
            return;
          } else {
            setError("Failed to send SMS.");
            return;
          }
        }
      }
      alert("SMS sent successfully!");
    } catch (err) {
      setError("Failed to send SMS. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex flex-col items-center space-y-4 mb-6">
          <label htmlFor="message" className="block text-xl font-semibold text-gray-800">
            Send SMS
          </label>
        </div>
        <div className="my-3">
          <textarea
            type="text"
            name="message"
            value={smsContent}
            id="message"
            onChange={(e) => setSmsContent(e.target.value)}
            placeholder="Enter your message here..."
            className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="5"
          />
        </div>
        {error && (
          <div className="mb-4 text-red-600 text-sm">
            {error}
          </div>
        )}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setSendSms(false)}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          {token ? (
            <button
              onClick={handleSmsSend}
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? "Sending..." : "Send SMS"}
            </button>
          ) : (
            <span className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
              Not Available
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendSmsCon;