import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopupComponent from "../components/processpage/waitingPopup";

function ProcessPage() {
  const [parameters, setParameters] = useState([{ key: "", value: "" }]);
  const [scenario, setScenario] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [assertionText, setAssertionText] = useState("");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [token, setToken] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [videoUrl, setVideUrl] = useState("");

  const handleVideoUrl = (v) => {
    setVideUrl(v);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const navigate = useNavigate();

  const handleScenarioChange = (e) => {
    setScenario(e.target.value);
  };

  const handleParameterChange = (index, e) => {
    const newParameters = [...parameters];
    newParameters[index][e.target.name] = e.target.value;
    setParameters(newParameters);
  };

  const addParameter = () => {
    setParameters([...parameters, { key: "", value: "" }]);
  };

  const removeParameter = (index) => {
    const newParameters = parameters.filter((_, i) => i !== index);
    setParameters(newParameters);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleAssertionTextChange = (e) => {
    setAssertionText(e.target.value);
  };

  useEffect(() => {
    if (url != "" && body != "") {
      sendStartSignal(scenario, parameters, assertionText, token);
    }
  }, [url, body]);

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
    videoContainer.innerHTML =
      '<center><video width="97%" height="95%" controls><source src="https://storage.googleapis.com/ai-automation-framework.appspot.com/91e7ac54-a3ec-11ee-8ff3-5e542eed4ef0/record.webm" type="video/webm">Your browser does not support the video tag.</video></center>';
    videoContainer.style.position = "fixed";
    videoContainer.style.zIndex = "10000";
    videoContainer.style.top = "0px";
    videoContainer.style.left = "0px";

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

    videoContainer.appendChild(closeButton);
    document.body.appendChild(videoContainer);
  };

  function getInfo() {
    /* eslint-disable no-undef */
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      const activeTabUrl = tabs[0].url;
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTabId },
          function: scrape,
        },
        (results) => {
          if (results && results[0]) {
            setUrl(activeTabUrl);
            setBody(results[0].result);
          }
        }
      );
    });
  }

  function scrape() {
    return document.body.innerHTML;
  }

  var intervalId = null;

  async function sendStartSignal(scenario, parames, assertion, token) {
    let params = "";
    parames.forEach((element) => {
      params += element.key + " " + element.value + " ,";
    });
    params[params.length - 1] = "";

    const data = {
      url: url,
      scenario: scenario,
      parameters: params,
      body: body,
      assertion: assertion,
    };

    fetch(`http://127.0.0.1:105/controller/start?token=${token}`, {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        handleClosePopup();
        // status sorgusu
        intervalId = setInterval(getStatus(result), 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function getStatus(result) {
    var formdata = new FormData();
    formdata.append("runId", result.runId);

    var requestOptions = {
      method: "GET",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `http://127.0.0.1:105/controller/status?token=${token}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 1) {
          setVideUrl(result.video);
          clearInterval(intervalId);
        }
      })
      .catch((error) => console.log("error", error));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isChecked) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic dXNlcm5hbWU6cGFzc3dvcmQ=");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch("http://127.0.0.1:105/apigwt", requestOptions)
        .then(async (token) => {
          const data = await token.json();
          setToken(data.token);
          handleOpenPopup();

          getInfo();
        })
        .catch((error) => {
          alert("Token can not be verified...");
        });
    } else {
      alert("Please navigate to the page you want to test...");
    }
  };

  return (
    <div className="h-screen w-full bg-gray-600">
      <header className="flex justify-center items-center bg-gray-900 py-4 px-4 md:px-8 lg:px-12">
        <button
          onClick={handleBack}
          className="text-white bg-indigo-600 hover:bg-indigo-700 font-bold py-2 px-4 rounded mr-4"
        >
          &#8592;
        </button>
        <h1 className="text-3xl mx-8 font-bold text-white flex-grow">
          Test Definition
        </h1>
      </header>{" "}
      {showPopup ? <PopupComponent onClose={handleClosePopup} /> : <></>}
      <div className="flex flex-col items-center justify-center flex-grow">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-700 p-6 rounded-lg shadow-md w-full max-w-lg"
        >
          <div className="mb-4">
            <input
              className="bg-gray-800 border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Scenario"
              value={scenario}
              onChange={handleScenarioChange}
            />
          </div>
          <div className="flex justify-center items-center">
            <div className="text-xl font-bold text-white mb-6 ">Parameters</div>
          </div>
          {parameters.map((parameter, index) => (
            <div key={index} className="flex items-center mb-4">
              <div key={index} className="flex items-center justify-center">
                <input
                  className="bg-gray-800 border border-gray-700 rounded w-1/3 py-2 px-3 text-gray-300 mr-2 leading-tight focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="Parameter"
                  name="key"
                  value={parameter.key}
                  onChange={(e) => handleParameterChange(index, e)}
                />
                <input
                  className="bg-gray-800 border border-gray-700 rounded w-1/3 py-2 px-3 text-gray-300 mr-2 leading-tight focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="Value"
                  name="value"
                  value={parameter.value}
                  onChange={(e) => handleParameterChange(index, e)}
                />
                <button
                  type="button"
                  onClick={() => removeParameter(index)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  -
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-center mb-4">
            <button
              type="button"
              onClick={addParameter}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              +
            </button>
          </div>
          <div className="mb-4">
            <input
              className="bg-gray-800 border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Assertion Text"
              value={assertionText}
              onChange={handleAssertionTextChange}
            />
          </div>
          <div className="mb-4 text-left flex justify-center">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2 text-gray-200">
                I am on the tab that I want to test
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProcessPage;
