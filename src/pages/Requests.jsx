
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

import {
  useState,
  useEffect,
} from "react";



import {
  FiInbox,
  FiCheck,
  FiX,
} from "react-icons/fi";

export default function Requests() {

  const [activeTab, setActiveTab] =
    useState("pending");

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [requests, setRequests] =
    useState([]);

  const fetchRequests =
    async () => {

      try {

        const res =
          await axios.get(

            `http://localhost:5000/api/requests/driver/${user._id}`

          );

        setRequests(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchRequests();

  }, []);

  const pendingRequests =
    requests.filter(
      (req) =>
        req.status === "pending"
    );

  const acceptedRequests =
    requests.filter(
      (req) =>
        req.status === "accepted"
    );  

  const rejectedRequests =
    requests.filter(
      (req) =>
        req.status === "rejected"
    );
    

  const updateRequestStatus =
    async (
      requestId,
      status
    ) => {

      try {

        await axios.put(

          `http://localhost:5000/api/requests/${requestId}`,

            { status }

        );

        fetchRequests();

      } catch (error) {

        console.log(error);

      }

    };

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
                {pendingRequests.length}
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
                {acceptedRequests.length}
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
                {rejectedRequests.length}
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
            Pending ({pendingRequests.length})
          </button>

          <button
            onClick={() =>
              updateRequestStatus(
                request._id,
                "accepted"
              ) 
            }
            className="
              bg-green-500
              hover:bg-green-600
               transition
              text-white
              px-7
              py-5
              rounded-2xl
              text-xl
              font-semibold
            "
          >

            ✓ Accept

          </button>

          <button
            onClick={() =>
              updateRequestStatus(
                request._id,
                "rejected"
              )
            }
            className="
              border-2
              border-red-400
              text-red-500
              hover:bg-red-50
              transition
              px-7
              py-5
              rounded-2xl
              text-xl
              font-semibold
            "
          >   

            ✕ Reject

          </button>
        </div>

        {/* Request Card */}
        
        <div className="space-y-6">

          {(activeTab === "pending"
            ? pendingRequests
            : activeTab === "accepted"
            ? acceptedRequests
            : rejectedRequests
          ).map((request, index) => (

            <div
              key={index}
              className="
                bg-white
                border
                rounded-[40px]
                p-6
                shadow-sm
              "
            >

              <div className="flex justify-between gap-6">

                {/* LEFT */}
                <div className="flex-1">

                  <div className="flex items-center gap-4 mb-4">

                    <div className="
                      w-16
                      h-16
                      rounded-full
                      bg-[#6366f1]
                      flex
                      items-center
                      justify-center
                      text-white
                      font-bold
                      text-2xl
                    ">

                      {request.rider?.name
                        ?.charAt(0)}

                    </div>


                    <div>

                      <h2 className="
                        text-2xl
                        font-bold
                        text-[#1e293b]
                      ">

                        {request.rider?.name}

                      </h2>

                      <p className="text-gray-500">

                        {request.rider?.department}
                        {" • "}
                        {request.rider?.year}

                      </p>

                    </div>

                  </div>


                  {/* RIDE DETAILS */}
                  <div className="
                    bg-[#f8fafc]
                    rounded-[28px]
                    p-8
                    grid
                    grid-cols-2
                    gap-8
                  ">

                    <div>

                      <p className="
                        text-gray-400
                        text-[14px]
                        mb-2
                      ">

                        Route

                      </p>

                     <h3 className="
                        text-xl
                       font-semibold
                      ">

                        {request.ride?.from}
                        {" → "}
                        {request.ride?.to}

                      </h3>

                    </div>


                    <div>

                      <p className="
                        text-gray-400
                        text-[14px]
                        mb-2
                      ">

                        Time

                      </p>

                      <h3 className="
                        text-xl
                        font-semibold
                      ">

                        {request.ride?.time}

                      </h3>

                    </div>


                    <div>

                      <p className="
                        text-gray-400
                        text-[14px]
                        mb-2
                      ">

                        Vehicle

                      </p>

                      <h3 className="
                        text-xl
                        font-semibold
                      ">

                        {request.ride?.vehicle}

                      </h3>

                    </div>


                    <div>

                      <p className="
                        text-gray-400
                        text-[14px]
                        mb-2
                      ">

                        Price

                      </p>

                      <h3 className="
                        text-xl
                        font-semibold
                      ">

                        ₹{request.ride?.fare}

                      </h3>

                    </div>

                  </div>

                </div>


                {/* RIGHT */}
                {request.status === "pending" && (

                  <div className="
                    flex
                    flex-col
                    gap-8
                    min-w-[220px]
                  ">

                    <button
                      className="
                        bg-green-500
                        hover:bg-green-600
                        transition
                        text-white
                        px-7
                        py-5
                        rounded-2xl
                        text-xl
                        font-semibold
                      "
                    >

                      ✓ Accept

                    </button>

                    <button
                      className="
                        border-2
                        border-red-400
                        text-red-500
                        hover:bg-red-50
                        transition
                        px-7
                        py-5
                        rounded-2xl
                        text-xl
                        font-semibold
                      "
                    >

                      ✕ Reject

                    </button>

                  </div>

                )}

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