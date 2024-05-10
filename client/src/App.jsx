import Promo from "./components/Promo";
import ClubSlider from "./components/ClubSlider";
import Review from "./components/Review";
import FAQ from "./components/FAQ";
import SportsBanner from "./components/SportsBanner";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div>
      <Promo />
      <SportsBanner />
      <ClubSlider />
      <Review />
      <FAQ />
      <hr className="mx-10 mt-10" />
      <Footer />
    </div>
  );
};

export default App;
