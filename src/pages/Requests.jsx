import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FiInbox,
  FiCheck,
  FiX,
} from "react-icons/fi";

export default function Requests() {

  const [activeTab, setActiveTab] =
    useState("pending");

  const navigate = useNavigate();

  return (
    <div className="bg-[#f5f7fb] min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <div className="max-w-7xl mx-auto px-7 py-14">

        {/* Heading */}
        <div className="mb-12">

          <h1 className="text-3xl font-bold text-[#1e293b] mb-4">
            Ride Requests
          </h1>

          <p className="text-gray-500 text-xl">
            Manage incoming ride requests from students
          </p>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-14">

          {/* Pending */}
          <div className="bg-white border rounded-[32px] p-8 flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-xl mb-4">
                Pending Requests
              </p>

              <h2 className="text-3xl font-bold text-[#6366f1]">
                1
              </h2>

            </div>

            <div className="w-20 h-20 rounded-full bg-[#eef2ff] flex items-center justify-center text-[#6366f1] text-3xl">
              <FiInbox />
            </div>

          </div>

          {/* Accepted */}
          <div className="bg-white border rounded-[32px] p-8 flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-xl mb-4">
                Accepted
              </p>

              <h2 className="text-3xl font-bold text-[#16a34a]">
                0
              </h2>

            </div>

            <div className="w-20 h-20 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#16a34a] text-3xl">
              <FiCheck />
            </div>

          </div>

          {/* Rejected */}
          <div className="bg-white border rounded-[32px] p-8 flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-xl mb-4">
                Rejected
              </p>

              <h2 className="text-3xl font-bold text-red-500">
                0
              </h2>

            </div>

            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-3xl">
              <FiX />
            </div>

          </div>

        </div>

        {/* Tabs */}
        <div className="flex gap-16 border-b mb-10">

          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-5 text-xl font-semibold ${
              activeTab === "pending"
                ? "text-[#6366f1] border-b-4 border-[#6366f1]"
                : "text-gray-500"
            }`}
          >
            Pending (1)
          </button>

          <button
            onClick={() => setActiveTab("accepted")}
            className={`pb-5 text-xl font-semibold ${
              activeTab === "accepted"
                ? "text-[#6366f1] border-b-4 border-[#6366f1]"
                : "text-gray-500"
            }`}
          >
            Accepted (0)
          </button>

          <button
            onClick={() => setActiveTab("rejected")}
            className={`pb-5 text-xl font-semibold ${
              activeTab === "rejected"
                ? "text-[#6366f1] border-b-4 border-[#6366f1]"
                : "text-gray-500"
            }`}
          >
            Rejected (0)
          </button>

        </div>

        {/* Request Card */}
        <div className="bg-white border rounded-[40px] p-6 shadow-sm">

          <div className="flex justify-between gap-6">

            {/* Left */}
            <div className="flex gap-8 flex-1">

              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="profile"
                className="w-24 h-24 rounded-full object-cover"
              />

              <div className="flex-1">

                {/* Name */}
                <div className="flex items-center gap-4 mb-3">

                  <h2 className="text-3xl font-bold text-[#1e293b]">
                    Priya Sharma
                  </h2>

                  <span className="bg-[#eef2ff] text-[#6366f1] px-4 py-1 rounded-full text-[14px] font-semibold">
                    ★ 4.8
                  </span>

                </div>

                {/* Course */}
                <p className="text-gray-500 text-xl mb-8">
                  Computer Science • 3rd Year
                </p>

                {/* Ride Details */}
                <div className="bg-[#f8fafc] rounded-[28px] p-8 grid grid-cols-2 gap-8">

                  <div>

                    <p className="text-gray-400 text-[14px] mb-2">
                      Route
                    </p>

                    <h3 className="text-xl font-semibold text-[#1e293b]">
                      Hostel Block A → Main Campus
                    </h3>

                  </div>

                  <div>

                    <p className="text-gray-400 text-[14px] mb-2">
                      Time
                    </p>

                    <h3 className="text-xl font-semibold text-[#1e293b]">
                      8:30 AM
                    </h3>

                  </div>

                  <div>

                    <p className="text-gray-400 text-[14px] mb-2">
                      Vehicle
                    </p>

                    <h3 className="text-xl font-semibold text-[#1e293b]">
                      Bicycle
                    </h3>

                  </div>

                  <div>

                    <p className="text-gray-400 text-[14px] mb-2">
                      Price
                    </p>

                    <h3 className="text-xl font-semibold text-[#1e293b]">
                      ₹25
                    </h3>

                  </div>

                </div>

                {/* Message */}
                <div className="bg-[#f8f7ff] rounded-[28px] p-6 mt-6">

                  <p className="text-gray-500 text-[14px] mb-3">
                    Message
                  </p>

                  <p className="italic text-xl text-[#1e293b]">
                    "Hi! I'd like to join your ride."
                  </p>

                </div>

              </div>

            </div>

            {/* Right Buttons */}
            <div className="flex flex-col gap-8 min-w-[220px]">

              <button
                onClick={() =>
                  navigate("/active-ride")
                }
                className="bg-green-500 hover:bg-green-600 transition text-white px-7 py-5 rounded-2xl text-xl font-semibold"
              >
                ✓ Accept
              </button>

              <button className="border-2 border-red-400 text-red-500 hover:bg-red-50 transition px-7 py-5 rounded-2xl text-xl font-semibold">
                ✕ Reject
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}