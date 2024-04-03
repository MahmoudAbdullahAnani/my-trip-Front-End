import AboutSectionOne from "./AboutSectionOne";
import AboutSectionTwo from "./AboutSectionTwo";

function AboutHome() {
  return (
    <section className={`px-[16px] lg:px-[96px]`}>
      <AboutSectionOne />
      <AboutSectionTwo />
    </section>
  );
}

export default AboutHome;
