import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Payment() {

  // Ride Data
    const distance = 10;

    const petrolPrice = 105;

    const mileage = 30;

    const riderProfit = 15;

    const fuelNeeded =
        distance / mileage;

    const fuelCost =
        fuelNeeded * petrolPrice;

    const finalAmount =
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
                    {distance} km
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Distance
                  </p>

                </div>

                {/* Mileage */}
                <div className="bg-[#f8fafc] rounded-3xl p-8 text-center">

                  <h3 className="text-3xl font-bold text-[#6366f1]">
                    {mileage}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Mileage
                  </p>

                </div>

                {/* Rider Profit */}
                <div className="bg-[#f8fafc] rounded-3xl p-8 text-center">

                    <h3 className="text-3xl font-bold text-[#6366f1]">
                        ₹{riderProfit}
                    </h3>

                    <p className="text-gray-500 mt-2">
                        Rider Profit
                    </p>

                </div>

              </div>

            </div>

            {/* Cost Breakdown */}
            <div className="bg-white rounded-[36px] border p-8 shadow-sm">

              <h2 className="text-3xl font-bold mb-8">
                Fuel Calculation
              </h2>

              <div className="space-y-6 text-xl">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Petrol Price
                  </span>

                  <span className="font-bold">
                    ₹{petrolPrice}/L
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Fuel Needed
                  </span>

                  <span className="font-bold">
                    {fuelNeeded.toFixed(2)} L
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Fuel Cost
                  </span>

                  <span className="font-bold">
                    ₹{fuelCost.toFixed(2)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Rider Profit
                  </span>

                  <span className="font-bold text-green-600">
                    ₹{riderProfit}
                  </span>

                </div>

              </div>

              {/* Final Amount */}
              <div className="bg-[#eef2ff] rounded-3xl p-8 mt-10">

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-gray-500 text-xl mb-2">
                      Each Passenger Pays
                    </p>

                    <h3 className="text-3xl font-bold text-[#6366f1]">
                      ₹{finalAmount.toFixed(2)}
                    </h3>

                  </div>

                  <div className="text-7xl">
                    💰
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white rounded-[36px] border p-8 h-fit shadow-sm">

            <h2 className="text-3xl font-bold mb-8">
              Payment Information
            </h2>

            {/* Info Cards */}
            <div className="space-y-5">

              <div className="bg-[#f8fafc] rounded-3xl p-6">

                <p className="text-gray-500 text-[14px] mb-2">
                  Total Fuel Expense
                </p>

                <h3 className="text-xl font-bold text-[#1e293b]">
                  ₹{fuelCost.toFixed(2)}
                </h3>

              </div>

              <div className="bg-[#f8fafc] rounded-3xl p-6">

                <p className="text-gray-500 text-[14px] mb-2">
                  Extra Rider Profit
                </p>

                <h3 className="text-xl font-bold text-green-600">
                  ₹{riderProfit}
                </h3>

              </div>

              <div className="bg-[#eef2ff] rounded-3xl p-8 text-center">

                <p className="text-gray-500 text-xl mb-3">
                  Passenger Contribution
                </p>

                <h2 className="text-3xl font-bold text-[#6366f1]">
                  ₹{finalAmount.toFixed(2)}
                </h2>

              </div>

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