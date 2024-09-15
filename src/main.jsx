import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <main className='m-auto border max-w-[80rem] p-3'>
      <App />
    </main>
  </StrictMode>
);
