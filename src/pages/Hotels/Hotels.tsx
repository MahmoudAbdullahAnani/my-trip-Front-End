import { useRecoilState } from "recoil";
import AutoScroll from "../../components/Home/Systems/AutoScroll";
import MoveBgHeroSection from "../../components/Home/Systems/MoveBgHeroSection";
import HeroSectionHotels from "../../components/Hotel/HeroSection/HeroSectionHotels";
import { typeSystem } from "../../data/RecoilState/FormHandling";
import { useEffect } from "react";
// import OffersSection from "../../components/Home/Sections/Offers/OffersSection";
import PopularDestinations from "../../components/Home/Sections/PopularDestinations/PopularDestinations";
import DestinationSection from "../../components/Home/Sections/Destination/DestinationSection";

function Hotels() {
  const [, setTypeSystemState] = useRecoilState(typeSystem);
  useEffect(() => {
    window.scroll(0, 0);
    setTypeSystemState("hotel");
  }, []);
  return (
    <>
      <section>
        <MoveBgHeroSection>
          <HeroSectionHotels />
          <AutoScroll />
        </MoveBgHeroSection>
      </section>
      {/* <OffersSection /> */}
      <PopularDestinations />
      <DestinationSection />
    </>
  );
}

export default Hotels;
