import MoveBgHeroSection from "../components/Home/Systems/MoveBgHeroSection";
import HeroSection from "../components/Home/Systems/HeroSection";
import OffersSection from "../components/Home/Sections/Offers/OffersSection";
import PopularDestinations from "../components/Home/Sections/PopularDestinations/PopularDestinations";
import DestinationSection from "../components/Home/Sections/Destination/DestinationSection";
import { useEffect } from "react";
import AutoScroll from "../components/Home/Systems/AutoScroll";
import { typeSystem } from "../data/RecoilState/FormHandling";
import { useRecoilState } from "recoil";
import Advantages from "../sections/Advantages";
// import Testimonials from "../sections/Testimonials/Testimonials";
import Contact from "../sections/Contact/Contact";
import Video from "../sections/Video/Video";
import AboutHome from "../sections/About/AboutHome";

function Home() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const [, setTypeSystemState] = useRecoilState(typeSystem);
  useEffect(() => {
    setTypeSystemState("air");
  }, []);
  return (
    <>
      <section>
        <MoveBgHeroSection>
          <HeroSection />
          <AutoScroll />
        </MoveBgHeroSection>
      </section>
      <section className={``}>
        <Video />
        <OffersSection />
        <PopularDestinations />
        <Advantages />
        <AboutHome />
        {/* <Testimonials /> */}
        <Contact />
      </section>
      <DestinationSection />
    </>
  );
}

export default Home;
