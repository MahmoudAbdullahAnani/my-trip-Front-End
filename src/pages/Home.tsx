import MoveBgHeroSection from "../components/Home/Systems/MoveBgHeroSection";
import HeroSection from "../components/Home/Systems/HeroSection";
import OffersSection from "../components/Home/Sections/Offers/OffersSection";
import PopularDestinations from "../components/Home/Sections/PopularDestinations/PopularDestinations";
import DestinationSection from "../components/Home/Sections/Destination/DestinationSection";
import { useEffect } from "react";
import AutoScroll from "../components/Home/Systems/AutoScroll";
import { typeSystem } from "../data/RecoilState/FormHandling";
import { useRecoilState } from "recoil";

function Home() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const [,setTypeSystemState] = useRecoilState(typeSystem);
useEffect(()=>{
  setTypeSystemState("air");
},[])
  return (
    <>
      <section>
        <MoveBgHeroSection>
          <HeroSection />
          <AutoScroll />
        </MoveBgHeroSection>
      </section>
      <OffersSection />
      <PopularDestinations />
      <DestinationSection />
    </>
  );
}

export default Home;
