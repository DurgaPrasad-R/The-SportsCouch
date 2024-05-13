// import Promo from "./components/Promo";
// import ClubSlider from "./components/ClubSlider";
// import Review from "./components/Review";
// import FAQ from "./components/FAQ";
// import Challenge from "./components/Challenge";
// import RecentlyPlayed from "./components/RecentlyPlayed";
// import Footer from "./components/Footer";
// import SportsBanner from "./components/SportsBanner";
import Header from "./components/Header";
// import CreateSport from "./components/CreateSport";
// import SessionCard from "./components/SessionCard";
import Options from "./pages/Options";
const App = () => {
  return (
    <div className="font-roboto bg-[#f6f6f6]">
      <Header />
      <Options />
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
