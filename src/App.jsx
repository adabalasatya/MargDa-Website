import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home'
import  Login  from './Components/Home/Login';
import  Sign   from './Components/Home/Signup'
import  Dashboard  from './Pages/Dashboard'

import ProfilePage from "./Pages/ProfilePages/ProfilePage";
import CredentialPage from "./Pages/ProfilePages/CredentialPage";
import EmailAuthPage from './Pages/ProfilePages/EmailPage';
import DataSharePage from './Pages/ProfilePages/DataSharePage';
import QrScanPage from "./Pages/ProfilePages/QrScanPage";


import CallReport from "./Pages/ReportPages/CallReportPage";
import SmsReport from "./Pages/ReportPages/SmsReportPage"
import EmailReport from "./Pages/ReportPages/EmailReportPage"
import WhatsappReport from "./Pages/ReportPages/WhatsappReportPage"



import Template from "./Pages/ReportPages/TemplatePage";
import Meeting from "./Pages/ReportPages/MeetingPage";
import Report from "./Pages/ReportPages/ReportPage";
import MasterData from "./Pages/ReportPages/MasterDataPage";
 
import LeadPage from './Pages/NavPages/LeadPage';
import DataPage from './Pages/NavPages/DataPage';

import SettingPage from './Pages/SettingPage'
import Logout from './Pages/LogoutPage';


function App() {
  
  return (
    <>
       <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/lead" element={<LeadPage />} />
        <Route path="/data" element={<DataPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/credential" element={<CredentialPage />} />
        <Route path="/email-auth" element={<EmailAuthPage />} />
        <Route path="/data-share" element={<DataSharePage />} />
        <Route path="/qr-scan" element={<QrScanPage />} />
         
          <Route path="/call" element={<CallReport />} />
          <Route path="/sms" element={<SmsReport />} />
          <Route path="/email" element={<EmailReport />} />
          <Route path="/whatsapp" element={<WhatsappReport />} />

          
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