import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import VatRequest from "./Components/Vaternian_request/VatRequest";
import RejectRequest from './Components/Vaternian_request/RejectRequest';
import Vaternian from './Components/Vaternian_request/Vaternian';
import Home from "./Components/Home/Home";
import ActiveVets from './Components/Vaternian_list/ActiveVats';
import Customers from './Components/Customers/Customers';
import Orders from './Components/Orders/Orders';
import VatDocs from './Components/Vaternian_request/VatDocs';
import Profile from './Components/Profile/Profile';
import GeneralSettings from './Components/Settings/GeneralSettings';
import Login from './Components/Login/Login';
import Reports from './Components/Reports/Reports';
import PaymentsRequest from './Components/PaymentsRequest/PaymentsRequest';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <>
          <Home />
          <Routes>
            <Route path="/dashboard" element={<ActiveVets />} />
            <Route path="/dashboard/veterinary-request" element={<VatRequest />} />
            <Route path="/dashboard/rejected-request" element={<RejectRequest />} />
            <Route path="/dashboard/veterinary-list" element={<Vaternian />} />
            <Route path="/dashboard/vets-documents" element={<VatDocs />} />
            <Route path="/dashboard/customers" element={<Customers />} />
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/reports" element={<Reports />} />
            <Route path="/dashboard/paymentsRequest" element={<PaymentsRequest />} />
            <Route path="/dashboard/general-settings" element={<GeneralSettings />} />
            <Route path="/login" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to="/dashboard/login" replace />} />
          <Route path="/dashboard/login" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
