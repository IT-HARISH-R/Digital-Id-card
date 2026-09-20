import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Verify from "./Pages/Verify";
import NotVerified from "./Pages/NotVerified";
import NotFound from "./Pages/NotFound";


function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/verify/:id" element={<Verify />} />
        <Route path="/not-verified" element={<NotVerified />} />

      </Routes>
    </div>
  );
}

export default App;
