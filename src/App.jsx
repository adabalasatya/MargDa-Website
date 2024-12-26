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

//ProfileSection
import ProfilePage from "./Pages/ProfilePages/ProfilePage";
import CredentialPage from "./Pages/ProfilePages/CredentialPage";
import EmailAuthPage from './Pages/ProfilePages/EmailPage';
import DataSharePage from './Pages/ProfilePages/DataSharePage';
import QrScanPage from "./Pages/ProfilePages/QrScanPage";

//AdminSection
import UserLinkPage from './Pages/AdminPages/UserLinkPage';
import VariablePage from './Pages/AdminPages/VariablePage';
import TeamPage from './Pages/AdminPages/TeamPage'

//ReportSection
import CallReport from "./Pages/ReportPages/CallReportPage";
import SmsReport from "./Pages/ReportPages/SmsReportPage";
import EmailReport from "./Pages/ReportPages/EmailReportPage";
import WhatsappReport from "./Pages/ReportPages/WhatsappReportPage"

//OutsideSection
import Template from "./Pages/ReportPages/TemplatePage";
import Meeting from "./Pages/ReportPages/MeetingPage";
import Report from "./Pages/ReportPages/ReportPage";
import MasterData from "./Pages/ReportPages/MasterDataPage";
import SettingPage from './Pages/SettingPage'
import Logout from './Pages/LogoutPage';

 





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

        {/* Profile Section with drop-down menu */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/credential" element={<CredentialPage />} />
        <Route path="/email-auth" element={<EmailAuthPage />} />
        <Route path="/data-share" element={<DataSharePage />} />
        <Route path="/qr-scan" element={<QrScanPage />} />

        {/* Admin Section with drop-down menu */}
        <Route path="/user-link" element={<UserLinkPage />} />
        <Route path="/variable" element={<VariablePage />} />
        <Route path="/team" element={<TeamPage />} />
         
         {/* Report Section with drop-down menu */}
          <Route path="/call" element={<CallReport />} />
          <Route path="/sms" element={<SmsReport />} />
          <Route path="/email" element={<EmailReport />} />
          <Route path="/whatsapp" element={<WhatsappReport />} />

          {/* OutSide Section with drop-down menu */}
          <Route path="template" element={<Template />} />
          <Route path="meeting" element={<Meeting/>} />
          <Route path="report" element={<Report/>} />
          <Route path="master-data" element={<MasterData/>} />
          <Route path="settings" element={<SettingPage/>} />
          <Route path="logout" element={<Logout/>} />
          
         

      </Routes>
    </Router>  
    
    </>

  );
}

export default App;