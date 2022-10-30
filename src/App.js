import DashHeader from "./components/DashHeader";
import Increment from "./components/Increment";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashRoute from './routes/DashRoute';
import MainRoutes from "./routes/Routes";
function App() {
  return (
  //   <div className="justify-center items-center text-center">
  //  <DashHeader/>
  //  <SideBar />
  //  {/* <Increment/> */}
  // </div>
  <Router>
  <Routes>
    {/* <Route path="/login" exact element={<MainRoutes />} /> */}
      <Route path="/dashboard/*" element={<DashRoute />} />
    <Route path="/*" exact element={<MainRoutes />} />
  </Routes>
</Router>
  );
}

export default App;
