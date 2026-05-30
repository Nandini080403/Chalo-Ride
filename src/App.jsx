import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FindRide from "./pages/FindRide";
import OfferRide from "./pages/OfferRide";
import ActiveRide from "./pages/ActiveRide";
import Payment from "./pages/Payment";
import About from "./pages/About";
import Legal from "./pages/Legal";
import Profile from "./pages/Profile";
import Requests from "./pages/Requests";
import RiderDetails from "./pages/RiderDetails";
import RaiseComplaint from "./pages/RaiseComplaint";

import AdminOverview from "./pages/AdminOverview";
import AdminVerifications from "./pages/AdminVerifications";
import AdminRiders from "./pages/AdminRiders";
import AdminComplaints from "./pages/AdminComplaints";
import AdminEarnings from "./pages/AdminEarnings";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/find-ride" element={<FindRide />} />

        <Route path="/offer-ride" element={<OfferRide />} />

        <Route path="/about" element={<About />} />

        <Route path="/legal" element={<Legal />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/requests" element={<Requests />} />

        <Route path="/activeride" element={<ActiveRide />} />

        <Route path="/payment" element={<Payment />} />

        {/* ADMIN DASHBOARD */}
        <Route path="/admin" element={<AdminOverview />} />

        <Route path="/admin/verifications" element={<AdminVerifications />} />

        <Route path="/admin/riders" element={<AdminRiders />} />
  
        <Route
          path="/admin/riders/:id"
          element={<RiderDetails />}
        />
       
        <Route path="/admin/complaints" element={<AdminComplaints />} />

        <Route path="/admin/earnings" element={<AdminEarnings />}  />

        <Route
          path="/raise-complaint"
          element={<RaiseComplaint />}
        />
        
      </Routes>

    </BrowserRouter>
  );
}