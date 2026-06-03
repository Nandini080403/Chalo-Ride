import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import axios from "axios";

import {
  useEffect,
  useState,
} from "react";

export default function Payment() {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    const [rides, setRides] =
      useState([]);

    const fetchRides =
      async () => {

        try {

          const res =
            await axios.get(

              `http://localhost:5000/api/requests/driver/${user._id}`

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

    const acceptedRides =
      rides.filter(
        (ride) =>
          ride.status ===
          "accepted"
      );

    const totalEarnings =
      acceptedRides.reduce(

        (total, ride) =>

          total +
          ride.ride?.fare,

        0
      );


    const totalRides =
      acceptedRides.length;

    const distance =
      acceptedRides[0]?.ride?.distance || 0;

    const mileage = 30;

    const petrolPrice = 105;

    const riderProfit = 15;

    const fuelNeeded =
      distance / mileage;

    const fuelCost =
      fuelNeeded * petrolPrice;

    const passengerAmount =
      fuelCost + riderProfit;

  return (
    <div className="bg-[#f6f7fb] min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <div className="max-w-7xl mx-auto px-7 py-14">

        {/* Heading */}
        <div className="text-center mb-14">

          <div className="text-7xl mb-6">
            🛵
          </div>

          <h1 className="text-3xl font-bold text-[#1e293b]">
            Ride Completed!
          </h1>

          <p className="text-gray-500 text-xl mt-4">
            Fuel contribution calculated successfully
          </p>

        </div>



        {/* Layout */}
        <div className="grid grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="col-span-2 space-y-8">

            {/* Trip Summary */}
            <div className="bg-white rounded-[36px] border p-8 shadow-sm">

              <h2 className="text-3xl font-bold mb-8">
                Trip Summary
              </h2>

              <div className="grid grid-cols-3 gap-8">

                {/* Distance */}
                <div className="bg-[#f8fafc] rounded-3xl p-8 text-center">

                  <h3 className="text-3xl font-bold text-[#6366f1]">
                    {totalRides}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Total Rides
                  </p>

                </div>

                {/* Mileage */}
                <div className="bg-[#f8fafc] rounded-3xl p-8 text-center">

                  <h3 className="text-3xl font-bold text-[#6366f1]">
                    ₹{totalEarnings}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Total Earnings
                  </p>

                </div>

                {/* Rider Profit */}
                <div className="bg-[#f8fafc] rounded-3xl p-8 text-center">

                    <h3 className="text-3xl font-bold text-[#6366f1]">
                        ₹{
                          totalRides > 0
                            ? (
                              totalEarnings /
                              totalRides
                              ).toFixed(0)
                            : 0
                          }
                    </h3>

                    <p className="text-gray-500 mt-2">
                        Average Fare
                    </p>

                </div>

              </div>

            </div>

          </div>
                  

          {/* RIGHT SIDE */}
          <div className="bg-white rounded-[36px] border p-8 h-fit shadow-sm">

            <h2 className="text-3xl font-bold mb-8">
              Payment Information
            </h2>

            <div className="space-y-5 mb-8">

              <div className="bg-[#f8fafc] rounded-3xl p-6 flex justify-between">

                <span className="text-gray-500">
                  Distance
                </span>

                <span className="font-bold">
                  {distance} km
                </span>

              </div>


              <div className="bg-[#f8fafc] rounded-3xl p-6 flex justify-between">

                <span className="text-gray-500">
                  Mileage
                </span>

                <span className="font-bold">
                  {mileage} km/L
                </span>

              </div>


              <div className="bg-[#f8fafc] rounded-3xl p-6 flex justify-between">

                <span className="text-gray-500">
                  Fuel Cost
                </span>

                <span className="font-bold">
                  ₹{fuelCost.toFixed(0)}
                </span>

              </div>


              <div className="bg-[#f8fafc] rounded-3xl p-6 flex justify-between">

                <span className="text-gray-500">
                  Rider Profit
                </span>

                <span className="font-bold text-green-600">
                  ₹{riderProfit}
                </span>

              </div>

            </div>

            <div className="bg-[#eef2ff] rounded-3xl p-8 text-center">

              <p className="text-gray-500 text-xl mb-3">
                Passenger Contribution
              </p>

              <h2 className="text-4xl font-bold text-[#6366f1]">

                ₹{passengerAmount.toFixed(0)}

              </h2>

            </div>

                

            {/* Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-6 mt-8">

              <p className="text-yellow-700 text-[14px] leading-8">
                Payments are handled personally
                between riders and passengers
                using UPI or cash. ChaloRide
                does not process payments.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}