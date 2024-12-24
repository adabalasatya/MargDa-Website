import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home'
import  Login  from './Components/Home/Login';
import  Signup  from './Components/Home/Signup'
import  Dashboard  from './Pages/Dashboard'

import ProfilePage from "./Pages/ProfilePages/ProfilePage";
import CredentialPage from "./Pages/ProfilePages/CredentialPage";
import QrScanPage from "./Pages/ProfilePages/QrScanPage";


import CallReport from "./Pages/ReportPages/CallReportPage";
import SmsReport from "./Pages/ReportPages/SmsReportPage"
import EmailReport from "./Pages/ReportPages/EmailReportPage"
import WhatsappReport from "./Pages/ReportPages/WhatsappReportPage"

import Email from "./Pages/ReportPages/EmailReportPage";
import Whatsapp from "./Pages/ReportPages/WhatsappReportPage"

import Template from "./Pages/ReportPages/TemplatePage";
import Meeting from "./Pages/ReportPages/MeetingPage";
import Report from "./Pages/ReportPages/ReportPage";
import MasterData from "./Pages/ReportPages/MasterDataPage";
 


function App() {
  
  return (
    <>
       <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/credential" element={<CredentialPage />} />
        <Route path="/qr-scan" element={<QrScanPage />} />

         
          <Route path="/call" element={<CallReport />} />
          <Route path="/sms" element={<SmsReport />} />
          <Route path="/email" element={<EmailReport />} />
          <Route path="/whatsapp" element={<WhatsappReport />} />

          <Route path="email" element={<Email />} />
          <Route path="template" element={<Template />} />
          <Route path="meeting" element={<Meeting/>} />
          <Route path="report" element={<Report/>} />
          <Route path="master-data" element={<MasterData/>} />
          <Route path="whatsapp" element={<Whatsapp/>} /> 
         

      </Routes>
    </Router>  
    
    </>

  );
}

export default App;