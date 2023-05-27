import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Status from "./components/containers/Status/Status";
import Watering from "./components/containers/Watering/Watering";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Presets from "./components/containers/Presets/Presets";
import Login from "./components/containers/Login/Login";
import SessionHandler from "./utils/SessionHandler";
import RequireAuth from "./components/RequireAuth";

function App() {
  SessionHandler.init();

  return (
    <>
      <div className="App h-full">
        <div className="overflow-auto h-full pb-24 md:pb-0 md:ml-[6rem] 2xl:ml-[8rem]">
          <ToastContainer position="top-center" />
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Status />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/watering"
              element={
                <RequireAuth>
                  <Watering />
                </RequireAuth>
              }
            />
            <Route
              path="/presets"
              element={
                <RequireAuth>
                  <Presets />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
        <Navbar />
      </div>
    </>
  );
}

export default App;
