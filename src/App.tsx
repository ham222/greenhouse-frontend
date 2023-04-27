import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Status from "./components/containers/Status/Status";
import Timeline from "./components/containers/Timeline/Timeline";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Status />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
        <Navbar />
      </div>
    </>
  );
}

export default App;
