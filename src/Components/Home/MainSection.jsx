import React from "react";
import heroImage from "../../assets/mainsection.png";
import logo from "../../assets/m.jpeg";

const MainSection = () => {
  const services = [
    { title: "Marketing", description: "Generate abundant leads with branding and not spamming.", icon: "📈" },
    { title: "Sales", description: "Integrate the sales process of any product/service and increase 5X revenues.", icon: "🛒" },
    { title: "Hiring", description: "Recruit the best people ready to work full/part-time.", icon: "👨‍💼" },
    { title: "Counselling", description: "Guide students for career planning, and admissions in India/abroad.", icon: "🎓" },
    { title: "Training", description: "Teach for academic/competitive exams or skills development.", icon: "📚" },
    { title: "Service", description: "Offer services and solutions based on your knowledge and expertise.", icon: "🎁" },
    { title: "Work", description: "Find opportunities to work full/part-time on a regular salary.", icon: "💼" },
    { title: "Support", description: "Provide real-time support to keep your customers happy.", icon: "📬" },
    
  ];

  return (
    <section className="bg-slate-100 px-6 md:px-20 py-16">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-orange-500 to-blue-700 text-transparent bg-clip-text">
            Margdarshak’s Four Key Components
          </h2>
          <br />
          <p className="text-lg text-gray-600 leading-relaxed">
            Margdarshak offers four powerful solutions: {" "}
            <span className="font-bold text-gray-800">
              Verified Data, Unified Communication, Digital Tools, and Service Mart.
            </span>
            These tools guide businesses towards growth and efficiency.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex justify-center ">
          <img
            src={heroImage}
            alt="Hero Illustration"
            className="w-[70%] h-auto object-cover rounded-3xl shadow-2xl rounded-lg"
          />
        </div>
      </div>

          {/* Features Section */}
<div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
  {/* Feature Cards */}
  {[
    {
      title: "Verified Data",
      desc: "Millions of verified, curated data filtered based on your business needs.",
      icon: "📊",
    },
    {
      title: "Unified Communication",
      desc: "Communicate securely with customers via WhatsApp, Email, Call, or Virtual Meetings.",
      icon: "💬",
    },
    {
      title: "Digital Tools",
      desc: "Manage business branding, sales, and other digital tasks effectively with our smart tools.",
      icon: "🛠️",
    },
    {
      title: "Service Mart",
      desc: "Offer products, solutions, and services to expand your network and customer base.",
      icon: "🛒",
    },
  ].map((feature, index) => (
    <div
      key={index}
      className="bg-gradient-to-r from-white to-gray-50 p-8 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-200"
    >
      <h3 className="font-bold text-2xl mb-4 text-orange-600 flex items-center">
        <span className="mr-4 text-4xl">{feature.icon}</span> {feature.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
    </div>
  ))}
</div>



      {/* Services Section */}
      <div className="mt-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-orange-700 to-blue-700 text-transparent bg-clip-text">
          Explore Our Services
        </h2>
        <div className="h-1 w-24 bg-orange-500 mx-auto mb-10"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-3xl p-12 flex items-start space-x-4 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl">{service.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-orange-600">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
<div className="mt-20">
  <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-orange-700 to-blue-700 text-transparent bg-clip-text">
    What Our Clients Say
  </h2>
  <div className="h-1 w-24 bg-orange-500 mx-auto mb-10"></div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Testimonial Cards */}
    {[
      "Margdarshak has transformed our customer engagement strategy, providing a secure and reliable platform for our team.",
      "The verified data feature of Margdarshak has significantly improved our sales outreach efforts, allowing us to target the right customers.",
      "Margdarshak has been a game-changer for our business. The verified data and secure communication system have significantly improved our operations and customer satisfaction.",
      "I've tried other CRMs, but none have matched the data quality and security level provided by Margdarshak. It's a reliable and trustworthy solution.",
      "The verified data has significantly improved the quality of our leads, resulting in increased sales and customer satisfaction.",
    ].map((testimonial, index) => (
      <div
        key={index}
        className="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 transition-transform transform hover:scale-105 flex  items-start gap-5"
      >
        <img
          src={logo} 
          alt="Client Logo"
          className="h-12 w-12 mb-4"
        />
        <p className="text-gray-700  leading-relaxed text-center">
          "{testimonial}"
        </p>
      </div>
    ))}
  </div>
</div>

    </section>
  );
};

export default MainSection;