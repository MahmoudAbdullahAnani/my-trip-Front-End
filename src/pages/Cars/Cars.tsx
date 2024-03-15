import { useRecoilState } from "recoil";
import { typeSystem } from "../../data/RecoilState/FormHandling";
import { useEffect } from "react";
import MoveBgHeroSection from "../../components/Home/Systems/MoveBgHeroSection";
import AutoScroll from "../../components/Home/Systems/AutoScroll";
import OffersSection from "../../components/Home/Sections/Offers/OffersSection";
import PopularDestinations from "../../components/Home/Sections/PopularDestinations/PopularDestinations";
import DestinationSection from "../../components/Home/Sections/Destination/DestinationSection";
import HeroSectionCars from "../../components/Car/HeroSectionCars";

function Cars() {
  const [, setTypeSystemState] = useRecoilState(typeSystem);
  useEffect(() => {
    window.scroll(0, 0);
    setTypeSystemState("car");
  }, []);
  return (
    <>
      <section>
        <MoveBgHeroSection>
          <HeroSectionCars />
          <AutoScroll />
        </MoveBgHeroSection>
      </section>
      <OffersSection />
      <PopularDestinations />
      <DestinationSection />
    </>
  );
}

export default Cars;
