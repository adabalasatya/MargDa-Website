import { useEffect, useState } from "react";
import {
  Check,
  Smartphone,
  User,
  Lock,
  CreditCard,
  DollarSign,
} from "lucide-react";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";
import PaymentOptionsCard from "../../Components/Dashboard/Career/PaymentOptionsCard";

const CareerAssessmentPayment = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [mobile3, setMobile3] = useState("");
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otpSent, setOtpSent] = useState([]);
  const [otpVerified, setOtpVerified] = useState([]);
  const [product, setProduct] = useState(null);
  const [baseAmount, setBaseAmount] = useState(0);
  const [totalRefered, setTotalRefered] = useState(0);
  const [tax, setTax] = useState(0);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  // const [referenceDiscount, setReferenceDiscount] = useState(
  //   totalRefered * 100
  // );
  const [payableAmount, setPayableAmount] = useState(baseAmount + tax);

  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userLocalData ? userLocalData.access_token : null;
  const userName = userLocalData.user_data.name;
  const userMobile = userLocalData.user_data.mobile;

  useEffect(() => {
    fetchProduct();
  }, [accessToken]);

  useEffect(() => {
    fetchReferedData();
  }, [baseAmount]);

  const fetchReferedData = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/reference/get-total-refered",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.Refered) {
          const totalRefered = result.Refered;
          if (Number(totalRefered) > 3) {
            setTotalRefered(3);
            const tax = ((baseAmount - 300) * 18) / 100;
            const payableAmount = baseAmount - 300 + tax;
            setTax(tax);
            setPayableAmount(payableAmount);
            return;
          }
          setTotalRefered(totalRefered);
          const tax = ((baseAmount - totalRefered * 100) * 18) / 100;
          const payableAmount = baseAmount - totalRefered * 100 + tax;
          setTax(tax);
          setPayableAmount(payableAmount);
        } else {
          setTotalRefered(0);
          const tax = (Number(baseAmount) * 18) / 100;
          const payableAmount = Number(baseAmount) + Number(tax);
          setTax(tax);
          setPayableAmount(payableAmount);
        }
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Unable to Get Products, Please try again later");
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/reference/get-payment-product",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.Product) {
          const product = result.Product;
          setProduct(product);
          setBaseAmount(product.mrp);
        } else {
          setBaseAmount(0);
          toast.error(result.message);
        }
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Unable to Get Products, Please try again later");
    }
  };

  const handleGetOTP = async (index) => {
    let mobile;
    if (index == 1) {
      mobile = mobile1;
    } else if (index == 2) {
      mobile = mobile2;
    } else if (index == 3) {
      mobile = mobile3;
    }
    if (!mobile) {
      return toast.warn("Enter Mobile Number");
    }
    mobile = mobile.replace("+", "");
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/reference/send-mobile-otp",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobile }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setOtpSent((prev) => [...prev, index]);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to sent otp");
    }
  };

  const handleOtpSubmit = async (index) => {
    let otp;
    let mobile;
    let name;
    if (index == 1) {
      name = name1;
      mobile = mobile1;
      otp = otp1;
    } else if (index == 2) {
      name = name2;
      mobile = mobile2;
      otp = otp2;
    } else if (index == 3) {
      name = name3;
      mobile = mobile3;
      otp = otp3;
    }
    if (!otp) {
      return toast.error("Enter Otp");
    }
    if (!name) {
      return toast.error("Name Required");
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/reference/verify-mobile-otp",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobile, otp, name }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setOtpVerified((prev) => [...prev, index]);
        fetchReferedData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to Verify Otp");
    }
  };

  return (
    <div className="min-h-screen p-6 pt-3">
      <div className="max-w-6xl mx-auto">
        {showPaymentOptions && (
          <PaymentOptionsCard
            setShowPaymentOptions={setShowPaymentOptions}
            payableAmount={payableAmount}
            name={userName}
            mobile={userMobile}
          />
        )}
        <div className="bg-white border-0 shadow-xl rounded-xl overflow-hidden">
          {/* Header */}
          <div className="space-y-1 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <h1 className="text-3xl font-bold">Career Assessment</h1>
            <p className="text-blue-100">Investment in Your Future</p>
            <div className="flex items-center justify-center gap-2 text-2xl font-bold mt-2">
              <span>₹{(product && Math.round(product.mrp)) || "N/A"}</span>
              <span className="text-sm text-blue-200">+ GST</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 p-8">
            {/* Left Side - Student References */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4 pt-1 border border-blue-100">
                <div className="flex items-center gap-2 pt-3 text-blue-700 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-medium">
                    Students Referral Discount
                  </span>
                </div>
                <p className="text-sm text-blue-600">
                  Get up to ₹300 off by referring up to three school students
                </p>
              </div>

              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="bg-white rounded-lg p-6 py-3 shadow-md border border-gray-100 transition-all hover:shadow-lg"
                >
                  <div className="space-y-4">
                    {/* <div className="flex items-center gap-2">
                      <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {num}
                      </div>
                      <h3 className="font-medium text-gray-700">
                        Student Reference
                      </h3>
                    </div> */}

                    <div className="grid gap-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center">
                          <User className="w-5 h-5 text-blue-500" />
                        </div>
                        <input
                          type="text"
                          value={num === 1 ? name1 : num === 2 ? name2 : name3}
                          onChange={(e) =>
                            num === 1
                              ? setName1(e.target.value)
                              : num === 2
                              ? setName2(e.target.value)
                              : setName3(e.target.value)
                          }
                          placeholder={`${num}. Student Name`}
                          className="w-full pl-12 pr-4 py-3 rounded border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>

                      <div className="flex gap-4">
                        <div className="relative flex-1">
                          <PhoneInput
                            international
                            defaultCountry="IN"
                            value={
                              num === 1
                                ? mobile1
                                : num === 2
                                ? mobile2
                                : mobile3
                            }
                            onChange={(value) => {
                              if (num === 1) {
                                setMobile1(value);
                              } else if (num === 2) {
                                setMobile2(value);
                              } else {
                                setMobile3(value);
                              }
                              setOtpSent((pre) =>
                                pre.filter((item) => item != num)
                              );
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                            placeholder="Phone Number"
                            required
                          />
                        </div>

                        <button
                          onClick={() => handleGetOTP(num)}
                          className={`px-6 py-3 rounded font-medium flex items-center gap-2 transition-all ${
                            otpSent.includes(num)
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                          disabled={otpSent.includes(num)}
                        >
                          {otpSent.includes(num) ? (
                            <>
                              <Check className="w-5 h-5" />
                              Otp Sent
                            </>
                          ) : (
                            <>
                              <Lock className="w-5 h-5" />
                              Get Otp
                            </>
                          )}
                        </button>
                      </div>
                      {otpSent.includes(num) && (
                        <div className="">
                          <input
                            type="number"
                            name="otp"
                            value={num === 1 ? otp1 : num === 2 ? otp2 : otp3}
                            onChange={(e) =>
                              num === 1
                                ? setOtp1(e.target.value)
                                : num === 2
                                ? setOtp2(e.target.value)
                                : setOtp3(e.target.value)
                            }
                            placeholder={`Otp ${num}`}
                            id="otp"
                            className="pl-3 pr-4 py-3 rounded border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                          <button
                            onClick={() => handleOtpSubmit(num)}
                            disabled={otpVerified.includes(num)}
                            className={`ml-4 px-6 py-3 rounded font-medium transition-all bg-blue-600 text-white  ${
                              otpVerified.includes(num)
                                ? "bg-green-500"
                                : "hover:bg-blue-700"
                            }`}
                          >
                            {otpVerified.includes(num) ? "Verified" : "Submit"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Payment Summary */}
            <div className="flex flex-col h-full">
              <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 flex-1">
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-3 text-center">
                    {/* <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-2" /> */}
                    {product &&
                      product.pic_url &&
                      product.pic_url.length > 0 && (
                        <div className="flex items-center border rounded">
                          <img
                            src={product.pic_url[0]}
                            alt={product && product.itemName}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                    <h3 className="text-xl font-bold text-gray-800">
                      Payment Summary
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">M.R.P.</span>
                      <span className="font-medium">
                        ₹{baseAmount || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b text-blue-600">
                      <span>Referral Discount</span>
                      <span className="font-medium">
                        -₹{Number(totalRefered) * 100}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">
                        GST ({(product && Math.round(product.tax)) || "N/A"}%)
                      </span>
                      <span className="font-medium">₹{tax || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center py-4 text-lg font-bold">
                      <span>Total Amount</span>
                      <span>₹{payableAmount}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowPaymentOptions(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <DollarSign className="w-5 h-5" />
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerAssessmentPayment;
