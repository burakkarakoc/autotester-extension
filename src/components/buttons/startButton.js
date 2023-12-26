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
      injectVideo();
    }
  }, [videoUrl]);

  const injectVideo = () => {
    /* eslint-disable no-undef */
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      // const activeTabUrl = tabs[0].url;
      console.log("inside chrome " + activeTabId);
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTabId },
          function: () => {
            const videoContainer = document.createElement("div");

            // videoContainer.innerHTML = `<video src=${videoUrl} controls></video>`;
            // videoContainer.innerHTML =
            // '<video width="400" controls><source src="mov_bbb.mp4" type="video/mp4">Your browser does not support HTML video.</video>';
            videoContainer.innerHTML =
              '<video width="840" height="472" controls><source src="https://storage.googleapis.com/ai-automation-framework.appspot.com/3351e99e-9f59-11ee-9769-5e542eed4ef0/b924a4e5fa86841bea72adcb49e98588.webm" type="video/webm">Your browser does not support the video tag.</video>';
            videoContainer.style.position = "fixed";
            videoContainer.style.zIndex = "1000";
            videoContainer.style.top = "10px";
            videoContainer.style.left = "10px";

            // Create close button
            const closeButton = document.createElement("button");
            closeButton.textContent = "Close";
            closeButton.style.position = "absolute";
            closeButton.style.top = "0";
            closeButton.style.right = "0";
            closeButton.onclick = () => {
              videoContainer.remove();
            };

            // Append close button to video container
            videoContainer.appendChild(closeButton);

            document.body.appendChild(videoContainer);
          },
        },
        (results) => {
          // if (results && results[0]) {
          //   setUrl(activeTabUrl);
          //   setBody(results[0].result);
          // }
        }
      );
    });
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
