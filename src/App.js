import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from "./Components/PrivateRoute";
import Navbar from "./Components/Navbar";
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Category from "./pages/Category";
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
          <Navbar />
      </Router>
    </>
  );
}

export default App;
