import Image from "next/image";
import Container from "../container/Container";
import { Button } from "../ui/button";

function HeroSection() {
  return (
    <div>
      <section className="relative h-[80vh] flex items-center">
        <Image
          src="/images/hero.png"
          alt="learn"
          fill
          className="object-cover "
          priority
        />
        <div className="absolute inset-0 bg-black/40 -z-10"></div>
        <div className="absolute inset-0 mt-6 md:mt-35">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="w-[67%] md:w-full">
                <h1 className="text-3xl md:text-6xl font-bold mb-6">
                  Learn Without Limits
                </h1>

                <p className="md:text-xl mb-8">
                  Access thousands of courses from industry experts. Build
                  skills, earn certificates, and advance your career.
                </p>

                <div className="flex gap-4">
                  <Button className="py-5 font-bold text-md ">
                    Browse Courses
                  </Button>

                  <Button
                    variant="secondary"
                    className="py-5 text-md  font-bold"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
      <div className="mx-auto  bg-[#ffff] rounded shadow w-[75%] relative bottom-8 ">
        <div className="flex md:flex-row flex-col py-2 px-5 md:px-20 justify-center md:justify-between md:items-center">
          <div className="flex gap-3 items-center ">
            <h1 className=" text-[24px] md:text-[32px] font-bold text-[#3d1dbf] ">
              12k+
            </h1>
            <h3 className="md:text-[22px]  ">Students Enrolled</h3>
          </div>
          <div className="flex gap-3 items-center border-y-2 md:border-y-0 md:border-x-2 border-[#dddd] py-2 md:py-0 md:px-10 ">
            <h1 className="text-[24px] md:text-[32px] font-bold text-[#3d1dbf] ">
              350+
            </h1>
            <h3 className="md:text-[22px]">Expert Instructors</h3>
          </div>
          <div className="flex gap-3 items-center ">
            <h1 className="text-[24px] md:text-[32px] font-bold text-[#3d1dbf] ">
              1.5M+
            </h1>
            <h3 className="md:text-[22px]">Lessons Viewed </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
