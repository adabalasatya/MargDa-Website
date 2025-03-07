import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTools, FaDatabase, FaPhone } from 'react-icons/fa';
import Nav from '../../Components/Home/navbar';
import Footer from '../../Components/Home/Footer';

const FeaturesAndSubscription = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: 'easeOut' 
      } 
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.5, 
        ease: 'easeOut' 
      } 
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: 'easeOut' 
      } 
    },
  };

  return (
    <div className="min-h-screen flex flex-col  font-sans">
      {/* Navbar */}
      <Nav />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-16 text-center"
        >
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={headingVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex  items-center justify-center"
          >
            <FaTools className="mr-3 text-green-600" /> Features and Subscription
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore Margdarshak Digital Workplace—a powerful platform for business automation, data insights, and smart tools.
          </p>
        </motion.section>

        {/* Digital Workplace Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-16 bg-white rounded-lg shadow-md p-6 border border-blue-300"
        >
          <motion.h2
            variants={headingVariants}
            className="text-3xl font-semibold text-gray-800 mb-6 flex items-center"
          >
            <FaTools className="mr-3 text-green-600" /> Digital Workplace
          </motion.h2>
          <motion.p
            variants={sectionVariants}
            className="text-gray-700 leading-relaxed mb-6"
          >
            Margdarshak Digital Workplace is a cloud-based business automation web and mobile app integrated with Verified Data, Unified Communication, and Smart Tools. (Refer to a subscription plan at{' '}
            <a href="http://www.margda.com" target="_blank" className="text-blue-600 hover:underline font-medium">
              www.margda.com
            </a>).
          </motion.p>

          {/* Subsections */}
          <div className="space-y-8">
            <motion.div variants={listItemVariants} className="border-l-4 border-green-500 pl-4 ">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">A. Verified Data</h3>
              <p className="text-gray-700 mb-4">
                The Workplace provides access to the most authentic, curated, and need-based data for its subscribers. To protect privacy and prevent unauthorised data use, the contact details are encrypted. Data can be filtered by datatype, country, state, district, and pin code, allowing users to shortlist leads based on their specific tasks.
              </p>
              <p className="text-gray-700">
                Timeline mapping offers insights into the customer's journey and actionable information. Real-time data analytics and reporting enhance customer engagement, operational efficiency, and enable businesses to make effective, data-driven decisions.
              </p>
            </motion.div>

            <motion.div variants={listItemVariants} className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">B. Unified Communications</h3>
              <p className="text-gray-700 mb-4">
                The Workplace integrates mobile devices, allowing users to engage in hands-free, omnichannel communication through calls, emails, WhatsApp, and SMS, and to meet virtually without sharing contact details.
              </p>
              <p className="text-gray-700">
                The much-acclaimed features include automatic synchronisation of all interactions, maintaining contact logs, scheduling follow-ups and setting leads' status. Users receive real-time reminders for important events boosting efficiency and conversions.
              </p>
            </motion.div>

            <motion.div variants={listItemVariants} className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">C. Smart Tools</h3>
              <p className="text-gray-700 mb-4">
                The Workplace offers professional tools for career counselling, teaching/training, hiring, marketing, sales and support, etc. to streamline business processes and drive growth as described below:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <strong>Counselling tools:</strong> Guide students for career and education planning, and admissions in India/abroad.
                </li>
                <li>
                  <strong>Career Aptitude:</strong> Become what you want to be<br />
                  An authentic psychometric tool for students to discover their true interests and set S.M.A.R.T. (Specific, Measurable, Acceptable, Realistic and Time-bound) career objectives; if a career has been already decided, then its compatibility is assessed.
                </li>
                <li>
                  <strong>Innate Ability:</strong> Recognising Talents<br />
                  Every individual possesses unique talents, and identifying a child's intelligence and learning styles eliminates the 'trial and error' approach to parenting, i.e., teaching a fish to climb a tree.
                </li>
                <li>
                  <strong>Work Attitude:</strong> Listen to your heart & mind<br />
                  Work Attitude Assessment enables users to pinpoint what matters most to them in a career. It assists in recognising occupations that they may find satisfying by comparing their work values with the characteristics of various professions.
                </li>
                <li>
                  <strong>Career Explorer:</strong><br />
                  In this era of globalisation, students often lack awareness of the world of work and essential facts about various occupations. The Career Choice tool provides details on approximately 1500 occupations, which can be filtered using thousands of parameters related to 1. Ability, 2. Activity, 3. Aptitude, 4. Attitude, 5. Industry, 6. Knowledge, 7. Outlook, 8. Pathway, 9. Preference, 10. Sector, 11. Skills, 12. STEM, 13. Technology, 14. Tools, 15. Trait, 16. Zone.
                </li>
                <li>
                  <strong>Subject Career Pathways:</strong><br />
                  Due to the lack of career education in schools, teachers often do not take even a single class to explain “why they are teaching Geography, Chemistry, Economics etc.” Margdarshak offers 52 Career Subject Pathways and Infographics ranging from Accounts to Textiles Designing to relate subjects with students' vocational aspirations.
                </li>
                <li>
                  <strong>Marketing tools:</strong> Generate abundant leads with branding and not spamming. Also, data segmentation for targeted marketing, automated campaigns, lead nurturing, and tracking.
                </li>
                <li>
                  <strong>Sales tools:</strong> Integrate the sales process of any product/service and increase 5X revenues.
                </li>
                <li>
                  <strong>Support tools:</strong> Provide real-time omnichannel customer support, including ticketing, chat, and phone-optimizing interactions at each touchpoint to enhance customer satisfaction.
                </li>
                <li>
                  <strong>Hiring tools:</strong> Recruit the best people ready to work full/part-time.
                </li>
                <li>
                  <strong>Training tool:</strong> Teach for academic/competitive exams or skills development.
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Features of Margdarshak Digital Workplace */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-16 bg-white rounded-lg shadow-md p-6 border border-blue-300" 
        >
          <motion.h2
            variants={headingVariants}
            className="text-3xl font-semibold text-gray-800 mb-6 flex items-center"
          >
            <FaDatabase className="mr-3 text-blue-600" /> Features of the Margdarshak Digital Workplace (MDW)
          </motion.h2>
          <div className="overflow-x-auto">
            <table className="w-full text-gray-700 text-left border-collapse">
              <thead>
                <tr className="bg-blue-50 text-blue-900">
                  <th className="p-4 font-semibold">Basic</th>
                  <th className="p-4 font-semibold">Standard</th>
                  <th className="p-4 font-semibold">Business</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                   
                    basic: "Add and upload your data",
                    standard: "Add/upload your data + limited MDW data access",
                    business: "Add/upload your data + unlimited MDW data access",
                  },
                  {
                    
                    basic: "Recharge to use (UCS) unified communication system",
                    standard: "No recharge required to use UCS through your SIM + Virtual Meeting (VM)",
                    business: "No recharge required to use UCS through your SIM + fair use of VM + email + SMS + WhatsApp + call API",
                  },
                  {
                    
                    basic: "Smart tools cost extra",
                    standard: "Smart tools included except counselling",
                    business: "All smart tools with counselling tools included",
                  },
                  {
                    
                    basic: "No (IVR) Interactive Voice Response",
                    standard: "No IVR",
                    business: "IVR included above quarterly subscription",
                  },
                  {
                    
                    basic: "No Team features",
                    standard: "No Team features",
                    business: "Team Management features included for annual subscription",
                  },
                ].map((row, index) => (
                  <motion.tr
                    key={index}
                    variants={listItemVariants}
                    className="border-b hover:bg-gray-100 transition-colors"
                  >
                   
                    <td className="p-4">{row.basic}</td>
                    <td className="p-4">{row.standard}</td>
                    <td className="p-4">{row.business}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Subscription Rate */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-16 bg-white rounded-lg shadow-md p-6 border border-blue-300"
        >
          <motion.h2
            variants={headingVariants}
            className="text-3xl font-semibold text-gray-800 mb-6 flex items-center"
          >
            <FaPhone className="mr-3 text-purple-600" /> Subscription Rate
          </motion.h2>
          <div className="overflow-x-auto">
            <table className="w-full text-gray-700 text-left border-collapse">
              <thead>
                <tr className="bg-purple-50 text-purple-900">
                  <th className="p-4 font-semibold">Payment Mode</th>
                  <th className="p-4 font-semibold">Basic*</th>
                  <th className="p-4 font-semibold">Standard*</th>
                  <th className="p-4 font-semibold">Business*</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    mode: "Annual billing",
                    basic: "₹11,760 @ ₹980 pm",
                    standard: "₹32,400 @ ₹2,700 pm",
                    business: "₹52,800 @ ₹4,400 pm",
                  },
                  {
                    mode: "Half-Yearly billing",
                    basic: "₹7,644 @ ₹1,274 pm",
                    standard: "₹19,440 @ ₹3,240 pm",
                    business: "₹28,800 @ ₹4,800 pm",
                  },
                  {
                    mode: "Quarterly billing",
                    basic: "₹4,704 @ ₹1,568 pm",
                    standard: "₹11,340 @ ₹3,780 pm",
                    business: "₹15,840 @ ₹5,280 pm",
                  },
                  {
                    mode: "Monthly billing",
                    basic: "₹1,862**",
                    standard: "₹4,320**",
                    business: "₹5,720**",
                  },
                ].map((row, index) => (
                  <motion.tr
                    key={index}
                    variants={listItemVariants}
                    className="border-b hover:bg-gray-100 transition-colors"
                  >
                    <td className="p-4 font-medium">{row.mode}</td>
                    <td className="p-4">{row.basic}</td>
                    <td className="p-4">{row.standard}</td>
                    <td className="p-4">{row.business}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <motion.p
            variants={sectionVariants}
            className="text-gray-700 mt-4 italic"
          >
            * Per user, GST @18% extra<br />
            ** One-time set up cost ₹3,500 extra for monthly subscription.
          </motion.p>
        </motion.section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FeaturesAndSubscription;