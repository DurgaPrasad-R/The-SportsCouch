import HomePage from "./pages/HomePage";
import UserDashBoard from "./pages/UserDashBoard";
import Options from "./pages/Options";
import { Routes, Route } from "react-router-dom";
import UserLayout from "./pages/UserLayout";
const App = () => {
  return (
    <div className="font-poppins">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashBoard />} />
          <Route path="options/*" element={<Options />} />
        </Route>
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
