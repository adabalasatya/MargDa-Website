import { useEffect, useState } from "react";
import io from "socket.io-client";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";

const SOCKET_SERVER_URL = "https://margda.in:3000";

const QrScanPage = () => {
  const [instanceId, setInstanceId] = useState(null);
  const [qrCodeSrc, setQrCodeSrc] = useState(null);
  const [name, setName] = useState(null);
  const [getBtnText, setGetButtonText] = useState("Get Qr Code");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProfiles();
  }, []);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userData ? userData.access_token : null;

  const startSocket = (userId) => {
    const socketInstance = io(SOCKET_SERVER_URL);

    socketInstance.emit("registerUser", userId);
    socketInstance.on("receiveqrcode", (msg) => {
      setQrCodeSrc(msg.qrcode);
    });

    socketInstance.on("clientallready", (msg) => {
      setName(`Welcome Again : ${msg.name}`);
      setInstanceId(msg.instanceId);
      setQrCodeSrc(null);
    });

    socketInstance.on("clientready", (msg) => {
      setName(`You are connected as : ${msg.name}`);
      setInstanceId(msg.instanceId);
      setGetButtonText("Get New Qr Code");
      setQrCodeSrc(null);
    });
  };

  const getInstance = async () => {
    setLoading(true);
    startSocket(userData.user_data.userID);
    try {
      const response = await fetch(
        "https://margda.in:3000/api/margda/scan-whatsapp/getinstance",
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
        setInstanceId(data.instanceId);
        setQrCodeSrc(data.qrcode);
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error);
      console.log(error);
    }
  };

  const fetchProfiles = async () => {
    const response = await fetch(
      "https://margda.in:3000/api/margda/scan-whatsapp/getprofiles",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setProfiles(data.Profiles);
    }
  };

  const getQrCode = () => {
    getInstance();
  };
  return (
    <>
      {loading && <Loader />}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6">
        <div className="w-full max-w-sm p-4 sm:p-6 bg-white rounded-lg shadow-md sm:max-w-md mx-4 sm:ml-16">
          <h2 className="text-lg sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
            QR Code Scanner
          </h2>
          {qrCodeSrc ? (
            <img
              src={qrCodeSrc}
              alt="QR Code"
              className="w-64 h-64 mx-auto mb-4"
            />
          ) : (
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                <p className="text-sm sm:text-base text-gray-600">Scan QR</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={getQrCode}
            className="w-full py-2 px-4 bg-orange-500 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {getBtnText}
          </button>
          <div className="mt-6 text-left font-normal font-mono text-base">
            <span className="font-semibold text-gray-700">Instance ID:</span>
            <p className="mt-1 text-gray-800">
              {instanceId ? instanceId : "Not fetched yet"}
            </p>
          </div>

          {name && (
            <div className="mt-4 text-left">
              <span className="font-semibold text-gray-700">Name:</span>
              <p className="mt-1 text-gray-800">{name}</p>
            </div>
          )}
          <div className="flex flex-row flex-wrap p-4">
            {profiles.length > 0 &&
              profiles.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center border border-gray-200"
                >
                  <img
                    src={
                      item.pic
                        ? item.pic
                        : "https://static-00.iconduck.com/assets.00/whatsapp-icon-256x256-1ysn3lnm.png"
                    }
                    alt={item.name || "Profile Pic"}
                    onError={(e) => {
                      e.target.src =
                        "https://static-00.iconduck.com/assets.00/whatsapp-icon-256x256-1ysn3lnm.png";
                    }}
                    className="w-20 h-20 rounded-full object-cover border border-gray-300"
                  />

                  <div className="mt-4 font-semibold text-gray-800 text-lg">
                    {item.name}
                  </div>

                  <div className="text-gray-600 text-sm mt-1">
                    {item.mobile}
                  </div>

                  {item.active ? (
                    <div className="mt-3 px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600">
                      Active
                    </div>
                  ) : (
                    <div
                      onClick={getQrCode}
                      className="cursor-pointer mt-3 px-4 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600"
                    >
                      Re-login
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      <footer className="text-black text-center py-4 mt-6">
        <p className="text-xs sm:text-sm">
          &copy; 2024 Margdarshak Media. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default QrScanPage;
