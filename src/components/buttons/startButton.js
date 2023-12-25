import { useNavigate } from "react-router-dom";

function StartButton() {
  let navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/process");
  };
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
