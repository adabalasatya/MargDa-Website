import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Home
import Home from './Pages/Home'
import  Login  from './Components/Home/Login';
import  Sign   from './Components/Home/Signup'
import  Dashboard  from './Pages/Dashboard'

//Nav-Data-Leads
import LeadPage from './Pages/NavPages/LeadPage';
import DataPage from './Pages/NavPages/DataPage';
import TeamSupportPage from './Pages/NavPages/TeamSupportPage'
import SupportTicketPage from './Pages/NavPages/SupportTicketPage'

//ProfileSection
import ProfilePage from "./Pages/ProfilePages/ProfilePage";
import CredentialPage from "./Pages/ProfilePages/CredentialPage";
import EmailAuthPage from './Pages/ProfilePages/EmailPage';
import DataSharePage from './Pages/ProfilePages/DataSharePage';
import QrScanPage from "./Pages/ProfilePages/QrScanPage";

{/* AdminSection
import UserLinkPage from './Pages/AdminPages/UserLinkPage';
import VariablePage from './Pages/AdminPages/VariablePage';
import TeamPage from './Pages/AdminPages/TeamPage'
import TemplateApprovalPage from './Pages/AdminPages/TemplateApprovalPage'
import UserKycPage from './Pages/AdminPages/UserKycPage'
import WhatsappScanPage from './Pages/AdminPages/WhatsappScanPage'
*/}

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
import Template from "./Pages/OutSidebarPages/TemplatePage";
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Nav - Data, Leads */}
        <Route path="/lead" element={<LeadPage />} />
        <Route path="/data" element={<DataPage />} />
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

        {/* Admin Section with drop-down menu 
        <Route path="/user-link" element={<UserLinkPage />} />
        <Route path="/variable" element={<VariablePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/template-approval" element={<TemplateApprovalPage />} />
        <Route path="/user-kyc" element={<UserKycPage />} />
        <Route path="/whatsapp-scan" element={<WhatsappScanPage />} /> */}
         
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