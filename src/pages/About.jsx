import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import about1 from "../assets/about1.png";
import about2 from "../assets/about2.png";

import {
  ShieldCheck,
  Users,
  Leaf,
  CheckCircle2,
} from "lucide-react";

export default function About() {
  return (
    <div className="bg-[#f7f7fb] min-h-screen">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-7 pt-24 pb-20">

        <div className="text-center">

          <h1
            className="
            text-3xl
            md:text-3xl
            lg:text-7xl
            font-extrabold
            text-[#0F172A]
            leading-tight
          "
          >
            About ChaloRide
          </h1>

          <p
            className="
            mt-6
            text-xl
            md:text-xl
            text-slate-600
            max-w-4xl
            mx-auto
            leading-relaxed
          "
          >
            Empowering students to commute smarter,
            save money, and build meaningful connections
          </p>

        </div>

        {/* SECTION 1 */}
        <div
          className="
          grid
          lg:grid-cols-2
          gap-12
          items-center
          mt-24
        "
        >

          {/* LEFT */}
          <div>

            <h2
              className="
              text-3xl
              md:text-3xl
              lg:text-3xl
              font-extrabold
              leading-tight
              text-[#0F172A]
            "
            >
              Making Campus Commute
              <br />
              Affordable for Everyone
            </h2>

            <p
              className="
              mt-10
              text-[14px]
              md:text-xl
              text-slate-600
              leading-relaxed
            "
            >
              ChaloRide was founded in 2026 by college students
              who experienced firsthand the financial burden of
              daily commuting. We believe that transportation costs
              shouldn't prevent students from accessing quality education.
            </p>

            <p
              className="
              mt-8
              text-[14px]
              md:text-xl
              text-slate-600
              leading-relaxed
            "
            >
              Our platform connects verified students traveling
              on similar routes, enabling them to share rides,
              split costs, and build a sustainable campus community.
              We're not just saving money—we're creating connections
              and reducing carbon emissions.
            </p>

          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center">

            <img
              src={about1}
              alt="about"
              className="
                w-full
                max-w-[650px]
                rounded-[40px]
                object-cover
                shadow-2xl
              "
            />

          </div>

        </div>

      </section>

      {/* VALUES */}
      <section className="max-w-7xl mx-auto px-7 py-24">

        <div className="text-center">

          <h2
            className="
            text-3xl
            md:text-3xl
            lg:text-3xl
            font-extrabold
            text-[#0F172A]
          "
          >
            Our Core Values
          </h2>

          <p
            className="
            mt-5
            text-xl
            md:text-xl
            text-slate-500
          "
          >
            The principles that guide everything we do
          </p>

        </div>

        {/* CARDS */}
        <div
          className="
          grid
          md:grid-cols-3
          gap-6
          mt-20
        "
        >

          {/* CARD 1 */}
          <div
            className="
            bg-white
            rounded-[35px]
            border
            border-slate-200
            p-12
            text-center
            hover:-translate-y-2
            duration-300
            shadow-sm
          "
          >

            <div
              className="
              w-24
              h-24
              mx-auto
              rounded-3xl
              bg-indigo-50
              flex
              items-center
              justify-center
            "
            >

              <ShieldCheck
                size={50}
                className="text-indigo-500"
              />

            </div>

            <h3
              className="
              mt-10
              text-xl
              font-bold
              text-[#0F172A]
            "
            >
              Safety First
            </h3>

            <p
              className="
              mt-6
              text-[14px]
              leading-relaxed
              text-slate-500
            "
            >
              Every user is verified. Safety and security
              are non-negotiable for us.
            </p>

          </div>

          {/* CARD 2 */}
          <div
            className="
            bg-white
            rounded-[35px]
            border
            border-slate-200
            p-12
            text-center
            hover:-translate-y-2
            duration-300
            shadow-sm
          "
          >

            <div
              className="
              w-24
              h-24
              mx-auto
              rounded-3xl
              bg-indigo-50
              flex
              items-center
              justify-center
            "
            >

              <Users
                size={50}
                className="text-indigo-500"
              />

            </div>

            <h3
              className="
              mt-10
              text-xl
              font-bold
              text-[#0F172A]
            "
            >
              Community Driven
            </h3>

            <p
              className="
              mt-6
              text-[14px]
              leading-relaxed
              text-slate-500
            "
            >
              Built by students, for students.
              Your feedback shapes our platform.
            </p>

          </div>

          {/* CARD 3 */}
          <div
            className="
            bg-white
            rounded-[35px]
            border
            border-slate-200
            p-12
            text-center
            hover:-translate-y-2
            duration-300
            shadow-sm
          "
          >

            <div
              className="
              w-24
              h-24
              mx-auto
              rounded-3xl
              bg-indigo-50
              flex
              items-center
              justify-center
            "
            >

              <Leaf
                size={50}
                className="text-indigo-500"
              />

            </div>

            <h3
              className="
              mt-10
              text-xl
              font-bold
              text-[#0F172A]
            "
            >
              Sustainability
            </h3>

            <p
              className="
              mt-6
              text-[14px]
              leading-relaxed
              text-slate-500
            "
            >
              Reducing carbon footprint one shared
              ride at a time.
            </p>

          </div>

        </div>

      </section>

      {/* SECTION 2 */}
      <section
        className="
        max-w-7xl
        mx-auto
        px-7
        py-24
      "
      >

        <div
          className="
          grid
          lg:grid-cols-2
          gap-12
          items-center
        "
        >

          {/* IMAGE */}
          <div>

            <img
              src={about2}
              alt="mobility"
              className="
                w-full
                max-w-[650px]
                rounded-[40px]
                shadow-2xl
              "
            />

          </div>

          {/* TEXT */}
          <div>

            <h2
              className="
              text-3xl
              md:text-3xl
              lg:text-3xl
              font-extrabold
              text-[#0F172A]
              leading-tight
            "
            >
              Transforming Student Mobility
            </h2>

            <p
              className="
              mt-10
              text-[14px]
              md:text-xl
              text-slate-600
              leading-relaxed
            "
            >
              We envision a future where every college
              student in India has access to affordable,
              safe, and sustainable transportation options.
            </p>

            <p
              className="
              mt-6
              text-[14px]
              md:text-xl
              text-slate-600
              leading-relaxed
            "
            >
              By 2028, we aim to expand to 100+ colleges nationwide.
            </p>

            {/* POINTS */}
            <div
              className="
              mt-12
              space-y-7
            "
            >

              <div
                className="
                flex
                items-center
                gap-8
                text-[14px]
                md:text-xl
                text-slate-700
              "
              >

                <CheckCircle2
                  className="text-indigo-500"
                />

                Partner with major universities across 20+ states

              </div>

              <div
                className="
                flex
                items-center
                gap-8
                text-[14px]
                md:text-xl
                text-slate-700
              "
              >

                <CheckCircle2
                  className="text-indigo-500"
                />

                Help students save ₹10 crore collectively

              </div>

              <div
                className="
                flex
                items-center
                gap-8
                text-[14px]
                md:text-xl
                text-slate-700
              "
              >

                <CheckCircle2
                  className="text-indigo-500"
                />

                Offset 50,000 kg of CO₂ emissions annually

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}