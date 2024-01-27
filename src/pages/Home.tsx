import MoveBgHeroSection from "../components/Home/Systems/MoveBgHeroSection";
import HeroSection from "../components/Home/Systems/HeroSection";
import OffersSection from "../components/Home/Sections/Offers/OffersSection";
import PopularDestinations from "../components/Home/Sections/PopularDestinations/PopularDestinations";

function Home() {
  return (
    <>
      <section>
        <MoveBgHeroSection>
          <HeroSection />
        </MoveBgHeroSection>
      </section>
      <OffersSection />
      <PopularDestinations />
    </>
  );
}

export default Home;
