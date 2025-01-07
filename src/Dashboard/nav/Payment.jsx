import { useState } from "react";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const handlePay = async () => {
    if (!amount) {
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
          address: address,
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
  return (
    <div className="flex bg-gray-200 flex-col justify-center items-center h-[90vh] w-full">
      <div className="flex flex-col items-center w-[40%]">
        <label htmlFor="amount" className="font-bold p-1 text-base">
          Amonut
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-3 w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
          type="number"
          placeholder="Enter Amonut"
          id="amount"
        />
      </div>
      <div className="flex flex-col items-center w-[40%]">
        <label htmlFor="name" className="font-bold p-1 text-base">
          Customer Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
          type="text"
          placeholder="Enter Name"
          id="name"
        />
      </div>
      <div className="flex flex-col items-center w-[40%]">
        <label htmlFor="mobile" className="font-bold p-1 text-base">
          Customer Mobile
        </label>
        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="px-3 w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
          type="number"
          placeholder="Enter Mobile"
          id="mobile"
        />
      </div>
      <div className="flex flex-col items-center w-[40%]">
        <label htmlFor="email" className="font-bold p-1 text-base">
          Customer Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
          type="email"
          placeholder="Enter Customer Email"
          id="email"
        />
      </div>
      <div className="flex flex-col items-center w-[40%]">
        <label htmlFor="address" className="font-bold p-1 text-base">
          Address
        </label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="px-3 w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
          type="text"
          placeholder="Enter Address"
          id="address"
        />
      </div>
      <div className=" flex items-center mt-4 w-[40%] justify-center">
        <button
          onClick={handlePay}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-normal font-mono text-base w-1/2"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment