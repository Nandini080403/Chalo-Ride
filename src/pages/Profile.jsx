import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FiMapPin,
  FiCalendar,
  FiMail,
  FiStar,
  FiShield,
  FiCheckCircle,
  FiZap,
  FiClock,
  FiPlus,
  FiSearch,
  FiCreditCard,
  FiActivity,
} from "react-icons/fi";

export default function Profile() {
  return (
    <div className="bg-[#f5f7fb] min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Banner */}
      <div className="h-[260px] bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] relative">
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-7 -mt-24 relative z-10">
        {/* Profile Card */}
        <div className="bg-white rounded-[32px] shadow-sm border p-8 flex justify-between items-center">
          {/* Left */}
          <div className="flex gap-8 items-center">
            {/* Profile Image */}
            <div className="w-36 h-36 rounded-3xl bg-gray-100 flex items-center justify-center shadow-md">
              <div className="w-20 h-20 rounded-full bg-gray-400"></div>
            </div>

            {/* User Info */}
            <div>
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-3xl font-bold text-[#1e293b]">
                  Arjun Sharma
                </h1>

                <span className="bg-[#eef2ff] text-[#6366f1] px-4 py-2 rounded-full text-base font-semibold">
                  Verified Student
                </span>
              </div>

              <p className="text-gray-500 text-[14px] mb-4">
                B.Tech Computer Science • 3rd Year •
                Kristu Jayanti University
              </p>

              <div className="flex flex-wrap gap-6 text-gray-500">
                <div className="flex items-center gap-2">
                  <FiMapPin />
                  Bangalore
                </div>

                <div className="flex items-center gap-2">
                  <FiCalendar />
                  Member since Jan 2026
                </div>

                <div className="flex items-center gap-2">
                  <FiMail />
                  arjun.sharma@kristujayanti.com
                </div>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="bg-[#f8fafc] rounded-3xl p-8 text-center min-w-[180px]">
            <h2 className="text-3xl font-bold text-[#6366f1]">
              4.9
            </h2>

            <div className="flex justify-center text-yellow-400 text-xl my-2">
              ★★★★★
            </div>

            <p className="text-gray-500">70 reviews</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          {[
            {
              value: "47",
              label: "Rides Taken",
              color: "text-[#6366f1]",
            },

            {
              value: "23",
              label: "Rides Offered",
              color: "text-green-500",
            },

            {
              value: "182kg",
              label: "CO₂ Saved",
              color: "text-emerald-500",
            },

            {
              value: "₹6,240",
              label: "Money Saved",
              color: "text-pink-500",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border p-8"
            >
              <div
                className={`w-14 h-14 rounded-full bg-[#f8fafc] flex items-center justify-center text-xl mb-5 ${item.color}`}
              >
                <FiActivity />
              </div>

              <h2 className="text-3xl font-bold text-[#1e293b] mb-2">
                {item.value}
              </h2>

              <p className="text-gray-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border mt-8 p-2 flex justify-between">
          <button className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white px-10 py-2 rounded-2xl font-semibold flex-1">
            Overview
          </button>

          <button className="text-gray-500 px-10 py-2 font-semibold flex-1">
            Ride History
          </button>

          <button className="text-gray-500 px-10 py-2 font-semibold flex-1">
            Reviews
          </button>

          <button className="text-gray-500 px-10 py-2 font-semibold flex-1">
            Settings
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-3 gap-8 mt-8">
          {/* Left Side */}
          <div className="col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-3xl border p-8">
              <h2 className="text-xl font-bold mb-5 text-[#1e293b]">
                About Me
              </h2>

              <p className="text-gray-500 leading-8 text-[14px]">
                CS Engineering student passionate about
                sustainability and reducing campus carbon
                footprint. Always up for a good
                conversation on rides!
              </p>
            </div>

            {/* Vehicle */}
            <div className="bg-white rounded-3xl border p-8">
              <h2 className="text-xl font-bold mb-8 text-[#1e293b]">
                Vehicle & Availability
              </h2>

              <div className="grid grid-cols-2 gap-8 mb-5">
                <div className="bg-[#f8fafc] rounded-2xl p-8">
                  <p className="text-gray-400 mb-2">
                    Vehicle
                  </p>

                  <h3 className="font-bold text-[14px]">
                    Hero Splendor+ (Black)
                  </h3>
                </div>

                <div className="bg-[#f8fafc] rounded-2xl p-8">
                  <p className="text-gray-400 mb-2">
                    Usual Route
                  </p>

                  <h3 className="font-bold text-[14px]">
                    K Narayanapura ↔ KJU
                  </h3>
                </div>
              </div>

              <div className="bg-[#fef2f2] rounded-2xl p-8">
                <p className="text-gray-400 mb-2">
                  Availability
                </p>

                <h3 className="font-bold text-[14px]">
                  Weekdays 8AM–10AM, 5PM–7PM
                </h3>
              </div>
            </div>

            {/* Recent Rides */}
            <div className="bg-white rounded-3xl border p-8">
              <h2 className="text-xl font-bold mb-8 text-[#1e293b]">
                Recent Rides
              </h2>

              <div className="space-y-4">
                {[
                  {
                    route:
                      "K Narayanapura → Kristu Jayanti",
                    type: "Taken",
                    price: "₹45",
                  },

                  {
                    route:
                      "Manyata Tech Park → KJU",
                    type: "Offered",
                    price: "₹60",
                  },

                  {
                    route:
                      "Hebbal → K Narayanapura",
                    type: "Taken",
                    price: "₹38",
                  },
                ].map((ride, index) => (
                  <div
                    key={index}
                    className="bg-[#f8fafc] rounded-2xl p-8 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-bold text-[14px]">
                        {ride.route}
                      </h3>

                      <p className="text-gray-500">
                        Recent campus ride
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`px-4 py-2 rounded-full text-base font-semibold ${
                          ride.type === "Taken"
                            ? "bg-[#eef2ff] text-[#6366f1]"
                            : "bg-[#dcfce7] text-[#16a34a]"
                        }`}
                      >
                        {ride.type}
                      </span>

                      <p className="font-bold text-xl">
                        {ride.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-8">
            {/* Verified */}
            <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-3xl p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <FiShield className="text-xl" />

                <h2 className="text-xl font-bold">
                  Verified
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  "College Email",
                  "Student ID",
                  "Phone Number",
                  "Government ID",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <FiCheckCircle />

                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-3xl border p-8">
              <h2 className="text-xl font-bold mb-6">
                Badges
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 text-green-600 rounded-2xl p-8 text-center font-semibold">
                  Eco Warrior
                </div>

                <div className="bg-yellow-50 text-yellow-600 rounded-2xl p-8 text-center font-semibold">
                  Top Rider
                </div>

                <div className="bg-purple-50 text-purple-600 rounded-2xl p-8 text-center font-semibold">
                  50 Rides
                </div>

                <div className="bg-blue-50 text-blue-600 rounded-2xl p-8 text-center font-semibold">
                  Punctual
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl border p-8">
              <h2 className="text-xl font-bold mb-6">
                Quick Actions
              </h2>

              <div className="space-y-4">
                <button className="w-full bg-[#eef2ff] text-[#6366f1] py-2 rounded-2xl font-semibold flex items-center justify-center gap-3">
                  <FiSearch />
                  Find a Ride
                </button>

                <button className="w-full bg-[#fee2e2] text-[#ef4444] py-2 rounded-2xl font-semibold flex items-center justify-center gap-3">
                  <FiPlus />
                  Offer a Ride
                </button>

                <button className="w-full bg-[#dcfce7] text-[#16a34a] py-2 rounded-2xl font-semibold flex items-center justify-center gap-3">
                  <FiCreditCard />
                  View Payments
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}