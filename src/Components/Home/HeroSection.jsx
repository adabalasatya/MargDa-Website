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
      <section className="relative px-4 md:px-12 py-12 md:py-20 bg-gradient-to-r from-blue-50 to-purple-50">
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug mb-4 md:mb-6 text-primary">
              Margdarshak
              <span className="block text-lg sm:text-xl md:text-xl p-1 font-normal leading-snug mb-4 md:mb-6 text-primary">
                One life :: Make it :: The best
              </span>
            </h1>
            <p className="text-base sm:text-lg mb-6 md:mb-8 text-secondary">
              <span className="font-bold text-highlight">Marg </span> means
              "path", <span className="font-bold text-highlight">Darshak </span>{" "}
              means "guide". Margdarshak provides expert advice, personalised
              solutions, and support to help individuals and businesses overcome
              challenges, navigate the complexities of life, and achieve their
              goals.
            </p>
          </div>

          {/* Right Side: Image */}
          <div
            ref={imageRef}
            className="w-full md:w-1/2 relative mt-8 md:mt-0 transform opacity-0 flex justify-center items-center"
          >
            <img
              src={HeroImage}
              alt="Illustration"
              className="w-full sm:w-3/4 h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
            {/* Floating Labels */}
            <div className="absolute top-4 sm:top-8 left-8 sm:left-48 bg-pink-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm shadow-lg animate-float">
              Education
            </div>
            <div className="absolute top-12 sm:top-24 right-2 sm:right-24 bg-pink-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm shadow-lg animate-float">
              Work
            </div>
            <div className="absolute bottom-4 sm:bottom-8 right-8 sm:right-24 bg-pink-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm shadow-lg animate-float">
              Business
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
