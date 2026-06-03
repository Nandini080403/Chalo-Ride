import { useState } from "react";
import API from "../api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FiMapPin,
  FiCalendar,
  FiActivity,
  FiPlus,
  FiAlertCircle,
} from "react-icons/fi";

export default function OfferRide() {

  // SAFE USER FETCH
  const userData =
    localStorage.getItem("user");

  let user = null;

    try {

      const userData =
        localStorage.getItem("user");

      if (
        userData &&
        userData !== "undefined"
      ) {

        user = JSON.parse(userData);

      }

    } catch (error) {

      console.log(
        "Invalid user data"
      );  

    }


  // STATES
  const [available, setAvailable] =
    useState(true);

  const [scheduleType, setScheduleType] =
    useState("one-time");

  const [selectedDays, setSelectedDays] =
    useState([]);

  const [dayTimings, setDayTimings] =
    useState({});

  const [preferences, setPreferences] =
    useState([]);

  const [from, setFrom] =
    useState("");

  const [to, setTo] =
    useState("");

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [vehicle, setVehicle] =
    useState("Bike");

  const [vehicleModel, setVehicleModel] =
    useState("");

  const [mileage, setMileage] =
    useState("");

  const [distance, setDistance] =
    useState("");

  const [seats, setSeats] =
    useState(2);

  const petrolPrice = 105;

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // TOGGLE DAY
  const toggleDay = (day) => {

    if (selectedDays.includes(day)) {

      setSelectedDays(
        selectedDays.filter(
          (d) => d !== day
        )
      );

    } else {

      setSelectedDays([
        ...selectedDays,
        day,
      ]);

    }

  };

  // DAY TIMING
  const handleDayTime = (
    day,
    value
  ) => {

    setDayTimings({
      ...dayTimings,
      [day]: value,
    });

  };

  // PREFERENCES
  const togglePreference = (pref) => {

    if (preferences.includes(pref)) {

      setPreferences(
        preferences.filter(
          (p) => p !== pref
        )
      );

    } else {

      setPreferences([
        ...preferences,
        pref,
      ]);

    }

  };

  const publishRide =
    async () => {

      try {

        await API.post(
          "/rides",
          {
            driver: user?._id,

            from,

            to,

            date,

            time, 

            vehicle,

            seats,

            fare:
              Math.round(
                ((distance / mileage) * petrolPrice ) + 15
              ),

            distance,
          }
        );

        alert("Ride Published");

      } catch (error) {

        console.log(error);

      }

    };


  return (

    <div className="bg-[#f5f7fb] min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-7 py-14">

        {/* TOP */}
        <div className="flex justify-between items-start mb-12">

          <div>

            <h1 className="text-3xl font-bold text-[#1e293b] mb-4">

              Offer a Ride

            </h1>

            <p className="text-gray-500 text-xl">

              Share your journey and help fellow students save money

            </p>

          </div>

          {/* AVAILABILITY */}
          <button
            onClick={() =>
              setAvailable(!available)
            }
            className={`px-7 py-5 rounded-2xl font-semibold transition ${
              available
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-500"
            }`}
          >

            {available
              ? "Available"
              : "Unavailable"}

          </button>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="col-span-2 bg-white rounded-[36px] shadow-lg p-6">

            {/* ROUTE */}
            <h2 className="text-3xl font-bold mb-8">

              Route Information

            </h2>

            <div className="grid grid-cols-2 gap-8 mb-10">

              <div>

                <label className="font-semibold mb-3 flex items-center gap-2">

                  <FiMapPin />

                  Starting Point

                </label>

                <input
                  type="text"
                  placeholder="Starting Point"
                  value={from}
                  onChange={(e) =>
                    setFrom(e.target.value)
                  }
                  className="w-full bg-[#f8fafc] border rounded-2xl px-7 py-5 outline-none"
                />

              </div>

              <div>

                <label className="font-semibold mb-3 flex items-center gap-2">

                  <FiMapPin />

                  Destination

                </label>

                <input
                  type="number"
                  placeholder="Distance in KM"
                  value={distance}
                  onChange={(e) =>
                    setDistance(e.target.value)
                  }
                  className="w-full bg-[#f8fafc] border rounded-2xl px-7 py-5 outline-none mt-6"
                />

              </div>

            </div>

            {/* SCHEDULE */}
            <h2 className="text-3xl font-bold mb-8">

              Schedule Type

            </h2>

            <div className="grid grid-cols-2 gap-8 mb-10">

              <button
                onClick={() =>
                  setScheduleType("one-time")
                }
                className={`border-2 rounded-3xl p-8 ${
                  scheduleType === "one-time"
                    ? "border-[#6366f1]"
                    : "border-gray-200"
                }`}
              >

                <FiCalendar className="mx-auto text-3xl text-[#6366f1] mb-5" />

                <h3 className="text-xl font-bold">

                  One-Time Ride

                </h3>

              </button>

              <button
                onClick={() =>
                  setScheduleType("recurring")
                }
                className={`border-2 rounded-3xl p-8 ${
                  scheduleType === "recurring"
                    ? "border-[#6366f1]"
                    : "border-gray-200"
                }`}
              >

                <FiActivity className="mx-auto text-3xl text-[#6366f1] mb-5" />

                <h3 className="text-xl font-bold">

                  Recurring Schedule

                </h3>

              </button>

            </div>

            {/* ONE TIME */}
            {scheduleType === "one-time" ? (

              <div className="grid grid-cols-2 gap-8 mb-10">

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="w-full bg-[#f8fafc] border rounded-2xl px-7 py-5 outline-none"
                />

                <input
                  type="time"
                  value={time}
                  onChange={(e) =>
                    setTime(e.target.value)
                  }
                  className="w-full bg-[#f8fafc] border rounded-2xl px-7 py-5 outline-none"
                />

              </div>

            ) : (

              <div className="mb-10">

                <h3 className="text-xl font-bold mb-6">

                  Weekly Availability

                </h3>

                <div className="space-y-5">

                  {weekDays.map((day) => (

                    <div
                      key={day}
                      className={`border rounded-3xl overflow-hidden ${
                        selectedDays.includes(day)
                          ? "border-[#6366f1]"
                          : "border-gray-200"
                      }`}
                    >

                      {/* CLICKABLE DAY */}
                      <div
                        onClick={() =>
                          toggleDay(day)
                        }
                        className={`px-7 py-6 flex justify-between items-center cursor-pointer ${
                          selectedDays.includes(day)
                            ? "bg-[#eef2ff]"
                            : "bg-[#f8fafc]"
                        }`}
                      >

                        <h3 className="text-xl font-semibold">

                          {day}

                        </h3>

                        <div
                          className={`w-5 h-5 rounded-full ${
                            selectedDays.includes(day)
                              ? "bg-[#6366f1]"
                              : "bg-gray-300"
                          }`}
                        ></div>

                      </div>

                      {/* TIME INPUT */}
                      {selectedDays.includes(day) && (

                        <div className="p-6 bg-[#eef2ff]">

                          <input
                            type="time"
                            value={
                              dayTimings[day] || ""
                            }
                            onChange={(e) =>
                              handleDayTime(
                                day,
                                e.target.value
                              )
                            }
                            className="w-full bg-white border rounded-2xl px-7 py-2 outline-none"
                          />

                        </div>

                      )}

                    </div>

                  ))}

                </div>

                <div className="bg-[#eef2ff] rounded-3xl p-6 mt-6 flex gap-4">

                  <FiAlertCircle className="text-xl text-[#6366f1]" />

                  <p className="text-gray-500">

                    Select days and assign different timings.

                  </p>

                </div>

              </div>

            )}

            {/* VEHICLE */}
            <h2 className="text-3xl font-bold mb-8">

              Ride Details

            </h2>

            <div className="grid grid-cols-2 gap-8 mb-10">

              <select
                value={vehicle}
                onChange={(e) =>
                  setVehicle(e.target.value)
                }
                className="bg-[#f8fafc] border rounded-2xl px-7 py-5 outline-none"
              >

                <option>Bike</option>

                <option>Scooty</option>

              </select>

              <input
                type="text"
                placeholder="Vehicle Model"
                value={vehicleModel}
                onChange={(e) =>
                  setVehicleModel(e.target.value)
                }
                className="bg-[#f8fafc] border rounded-2xl px-7 py-5 outline-none"
              />

              <input
                type="number"
                placeholder="Mileage"
                value={mileage}
                onChange={(e) =>
                  setMileage(e.target.value)
                }
                className="bg-[#f8fafc] border rounded-2xl px-7 py-5 outline-none"
              />

            </div>

            {/* NOTES */}
            <textarea
              rows="5"
              placeholder="Additional Notes"
              className="w-full bg-[#f8fafc] border rounded-3xl px-7 py-5 outline-none resize-none mb-10"
            ></textarea>

            {/* BUTTON */}
            <button
              onClick={publishRide}
              className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white py-6 rounded-3xl font-bold text-xl flex items-center justify-center gap-3"
            >

              <FiPlus />

              Publish Ride

            </button>

          </div>

          {/* RIGHT */}
          <div>

            <div className="bg-white rounded-[32px] shadow-lg p-8">

              <h2 className="text-xl font-bold mb-8">

                Rider Preferences

              </h2>

              <div className="space-y-4">

                {[
                  "Same department only",
                  "Same year/batch only",
                  "Auto-approve requests",
                ].map((pref) => (

                  <button
                    key={pref}
                    onClick={() =>
                      togglePreference(pref)
                    }
                    className={`w-full text-left px-7 py-2 rounded-2xl font-semibold border transition ${
                      preferences.includes(pref)
                        ? "bg-[#6366f1] text-white border-[#6366f1]"
                        : "bg-[#f8fafc] border-gray-200"
                    }`}
                  >

                    {pref}

                  </button>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );

}