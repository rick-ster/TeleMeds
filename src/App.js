import "./components/FontawesomeIcons";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ManageStaff from "./pages/ManageStaff";
import SignIn from "./pages/SignIn";
import ProfilePage from "./pages/ProfilePage";  
import DoctorProfile from "./components/DoctorProfile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/manage_staff' element={<ManageStaff />} />
          <Route path="/profile/:id" element={<ProfilePage />} /> 
          <Route path="/doctor-profile/:id" element={<DoctorProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
