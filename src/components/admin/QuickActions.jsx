import {
  FiShield,
  FiAlertTriangle,
  FiDownload,
  FiChevronRight,
} from "react-icons/fi";

import { Link } from "react-router-dom";

export default function QuickActions() {

  return (

    <div className="bg-white rounded-[32px] border border-[#e2e8f0] p-8">

      <h2 className="text-3xl font-bold text-[#1e293b] mb-8">

        Quick Actions

      </h2>


      <div className="space-y-5">

        {/* VERIFICATIONS */}
        <Link
          to="/admin/verifications"
        >

          <div className="bg-[#eef2ff] hover:bg-[#e0e7ff] transition rounded-2xl px-6 py-6 flex items-center justify-between cursor-pointer">

            <div className="flex items-center gap-4 text-[#6366f1] font-semibold">

              <FiShield className="text-xl" />

              <span>

                Review Pending Verifications

              </span>

            </div>

            <FiChevronRight className="text-[#6366f1]" />

          </div>

        </Link>


        {/* COMPLAINTS */}
        <Link
          to="/admin/complaints"
        >

          <div className="bg-[#fef2f2] hover:bg-[#fee2e2] transition rounded-2xl px-6 py-6 flex items-center justify-between cursor-pointer">

            <div className="flex items-center gap-4 text-[#ef4444] font-semibold">

              <FiAlertTriangle className="text-xl" />

              <span>

                Handle Active Complaints

              </span>

            </div>

            <FiChevronRight className="text-[#ef4444]" />

          </div>

        </Link>


        {/* REPORT */}
        <button
          className="w-full bg-[#f8fafc] hover:bg-[#f1f5f9] transition rounded-2xl px-6 py-6 flex items-center justify-between"
        >

          <div className="flex items-center gap-4 text-[#1e293b] font-semibold">

            <FiDownload className="text-xl" />

            <span>

              Download Monthly Report

            </span>

          </div>

          <FiChevronRight />

        </button>

      </div>

    </div>

  );

}