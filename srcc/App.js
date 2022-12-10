import DashHeader from "./components/DashHeader";
import Increment from "./components/Increment";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashRoute from "./routes/DashRoute";
import MainRoutes from "./routes/Routes";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard/*" element={<DashRoute />} />
        <Route path="/*" exact element={<MainRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
