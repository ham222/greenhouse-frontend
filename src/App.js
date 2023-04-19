import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Status from "./components/containers/Status/Status";
import Timeline from "./components/containers/Timeline/Timeline";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Status />} />
          <Route exact path="/timeline" element={<Timeline />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
