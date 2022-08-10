import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from "./Components/PrivateRoute";
import Navbar from "./Components/Navbar";
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Category from "./pages/Category";
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import CreateListing from "./pages/CreateListing";
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Listing from "./pages/Listing"
import Contact from './pages/Contact'
import EditListing from "./pages/EditListing"

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/category/:categoryName/:listingId%7d' element={<Listing />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/edit-listing/:listingId' element={<EditListing />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/contact/:landlordId' element={<Contact />} />
        </Routes>
          <Navbar />
      </Router>
    </>
  );
}

export default App;
