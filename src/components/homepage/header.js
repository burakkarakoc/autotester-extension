import React from "react";
import StartButton from "../buttons/startButton";

function Header() {
  return (
    <header className="bg-gray-900 py-4">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 lg:px-12">
        <h1 className="text-3xl font-bold text-indigo-500">AutoTester</h1>
        <StartButton />
      </div>
    </header>
  );
}

export default Header;
