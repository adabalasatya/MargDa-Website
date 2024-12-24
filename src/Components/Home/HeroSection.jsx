import React from "react";
import heroImage from "../../assets/heroImage.webp";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Left Content */}
      <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left animate-fadeIn z-10">
      <h1 className="text-5xl font-bold leading-tight mb-6">
  <span className="text-orange-500">Margdarshak</span>
 
</h1>
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
          Marg means "path" and "darshak" means "guide". Margdarshak offers Smart
          Business Solutions that are helpful for new start-ups or boosting
          existing ones.
        </p>
        <div>
          <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-300 ease-in-out">
            Get Started
          </button>
          <button className="ml-4 px-6 py-3 bg-white border-2 border-white-600 text-orange-600 font-semibold rounded-lg shadow-md hover:bg-orange-600 hover:text-white transition duration-300 ease-in-out">
            Learn More
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center md:justify-end ">
  <div className="relative w-full max-w-lg md:max-w-xl">
    <img
      src={heroImage}
      alt="Hero Illustration"
      className="w-[130%] md:w-[130%] h-auto object-contain drop-shadow-2xl relative z-0 rounded-2xl"  
    />
    <div className="absolute -top-10 -right-10 w-[120%] h-[120%] bg-gradient-to-r from-blue-200 to-blue-100 rounded-full blur-3xl opacity-50 z-[-1]"></div>
  </div>
</div>

    </section>
  );
};

export default HeroSection;
