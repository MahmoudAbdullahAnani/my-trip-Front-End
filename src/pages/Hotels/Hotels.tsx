import { useRecoilState } from "recoil";
import AutoScroll from "../../components/Home/Systems/AutoScroll";
import MoveBgHeroSection from "../../components/Home/Systems/MoveBgHeroSection";
import HeroSectionHotels from "../../components/Hotel/HeroSection/HeroSectionHotels";
import { typeSystem } from "../../data/RecoilState/FormHandling";
import { useEffect } from "react";

function Hotels() {
  const [, setTypeSystemState] = useRecoilState(typeSystem);
  useEffect(() => {
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
    </>
  );
}

export default Hotels;
