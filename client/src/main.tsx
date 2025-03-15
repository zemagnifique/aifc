import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { WebfontLoader } from "./lib/fonts";

// Render the app with the WebfontLoader
createRoot(document.getElementById("root")!).render(
  <>
    <WebfontLoader />
    <App />
  </>
);
