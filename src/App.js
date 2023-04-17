import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Status from "./Status";
import Timeline from "./Timeline";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Status />}/>
          <Route exact path="/timeline" element={<Timeline/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
