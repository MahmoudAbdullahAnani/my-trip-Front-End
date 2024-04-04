import { useTranslation } from "react-i18next";
import imgService from "/public/service/3.png";

const data = [
  {
    _id: `${Math.random()}--${Math.random()}`,
    title: `تشكيلة واسعة من السيارات`,
    content: `نقدم مجموعة متنوعة من السيارات بمختلف الفئات والموديلات، مما يتيح للعملاء اختيار السيارة التي تناسب احتياجاتهم بشكل دقيق.`,
  },
  {
    _id: `${Math.random()}--${Math.random()}`,
    title: `خدمة عملاء ممتازة`,
    content: `فريق خدمة العملاء لدينا متفانٍ في تقديم الدعم والمساعدة للعملاء في جميع الأوقات، مما يضمن رضاهم التام وتجربة مريحة خلال عملية التأجير.`,
  },
  {
    _id: `${Math.random()}--${Math.random()}`,
    title: `عروض وأسعار تنافسية`,
    content: `نحرص على تقديم عروض مغرية وأسعار تنافسية تتناسب مع ميزانيات العملاء، مما يجعلنا الخيار الأمثل لتأجير السيارات بأفضل قيمة ممكنة.`,
  },
];

const AboutSectionTwo = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div
          dir={i18n.language === "ar" ? "ltr" : "rtl"}
          className="-mx-4 flex flex-wrap items-center"
        >
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <img
                src={imgService}
                alt="trip-ajwaa-service"
                className={`rounded-lg object-fit`}
              />
            </div>
          </div>
          <div
            className="w-full px-4 lg:w-1/2"
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              {data.map((item) => (
                <div className="mb-1" key={item._id}>
                  <h3 className="mb-4 text-xl font-bold text-[#117C99]  sm:text-2xl lg:text-xl xl:text-2xl">
                    {t(item.title)}
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    {t(item.content)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
