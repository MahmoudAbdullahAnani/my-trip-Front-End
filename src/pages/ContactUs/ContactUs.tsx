import { useTranslation } from "react-i18next";
import Contact from "../../sections/Contact/Contact";
const data = [
  {
    _id: `${Math.random()}--${Math.random()}`,
    title: `تواصل معنا`,
    content: `mahmoud18657321@gmail.com`,
    url: "mailto:mahmoud18657321@gmail.com",
  },
  {
    _id: `${Math.random()}--${Math.random()}`,
    title: `الموقع`,
    content: `المنصورة, الدقهلية, مصر`,
    url: "https://www.google.com/maps/place/%D8%A7%D9%84%D9%85%D9%86%D8%B5%D9%88%D8%B1%D8%A9%D8%8C+%D8%A7%D9%84%D9%85%D9%86%D8%B5%D9%88%D8%B1%D8%A9+(%D9%82%D8%B3%D9%85+2)%D8%8C+%D8%A7%D9%84%D9%85%D9%86%D8%B5%D9%88%D8%B1%D8%A9%D8%8C+%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9+%D8%A7%D9%84%D8%AF%D9%82%D9%87%D9%84%D9%8A%D8%A9%E2%80%AD/@31.0413672,31.4528799,12z/data=!3m1!4b1!4m6!3m5!1s0x14f79db7a9053547:0xf8dab3bbed766c97!8m2!3d31.0409483!4d31.3784704!16zL20vMDI5cGxk?entry=ttu",
  },
  {
    _id: `${Math.random()}--${Math.random()}`,
    title: `اتصل بنا`,
    content: `+01028876202`,
    url: "tel:+01028876202",
  },
];
export default function ContactUs() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen pt-16 md:pt-20 lg:pt-28 mt-[100px]">
      <div className="flex justify-center mb-8 flex-wrap gap-6 ">
        {data.map((item) => (
          <div
            key={item._id}
            className="w-[300px] px-4 py-6 bg-[#fff] text-center rounded-lg shadow-lg "
          >
            <h2 className="text-2xl font-bold mb-2">{t(item.title)}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t(item.content)}
            </p>
            <a href={item.url} className="text-[#117C99] hover:text-blue-700">
              {t(item.title)}
            </a>
          </div>
        ))}
      </div>
      <Contact />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54695.30555318651!2d31.382839649999998!3d31.041386149999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79db7a9053547%3A0xf8dab3bbed766c97!2z2KfZhNmF2YbYtdmI2LHYqdiMINin2YTZhdmG2LXZiNix2KkgKNmC2LPZhSAyKdiMINin2YTZhdmG2LXZiNix2KnYjCDZhdit2KfZgdi42Kkg2KfZhNiv2YLZh9mE2YrYqQ!5e0!3m2!1sar!2seg!4v1712236967925!5m2!1sar!2seg"
        width="100%"
        height="450"
        loading="lazy"
      ></iframe>
    </div>
  );
}
