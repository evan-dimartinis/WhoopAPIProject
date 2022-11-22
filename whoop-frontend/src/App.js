import "./App.css";
import React from "react";
import Auth from "./screens/auth";
import Dashboard from "./screens/dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";

async function checkAuthenticationStatus() {
  const x = await fetch("http://localhost:8080/authenticateuser", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((resdata) => {
    })
    .catch((err) => {
    });
}

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
