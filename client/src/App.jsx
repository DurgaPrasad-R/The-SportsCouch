import HomePage from "./pages/HomePage";
import UserDashBoard from "./pages/UserDashBoard";
import SignupLogin from "./pages/SignupLogin";
import Options from "./pages/Options";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./components/ErrorPage";
import UserLayout from "./pages/UserLayout";
import UserProfile from "./components/UserProfile";
const App = () => {
  return (
    <div className="font-poppins">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignupLogin />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashBoard />} />
          <Route path="/user/options/:sportName/*" element={<Options />} />
        </Route>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;

/*
 1. HomePage:
  <Promo />
  <SportsBanner />
  <ClubSlider />
  <Review />
  <FAQ />
  <hr className="mx-10 mt-10" />
  <Footer /> 

  2. 
    <Header />
    <SportsBanner />
    <Challenge />
    <RecentlyPlayed />
    <hr className="mx-10 mt-10" />
    <Footer />
*/
