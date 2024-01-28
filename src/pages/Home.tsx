import MoveBgHeroSection from "../components/Home/Systems/MoveBgHeroSection";
import HeroSection from "../components/Home/Systems/HeroSection";
import OffersSection from "../components/Home/Sections/Offers/OffersSection";
import PopularDestinations from "../components/Home/Sections/PopularDestinations/PopularDestinations";
import DestinationSection from "../components/Home/Sections/Destination/DestinationSection";

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
      <DestinationSection />
    </>
  );
}

export default Home;
