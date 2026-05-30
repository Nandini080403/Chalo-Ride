import { useNavigate } from "react-router-dom";

export default function CTA() {

  const navigate = useNavigate();

  return (
    <section className="py-28 bg-[#fafafa]">

      <div className="max-w-7xl mx-auto px-7">

        <div className="rounded-[40px] bg-gradient-to-r from-indigo-500 to-indigo-400 py-24 px-10 text-center text-white">

          <h2 className="text-3xl font-bold">
            Ready to Start Saving?
          </h2>

          <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto leading-10">

            Join students building a smarter and more affordable
            commuting network for campus travel.

          </p>

          <button
            onClick={() => navigate("/signup")}
            className="mt-10 bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-[14px] hover:scale-105 duration-300"
          >
            Get Started →
          </button>

        </div>

      </div>

    </section>
  );
}