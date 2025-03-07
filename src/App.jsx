import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Home
import Home from "./Pages/Home";
import OurApp from "./Pages/HomePages/OurAppPage";

import Aboutus from "./Pages/FooterPages/AboutUs";
import DigitalWorkplacePricingPage from "./Pages/FooterPages/DigitalWorkplacePricingPage";
import BusinessProposalPage from "./Pages/FooterPages/BusinessProposalPage"
import Feedback from "./Pages/FooterPages/Feedback";
import PrivacyStatement from "./Pages/FooterPages/PrivacyStatement";
import TermsofService from "./Pages/FooterPages/TermsofService";
import RefundPolicy from "./Pages/FooterPages/RefundPolicy";
import SubscriptionPage from "./Pages/FooterPages/SubscriptionPage"
import PayOnlinePage from "./Pages/FooterPages/PayOnlinePage"

import Login from "./Components/Home/Login";
import Sign from "./Components/Home/Signup";
import ForgotPassword from "./Components/Home/ForgetPassword";
import Dashboard from "./Pages/Dashboard";
import AdminPage from "./Pages/AdminPage";

//Nav-Data-Leads
import LeadPage from "./Pages/NavPages/LeadPage";
import DataPage from "./Pages/NavPages/DataPage";
import AllUsersPage from "./Pages/NavPages/AllUsersPage";
import PaymentPage from "./Pages/NavPages/PaymentPage";
import TeamSupportPage from "./Pages/NavPages/TeamSupportPage";
import SupportTicketPage from "./Pages/NavPages/SupportTicketPage";
// import CareerCounsellingPage from "./Pages/CareerCounsellingPage/CareerCounsellingPage";
import UserDashboardPage from "./Pages/CareerCounsellingPage/UserDashboardPage";

//ShopingMart
import ProductDetails from "./Pages/ShopingMartPages/ProductDetailsPage";

//ProfileSection
import ProfilePage from "./Pages/ProfilePages/ProfilePage";
import BeforeProfilePage from "./Pages/ProfilePages/BeforeProfilePage";
import CredentialPage from "./Pages/ProfilePages/CredentialPage";
import DscPage from "./Pages/ProfilePages/DscPage";
import EmailAuthPage from "./Pages/ProfilePages/EmailPage";
import DataSharePage from "./Pages/ProfilePages/DataSharePage";
import QrScanPage from "./Pages/ProfilePages/QrScanPage";

//Template Section
import Template from "./Pages/TemplatesPages/TemplateListPage";
import AddTemplatePage from "./Pages/TemplatesPages/AddTemplatePage";
import AddFooterPage from "./Pages/TemplatesPages/TemplateFooterPage";
import EditTemplatePage from "./Pages/TemplatesPages/EditTemplatePage";

//Master-Data
import MasterDataPage from "./Pages/MasterDataPages/MasterDataPage";

//Admin Section
import AdminDataPage from "./Pages/AdminPages/AdminDataPage";
import AdminLeadsPage from "./Pages/AdminPages/AdminLeadsPage";

//ReportSection
import CallReport from "./Pages/ReportPages/CallReportPage";
import SmsReport from "./Pages/ReportPages/SmsReportPage";
import EmailReport from "./Pages/ReportPages/EmailReportPage";
import WhatsappReport from "./Pages/ReportPages/WhatsappReportPage";
import MeetingReport from "./Pages/ReportPages/MeetingReportPage";
import MyWorkTimelinePage from "./Pages/ReportPages/WorkTimeLinePage";
import ClientTimePage from "./Pages/ReportPages/ClientTimelinePage";

//AdvisorsPanel
import AdvisorsPage from "./Pages/AdvisorsPanelPages/AdvisorsPage";
import AllAdvisorsPage from "./Pages/AdvisorsPanelPages/AllAdvisorsPage";
import AdvisorsTeamPage from "./Pages/AdvisorsPanelPages/AdvisorsTeamPage";
import TeleconsultantPage from "./Pages/AdvisorsPanelPages/TeleconsultantPage";
import CounsellorsApPage from "./Pages/AdvisorsPanelPages/CounsellorsApPage";
import RechargePage from "./Pages/AdvisorsPanelPages/RechargePage";
import OnlinePaymentPage from "./Pages/AdvisorsPanelPages/OnlinePaymentPage";
import ServiceRequestPage from "./Pages/AdvisorsPanelPages/ServiceRequestPage";
import PaymentStatus from "./Pages/PhonePayPaymentStatus";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Career Assessment
import AptitudeAssesment from "./Pages/CareerAssesmentPages/AptitudeAssesmentPage";
import AptitudeTest from "./Pages/CareerAssesmentPages/AptitudeTestPage";
import AttitudePage from "./Pages/CareerAssesmentPages/AttitudePage";

//Career Awareness
import CareerChoicePage from "./Pages/CareerAwarenessPages/CareerChoicePage";
import SubjectCareerPathwayPage from "./Pages/CareerAwarenessPages/SubjectCareerPathwayPage";
import PdfViewerPage from "./Pages/CareerAwarenessPages/PdfViewerPage";
import CareerDataPage from "./Pages/CareerAwarenessPages/CareerDataPage";

//CPP Training
import TraineeDashboardPage from "./Pages/CPPTrainingPages/TraineeDashboardPage";
import TrainerDashboardPage from "./Pages/CPPTrainingPages/TrainerDashboardPage";
import CompleteActivityPage from "./Pages/CPPTrainingPages/CompleteActivityPage";
import GiveTestPage from "./Pages/CPPTrainingPages/GiveBeginPages/GiveTestPage";
import BeginTestPage from "./Pages/CPPTrainingPages/GiveBeginPages/BeginTestPage";
import ResultPage from "./Pages/CPPTrainingPages/GiveBeginPages/ResultPage";

//Institute Management
import InstituteHigherPage from "./Pages/InstituteManagementPages/InstituteHigherPage";
import InstituteEntrancePage from "./Pages/InstituteManagementPages/InstituteEntrancePage";
import AddInstituteFormPage from "./Pages/InstituteManagementPages/AddInstituteFormPage";
import SearchInstitutesFromGooglePage from "./Pages/InstituteManagementPages/SearchInstitutesFromGooglePage";

//InstituteManagement Action Forms
import CourseFormPage from "./Pages/InstituteManagementPages/ActionFormPages/CourseFormPage";
import EditFormPage from "./Pages/InstituteManagementPages/ActionFormPages/EditFormPage";
import SubjectFormPage from "./Pages/InstituteManagementPages/ActionFormPages/SubjectFormPage";
import SurveyFormPage from "./Pages/InstituteManagementPages/ActionFormPages/SurveyFormPage";
import InstituteStaffsPage from "./Pages/InstituteManagementPages/ActionFormPages/InstituteStaffsPage";
import InstCapFormPage from "./Pages/InstituteManagementPages/ActionFormPages/InstCapFormPage";
import InstCapContestFormPage from "./Pages/InstituteManagementPages/ActionFormPages/InstCapContestFormPage";
import InstCapMcqFormPage from "./Pages/InstituteManagementPages/ActionFormPages/InstCapMcqFormPage";

//Work-Seeker
import UserWorkPage from "./Pages/WorkSeekerPages/UserWorkPage";
import UserEducationPage from "./Pages/WorkSeekerPages/UserEducationPage";
import UserExperiencePage from "./Pages/WorkSeekerPages/UserExperiencePage";
import UserSkillsPage from "./Pages/WorkSeekerPages/UserSkillsPage";
import UserReferencePage from "./Pages/WorkSeekerPages/UserReferencePage";

//Study
import StudyCoursePage from "./Pages/StudyPages/StudyCoursePage";
import StudyLessonPage from "./Pages/StudyPages/StudyLessonPage";
import StudyMcqPage from "./Pages/StudyPages/StudyMcqPage";
import McqResultsPage from "./Pages/StudyPages/McqResultsPage";
import StudyContentPage from "./Pages/StudyPages/StudyContentPage";
import StudyVideoPage from "./Pages/StudyPages/StudyVideoPage";
import StudyActivityPage from "./Pages/StudyPages/StudyActivityPage";
import StudyPracticalPage from "./Pages/StudyPages/StudyPracticalPage";
import TeacherDashboardPage from "./Pages/StudyPages/TeacherDashboardPage";
import TeacherSchedulePage from "./Pages/StudyPages/TeacherSchedulePage";
import StudyOraniserPage from "./Pages/StudyPages/StudyOraniserPage";
import StudyWriterPage from "./Pages/StudyPages/StudyWriterPage";
import ProgressMeterPage from "./Pages/StudyPages/ProgressMeterPage";
import StudyAcaPage from "./Pages/StudyPages/StudyAcaPage";

//StudyOraniserInisdeForm
import ViewCalendarPage from "./Pages/StudyPages/StudyOraniserPages/ViewCalendarPage";
import ProgressReportPage from "./Pages/StudyPages/StudyOraniserPages/ProgressReportPage";
import InteractiveClassPage from "./Pages/StudyPages/StudyOraniserPages/InteractiveClassPage";

//Business
import DataEntryFormPage from "./Pages/BusinessPages/DataEntryFormPage";

//SkillMcq
import SkillMcqPage from "./Pages/SkillPages/SkillMcqPage";
import SkillTestPage from "./Pages/SkillPages/SkillTestPage";

import CareerMapPage from "./Pages/CareerCounsellingPage/CareerMapPage";
import AttitudeAssesmentPage from "./Pages/CareerAssesmentPages/AttitudeTestPage";
import CareerAssesmentPaymentPage from "./Pages/CareerAssesmentPages/CareerAssesmentPaymentPage";

//Mart
import MartHomePage from "./Pages/NavPages/MartPages/MartHomePage";
import AddProductPage from "./Pages/NavPages/MartPages/AddProductPage";
import CouponFormPage from "./Pages/NavPages/MartPages/CouponFormPage";
import ShopPage from "./Pages/NavPages/MartPages/ShopPages/ShopPage";
import CartPage from "./Pages/NavPages/MartPages/ShopPages/CartPage";
import PaymentOrderPage from "./Pages/NavPages/MartPages/ShopPages/PaymentOrderPage";

//CommunicationTest
import CommunicationTestPage from "./Pages/CommunicationTestPage/CommunicationTestPage";

//HrInterview
import HRGiveTestPage from "./Pages/HRInterviewPages/HRGiveTestPage";

//SelectionProcess
import HRInteractionPage from "./Pages/SelectionProcessPages/HRInteractionPage";

//Order
import OrderManagePage from "./Pages/OrdersPages/OrderManagePage";

//Products
import ManageProductsPage from "./Pages/ProductsPages/ManageProductsPage";
import CloudTelephonyPage from "./Pages/OutSidebarPages/CloudTelephonyPage";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
          <Route path="/our-app" element={<OurApp />} />

          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/digital-workplace" element={<DigitalWorkplacePricingPage />}/>
          <Route path="/business-proposal" element={<BusinessProposalPage />}/>
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/privacy-statement" element={<PrivacyStatement />} />
          <Route path="/terms-of-service" element={<TermsofService />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/pay-online" element={<PayOnlinePage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Sign />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminPage />} />

          {/* Nav - Data, Leads */}
          <Route path="/lead" element={<LeadPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/allusers" element={<AllUsersPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/team-support" element={<TeamSupportPage />} />
          <Route path="/support-ticket" element={<SupportTicketPage />} />
          {/* <Route
            path="/career-counselling"
            element={<CareerCounsellingPage />}
          /> */}
          <Route path="/user-dashboard" element={<UserDashboardPage />} />
          <Route path="/career-map" element={<CareerMapPage />} />

          {/* Shopping Mart */}
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/mart" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/payment-order" element={<PaymentOrderPage />} />

          {/* Seller Mart*/}
          <Route path="/mart-home" element={<MartHomePage />} />
          <Route path="/seller-add-product" element={<AddProductPage />} />
          <Route path="/seller-coupon" element={<CouponFormPage />} />

          {/* Profile Section with drop-down menu */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/before-profile" element={<BeforeProfilePage />} />
          <Route path="/credential" element={<CredentialPage />} />
          <Route path="/dsc" element={<DscPage />} />
          <Route path="/email-auth" element={<EmailAuthPage />} />
          <Route path="/data-share" element={<DataSharePage />} />
          <Route path="/qr-scan" element={<QrScanPage />} />

          <Route path="/admin-data" element={<AdminDataPage />} />
          <Route path="/admin-leads" element={<AdminLeadsPage />} />

          {/* AdvisorsPanel Section with drop-down menu */}
          <Route path="/advisor" element={<AdvisorsPage />} />
          <Route path="/all-advisors" element={<AllAdvisorsPage />} />
          <Route path="/advisors-team" element={<AdvisorsTeamPage />} />
          <Route path="/teleconsultant" element={<TeleconsultantPage />} />
          <Route path="/consultants-panel" element={<CounsellorsApPage />} />
          <Route path="/recharge-talktime" element={<RechargePage />} />
          <Route path="/online-payment" element={<OnlinePaymentPage />} />
          <Route path="/service-request" element={<ServiceRequestPage />} />

          {/* Template Section */}
          <Route path="/templates-list" element={<Template />} />
          <Route path="/add-template" element={<AddTemplatePage />} />
          <Route path="/add-footer" element={<AddFooterPage />} />
          <Route path="/edit-template" element={<EditTemplatePage />} />

          {/* Master-Data Section with drop-down menu */}
          <Route path="master-data" element={<MasterDataPage />} />
          <Route path="cloud-telephony" element={<CloudTelephonyPage />} />

          {/* Business */}
          <Route path="/business-data-entry" element={<DataEntryFormPage />} />

          {/* Report Section with drop-down menu */}
          <Route path="/email-report" element={<EmailReport />} />
          <Route path="/whatsapp-report" element={<WhatsappReport />} />
          <Route path="/call-report" element={<CallReport />} />
          <Route path="/sms-report" element={<SmsReport />} />
          <Route path="meeting-report" element={<MeetingReport />} />
          <Route path="/my-work-report" element={<MyWorkTimelinePage />} />
          <Route path="/client-timeline" element={<ClientTimePage />} />

          {/* Institute Management */}
          <Route path="/institute-higher" element={<InstituteHigherPage />} />
          <Route
            path="/institute-entrance"
            element={<InstituteEntrancePage />}
          />
          <Route path="/add-institute" element={<AddInstituteFormPage />} />
          <Route
            path="/search-institutes"
            element={<SearchInstitutesFromGooglePage />}
          />
          {/* Institute Management Action Form */}
          <Route path="/course-form" element={<CourseFormPage />} />
          <Route path="/edit-form" element={<EditFormPage />} />
          <Route path="/subject-form" element={<SubjectFormPage />} />
          <Route path="/survey-form" element={<SurveyFormPage />} />
          <Route path="/institute-staffs" element={<InstituteStaffsPage />} />
          <Route path="/institute-cap" element={<InstCapFormPage />} />
          <Route path="/cap-contest" element={<InstCapContestFormPage />} />
          <Route path="/cap-mcq" element={<InstCapMcqFormPage />} />

          {/* Career Assesment */}
          <Route path="/aptitude-assesment" element={<AptitudeAssesment />} />
          <Route path="/aptitude-test" element={<AptitudeTest />} />
          <Route
            path="/attitude-assesment"
            element={<AttitudeAssesmentPage />}
          />
          <Route path="/attitude-test" element={<AttitudePage />} />
          <Route
            path="/assesment-payment"
            element={<CareerAssesmentPaymentPage />}
          />

          {/* Career Awareness */}
          <Route path="/career-choice" element={<CareerChoicePage />} />
          <Route
            path="/subject-career-pathway"
            element={<SubjectCareerPathwayPage />}
          />
          <Route path="/pdf-viewer/:pdfFile" element={<PdfViewerPage />} />

          {/* CPP Training */}
          <Route path="/trainee-dashboard" element={<TraineeDashboardPage />} />
          <Route path="/trainer-dashboard" element={<TrainerDashboardPage />} />
          <Route path="/complete-activity" element={<CompleteActivityPage />} />
          <Route path="/give-test" element={<GiveTestPage />} />
          <Route path="/begin-test" element={<BeginTestPage />} />
          <Route path="/result" element={<ResultPage />} />

          {/* Career Sections */}
          <Route path="/career-data" element={<CareerDataPage />} />

          {/* Work Seeker */}
          <Route path="/user-work" element={<UserWorkPage />} />
          <Route path="/user-experience" element={<UserExperiencePage />} />
          <Route path="/user-education" element={<UserEducationPage />} />
          <Route path="/user-skills" element={<UserSkillsPage />} />
          <Route path="/user-reference" element={<UserReferencePage />} />

          {/* Study */}
          <Route path="/study-course" element={<StudyCoursePage />} />
          <Route path="/study-lesson" element={<StudyLessonPage />} />
          <Route path="/study-mcq" element={<StudyMcqPage />} />
          <Route path="/mcq-results" element={<McqResultsPage />} />
          <Route path="/study-content" element={<StudyContentPage />} />
          <Route path="/study-video" element={<StudyVideoPage />} />
          <Route path="/study-activity" element={<StudyActivityPage />} />
          <Route path="/study-practical" element={<StudyPracticalPage />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboardPage />} />
          <Route path="/teacher-schedule" element={<TeacherSchedulePage />} />
          <Route path="/study-organiser" element={<StudyOraniserPage />} />
          <Route path="/study-writer" element={<StudyWriterPage />} />
          <Route path="/progress-meter" element={<ProgressMeterPage />} />
          <Route path="/study-aca" element={<StudyAcaPage />} />

          {/* StudyOraniserInisdeForm */}
          <Route path="/view-calender" element={<ViewCalendarPage />} />
          <Route path="/progress-report" element={<ProgressReportPage />} />
          <Route path="/interactive-class" element={<InteractiveClassPage />} />

          {/* SkillMcq */}
          <Route path="/skill-mcq" element={<SkillMcqPage />} />
          <Route path="/skill-test" element={<SkillTestPage />} />

          {/* CommunicationTest */}
          <Route
            path="/communication-test"
            element={<CommunicationTestPage />}
          />

          {/* Phone Pe Payment Status */}
          <Route path="phonepay/payment-status" element={<PaymentStatus />} />

          {/* HR Interview */}
          <Route path="/hr-give-test" element={<HRGiveTestPage />} />

          {/* Selection Process */}
          <Route path="/hr-interaction" element={<HRInteractionPage />} />

          {/* Orders */}
          <Route path="/manage-order" element={<OrderManagePage />} />

          {/* Product */}
          <Route path="/manage-product" element={<ManageProductsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
