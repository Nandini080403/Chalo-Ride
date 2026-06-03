
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

import {
  useEffect,
  useState,
} from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import {
  FiNavigation,
  FiPhone,
  FiMessageCircle,
  FiMapPin,
  FiShield,
  FiX,
} from "react-icons/fi";

export default function ActiveRide() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [activeRides, setActiveRides] =
    useState([]);

  const currentRide =
    activeRides.find(
      (ride) =>
        ride.status ===
        "accepted"
    );

  const fetchActiveRides =
    async () => {

      try {

        const res =
          await axios.get(

            `http://localhost:5000/api/requests/driver/${user._id}`

          );

        setActiveRides(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };  

  useEffect(() => {

    fetchActiveRides();

  }, []);

  return (
    <div className="bg-[#f5f7fb] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-7 py-14">
        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[#1e293b] mb-3">
            Active Ride
          </h1>

          <p className="text-gray-500 text-xl">
            Navigate to pickup location and complete the ride
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="col-span-2 space-y-8">
            {/* MAP CARD */}
            <div className="bg-white rounded-[32px] border overflow-hidden shadow-sm">
              {/* Header */}
              <div className="p-8 border-b">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#eef2ff] flex items-center justify-center text-[#6366f1] text-xl">
                    <FiNavigation />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-[#1e293b]">
                      Navigate to Pickup
                    </h2>

                    <p className="text-gray-500 text-[14px]">
                      {currentRide?.ride?.from}
                      {" → "}
                      {currentRide?.ride?.to}
                    </p>
                  </div>
                </div>
              </div>

              {/* MAP */}
              <div className="h-[500px] w-full">

                <MapContainer
                  center={[12.9716, 77.5946]}
                  zoom={13}
                  style={{
                   height: "500px",
                    width: "500px",
                  }}
                >

                 <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Marker
                    position={[12.9716, 77.5946]}
                  >

                    <Popup>
                      Pickup Location
                    </Popup>

                  </Marker>

                </MapContainer>

              </div>

              {/* Button */}
              <div className="p-8">
                <button className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white py-5 rounded-2xl text-xl font-semibold">
                  Open in Google Maps
                </button>
              </div>
            </div>

            {/* ROUTE DETAILS */}
            <div className="bg-white rounded-[32px] border p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#1e293b] mb-8">
                Route Details
              </h2>

              <div className="space-y-8">
                <div>
                  <p className="text-gray-400 text-[14px] mb-2">Start</p>

                  <h3 className="text-xl font-semibold text-[#1e293b]">
                    Your Current Location
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400 text-[14px] mb-2">
                    Pickup Passenger
                  </p>

                  <h3 className="text-xl font-semibold text-[#1e293b]">
                    {currentRide?.ride?.from}
                    {" → "}
                    {currentRide?.ride?.to}
                  </h3>

                  <p className="text-gray-500 text-[14px] mt-2">
                    Expected: {currentRide?.ride?.time}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-[14px] mb-2">
                    Ride Fare
                  </p>

                  <h3 className="text-xl font-semibold text-[#1e293b]">
                    ₹{currentRide?.ride?.fare}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            {/* Passenger */}
            <div className="bg-white rounded-[32px] border p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#1e293b] mb-8">
                Passenger Details
              </h2>

              <div className="flex flex-col items-center text-center">
                <div className="
                  w-32
                  h-32
                  rounded-full
                  bg-[#6366f1]
                  flex
                  items-center
                  justify-center
                  text-white
                  text-5xl
                  font-bold
                  mb-5
                ">

                  {currentRide?.rider?.name
                    ?.charAt(0)}

                </div>

                <h3 className="text-xl font-bold text-[#1e293b]">
                  {currentRide?.rider?.name}
                </h3>

                <p className="text-gray-500 text-[14px] mt-2">
                  {currentRide?.driver?.department}
                  {" • "}
                  {currentRide?.driver?.year}
                </p>

                <p className="text-[#f59e0b] text-xl mt-4">
                  ★ 4.8 / 5.0
                </p>
              </div>

              <div className="mt-10 space-y-4">
                <button className="w-full bg-[#eef2ff] text-[#6366f1] py-2 rounded-2xl text-xl font-semibold flex items-center justify-center gap-3">
                  <FiPhone />
                  Call Passenger
                </button>

                <button className="w-full border py-2 rounded-2xl text-xl font-semibold flex items-center justify-center gap-3">
                  <FiMessageCircle />
                  Send Message
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-[32px] border p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#1e293b] mb-8">
                Ride Actions
              </h2>

              <div className="space-y-4">
                <button className="w-full bg-green-500 text-white py-5 rounded-2xl text-xl font-semibold">
                  Start Ride
                </button>

                <button className="w-full border border-red-300 text-red-500 py-5 rounded-2xl text-xl font-semibold flex items-center justify-center gap-3">
                  <FiX />
                  Cancel Ride
                </button>
              </div>
            </div>

            {/* Safety */}
            <div className="bg-[#fff7ed] rounded-[32px] border border-orange-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <FiShield className="text-orange-500 text-xl" />

                <h2 className="text-xl font-bold text-[#1e293b]">
                  Safety Tips
                </h2>
              </div>

              <ul className="space-y-4 text-gray-600 text-[14px]">
                <li>• Verify passenger identity</li>
                <li>• Follow traffic rules</li>
                <li>• Keep emergency contacts ready</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


