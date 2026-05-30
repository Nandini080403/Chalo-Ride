import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../api";

import AdminHeader from "../components/admin/AdminHeader";
import DashboardTabs from "../components/admin/DashboardTabs";

import {
  FiSearch,
  FiFilter,
  FiMapPin,
} from "react-icons/fi";

export default function AdminRiders() {

  const [rides, setRides] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");


  // ================= FETCH RIDES =================
  const fetchRides =
    async () => {

      try {

        const res =
          await API.get(
            "/rides"
          );

        setRides(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchRides();

  }, []);


  // ================= FILTERED RIDES =================
  const filteredRides =
    rides.filter((ride) => {

      const matchesSearch =

        ride.driver?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        ride.driver?.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =

        filter === "all"
          ? true
          : filter === "highfare"
          ? ride.fare >= 100
          : ride.fare < 100;

      return (
        matchesSearch &&
        matchesFilter
      );

    });


  return (

    <div className="min-h-screen bg-[#f5f7fb]">

      {/* HEADER */}
      <AdminHeader />

      {/* TABS */}
      <DashboardTabs active="riders" />

      {/* CONTENT */}
      <div className="max-w-[1450px] mx-auto px-8 py-8">

        {/* TOP */}
        <div className="flex items-center justify-between mb-8">

          <h1 className="text-3xl font-bold text-[#1e293b]">

            Active Riders

          </h1>

          <div className="flex gap-4">

            {/* SEARCH */}
            <div className="bg-white border border-[#e2e8f0] rounded-2xl px-6 h-[56px] flex items-center gap-3 w-[320px]">

              <FiSearch className="text-gray-400 text-lg" />

              <input
                type="text"
                placeholder="Search riders..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="outline-none w-full bg-transparent text-[14px]"
              />

            </div>


            {/* FILTER */}
            <div className="bg-white border border-[#e2e8f0] px-5 h-[56px] rounded-2xl flex items-center gap-3">

              <FiFilter className="text-gray-500" />

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(
                    e.target.value
                  )
                }
                className="outline-none bg-transparent text-[14px] font-semibold text-[#1e293b]"
              >

                <option value="all">

                  All Rides

                </option>

                <option value="highfare">

                  High Fare

                </option>

                <option value="lowfare">

                  Low Fare

                </option>

              </select>

            </div>

          </div>

        </div>


        {/* TABLE */}
        <div className="bg-white rounded-[36px] border border-[#e2e8f0] overflow-hidden">

          {/* HEADER */}
          <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1.2fr_1fr_1.3fr] gap-6 px-10 py-6 bg-[#f8fafc] font-bold text-[#1e293b] text-[14px]">

            <p>Rider</p>

            <p>Route</p>

            <p>Vehicle</p>

            <p>Fare</p>

            <p>Location</p>

            <p>Status</p>

            <p>Actions</p>

          </div>


          {/* ROWS */}
          {filteredRides.map((ride) => (

            <div
              key={ride._id}
              className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1.2fr_1fr_1.3fr] gap-6 px-10 py-5 border-t border-[#f1f5f9] items-center"
            >

              {/* RIDER */}
              <div className="flex items-center gap-4 min-w-0">

                <div className="w-14 h-14 rounded-full bg-[#f3e8ff] flex items-center justify-center text-[#6366f1] font-bold text-xl flex-shrink-0">

                  {
                    ride.driver?.name
                      ?.charAt(0)
                  }

                </div>

                <div className="min-w-0">

                  <h2 className="font-bold text-[15px] text-[#1e293b] truncate">

                    {
                      ride.driver?.name
                    }

                  </h2>

                  <p className="text-gray-500 text-sm truncate">

                    {
                      ride.driver?.email
                    }

                  </p>

                </div>

              </div>


              {/* ROUTE */}
              <div className="min-w-0">

                <p className="font-semibold text-[14px] truncate">

                  {ride.from}

                </p>

                <p className="text-gray-400 text-sm">

                  ↓

                </p>

                <p className="font-semibold text-[14px] truncate">

                  {ride.to}

                </p>

              </div>


              {/* VEHICLE */}
              <div>

                <p className="font-semibold text-[14px]">

                  {ride.vehicle}

                </p>

                <p className="text-gray-500 text-sm">

                  Seats:
                  {" "}
                  {ride.seats}

                </p>

              </div>


              {/* FARE */}
              <div>

                <p className="text-[#6366f1] font-bold text-[24px]">

                  ₹{ride.fare}

                </p>

              </div>


              {/* LOCATION */}
              <div className="flex items-center gap-2 text-gray-600 text-[14px] min-w-0">

                <FiMapPin />

                <span className="truncate">

                  {ride.from}

                </span>

              </div>


              {/* STATUS */}
              <div>

                <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">

                  Active

                </span>

              </div>


              {/* ACTION */}
              <div>

                <Link
                  to={`/admin/riders/${ride._id}`}
                >

                  <button className="bg-[#eef2ff] text-[#6366f1] px-6 h-[50px] rounded-2xl font-semibold hover:bg-[#e0e7ff] transition text-[14px] whitespace-nowrap">

                    View Details

                  </button>

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}