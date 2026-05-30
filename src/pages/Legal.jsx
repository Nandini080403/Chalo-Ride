import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  Shield,
  Lock,
  CheckCircle,
} from "lucide-react";

export default function Legal() {
  const [activeTab, setActiveTab] =
    useState("terms");

  return (
    <div className="bg-[#f7f7fb] min-h-screen flex flex-col">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="bg-[#ecebff] pt-24 pb-16">

        <div className="max-w-6xl mx-auto px-7 text-center">

          <h1 className="text-3xl md:text-3xl font-extrabold text-[#0F172A]">
            Legal Information
          </h1>

          <p className="mt-4 text-slate-500 text-[14px]">
            Terms of Service & Privacy Policy for College Students
          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section className="flex-1 max-w-6xl mx-auto w-full px-7 py-12">

        <div className="bg-white rounded-[32px] shadow-lg border overflow-hidden">

          {/* TAB HEADER */}
          <div className="grid grid-cols-2 border-b">

            <button
              onClick={() => setActiveTab("terms")}
              className={`py-5 font-bold transition ${
                activeTab === "terms"
                  ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"
                  : "text-slate-500 bg-white"
              }`}
            >
              Terms of Service
            </button>

            <button
              onClick={() => setActiveTab("privacy")}
              className={`py-5 font-bold transition ${
                activeTab === "privacy"
                  ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"
                  : "text-slate-500 bg-white"
              }`}
            >
              Privacy Policy
            </button>

          </div>

          {/* BODY */}
          <div className="p-8 md:p-14">

            {/* TERMS TAB */}
            {activeTab === "terms" && (
              <div>

                {/* INFO BOX */}
                <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-2xl p-6 flex gap-4">

                  <Shield className="text-indigo-500 mt-1" />

                  <div>

                    <h3 className="font-bold text-indigo-600 text-xl">
                      College Students Only Platform
                    </h3>

                    <p className="text-slate-600 mt-2 leading-7">
                      ChaloRide is an exclusive platform
                      for verified college students in India.
                    </p>

                  </div>

                </div>

                <p className="text-base text-slate-400 mt-5">
                  Last Updated: January 2026
                </p>

                {/* SECTIONS */}
                <div className="mt-12 space-y-12">

                  <LegalSection
                    title="1. Eligibility & Student Verification"
                    points={[
                      "Users must be enrolled in a recognized college or university",
                      "Valid college ID verification is required",
                      "Users must be 18 years or older",
                      "Fake verification may lead to suspension",
                    ]}
                  />

                  <LegalSection
                    title="2. Ride Sharing Rules & Safety"
                    points={[
                      "Meet only in public areas",
                      "Respect ride timings and routes",
                      "No harassment or unsafe behavior",
                      "Follow traffic and helmet regulations",
                    ]}
                  />

                  <LegalSection
                    title="3. Payment & Cost Sharing"
                    points={[
                      "Ride costs should be shared fairly",
                      "UPI payments are recommended",
                      "Users manage payments independently",
                      "ChaloRide is not liable for payment disputes",
                    ]}
                  />

                  <LegalSection
                    title="4. Community Standards"
                    points={[
                      "Respect all users",
                      "No hate speech or discrimination",
                      "Maintain honest communication",
                      "Provide fair ride reviews",
                    ]}
                  />

                  <LegalSection
                    title="5. Liability & Disclaimers"
                    points={[
                      "ChaloRide only connects students",
                      "Users are responsible for safety",
                      "No insurance coverage is provided",
                      "Users verify ride details independently",
                    ]}
                  />

                </div>

              </div>
            )}

            {/* PRIVACY TAB */}
            {activeTab === "privacy" && (
              <div>

                {/* INFO BOX */}
                <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-2xl p-6 flex gap-4">

                  <Lock className="text-indigo-500 mt-1" />

                  <div>

                    <h3 className="font-bold text-indigo-600 text-xl">
                      Student Data Protection
                    </h3>

                    <p className="text-slate-600 mt-2 leading-7">
                      Your privacy is protected using secure
                      encryption and modern infrastructure.
                    </p>

                  </div>

                </div>

                <p className="text-base text-slate-400 mt-5">
                  Last Updated: January 2026
                </p>

                {/* SECTIONS */}
                <div className="mt-12 space-y-12">

                  <LegalSection
                    title="1. Information We Collect"
                    points={[
                      "College email addresses",
                      "Student verification documents",
                      "Ride routes and preferences",
                      "Basic location information",
                    ]}
                  />

                  <LegalSection
                    title="2. How We Use Information"
                    points={[
                      "Verify student identity",
                      "Improve ride matching",
                      "Enhance safety systems",
                      "Provide customer support",
                    ]}
                  />

                  <LegalSection
                    title="3. Data Protection & Security"
                    points={[
                      "Encrypted communication",
                      "Secure login authentication",
                      "Restricted admin access",
                      "No selling of student data",
                    ]}
                  />

                  <LegalSection
                    title="4. Cookies & Tracking"
                    points={[
                      "Cookies improve experience",
                      "Analytics optimize performance",
                      "No third-party advertising cookies",
                    ]}
                  />

                </div>

                {/* BOTTOM TRUST BOX */}
                <div className="mt-16 bg-green-50 border-l-4 border-green-500 rounded-2xl p-8 flex items-center gap-3">

                  <CheckCircle className="text-green-600" />

                  <p className="text-green-700 font-medium">
                    Your trust is our responsibility.
                    We are committed to protecting
                    student data with high security standards.
                  </p>

                </div>

              </div>
            )}

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

/* REUSABLE SECTION */

function LegalSection({ title, points }) {
  return (
    <div>

      <h2 className="text-xl font-extrabold text-[#0F172A]">
        {title}
      </h2>

      <ul className="mt-6 space-y-3 text-slate-600 leading-8 list-disc ml-6">

        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}

      </ul>

    </div>
  );
}