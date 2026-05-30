import { useEffect, useState } from "react";

import axios from "axios";

import AdminHeader from "../components/admin/AdminHeader";
import DashboardTabs from "../components/admin/DashboardTabs";

import {
  FiFilter,
  FiEye,
  FiCheck,
  FiUserX,
} from "react-icons/fi";

export default function AdminComplaints() {

  const [complaints, setComplaints] =
    useState([]);

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  const [filter, setFilter] =
    useState("all");


  // ================= FETCH =================
  useEffect(() => {

    fetchComplaints();

  }, []);


  const fetchComplaints = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/complaints"
        );

      setComplaints(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };


  // ================= INVESTIGATE =================
  const handleInvestigate =
    (complaint) => {

      setSelectedComplaint(
        complaint
      );

    };


  // ================= RESOLVE =================
  const handleResolve =
    async (id) => {

      try {

        await axios.put(
          `http://localhost:5000/api/complaints/resolve/${id}`
        );

        fetchComplaints();

      } catch (error) {

        console.log(error);

      }

    };


  // ================= SUSPEND =================
  const handleSuspend =
    async (id) => {

      try {

        await axios.put(
          `http://localhost:5000/api/complaints/suspend/${id}`
        );

        fetchComplaints();

      } catch (error) {

        console.log(error);

      }

    };


    const filteredComplaints =
      complaints.filter((complaint) => {

        if (filter === "all") {

          return true;

        }

        if (filter === "pending") {

          return !complaint.status;

        }

        return (
          complaint.status === filter
        );

      });


  return (

    <div className="min-h-screen bg-[#f5f7fb]">

      {/* HEADER */}
      <AdminHeader />

      {/* TABS */}
      <DashboardTabs active="complaints" />

      {/* CONTENT */}
      <div className="max-w-[1450px] mx-auto px-8 py-8">

        {/* TOP */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-[#1e293b]">

            Complaints Management

          </h1>

          <div className="bg-white border border-[#e2e8f0] rounded-2xl px-5 py-4 flex items-center gap-3">

           <FiFilter />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value
                )
              }
              className="outline-none bg-transparent font-semibold"
            >

              <option value="all">

                All Complaints

              </option>

              <option value="pending">

                Pending

              </option>

              <option value="resolved">

                Resolved

              </option>

              <option value="suspended">

                Suspended

              </option>

            </select>

          </div>

        </div>


        {/* EMPTY */}
        {complaints.length === 0 && (

          <div className="bg-white rounded-[32px] border border-[#e2e8f0] p-12 text-center text-gray-500 font-semibold">

            No complaints found

          </div>

        )}


        {/* CARDS */}
        <div className="space-y-6">

          {filteredComplaints.map((complaint) => (

            <div
              key={complaint._id}
              className={`border rounded-[32px] p-8 flex justify-between gap-6

              ${
                complaint.status === "suspended"
                  ? "bg-red-50 border-red-200"

                  : complaint.status === "resolved"
                  ? "bg-green-50 border-green-200"

                  : "bg-white border-[#e2e8f0]"
              }`}
            >

              {/* LEFT */}
              <div className="flex-1">

                <h2 className="text-2xl font-bold text-[#1e293b] mb-6">

                  {complaint.title}

                </h2>


                {/* USERS */}
                <div className="grid grid-cols-2 gap-6 mb-6">

                  <div>

                    <p className="text-gray-500 mb-2 text-[14px]">

                      Reported By:

                    </p>

                    <p className="font-bold text-[#1e293b]">

                      {
                        complaint.reportedBy?.name ||
                        "Unknown User"
                      }

                    </p>

                  </div>


                  <div>

                    <p className="text-gray-500 mb-2 text-[14px]">

                      Against:

                    </p>

                    <p className="font-bold text-[#1e293b]">

                      {
                        complaint.against?.name ||
                        "Unknown User"
                      }

                    </p>

                  </div>

                </div>


                {/* DESCRIPTION */}
                <div className="bg-[#f8fafc] rounded-2xl p-6">

                  <p className="text-gray-500 mb-3">

                    Description

                  </p>

                  <p className="text-[#1e293b] leading-7">

                    {complaint.description}

                  </p>

                </div>


                {/* DATE */}
                <p className="text-gray-400 mt-5">

                  Filed on{" "}

                  {new Date(
                    complaint.createdAt
                  ).toLocaleDateString(
                    "en-GB"
                  )}

                </p>

              </div>


              {/* ACTIONS */}
              <div className="flex flex-col gap-4 min-w-[220px]">

                {/* INVESTIGATE */}
                <button
                  onClick={() =>
                    handleInvestigate(
                      complaint
                    )
                  }
                  className="bg-[#8b5cf6] text-white px-7 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold hover:opacity-90 transition"
                >

                  <FiEye />

                  Investigate

                </button>


                {/* RESOLVE */}
                <button
                  onClick={() =>
                    handleResolve(
                      complaint._id
                    )
                  }
                  className="bg-[#dcfce7] text-[#16a34a] px-7 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold hover:bg-[#bbf7d0] transition"
                >

                  <FiCheck />

                  Resolve

                </button>


                {/* SUSPEND */}
                <button
                  onClick={() =>
                    handleSuspend(
                      complaint._id
                    )
                  }
                  className="bg-[#fee2e2] text-[#dc2626] px-7 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold hover:bg-[#fecaca] transition"
                >

                  <FiUserX />

                  Suspend User

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* MODAL */}
      {selectedComplaint && (

        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

          <div className="bg-white rounded-[32px] p-10 w-[700px] relative">

            {/* CLOSE */}
            <button
              onClick={() =>
                setSelectedComplaint(
                  null
                )
              }
              className="absolute top-5 right-5 w-12 h-12 rounded-full bg-[#f1f5f9] text-2xl font-bold"
            >

              ×

            </button>


            <h2 className="text-3xl font-bold text-[#1e293b] mb-8">

              Complaint Investigation

            </h2>


            <div className="space-y-6">

              {/* TITLE */}
              <div>

                <p className="text-gray-500 mb-2">

                  Complaint Title

                </p>

                <h3 className="text-2xl font-bold text-[#1e293b]">

                  {selectedComplaint.title}

                </h3>

              </div>


              {/* USERS */}
              <div className="grid grid-cols-2 gap-6">

                <div>

                  <p className="text-gray-500 mb-2">

                    Reported By

                  </p>

                  <p className="font-bold text-[#1e293b]">

                    {
                      selectedComplaint
                        .reportedBy?.name
                    }

                  </p>

                </div>


                <div>

                  <p className="text-gray-500 mb-2">

                    Against

                  </p>

                  <p className="font-bold text-[#1e293b]">

                    {
                      selectedComplaint
                        .against?.name
                    }

                  </p>

                </div>

              </div>


              {/* DESCRIPTION */}
              <div>

                <p className="text-gray-500 mb-3">

                  Description

                </p>

                <div className="bg-[#f8fafc] rounded-2xl p-6 leading-7 text-[#1e293b]">

                  {
                    selectedComplaint
                      .description
                  }

                </div>

              </div>


              {/* STATUS */}
              <div>

                <p className="text-gray-500 mb-2">

                  Current Status

                </p>

                <span
                  className={`px-5 py-2 rounded-full font-semibold

                  ${
                    selectedComplaint.status === "resolved"
                      ? "bg-green-100 text-green-600"

                      : selectedComplaint.status === "suspended"
                      ? "bg-red-100 text-red-600"

                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >

                  {
                    selectedComplaint.status
                  }

                </span>

              </div>


              {/* DATE */}
              <div>

                <p className="text-gray-500 mb-2">

                  Filed On

                </p>

                <p className="font-semibold text-[#1e293b]">

                  {new Date(
                    selectedComplaint.createdAt
                  ).toLocaleDateString(
                    "en-GB"
                  )}

                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}