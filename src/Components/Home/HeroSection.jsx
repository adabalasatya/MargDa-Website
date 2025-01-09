import React, { useEffect, useRef } from "react";
import HeroImage from "../../assets/herosection0.webp";

function HeroSection() {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    const imageElement = imageRef.current;

    if (textElement) {
      textElement.classList.add("animate-slide-in-left");
    }
    if (imageElement) {
      imageElement.classList.add("animate-slide-in-right");
    }
  }, []);

  return (
    <div className="bg-white text-muted overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        {/* Decorative Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-200 rounded-full opacity-20 animate-float delay-1000"></div>
          <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-float delay-2000"></div>
        </div>

        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          {/* Left Side: Text Content */}
          <div
            ref={textRef}
            className="w-full md:w-1/2 text-center md:text-left transform opacity-0"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-snug mb-6 text-primary">
            Margdarshak - Your Path to Success
            </h1>
            <p className="text-lg mb-8 text-secondary">
              <span className="font-bold text-highlight">Marg </span> means "path",{" "}
              <span className="font-bold text-highlight">Darshak </span> means "guide".Margdarshak provides expert advice, personalised solutions, and support to help individuals navigate through the complexities of life, overcome challenges, and achieve their goals.
            </p>
            {/* <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full font-semibold transform transition-transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get a demo	
              </button>
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full font-semibold transform transition-transform hover:scale-105 shadow-lg hover:shadow-xl">
              Know more	
              </button>
            </div> */}
          </div>

          {/* Right Side: Image */}
          <div
            ref={imageRef}
            className="w-full md:w-1/2 relative mt-12 md:mt-0 transform opacity-0"
          >
            <img
              src={HeroImage}
              alt="Illustration"
              className="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
            {/* Floating Labels */}
            <div className="absolute top-12 left-10 bg-pink-600 text-white px-3 py-1 rounded-full text-sm shadow-lg animate-float">
              Education
            </div>
            <div className="absolute top-32 right-10 bg-pink-600 text-white px-3 py-1 rounded-full text-sm shadow-lg animate-float">
              Work
            </div>
            <div className="absolute bottom-12 right-16 bg-pink-600 text-white px-3 py-1 rounded-full text-sm shadow-lg animate-float">
              Business
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;