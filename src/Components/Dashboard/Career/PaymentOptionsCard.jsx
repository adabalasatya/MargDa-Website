import { useState } from "react";
import { toast } from "react-toastify";

const PaymentOptionsCard = ({
  setShowPaymentOptions,
  payableAmount,
  name,
  mobile,
}) => {
  const [file, setFile] = useState(null);

  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userLocalData ? userLocalData.access_token : null;

  const handlePhonePayPayment = async () => {
    if (!payableAmount || payableAmount < 1) {
      return toast.error("Unable to start a Transaction");
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/phonepay-gateway/new-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: payableAmount, name, mobile }),
        }
      );
      const data = await response.json();
      if (data.success) {
        window.open(data.url, "_blank"); // Redirect to PhonePe payment page
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Error initiating payment");
    }
  };

  //   const handleUploadScreenShot = async (orderID) => {
  //     if (!file) {
  //       return toast.error("Select a file");
  //     }
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("orderID", orderID);
  //     try {
  //       const response = await fetch(
  //         "https://margda.in:7000/api/user_account/upload_screen_shot",
  //         {
  //           method: "POST",
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //           body: formData,
  //         }
  //       );
  //       const data = await response.json();
  //       if (response.ok) {
  //         toast.success(data.message);
  //       } else {
  //         toast.error(data.message);
  //       }
  //     } catch (error) {
  //       console.log("payment screen shot upload error", error);
  //     }
  //   };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-12 min-h-full z-50">
      <div className="space-x-1 bg-white p-8 rounded w-[70%] max-h-[700px] overflow-x-scroll">
        <div className="flex flex-row items-center text-center  mb-4">
          <div className="w-full">
            <h2 className="text-xl font-semibold">
              Amount ₹{payableAmount || "N/A"}
            </h2>
          </div>
          <div
            onClick={() => {
              setShowPaymentOptions(false);
            }}
            className="my-auto font-normal border px-3 bg-gray-200 text-red-500 cursor-pointer hover:bg-red-400 hover:text-red-100 rounded"
          >
            x
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-3 mt-9">
            <div className="flex-1 space-y-6 w-1/2">
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="text-lg font-semibold text-sky-600 mb-3">
                  Through Mobile Apps like BHIM UPI, Paytm, Phonepe, Google Pay,
                  etc.
                </div>
                <div className="text-sm space-y-2">
                  <p>
                    <span className="font-bold text-yellow-700">UPI ID:</span>{" "}
                    margd78386580@barodampay
                  </p>
                  <p>
                    <span className="font-bold text-yellow-700">
                      Mobile No:
                    </span>{" "}
                    7838681293
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="text-lg font-semibold text-sky-600 mb-3">
                  Through bank deposit/net banking/NEFT/IMPS, etc.
                </div>
                <div className="text-sm space-y-2">
                  <p>
                    <span className="font-bold text-yellow-700">
                      Account Name:
                    </span>{" "}
                    Margdarshak Media
                  </p>
                  <p>
                    <span className="font-bold text-yellow-700">
                      Account No:
                    </span>{" "}
                    45240200000580
                  </p>
                  <p>
                    <span className="font-bold text-yellow-700">
                      IFSC Code:
                    </span>{" "}
                    BARB0DWADEL
                  </p>
                  <p>
                    <span className="font-bold text-yellow-700">
                      Bank Name:
                    </span>{" "}
                    Bank of Baroda
                  </p>
                  <p>
                    <span className="font-bold text-yellow-700">Branch:</span>{" "}
                    Dwarka Mor, New Delhi
                  </p>
                </div>
              </div>

              {/* <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col justify-center items-center">
                <label
                  htmlFor="screen-shot"
                  className=" text-black underline rounded px-5 py-2 cursor-pointer hover:text-red-500"
                >
                  Upload a screen shot of payment
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="screen-shot"
                />
                <button
                  onClick={() => handleUploadScreenShot(orderID)}
                  className="bg-blue-600 text-white rounded px-5 py-2 hover:bg-blue-500"
                >
                  Done
                </button>
              </div> */}
            </div>
            <div className="w-1/2 flex items-center justify-center bg-gray-100 p-1 rounded-lg shadow-sm">
              <img
                src="https://margda.com/assets/recharge-qr-payment.png"
                alt="qr-code"
                className="h-auto rounded-lg"
              />
            </div>
          </div>
          <div
            className="flex items-center my-5 justify-between p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={handlePhonePayPayment}
          >
            <span>PhonePe Gateway</span>
          </div>
          <div
            className="flex items-center my-5 justify-between p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            // onClick={handleCardClick}
          >
            <span>RazerPay Gateway</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptionsCard;
