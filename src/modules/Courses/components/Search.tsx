import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

function SearchCourse() {
  return (
    <div className=" w-full flex gap-2  justify-between h-10 items-stretch ">
      <Input
        type="text"
        placeholder="Search courses...."
        className="w-[95%] bg-[#ffff] h-full "
      />
      <div>
        <Button className=" h-full ">Search</Button>
      </div>
    </div>
  );
}

export default SearchCourse;
