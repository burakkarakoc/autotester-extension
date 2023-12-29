import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DirectingPopup from "../directingLoginPopup";

function StartButton({ handleStartClick }) {
  return (
    <button
      onClick={handleStartClick}
      className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
    >
      Start
    </button>
  );
}

export default StartButton;
