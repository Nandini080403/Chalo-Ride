import { useEffect, useState }
from "react";

import { useParams }
from "react-router-dom";

import API from "../api";

import AdminHeader from "../components/admin/AdminHeader";
import DashboardTabs from "../components/admin/DashboardTabs";

import {
  FiMapPin,
  FiClock,
  FiUsers,
  FiTruck,
  FiDollarSign,
  FiMail,
  FiPhone,
  FiAlertTriangle,
  FiSlash,
} from "react-icons/fi";

export default function RiderDetails() {

  const { id } =
    useParams();

  const [ride, setRide] =
    useState(null);

  const fetchRide =
    async () => {

      try {

        const res =
          await API.get(
            `/rides/${id}`
          );

        setRide(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchRide();

  }, []);

  if (!ride) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-[#1e293b]">

        Loading Rider Details...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#f5f7fb]">

      {/* HEADER */}
      <AdminHeader />

      {/* TABS */}
      <DashboardTabs active="riders" />

      {/* CONTENT */}
      <div className="max-w-[1450px] mx-auto px-8 py-8">

        {/* TOP CARD */}
        <div className="bg-white border border-[#e2e8f0] rounded-[32px] p-10 mb-8">

          <div className="flex justify-between items-start">

            {/* LEFT */}
            <div className="flex items-center gap-8">

              {/* AVATAR */}
              <div
                className="
                w-28 h-28
                rounded-full
                bg-[#f3e8ff]
                flex items-center justify-center
                text-[#6366f1]
                text-5xl
                font-bold
                "
              >

                {
                  ride.driver?.name
                    ?.charAt(0)
                }

              </div>


              {/* DETAILS */}
              <div>

                <h1 className="text-4xl font-bold text-[#1e293b] mb-4">

                  {
                    ride.driver?.name
                  }

                </h1>


                <div className="space-y-3 text-[#475569]">

                  <div className="flex items-center gap-3">

                    <FiMail />

                    {
                      ride.driver?.email
                    }

                  </div>

                </div>

              </div>

            </div>


            {/* ACTIONS */}
            <div className="flex flex-col gap-4">

              <button
                className="
                bg-[#fee2e2]
                text-[#dc2626]
                px-8 py-4
                rounded-2xl
                font-semibold
                flex items-center gap-3
                "
              >

                <FiSlash />

                Suspend Rider

              </button>


              <button
                className="
                bg-[#fef3c7]
                text-[#d97706]
                px-8 py-4
                rounded-2xl
                font-semibold
                flex items-center gap-3
                "
              >

                <FiAlertTriangle />

                Raise Alert

              </button>

            </div>

          </div>

        </div>


        {/* DETAILS GRID */}
        <div className="grid grid-cols-2 gap-6">

          {/* ROUTE */}
          <div className="bg-white border border-[#e2e8f0] rounded-[32px] p-8">

            <div className="flex items-center gap-4 mb-6">

              <FiMapPin className="text-[#6366f1] text-2xl" />

              <h2 className="text-2xl font-bold text-[#1e293b]">

                Route Details

              </h2>

            </div>

            <div className="space-y-5 text-lg">

              <p>

                <span className="font-bold">

                  From:

                </span>

                {" "}
                {ride.from}

              </p>

              <p>

                <span className="font-bold">

                  To:

                </span>

                {" "}
                {ride.to}

              </p>

            </div>

          </div>


          {/* VEHICLE */}
          <div className="bg-white border border-[#e2e8f0] rounded-[32px] p-8">

            <div className="flex items-center gap-4 mb-6">

              <FiTruck className="text-[#6366f1] text-2xl" />

              <h2 className="text-2xl font-bold text-[#1e293b]">

                Vehicle Information

              </h2>

            </div>

            <div className="space-y-5 text-lg">

              <p>

                <span className="font-bold">

                  Vehicle:

                </span>

                {" "}
                {ride.vehicle}

              </p>

            </div>

          </div>


          {/* TIME */}
          <div className="bg-white border border-[#e2e8f0] rounded-[32px] p-8">

            <div className="flex items-center gap-4 mb-6">

              <FiClock className="text-[#6366f1] text-2xl" />

              <h2 className="text-2xl font-bold text-[#1e293b]">

                Ride Timing

              </h2>

            </div>

            <p className="text-lg">

              {ride.time}

            </p>

          </div>


          {/* SEATS */}
          <div className="bg-white border border-[#e2e8f0] rounded-[32px] p-8">

            <div className="flex items-center gap-4 mb-6">

              <FiUsers className="text-[#6366f1] text-2xl" />

              <h2 className="text-2xl font-bold text-[#1e293b]">

                Seat Availability

              </h2>

            </div>

            <p className="text-lg">

              {ride.seats} Seats

            </p>

          </div>

        </div>


        {/* FARE */}
        <div className="bg-white border border-[#e2e8f0] rounded-[32px] p-8 mt-6">

          <div className="flex items-center gap-4 mb-5">

            <FiDollarSign className="text-[#6366f1] text-2xl" />

            <h2 className="text-2xl font-bold text-[#1e293b]">

              Ride Fare

            </h2>

          </div>

          <p className="text-5xl font-bold text-[#6366f1]">

            ₹{ride.fare}

          </p>

        </div>

      </div>

    </div>

  );

}