import React, { useEffect, useState } from "react";
import Logo from "../../assets/m.jpeg";

const Certificate = () => {
  const [dataCount, setDataCount] = useState("");
  const [edate, setEdate] = useState("");
  useEffect(() => {
    fetchDetails();
  }, []);
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;
  const registeredDate = new Date(localUserData.user_data.edate);
  const serialNo =
    localUserData.user_data.userID +
    registeredDate.getFullYear().toString() +
    (registeredDate.getMonth() + 1).toString();

  const fetchDetails = async () => {
    try {
      const response = await fetch("https://margda.in:7000/api/dscdetails", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setDataCount(data.dataCount);
        if (data.advisorDate) {
          const date = new Date(data.advisorDate);
          const edate =
            date.getDate().toString() +
            "-" +
            (date.getMonth() + 1).toString() +
            "-" +
            date.getFullYear().toString();
          setEdate(edate);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center px-16 pt-2 bg-gray-100">
      <div className="w-full  bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className="w-full h-full bg-cover py-8 bg-center"
          style={{
            backgroundImage: "url('https://margda.com/assets/dsc.jpeg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: "85vh",
          }}
        >
          {/* Add your content here */}
          <div className="flex flex-col items-center justify-center mt-40 p-12">
            {/* Flex container for S.No, Image, and Data */}
            <div className="flex justify-between items-center w-[110%] mt-8 px-20">
              {/* S.No on the left */}
              <div
                className="flex w-[130px] h-[130px] flex-col justify-center items-center text-white text-xl p-8 rounded-full"
                style={{ backgroundColor: "rgba(13, 46, 148, 0.89)" }}
              >
                <span> S.No</span>
                {serialNo}
              </div>

              {/* Image in the middle */}
              <img
                src={localUserData.user_data.pic_url}
                alt="Logo"
                className="w-[130px] h-[130px] mx-4 rounded-full"
              />

              {/* Data on the right */}
              <div
                style={{ backgroundColor: "rgba(13, 46, 148, 0.89)" }}
                className="flex w-[130px] h-[130px] flex-col justify-center items-center text-white text-xl p-8 rounded-full"
              >
                <span>Data</span>
                {dataCount}
              </div>
            </div>

            <div className="text-center mt-6">
              <h1 className="text-3xl font-semibold text-black font-great-vibes">
                {localUserData.user_data.name.slice(0, 1).toUpperCase() +
                  localUserData.user_data.name.slice(1)}
              </h1>
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm text-blue-800 font-medium italic tracking-wide">
                This is to certify that {localUserData.user_data.name} is the
                registered holder of the Data Share Certificate (DSC).
                Margdarshak promises to pay the DSC holder a monthly income
                equal to INR One multiplied by the number of data verified by
                self and the team members until the data is maintained and
                updated per the terms. This DSC can be transferred or sold to
                anyone
              </p>
            </div>

            <div className="mt-16 w-full text-left pl-3 pb-3">
              <p>Date of issue</p>
              <p className="relative text-md text-black font-medium">{edate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-black text-center py-9 mt-4">
        <strong>
          Copyright &copy; 2025{" "}
          <a
            href="https://margda.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Margdarshak
          </a>
        </strong>
        . All rights reserved.
      </footer>
    </div>
  );
};

export default Certificate;
