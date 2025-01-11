import React from 'react';
import Logo from '../../assets/m.jpeg'

const Certificate = () => {
  return (
    <div className="flex flex-col items-center justify-center p-16 bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className="w-full h-full bg-cover py-8 bg-center"
          style={{
            backgroundImage: "url('https://margdarshak.in/public/img/dsc.jpeg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: "85vh",
          }}
        >
          {/* Add your content here */}
          <div className="flex flex-col items-center justify-center mt-40 p-12">

            {/* Flex container for S.No, Image, and Data */}
            <div className="flex justify-between items-center w-full mt-8 px-20">
              {/* S.No on the left */}
              <div className="text-white text-xl">
                S.No<br />0120257
              </div>

              {/* Image in the middle */}
              <img 
                src={Logo}
                alt="Logo" 
                className="w-16 h-16 mx-4 rounded-lg" 
              />

              {/* Data on the right */}
              <div className="text-white text-xl">
                Data<br />113
              </div>
            </div>
            
            <div className="text-center mt-12">
              <h1 className="text-3xl font-bold text-black font-great-vibes italic">
                Manimala
              </h1>
            </div>
            <div className="mt-2 text-center">
              <p className="text-xl text-blue-800 font-medium italic tracking-wide">
                This is to certify that Manimala is the registered holder of the Data Share Certificate as per the terms of the Agreement letter of Intent (LOI).
              </p>
            </div>

            <div className="mt-12 w-full text-left pl-0 pb-6">
              <p className="relative text-2xl text-black font-medium">
                23.10.2024
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-black text-center py-32 mt-4">
        <strong>
          Copyright &copy; 2025{" "}
          <a
            href="https://margdarshak.in/"
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