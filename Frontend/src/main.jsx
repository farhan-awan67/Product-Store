import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ProductContextProvider } from "./context/productContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
  </BrowserRouter>
  // </StrictMode>,
);
