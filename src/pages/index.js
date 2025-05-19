import Links from "@/components/UI/Links/Links";
import Navbar from "@/components/UI/Navbar/Navbar";
import ProfileDetail from "@/components/UI/ProfileDetail/ProfileDetail";
import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const { tab } = useSelector((state) => state.tab);
  return (
    <div className="h-full">
      {tab === "Links" ? <Links /> : <ProfileDetail />}
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col overflow-hidden">
      <nav>
        <Navbar />
      </nav>
      <main className="container mx-auto flex-1 mt-5 w-full">{page}</main>
    </div>
  );
};
export default Home;
