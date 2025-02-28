import React, { useEffect, useState } from "react";
import Logo from "../../assets/margdarshakendra-logo.webp";
import { toast } from "react-toastify";
import { FaFile } from "react-icons/fa";

const numberToWords = (num) => {
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100)
      return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 !== 0 ? " And " + inWords(n % 100) : "")
      );
    return (
      inWords(Math.floor(n / 1000)) +
      " Thousand" +
      (n % 1000 !== 0 ? " " + inWords(n % 1000) : "")
    );
  };

  return num === 0 ? "zero" : inWords(num);
};

const OnlinePaymentOption = () => {
  const [showCardForm, setShowCardForm] = useState(false);
  const [showNetBankingForm, setShowNetBankingForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [tax, setTax] = useState("");
  const [file, setFile] = useState(null);
  const [orderID, setOrderID] = useState("");
  const [wallet, setWallet] = useState("");
  const [account, setAccount] = useState("");
  const [balanceAmount, setBalanceAmount] = useState("");
  const [itemName, setItemName] = useState("");
  const [ip, setIP] = useState("");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showPayOnline, setShowPayOnline] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const handleCardClick = () => {
    setShowCardForm(!showCardForm); // Toggle the card form visibility
    setShowNetBankingForm(false); // Close the net banking form if open
  };
  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userLocalData ? userLocalData.access_token : null;
  const name = userLocalData.user_data.name;
  const mobile = userLocalData.user_data.mobile;
  const email = userLocalData.user_data.email;
  const address = userLocalData.user_data.address;
  const placeID = userLocalData.user_data.placeID;
  useEffect(() => {
    fetchOrders();
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIP(data.ip))
      .catch((error) => console.error("Error fetching IP:", error));
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/user_account/get_orders",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setAllOrders(data.data);
      }
    } catch (error) {
      console.log("online payments - fetch orders", error);
    }
  };

  const handlePhonePayPayment = async () => {
    if (!balanceAmount || balanceAmount < 1) {
      return alert("Enter amount");
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/phonepay-gateway/new-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: balanceAmount, name, mobile }),
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

  const handleRazarPayPayment = async () => {
    if (!balanceAmount) {
      return alert("Enter Amonut");
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: Number(amount) * 100 }),
        }
      );
      const data = await response.json();
      const options = {
        key: "rzp_live_PPtt6lw9dt15jf", // Replace with your actual key_id
        amount: data.response.amount,
        currency: "INR",
        name: "Margdarshak",
        description: "Test Transaction",
        image:
          "https://margda.in:7000/profile_pics/1735670742444-984385843.jpeg",
        order_id: data.response.id,
        handler: async function (response) {
          alert("Payment Successful");
          console.log(response);
          const verify = await fetch(
            "https://margda.in:7000/api/payment/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            }
          );
          if (verify.ok) {
            alert("Payment Confirmed");
          } else {
            alert("Payment not Confirmed");
          }
          // You can send response details to the backend for verification
        },
        prefill: {
          name: name,
          email: email,
          contact: mobile,
        },
        notes: {
          // address: address,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Step 3: Open Razorpay Checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment", error);
    }
    console.log(amount);
  };

  const fetch_wallet_info = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/user_account/wallet",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setWallet("0.00");
        }
      }

      const result = await response.json();

      if (result.success) {
        setWallet(result.Data.balance / 100);
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching wallet info:", error);
    }
  };
  const fetch_account_info = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/user_account/account",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setAccount("0.00");
        }
      }

      const result = await response.json();

      if (result.success) {
        setAccount(result.Data.balance / 100);
      }
    } catch (error) {
      console.error("Error fetching wallet info:", error);
    }
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString("en-IN");
  };

  const generateRandomNumber = () => {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const random = Math.floor(Math.random() * 10); // Random number between 0 and 9999
    return `${random}${timestamp}`;
  };

  useEffect(() => {
    const fullDate = new Date();
    const date = fullDate.getDate();
    const month = fullDate.getMonth();
    const year = fullDate.getFullYear();
    setTodayDate(`${date}-${month + 1}-${year}`);
    setOrderID(generateRandomNumber());
    fetch_account_info();
    fetch_wallet_info();
  }, []);

  const handleNetBankingClick = () => {
    setShowNetBankingForm(!showNetBankingForm); // Toggle the net banking form visibility
    setShowCardForm(false); // Close the card form if open
  };

  const handlePayNow = async () => {
    setShowPaymentOptions(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/user_account/invoice_notification",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount,
            name,
            mobile,
            email,
            details: "Payment initiated",
            orderID,
            address,
            pincode: placeID,
            itemName,
            tax,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadScreenShot = async (orderID) => {
    console.log(file);
    if (!file) {
      return toast.error("Select a file");
    }
    console.log(orderID);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("orderID", orderID);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/user_account/upload_screen_shot",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("payment screen shot upload error", error);
    }
  };

  const handlePayOnline = async () => {
    setShowPayOnline(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/user_account/create_order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ amount, tax, orderID, loginIP: ip }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setAllOrders((pre) => [...pre, data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formatDateTimeIST = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="p-6">
      {/* Heading */}
      {/* {allOrders.length > 0 && (
        <div className="flex flex-col bg-gray-200 gap-3 p-4">
          Orders
          {allOrders.map((order, index) => (
            <div
              key={index}
              className="bg-gray-400 flex rounded p-5 items-center"
            >
              <div className="mr-9">{index + 1}.</div>
              <div className="mr-9">
                <p>Order ID</p>
                <div>{order.uni_order_key}</div>
              </div>
              <div className="mr-9">
                <p>Amount</p>
                <div>₹{Number(order.amount) / 100}/-</div>
              </div>
              <div className="mr-9">
                <p>Order Created Date and Time</p>
                <div> {formatDateTimeIST(order.edate)}</div>
              </div>
              <div>
                <label
                  htmlFor="screen-shot"
                  className=" text-black underline rounded px-5 py-2 cursor-pointer hover:text-red-500"
                >
                  Select screen shot of payment
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="screen-shot"
                />
                <button
                  onClick={() => handleUploadScreenShot(order.uni_order_key)}
                  className="bg-blue-600 text-white rounded px-5 py-2 hover:bg-blue-500"
                >
                  Save
                </button>
              </div>
              <div className="ml-5">
                {order.payment_screen && (
                  <a href={order.payment_screen} target="_blank">
                    <FaFile />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )} */}

      <div className="flex flex-row justify-between">
        <div className="w-[40%]">
          <h1 className="text-2xl font-bold mb-6">Recharge for Talk-time</h1>
          <div className="max-h-[400px] overflow-y-visible w-auto">
            <table className="w-full text-sm text-left border-spacing-x-2 border">
              <thead className="divide-y divide-gray-200 border">
                <tr className="text-gray-600 top-0 bg-white z-10 p-7 text-center">
                  <th className="px-4 py-3 border">₹200</th>
                  <th className="border">₹500</th>
                  <th className="border">₹1,000</th>
                  <th className="border">₹2,000</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 border">
                <tr className="hover:bg-gray-50 transition-colors duration-200 border p-7 text-center">
                  <td className="border"></td>
                  <td className="py-3">GET 10% EXTRA</td>
                  <td className="border">GET 25% EXTRA</td>
                  <td className="border">GET 50% EXTRA</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-200 border p-7">
                  <td className="py-3 border">+18% GST = ₹236</td>
                  <td className="border">+18% GST = ₹590</td>
                  <td className="border">+18% GST = ₹1,180</td>
                  <td className="border">+18% GST = ₹2,360</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-200 border p-7">
                  <td className="border p-4 text-center">
                    <button
                      onClick={() => {
                        setAmount(200);
                        setBalanceAmount(236);
                        setTax(26);
                        setItemName("Talk Time Recharge");
                      }}
                      className="bg-blue-600 text-white rounded px-5 py-2 hover:bg-blue-500"
                    >
                      Select
                    </button>
                  </td>
                  <td className="border p-4 text-center">
                    <button
                      onClick={() => {
                        setAmount(500);
                        setTax(90);
                        setBalanceAmount(590);
                        setItemName("Talk Time Recharge");
                      }}
                      className="bg-blue-600 text-white rounded px-5 py-2 hover:bg-blue-500"
                    >
                      Select
                    </button>
                  </td>
                  <td className="border p-4 text-center">
                    <button
                      onClick={() => {
                        setAmount(1000);
                        setTax(180);
                        setBalanceAmount(1180);
                        setItemName("Talk Time Recharge");
                      }}
                      className="bg-blue-600 text-white rounded px-5 py-2 hover:bg-blue-500"
                    >
                      Select
                    </button>
                  </td>
                  <td className="border p-4 text-center">
                    <button
                      onClick={() => {
                        setAmount(2000);
                        setBalanceAmount(2360);
                        setTax(360);
                        setItemName("Talk Time Recharge");
                      }}
                      className="bg-blue-600 text-white rounded px-5 py-2 hover:bg-blue-500"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <h1 className="text-2xl font-bold my-6">
            Web Telephony Set up + DID Fee
          </h1>
          <div className="max-h-[400px] overflow-y-visible w-auto">
            <table className="w-1/3 text-sm text-left border-spacing-x-2 border">
              <thead className="divide-y divide-gray-200 border">
                <tr className="text-gray-600 top-0 bg-white z-10 p-7 text-center">
                  <th className="px-4 py-3 border">₹2,700</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 border">
                <tr className="hover:bg-gray-50 transition-colors duration-200 border p-7">
                  <td className="py-3 border">+18% GST = ₹3,186</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-200 border p-7">
                  <td className="border p-4 text-center">
                    <button
                      onClick={() => {
                        setAmount(2700);
                        setBalanceAmount(3186);
                        setTax(486);
                        setItemName("Web Telephony Set up + DID Fee");
                      }}
                      className="bg-blue-600 text-white rounded px-5 py-2 hover:bg-blue-500"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </div>
        {/* Billing Statement */}
        {amount && (
          <div className="bg-white rounded-lg shadow-md p-6 pt-0 w-1/2">
            <div className="space-y-4">
              <div className="flex justify-between mt-8 flex-row w-full">
                <div className="flex flex-col justify-between">
                  <div className="w-[150px]">
                    <img src={Logo} alt="margdarskak" />
                  </div>
                  <span className="font-semibold">Invoice</span>
                  <span className="text-gray-600">GSTIN: 27AAGCG4576J1Z6</span>
                  <div className="mt-9">
                    <p className="font-semibold">Bill to:</p>
                    <p>{name}</p>
                    <p>{address}</p>
                    <p>{placeID}</p>
                    <p>{mobile.length > 10 ? "+" + mobile : mobile}</p>
                  </div>
                </div>
                <div className="">
                  <div>
                    <p className="font-semibold">Margdarshak Media</p>
                    <p>🏠 C-67, Dwarka Mor, New Delhi</p>
                    <p>📞 07965174000</p>
                    <p>💬 +918130960040</p>
                    <p>✉️ mail@margda.com</p>
                    <p>🌐 www.margda.com</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span className="font-semibold">Order ID: {orderID}</span>
                <span className="text-gray-600">Date: {todayDate}</span>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Description</p>
                <p>1. {itemName}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>MRP</span>
                  <span>₹{formatAmount(amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>₹{formatAmount(amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax@18%</span>
                  <span>₹{formatAmount((Number(amount) * 18) / 100)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total INR</span>
                  <span>
                    ₹
                    {formatAmount(Number(amount) + (Number(amount) * 18) / 100)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {numberToWords(Number(amount) + (Number(amount) * 18) / 100) +
                    " Only"}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Please refer to the terms of service and refund policy on the
                website.
              </p>
              <p className="text-sm text-gray-600">
                Thanks for being part of the Margdarshak family.
              </p>
              <button
                onClick={handlePayNow}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Pay now
              </button>
            </div>
          </div>
        )}
        {showPaymentOptions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-24 min-h-full">
            <div className="space-x-1 bg-white p-8 rounded w-[70%] max-h-[700px] overflow-x-scroll">
              <div className="px-9 flex flex-col text-xl">
                <div className="flex flex-row items-center text-center  mb-4">
                  <div className="w-full">
                    <h2 className="text-xl font-semibold">Payment</h2>
                  </div>
                  <div
                    onClick={() => {
                      setShowPaymentOptions(false);
                      setShowPayOnline(false);
                      setFile(null);
                    }}
                    className="my-auto font-normal border px-3 bg-gray-200 text-red-500 cursor-pointer hover:bg-red-400 hover:text-red-100 rounded"
                  >
                    x
                  </div>
                </div>
                <p className="text-xl mt-5 border-b">
                  Amount Payable :{"    "}
                  <span>
                    ₹
                    {formatAmount(Number(amount) + (Number(amount) * 18) / 100)}
                  </span>
                </p>
                <div className="flex flex-row justify-between mt-5 border-b">
                  <p>Account Balance: ₹ {account}</p>
                  <p>Deduct amount {`[₹ ${account}]`}</p>
                  <button className="bg-blue-600 text-white rounded px-5 py-2 hover:bg-blue-500">
                    Pay Now
                  </button>
                </div>
                <div className="flex flex-row justify-between mt-5 border-b">
                  <p>Wallet Balance: ₹ {wallet}</p>
                  <p>Deduct amount {`[₹ ${wallet}]`}</p>
                  <button className="bg-blue-600 text-white rounded px-5 py-2 hover:bg-blue-500">
                    Pay Now
                  </button>
                </div>
                <div className="flex flex-row justify-between mt-5 border-b">
                  <p className="opacity-0"> Balance Amount</p>
                  <p>Balance Amount: ₹{formatAmount(balanceAmount)}</p>
                  <button
                    onClick={handlePayOnline}
                    className="bg-blue-600 text-white rounded px-5 py-2 hover:bg-blue-500"
                  >
                    Pay Online
                  </button>
                </div>
              </div>
              {showPayOnline && (
                <div className="flex flex-col">
                  <div className="flex flex-row mt-9">
                    <div className="flex-1 space-y-6 w-1/2">
                      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <div className="text-lg font-semibold text-sky-600 mb-3">
                          Through Mobile Apps like BHIM UPI, Paytm, Phonepe,
                          Google Pay, etc.
                        </div>
                        <div className="text-sm space-y-2">
                          <p>
                            <span className="font-bold text-yellow-700">
                              UPI ID:
                            </span>{" "}
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
                            <span className="font-bold text-yellow-700">
                              Branch:
                            </span>{" "}
                            Dwarka Mor, New Delhi
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col justify-center items-center">
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
                      </div>
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
                    onClick={handleCardClick}
                  >
                    <span>RazerPay Gateway</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* <div className="flex flex-row justify-center items-start">
        <div className="flex flex-col w-1/2">
          <div className="bg-white rounded-lg shadow-md p-6 m-4 ">
            <div className="max-h-[400px] overflow-y-auto w-auto">
              <table className="w-full text-sm text-left border-spacing-x-2 border ">
                <thead className="divide-y divide-gray-200 border">
                  <tr className="text-gray-600 sticky top-0 bg-white z-10 p-7 text-center">
                    <th className="px-4 py-3 border">₹200</th>
                    <th className="border">₹500</th>
                    <th className="border">₹1000</th>
                    <th className="border">₹2000</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border">
                  <tr className="hover:bg-gray-50 transition-colors duration-200 border p-7 text-center">
                    <td className="border"></td>
                    <td className="py-3">GET 10% EXTRA</td>
                    <td className="border">GET 25% EXTRA</td>
                    <td className="border">GET 50% EXTRA</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-200 border p-7">
                    <td className="py-3 border">₹200+18% GST = ₹236</td>
                    <td className="border">₹500+18% GST = ₹590</td>
                    <td className="border">₹1000+18% GST = ₹1800</td>
                    <td className="border">₹2000+18% GST = ₹2,360</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex-1 space-y-6">
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
                  <span className="font-bold text-yellow-700">Mobile No:</span>{" "}
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
                  <span className="font-bold text-yellow-700">Account No:</span>{" "}
                  45240200000580
                </p>
                <p>
                  <span className="font-bold text-yellow-700">IFSC Code:</span>{" "}
                  BARB0DWADEL
                </p>
                <p>
                  <span className="font-bold text-yellow-700">Bank Name:</span>{" "}
                  Bank of Baroda
                </p>
                <p>
                  <span className="font-bold text-yellow-700">Branch:</span>{" "}
                  Dwarka Mor, New Delhi
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center w-1/2">
          <div className="flex items-center justify-center bg-gray-100 p-4 rounded-lg shadow-sm">
            <img
              src="https://margda.com/assets/recharge-qr-payment.png"
              alt="qr-code"
              className="w-[80%] h-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      <div
        className="flex items-center my-5 justify-between p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={handleCardClick}
      >
        <span>PhonePe Gateway</span>
      </div> */}
      {/* {showCardForm && (
        <div className="p-4 flex flex-col">
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full my-5 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
            type="number"
            placeholder="Your mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <input
            type="number"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
            placeholder="Amount in ruppes"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="w-full flex justify-center">
            <button
              className="w-1/2  my-5  bg-blue-500 text-white px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder-gray-400"
              onClick={handlePhonePayPayment}
            >
              Pay Now
            </button>
          </div>
        </div>
      )} */}
      {/* UPI Option */}
      {/* <div
            onClick={() => setUpiQrCode(true)}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span>UPI</span>
            <span className="text-gray-600">- Scanner page</span>
          </div> */}
      {/* {upiQrCode && (
            <div className="fixed inset-0 p-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
              <div className="bg-white p-8 rounded-3xl shadow-2xl w-11/12 max-w-4xl flex flex-col items-center justify-center">
                <div className="w-1/2 h-1/2 flex items-center justify-center">
                  <img
                    src="https://margda.com/assets/recharge-qr-payment.png"
                    alt=""
                  />
   
                src="https://margda.com/assets/recharge-qr-payment.png"             </div>
                <div
                  onClick={() => setUpiQrCode(false)}
                  className="cursor-pointer p-2 px-6 mt-4 bg-blue-500 text-white rounded hover:bg-gray-300 hover:text-black"
                >
                  ok
                </div>
              </div>
            </div>
          )} */}
      {/* Credit/Debit Card Option */}
      {/* <div
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={handleCardClick}
          >
            <span>Credit/Debit Card</span>
            <span className="text-gray-600">- Razorpay</span>
          </div> */}
      {/* Card Details Form */}
      {/* {showCardForm && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-4">Enter Card Details</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="mt-1 block w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="mt-1 block w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          )} */}
      {/* Net Banking Option */}
      {/* <div
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={handleNetBankingClick}
          >
            <span>Net Banking</span>
            <span className="text-gray-600">- Bank details</span>
          </div> */}
      {/* Net Banking Form */}
      {/* {showNetBankingForm && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-4">Select Bank</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bank Name
                  </label>
                  <select className="mt-1 block w-full p-2 border rounded-md">
                    <option value="">Select your bank</option>
                    <option value="HDFC">HDFC Bank</option>
                    <option value="ICICI">ICICI Bank</option>
                    <option value="SBI">State Bank of India</option>
                    <option value="Axis">Axis Bank</option>
                    <option value="Kotak">Kotak Mahindra Bank</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Net Banking ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Net Banking ID"
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          )} */}
      {/* Email Templates */}
      {/* Payment Receipt
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-4">
          Subject: {`{user}`}, Payment Receipt {`{receiptID}`}
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Receipt</span>
            <span className="text-gray-600">Receipt ID: {`{receiptID}`}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Margdarshak Media</p>
              <p>🏠 C-67, Dwarka Mor, New Delhi</p>
              <p>📞 07965174000</p>
              <p>💬 +918130960040</p>
              <p>✉️ mail@margda.com</p>
              <p>🌐 www.margda.com</p>
            </div>
            <div>
              <p className="font-semibold">Payment Date:</p>
              <p>{`{paymentDate}`}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Dear RP Singh,</p>
            <p>
              We have received a sum of INR ₹6,018.00 (INR Six thousand eighteen
              only) towards payment of Order ID: 3816337209 for Database and
              Margda CRM subscription.
            </p>
            <p>We assure you of the best services always.</p>
            <p>Thanks for being part of the Margdarshak family.</p>
          </div>
        </div>
      </div>
      Delivery Challan
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-4">
          Subject: {`{user}`}, Delivery Challan {`{orderID}`}
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Delivery</span>
            <span className="text-gray-600">Order ID: {`{orderID}`}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Margdarshak Media</p>
              <p>🏠 C-67, Dwarka Mor, New Delhi</p>
              <p>📞 07965174000</p>
              <p>💬 +918130960040</p>
              <p>✉️ mail@margda.com</p>
              <p>🌐 www.margda.com</p>
            </div>
            <div>
              <p className="font-semibold">Customer:</p>
              <p>Margdarshak Media</p>
              <p>S-56 Sector 12</p>
              <p>NOIDA – 201301</p>
              <p>Uttar Pradesh</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Order Date: 12.01.2025</p>
            <p>Payment Date: 12.01.2025</p>
            <p>Delivery Date: 12.01.2025</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Database and Software as a Service</p>
            <p>Database – 1000 records</p>
            <p>Margda CRM – 1 user</p>
            <p>Period: 10/01/2025 - 09/02/2025</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Delivery Method:</p>
            <p>Online through CRM</p>
            <p>URL: https://margda.com</p>
          </div>
          <p className="text-sm text-gray-600">
            I acknowledge that I have received access and accept the above
            digital service in accordance with the terms of use and refund
            policy given on the website.
          </p>
          <p className="text-sm text-gray-600">
            Thanks for being part of the Margdarshak family.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Confirm Delivery
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default OnlinePaymentOption;
