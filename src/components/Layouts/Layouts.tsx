import React from "react";
import Navbar from "../navbar/navbar";
import Container from "../container/Container";
import NavContainer from "../container/NavContainer";

function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#eeee] ">
      <NavContainer>
        <Navbar />
      </NavContainer>
      {children}
    </div>
  );
}

export default Layouts;
