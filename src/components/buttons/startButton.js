import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StartButton() {
  let navigate = useNavigate();
  const [videoUrl, setVideUrl] = useState("");

  const handleStartClick = () => {
    navigate("/process");
  };

  const handleVideoUrl = () => {
    setVideUrl(
      "https://storage.googleapis.com/ai-automation-framework.appspot.com/2519e2fc-a36c-11ee-8c51-5e542eed4ef0/record.webm"
    );
  };

  useEffect(() => {
    if (videoUrl != "") {
      expandVideo();
    }
  }, [videoUrl]);

  const expandVideo = () => {
    const prevState = document.body.innerHTML;
    document.body.innerHTML = "";

    document.getElementsByTagName("HTML")[0].style.width = "1200px";
    document.getElementsByTagName("HTML")[0].style.heigth = "675px";

    const videoContainer = document.createElement("div");

    // videoContainer.innerHTML = `<video src=${videoUrl} controls></video>`;
    // videoContainer.innerHTML =
    // '<video width="400" controls><source src="mov_bbb.mp4" type="video/mp4">Your browser does not support HTML video.</video>';
    videoContainer.innerHTML =
      '<center><video width="97%" height="95%" controls><source src="https://storage.googleapis.com/ai-automation-framework.appspot.com/91e7ac54-a3ec-11ee-8ff3-5e542eed4ef0/record.webm" type="video/webm">Your browser does not support the video tag.</video></center>';
    videoContainer.style.position = "fixed";
    videoContainer.style.zIndex = "10000";
    videoContainer.style.top = "0px";
    videoContainer.style.left = "0px";

    // Create close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.style.position = "absolute";
    closeButton.style.top = "4px";
    closeButton.style.right = "4px";
    closeButton.onclick = () => {
      videoContainer.remove();
      document.getElementsByTagName("HTML")[0].style.width = "420px";
      document.body.innerHTML = prevState;
    };

    // Append close button to video container
    videoContainer.appendChild(closeButton);

    document.body.appendChild(videoContainer);
  };

  return (
    <button
      // onClick={handleStartClick}
      onClick={handleVideoUrl}
      className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
    >
      Start
    </button>
  );
}

export default StartButton;
