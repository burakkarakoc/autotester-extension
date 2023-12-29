import React from "react";

function DirectingPopup() {
  return (
    <div className="fixed top-1/3 left-10 right-10 bg-opacity-50 z-50">
      <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="loader border-4 border-t-4 border-gray-200 border-t-blue-600 h-12 w-12 rounded-full animate-spin bg-black"></div>
        <p className="text-lg text-black font-bold">Directing...</p>
        <p className="mt-4 text-lg text-black">Please login first.</p>
      </div>
    </div>
  );
}

export default DirectingPopup;
