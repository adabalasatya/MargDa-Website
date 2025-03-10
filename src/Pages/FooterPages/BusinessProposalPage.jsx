import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaStar,
  FaBullseye,
  FaTools,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

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
        ease: "easeOut",
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
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
                <img
                  src="https://margda.com/email/margda.ico"
                  alt=""
                  className="w-4 h-4 mr-2"
                />
                <strong className="text-gray-900">Margdarshak Media</strong>
              </div>
              <div className="flex items-center">
                <img
                  src="https://margda.com/email/address.png"
                  alt=""
                  className="w-4 h-4 mr-2"
                />
                <span>C-67 Dwarka Mor Metro, New Delhi</span>
              </div>
              <div className="flex items-center">
                <img
                  src="https://margda.com/email/mobile.png"
                  alt=""
                  className="w-4 h-4 mr-2"
                />
                <span>07965174000</span>
              </div>
              <div className="flex items-center">
                <img
                  src="https://margda.com/email/whatsapp.png"
                  alt=""
                  className="w-4 h-4 mr-2"
                />
                <span>+918130960040</span>
              </div>
              <div className="flex items-center">
                <img
                  src="https://margda.com/email/email.png"
                  alt=""
                  className="w-4 h-4 mr-2"
                />
                <a
                  href="mailto:team@margda.com"
                  className="text-blue-600 hover:underline"
                >
                  team@margda.com
                </a>
              </div>
              <div className="flex items-center">
                <img
                  src="https://margda.com/email/website.png"
                  alt=""
                  className="w-4 h-4 mr-2"
                />
                <a
                  href="https://www.margda.com"
                  className="text-blue-600 hover:underline"
                >
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
            <h2 className="text-black">
              👉 If you stop working, does your income also stop?
            </h2>
            <h2 className="text-black">☂ Now, it will not happen!</h2>

            <ul className="text-black">
              <li>✅ Get a lifelong, assured, fixed income of up to ₹1,08,000 per month.</li>
              <li>✅ Set up your brand and work for yourself, from anywhere at flexible times.</li>
              <li>✅ Step into the exciting and challenging world of entrepreneurship.</li>
              <li>✅ Create multiple sources of income to generate wealth.</li>
              <li>✅ No upfront investment. No daily or monthly target.</li>
            </ul>
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
            <strong className="text-4xl text-green-500 p-2">♴</strong> Margda Workplace App (MWA, pronounced as "aimwa")
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-gray-900 mb-6"
          >
            Margda Workplace is a cloud-based automation app that “elevates effort into excellence”. MWA is integrated with Verified Data, Unified Communication, and Smart Tools.
          </motion.p>

          {/* Subsections */}
          <div className="space-y-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                A. Verified Data
              </h3>
              <p className="text-gray-800 mb-4">
                MWA provides access to the most authentic, curated, and
                need-based data. The contact details are encrypted to protect
                privacy and prevent unauthorised use. Data can be filtered by
                datatype, country, state, district, pin code and task. Timeline
                mapping offers insights into the customer's engagements.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                B. Unified Communications
              </h3>
              <p className="text-gray-800 mb-4">
              MWA integrates mobile devices, allowing users to engage in hands-free, omnichannel communication through calls, emails, WhatsApp, and SMS, and to meet virtually without sharing contact details. Auto synchronisation of all interactions, client timeline contact logs, and follow-up reminders boost efficiency and conversions.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                C. Smart Tools
              </h3>
              <p className="text-gray-800 mb-4">
                MWA offers professional tools for career counselling,
                teaching/training, hiring, marketing, sales and support, etc. to
                streamline business processes and drive growth as described
                below:
              </p>

              <h2 className="text-2xl text-black-900 font-bold mb-4">
                {" "}
                Assessment and Counselling tools
              </h2>

              <p className="text-gray-900 mb-2">
                <strong className="text-black">Career Aptitude:</strong> Become
                what you want to be
                <br />
                This is the most authentic psychometric tool for students to
                discover their true interests and set S.M.A.R.T. (Specific,
                Measurable, Acceptable, Realistic, and Time-bound) career
                objectives; if a career has already been decided, its
                compatibility is assessed.
              </p>
              <p className="text-gray-900 mb-2">
                <strong className="text-black">Innate Ability:</strong>{" "}
                Recognising Talents
                <br />
                Every individual has unique talents, and identifying a child's
                intelligence and learning styles eliminates the 'trial and
                error' approach to parenting, i.e., teaching a fish to climb a
                tree.
              </p>
              <p className="text-gray-900 mb-2">
                <strong className="text-black">Work Attitude tool:</strong>{" "}
                Listen to your heart & mind
                <br />
                Work Attitude assessment allows users to pinpoint what matters
                most to them in a career. It assists in recognising occupations
                that they may find satisfying by comparing their work values
                with the characteristics of various professions.
              </p>
              <p className="text-gray-900 mb-2">
                <strong className="text-black">Career Explorer:</strong>
                <br />
                In this era of globalisation, students often lack awareness of
                the world of work and essential facts about various occupations.
                The Career Choice tool provides details on approximately 1500
                occupations, which can be filtered using thousands of parameters
                related to 1. Ability, 2. Activity, 3. Aptitude, 4. Attitude, 5.
                Industry, 6. Knowledge, 7. Outlook, 8. Pathway, 9. Preference,
                10. Sector, 11. Skills, 12. STEM, 13. Technology, 14. Tools, 15.
                Trait, 16. Zone.
              </p>
              <p className="text-gray-900 mb-2">
                <strong className="text-black">
                  Subject Career Pathways tool:
                </strong>
                <br />
                Due to the lack of career education in schools, teachers often
                do not take even a single class to explain "why they are
                teaching Geography, Chemistry, Economics etc." Margdarshak
                offers 52 Career Subject Pathways and Infographics ranging from
                Accounts to Textiles Designed to relate subjects with students'
                vocational aspirations.
              </p>
              <p className="text-3xl text-black-600 mb-2 p-2 text-center">
                “Even the best player requires a coach!”
              </p>
              <p className="text-gray-900 mb-2">
                <strong className="text-black">Marketing tools:</strong>{" "}
                Generate abundant leads with branding and not spamming. Also,
                data segmentation for targeted marketing, automated campaigns,
                lead nurturing, and tracking.
              </p>
              <p className="text-gray-900 mb-2">
                <strong className="text-black">Sales tools:</strong> Integrate
                the sales process of any product/service and increase 5X
                revenues.
              </p>
              <p className="text-gray-900 mb-2">
                <strong className="text-black">Support tools:</strong> Provide
                real-time customer support, including ticketing, chat, and phone
                interactions to enhance customer satisfaction.
              </p>
              <p className="text-gray-900 mb-2">
                <strong className="text-black">Hiring tools:</strong> Recruit
                the best people ready to work full/part-time.
              </p>
              <p className="text-gray-900">
                <strong className="text-black">Training tool:</strong> Teach for
                academic/competitive exams or skills development.
              </p>
            </motion.div>
          </div>
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
            <FaStar className="mr-2 text-yellow-500" /> Smart Work, Lifelong
            Income
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-gray-900 mb-6"
          >
            Without interrupting your current activities, you can work for yourself from anywhere at flexible times for stable, multiple sources of income. As a Business Associate, you must build your brand, mentor a team of a maximum of nine Advisors, and work cohesively to complete the assignments described below:
          </motion.p>

          {/* Projects List */}
          <ol className="list-[upper-alpha] pl-6 text-black-600 space-y-4">
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <h2 className="text-black font-bold mb-2">
                Data Monetisation project:
              </h2>
              <p className="text-gray-900 mb-2 ">
              Data monetisation refers to the process of converting static data to an economic asset that generates revenue like a goldmine. Companies like Google, Facebook, and Amazon are earning billions through data. To understand the potential of earning through data look at the market cap of these job portals 1. LinkedIn ₹2,90,500 crore, 2. Naukri.com ₹1,10,000 crore, 3. CareerBuilder ₹66,400 crore, 4. Glassdoor ₹58,100 crore, and 5. Indeed ₹58,100 crore.
              </p>
              <p className="text-gray-900 mb-2">
              Your Advisors can log in to the Margda Workplace App (MWA) and each of them can verify and update 12,000 data. The Advisors will get @₹10 per data total ₹1,12,000 for verification and a passive income of ₹24,000 per month till life.
              </p>
              <p className="text-gray-900 mb-2 ">
              Your income will be @₹5 x 9 x 12,000, total ₹5,40,000 to cross-check verified data and your lifetime passive income will be @₹1 x 9 x 12000, total ₹1,08,000 per month.
              </p>
              <p className="text-gray-900 mb-2">A Data Share Certificate (DSC) will be issued to you and your Advisors.</p>
            </motion.li>

            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <h2 className="text-black font-bold mb-2">
                Career counselling project
              </h2>
              <p className="text-gray-900 mb-2">
              Each of the Advisors can collaborate with 25 institutes and guide an average of two students daily @₹1,000 total ₹50,000 per month; consequently, you’ll receive a monthly income of @₹300 x 9 x 50 = ₹1,35,000 for supporting your team.
              </p>
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <h2 className="text-black font-bold mb-2">
                Business consulting project
              </h2>
              <p className="text-gray-900 mb-2 ">
              Your team of Advisors must connect with businesses and offer MWA subscriptions to meet their requirements of clients' leads, integrated communication systems and smart tools to automate the process and enhance efficiency, productivity and profits.
              </p>
              <p className="text-gray-900 mb-2">
              There is NO daily or monthly target. The Advisors are required to maintain fifty MWA subscriptions throughout the association. Each of the Advisors will get a monthly income of ₹44,000 and you’ll earn ₹1,98,000 per month.
              </p>
              {/* <p className="text-gray-900 mb-2 ">
                You can also offer need-based service, solution or tele-guidance
                that aligns with your interests and expertise to these
                businesses. Decide your per-minute fee. People will call you for
                assistance. You will receive payment based on the talk time,
                which is instantly credited to your account and you get a
                notification. 100% of the consultancy income is yours. Some of
                the examples of services/solutions you can provide are listed
                below:
              </p>
              <ul className="list-disc pl-6 mb-2 text-gray-900">
                <li>Study/Scholarships Abroad Consulting</li>
                <li>Coaching/Training/Tutoring or Homework Help</li>
                <li>Placement/Recruitment Process Outsource Agency</li>
                <li>Employability and Life-skills Development</li>
                <li>Financial and Insurance Advisory</li>
                <li>Counselling for Mental and Life Problems</li>
                <li>Marketing/Sales Process of any product/service</li>
                <li>Digital/Social Media and Reputation Management</li>
                <li>Business Consulting based on your expertise, etc.</li>
              </ul> */}
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <h2 className="text-black font-bold mb-2">
              Tele-guidance
              </h2>
              <p className="text-gray-900 mb-2">
              You can earn instant income by guiding someone telephonically. People will call you for assistance paying the per-minute fee decided by you. Tele-guidance providers will share 50% of the talk-time income, which is instantly credited to your account and you get 10% of the total revenue.
              </p>
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <h2 className="text-black font-bold mb-2">
              Need-based service
              </h2>
              <p className="text-gray-900 mb-2">
              Businesses and people require numerous services. You can offer any service based on your skills and expertise. 100% of the consultancy income is yours. Some of the examples of services/solutions you can provide are listed below:
              </p>
              <ul className="list-disc pl-6 mb-2 text-gray-900">
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
            <FaBullseye className="mr-2 text-red-500" /> Pre-requisites to Start
            This Business
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-gray-900"
          >
            You need an internet-connected computer or smartphone with an MWA
            subscription. You should possess team management abilities and
            expertise to provide counselling or consulting.
          </motion.p>
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
          <ol className="pl-6 text-gray-900 space-y-4 list-decimal">
  <motion.li
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={listItemVariants}
  >
    <strong className="text-gray-800">
      A business set-up you can be proud of:
    </strong>{" "}
    We provide you with a robust cloud-based Workplace with an integrated communication system and smart tools. While working in a virtual office, there is no stress, pollution, traffic jams, or the hassle of commuting daily and paying the travel fare.
  </motion.li>
  <motion.li
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={listItemVariants}
  >
    <strong className="text-gray-800">
      No office or staff required:
    </strong>{" "}
    You don't have to spend on a physical office infrastructure, staff's salary, and other costs. You share the income without liability, overhead expenses, or financial loss.
  </motion.li>
  <motion.li
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={listItemVariants}
  >
    <strong className="text-gray-800">
      Clients’ leads:
    </strong>{" "}
    A significant challenge for any business is getting need-based curated data. Entrepreneurs invest most of their time, money, and effort to generate leads and fewer resources are left to do the business. We help you avoid these pitfalls and empower you by sharing data and tools to generate abundant leads.
  </motion.li>
  <motion.li
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={listItemVariants}
  >
    <strong className="text-gray-800">
      Multiple sources of income:
    </strong>{" "}
    The main reason for inadequate and irregular income is the dependency on a single source of earnings through self-effort. When you work in a team, your business is set on auto-pilot mode, creating multiple channels of income, even if you temporarily stop working due to some unavoidable circumstances, family commitments, vacations, or engagement in other activities.
  </motion.li>
  <motion.li
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={listItemVariants}
  >
    <strong className="text-gray-800">
      Ownership of the business:
    </strong>{" "}
    You work under the banner of Margdarshak, and we take care of the venture so that the entrepreneurship within you can spread its wings. You can give a distinct name to your business. You are the legal owner of your enterprise. Also, you own the Data Share Certificate (DSC) and you can transfer it to your family members or sell it to someone for a profit.
  </motion.li>
  <motion.li
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={listItemVariants}
  >
    <strong className="text-gray-800">
      Most satisfying vocation:
    </strong>{" "}
    You act as a catalyst and transfer your knowledge to guide and shape the destiny of young people. The success of one person inspires others in the family and society. Additionally, you can use your experience to offer consultancy to businesses.
  </motion.li>
  <motion.li
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={listItemVariants}
  >
    <strong className="text-gray-800">
      Freedom to work from anywhere anytime:
    </strong>{" "}
    You can balance your current activities and personal life with ease to attain financial stability on your terms. Also, you have the flexibility to schedule your work at your convenience.
  </motion.li>
  <motion.li
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={listItemVariants}
  >
    <strong className="text-gray-800">
      Global reach, unlimited market:
    </strong>{" "}
    A physical centre depends on the local population and can be reached by nearby customers, using Margdarshak's cloud-based platform, you have unlimited and unrestricted exposure to clients worldwide and offer them any service/consultancy.
  </motion.li>
  <motion.li
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={listItemVariants}
  >
    <strong className="text-gray-800">
      A dignified partnership:
    </strong>{" "}
    We consider you an important stakeholder. Our work culture fosters an environment where we can grow and gain insights into clients, competitors, business conditions, and ever-changing technologies. We strongly believe in the power of 1+1 = 11 and respect the values of our Business Associates.
  </motion.li>
  <motion.li
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={listItemVariants}
  >
    <strong className="text-gray-800">
      Transparency in business:
    </strong>{" "}
    Your earnings are updated instantly in the Income dashboard, and you receive real-time notifications. You can monitor your income and stay informed through the App.
  </motion.li>
</ol>
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
            <FaQuestionCircle className="mr-2 text-purple-500" /> Most frequently asked question.
          </motion.h2>

          <motion.p
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={listItemVariants}
  className="text-gray-600"
>
  <h2 className="text-black mb-2 font-bold">
    ✍ Do I have to invest?
  </h2>
  <p className="text-gray-900 mb-2">
    You don’t have to pay any upfront amount, earnest money, registration fee, refundable/ non-refundable security deposits, etc.
  </p>
  <p className="text-gray-900 mb-4">
    Moreover, it is your part-time venture and investing in time and other expenses depends on what’s important for you, your work preference, and your need to earn money.
  </p>
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-300 rounded-lg shadow-md">
      <thead>
        <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <th className="border border-gray-300 p-4 text-left font-semibold rounded-tl-lg">Your preference</th>
          <th className="border border-gray-300 p-4 text-left font-semibold">Free of cost – hard work</th>
          <th className="border border-gray-300 p-4 text-left font-semibold rounded-tr-lg">Nominal cost – smart work</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-100 transition duration-200">
          <td className="border border-gray-300 p-4 font-medium">Work from office</td>
          <td className="border border-gray-300 p-4">Commute on foot from home to the office and back, spending precious time to save meagre money.</td>
          <td className="border border-gray-300 p-4">Commute to the office using any conveyance, and pay on fare to save your precious time.</td>
        </tr>
        <tr className="hover:bg-gray-100 transition duration-200">
          <td className="border border-gray-300 p-4 font-medium">Work from home</td>
          <td className="border border-gray-300 p-4">Get the free Margda Workplace App (MWA). The manual method requires more labour and time. Result – minimal savings and <strong className="text-black font-blod">losing big income</strong>.</td>
          <td className="border border-gray-300 p-4">Subscribe to professional MWA. The automated process requires less effort and multiplies efficiency. Result – less than daily travel cost to the office and <strong className="text-black font-bold">getting big income</strong>.</td>
        </tr>
        <tr>
          <td colSpan="3" className="border border-gray-300 p-4 text-center bg-gray-50 italic text-gray-700 rounded-b-lg">
            If you are still doubtful or already earning a six-figure monthly income without spending a single rupee, please accept our sincere apology for discussing this opportunity.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</motion.p>

          <div className="space-y-4 p-4">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
              className="text-gray-600"
            >
              <h2 className="text-black mb-2 font-bold">
                ✍ Is it a job offer or a business opportunity?
              </h2>
              <p className="text-gray-900 mb-2">
              It is not a full-time job offer but a part-time EdTech entrepreneurship opportunity. You will work for yourself as a business associate to manage a team of Advisors and complete projects related to data monetisation, career counselling or business consultation and create multiple sources of lifelong, monthly income.
              </p>
            </motion.p>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
              className="text-gray-900"
            >
              <strong className="text-gray-800">
                ✍ Who can avail of this opportunity?
              </strong>
              <br />
              Anyone, who has a desire to work and earn money, for example:
              <br />➢ <strong>Students:</strong> can cultivate a habit of
              earning and learning while shaping their careers.
              <br />➢ <strong>Jobseekers:</strong> can get real experience and
              earn money while searching desired jobs.
              <br />➢ <strong>Working persons:</strong> can have an additional
              source of income to meet the increasing cost of living.
              <br />➢ <strong>Homemakers:</strong> can use their education to be
              self-reliant while fulfilling family responsibilities.
              <br />➢ <strong>Retired and active:</strong> can guide the young
              generation to earn an attractive income.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
              className="text-gray-900"
            >
              <strong className="text-gray-800">
                ✍ How can I have a lifelong regular income?
              </strong>
              <br />
              Subscribers pay for the Verified Data as a Service (VDaaS), and you earn a fixed share of the revenue generated through data monetisation. Additionally, you continue to receive income from your team's efforts and business from your PIN code area, even if you temporarily stop working due to unavoidable circumstances, family commitments, vacations, or other engagements.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
              className="text-gray-900"
            >
              <strong className="text-gray-800">
                ✍ Is it a Network or MLM business?
              </strong>
              <br />
              Not at all. This is not a left-right membership scheme, binary,
              matrix chain system or pyramid plan. You have the option to either
              work independently or manage a team.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
              className="text-gray-900"
            >
              <strong className="text-gray-800">
                ✍ What will be the duration of our association?
              </strong>
              <br />
              There is no time limit. The association will automatically renew
              upon receiving your consent to continue working with us provided
              you adhere to the code of ethics and the terms of the LOI.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
              className="text-gray-900"
            >
              <strong className="text-gray-800">
                ✍ When will I receive my payment?
              </strong>
              <br />
              You can view your real-time earnings on the "Income dashboard".
              Also, you receive instant notifications. Your account will be
              settled till the last day of the current month and the amount will
              be transferred to your bank account between the 10th and 15th day
              of every month.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
              className="text-gray-000"
            >
              <strong className="text-gray-800">☻ Support:</strong> Just a click
              is required for help. You get one-to-one mentoring and
              hand-holding from Team Margdarshak.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listItemVariants}
            >
              <strong className="text-gray-800 block mb-2">
                ☝ The Steps to Start:
              </strong>
              <ul className="list-disc pl-6 text-gray-900">
                <li className="mb-2">
                  Log on to the website, update your profile, and provide
                  details of the services on the Advisors Panel.
                </li>
                <li className="mb-2">
                  Next, attend a functional presentation via Google Meet to
                  explore the Digital Workplace, unified communication system,
                  and smart tools. Discuss and understand the business
                  opportunity, work, and income.
                </li>
                <li className="mb-2">
                Accept the Agreement Letter, and activate your MWA to start your process training, working and earnings.
                </li>
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
        transition={{ duration: 0.5, ease: "easeOut" }}
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
