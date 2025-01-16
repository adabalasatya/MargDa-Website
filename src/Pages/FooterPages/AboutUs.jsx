import React, { useEffect } from 'react';
import { FaInfoCircle, FaDatabase, FaComments, FaBullseye, FaStar, FaHandsHelping, FaUserFriends, FaHistory, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Nav from '../../Components/Home/navbar';
import Footer from '../../Components/Home/Footer';

import AboutImage1 from '../../assets/FooterPages/about.jpeg'; 

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  // Array of sections with their respective content
  const sections = [
    {
      title: "About Us",
      icon: <FaInfoCircle className="mr-2" />,
      image: AboutImage1,
      content: (
        <>
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaInfoCircle className="mr-2" /> About Us
          </h3>
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            Welcome to Margdarshak!
          </h3>
          <p className="text-gray-700 mb-4">
            Margdarshak offers Information Technology Enabled Services (ITES) that simplify and automate business processes. Additionally, it provides instant solutions to real-life problems for individuals. Margdarshak's platform is built on a foundation of verified data, integrated with a unified communication system, CRM tools, and numerous need-based services.
          </p>
        </>
      ),
    },
    {
      title: "Our Core Offerings",
      icon: <FaDatabase className="mr-2" />,
      content: (
        <>
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaDatabase className="mr-2" /> Our Core Offerings
          </h3>
          <p className="text-gray-700 mb-4">
            <strong>Verified Data as a Service:</strong> Margdarshak offers millions of personally verified, accurate, up-to-date, need-based, curated data on customers and service/solution providers. Our data can be filtered by country, state, district, PIN, and place to meet customer's specific requirements, ensuring accuracy and reliability.
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li><strong>Data Enrichment:</strong> Enhancing existing customer data with valuable insights.</li>
            <li><strong>Data Cleansing:</strong> Identifying and correcting errors in existing data.</li>
            <li><strong>Data Verification:</strong> Validating contact information for effective marketing campaigns.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Unified Communication",
      icon: <FaComments className="mr-2" />,
      content: (
        <>
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaComments className="mr-2" /> Unified Communication
          </h3>
          <p className="text-gray-700 mb-4">
            In today's fast-paced world, staying connected is crucial. Our robust, unified communication platform seamlessly integrates calls, emails, SMS, WhatsApp, and virtual meetings into a single, intuitive interface, enabling businesses to:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li><strong>Improve customer interactions:</strong> Provide personalised and efficient customer support.</li>
            <li><strong>Enhance team collaboration:</strong> Foster seamless communication and teamwork within organisations.</li>
            <li><strong>Increase productivity:</strong> Optimise communication workflows and improve operational efficiency.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Customer Relationship Management",
      icon: <FaUserFriends className="mr-2" />,
      content: (
        <>
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaUserFriends className="mr-2" /> Customer Relationship Management
          </h3>
          <p className="text-gray-700 mb-4">
            Building and maintaining strong customer relationships is at the heart of every successful business. Our CRM system is integrated with smart, innovative tools to manage various functions of your business. Margdarshak's intuitive CRM system empowers businesses:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li><strong>Build stronger customer relationships:</strong> Track customer interactions, understand customer needs, personalise engagement, maintain logs, and task reminders.</li>
            <li><strong>Drive sales growth:</strong> Manage sales pipelines, track key metrics, and improve sales effectiveness.</li>
            <li><strong>Increase customer loyalty:</strong> Deliver exceptional customer service and build long-term relationships.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Life-Links",
      icon: <FaHandsHelping className="mr-2" />,
      content: (
        <>
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaHandsHelping className="mr-2" /> Life-Links
          </h3>
          <p className="text-gray-700 mb-4">
            Margdarshak leverages technology to empower individuals with need-based services such as career planning, education guidance, work opportunities, business outsourcing, financial advice, accommodation assistance, healthcare support, matrimonial alliance, or other essential, real-life challenges. We also create avenues for service providers to reach their target audience.
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li><strong>Healthcare:</strong> Connecting patients with doctors, hospitals, and other healthcare providers.</li>
            <li><strong>Education:</strong> Connecting students with educational resources, tutors, and scholarships.</li>
            <li><strong>Finance:</strong> Connecting individuals with financial aid programs and resources.</li>
            <li><strong>Social:</strong> Connecting individuals with essential services and support networks.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Our Mission",
      icon: <FaBullseye className="mr-2" />,
      content: (
        <>
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaBullseye className="mr-2" /> Our Mission
          </h3>
          <p className="text-gray-700 mb-4">
          We aim to empower organisations to build meaningful connections with their customers and partners through a robust platform integrated with verified data, seamless communication tools, intelligent CRM systems and other resources they need to grow and achieve their goals.
          </p>
          <p className="text-gray-700 mb-4">Let us help you transform the way you work, connect, and grow. Together, we can achieve extraordinary things.</p>
        </>
      ),
    },
    {
      title: "Our Vision",
      icon: <FaRocket className="mr-2" />,
      content: (
        <>
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaRocket className="mr-2" /> Our Vision
          </h3>
          <p className="text-gray-700 mb-4">
            To be the leading provider of data-driven solutions that empower businesses and individuals to succeed in a digitally interconnected world. We achieve this vision by:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Delivering innovative solutions that meet the evolving needs of businesses.</li>
            <li>Providing exceptional service and support to our customers.</li>
            <li>Building strategic partnerships that create value for our customers.</li>
            <li>Fostering a culture of innovation, collaboration, and continuous learning.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Our Values",
      icon: <FaStar className="mr-2" />,
      content: (
        <>
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaStar className="mr-2" /> Our Values
          </h3>
          <p className="text-gray-700 mb-4">
            At Margdarshak, we're driven by a set of core values that shape our culture, our behaviour, and our decision-making. These values include:
          </p>
          <ul className="list-disc pl-6">
            <li><strong>Innovation:</strong>  We continuously strive to develop innovative solutions that meet the evolving needs of our customers. We're committed to pushing the boundaries of what's possible.</li>
            <li><strong>Customer:</strong> We put our customers at the heart of everything we do, and striving to deliver exceptional service and support. We are dedicated to exceeding customer expectations.</li>
            <li><strong>Integrity:</strong>We operate with transparency, honesty, and ethics, and expecting our team members to uphold the highest standards of integrity to maintain the trust of our customers and partners.</li>
            <li><strong>Collaboration:</strong>We believe in the power of teamwork and partnership, and encourage our team members to strengthen relationships</li>
            <li><strong>Excellence:</strong>We strive for excellence in all aspects of our business, from product development to customer service.</li>
            <li><strong>Trust:</strong> We instil confidence through reliable and verified data.</li>
            <li><strong>Impact:</strong> We are committed to using our tools and technology to solve real-life problems  to make a positive impact on society.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Our Team",
      icon: <FaUserFriends className="mr-2" />,
      content: (
        <>
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaUserFriends className="mr-2" /> Our Team
          </h3>
          <p className="text-gray-700 mb-4">
            Our team comprises experienced professionals who are passionate about innovation, customer satisfaction, and teamwork. We possess a diverse range of skills and expertise, including:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Data scientists and analysts with expertise in data management, analytics, and visualization.</li>
            <li>Software developers and engineers with expertise in cloud computing, artificial intelligence, and machine learning.</li>
            <li>Customer success managers and support specialists with expertise in customer relationship management and support.</li>
            <li>Sales and marketing professionals with expertise in business development, marketing, and sales.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Our Story",
      icon: <FaHistory className="mr-2" />,
      content: (
        <>
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaHistory className="mr-2" /> Our Story
          </h3>
          <p className="text-gray-700 mb-4">
            Founded by a team of visionary entrepreneurs and technologists, Margdarshak emerged from a passion for bridging the gap between people, businesses, and services. We understand that in today's digital age, verified data and seamless communication are the keys to unlocking meaningful connections and driving success.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Nav />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 md:px-12 py-8">
        {sections.map((section, index) => (
          <motion.section
            key={index}
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            {/* Content (Text + Image) */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* For the "About Us" section, always place the image on the right */}
              {section.title === "About Us" ? (
                <>
                  <div className="w-full md:w-3/4">
                    {section.content}
                  </div>
                  <motion.div
                    className="w-full md:w-1/4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={imageVariants}
                  >
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                </>
              ) : (
                <>
                  <div className="w-full md:w-3/4">
                    {section.content}
                  </div>
                </>
              )}
            </div>
          </motion.section>
        ))}

        {/* Join the Journey Section */}
        <motion.section
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaHandsHelping className="mr-2" /> Join the Journey
          </h3>
          <p className="text-gray-700 mb-4">
            If you're as passionate as we are about harnessing technology to foster meaningful connections and growth, we would be thrilled to have you on board. Explore our solutions, become part of our team, or collaborate with us to shape the future of business.
          </p>
        </motion.section>

        {/* Get in Touch Section */}
        <motion.section
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaComments className="mr-2" /> Get in Touch
          </h3>
          <p className="text-gray-700 mb-4">
            If you'd like to learn more about Margdarshak and our innovative solutions, please feel free to reach out. We'd be delighted to hear from you and discuss how we can help your business succeed.
          </p>
        </motion.section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;