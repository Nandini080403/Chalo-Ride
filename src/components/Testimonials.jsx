import { testimonialsData } from "../data/homeData";

export default function Testimonials() {
  return (
    <section className="py-28 bg-white">

      <div className="max-w-7xl mx-auto px-7">

        <div className="text-center">

          <h2 className="text-3xl font-bold text-[#1E293B]">
            What Students Say
          </h2>

          <p className="mt-5 text-slate-500 text-[14px]">
            Real experiences from our student community
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">

          {testimonialsData.map((item, index) => (

            <div
              key={index}
              className="border border-slate-200 rounded-[30px] p-8 hover:shadow-xl duration-300"
            >

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-slate-200"></div>

                <div>

                  <h4 className="font-bold text-[14px]">
                    {item.name}
                  </h4>

                  <p className="text-slate-500">
                    {item.college}
                  </p>

                </div>

              </div>

              <div className="mt-6 text-yellow-400 text-xl">
                ★★★★★
              </div>

              <p className="mt-6 text-slate-600 leading-8 italic">
                "{item.text}"
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}