import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StartButton from "../buttons/startButton";
import DirectingPopup from "../directingLoginPopup";

function Header() {
  let navigate = useNavigate();
  const [popup, setPopup] = useState(false);

  const isAuthenticated = () => {
    return new Promise((resolve, reject) => {
      /* eslint-disable no-undef */
      chrome.storage.local.get("custom_token", function (result) {
        if (result.custom_token) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  const handleStartClick = async () => {
    isAuthenticated().then((isAuth) => {
      if (isAuth) {
        console.log("User is authenticated");
        navigate("/process");
      } else {
        console.log("User is not authenticated");
        setPopup(true);
        const myTimeout = setTimeout(openLogin, 1000);
      }
    });
  };

  const openLogin = () => {
    /* eslint-disable no-undef */
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      chrome.tabs.update(activeTabId, {
        url: "http://localhost:5173/auth/sign-in",
      });
    });
    setPopup(false);
  };

  return (
    <>
      {popup ? <DirectingPopup /> : <></>}
      <header className="bg-gray-900 py-4">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8 lg:px-12">
          <h1 className="text-3xl font-bold text-indigo-500">AutoTester</h1>
          <StartButton handleStartClick={handleStartClick} />
        </div>
      </header>
    </>
  );
}

export default Header;
