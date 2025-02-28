import React from "react";

const Certificate = () => {
  return (
    <div className="flex flex-col items-center justify-center  p-4 bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://margdarshak.in/public/img/dsc.jpeg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: "95vh", // Adjust this value to fit the page
          }}
        >
          {/* Add your content here */}
          <div className="flex flex-col items-center justify-center h-full p-8">
            <div className=" text-black text-xl">
              S.No
              <br />
              0120257
            </div>

            <div className="mt-8">
              <img
                src="https://via.placeholder.com/150"
                alt="User"
                className="w-24 h-24 rounded-full"
              />
            </div>

            <div className=" text-black text-xl">
              Data
              <br />
              113
            </div>

            <div className="text-center mt-8">
              <h1 className="text-3xl font-bold text-black font-great-vibes italic">
                Manimala
              </h1>
            </div>
            <div className="mt-8 text-center">
              <p className="text-xl text-blue-800 font-medium italic tracking-wide">
                This is to certify that Manimala is the registered holder of the
                Data Share Certificate as per the terms of the Agreement letter
                of Intent (LOI).
              </p>
            </div>

            <div className="mt-2 ">
              <p className="text-2xl text-black font-medium">23.10.2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
