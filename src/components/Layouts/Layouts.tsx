import React from "react";
import Navbar from "../navbar/navbar";
import Container from "../container/Container";

function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#eeee] ">
      <Container>
        <Navbar />
      </Container>
      {children}
    </div>
  );
}

export default Layouts;
