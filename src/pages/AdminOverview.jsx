import { useEffect, useState } from "react";

import axios from "axios";

import AdminHeader from "../components/admin/AdminHeader";
import DashboardTabs from "../components/admin/DashboardTabs";

import {
  FiUsers,
  FiActivity,
  FiShield,
} from "react-icons/fi";

import { TbCurrencyRupee }
from "react-icons/tb";

import StatCard from "../components/admin/StatCard";
import QuickActions from "../components/admin/QuickActions";
import RecentAlerts from "../components/admin/RecentAlerts";

export default function AdminOverview() {

  const [overview, setOverview] =
    useState(null);

  useEffect(() => {

    fetchOverview();

  }, []);

  const fetchOverview = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/admin/overview"
        );

      setOverview(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-[#f5f7fb]">

      {/* HEADER */}
      <AdminHeader />

      {/* TABS */}
      <DashboardTabs active="overview" />

      {/* CONTENT */}
      <div className="max-w-[1450px] mx-auto px-8 py-8">

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mb-8">

          <StatCard
            icon={<FiUsers />}
            title="Total Riders"
            value={
              overview?.totalRiders || 0
            }
            growth="Live rider statistics"
            iconBg="bg-[#ede9fe]"
            iconColor="text-[#6366f1]"
          />

          <StatCard
            icon={<FiActivity />}
            title="Active Rides"
            value={
              overview?.activeRides || 0
            }
            growth="Currently active rides"
            iconBg="bg-[#dcfce7]"
            iconColor="text-[#16a34a]"
          />

          <StatCard
            icon={<FiShield />}
            title="Pending Verifications"
            value={
              overview?.pendingVerifications || 0
            }
            growth="Needs attention"
            iconBg="bg-[#fef3c7]"
            iconColor="text-[#f59e0b]"
          />

          <StatCard
            icon={<TbCurrencyRupee />}
            title="Total Earnings"
            value={`₹${overview?.totalEarnings || 0}`}
            growth="Platform ride revenue"
            iconBg="bg-[#eef2ff]"
            iconColor="text-[#6366f1]"
          />

        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-2 gap-6">

          <QuickActions />

          <RecentAlerts />

        </div>

      </div>

    </div>

  );

}