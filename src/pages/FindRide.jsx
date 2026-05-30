import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FiMapPin,
  FiClock,
  FiSearch,
  FiUsers,
} from "react-icons/fi";

const rides = [
  {
    name: "Priya Sharma",
    course: "Computer Science • 3rd Year",
    route: "Jakkur → Main Campus",
    time: "8:30 AM",
    vehicle: "Scooty",
    price: "₹25",
  },

  {
    name: "Rahul Verma",
    course: "Mechanical Engg • 2nd Year",
    route: "Metro Station → Engineering Block",
    time: "8:00 AM",
    vehicle: "Scooty",
    price: "₹40",
  },

  {
    name: "Ananya Reddy",
    course: "Business Admin • 4th Year",
    route: "Hebbal → Campus Gate 2",
    time: "8:10 AM",
    vehicle: "Bike",
    price: "₹50",
  },
];

export default function FindRide() {
  return (
    <div className="bg-[#f5f7fb] min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <div className="max-w-7xl mx-auto px-7 py-12">
        {/* Top */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-bold text-[#1e293b] mb-4">
              Find Your Perfect Ride
            </h1>

            <p className="text-gray-500 text-xl">
              Search for rides matching your route and
              schedule
            </p>
          </div>

          {/* Profile */}
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gray-500"></div>
          </div>
        </div>

        {/* Search Box */}
        <div className="bg-white border rounded-[36px] p-8 mb-16">
          <div className="grid grid-cols-4 gap-8">
            {/* From */}
            <div>
              <label className="font-semibold text-[#1e293b] mb-3 block">
                From
              </label>

              <input
                type="text"
                placeholder="Starting location"
                className="w-full bg-[#f8fafc] border rounded-2xl px-7 py-5 outline-none text-[14px]"
              />
            </div>

            {/* To */}
            <div>
              <label className="font-semibold text-[#1e293b] mb-3 block">
                To
              </label>

              <input
                type="text"
                placeholder="Destination"
                className="w-full bg-[#f8fafc] border rounded-2xl px-7 py-5 outline-none text-[14px]"
              />
            </div>

            {/* Time */}
            <div>
              <label className="font-semibold text-[#1e293b] mb-3 block">
                Time
              </label>

              <input
                type="text"
                placeholder="Select time"
                className="w-full bg-[#f8fafc] border rounded-2xl px-7 py-5 outline-none text-[14px]"
              />
            </div>

            {/* Button */}
            <div className="flex items-end">
              <button className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white py-5 rounded-2xl font-semibold text-xl flex items-center justify-center gap-3">
                <FiSearch />
                Search Rides
              </button>
            </div>
          </div>
        </div>

        {/* Ride Cards */}
        <div className="space-y-6">
          {rides.map((ride, index) => (
            <div
              key={index}
              className="bg-white border rounded-[32px] p-8 flex justify-between items-center shadow-sm"
            >
              {/* Left */}
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full border-2 border-[#d8d4fe] flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                </div>

                {/* Details */}
                <div>
                  <h2 className="text-xl font-bold text-[#1e293b] mb-2">
                    {ride.name}
                  </h2>

                  <p className="text-gray-500 text-[14px] mb-4">
                    {ride.course}
                  </p>

                  <div className="flex flex-wrap gap-8 text-gray-500">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-[#6366f1]" />

                      <span className="font-medium text-[#1e293b]">
                        {ride.route}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FiClock />

                      <span>{ride.time}</span>
                    </div>

                    <div>
                      <span>{ride.vehicle}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <h2 className="text-3xl font-bold text-[#6366f1]">
                  {ride.price}
                </h2>

                <p className="text-gray-500 mb-4">
                  per person
                </p>

                <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] transition text-white px-7 py-2 rounded-2xl font-semibold text-[14px] mb-3">
                  Request Ride
                </button>

                <div className="flex items-center justify-end gap-2 text-gray-500">
                  <FiUsers />

                  <span>{ride.seats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}