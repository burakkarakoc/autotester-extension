import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import StartButton from "../buttons/startButton";
import DirectingPopup from "../directingLoginPopup";

function Header({ token, setToken }) {
  let navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [valid, setValid] = useState(null);

  const getToken = () => {
    if (!token) {
      /* eslint-disable no-undef */
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTabId = tabs[0].id;
        const activeTabUrl = tabs[0].url;
        chrome.scripting.executeScript(
          {
            target: { tabId: activeTabId },
            function: () => {
              return localStorage.getItem("user_token");
            },
          },
          (results) => {
            if (results && results[0]) {
              setToken(results[0].result);
              console.log("User token: " + results[0].result);
              setToken(results[0].result);

              var requestOptions = {
                method: "GET",
                redirect: "follow",
              };

              fetch(
                "http://127.0.0.1:105/health?token=" + results[0].result,
                requestOptions
              )
                .then((response) => response.json())
                .then((result) => {
                  console.log(result);
                  if (result.message === "OK") {
                    navigate("/process");
                  } else {
                    setPopup(true);
                    /* eslint-disable no-undef */
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      (tabs) => {
                        const activeTabId = tabs[0].id;
                        chrome.tabs.update(activeTabId, {
                          url: "http://localhost:5173/auth/sign-in",
                        });
                      }
                    );
                    setPopup(false);
                  }
                })
                .catch((error) => console.log("error", error));
            }
          }
        );
      });
    }
  };

  // useEffect(() => {
  //   if (valid) {
  //     navigate("/process");
  //   }
  // }, [valid]);

  const handleStartClick = () => {
    getToken();
  };

  // const openLogin = () => {
  //   /* eslint-disable no-undef */
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     const activeTabId = tabs[0].id;
  //     chrome.tabs.update(activeTabId, {
  //       url: "http://localhost:5173/auth/sign-in",
  //     });
  //   });
  //   setPopup(false);
  // };

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
