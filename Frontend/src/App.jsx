import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className={`w-full min-h-[100vh] bg-[#010B13]`}>
      <ToastContainer
        position="top-right"
        autoClose={5000} // Global auto close time for all toasts
        hideProgressBar={false} // Show progress bar
        newestOnTop={true} // Show newest toasts on top
        closeOnClick={true} // Close on click
        rtl={false} // Right-to-left (set to true if needed)
        pauseOnFocusLoss={false} // Pause when focus is lost
        draggable={false} // Make it non-draggable
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
