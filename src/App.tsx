import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Status from "./components/containers/Status/Status";
import Timeline from "./components/containers/Timeline/Timeline";
import Watering from "./components/containers/Watering/Watering";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="App">
        <div className="mb-24 md:mb-0 md:ml-[6rem] 2xl:ml-[8rem]">
          <ToastContainer position="top-center" />
          <Routes>
            <Route path="/" element={<Status />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/watering" element={<Watering />} />
          </Routes>
        </div>
        <Navbar />
      </div>
    </>
  );
}

export default App;
