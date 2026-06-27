// import Container from "@/components/container/Container";
// import React from "react";
// import WhyUs from "./WhyUs";

// function WhyUsSection() {
//   return (
//     <Container>
//       <div className="w-full min-h-[350px] border-t-2  border-[#bbbb]  ">
//         <h2 className="text-2xl mx-auto font-bold relative bottom-8 text-center p-3 h-[15%] rounded w-fit bg-[#eeee] dark:bg-[#1e1e1e] ">
//           Why Learn Us ?
//         </h2>
//         <div className="w-full h-[80%]">
//           <WhyUs />
//         </div>
//       </div>
//     </Container>
//   );
// }

// export default WhyUsSection;

import Container from "@/components/container/Container";
import WhyUs from "./WhyUs";

function WhyUsSection() {
  return (
    <section className="relative isolate -mt-px overflow-hidden bg-[#eeee] dark:bg-[#1e1e1e]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(236,72,153,0.06),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.10),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.08),transparent_26%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:72px_72px]"
      />

      <Container>
        <div className="relative z-10 py-12">
          <div className="rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <div className="mb-10 flex justify-center">
              <div className="rounded-full border border-violet-200/70 bg-white/80 px-5 py-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Why Learn Us?
                </h2>
              </div>
            </div>

            <div>
              <WhyUs />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default WhyUsSection;
