import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import axios from "axios";

import AdminHeader from "../components/admin/AdminHeader";
import DashboardTabs from "../components/admin/DashboardTabs";

import {
  FiDownload,
  FiTrendingUp,
  FiBarChart2,
  FiUser,
} from "react-icons/fi";

import { TbCurrencyRupee }
from "react-icons/tb";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminEarnings() {

  const [earnings, setEarnings] =
    useState(null);

  const [monthlyData, setMonthlyData] =
    useState([]);

  const [topRiders, setTopRiders] =
    useState([]);

  useEffect(() => {

    fetchEarnings();

    fetchMonthlyData();

    fetchTopRiders();

  }, []);


  // ================= EARNINGS =================
  const fetchEarnings = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/admin/earnings"
        );

      setEarnings(res.data);

    } catch (error) {

      console.log(error);

    }

  };


  // ================= MONTHLY GRAPH =================
  const fetchMonthlyData =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/admin/earnings/monthly"
          );

        setMonthlyData(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };


  // ================= TOP RIDERS =================
  const fetchTopRiders =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/admin/top-riders"
          );

        setTopRiders(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  const exportPDF = () => {

    const doc =
      new jsPDF();

    doc.setFontSize(20);

    doc.text(
      "ChaloRide Earnings Report",
      14,
      20
    );  

    autoTable(doc, {

      startY: 35,

      head: [[
        "Total Revenue",
        "Average Per Ride",
        "Total Rides",
      ]],

      body: [[

        "Rs. " + (earnings?.totalRevenue || 0),

        "Rs. " + (earnings?.averagePerRide || 0),

        earnings?.totalRides || 0,

      ]],

    });

    doc.save(
      "earnings-report.pdf"
    );

  };


  return (

    <div className="min-h-screen bg-[#f5f7fb]">

      <AdminHeader />

      <DashboardTabs active="earnings" />

      <div className="max-w-[1450px] mx-auto px-8 py-8">

        {/* TOP */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-[#1e293b]">

            Ride Revenue Analytics

          </h1>

          <button
            onClick={exportPDF}
            className="bg-[#6366f1] text-white px-7 py-5 rounded-2xl flex items-center gap-3 font-semibold"
          >

            <FiDownload />

            Export PDF

          </button>

        </div>


        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 mb-8">

          {/* TOTAL REVENUE */}
          <div className="bg-white border border-[#e2e8f0] rounded-[32px] p-8">

            <div className="w-16 h-16 rounded-full bg-[#eef2ff] flex items-center justify-center text-[#6366f1] text-xl mb-6">

              <TbCurrencyRupee />

            </div>

            <p className="text-gray-500 text-[14px]">

              Total Revenue

            </p>

            <h2 className="text-3xl font-bold text-[#1e293b] mt-3">

              ₹{earnings?.totalRevenue || 0}

            </h2>

          </div>


          {/* AVERAGE */}
          <div className="bg-white border border-[#e2e8f0] rounded-[32px] p-8">

            <div className="w-16 h-16 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#16a34a] text-xl mb-6">

              <FiTrendingUp />

            </div>

            <p className="text-gray-500 text-[14px]">

              Average per Ride

            </p>

            <h2 className="text-3xl font-bold text-[#1e293b] mt-3">

              ₹{earnings?.averagePerRide || 0}

            </h2>

          </div>


          {/* TOTAL RIDES */}
          <div className="bg-white border border-[#e2e8f0] rounded-[32px] p-8">

            <div className="w-16 h-16 rounded-full bg-[#dbeafe] flex items-center justify-center text-[#2563eb] text-xl mb-6">

              <FiBarChart2 />

            </div>

            <p className="text-gray-500 text-[14px]">

              Total Rides

            </p>

            <h2 className="text-3xl font-bold text-[#1e293b] mt-3">

              {earnings?.totalRides || 0}

            </h2>

          </div>

        </div>


        {/* GRAPH + TOP RIDERS */}
        <div className="grid grid-cols-2 gap-6">

          {/* GRAPH */}
          <div className="bg-white border border-[#e2e8f0] rounded-[32px] p-8">

            <h2 className="text-2xl font-bold text-[#1e293b] mb-6">

              Monthly Earnings Trend

            </h2>

            <div className="h-[350px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart
                  data={monthlyData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="month"
                  />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366f1"
                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* TOP RIDERS */}
          <div className="bg-white border border-[#e2e8f0] rounded-[32px] p-8">

            <h2 className="text-2xl font-bold text-[#1e293b] mb-6">

              Top Earning Riders

            </h2>

            <div className="space-y-5">

              {topRiders.map(
                (rider, index) => (

                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-4"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-full bg-[#eef2ff] flex items-center justify-center text-[#6366f1] text-xl">

                        <FiUser />

                      </div>

                      <div>

                        <h3 className="font-bold text-[#1e293b]">

                          {rider.name}

                        </h3>

                        <p className="text-gray-500 text-sm">

                          {rider.email}

                        </p>

                      </div>

                    </div>

                    <p className="text-[#6366f1] font-bold text-xl">

                      ₹{rider.totalEarned}

                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}