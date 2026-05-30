import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import AdminHeader from "../components/admin/AdminHeader";
import DashboardTabs from "../components/admin/DashboardTabs";

import API from "../api";

import {
  FiFilter,
  FiDownload,
  FiMail,
  FiBookOpen,
  FiCalendar,
} from "react-icons/fi";

export default function AdminVerifications() {

  const [users, setUsers] =
    useState([]);

  const [previewImage, setPreviewImage] =
    useState(null);

  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const res =
        await API.get(
          "/admin/users"
        );

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // VERIFY USER
  const verifyUser = async (id) => {

    try {

      await API.put(
        `/admin/verify/${id}`
      );

      fetchUsers();

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  const exportPDF = () => {

    const doc =
      new jsPDF();

    doc.setFontSize(20);

    doc.text(
      "ChaloRide Verification Report",
      14,
      20
    );

    autoTable(doc, {

      startY: 35,

      head: [[
        "Name",
        "Email",
        "Department",
        "Year",
        "Status",
      ]],

      body: users.map((user) => ([

        user.name,

        user.email,

        user.department,

        user.year,

        user.isVerified
          ? "Verified"
          : "Pending",

      ])),

    });

    doc.save(
      "verification-report.pdf"
    );

  };

  return (

    <div className="min-h-screen bg-[#f5f7fb]">

      
    <AdminHeader />

    <DashboardTabs active="verifications" />

      {/* CONTENT */}
      <div className="max-w-[1450px] mx-auto px-7 py-10">

        {/* TOP */}
        <div className="flex items-center justify-between mb-10">

          <h1 className="text-3xl font-bold text-[#1e293b]">

            Student Verifications

          </h1>

          <div className="flex gap-4">

            <button className="bg-white border px-7 py-2 rounded-2xl flex items-center gap-3 text-[14px] font-semibold">

              <FiFilter />

              Filter

            </button>

            <button
              onClick={exportPDF}
              className="bg-[#7c7df6] text-white px-7 py-2 rounded-2xl flex items-center gap-3 text-[14px] font-semibold"
            >

              <FiDownload />

              Export PDF

            </button>

          </div>

        </div>

        {/* USER CARDS */}
        <div className="space-y-8">

          {users.map((user) => (

            <div
              key={user._id}
              className="bg-white rounded-[40px] border border-gray-200 p-8 flex items-center justify-between"
            >

              {/* LEFT */}
              <div className="flex items-start gap-8 flex-1">

                {/* AVATAR */}
                <div className="w-24 h-24 rounded-full bg-[#f3e8ff] flex items-center justify-center text-[#6366f1] text-3xl font-bold">

                  {user.name.charAt(0)}

                </div>

                {/* INFO */}
                <div>

                  <div className="flex items-center gap-8 mb-4">

                    <h2 className="text-2xl font-bold text-[#1e293b]">
                      {user.name}

                    </h2>

                    {!user.isVerified && (

                      <span className="bg-[#fef3c7] text-[#d97706] px-7 py-2 rounded-full text-[14px] font-semibold">

                        Pending Review

                      </span>

                    )}

                  </div>

                  <div className="space-y-4 text-[#475569] text-[16px]">

                    <p className="flex items-center gap-3">

                      <FiMail />

                      {user.email}

                    </p>

                    <p className="flex items-center gap-3">

                      <FiBookOpen />

                      {user.department}

                    </p>

                    <p className="flex items-center gap-3">

                      <FiCalendar />

                      {user.year}

                    </p>

                  </div>

                </div>

              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-6">

                {/* IMAGE */}
                <div className="text-center">

                  <p className="text-gray-500 text-[14px] mb-4">

                    Student ID Proof

                  </p>

                  <div
                    onClick={() =>
                      setPreviewImage(
                        `http://localhost:5000/uploads/${user.studentIdProof}`
                      )
                    }
                    className="w-36 h-36 rounded-[32px] overflow-hidden bg-[#f8fafc] border cursor-pointer"
                  >

                    {user.studentIdProof ? (

                      <img
                        src={`http://localhost:5000/uploads/${user.studentIdProof}`}
                        alt="ID"
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center text-gray-400">

                        No Image

                      </div>

                    )}

                  </div>

                </div>

                {/* BUTTONS */}
                <div className="flex flex-col gap-8">

                  {user.isVerified ? (

                    <button className="bg-green-100 text-green-600 px-10 py-5 rounded-2xl text-lg font-semibold w-56">

                      Verified

                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        verifyUser(user._id)
                      }
                      className="bg-[#4ade80] hover:bg-[#22c55e] text-white px-10 py-5 rounded-2xl text-lg font-semibold w-56"
                    >

                      ✓ Approve

                    </button>

                  )}

                  <button className="border border-red-300 text-red-500 px-10 py-5 rounded-2xl text-lg font-semibold w-56">

                    ✕ Reject

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* IMAGE PREVIEW */}
      {previewImage && (

        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">

          <div className="relative">

            <button
              onClick={() =>
                setPreviewImage(null)
              }
              className="absolute -top-5 -right-5 bg-white w-14 h-14 rounded-full text-lg font-semibold shadow-lg"
            >

              ×

            </button>

            <img
              src={previewImage}
              alt="Preview"
              className="max-h-[90vh] max-w-[90vw] rounded-3xl shadow-2xl"
            />

          </div>

        </div>

      )}

    </div>

  );

}