import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Home
import Home from "./Pages/Home";
import Aboutus from "./Pages/FooterPages/AboutUs";
import Feedback from "./Pages/FooterPages/Feedback";
import PrivacyStatement from "./Pages/FooterPages/PrivacyStatement";
import TermsofService from "./Pages/FooterPages/TermsofService";
import RefundPolicy from "./Pages/FooterPages/RefundPolicy";

import Login from "./Components/Home/Login";
import Sign from "./Components/Home/Signup";
import ForgotPassword from "./Components/Home/ForgetPassword";
import Dashboard from "./Pages/Dashboard";
import Explore from "./Pages/ExplorePage";
import AdminPage from "./Pages/AdminPage";

//Nav-Data-Leads
import LeadPage from "./Pages/NavPages/LeadPage";
import DataPage from "./Pages/NavPages/DataPage";
import AllUsersPage from "./Pages/NavPages/AllUsersPage";
import PaymentPage from "./Pages/NavPages/PaymentPage";
import TeamSupportPage from "./Pages/NavPages/TeamSupportPage";
import SupportTicketPage from "./Pages/NavPages/SupportTicketPage";

//ShopingMart
import Shoppage from "./Pages/ShopingMartPages/ShopPage";
import ShopingPage from "./Pages/ShopingMartPages/ShopPage";
import CartPage from "./Pages/ShopingMartPages/CartPage";
import ProductDetails from "./Pages/ShopingMartPages/ProductDetailsPage";
import PlaceOrderPage from "./Pages/ShopingMartPages/PlaceOrderPage";

//ShopMart
import ShopHomePage from "./Pages/MartPages/ShopHomePage";
import UpdateProductPage from "./Pages/MartPages/UpdateProductPage";
import ViewProductsPage from "./pages/MartPages/ViewProductsPage";

//ProfileSection
import ProfilePage from "./Pages/ProfilePages/ProfilePage";
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

//Admin Section
import AdminDataPage from "./Pages/AdminPages/AdminDataPage";
import AdminUserPage from "./Pages/AdminPages/AdminUserPage";

//ReportSection
import CallReport from "./Pages/ReportPages/CallReportPage";
import SmsReport from "./Pages/ReportPages/SmsReportPage";
import EmailReport from "./Pages/ReportPages/EmailReportPage";
import WhatsappReport from "./Pages/ReportPages/WhatsappReportPage";
import MeetingReport from "./Pages/ReportPages/MeetingReportPage";
import MyWorkTimelinePage from "./Pages/ReportPages/WorkTimeLinePage";
import ClientTimePage from "./Pages/ReportPages/ClientTimelinePage";

//OutsideSection
import MasterData from "./Pages/OutSidebarPages/MasterDataPage";
import SettingPage from "./Pages/OutSidebarPages/SettingPage";
import Logout from "./Pages/OutSidebarPages/LogoutPage";

//AdvisorsPanel
import TeleconsultantPage from "./Pages/AdvisorsPanelPages/TeleconsultantPage";
import CounsellorsApPage from "./Pages/AdvisorsPanelPages/CounsellorsApPage";
import RechargePage from "./Pages/AdvisorsPanelPages/RechargePage";
import OnlinePaymentPage from "./Pages/AdvisorsPanelPages/OnlinePaymentPage";
import PaymentStatus from "./Pages/PhonePayPaymentStatus";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/feedback" element={<Feedback />} />
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
          <Route path="/allusers" element={<AllUsersPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/team-support" element={<TeamSupportPage />} />
          <Route path="/support-ticket" element={<SupportTicketPage />} />

          {/* Shopping */}
          <Route path="/shop" element={<Shoppage />} />
          <Route path="/mart" element={<ShopingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/place-order" element={<PlaceOrderPage />} />

          {/* Shop Mart*/}
          <Route path="/shop-Home" element={<ShopHomePage />} />
          <Route path="/update-product" element={<UpdateProductPage />} />
          <Route path="/view-products" element={<ViewProductsPage />} />

          {/* Profile Section with drop-down menu */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/credential" element={<CredentialPage />} />
          <Route path="/dsc" element={<DscPage />} />
          <Route path="/email-auth" element={<EmailAuthPage />} />
          <Route path="/data-share" element={<DataSharePage />} />
          <Route path="/qr-scan" element={<QrScanPage />} />

          <Route path="/admin" element={<AdminDataPage />} />
          <Route path="/user" element={<AdminUserPage />} />

          {/* AdvisorsPanel Section with drop-down menu */}
          <Route path="/teleconsultant" element={<TeleconsultantPage />} />
          <Route path="/consultants-panel" element={<CounsellorsApPage />} />
          <Route path="/recharge-talktime" element={<RechargePage />} />
          <Route path="/online-payment" element={<OnlinePaymentPage />} />

          {/* Template Section */}
          <Route path="/templates-list" element={<Template />} />
          <Route path="/add-template" element={<AddTemplatePage />} />
          <Route path="/add-footer" element={<AddFooterPage />} />
          <Route path="/edit-template" element={<EditTemplatePage />} />

          {/* Report Section with drop-down menu */}
          <Route path="/email-report" element={<EmailReport />} />
          <Route path="/whatsapp-report" element={<WhatsappReport />} />
          <Route path="/call-report" element={<CallReport />} />
          <Route path="/sms-report" element={<SmsReport />} />
          <Route path="meeting-report" element={<MeetingReport />} />
          <Route path="/my-work-report" element={<MyWorkTimelinePage />} />
          <Route path="/client-timeline" element={<ClientTimePage />} />

          {/* OutSide Section with drop-down menu */}
          <Route path="template" element={<Template />} />
          <Route path="master-data" element={<MasterData />} />
          <Route path="settings" element={<SettingPage />} />
          <Route path="logout" element={<Logout />} />

          {/* Phone Pe Payment Status */}
          <Route path="phonepay/payment-status" element={<PaymentStatus />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
