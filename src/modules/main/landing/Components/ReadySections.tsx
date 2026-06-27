// import Container from "@/components/container/Container";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import React from "react";

// function ReadySection() {
//   return (
//     <Container>
//       <div className=" w-full border-t-2 border-[#bbbb] pb-8 ">
//         <div className="relative bottom-7 lg:bottom-9">
//           <h2 className=" text-[18px] md:text-[28px] mx-auto font-bold  text-center p-3 h-[15%] rounded w-fit bg-[#eeee] dark:bg-[#1e1e1e]">
//             Ready to Level Up Your Career ?
//           </h2>
//           <h3 className=" text-[15px] md:text-[21px]  text-center ">
//             Join thousands of learners and start journey today !
//           </h3>
//         </div>

//         <div className="flex flex-col md:flex-row gap-4 items-center justify-center ">
//           <Link href="/auth/register">
//             <Button className="py-6 px-8 text-md font-bold cursor-pointer !bg-violet-600 hover:!bg-violet-700 transition-all">
//               Get Started Now
//             </Button>
//           </Link>

//           <Button
//             className="py-6 px-8 text-md font-bold cursor-pointer "
//             variant="outline"
//           >
//             Free Trial
//           </Button>
//         </div>
//       </div>
//     </Container>
//   );
// }

// export default ReadySection;
import Container from "@/components/container/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ReadySection() {
  return (
    <section className="relative overflow-hidden bg-[#eeee] dark:bg-[#1e1e1e]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.10),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.06),transparent_30%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:72px_72px]"
      />

      <Container>
        <div className="relative z-10 py-10">
          <div className="rounded-[2rem] border border-white/50 bg-white/70 px-6 py-12 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-5 inline-flex rounded-full border border-violet-200/70 bg-white/80 px-5 py-2 text-sm font-semibold text-violet-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-violet-300">
                Final step to start strong
              </div>

              <h2 className="text-2xl font-black tracking-tight text-slate-950 md:text-4xl dark:text-white">
                Ready to Level Up Your Career?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-lg dark:text-slate-300">
                Join thousands of learners and start your journey today with a
                smoother path to real progress.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
                <Link href="/auth/register">
                  <Button className="h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 px-8 text-base font-semibold text-white shadow-[0_18px_40px_rgba(139,92,246,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(139,92,246,0.36)] cursor-pointer">
                    Get Started Now
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="h-12 rounded-2xl border-slate-300 bg-white/80 px-8 text-base font-semibold text-slate-900 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 cursor-pointer"
                >
                  Free Trial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ReadySection;
