import React from "react";
import Navbar from "./components/Navbar";
import "./home.css"
import QuickStartSection from "./components/QuickStartSection";
import YourDocuments from "./components/YourDocuments";
import RecentDocuments from "./components/RecentDocuments";

export default function HomePage() {
  return (
    <>
    <div className="navbar_homepage">
      <Navbar/>
      <QuickStartSection/>
      <RecentDocuments/>
    </div>
    <div className="yourDocuments_homepage">
      <YourDocuments/>
    </div>
    </>
  );
}