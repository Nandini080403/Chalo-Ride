import { useEffect, useState }
from "react";

import axios from "axios";

export default function RecentAlerts() {

  const [latestComplaint, setLatestComplaint] =
    useState(null);

  const [pendingCount, setPendingCount] =
    useState(0);


  // ================= FETCH DATA =================
  useEffect(() => {

    fetchAlerts();

  }, []);


  const fetchAlerts =
    async () => {

      try {

        // COMPLAINTS
        const complaintsRes =
          await axios.get(
            "http://localhost:5000/api/complaints"
          );

        const complaints =
          complaintsRes.data;

        if (
          complaints.length > 0
        ) {

          setLatestComplaint(
            complaints[0]
          );

        }


        // USERS
        const usersRes =
          await axios.get(
            "http://localhost:5000/api/admin/users"
          );

        const users =
          usersRes.data;
            console.log(users);

        const pending =
          users.filter(
            (user) =>
              !user.isVerified
          );

        setPendingCount(
          pending.length
        );

      } catch (error) {

        console.log(error);

      }

    };


  return (

    <div className="bg-white border rounded-3xl p-6">

      <h2 className="text-xl font-bold mb-6">

        Recent Alerts

      </h2>


      <div className="space-y-4">

        {/* COMPLAINT ALERT */}
        {latestComplaint && (

          <div className="bg-[#fff1f2] border border-red-100 rounded-2xl p-8">

            <h3 className="font-bold text-red-500">

              New Complaint Raised

            </h3>

            <p className="text-red-400">

              {
                latestComplaint.title
              }

            </p>

            <p className="text-red-400 mt-2">

              {
                latestComplaint
                  .reportedBy?.name ||
                "Unknown User"
              }

            </p>

          </div>

        )}


        {/* VERIFICATION ALERT */}
        <div className="bg-[#fffbeb] border border-yellow-100 rounded-2xl p-8">

          <h3 className="font-bold text-yellow-600">

            Verification Pending

          </h3>

          <p className="text-yellow-500">

            {pendingCount}
            {" "}
            students waiting for approval

          </p>

          <p className="text-yellow-500 mt-2">

            Needs admin attention

          </p>

        </div>


        {/* SYSTEM ALERT */}
        <div className="bg-[#eff6ff] border border-blue-100 rounded-2xl p-8">

          <h3 className="font-bold text-blue-600">

            System Running

          </h3>

          <p className="text-blue-500">

            All dashboard services active

          </p>

          <p className="text-blue-500 mt-2">

            Live database connected

          </p>

        </div>

      </div>

    </div>

  );

}