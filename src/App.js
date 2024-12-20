import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DeveloperDashboard from "./components/Dashboard/DeveloperDashboard";
import RealtorDashboard from "./components/Dashboard/RealtorDashboard";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import ListingDetails from "./components/Dashboard/ListingDetails";
import ViewListing from "./pages/viewListing";

const App = () => {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/developer-dashboard" element={<DeveloperDashboard />} />
        <Route path="/realtor-dashboard" element={<RealtorDashboard />} />
        <Route path="/listing/:listingId" element={<ListingDetails />} />
        <Route path="/:brandName/:listingId" element={<ViewListing />} />

      </Routes>
    </div>
  );
};

export default App;
