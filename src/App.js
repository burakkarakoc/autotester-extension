import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage.js";
import ProcessPage from "./pages/processPage.js";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/process" element={<ProcessPage />} />

          {/* Other routes */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
