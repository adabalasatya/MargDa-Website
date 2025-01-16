import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentStatus = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [paymentCode, setPaymentCode] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/phonepay-gateway/status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transactionId: id }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setPaymentCode(data.code);
        setTransactionId(data.data.transactionId);
        setAmount(data.data.paidAmount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center mt-9 text-xl">
      <div>Transaction ID: {transactionId}</div>
      <div>Amount: {Number(amount) / 100}₹</div>
      <h1>{paymentCode}</h1>
      <p>Thank you for using our service!</p>
    </div>
  );
};

export default PaymentStatus;
