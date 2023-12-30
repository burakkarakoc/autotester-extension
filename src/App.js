import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage.js";
import ProcessPage from "./pages/processPage.js";
import "./index.css";

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<HomePage token={token} setToken={setToken} />}
          />
          <Route path="/process" element={<ProcessPage token={token} />} />

          {/* Other routes */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
