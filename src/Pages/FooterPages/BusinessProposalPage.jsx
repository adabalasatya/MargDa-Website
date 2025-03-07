import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaStar, FaBullseye, FaTools, FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BusinessProposal = () => {
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
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="mb-6 md:mb-0">
              <img
                src="https://margda.com/email/margda.png"
                alt="margda.com"
                className="h-12 w-auto"
              />
            </div>
            <div className="text-gray-700 text-sm space-y-3">
              <div className="flex items-center">
                <img src="https://margda.com/email/margda.ico" alt="" className="w-4 h-4 mr-2" />
                <strong className="text-gray-900">Margdarshak Media</strong>
              </div>
              <div className="flex items-center">
                <img src="https://margda.com/email/address.png" alt="" className="w-4 h-4 mr-2" />
                <span>C-67 Dwarka Mor Metro, New Delhi</span>
              </div>
              <div className="flex items-center">
                <img src="https://margda.com/email/mobile.png" alt="" className="w-4 h-4 mr-2" />
                <span>07965174000</span>
              </div>
              <div className="flex items-center">
                <img src="https://margda.com/email/whatsapp.png" alt="" className="w-4 h-4 mr-2" />
                <span>+918130960040</span>
              </div>
              <div className="flex items-center">
                <img src="https://margda.com/email/email.png" alt="" className="w-4 h-4 mr-2" />
                <a href="mailto:team@margda.com" className="text-blue-600 hover:underline">
                  team@margda.com
                </a>
              </div>
              <div className="flex items-center">
                <img src="https://margda.com/email/website.png" alt="" className="w-4 h-4 mr-2" />
                <a href="https://www.margda.com" className="text-blue-600 hover:underline">
                  www.margda.com
                </a>
              </div>
            </div>
          </div>

          {/* Business Proposal Title */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={headingVariants}
            className="text-3xl font-bold text-gray-900 mb-6 flex items-center"
          >
            <FaRocket className="mr-2 text-blue-600" /> Business Proposal
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-gray-600 text-lg mb-8"
          >
            ☂ If you stop working, does your income also stop? Now, it will not happen!
          </motion.p>
        </motion.section>

        {/* Smart Work Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-12"
        >
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={headingVariants}
            className="text-2xl font-semibold text-gray-800 mb-4 flex items-center"
          >
            <FaStar className="mr-2 text-yellow-500" /> Smart Work, Lifelong Income
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-gray-600 mb-6"
          >
            Without interrupting your current activities, you can work from anywhere at flexible times, to open an alternate, stable, source of income. For this, you must build and mentor a team of nine Advisors, keep them productive and work cohesively on any of the projects described below:
          </motion.p>

          {/* Projects List */}
          <ol className="list-[upper-alpha] pl-6 text-gray-600 space-y-4">
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <strong className="text-gray-800">Career Counselling:</strong> We provide you with 350+ students each month. Your team of counsellors conduct assessments and do counselling for the best-fit career and education options. You'll earn ₹600 per student and a monthly business of ₹2,10,000. You can share the income with the counsellors based on your mutual understanding.
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <strong className="text-gray-800">Business Consulting:</strong> Your team of Advisors must connect with institutes/businesses to offer admission and business solutions. There is <strong className='text-black'>NO daily or monthly target</strong>. The Advisors are required to maintain forty-five subscriptions to the Digital Workplace throughout the association. Your expected monthly income will be ₹1,32,300 and each of your Advisors can earn ₹44,100 per month.
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <strong className="text-gray-800">Expert Solutions:</strong> You can offer any need-based service or solution to clients aligned with your interest and expertise. Decide your fee and get 100% of the income. Some of the examples are listed below:
              <ul className="list-disc pl-6 mt-2 text-gray-600">
                <li>Study/Scholarships Abroad Consulting</li>
                <li>Coaching/Training/Tutoring or Homework Help</li>
                <li>Placement/Recruitment Process Outsource Agency</li>
                <li>Employability and Life-skills Development</li>
                <li>Financial and Insurance Advisory</li>
                <li>Counselling for Mental and Life Problems</li>
                <li>Marketing/Sales Process of any product/service</li>
                <li>Digital/Social Media and Reputation Management</li>
                <li>Business Consulting based on your expertise, etc.</li>
              </ul>
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <strong className="text-gray-800">Tel-guidance:</strong> Create your profile on the "Advisors Panel." Describe the service and specify your per-minute rate. People will call you for assistance. You will receive payment based on the duration of the call, which is instantly credited to your wallet. You can withdraw this amount at any time.
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <strong className="text-gray-800">Data Monetisation:</strong> You can have an opportunity to earn a lifelong income between ₹10,000 and ₹45,000 per month by monetising data in the Workplace, and you will receive a Data Share Certificate (DSC). Data monetisation involves transforming static data into an asset that generates economic value. Companies like Google, Facebook, and Amazon are earning billions through data.
            </motion.li>
          </ol>
        </motion.section>

        {/* Pre-requisites */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-12"
        >
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={headingVariants}
            className="text-2xl font-semibold text-gray-800 mb-4 flex items-center"
          >
            <FaBullseye className="mr-2 text-red-500" /> Pre-requisites to Start This Business
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-gray-600"
          >
            You need an internet-connected computer or smartphone along with a Digital Workplace subscription. You should possess counselling knowledge, business development skills, and team management abilities.
          </motion.p>
        </motion.section>

        {/* Digital Workplace */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-12"
        >
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={headingVariants}
            className="text-2xl font-semibold text-gray-800 mb-4 flex items-center"
          >
            <FaTools className="mr-2 text-green-500" /> Digital Workplace
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-gray-600 mb-6"
          >
            Margdarshak Digital Workplace is a cloud-based business automation web and mobile app integrated with Verified Data, Unified Communication and Smart Tools. (refer to a subscription plan at{' '}
            <a href="http://www.margda.com" target="_blank" className="text-blue-600 hover:underline">
              www.margda.com
            </a>).
          </motion.p>

          {/* Subsections */}
          <div className="space-y-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">A. Verified Data</h3>
              <p className="text-gray-600 mb-4">
                The Workplace provides access to the most authentic, curated, and need-based data for its subscribers. To protect privacy and prevent unauthorised data use, the contact details are encrypted. Data can be filtered by datatype, country, state, district, and pin code, allowing users to shortlist leads based on their specific tasks.
              </p>
              <p className="text-gray-600">
                Timeline mapping offers insights into the customer's journey and actionable information. Real-time data analytics and reporting enhance customer engagement, operational efficiency, and enable businesses to make effective, data-driven decisions.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">B. Unified Communications</h3>
              <p className="text-gray-600 mb-4">
                The Workplace integrates mobile devices, allowing users to engage in hands-free, omnichannel communication through calls, emails, WhatsApp, and SMS, and to meet virtually without sharing contact details.
              </p>
              <p className="text-gray-600">
                The much-acclaimed features include automatic synchronisation of all interactions, maintaining contact logs, scheduling follow-ups and setting leads' status. Users receive real-time reminders for important events boosting efficiency and conversions.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">C. Smart Tools</h3>
              <p className="text-gray-600 mb-4">
                The Workplace offers professional tools for career counselling, teaching/training, hiring, marketing, sales and support, etc. to streamline business processes and drive growth as described below:
              </p>
              <p className="text-gray-600 mb-2">
                <strong className='text-black'>Counselling tools:</strong> Guide students for career and education planning, and admissions in India/abroad.
              </p>
              <p className="text-gray-600 mb-2">
                <strong className='text-black'>Career Aptitude:</strong> Become what you want to be<br />
                An authentic psychometric tool for students to discover their true interests and set S.M.A.R.T. (Specific, Measurable, Acceptable, Realistic and Time-bound) career objectives; if a career has been already decided, then its compatibility is assessed.
              </p>
              <p className="text-gray-600 mb-2">
                <strong className='text-black'>Innate Ability:</strong> Recognising Talents<br />
                Every individual possesses unique talents, and identifying a child's intelligence and learning styles eliminates the 'trial and error' approach to parenting, i.e., teaching a fish to climb a tree.
              </p>
              <p className="text-gray-600 mb-2">
                <strong className='text-black'>Work Attitude tool:</strong> Listen to your heart & mind<br />
                Work Attitude Assessment enables users to pinpoint what matters most to them in a career. It assists in recognising occupations that they may find satisfying by comparing their work values with the characteristics of various professions.
              </p>
              <p className="text-gray-600 mb-2">
                <strong className='text-black'>Career Explorer:</strong><br />
                In this era of globalisation, students often lack awareness of the world of work and essential facts about various occupations. The Career Choice tool provides details on approximately 1500 occupations, which can be filtered using thousands of parameters related to 1. Ability, 2. Activity, 3. Aptitude, 4. Attitude, 5. Industry, 6. Knowledge, 7. Outlook, 8. Pathway, 9. Preference, 10. Sector, 11. Skills, 12. STEM, 13. Technology, 14. Tools, 15. Trait, 16. Zone.
              </p>
              <p className="text-gray-600 mb-2">
                <strong className='text-black'>Subject Career Pathways tool:</strong><br />
                Due to the lack of career education in schools, teachers often do not take even a single class to explain “why they are teaching Geography, Chemistry, Economics etc.” Margdarshak offers 52 Career Subject Pathways and Infographics ranging from Accounts to Textiles Designing to relate subjects with students' vocational aspirations.
              </p>
              <p className="text-3xl text-black-600 mb-2 p-2 text-center">
                “Even the best player requires a coach!”
              </p>
              <p className="text-gray-600 mb-2">
                <strong className='text-black'>Marketing tools:</strong> Generate abundant leads with branding and not spamming. Also, data segmentation for targeted marketing, automated campaigns, lead nurturing, and tracking.
              </p>
              <p className="text-gray-600 mb-2">
                <strong className='text-black'>Sales tools:</strong> Integrate the sales process of any product/service and increase 5X revenues.
              </p>
              <p className="text-gray-600 mb-2">
                <strong className='text-black'>Support tools:</strong> Provide real-time omnichannel customer support, including ticketing, chat, and phone-optimizing interactions at each touchpoint to enhance customer satisfaction.
              </p>
              <p className="text-gray-600 mb-2">
                <strong className='text-black'>Hiring tools:</strong> Recruit the best people ready to work full/part-time.
              </p>
              <p className="text-gray-600">
                <strong className='text-black'>Training tool:</strong> Teach for academic/competitive exams or skills development.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* 10 Strong Reasons */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-12"
        >
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={headingVariants}
            className="text-2xl font-semibold text-gray-800 mb-4 flex items-center"
          >
            ⚛ 10 Strong Reasons to Get Associated with Us
          </motion.h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-4">
            <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listItemVariants}>
              <strong className="text-gray-800">A business set-up you can be proud of:</strong> We provide you with a robust cloud-based infrastructure with curated data + an integrated communication system + the world’s most authentic career assessment/counselling tools, training/learning, recruitment and team management platform. While working in a virtual office, there is no stress, pollution, traffic jams, or the hassle of commuting daily and paying the travel fare.
            </motion.li>
            <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listItemVariants}>
              <strong className="text-gray-800">No office or staff required:</strong> You don't have to spend on a physical office set-up, staff salary, and other costs. You share the income without liability, overhead expenses, or financial loss.
            </motion.li>
            <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listItemVariants}>
              <strong className="text-gray-800">Verified data:</strong> A significant challenge for any business is getting need-based clients' data. Entrepreneurs invest most of their time, money, and effort to find leads and fewer resources are left to do the business. We help you avoid these pitfalls and empower you by sharing data and tools to generate abundant leads.
            </motion.li>
            <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listItemVariants}>
              <strong className="text-gray-800">Multiple sources of income:</strong> The main reason for inadequate and irregular income is the dependency on a single source of earnings through self-effort. When you work in a team, your business is set on auto-pilot mode, creating multiple channels of income, even if you temporarily stop working due to some unavoidable circumstances, family commitments, vacations, or engagement in other activities.
            </motion.li>
            <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listItemVariants}>
              <strong className="text-gray-800">Ownership of the business:</strong> You work under the banner of Margdarshak, and we take care of the venture so that the entrepreneurship within you can spread its wings. You can give a distinct name to your business. You are the legal owner of your enterprise. Also, you own the Data Share Certificate (DSC) and you can transfer it to your family members or sell it to someone for a profit.
            </motion.li>
            <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listItemVariants}>
              <strong className="text-gray-800">Most satisfying vocation:</strong> You act as a catalyst and transfer your knowledge to guide and shape the destiny of young people. The success of one person inspires others in the family and society. Additionally, you can use your experience to offer consultancy to businesses.
            </motion.li>
            <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listItemVariants}>
              <strong className="text-gray-800">Freedom to work from anywhere anytime:</strong> You can balance your current activities and personal life with ease to attain financial stability on your terms. Also, you have the flexibility to schedule your work at your convenience.
            </motion.li>
            <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listItemVariants}>
              <strong className="text-gray-800">Global reach, unlimited market:</strong> A physical centre depends on the local population and can be reached by nearby clients, using Margdarshak's cloud-based platform, you have unlimited and unrestricted exposure to clients worldwide and offer them any product/service/consultancy.
            </motion.li>
            <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listItemVariants}>
              <strong className="text-gray-800">A dignified partnership:</strong> We consider you as a vital stakeholder. Our work culture fosters an environment where we can grow and gain insights into clients, competitors, business conditions, and ever-changing technologies. We strongly believe in the power of 1+1 = 11 and respect the values of our Business Associates.
            </motion.li>
            <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listItemVariants}>
              <strong className="text-gray-800">Transparency in business:</strong> Your earnings are updated instantly in the Income dashboard, and you receive real-time notifications. You can monitor your income and stay informed through the app.
            </motion.li>
          </ul>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-12"
        >
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={headingVariants}
            className="text-2xl font-semibold text-gray-800 mb-4 flex items-center"
          >
            <FaQuestionCircle className="mr-2 text-purple-500" /> Frequently Asked Questions (FAQ)
          </motion.h2>
          <div className="space-y-4">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
              className="text-gray-600"
            >
              <strong className="text-gray-800">✍ Is it a job offer or a business opportunity?</strong><br />
              It is not a full/part-time job offer but an EdTech entrepreneurship opportunity. You will work as a business associate to complete counselling projects and provide admission and placement solutions to institutions and businesses.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
              className="text-gray-600"
            >
              <strong className="text-gray-800">✍ What are my key responsibilities?</strong><br />
              You can work from anywhere using an internet-connected mobile or computer and Digital Workplace. You must develop a team of Advisors to do either career counselling or business consulting.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
              className="text-gray-600"
            >
              <strong className="text-gray-800">✍ Who can avail of this opportunity?</strong><br />
              Anyone, who has a desire to work and earn money, for example:<br />
              ➢ <strong>Students:</strong> can cultivate a habit of earning and learning while shaping their careers.<br />
              ➢ <strong>Jobseekers:</strong> can get real experience and earn money while searching desired jobs.<br />
              ➢ <strong>Working persons:</strong> can have an additional source of income to meet the increasing cost of living.<br />
              ➢ <strong>Homemakers:</strong> can use their education to be self-reliant while fulfilling family responsibilities.<br />
              ➢ <strong>Retired and active:</strong> can guide the young generation to earn an attractive income.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
              className="text-gray-600"
            >
              <strong className="text-gray-800">✍ How can I have a lifelong regular income?</strong><br />
              Subscribers pay for the Verified Data as a Service (VDaaS), and you earn a fixed share of the revenue generated through data monetisation. Additionally, you continue to receive income from your team's efforts even if you temporarily stop working due to unavoidable circumstances, family commitments, vacations, or other engagements.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
              className="text-gray-600"
            >
              <strong className="text-gray-800">✍ Is it a Network or MLM business?</strong><br />
              Not at all. This is not a left-right membership scheme, binary, matrix chain system or pyramid plan. You have the option to either work independently or manage a team.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
              className="text-gray-600"
            >
              <strong className="text-gray-800">✍ What will be the duration of our association?</strong><br />
              There is no time limit. The association will automatically renew upon receiving your consent to continue working with us provided you adhere to the code of ethics and the terms of the LOI.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
              className="text-gray-600"
            >
              <strong className="text-gray-800">✍ When will I receive my payment?</strong><br />
              You can view your real-time earnings on the "Income dashboard". Also, you receive instant notifications. Your account will be settled till the last day of the current month and the amount will be transferred to your bank account between the 10th and 15th day of every month.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
              className="text-gray-600"
            >
              <strong className="text-gray-800">☻ Support:</strong> Just a click is required for help. You get one-to-one mentoring and hand-holding from Team Margdarshak.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <strong className="text-gray-800 block mb-2">☝ The Steps to Start:</strong>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Log on to the website, update your profile, and provide details of the services on the Advisors Panel.</li>
                <li>Next, attend a functional presentation via Google Meet to explore Digital Workplace, unified communication system and smart tools. Discuss and understand the business opportunity, work and income.</li>
                <li>Accept the Agreement Letter, and activate your subscription to start working and earning from the same day.</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Quote */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="text-center mb-12"
        >
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={headingVariants}
            className="text-xl font-semibold text-gray-800 italic"
          >
            “Don’t ignore ideas; It is ideas, not people, that rule the world!”
          </motion.h3>
        </motion.section>
      </main>

      {/* Back to Homepage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center py-4"
      >
        <Link
          to="/"
          className="text-blue-600 text-lg font-medium hover:underline transition-colors duration-300"
        >
          {" -----> "}Back to Homepage
        </Link>
      </motion.div>
    </div>
  );
};

export default BusinessProposal;