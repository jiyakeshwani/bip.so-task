import React, { useState } from "react";
import Filter from "./Filter";
import Header from "./Header";
import Movies from "./Movies";

function Home(props) {
  return (
    <>
      <Header />
     
      <Movies />
    </>
  );
}

export default Home;
