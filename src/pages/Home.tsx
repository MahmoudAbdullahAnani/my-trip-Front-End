import MoveBgHeroSection from "../components/Home/Systems/MoveBgHeroSection";
import HeroSection from "../components/Home/Systems/HeroSection";
import OffersSection from "../components/Home/Sections/Offers/OffersSection";

function Home() {
  return (
    <  >
      <section >
        <MoveBgHeroSection>
          <HeroSection />
        </MoveBgHeroSection>
      </section>
      <OffersSection />
    </>
  );
}

export default Home;
