import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import axios from "axios";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

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

  const [user, setUser] =
    useState(null); 

  const [rides, setRides] =
    useState([]);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [bio, setBio] =
    useState("");

  const [vehicle, setVehicle] =
    useState("");

  const [preferredRoute, setPreferredRoute] =
    useState("");

  const [availability, setAvailability] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("overview");

  const navigate =
    useNavigate();

  const totalEarnings =
    rides.reduce(

      (total, ride) =>

        total + ride.fare,

      0

    );

  const activeRides =
    rides.filter(
      (ride) =>
        ride.status === "active"
    ).length;


  useEffect(() => {

    const storedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    setUser(storedUser);

    setBio(
      storedUser.bio || ""
    );

    setVehicle(
      storedUser.vehicle || ""
    );

    setPreferredRoute(
      storedUser.preferredRoute || ""
    );

    setAvailability(
      storedUser.availability || ""
    );

    fetchUserRides(
      storedUser._id
    );

  }, []);

  const handleProfileUpdate =
    async () => {

      try {

        const res =
          await axios.put(

            `http://localhost:5000/api/auth/profile/${user._id}`,

            {
              bio,
              vehicle,
              preferredRoute,
              availability,
            }

          );

        setUser(
          res.data
        );  

        localStorage.setItem(

          "user",

          JSON.stringify(
            res.data
          )

        );

        setShowEditModal(
          false
        );  

      } catch (error) {

        console.log(error);

      }

    };

  const fetchUserRides =
    async (userId) => {

      try {

        const res =
          await axios.get(

            `http://localhost:5000/api/rides/user/${userId}`

          );

        setRides(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  if (!user) {

    return (

      <div className="p-10">

        Loading...

      </div>

    );

  }

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
              <div className="w-20 h-20 rounded-full bg-[#6366f1] flex items-center justify-center text-white text-3xl font-bold">

                {user.name?.charAt(0)}

              </div>
            </div>

            {/* User Info */}
            <div>
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-3xl font-bold text-[#1e293b]">
                  {user.name}
                </h1>

                <span className="bg-[#eef2ff] text-[#6366f1] px-4 py-2 rounded-full text-base font-semibold">
                  {
                    user.isVerified
                      ? "Verified Student"
                      : "Verification Pending"
                  }
                </span>
              </div>

              <p className="text-gray-500 text-[14px] mb-4">
                {user.department} • {user.year}
              </p>

                <div className="flex flex-wrap gap-6 text-gray-500">

                <div className="flex items-center gap-2">
                  <FiCalendar />
                    Member since 2026
                </div>

                <div className="flex items-center gap-2">
                  <FiMail />
                  {user.email}
                </div>

              </div>
            </div>
          </div>

          <button
            onClick={() =>
              setShowEditModal(true)
            }
            className="
              bg-[#6366f1]
              text-white
              px-6
              py-3
              rounded-2xl
              font-semibold
              hover:opacity-90
              transition
            "
          >

            Edit Profile

          </button>

          {/* Rating */}
          <div className="bg-[#f8fafc] rounded-3xl p-8 text-center min-w-[180px]">
            <h2 className="text-3xl font-bold text-[#6366f1]">

              {rides.length}

            </h2>

            

            <p className="text-gray-500">

              Total Rides

            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          {[
            {
              value: rides.length,
              label: "Rides Offered",
              color: "text-[#6366f1]",
            },

            {
              value: activeRides,
              label: "Active Rides",
              color: "text-green-500",
            },

            {
              value: `₹${totalEarnings}`,
              label: "Total Earnings",
              color: "text-pink-500",
            },

            {
              value: user.isVerified
                ? "Yes"
                : "No",

              label: "Verified",

              color: "text-emerald-500",
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
          <button
            onClick={() =>
              setActiveTab("overview")
            }
            className={`

              px-10
              py-2
              rounded-2xl
              font-semibold
              flex-1

              ${
                activeTab === "overview"

                  ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"

                  : "text-gray-500"
              }

            `}
          >

            Overview

          </button>

          <button
            onClick={() =>
              setActiveTab("rides")
            }
            className={`

              px-10
              py-2        
              rounded-2xl
              font-semibold
              flex-1

              ${
                activeTab === "rides"

                  ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"

                  : "text-gray-500"
              }

            `}
          >

            Ride History

          </button>

          <button
            onClick={() =>
                setActiveTab("reviews")
            }
            className={`

              px-10
              py-2
              rounded-2xl
              font-semibold
              flex-1

              ${
                activeTab === "reviews"

                  ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"

                  : "text-gray-500"
              }

            `}
          >

            Reviews

          </button>

          <button
            onClick={() =>
              setActiveTab("settings")
            }
            className={`

              px-10
              py-2
              rounded-2xl
              font-semibold
              flex-1

              ${
                activeTab === "settings"

                  ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"

                  : "text-gray-500"
            
              }

            `}
          >

            Settings

        </button>

        </div>

        {/* Grid Layout */}
        {activeTab === "overview" && (

          <div className="grid grid-cols-3 gap-8 mt-8">
          
          {/* Left Side */}
          <div className="col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-3xl border p-8">
              <h2 className="text-xl font-bold mb-5 text-[#1e293b]">
                About Me
              </h2>

              <p className="text-gray-500 leading-8 text-[14px]">
                {bio || "No bio added yet."}
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
                    {vehicle || "No vehicle added"}
                  </h3>
                </div>

                <div className="bg-[#f8fafc] rounded-2xl p-8">
                  <p className="text-gray-400 mb-2">
                    Usual Route
                  </p>

                  <h3 className="font-bold text-[14px]">
                    {preferredRoute || "No route added"}
                  </h3>
                </div>
              </div>

              <div className="bg-[#fef2f2] rounded-2xl p-8">
                <p className="text-gray-400 mb-2">
                  Availability
                </p>

                <h3 className="font-bold text-[14px]">
                  {availability || "No availability added"}
                </h3>
              </div>
            </div>

            {/* Recent Rides */}
            <div className="bg-white rounded-3xl border p-8">
              <h2 className="text-xl font-bold mb-8 text-[#1e293b]">
                Recent Rides
              </h2>

              <div className="space-y-4">
              
                {rides.map((ride, index) => (
                  <div
                    key={index}
                    className="bg-[#f8fafc] rounded-2xl p-8 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-bold text-[14px]">
                        {ride.from} → {ride.to}
                      </h3>

                      <p className="text-gray-500">
                        {ride.date} • {ride.time}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`px-4 py-2 rounded-full text-base font-semibold ${
                           "bg-[#dcfce7] text-[#16a34a]"
                        }`}
                      >
                        Offered
                      </span>

                      <p className="font-bold text-xl">
                        ₹{ride.fare}
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

               {[
                  user.isVerified &&
                    "Verified Student",

                  rides.length > 0 &&
                   "Active Rider",

                  rides.length >= 5 &&
                    "Frequent Rider",

                  totalEarnings > 0 &&
                    "Earning Driver",

                ].filter(Boolean).map((item, index) => (

                  <div
                    key={index}
                    className="
                    bg-[#eef2ff]
                    text-[#6366f1]
                    rounded-2xl
                    p-8
                    text-center
                    font-semibold
                  "
                >

                  {item}

                </div>

              ))}

            </div>

          </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl border p-8">
              <h2 className="text-xl font-bold mb-6">
                Quick Actions
              </h2>

              <div className="space-y-4">
                <button
                  onClick={() =>
                    navigate("/find-ride")
                  }
                  className="w-full bg-[#eef2ff] text-[#6366f1] py-2 rounded-2xl font-semibold flex items-center justify-center gap-3"
                >

                  <FiSearch />

                  Find a Ride

                </button>

                <button
                  onClick={() =>
                    navigate("/offer-ride")
                  }
                  className="w-full bg-[#fee2e2] text-[#ef4444] py-2 rounded-2xl font-semibold flex items-center justify-center gap-3"
                >

                  <FiPlus />

                  Offer a Ride

                </button>

                <button
                  onClick={() =>
                    navigate("/payment")
                  }
                  className="w-full bg-[#dcfce7] text-[#16a34a] py-2 rounded-2xl font-semibold flex items-center justify-center gap-3"
                >

                  <FiCreditCard />

                  View Payments

                </button>
              </div>
             </div>
          </div>
        </div>

      )}

      {activeTab === "rides" && (

      <div className="mt-8">

        <div className="
          bg-white
          rounded-3xl
          border
          p-8
        ">

          <h2 className="
            text-2xl
            font-bold
            mb-8
          ">

            Ride History

          </h2>


          <div className="space-y-4">

            {rides.length > 0 ? (

              rides.map((ride, index) => (

                <div
                  key={index}
                  className="
                    bg-[#f8fafc]
                    rounded-2xl
                    p-6
                    flex
                    justify-between
                    items-center
                  "
                >

                  <div>

                    <h3 className="
                      font-bold
                      text-lg
                    ">

                      {ride.from} → {ride.to}

                    </h3>

                    <p className="text-gray-500">

                      {ride.date} • {ride.time}

                    </p>

                  </div>


                  <div className="text-right">

                    <p className="
                      font-bold
                      text-xl
                    ">

                      ₹{ride.fare}

                    </p>

                    <p className="
                      text-green-500
                      font-semibold
                    ">

                      {ride.status}

                    </p>

                  </div>

                </div>

              ))

            ) : (

              <div className="
                text-center
                text-gray-500
                py-10
              ">

                No rides found

              </div>

            )}

          </div>

        </div>

      </div>

    )}

    {activeTab === "reviews" && (

      <div className="mt-8">

        <div className="
          bg-white
          rounded-3xl
          border
          p-8
        ">

          <h2 className="
            text-2xl
            font-bold
            mb-8
          ">

            Reviews

          </h2>


          <div className="
            text-center
            py-16
          ">

            <div className="
              text-6xl
              mb-4
            ">

              ⭐

            </div>

            <h3 className="
              text-2xl
              font-bold
              mb-3
            ">

              No Reviews Yet

            </h3>

            <p className="text-gray-500">

              User reviews will appear here
              after completed rides.

            </p>

          </div>

        </div>

      </div>

    )}

    {activeTab === "settings" && (

      <div className="mt-8">

        <div className="
          bg-white
          rounded-3xl
          border
          p-8
        ">

          <h2 className="
            text-2xl
            font-bold
            mb-8
          ">

            Account Settings

          </h2>


          <div className="space-y-6">

            <div className="
              bg-[#f8fafc]
              rounded-2xl
              p-6
              flex
              justify-between
              items-center
            ">

              <div>

                <h3 className="font-bold">

                  Email Address

                </h3>

                <p className="text-gray-500">

                  {user.email}

                </p>

              </div>

            </div>


            <div className="
              bg-[#f8fafc]
              rounded-2xl
              p-6
              flex
              justify-between
              items-center
            ">

              <div>

                <h3 className="font-bold">

                  Department

                </h3>

                <p className="text-gray-500">

                  {user.department}

                </p>

              </div>

            </div>


            <div className="
              bg-[#f8fafc]
              rounded-2xl
              p-6
              flex
              justify-between
              items-center
            ">

              <div>

                <h3 className="font-bold">

                  Verification Status

                </h3>

                <p className="text-gray-500">

                  {
                    user.isVerified

                      ? "Verified"

                      : "Pending"
                  }

                </p>

              </div>

            </div>

          </div>

          <button
            onClick={() => {

              localStorage.removeItem(
                "user"
              );

              navigate("/login");

            }}
            className="
              w-full
              bg-red-500
              text-white
              py-4
              rounded-2xl
              font-semibold
              mt-6
              hover:bg-red-600
              transition
            "
          >

            Logout

          </button>

        </div>

      </div>

    )}

      </div>

      {showEditModal && (

        <div className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-50
        ">

          <div className="
            bg-white
            rounded-3xl
            p-8
            w-[500px]
          ">

            <h2 className="
              text-2xl
              font-bold
              mb-6
            ">

              Edit Profile

            </h2>


            {/* BIO */}
            <textarea
              value={bio}
              onChange={(e) =>
                setBio(e.target.value)
              }
              placeholder="Write something about yourself"
              className="
                w-full
                border
                rounded-2xl
                p-4
                mb-4
                outline-none
              "
            />  


            {/* VEHICLE */}
            <input
              type="text"
              value={vehicle}
              onChange={(e) =>
                setVehicle(e.target.value)
              }
              placeholder="Vehicle"
              className="
                w-full
                border
                rounded-2xl
                p-4
                mb-4
                outline-none
              "
            />


            {/* ROUTE */}
            <input
              type="text"
              value={preferredRoute}
              onChange={(e) =>
                setPreferredRoute(
                  e.target.value
                )
              }
              placeholder="Preferred Route"
              className="
                w-full
                border    
                rounded-2xl
                p-4
                mb-4
                outline-none
              "
            />


            {/* AVAILABILITY */}
            <input
              type="text"
              value={availability}
              onChange={(e) =>
                setAvailability(
                  e.target.value
                )
              }
              placeholder="Availability"
              className="
                w-full
                border
                rounded-2xl
                p-4
                mb-6
                outline-none
              "
            />


            {/* BUTTONS */}
            <div className="
              flex
              justify-end
              gap-4
            ">

              <button
                onClick={() =>
                  setShowEditModal(false)
                }
                className="
                  px-6
                  py-3
                  rounded-2xl
                  border
                "
              >

                Cancel

              </button>


              <button
                onClick={
                  handleProfileUpdate
                }
                className="
                  px-6
                  py-3
                  rounded-2xl
                  bg-[#6366f1]
                  text-white
                  font-semibold
                "
              >

                Save Changes

              </button>

            </div>

          </div>

        </div>

      )}


      {/* Footer */}
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}