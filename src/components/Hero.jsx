import hero from "../assets/hero.png";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {

  const navigate = useNavigate();

  return (

    <section className="bg-[#fafafa] overflow-hidden">

      <div className="max-w-7xl mx-auto px-7 py-2 grid lg:grid-cols-[0.9fr_1.3fr] items-center gap-0">

        {/* LEFT CONTENT */}
        <div className="relative z-10">

          <h1 className="text-[65px] leading-[75px] font-extrabold text-[#1E293B]">

            Share Rides,
            <br />

            Split Costs,
            <br />

            Build Connections

          </h1>

        <p className="mt-8 text-[22px] text-black leading-10 max-w-xl font-medium">
            Join thousands of verified college students across India
            who are saving money and reducing carbon footprint by
            sharing rides to campus.

          </p>

          {/* BUTTONS */}
          <div className="flex items-center gap-6 mt-10 flex-wrap">

            <button
              onClick={() => navigate("/find-ride")}
              className="
                flex items-center gap-3
                bg-indigo-500
                text-white
                px-7 py-5
                rounded-2xl
                text-[14px]
                font-semibold
                shadow-xl
                hover:scale-105
                duration-300
              "
            >

              <Search size={24} />

              Find a Ride

            </button>

            <button
              onClick={() => navigate("/offer-ride")}
              className="
                flex items-center gap-3
                border border-slate-300
                bg-white
                px-7 py-5
                rounded-2xl
                text-[14px]
                font-semibold
                hover:border-indigo-500
                hover:shadow-lg
                duration-300
              "
            >

              <Plus size={24} />

              Offer a Ride

            </button>

          </div>

          {/* MINI INFO */}
          <div className="flex items-center gap-6 mt-10 text-slate-700 flex-wrap">

            <div className="flex items-center gap-2 text-[14px]">
              🛡️ Verified Student Accounts
            </div>

            <div className="flex items-center gap-2 text-[14px]">
              ⭐ Community Based Ratings
            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-end -mr-32">

          {/* BIG GLOW */}
          <div className="
            absolute
            w-[850px]
            h-[850px]
            bg-gradient-to-r
            from-indigo-300
            to-pink-300
            blur-[180px]
            opacity-40
            rounded-full
            top-0
          "></div>

          {/* HERO IMAGE */}
          <img
            src={hero}
            alt="hero"
            className="
              relative
              w-[145%]
              max-w-none
              object-contain
              scale-125
              mix-blend-multiply
              animate-float
            "
          />

          {/* SOFT BOTTOM FADE */}
          <div className="
            absolute
            bottom-0
            left-0
            w-full
            h-32
            bg-gradient-to-t
            from-[#fafafa]
            to-transparent
          "></div>

        </div>

      </div>

    </section>
  );
}