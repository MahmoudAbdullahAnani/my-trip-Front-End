import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  service1,
  service2,
  service3,
  service4,
  service5,
  service6,
  service7,
  service8
} from "../assets/icons/home";

const data = [
  {
    _id: Math.random(),
    icon: service1,
    title: "مجموعة واسعة من الخيارات",
    content: `نحن نوفر لك مجموعة متنوعة من الخيارات فيما يتعلق بالرحلات الجوية، الفنادق، وخدمات استئجار السيارات، مما يسمح لك باختيار ما يناسب احتياجاتك وميزانيتك بكل سهولة.`,
  },
  {
    _id: Math.random(),
    icon: service2,
    title: "أفضل الأسعار والعروض الترويجية",
    content: `نحن نسعى دائمًا لتقديم أفضل الأسعار لعملائنا، بالإضافة إلى تقديم عروض ترويجية مميزة وتخفيضات حصرية لتجربة سفر مميزة بأسعار مناسبة.`,
  },
  {
    _id: Math.random(),
    icon: service3,
    title: "حجوزات مرنة وسهلة",
    content: `يمكنك القيام بحجوزاتك بكل سهولة ويسر عبر موقعنا الإلكتروني أو تطبيق الهاتف المحمول، ويتيح لك نظامنا المرن تعديل أو إلغاء الحجوزات بسهولة ودون أية رسوم إضافية في بعض الحالات.`,
  },
  {
    _id: Math.random(),
    icon: service4,
    title: "تجربة سفر فريدة",
    content: `نحن نضمن لك تجربة سفر لا تُنسى، حيث نعمل جاهدين على توفير أعلى مستويات الراحة والجودة في كل خدماتنا، سواء كانت الرحلات الجوية أو إقامة الفنادق أو استئجار السيارات.`,
  },
  {
    _id: Math.random(),
    icon: service5,
    title: "أمان وأمان",
    content: `نحن نولي أهمية كبيرة لسلامة عملائنا، ونتخذ جميع التدابير اللازمة لضمان توفير بيئة آمنة وموثوقة خلال رحلاتهم وإقامتهم.`,
  },
  {
    _id: Math.random(),
    icon: service6,
    title: "تجربة مستخدم مبتكرة",
    content: `يتميز موقعنا الإلكتروني وتطبيقنا بواجهة مستخدم بسيطة ومبتكرة، مما يجعل عملية الحجز سهلة وممتعة بالنسبة لكل عميل.`,
  },
  {
    _id: Math.random(),
    icon: service7,
    title: "مرونة في الدفع",
    content: `نقدم خيارات دفع متعددة تناسب جميع الاحتياجات، بما في ذلك الدفع الفوري، وبطاقات الائتمان، وتحويل البنكي، مما يجعل عملية الحجز أكثر ملاءمة لك.`,
  },
  {
    _id: Math.random(),
    icon: service8,
    title: "معلومات موثوقة ودقيقة",
    content: `نحرص على توفير معلومات دقيقة وشاملة حول الرحلات، الفنادق، والسيارات المتاحة، لتمكينك من اتخاذ قرارات مدروسة ومناسبة.`,
  },
];
export default function Advantages() {
  // Lang
  const { t, i18n } = useTranslation();
  const [toggle, setToggle] = useState(6);
  return (
    <section
      id="features"
      className="bg-[#F9F9F9] py-16 md:py-20 lg:py-28 px-[16px] lg:px-[96px]"
    >
      <div className="container flex flex-col items-center gap-3">
        <div
          className="wow fadeInUp max-w-[570px] mb-[100px] w-full mx-auto text-center"
          data-wow-delay=".1s"
        >
          <h2 className="mb-4 text-3xl font-bold !leading-tight text-black  sm:text-4xl md:text-[45px]">
            {t("المميزات الرئيسية")}
          </h2>
          <p className="text-base !leading-relaxed text-body-color md:text-lg">
            {t(
              `هناك العديد من الاختلافات في مقاطع المتاحة ولكن الغالبية تعرض تعديلات في شكل ما.`
            )}
          </p>
        </div>
        <div
          dir="rtl"
          className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
        >
          {data.slice(0, toggle).map((item) => (
            <div dir={i18n.language === "ar" ? "rtl" : "ltr"} className="w-full" key={`${item._id}---${Math.random()}`}>
              <div className="wow fadeInUp" data-wow-delay=".15s">
                <div className="mb-5 flex h-[70px] w-[70px] items-center justify-center rounded-md bg- bg-opacity-10 text-primary">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#117C99] sm:text-2xl lg:text-xl xl:text-2xl">
                  {t(item.title)}
                </h3>
                <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
                  {t(item.content)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
  name="toggle"
          onClick={() => setToggle(toggle === 6 ? data.length : 6)}
          type="button"
          className={`w-[177px] h-[47px] mt-2  rounded-[13px] border-2 border-[#117C99] text-[#117C99] hover:bg-[#216678] hover:text-[#fff] duration-150 text-[14px] font-[500] `}
        >
          {toggle === 6 ? t("عرض المزيد") : t("عرض اقل")}
        </button>
      </div>
    </section>
  );
}
