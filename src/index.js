import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Buffer } from "buffer";
import "./i18n.js";

// import crypto from "crypto-browserify";
// import stream from "stream-browserify";

// window.global = window; // Fix for some modules
// window.Buffer = Buffer;
// window.crypto = crypto;
// window.stream = stream;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="zoom-container">
      <App />
    </div>
  </React.StrictMode>
);
