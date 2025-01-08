import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Home
import Home from './Pages/Home'
import PrivacyStatement from './Pages/FooterPages/PrivacyStatement';
import TermsofService from './Pages/FooterPages/TermsofService'
import RefundPolicy from './Pages/FooterPages/RefundPolicy'

import  Login  from './Components/Home/Login';
import  Sign   from './Components/Home/Signup'
import ForgotPassword from './Components/Home/ForgetPassword';
import  Dashboard  from './Pages/Dashboard'
import Explore from './Pages/ExplorePage';
import AdminPage from './Pages/AdminPage';


//Nav-Data-Leads
import LeadPage from './Pages/NavPages/LeadPage';
import DataPage from './Pages/NavPages/DataPage';
import PaymentPage from './Pages/NavPages/PaymentPage'
import TeamSupportPage from './Pages/NavPages/TeamSupportPage'
import SupportTicketPage from './Pages/NavPages/SupportTicketPage'

//ProfileSection
import ProfilePage from "./Pages/ProfilePages/ProfilePage";
import CredentialPage from "./Pages/ProfilePages/CredentialPage";
import EmailAuthPage from './Pages/ProfilePages/EmailPage';
import DataSharePage from './Pages/ProfilePages/DataSharePage';
import QrScanPage from "./Pages/ProfilePages/QrScanPage";

//Template Section
import Template from "./Pages/TemplatesPages/TemplateListPage";
import AddTemplatePage from './Pages/TemplatesPages/AddTemplatePage';
import AddFooterPage from './Pages/TemplatesPages/TemplateFooterPage';

//Admin Section
import AdminDataPage from './Pages/AdminPages/AdminDataPage';
import AdminUserPage from './Pages/AdminPages/AdminUserPage';

//ReportSection
import CallReport from "./Pages/ReportPages/CallReportPage";
import SmsReport from "./Pages/ReportPages/SmsReportPage";
import EmailReport from "./Pages/ReportPages/EmailReportPage";
import WhatsappReport from "./Pages/ReportPages/WhatsappReportPage"
import MeetingReport from "./Pages/ReportPages/MeetingReportPage";
import MyWorkTimelinePage from './Pages/ReportPages/WorkTimeLinePage';
import ClientTimePage from './Pages/ReportPages/ClientTimelinePage'

//OutsideSection
import MasterData from "./Pages/OutSidebarPages/MasterDataPage";
import SettingPage from './Pages/OutSidebarPages/SettingPage'
import Logout from './Pages/OutSidebarPages/LogoutPage';

 





function App() {
  
  return (
    <>
       <Router>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/privacy-statement" element={<PrivacyStatement />} />
        <Route path="/terms-of-service" element={<TermsofService />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/admin-dashboard" element={<AdminPage />} />

        {/* Nav - Data, Leads */}
        <Route path="/lead" element={<LeadPage />} />
        <Route path="/data" element={<DataPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/team-support" element={<TeamSupportPage />} />
        <Route path="/support-ticket" element={<SupportTicketPage />} />

        {/* Profile Section with drop-down menu */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/credential" element={<CredentialPage />} />
        <Route path="/email-auth" element={<EmailAuthPage />} />
        <Route path="/data-share" element={<DataSharePage />} />
        <Route path="/qr-scan" element={<QrScanPage />} />

        <Route path="/admin" element={<AdminDataPage />} />
        <Route path="/user" element={<AdminUserPage />} />

        {/* Template Section */}
        <Route path="/templates-list" element={<Template />} />
        <Route path="/add-template" element={<AddTemplatePage />} />
        <Route path="/add-footer" element={<AddFooterPage />} />

         
         {/* Report Section with drop-down menu */}
         <Route path="/email-report" element={<EmailReport />} />
         <Route path="/whatsapp-report" element={<WhatsappReport />} />
          <Route path="/call-report" element={<CallReport />} />
          <Route path="/sms-report" element={<SmsReport />} />
          <Route path="meeting-report" element={<MeetingReport/>} />
          <Route path="/my-work-report" element={<MyWorkTimelinePage/>} />
          <Route path="/client-timeline" element={<ClientTimePage/>} />
          

          {/* OutSide Section with drop-down menu */}
          <Route path="template" element={<Template />} />
          <Route path="master-data" element={<MasterData/>} />
          <Route path="settings" element={<SettingPage/>} />
          <Route path="logout" element={<Logout/>} />
          
          

      </Routes>
    </Router>  
    
    </>

  );
}

export default App;