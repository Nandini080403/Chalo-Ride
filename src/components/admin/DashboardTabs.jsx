import {
  FiGrid,
  FiShield,
  FiUsers,
  FiAlertTriangle,
  FiBarChart,
} from "react-icons/fi";

import { Link } from "react-router-dom";

export default function DashboardTabs({ active }) {

  const tabs = [
    {
      name: "overview",
      label: "Overview",
      icon: <FiGrid />,
      path: "/admin",
    },

    {
      name: "verifications",
      label: "Verifications",
      icon: <FiShield />,
      path: "/admin/verifications",
    },

    {
      name: "riders",
      label: "Riders",
      icon: <FiUsers />,
      path: "/admin/riders",
    },

    {
      name: "complaints",
      label: "Complaints",
      icon: <FiAlertTriangle />,
      path: "/admin/complaints",
    },

    {
      name: "earnings",
      label: "Earnings",
      icon: <FiBarChart />,
      path: "/admin/earnings",
    },
  ];

  return (

    <div className="max-w-[1450px] mx-auto px-8 pt-6">

      <div className="bg-white border border-gray-200 rounded-[32px] p-4 flex items-center justify-between shadow-sm">

        {tabs.map((tab) => (

          <Link
            key={tab.name}
            to={tab.path}
            className={`

              flex items-center justify-center gap-3

              w-[230px]
              h-[72px]

              rounded-[22px]

              text-[18px]
              font-semibold

              transition-all duration-200

              ${
                active === tab.name
                  ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-md"
                  : "text-[#475569] hover:bg-[#f8fafc]"
              }

            `}
          >

            <span className="text-[20px] flex items-center justify-center">
              {tab.icon}
            </span>

            <span className="leading-none">
              {tab.label}
            </span>

          </Link>

        ))}

      </div>

    </div>

  );

}