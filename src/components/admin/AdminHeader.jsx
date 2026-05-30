import { FiBell } from "react-icons/fi";
import { useEffect, useState }
from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

export default function AdminHeader() {

  const [notificationCount, setNotificationCount] =
    useState(0);

  const navigate =
    useNavigate();

  useEffect(() => {

    fetchNotifications();

  }, []);


  const fetchNotifications =
    async () => {

      try {

        // COMPLAINTS
        const complaintsRes =
          await axios.get(
            "http://localhost:5000/api/complaints"
          );

        const complaints =
          complaintsRes.data;

        const pendingComplaints =
          complaints.filter(
            (complaint) =>
              complaint.status !==
              "resolved"
          );


        // USERS
        const usersRes =
          await axios.get(
            "http://localhost:5000/api/admin/users"
          );

        const users =
          usersRes.data;

        const pendingVerifications =
          users.filter(
            (user) =>
              !user.isVerified
          );


        // TOTAL
        setNotificationCount(

          pendingComplaints.length +

          pendingVerifications.length

        );

      } catch (error) {

        console.log(error);

      }

    };


  // ================= LOGOUT =================
  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/login");

  };


  return (

    <div className="bg-white border-b">

      {/* TOP */}
      <div className="flex justify-between items-center px-7 py-5">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>

          <h1 className="text-xl font-bold text-[#7c3aed]">

            ChaloRide

          </h1>

        </div>

      </div>


      {/* BOTTOM */}
      <div className="flex justify-between items-center px-7 py-6">

        <div>

          <h2 className="text-3xl font-bold text-[#1e293b]">

            Admin Dashboard

          </h2>

          <p className="text-gray-500 mt-2 text-[14px]">

            ChaloRide Management Portal

          </p>

        </div>


        <div className="flex items-center gap-8">

          {/* NOTIFICATIONS */}
          <button className="flex items-center gap-2 bg-gray-100 px-7 py-5 rounded-xl">

            <FiBell />

            {notificationCount} New

          </button>


          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="border px-7 py-5 rounded-xl font-semibold hover:bg-[#f8fafc] transition"
          >

            Exit Admin

          </button>

        </div>

      </div>

    </div>

  );

}