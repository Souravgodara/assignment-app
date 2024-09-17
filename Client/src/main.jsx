import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./context/userContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <main className='m-auto max-w-[80rem] px-3'>
        <App />
      </main>
    </UserContextProvider>
  </StrictMode>
);
